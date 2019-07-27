'use strict';

import React, { Component } from 'react';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';

import {
  StyleSheet, Alert, Modal,
  View, Text
} from 'react-native';
import Colors from '../constants/Colors';

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
    this.props.navigation.navigate("CodeScanned", {
      data
    });
  };


  render() {
    if (this.state.hasCameraPermission === null) {
      return <Text>Pidiendo acceso a cámara</Text>;
    }
    if (this.state.hasCameraPermission === false) {
      return <Text>No hay acceso a cámara</Text>;
    }
    let try1 = (
      <View style={styles.container}>
        <BarCodeScanner
          onBarCodeScanned={this.handleBarCodeScanned}
          style={{ ...StyleSheet.absoluteFillObject, backgroundColor: Colors.transparent }}
        />
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
    flex: 6,
    alignItems: "center",
    justifyContent: "center",
  },
});


export default PlateSaleScreen;