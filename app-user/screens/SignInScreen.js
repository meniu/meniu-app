'use strict';

import React, { Component } from 'react';
import { Button, Image, StyleSheet,  View, Text, ToastAndroid,
  Platform, TextInput, KeyboardAvoidingView, Alert,
  AsyncStorage } from 'react-native';
  import Colors from "../constants/Colors";
  import Icon from 'react-native-vector-icons/FontAwesome';
  import SafariView from 'react-native-safari-view';
  import { LoginButton } from 'react-native-fbsdk';

  class SignInScreen extends Component {

    constructor(props) {
      super(props);

      this.state = {
        email:"",
        password:"",
      };

      this.handleEmailInputSubmit = this.handleEmailInputSubmit.bind(this);

      this.loginWithUser = this.loginWithUser.bind(this);
      this.facebookSignIn = this.facebookSignIn.bind(this);
      this.googleSignIn = this.googleSignIn.bind(this);
    }

    static navigationOptions = {
      title: 'Ingresa',
    };

    async googleSignIn(){
      try {
        const result = await Expo.Google.logInAsync({
          androidClientId: "325641301007-dbn776ocng6arpk21leh38onr7t66j5e.apps.googleusercontent.com",
        //iosClientId: YOUR_CLIENT_ID_HERE,  <-- if you use iOS
        scopes: ["profile", "email"]
      })
        if (result.type === "success") {
          
          this.saveUserLocally(result.user);
          

        } else {
          console.log("cancelled")
        }
      } catch (e) {
        console.log("error", e)
      }
    }

    async saveUserLocally(user){
      try {
        await AsyncStorage.setItem('user', JSON.stringify(user));
        this.props.navigation.navigate("Main");
      } catch (error) {
        // Error saving data
        if(Platform.OS === 'android')
            ToastAndroid.show('No se pudo ingresar con el usuario. Intente de nuevo', ToastAndroid.SHORT);
      }
    }

    handleEmailInputSubmit() {
    // this.setState({focusPasswordInput: true});
    this.passwordInput.focus();
    }

  loginWithUser(){
    // POST petition, obtain token.

    // Token will be required to be passed to the main application 
    // in order to do other requests
    this.props.navigation.navigate("Main");
  }

  // Handle Login with Facebook button tap
  async facebookSignIn(){
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('1056365824552520', {
      permissions: ['public_profile'],
    });
    if (type === 'success') {
      // Get the user's name using Facebook's Graph API
      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${token}`);
      const user = await response.json();
      console.log("user", user);
      Alert.alert(
        'Logged in!',
        `Hi ${(user.name)}!`,
      );
      this.saveUserLocally(user);

    }
    else {
      Alert.alert('se recibe', type);
    }
    // this.props.navigation.navigate("Main");
  } 

  // Open URL in a browser
  openURL(url){
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
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
      <Text style={styles.subtitleText}>Ingresa con tu usuario</Text>
      <TextInput 
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
      secureTextEntry
      />
      <Button
      style={styles.button}
      title="Ingresa"
      color={Colors.tintColor}
      onPress={this.loginWithUser}
      />
      <Text>¿Olvidaste tu contraseña?</Text>
      <View style={styles.buttons}>
        <Icon.Button
          name="google"
          backgroundColor={Colors.google}
          onPress={this.googleSignIn}
          {...iconStyles}
          >
          Ingresa con Google
        </Icon.Button>
        <Icon.Button
          name="facebook"
          backgroundColor={Colors.facebook}
          onPress={this.facebookSignIn}
          {...iconStyles}
          >
          Ingresa con Facebook
        </Icon.Button>
      </View>
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
    flexDirection: 'column',
    margin: 20,
    marginBottom: 30,
  }
});

export default SignInScreen;