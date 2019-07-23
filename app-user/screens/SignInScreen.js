'use strict';

import React, { Component } from 'react';
import {
  Image, StyleSheet, View, Text, ToastAndroid,
  Platform, TextInput, KeyboardAvoidingView, Alert,
  TouchableHighlight, ImageBackground
} from 'react-native';
import { Button } from 'react-native-elements';
import Colors from "../constants/Colors";
import Layout from '../constants/Layout';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import * as Facebook from 'expo-facebook';
import { Google } from 'expo';
import AuthService from '../services/AuthService';
import CustomIcon from '../components/CustomIcon';

class SignInScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      loaded: true,
    };

    this.handleEmailInputSubmit = this.handleEmailInputSubmit.bind(this);

    this.loginWithUser = this.loginWithUser.bind(this);
    this.facebookSignIn = this.facebookSignIn.bind(this);
    this.googleSignIn = this.googleSignIn.bind(this);
  }

  componentDidMount() {
    AuthService.retrieveToken().then(user => {
      user ? this.props.navigation.navigate("Main"):
      this.setState({loaded:true});
    });
  }

  static navigationOptions = {
    title: 'Ingresa',
  };

  async googleSignIn() {
    try {
      const result = await Google.logInAsync({
        androidClientId: "325641301007-dbn776ocng6arpk21leh38onr7t66j5e.apps.googleusercontent.com",
        iosClientId: "325641301007-4htnseppal11sdc58ia9ltin1v7bflh4.apps.googleusercontent.com",
        scopes: ["profile", "email"]
      });
      // console.log("user", result);
      if (result.type === "success") {
        AuthService.externalLogIn('Google', result.user.email).then(response => response.json()).then(responseJSON => {
          // console.log('ya respondió');
          // console.log(responseJSON);

          switch (responseJSON._statusCode) {
            case 400:
              // No user given...
              this.props.navigation.navigate("SignUp", {
                email: result.user.email,
                firstName: result.user.givenName,
                lastName: result.user.familyName,
              })
              break;

            case undefined:
              // No status code should mean the object retrieved has the user
              break;

            case 200:
              // best case
              break;
          
            default:
              // Any other error
              break;
          }
          let user = responseJSON;

          if (user.applicationUser.token) {
            // TODO Check if with social login credentials saved are needed
            // this.saveCredentialsLocally(email, password);
            this.saveTokenLocally(user.applicationUser.token);
            this.saveUserLocally(user);
            this.props.navigation.navigate("Main");
          }
          else throw Error("Login inválido");

        });

      } else {
      Alert.alert("Ha habido un problema iniciando sesión con google");
      // console.log("cancelled")
      }
    } catch (e) {
      Alert.alert("Ha habido un problema iniciando sesión con google");
      // console.log("error", e)
    }
  }

  // Handle Login with Facebook button tap
  async facebookSignIn() {
    const { type, token } = await Facebook.logInWithReadPermissionsAsync('1056365824552520', {
      permissions: ['public_profile'],
    });
    if (type === 'success') {
      // Get the user's name using Facebook's Graph API
      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${token}&fields=id,name,email`);
      const fbUser = await response.json();
      // console.log({fbUser});
      AuthService.externalLogIn('Facebook', fbUser.email).then(response => response.json())
        .then(responseJSON => {
        // console.log("fb ok ", {responseJSON});
        
        switch (responseJSON._statusCode) {
          case 400:
            // No user given...
            this.props.navigation.navigate("SignUp", {
              email: fbUser.email,
              firstName: fbUser.name,
            })
            break;

          case undefined:
            // No status code should mean the object retrieved has the user
            break;

          case 200:
            // best case
            break;
        
          default:
            // Any other error
            break;
        }
        let user = responseJSON;

        if (user.applicationUser.token) {
          // TODO Check if with social login credentials saved are needed
          // this.saveCredentialsLocally(email, password);
          this.saveTokenLocally(user.applicationUser.token, user.applicationUser.refreshToken);
          this.saveUserLocally(user);
          this.props.navigation.navigate("Main");
        }
        else throw Error("Login inválido");
        // this.saveUserLocally(result.user);

        // TODO: pass token to Backend
        // this.props.navigation.navigate("Main");
      })
      .catch(error=>{
        Alert.alert(`Hubo un problema con nuestros servidores`)
        // console.log({error});
        
      });

    }
    else {
      Alert.alert("Ha habido un problema iniciando sesión con facebook");
    }
    // this.props.navigation.navigate("Main");
  }

  async saveUserLocally(user) {
    await AuthService.saveUserLocally(user);
  }

  async saveTokenLocally(token) {
    await AuthService.saveTokenLocally(token);
  }

  async saveCredentialsLocally(email, password) {
    await AuthService.saveCredentialsLocally(email, password);
  }

  handleEmailInputSubmit() {
    // this.setState({focusPasswordInput: true});
    this.passwordInput.focus();
  }

  loginWithUser() {
    // POST petition, obtain token.
    const { email, password } = this.state;

    AuthService.logIn(email, password)
      .then((response) => response.json())
      .then((responseJSON) => {
        let user = responseJSON;
        // console.log(user);
        // Token se guarda en user.token
        if (user.applicationUser.token) {
          this.saveCredentialsLocally(email, password);
          this.saveTokenLocally(user.applicationUser.token, user.applicationUser.refreshToken);
          this.saveUserLocally(user);
          this.props.navigation.navigate("Main");
        }
        else throw Error("Login inválido");
      })
      .catch((error) => {
        Alert.alert("Login inválido, por favor intenta de nuevo");
        // console.log({ error });
      });
  }

  renderLoading() {
    return (
      <Image
        source={require('../assets/images/splash.png')}
        style={{
          width: '100%', height: '100%', resizeMode: "cover",
          justifyContent: "center", alignItems: "center",
        }}
      />
    );
  }

  render() {
    if (!this.state.loaded)
      return this.renderLoading();
    else return (
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
          <View>
            <View style={styles.formContainer}>
              <View style={{ justifyContent: "space-evenly", alignItems: "flex-start" }}>
                <Text style={styles.subtitleText}>Email</Text>
                <TextInput
                  style={styles.input}
                  value={this.state.email}
                  keyboardType="email-address"
                  onChangeText={(email) => this.setState({ email })}
                  returnKeyType="next"
                  onSubmitEditing={this.handleEmailInputSubmit}
                  blurOnSubmit={false}
                />
                <Text style={styles.subtitleText}>Contraseña</Text>
                <TextInput
                  ref={(input) => this.passwordInput = input}
                  style={styles.input}
                  value={this.state.password}
                  onChangeText={(password) => this.setState({ password })}
                  secureTextEntry
                />
              </View>
              <View style={{ justifyContent: "space-around", alignItems: "center" }}>
                <Button
                  buttonStyle={styles.button}
                  titleStyle={styles.textButton}
                  title="Iniciar sesión"
                  color={Colors.tintColor}
                  onPress={this.loginWithUser}
                />
                {/* <TouchableHighlight onPress={()=>{}}>
                  <Text style={styles.linkText}>¿Olvidaste tu contraseña?</Text>
                </TouchableHighlight> */}
                <TouchableHighlight
                  onPress={() => this.props.navigation.navigate("SignUp")}
                >
                  <Text style={styles.linkText}>Regístrate en meniu</Text>
                </TouchableHighlight>

              </View>
            </View>
            <View style={styles.socialContainer}>
              <Button
                icon={
                  <CustomIcon
                    name="facebook"
                    size={30}
                    color={Colors.facebook}
                  />
                }
                onPress={this.facebookSignIn}
                containerStyle={{ width: '80%' }}
                buttonStyle={styles.socialButton}
                titleStyle={styles.socialButtonTitle}
                iconContainerStyle={iconStyles}
                title="Ingresa con Facebook"
              />
              <View style={styles.br}></View>
              <Button
                icon={
                  <FontAwesome
                    name="google"
                    size={25}
                    color={Colors.google}
                  />
                }
                onPress={this.googleSignIn}
                containerStyle={{ width: '80%' }}
                buttonStyle={styles.socialButton}
                titleStyle={styles.socialButtonTitle}
                iconContainerStyle={iconStyles}
                title="   Ingresa con Google"
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>

    );
  }
}

const iconStyles = {
  paddingVertical: 5,
};

const styles = StyleSheet.create({
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
    height: Layout.window.height * 0.35,
    width: Layout.window.width * 0.9,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: Colors.backgroundColor,
    justifyContent: "space-around",
    alignItems: "center",
  },
  socialContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'column',
    width: Layout.window.width * 0.9,
    paddingVertical: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    backgroundColor: Colors.yellowMeniu,
  },
  socialButton: {
    backgroundColor: Colors.backgroundColor,
    borderRadius: 15,
    // width:'80%',
  },
  socialButtonTitle: {
    color: "grey",
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
  linkText: {
    margin: 4,
    borderBottomWidth: 1,
    borderBottomColor: Colors.black,
  },
  textButton: {
    color: Colors.black,
    textAlign: "center",
  },
  br: {
    height: 10
  }
});

export default SignInScreen;