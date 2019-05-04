"use strict";

import Colors from "../constants/Colors";
import AuthService from "../services/AuthService";
import React, { Component } from "react";
import { Button, StyleSheet,  View, Text, Alert,
  Platform, TextInput, KeyboardAvoidingView } from "react-native";

class SignUpScreen extends Component {

  constructor(props) {
    super(props);
  
    this.state = {
      firstName:"",
      lastName:"",
      email:"",
      password:"",
      confirmedPassword:"",

      showPasswordHelper:false
    };

    this.handleFirstNameInputSubmit = this.handleFirstNameInputSubmit.bind(this);
    this.handleLastNameInputSubmit = this.handleLastNameInputSubmit.bind(this);
    this.handleEmailInputSubmit = this.handleEmailInputSubmit.bind(this);
    this.handlePasswordInputSubmit = this.handlePasswordInputSubmit.bind(this);
    this.signUpWithUser = this.signUpWithUser.bind(this);
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

  signUpWithUser(){
    // POST petition, obtain token.
    AuthService.registerUser(this.state.email, this.state.firstName, this.state.lastName, 
      this.state.password, this.state.confirmedPassword)
      .then((response) => response.json())
      .then((responseJSON) => {
        let user = responseJSON;
        // Token se guarda en user.token
        if(user.token) {
          AuthService.saveUserLocally(user);
          this.props.navigation.navigate("Main");
        }
        else throw Error("Registro inválido");
      })
      .catch((error)=>{
        Alert.alert("Hubo un error en registro, por favor intenta de nuevo");
        console.log({error});
      });
  }



  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
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
        {(this.state.showPasswordHelper) &&
          <Text style={styles.helper}> Tu contraseña debe tener Mayúscula, Minúscula y un caracter especial</Text> }
        <TextInput 
          ref={(input) => { this.passwordInput = input; }}
          style={styles.input}
          value={this.state.password}
          placeholder="contraseña"
          placeholderTextColor={Colors.tintColor}
          onChangeText={(password)=>this.setState({password,showPasswordHelper:true})}
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
          onChangeText={(confirmedPassword)=>this.setState({confirmedPassword, showPasswordHelper: false})}
          secureTextEntry
        />
        <Button
          style={styles.button}
          title="Registrate"
          color={Colors.tintColor}
          onPress={this.signUpWithUser}
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
  helper:{
    width:250,
    color:"red",
  },
  button:{
    width:250,
  },
});


export default SignUpScreen;