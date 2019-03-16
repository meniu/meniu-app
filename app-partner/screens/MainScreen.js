'use strict';
import React, { Component } from 'react';
import { Button, Image, StyleSheet, View, TouchableOpacity,
  Text,
 } from 'react-native';
import Colors from "../constants/Colors";
import Layout from "../constants/Layout";


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
        <View style={styles.horizontalView}>
          <Image 
            style={{flex:1, width: Layout.window.width/3, height: Layout.window.width/3}}
            source={{uri:"https://meniu.com.co/wp-content/uploads/2018/08/Logos-Aliados-fondo-balncoMesa-de-trabajo-1.png"}} 
            resizeMode="contain"
          />
          <Image
            style={{flex:1, width: Layout.window.width/3, height: Layout.window.width/3}}
            source={require("../assets/images/M-sin-fondo.jpeg")}
            resizeMode="contain"
          />
        </View>
        <View style={styles.buttonContainer}>
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
  horizontalView:{
    flex:3,
    flexDirection:"row",
    justifyContent: "space-evenly",
    alignItems:"center",
    backgroundColor: Colors.backgroundColor,
  },
  buttonContainer:{
    flex:7,
    justifyContent: "space-evenly",
    alignItems: "center"
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