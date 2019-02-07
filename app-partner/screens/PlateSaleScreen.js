'use strict';

import React, { Component } from 'react';
import { BarCodeScanner, Permissions } from 'expo';
import { StackActions, NavigationActions } from "react-navigation";

import {
  StyleSheet, Alert,
  View, Text
} from 'react-native';
import Colors from "../constants/Colors";

class PlateSaleScreen extends Component {

  state = {
    hasCameraPermission: null
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  handleBarCodeScanned = data => {
    this.props.navigation.navigate("CodeScanned",{
      data
    });
  };


  render() {
    if (this.state.hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (this.state.hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (
      <View style={styles.container}>
        <Text style={{ flex: 1 }}>
          Escanea el código QR del usuario Meniu para registrar el plato que quiere comprar
        </Text>
        <View style={{ flex: 6 }}>
          <BarCodeScanner
            onBarCodeScanned={this.handleBarCodeScanned}
            style={{height: 200, width: 200}}
          />
        </View>
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