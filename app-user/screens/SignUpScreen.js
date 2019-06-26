"use strict";

import Colors from "../constants/Colors";
import AuthService from "../services/AuthService";
import React, { Component } from "react";
import { Button, StyleSheet,  View, Text, Alert, Switch,
  Platform, TextInput, KeyboardAvoidingView, TouchableHighlight } from "react-native";
import { Overlay } from "react-native-elements";


class SignUpScreen extends Component {

  constructor(props) {
    super(props);
  
    this.state = {
      firstName:"",
      lastName:"",
      email:"",
      password:"",
      confirmedPassword:"",
      acceptTermsAndConditions:false,

      showPasswordHelper:false,
      showTC:false,
    };

  }

  handleFirstNameInputSubmit = ()=>{
    this.lastNameInput.focus();
  }
  handleLastNameInputSubmit = ()=>{
    this.emailInput.focus();
  }
  handleEmailInputSubmit = ()=>{
    this.passwordInput.focus();
  }
  handlePasswordInputSubmit = ()=>{
    this.confirmedPasswordInput.focus();
  }

  signUpWithUser = ()=>{
    // POST petition, obtain token.
    AuthService.registerUser(this.state.email, this.state.firstName, this.state.lastName, 
      this.state.password, this.state.confirmedPassword, this.state.acceptTermsAndConditions)
      .then((response) => response.json())
      .then((responseJSON) => {
        console.log(responseJSON);
        let user = responseJSON;
        // Token se guarda en user.token
        if(user.applicationUser.token) {
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

  ModalTC = (props) => {
    return( 
      <Overlay
        isVisible={props.visible}
        onBackdropPress={() => this.setState({ showTC: false })}
      >
        <Text>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
          Nobis eum nihil vero? Fuga amet, fugit eveniet, explicabo recusandae 
          tempora ex at delectus ipsam nihil non in deleniti dolore laborum quis.
        </Text>
      </Overlay>
    );
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <this.ModalTC visible={this.state.showTC}/>
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
        <View style={{flexDirection:"row", justifyContent:"center", alignItems:"center"}}>
          <Switch
            value={this.state.acceptTermsAndConditions}
            onValueChange={() => this.setState({
              acceptTermsAndConditions: !this.state.acceptTermsAndConditions
            })}
          />
          <Text>Acepto </Text>
          <TouchableHighlight onPress={()=>this.setState({showTC:true})}>
            <Text style={{fontWeight:"bold"}}>
              Términos y condiciones 
            </Text>
          </TouchableHighlight>
        </View>
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