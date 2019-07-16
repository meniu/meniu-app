
import React, { Component } from 'react';

import {
  ToastAndroid, Platform, Image, StyleSheet,
  TextInput, Picker, FlatList, View, Text,
  ScrollView, Button, TouchableHighlight
} from 'react-native';
import { Bubbles } from 'react-native-loader';
import Colors from "../../../constants/Colors";
import Layout from "../../../constants/Layout";
import { StackActions, NavigationActions } from "react-navigation";
import RestaurantCardComponent from "../../../components/RestaurantCardComponent";
import BadgeComponent from '../../../components/BadgeComponent';
import FilterButtonComponent from '../../../components/FilterButtonComponent';
import MockData from '../../../constants/MockData';
import ImportantPromotionCardComponent from '../../../components/ImportantPromotionCardComponent';
import PartnerService from "../../../services/PartnerService";
import PromotionService from "../../../services/PromotionService";
/**
 * Restaurantes ordenados por ranking siempre.
 * Filtros por tag / localización
 */
export default class PartnerSelectionScreen extends React.Component {
  constructor(props) {
    super(props);

    this.allPartners = [];
    this.state = {
      text: "",
      //Layout: By icon or traditional
      layout: "icon",
      partners: [],
      promotions: [],
      selectedFilters: {
        Basic: false,
        Premium: false,
        Deluxe: false,
        Gold: false,
      }
    };

  }

  static navigationOptions = {
    title: 'Restaurantes',
  };

  async componentDidMount() {

    let responsePromotions = await PromotionService.retrievePromotionsByUser().then(response => response.json());
    responsePromotions = responsePromotions.slice(0, 5);
    let responseAllPartners = await PartnerService.retrievePartners().then(response => response.json());
    console.log('pasó');
    this.setState({
      partners: responseAllPartners,
      promotions: responsePromotions,
    });
  }

  handleRestaurantPress = (restaurant) => {
    this.props.navigation.navigate("RestaurantPlates", {
      restaurant
    });
  }

  filterPartners = () => {
    // Filters by selected values
    let filters = this.state.selectedFilters;
    let partnersFiltered = this.allPartners;
    Object.keys(filters).forEach(type => {
      if (!filters[type])
        partnersFiltered = partnersFiltered.filter(partner => {
          // couponPlan coupon type
          return partner.couponSummaryModels.every(coupon => coupon.type !== type);
        });
    });
    return partnersFiltered;
  }

  toggleSelected = (type) => {
    console.log("all partners", this.allPartners);
    this.setState((state) => {
      let newSelected = state.selectedFilters;
      newSelected[type] = !state.selectedFilters[type];
      return ({
        selectedFilters: newSelected,
        partners: this.filterPartners(),
      });
    });
  }

  render() {
    return (
      this.state.partners.length <= 0 ?
        <View style={{ width: '100%', height: '100%', justifyContent: "center", alignItems: "center" }}>
          <Bubbles size={10} color={Colors.yellowMeniu} />
        </View> :
        <View style={styles.container}>
          <View style={styles.upperView}>
            <View style={{ flex: 1 }}></View>
            <View style={{ flex: 3, backgroundColor: Colors.backgroundColor }}>
              <ScrollView style={{ flex: 1 }} horizontal={true}>
                <FlatList
                  horizontal={true}
                  keyExtractor={(item) => item.name}
                  data={this.state.promotions}
                  renderItem={({ item }) => {
                    return <ImportantPromotionCardComponent name={item.name} type={item.type}
                      description={item.description} imagePath={item.imagePath} />
                  }}
                />
              </ScrollView>
            </View>
            <View style={styles.typeFilterView}>
              <FilterButtonComponent type="Basic" selected={this.state.selectedFilters.Basic} toggleSelected={() => this.toggleSelected("Basic")}></FilterButtonComponent>
              <FilterButtonComponent type="Premium" selected={this.state.selectedFilters.Premium} toggleSelected={() => this.toggleSelected("Premium")}></FilterButtonComponent>
              <FilterButtonComponent type="Deluxe" selected={this.state.selectedFilters.Deluxe} toggleSelected={() => this.toggleSelected("Deluxe")}></FilterButtonComponent>
              <FilterButtonComponent type="Gold" selected={this.state.selectedFilters.Gold} toggleSelected={() => this.toggleSelected("Gold")}></FilterButtonComponent>
            </View>
          </View>
          <View style={{ flex: 5, backgroundColor: Colors.white, }}>
            <ScrollView style={{ flex: 1 }} >
              <FlatList
                style={{ flex: 1 }}
                numColumns={1}
                keyExtractor={(item) => item.partner.identification + ""}
                // onPressItem={this.handleRestaurantPress}
                data={this.state.partners}
                renderItem={({ item }) => {
                  return <RestaurantCardComponent entity={item} action={() => this.handleRestaurantPress(item)} />
                }}
              />
            </ScrollView>
          </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 50,
    alignItems: "stretch",
    justifyContent: "space-between",
    backgroundColor: Colors.white,
    marginRight: 5
  },
  userView: {
    alignItems: "center",
  },
  upperView: {
    flex: 5,
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: Colors.lightBackgroundColor,
  },
  horizontalImageView: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: Colors.backgroundColor,
    height: 110,
  },
  typeFilterView: {
    backgroundColor: Colors.white,
    flexDirection: "row",
    justifyContent: "space-around",
  },

});

