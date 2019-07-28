'use strict';

import React, { Component } from 'react';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';

import {
  StyleSheet,
  View,
} from 'react-native';
import { Text } from 'react-native-elements';
import { Feather } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';

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
    return (
      <BarCodeScanner
        onBarCodeScanned={this.handleBarCodeScanned}
        style={[StyleSheet.absoluteFillObject, styles.QRcontainer]}
      >
        <Text h4 style={styles.text}>
          Escanea el QR del usuario para registrar el plato
        </Text>
        <View style={styles.focused}>
          <Feather name={'plus'} size={Layout.window.width * 0.15} color={Colors.lightBackgroundColor} />
        </View>
      </BarCodeScanner>
    );
  }
}

const styles = StyleSheet.create({

  QRcontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.darkTransparent,
  },
  text: {
    color: Colors.lightBackgroundColor,
    textAlign: "center",
    margin: 10,
  },
  focused: {
    width: Layout.window.width * 0.6,
    height: Layout.window.width * 0.6,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderRadius: 5,
    borderColor: Colors.lightBackgroundColor,
    borderStyle: "dashed",
    backgroundColor: Colors.transparent,
  },
});


export default PlateSaleScreen;