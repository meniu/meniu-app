'use strict';
import React, { Component } from 'react';
import { Button, Image, StyleSheet, View, TouchableOpacity,
  Text,
 } from 'react-native';
import Colors from "../constants/Colors";


class MainScreen extends Component {

  constructor(props) {
    super(props);

    this.handlePlateSaleClick = this.handlePlateSaleClick.bind(this);
  }

  handlePlateSaleClick(){
    this.props.navigation.navigate("PlateSale");
  }


  render() {
    return (
      <View style={styles.container}>
        <View>
          <Image></Image>
          <Image></Image>
        </View>
        <Button title="Venta de plato"
          style={styles.mainButton}
          color={Colors.tintColor}
          onPress={this.handlePlateSaleClick}
        />
        <TouchableOpacity
          onPress={()=>{}}
        >
          <Text>Venta de plan</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={()=>{}}
        >
          <Text>Plan Mercadeo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={()=>{}}
        >
          <Text>Generar oferta</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={()=>{}}
        >
          <Text>Consultar reporte</Text>
        </TouchableOpacity>
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
  mainButton: {
    color:Colors.tintColor,
  },
  subtitleText: {
    fontSize: 24,
    color: "black",
    textAlign: "center",
  },
});


export default MainScreen;