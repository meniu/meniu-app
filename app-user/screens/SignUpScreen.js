"use strict";

import Colors from "../constants/Colors";
import Layout from "../constants/Layout";
import AuthService from "../services/AuthService";
import React, { Component } from "react";
import { StyleSheet,  View, Alert, Switch, Image,
  Platform, TextInput, KeyboardAvoidingView, TouchableHighlight,
  ImageBackground,
} from "react-native";
import { Overlay, Button, Text, } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";


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
        <Text style={{textAlign:"center", fontWeight:"bold"}}>Términos y Condiciones</Text>
        <Text>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
          Nobis eum nihil vero? Fuga amet, fugit eveniet, explicabo recusandae 
          tempora ex at delectus ipsam nihil non in deleniti dolore laborum quis.
        </Text>
        <Text style={{textAlign:"center", fontWeight:"bold"}}>Política de tratamiento de datos</Text>
        <Text></Text>
      </Overlay>
    );
  }

  render() {
    return (
      <ImageBackground
        source={require('../assets/images/bn-login-background.jpg')} 
        style={{resizeMode:"cover", width:Layout.window.width, height:Layout.window.height}}       
      >
        <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
          <View style={styles.logoContainer}>
            <Image 
              source={require('../assets/images/logo-login.png')} 
              style={styles.titleImage}/>
            {/* <Text>Meniu</Text> */}
          </View>
          <View style={styles.formContainer}>
            <View 
              style={{flexDirection:"row", width:"100%", justifyContent:"flex-start", 
                marginLeft: 15, marginVertical:5, alignItems:"flex-start"}}>
              <TouchableHighlight 
                style={{backgroundColor:Colors.yellowMeniu, borderRadius:500, paddingHorizontal:7, paddingVertical:2}}
                onPress={()=>this.props.navigation.navigate("SignIn")}>
                <Ionicons name={"ios-arrow-round-back"} size={25} color={Colors.black}  />
              </TouchableHighlight>
            </View>
            <View style={{justifyContent:"space-evenly", alignItems:"flex-start"}}>
              <Text style={styles.subtitleText}>Nombres</Text>          
              <TextInput 
                ref={(input) => { this.firstNameInput = input; }}
                style={styles.input}
                value={this.state.firstName}
                onChangeText={(firstName)=>this.setState({firstName})}
                returnKeyType = "next"
                onSubmitEditing={this.handleFirstNameInputSubmit}
                blurOnSubmit={false}
                autoFocus
              />
              <Text style={styles.subtitleText}>Apellidos</Text>          
              <TextInput 
                ref={(input) => { this.lastNameInput = input; }}
                style={styles.input}
                value={this.state.lastName}
                onChangeText={(lastName)=>this.setState({lastName})}
                returnKeyType = "next"
                onSubmitEditing={this.handleLastNameInputSubmit}
                blurOnSubmit={false}
              />
              <Text style={styles.subtitleText}>Email</Text>          
              <TextInput 
                ref={(input) => { this.emailInput = input; }}
                style={styles.input}
                value={this.state.email}
                keyboardType="email-address"
                onChangeText={(email)=>this.setState({email})}
                returnKeyType = "next"
                onSubmitEditing={this.handleEmailInputSubmit}
                blurOnSubmit={false}
              />
              {(this.state.showPasswordHelper) &&
                <Text style={styles.helper}> Tu contraseña debe tener Mayúscula, Minúscula y un caracter especial</Text> }
              <Text style={styles.subtitleText}>Contraseña</Text>          
              <TextInput 
                ref={(input) => { this.passwordInput = input; }}
                style={styles.input}
                value={this.state.password}
                onChangeText={(password)=>this.setState({password,showPasswordHelper:true})}
                returnKeyType = "next"
                onSubmitEditing={this.handlePasswordInputSubmit}
                blurOnSubmit={false}
                secureTextEntry
              />
              <Text style={styles.subtitleText}>Repetir Contraseña</Text>          
              <TextInput 
                ref={(input) => { this.confirmedPasswordInput = input; }}
                style={styles.input}
                value={this.state.confirmedPassword}
                onChangeText={(confirmedPassword)=>this.setState({confirmedPassword, showPasswordHelper: false})}
                secureTextEntry
              />
            </View>
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
              buttonStyle={styles.button}
              titleStyle={styles.textButton}
              title="Registrarme"
              color={Colors.tintColor}
              onPress={this.signUpWithUser}
            />
          </View>
          <this.ModalTC visible={this.state.showTC}/>

        </KeyboardAvoidingView>
      </ImageBackground>
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
  },
  logoContainer: {
    height:Layout.window.height * 0.2
  },
  titleImage: {
    height:Layout.window.width * 0.5 * 0.8,
    width:Layout.window.width * 0.694 * 0.8,
    resizeMode:"contain"
  },
  formContainer: {
    height:Layout.window.height * 0.6,
    width: Layout.window.width * 0.8,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 15,
    backgroundColor: Colors.backgroundColor,
    justifyContent:"space-around",
    alignItems:"center",
  },
  subtitleText: {
    fontSize: 16,
    color: "black",
    fontWeight: "bold",
    textAlign: "left",
  },
  input:{
    backgroundColor: "white",
    width:250,
  },
  helper:{
    width:250,
    color:"red",
  },
  button: {
    flexDirection:"column",
    width: "80%",
    backgroundColor: Colors.yellowMeniu,
    justifyContent: "center",
    alignItems:"center",
    alignContent:"center",
    borderRadius:10,
  },
  textButton: {
    color:Colors.black, 
    textAlign:"center",
  },
});


export default SignUpScreen;