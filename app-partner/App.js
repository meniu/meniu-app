import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from "react-navigation"; // Version can be specified in package.json
import HomeScreen from "./screens/HomeScreen.js";
import SignInScreen from "./screens/SignInScreen.js";
import MainScreen from "./screens/MainScreen.js";

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
  },
  SignIn:{
    screen: SignInScreen,
  },
  Main: {
    screen: MainScreen,
  }
}, {
    initialRouteName: "Home",
});

const AppContainer = createAppContainer(AppNavigator);
export default class App extends React.Component {
  render(){
    return <AppContainer/>;
  }
}