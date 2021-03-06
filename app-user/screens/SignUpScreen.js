"use strict";

import Colors from "../constants/Colors";
import Layout from "../constants/Layout";
import AuthService from "../services/AuthService";
import React, { Component } from "react";
import {
  StyleSheet, View, Alert, Switch, Image,
  Platform, TextInput, KeyboardAvoidingView, TouchableHighlight,
  ImageBackground, ActivityIndicator
} from "react-native";
import { Overlay, Button, Text, } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";


class SignUpScreen extends Component {

  constructor(props) {
    super(props);

    const { navigation } = this.props;
    const email = navigation.getParam("email", "");
    const firstName = navigation.getParam("firstName", "");
    const lastName = navigation.getParam("lastName", "");

    this.state = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: "",
      confirmedPassword: "",
      acceptTermsAndConditions: false,

      showPasswordHelper: false,
      showTC: false,
      signing: false
    };

  }

  handleFirstNameInputSubmit = () => {
    this.lastNameInput.focus();
  }
  handleLastNameInputSubmit = () => {
    this.emailInput.focus();
  }
  handleEmailInputSubmit = () => {
    this.passwordInput.focus();
  }
  handlePasswordInputSubmit = () => {
    this.confirmedPasswordInput.focus();
  }

  blurInputs = () => {
    this.firstNameInput.blur();
    this.lastNameInput.blur();
    this.emailInput.blur();
    this.passwordInput.blur();
    this.confirmedPasswordInput.blur();
  }

  signUpWithUser = () => {
    this.blurInputs();
    // POST petition, obtain token.
    this.setState({
      signing: true
    }, () => {
      AuthService.registerUser(this.state.email, this.state.firstName, this.state.lastName,
        this.state.password, this.state.confirmedPassword, this.state.acceptTermsAndConditions)
        .then((response) => response.json())
        .then((responseJSON) => {
          // console.log(responseJSON);
          let user = responseJSON;
          // Token se guarda en user.token
          if (user.applicationUser.token) {
            AuthService.saveUserLocally(user);
            AuthService.saveCredentialsLocally(this.state.email, this.state.password);
            AuthService.saveTokenLocally(user.applicationUser.token, user.applicationUser.refreshToken);
            this.setState({
              signing: false,
              firstName: "",
              lastName: "",
              email: "",
              password: "",
              confirmedPassword: "",
              acceptTermsAndConditions: false,
            }, () => {
              this.props.navigation.navigate("Main");
            });
          }
          else throw Error("Registro inválido");
        })
        .catch((error) => {
          this.setState({
            signing: false
          }, () => {
            Alert.alert("Hubo un error en registro, por favor intenta de nuevo");
          });

          // console.log({error});
        });
    });

  }

  ModalTC = (props) => {
    return (
      <Overlay
        isVisible={props.visible}
        onBackdropPress={() => this.setState({ showTC: false })}
      >
        <View>
          <Text style={{ textAlign: "center", fontWeight: "bold" }}>Términos y Condiciones</Text>
          <Text>
            Visita https://meniu.com.co/terminos-y-condiciones/ para saber nuestros términos y condiciones
          </Text>
          {/* <Text style={{textAlign:"center", fontWeight:"bold"}}>Política de tratamiento de datos</Text>
          <Text></Text> */}
        </View>
      </Overlay>
    );
  }

  render() {
    return (
      <ImageBackground
        source={require('../assets/images/bn-login-background.jpg')}
        style={{ resizeMode: "cover", width: Layout.window.width, height: Layout.window.height }}
      >
        <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
          <View style={styles.logoContainer}>
            <Image
              source={require('../assets/images/logo-login.png')}
              style={styles.titleImage} />
            {/* <Text>Meniu</Text> */}
          </View>
          <View style={styles.formContainer}>
            <View
              style={{
                flexDirection: "row", width: "100%", justifyContent: "flex-start",
                marginLeft: 15, marginVertical: 5, alignItems: "flex-start"
              }}>
              <TouchableHighlight
                style={{ backgroundColor: Colors.yellowMeniu, borderRadius: 500, paddingHorizontal: 7, paddingVertical: 2 }}
                onPress={() => this.props.navigation.navigate("SignIn")}>
                <Ionicons name={"ios-arrow-round-back"} size={25} color={Colors.black} />
              </TouchableHighlight>
            </View>
            <View style={{ justifyContent: "space-evenly", alignItems: "flex-start" }}>
              <Text style={styles.subtitleText}>Nombres</Text>
              <TextInput
                ref={(input) => { this.firstNameInput = input; }}
                style={styles.input}
                value={this.state.firstName}
                onChangeText={(firstName) => this.setState({ firstName })}
                returnKeyType="next"
                onSubmitEditing={this.handleFirstNameInputSubmit}
                blurOnSubmit={false}
                autoFocus
              />
              <Text style={styles.subtitleText}>Apellidos</Text>
              <TextInput
                ref={(input) => { this.lastNameInput = input; }}
                style={styles.input}
                value={this.state.lastName}
                onChangeText={(lastName) => this.setState({ lastName })}
                returnKeyType="next"
                onSubmitEditing={this.handleLastNameInputSubmit}
                blurOnSubmit={false}
              />
              <Text style={styles.subtitleText}>Email</Text>
              <TextInput
                ref={(input) => { this.emailInput = input; }}
                style={styles.input}
                value={this.state.email}
                keyboardType="email-address"
                onChangeText={(email) => this.setState({ email })}
                returnKeyType="next"
                onSubmitEditing={this.handleEmailInputSubmit}
                blurOnSubmit={false}
              />
              {(this.state.showPasswordHelper) &&
                <Text style={styles.helper}> Tu contraseña debe tener Mayúscula, Minúscula y un caracter especial</Text>}
              <Text style={styles.subtitleText}>Contraseña</Text>
              <TextInput
                ref={(input) => { this.passwordInput = input; }}
                style={styles.input}
                value={this.state.password}
                onChangeText={(password) => this.setState({ password, showPasswordHelper: true })}
                returnKeyType="next"
                onSubmitEditing={this.handlePasswordInputSubmit}
                blurOnSubmit={false}
                secureTextEntry
              />
              <Text style={styles.subtitleText}>Repetir Contraseña</Text>
              <TextInput
                ref={(input) => { this.confirmedPasswordInput = input; }}
                style={styles.input}
                value={this.state.confirmedPassword}
                onChangeText={(confirmedPassword) => this.setState({ confirmedPassword, showPasswordHelper: false })}
                secureTextEntry
              />
            </View>
            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
              <Switch
                value={this.state.acceptTermsAndConditions}
                onValueChange={() => this.setState({
                  acceptTermsAndConditions: !this.state.acceptTermsAndConditions
                })}
              />
              <Text>Acepto </Text>
              <TouchableHighlight onPress={() => this.setState({ showTC: true })}>
                <Text style={{ fontWeight: "bold" }}>
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
          <this.ModalTC visible={this.state.showTC} />

        </KeyboardAvoidingView>
        {this.state.signing &&
          <View style={styles.loading}>
            <ActivityIndicator size='large' color='#000000' />
          </View>
        }
      </ImageBackground>
    );
  }
}

const iconStyles = {
  borderRadius: 10,
  iconStyle: { paddingVertical: 5 },
};

const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF88'
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },
  logoContainer: {
    height: Layout.window.height * 0.2
  },
  titleImage: {
    height: Layout.window.width * 0.5 * 0.8,
    width: Layout.window.width * 0.694 * 0.8,
    resizeMode: "contain"
  },
  formContainer: {
    height: Layout.window.height * 0.6,
    width: Layout.window.width * 0.8,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 15,
    backgroundColor: Colors.backgroundColor,
    justifyContent: "space-around",
    alignItems: "center",
  },
  subtitleText: {
    fontSize: 16,
    color: "black",
    fontWeight: "bold",
    textAlign: "left",
  },
  input: {
    backgroundColor: "white",
    width: 250,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5
  },
  helper: {
    width: 250,
    color: "red",
  },
  button: {
    flexDirection: "column",
    width: "80%",
    backgroundColor: Colors.yellowMeniu,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    borderRadius: 10,
  },
  textButton: {
    color: Colors.black,
    textAlign: "center",
  },
});


export default SignUpScreen;