'use strict';

import React, { Component } from 'react';
import { Button, Image, StyleSheet,  View, Text, 
  Platform, TextInput, KeyboardAvoidingView } from 'react-native';
import Colors from "../constants/Colors";

class SignInScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      restaurant:"",
      sucursal:"",
      password:"",
      signedIn: false, 
      name: "", 
      photoUrl: ""
    };

    this.handleRestaurantInputSubmit = this.handleRestaurantInputSubmit.bind(this);
    this.handleSucursalInputSubmit = this.handleSucursalInputSubmit.bind(this);

    this.loginWithUser = this.loginWithUser.bind(this);
  }


  handleRestaurantInputSubmit() {
    this.sucursalInput.focus();
  }

  handleSucursalInputSubmit() {
    this.passwordInput.focus();
  }

  loginWithUser(){
    // POST petition, obtain token.

    // Token will be required to be passed to the main application 
    // in order to do other requests
    this.props.navigation.navigate("Main");
  } 

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <Text style={styles.subtitleText}>Ingresa con tu usuario</Text>
        <TextInput 
          style={styles.input}
          value={this.state.restaurant}
          placeholder="restaurante"
          placeholderTextColor={Colors.tintColor}
          onChangeText={(restaurant)=>this.setState({restaurant})}
          returnKeyType = "next"
          onSubmitEditing={this.handleRestaurantInputSubmit}
          blurOnSubmit={false}
          autoFocus
        />
      	<TextInput 
          ref={(input) => { this.sucursalInput = input; }}
          style={styles.input}
          value={this.state.sucursal}
          placeholder="sucursal"
          placeholderTextColor={Colors.tintColor}
          onChangeText={(sucursal)=>this.setState({sucursal})}
          returnKeyType = "next"
          onSubmitEditing={this.handleSucursalInputSubmit}
          blurOnSubmit={false}
        />
        <TextInput 
          ref={(input) => { this.passwordInput = input; }}
          style={styles.input}
          value={this.state.password}
          placeholder="contraseña"
          placeholderTextColor={Colors.tintColor}
          onChangeText={(password)=>this.setState({password})}
          secureTextEntry
        />
        <Button
          style={styles.button}
          title="Ingresa"
          color={Colors.tintColor}
          onPress={this.loginWithUser}
        />
        <Text>¿Olvidaste tu contraseña?</Text>
      </KeyboardAvoidingView>
    );
  }
}

const iconStyles = {
  borderRadius: 10,
  iconStyle: { paddingVertical: 5 },
};

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
  input:{
    backgroundColor: "white",
    width:250,
  },
  button:{
    width:250,
  },
  buttons:{
    justifyContent: 'space-between',
    flexDirection: 'row',
    margin: 20,
    marginBottom: 30,
  }
});

export default SignInScreen;