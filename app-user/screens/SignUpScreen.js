"use strict";

import React, { Component } from "react";
import { Button, StyleSheet,  View, Text, 
  Platform, TextInput, KeyboardAvoidingView } from "react-native";
import Colors from "../constants/Colors";

class SignUpScreen extends Component {

  constructor(props) {
    super(props);
  
    this.state = {
      firstName:"",
      lastName:"",
      email:"",
      password:"",
      confirmedPassword:"",
    };

    this.handleFirstNameInputSubmit = this.handleFirstNameInputSubmit.bind(this);
    this.handleLastNameInputSubmit = this.handleLastNameInputSubmit.bind(this);
    this.handleEmailInputSubmit = this.handleEmailInputSubmit.bind(this);
    this.handlePasswordInputSubmit = this.handlePasswordInputSubmit.bind(this);
    this.signWithUser = this.signWithUser.bind(this);
  }

  handleFirstNameInputSubmit(){
    this.lastNameInput.focus();
  }
  handleLastNameInputSubmit(){
    this.emailInput.focus();
  }
  handleEmailInputSubmit(){
    this.passwordInput.focus();
  }
  handlePasswordInputSubmit(){
    this.confirmedPasswordInput.focus();
  }

  signWithUser(){
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
          ref={(input) => { this.firstNameInput = input; }}
          style={styles.input}
          value={this.state.firstName}
          placeholder="Nombres"
          placeholderTextColor={Colors.tintColor}
          onChangeText={(firstName)=>this.setState({firstName})}
          returnKeyType = "next"
          onSubmitEditing={this.handleFirstNameInputSubmit}
          blurOnSubmit={false}
          autoFocus
        />
        <TextInput 
          ref={(input) => { this.lastNameInput = input; }}
          style={styles.input}
          value={this.state.lastName}
          placeholder="Apellidos"
          placeholderTextColor={Colors.tintColor}
          onChangeText={(lastName)=>this.setState({lastName})}
          returnKeyType = "next"
          onSubmitEditing={this.handleLastNameInputSubmit}
          blurOnSubmit={false}
        />
        <TextInput 
          ref={(input) => { this.emailInput = input; }}
          style={styles.input}
          value={this.state.email}
          placeholder="email"
          placeholderTextColor={Colors.tintColor}
          keyboardType="email-address"
          onChangeText={(email)=>this.setState({email})}
          returnKeyType = "next"
          onSubmitEditing={this.handleEmailInputSubmit}
          blurOnSubmit={false}
        />
        <TextInput 
          ref={(input) => { this.passwordInput = input; }}
          style={styles.input}
          value={this.state.password}
          placeholder="contraseña"
          placeholderTextColor={Colors.tintColor}
          onChangeText={(password)=>this.setState({password})}
          returnKeyType = "next"
          onSubmitEditing={this.handlePasswordInputSubmit}
          blurOnSubmit={false}
          secureTextEntry
        />
        <TextInput 
          ref={(input) => { this.confirmedPasswordInput = input; }}
          style={styles.input}
          value={this.state.confirmedPassword}
          placeholder="confirmar contraseña"
          placeholderTextColor={Colors.tintColor}
          onChangeText={(confirmedPassword)=>this.setState({confirmedPassword})}
          secureTextEntry
        />
        <Button
          style={styles.button}
          title="Registrate"
          color={Colors.tintColor}
          onPress={this.signWithUser}
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
});


export default SignUpScreen;