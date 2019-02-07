'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View, Text
} from 'react-native';
import Colors from "../constants/Colors";

class PlateSaleScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Escanea el QR we</Text>
        <Text>Hola digamos que soy un visor de QR</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: "center", 
    justifyContent: "space-between",
    backgroundColor: Colors.backgroundColor
  },
});


export default PlateSaleScreen;