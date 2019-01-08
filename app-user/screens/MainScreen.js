'use strict';

import React, { Component } from 'react';
import {  StyleSheet,  View, Text } from 'react-native';
import Colors from "../constants/Colors";

class MainScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>¡Bienvenido a Meniu 🍽!</Text>
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
});


export default MainScreen;