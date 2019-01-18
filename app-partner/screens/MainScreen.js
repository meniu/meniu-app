'use strict';
import React, { Component } from 'react';
import { Button, Image, StyleSheet, View } from 'react-native';
import Colors from "../constants/Colors";


class MainScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View>
          <Image></Image>
          <Image></Image>
        </View>
        <Button title="Venta de plato"></Button>
        <Button title="Venta de plan"></Button>
        <Button title="Plan Mercadeo"></Button>
        <Button title="Generar oferta"></Button>
        <Button title="Consultar reporte"></Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{ 
    flex: 1, 
    alignItems: "center", 
    justifyContent: "space-around",
    backgroundColor: Colors.backgroundColor,
  },
  subtitleText: {
    fontSize: 24,
    color: "black",
    textAlign: "center",
  },
});


export default MainScreen;