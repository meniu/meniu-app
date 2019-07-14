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
import Icon from 'react-native-vector-icons/FontAwesome';
import SafariView from 'react-native-safari-view';
import { LoginButton } from 'react-native-fbsdk';
import AuthService from '../services/AuthService';
class SignInScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };

    this.handleEmailInputSubmit = this.handleEmailInputSubmit.bind(this);

    this.loginWithUser = this.loginWithUser.bind(this);
    this.facebookSignIn = this.facebookSignIn.bind(this);
    this.googleSignIn = this.googleSignIn.bind(this);
  }

  static navigationOptions = {
    title: 'Ingresa',
  };

  async googleSignIn() {
    try {
      const result = await Expo.Google.logInAsync({
        androidClientId: "325641301007-dbn776ocng6arpk21leh38onr7t66j5e.apps.googleusercontent.com",
        //iosClientId: YOUR_CLIENT_ID_HERE,  <-- if you use iOS
        scopes: ["profile", "email"]
      });
      console.log("user", result);
      if (result.type === "success") {
        AuthService.externalLogIn('Google', result.user.email).then(response => response.json()).then(responseJSON => {
          console.log('ya respondió');
          console.log(responseJSON);
          let user = responseJSON;
          this.saveUserLocally(user);
          // TODO: pass token to Backend
          this.props.navigation.navigate("Main");
        });

      } else {
        console.log("cancelled")
      }
    } catch (e) {
      console.log("error", e)
    }
  }

  // Handle Login with Facebook button tap
  async facebookSignIn() {
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('1056365824552520', {
      permissions: ['public_profile'],
    });
    if (type === 'success') {
      // Get the user's name using Facebook's Graph API
      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${token}`);
      const user = await response.json();
      console.log("user", user);
      AuthService.externalLogIn('Facebook', result.user.email).then(response => response.json()).then(responseJSON => {
        console.log('ya respondió');
        console.log(responseJSON);
        this.saveUserLocally(result.user);
        // TODO: pass token to Backend
        this.props.navigation.navigate("Main");
      });

    }
    else {
      Alert.alert('se recibe', type);
    }
    // this.props.navigation.navigate("Main");
  }

  async saveUserLocally(user) {
    AuthService.saveUserLocally(user);
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
        console.log(user);
        // Token se guarda en user.token
        if (user.applicationUser.token) {
          AuthService.saveUserLocally(user);
          this.props.navigation.navigate("Main");
        }
        else throw Error("Login inválido");
      })
      .catch((error) => {
        Alert.alert("Login inválido, por favor intenta de nuevo");
        console.log({ error });
      });
  }

  // Open URL in a browser
  openURL(url) {
    // Use SafariView on iOS
    if (Platform.OS === 'ios') {
      SafariView.show({
        url: url,
        fromBottom: true,
      });
    }
    // Or Linking.openURL on Android
    else {
      Linking.openURL(url);
    }
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
          <View>
            <View style={styles.formContainer}>
              <View style={{justifyContent:"space-evenly", alignItems:"flex-start"}}>
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
              <View style={{justifyContent:"space-around", alignItems:"center"}}>
                <Button
                  buttonStyle={styles.button}
                  titleStyle={styles.textButton}
                  title="Iniciar sesión"
                  color={Colors.tintColor}
                  onPress={this.loginWithUser}
                />
                <TouchableHighlight onPress={()=>{}}>
                  <Text style={styles.linkText}>¿Olvidaste tu contraseña?</Text>
                </TouchableHighlight>
                <TouchableHighlight 
                  onPress={()=>this.props.navigation.navigate("SignUp")}
                >
                  <Text style={styles.linkText}>Regístrate en meniu</Text>
                </TouchableHighlight>
                
              </View>
            </View>
            <View style={styles.socialContainer}>
              <Icon.Button
                name="google"
                backgroundColor={Colors.google}
                onPress={this.googleSignIn}
                {...iconStyles}
              >
                Ingresa con Google
              </Icon.Button>
              <View style={styles.br}></View>
              <Icon.Button
                name="facebook"
                backgroundColor={Colors.facebook}
                onPress={this.facebookSignIn}
                {...iconStyles}
              >
                Ingresa con Facebook
              </Icon.Button>
            </View>
          </View>
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
  container: {
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
    height:Layout.window.height * 0.35,
    width: Layout.window.width * 0.9,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: Colors.backgroundColor,
    justifyContent:"space-around",
    alignItems:"center",
  },
  socialContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'column',
    width: Layout.window.width * 0.9,
    paddingVertical: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    backgroundColor:Colors.yellowMeniu,
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
    flexDirection:"column",
    width: "80%",
    backgroundColor: Colors.yellowMeniu,
    justifyContent: "center",
    alignItems:"center",
    alignContent:"center",
    borderRadius:10,
  },
  linkText: {
    margin:4,
    borderBottomWidth: 1,
    borderBottomColor: Colors.black,
  },
  textButton: {
    color:Colors.black, 
    textAlign:"center",
  },
  br: {
    height: 10
  }
});

export default SignInScreen;