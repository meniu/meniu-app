'use strict';

import React, { Component } from 'react';
import { ToastAndroid, Platform, Image, StyleSheet,  View, Text } from 'react-native';
import Colors from "../constants/Colors";

class MainScreen extends Component {

  constructor(props) {
    super(props);
    console.log("props", this.props);
    this.state = {
      user:this.props.user,
      signedIn:true
    };
  }

  static navigationOptions = {
    title: 'Platos',
  };

  componentDidMount() {
    let user = this.props.navigation.getParam("user",{});
    if(!user)
      this.setState({
        signedIn:false 
      });
    else
      this.setState({
        user 
      });
  }

  checkSignIn(){
    if (!this.state.signedIn)
    {
      if(Platform.OS === 'android')
        ToastAndroid.show('Por favor ingresa', ToastAndroid.SHORT);
      this.props.navigation.navigate("SignIn");
    }

  }

  renderLoading(){
    return (<View>
      <Text>Loading...</Text>
    </View>);
  }

  render() {
    if(!this.state.user)
      return this.renderLoading();
    else
      return (
        <View style={styles.container}>
          <View>
            <Image
              style={{width: 50, height: 50}}
              source={{uri: this.state.user.photoUrl}}
            />
            <Text>{this.state.user.name}</Text>
          </View>
          <Text>¡Bienvenido a Meniu, {this.state.user.name}!</Text>
        </View>
      );
  }
}

const styles = StyleSheet.create({
  container:{ 
    flex: 1, 
    alignItems: "center", 
    justifyContent: "space-around",
    backgroundColor: Colors.backgroundColor,
  },
});


export default MainScreen;