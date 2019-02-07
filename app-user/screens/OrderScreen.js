'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View, Text, Image
} from 'react-native';

import Colors from "../constants/Colors";
import Layout from "../constants/Layout";


class OrderScreen extends Component {


  constructor(props) {
    super(props);

    const { navigation } = this.props;
    this.restaurant = navigation.getParam('restaurant', '(Sin Restaurante)');
    this.plate = navigation.getParam('plate', '(Sin Plato)');

    this.state = {};
  }

  static navigationOptions = {
    title: 'Tu pedido',
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.horizontalView}> 
          <Image
            style={{width: 100, height: 100}}
            source={{uri: this.restaurant.uri}}
          />
          <Image
            style={{width: 100, height: 100}}
            source={{uri: this.plate.uri}}
          />
        </View>
        <View style={styles.centralText}>
          <Text>Plato: {this.plate.name}</Text>
          <Text>Tipo: Premium</Text>
          <Text>(Especificaciones del plato) {this.plate.description}</Text>
        </View>
        <View style={styles.QRContainer}>
          <Image
            style={{flex:1, width: 200, height: 200}}
            source={require('../assets/images/qr-sample.png')}
            resizeMode="contain"
          />
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
  horizontalView:{
    flex:2,
    flexDirection:"row",
    justifyContent: "space-evenly",
    alignItems:"center",
    backgroundColor: Colors.backgroundColor,
  },
  centralText:{
    flex:1,
    alignItems:"center",
    justifyContent:"center",
    fontSize:20,
  },
  QRContainer:{
    flex:4,
    backgroundColor: Colors.backgroundColor,
    alignItems:"center",
    justifyContent:"center",
  }
});


export default OrderScreen;