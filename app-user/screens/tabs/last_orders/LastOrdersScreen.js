'use strict';

import React, { Component } from 'react';
import {
  ToastAndroid, Platform, Image, StyleSheet,
  TextInput, Picker, FlatList, View, ScrollView, SectionList,
  AsyncStorage
} from 'react-native';
import { Text } from 'react-native-elements';
import { Bubbles } from 'react-native-loader';
import Colors from "../../../constants/Colors";
import MockData from '../../../constants/MockData';
import Layout from '../../../constants/Layout';
import PromotionCardComponent from '../../../components/PromotionCardComponent';
import ImportantPastPromotionCardComponent from "../../../components/ImportantPastPromotionCardComponent";
import moment from "moment";
import Accordion from "react-native-collapsible/Accordion"
import { AntDesign } from '@expo/vector-icons';
import PromotionService from "../../../services/PromotionService";
import OrderModalComponent from '../../../components/OrderModalComponent';

export default class LastOrdersScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      signedIn: true,
      text: "",
      sorting: "all",
      spentPromotions: [],
      activeSections: [],
      selectedPlate: null,
      successModalVisible: false,
      failureModalVisible: false,
    };
  }

  static navigationOptions = {
    title: 'Tus últimas órdenes',
  };

  componentDidMount() {
    this.getLocalUser();

    PromotionService.retrievePromotionsByUser().then(response => response.json()).then(responseJSON => {
      console.log('wtf real')
      console.log(responseJSON);
      this.setState({
        spentPromotions: responseJSON
      });
    });
  }

  async getLocalUser() {
    try {
      const value = await AsyncStorage.getItem('user');
      const user = JSON.parse(value);
      if (user !== null) {
        // We have data!!

        this.setState({
          user: user.applicationUser
        });
      }
    } catch (error) {
      // Error retrieving data
      alert(error);
      this.setState({
        signedIn: false
      });
    }
  }

  checkSignIn() {
    if (!this.state.signedIn) {
      if (Platform.OS === 'android')
        ToastAndroid.show('Por favor ingresa', ToastAndroid.SHORT);
      this.props.navigation.navigate("SignIn");
    }

  }

  getDiscountSum(array) {
    let sum = array.map(prom => prom.saving).reduce((a, b) =>
      a + b
      , 0);
    return sum;
  }

  handlePlatePress(plate) {
    // this.props.navigation.navigate("Order", {
    //   plate: plate,
    //   restaurant: {}
    // });
    this.setState({
      successModalVisible: true,
      selectedPlate: plate
    });
  }

  disableModals = () => {
    this.setState({
      successModalVisible: false,
      failureModalVisible: false
    })
  }

  navigateMemberShips = () => {
    this.disableModals();
    this.props.navigation.navigate("MembershipsStack");
  }

  navigateOrder = (plate, restaurant, codePath) => {
    this.disableModals();
    this.props.navigation.navigate("Order", {
      plate,
      restaurant,
      codePath
    });
  }

  renderLoading() {
    return (
      <View style={{ width: '100%', height: '100%', justifyContent: "center", alignItems: "center" }}>
        <Bubbles size={10} color={Colors.yellowMeniu} />
      </View>);
  }

  renderModal = (_type) => {
    return this.state.selectedPlate ? (
      <OrderModalComponent
        type={_type}
        visible={_type === "success" ? this.state.successModalVisible : this.state.failureModalVisible}
        promotionEntity={this.state.selectedPlate}
        restaurantEntity={this.state.selectedPlate.partner}
        toggleVisible={this.disableModals}
        buttonAction={_type === "success" ?
          () => {
            PromotionService.generateQR(this.state.selectedPlate.couponPlan.coupon.type, this.state.selectedPlate.partner.identification, this.state.selectedPlate.id).then(response => response.json()).then(responseJSON => {

              if (responseJSON.codePath) {
                console.log('QR GENERATED');
                this.navigateOrder(this.state.selectedPlate, { partner: this.state.selectedPlate.partner }, responseJSON.codePath);
              }
              else {
                this.setState({
                  successModalVisible: false,
                  failureModalVisible: true,
                });
              }
            });
          } :
          this.navigateMemberShips} />
    ) : null;
  }

  renderSectionHeader = (section, index, isActive) => {
    let iconName = isActive ? "up" : "down";
    return (
      <View style={[
        styles.sectionHeader,
        isActive ? styles.activeSectionHeader : styles.inactiveSectionHeader
      ]}>
        <Text>{section.title}</Text>
        <View style={{ flexDirection: "row" }}>
          <Text>Ahorraste: ${this.getDiscountSum(section.data)} </Text>
          <AntDesign name={iconName} size={20} color="black" />
        </View>
      </View>
    );
  };

  renderSectionContent = section => {
    return (
      <ScrollView style={{ height: Layout.window.height / 4 }}>
        <FlatList
          style={{ flex: 1 }}
          data={section.data.map(prom => { prom.key = prom.name; return prom })}
          numColumns={2}
          renderItem={({ item }) => {
            return <ImportantPastPromotionCardComponent entity={item} action={() => this.handlePlatePress(item)} />
          }}
        />
      </ScrollView>
    );
  };

  updateSections = activeSections => {
    this.setState({ activeSections });
  };

  SpentPromotionList = (props) => {
    switch (this.state.sorting) {
      case "all":
        return (
          <ScrollView style={{ flex: 1 }}>
            <FlatList
              style={{ flex: 1 }}
              keyExtractor={(item) => item.name}
              data={this.state.spentPromotions}
              renderItem={({ item }) => <PromotionCardComponent actionType="reorder" entity={item} action={() => this.handlePlatePress(item)} />}
            />
          </ScrollView>
        );
      case "month":
        // Use moment to calculate each included month, adding each promotion in the process.
        // [{title:"Enero", number:1, data:[{...}, {...}]}]
        let months = []
        moment.locale("es");

        this.state.spentPromotions.forEach(spentPromotion => {
          let promotionMonthNumber = moment(spentPromotion.transactionDate, "DD-MM-YYYY").month();
          let existingMonth = months.find(month =>
            month.number == promotionMonthNumber
          );
          existingMonth ?
            existingMonth.data.push(spentPromotion) :
            months.push({
              title: moment.months()[promotionMonthNumber],
              number: promotionMonthNumber,
              data: [spentPromotion],
            });
          // console.log({promotionMonthNumber, existingMonth});
        });

        // Render section list to show promotions inside each month. 
        return (
          <Accordion
            activeSections={this.state.activeSections}
            sections={months}
            // renderSectionTitle={this._renderSectionTitle}
            renderHeader={this.renderSectionHeader}
            renderContent={this.renderSectionContent}
            onChange={this.updateSections}
          />
        );
      default:
        return (
          <Text>No has utilizado promociones</Text>
        );
    }
  }

  render() {
    if (!this.state.user || this.state.spentPromotions.length <= 0)
      return this.renderLoading();
    else
      this.checkSignIn();
    return (
      <View style={styles.container}>
        {this.renderModal("success")}
        {this.renderModal("failure")}
        <View style={styles.horizontalView}>
          <View style={styles.userView}>
            <Text style={{ fontWeight: "bold" }}>Felicitaciones, {this.state.user.name}!</Text>
            <View style={{ flexDirection: "row" }}>
              <Text>Has ahorrado </Text>
              <Text style={{ fontWeight: "bold", }}>${this.getDiscountSum(this.state.spentPromotions)}!</Text>
            </View>
          </View>
          <View style={styles.pickerView}>
            <Picker
              selectedValue={""}
              style={styles.picker}
              onValueChange={(itemValue, itemIndex) => this.setState({ language: itemValue })}>
              <Picker.Item label="Esta Semana" value="week" />
              <Picker.Item label="Mensual" value="month" />
            </Picker>
          </View>
        </View>
        <View style={{ flex: 3 }}>
          <ScrollView style={{ flex: 1 }} horizontal={true}>
            <FlatList
              horizontal={true}
              keyExtractor={(item) => item.name}
              data={this.state.spentPromotions}
              renderItem={({ item }) => {
                return <ImportantPastPromotionCardComponent entity={item} action={() => this.handlePlatePress(item)} />
              }}
            />
          </ScrollView>
        </View>
        <View style={{ ...styles.horizontalView, justifyContent: "flex-end" }}>
          <View style={styles.pickerView}>
            <Picker
              selectedValue={this.state.sorting}
              style={styles.picker}
              onValueChange={(itemValue, itemIndex) => this.setState({ sorting: itemValue })}>
              <Picker.Item label="Todos" value="all" />
              <Picker.Item label="Mensual" value="month" />
            </Picker>
          </View>
        </View>
        <View style={{ ...styles.horizontalView, justifyContent: "space-around" }}>
          <Text style={{ flex: 1 }}>Tus últimas órdenes</Text>
          <Text style={{ flex: 1 }}>Total ahorrado: ${this.getDiscountSum(this.state.spentPromotions)}</Text>
        </View>
        <View
          style={styles.flatListView}>
          <this.SpentPromotionList />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "space-around",
    backgroundColor: Colors.lightBackgroundColor,
  },
  userView: {
    flex: 2,
    alignItems: "flex-start",
    margin: 5,
  },
  horizontalView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: Colors.cardColor,
  },
  flatListView: {
    flex: 7,
    alignItems: "stretch"

  },
  pickerView: {
    backgroundColor: Colors.yellowMeniu,
    justifyContent: "center",
    padding: 5,
    margin: 5,
    borderRadius: 5,
  },
  picker: {
    height: 30,
    width: 150,
  },
  sectionHeader: {
    borderColor: Colors.yellowMeniu,
    borderRadius: 1,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 2,
    padding: 4,
  },
  activeSectionHeader: {
    backgroundColor: Colors.yellowMeniu,
  },
  inactiveSectionHeader: {
    backgroundColor: Colors.white,
  },


});

