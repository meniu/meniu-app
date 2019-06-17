"use strict";

import React, { Component } from "react";
import { Image, View, Text, Button, StyleSheet } from "react-native";
import { StackActions, NavigationActions } from "react-navigation";
import Colors from "../constants/Colors";
import CustomIcon from "../components/CustomIcon";


export default class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.handleSignUpClick = this.handleSignUpClick.bind(this);
    this.handleSignInClick = this.handleSignInClick.bind(this);
  }

  handleSignUpClick(){
    this.props.navigation.navigate("SignUp");
  }

  handleSignInClick(){
    this.props.navigation.navigate("SignIn");
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.imageView}>
          <Image 
            source={require('../assets/images/cropped-meniu-blanco.png')} 
            style={styles.titleImage}/>
        </View>
        <Text style={styles.subtitleText}>Almuerza inteligentemente</Text>
          <View style={styles.buttonsView}>
          <Button
            style={styles.button}
            title="ingresa"
            color={Colors.tintColor}
            onPress={this.handleSignInClick}
          />
          <Button
            title="Registrate"
            color={Colors.tintColor}
            onPress={this.handleSignUpClick}
          />
        </View>
      </View>
    );
  }  
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: "stretch", 
    justifyContent: "space-around",
    backgroundColor: Colors.backgroundColor
  },
  imageView: {
    backgroundColor:Colors.tintColor,
    justifyContent: "center",
    alignItems: "center",
    height:110,
  }  ,
  titleImage: {
    height:100,
    width:300
  },
  subtitleText: {
    fontSize: 24,
    color: "black",
    textAlign: "center",
  },
  buttonsView: {
    flexDirection:"row",
    justifyContent: "space-evenly",
    alignItems: "center"
  },

});

