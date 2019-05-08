'use strict';

import React, { Component } from 'react';
import Colors from "../../../constants/Colors";
import Layout from "../../../constants/Layout";
import PromotionCardComponent from "../../../components/PromotionCardComponent";
import MockData from "../../../constants/MockData";
import {
  StyleSheet,  Text, View, Image, Picker,
  ScrollView, FlatList,
} from 'react-native';
import OrderModalComponent from '../../../components/OrderModalComponent';
import FilterButtonComponent from '../../../components/FilterButtonComponent';
import BadgeComponent from '../../../components/BadgeComponent';

class RestaurantPlatesScreen extends Component {
  
  constructor(props) {
    super(props);

    const { navigation } = this.props;
    this.restaurant = navigation.getParam('restaurant', 'Sin Restaurante');
    this.state = {
      ordering:"AZ",
      selectedPlate:null,
      successModalVisible:false,
      failureModalVisible:false,
    };

  }
  
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('restaurant', 'Platos de Restaurante').name,
    };
  };
  


  handlePlatePress = (plate) => {
    if(Math.random() > 0.5)
      this.setState({
        successModalVisible: true,
        selectedPlate: plate
      });
    else 
      this.setState({
        failureModalVisible: true,
        selectedPlate: plate
      });
  }

  disableModals = () => {
    this.setState({
      successModalVisible: false,
      failureModalVisible: false
    })
  }

  navigateOrder =(plate, restaurant) => {
    this.disableModals();
    this.props.navigation.navigate("Order",{
      plate: plate,
      restaurant: restaurant
    });
  }

  navigateMemberShips = () => {
    this.disableModals();
    this.props.navigation.navigate("MembershipsStack");
  }

  renderModal = (_type) => {
    return this.state.selectedPlate ? (
      <OrderModalComponent 
        type={_type} 
        visible={_type === "success" ? this.state.successModalVisible : this.state.failureModalVisible}
        promotionEntity={this.state.selectedPlate} 
        restaurantEntity={this.restaurant}
        toggleVisible={this.disableModals}
        buttonAction={_type === "success" ? 
          ()=>this.navigateOrder(this.state.selectedPlate, this.restaurant) : 
          this.navigateMemberShips}/>
    ): null;
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderModal("success")}
        {this.renderModal("failure")}
        <View style={styles.partnerContainer}>
          <Image
            style={styles.circledImage}
            source={{uri:this.restaurant.uri}}
            resizeMode="contain"
          />
          <View style={styles.partnerDetails}>
            <Text>{this.restaurant.name}</Text>
            <Text>Horario de atención</Text>
            <View style={styles.badgesContainer}>
              <BadgeComponent type="basic" content="10"></BadgeComponent>
              <BadgeComponent type="premium" content="15"></BadgeComponent>
              <BadgeComponent type="deluxe" content="5"></BadgeComponent>
            </View>
          </View>
          <View style={{flex:3}}>
            <Text>Cómo llegar</Text>
          </View>
        </View>
        <View style={styles.horizontalView}>
          <FilterButtonComponent type="basic"></FilterButtonComponent>
          <FilterButtonComponent type="premium"></FilterButtonComponent>
          <FilterButtonComponent type="deluxe"></FilterButtonComponent>
          <Picker
            selectedValue={""}
            style={{ flex:1, height: 50, width: 100 }}
            onValueChange={(itemValue) => this.setState({ordering: itemValue})}>
            <Picker.Item label="A-Z" value="AZ" />
            <Picker.Item label="Z-A" value="ZA" />
          </Picker>
        </View>
        <View style={styles.flatListView}>
          <ScrollView style={{flex:1}}>
            <FlatList
              style={{flex:1}}
              keyExtractor={(item)=>item.name}
              data={MockData.promotions}
              renderItem={({item}) => <PromotionCardComponent actionType="order" entity={item} action={()=>this.handlePlatePress(item)}/>}
            />
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{ 
    flex: 1, 
    alignItems: "stretch", 
    justifyContent: "space-between",
    backgroundColor: Colors.backgroundColor,
  },
  partnerContainer:{
    flex:2,
    justifyContent:"flex-start",
    flexDirection: "row",
    alignItems:"center",
  },
  circledImage:{
    flex:1,
    width: Layout.window.width/6, 
    height: Layout.window.width/6, 
    borderRadius: 500,
    margin: 10,
  },
  partnerDetails:{
    flex:2,
    flexDirection:"column",
  },
  badgesContainer:{
    flexDirection: "row",
    justifyContent: "space-around"
  },
  horizontalView:{
    flexDirection:"row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: Colors.white,
  },
  flatListView:{
    flex:6,
  },
  

});


export default RestaurantPlatesScreen;