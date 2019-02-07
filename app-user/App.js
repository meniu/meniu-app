import React from "react";
import { View, Text, Button } from "react-native";
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from "react-navigation"; // Version can be specified in package.json

import HomeScreen from "./screens/HomeScreen.js";
import SignUpScreen from "./screens/SignUpScreen.js";
import SignInScreen from "./screens/SignInScreen.js";
import MainScreen from "./screens/MainScreen.js";
import OrderScreen from "./screens/OrderScreen.js";

import Colors from "./constants/Colors.js";

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: ({navigation}) =>({
       header: null,
     }),
  },
  SignUp: {
    screen: SignUpScreen,
  },
  SignIn: {
    screen: SignInScreen,
  },
  Main: {
    screen: MainScreen,
    navigationOptions: ({navigation}) =>({
       header: null,
     }),
  },
  Order: {
    screen: OrderScreen,
  }
}, {
    initialRouteName: "Home",
    /* header default config is here */
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Colors.tintColor ,
      }, 
    },
});

const AppContainer = createAppContainer(AppNavigator);
export default class App extends React.Component {
  render(){
    return <AppContainer/>;
  }
}