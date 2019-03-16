'use strict';

import React, { Component } from 'react';
import { StackActions, NavigationActions } from "react-navigation";

import {
  StyleSheet,
  View, Text
} from 'react-native';
import Colors from "../constants/Colors";
import Layout from "../constants/Layout";
import { FontAwesome } from '@expo/vector-icons';

class CodeScannedScreen extends Component {

  static navigationOptions = {
    title: 'Escáner',
  };

  constructor(props) {
    super(props);

    const { navigation } = this.props;
    this.data = navigation.getParam('data', '');
    this.target = this.data.target;
    this.type = this.data.type;
    this.data = JSON.parse(this.data.data);
    console.log("data", this.data);
    this.state = {};

    this.isDataValid = this.isDataValid.bind(this);
    this.renderNotInRestaurantPlate = this.renderNotInRestaurantPlate.bind(this);
    this.renderInvalidCode = this.renderInvalidCode.bind(this);
    this.renderValidCode = this.renderValidCode.bind(this);
  }

  isDataValid(){
    let valid = true;

    //TODO Validar que tenga los datos necesarios (tipo plan, tipo plato)

    return valid;
  }

  plateInRestaurant(){
    let plateInRestaurant = true;
    //TODO Validar que plato sea de este restaurante

    return plateInRestaurant;
  }

  renderNotInRestaurantPlate(){
    return <View style={styles.container}></View>

  }

  renderInvalidCode(){
    return <View style={styles.container}></View>

  }

  renderValidCode(){
    return (<View style={styles.container}>
      <FontAwesome name={'check'} size={200} color={Colors.succesColor} />
      <Text>El código escaneado ha sido validado. Puedes entregar el plato al usuario.</Text>
      <Text>Cupon utilizado: {this.data.coupon.couponType}</Text>
      <Text>Tipo de combo: {this.data.comboType}</Text>
      <Text>Le quedan: {this.data.coupon.foodQuantity} {this.data.coupon.couponType}</Text>
      <Text>Tipo de plan: {this.data.plan.planType}</Text>
      <Text>Correo de usuario: {this.data.userEmail}</Text>
    </View>);
  }
  /**
  *Conditional render: should evaluate navigation props to check whether:
  * - code was valid: renderValidCode
  * - plate was not in the restaurant: renderNotInRestaurantPlate
  * - Code in wrong format or not working: renderInvalidCode
  */
  render() {
    let conditionalContent;
    if(!this.isDataValid()){
      conditionalContent = this.renderInvalidCode();
    }
    else if(!this.plateInRestaurant()){
      conditionalContent = this.renderNotInRestaurantPlate();
    }
    else {
      conditionalContent = this.renderValidCode();
    }
    return conditionalContent;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: "center", 
    justifyContent: "space-evenly",
    backgroundColor: Colors.backgroundColor
  },
});


export default CodeScannedScreen;