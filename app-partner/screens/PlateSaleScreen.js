'use strict';

import React, { Component } from 'react';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { StackActions, NavigationActions } from "react-navigation";

import {
  StyleSheet, Alert, Modal,
  View, Text
} from 'react-native';
import Colors from "../constants/Colors";

class PlateSaleScreen extends Component {

  state = {
    hasCameraPermission: null,
    scanned: false,
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
    let try1 = (
      <View style={styles.container}>
        <View style={styles.QRcontainer}>
          <BarCodeScanner
            onBarCodeScanned={this.handleBarCodeScanned}
            style={{height: 200, width: 200}}
          />
        </View>
        <Text style={{ flex: 1 }}>
          Escanea el código QR del usuario Meniu para registrar el plato que quiere comprar
        </Text>
      </View>
    );

    return try1;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: "center", 
    justifyContent: "space-between",
    backgroundColor: Colors.backgroundColor
  },
  QRcontainer: {
    flex:6,
    alignItems:"center",
    justifyContent: "center",
  },
});


export default PlateSaleScreen;