import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from "react-navigation"; // Version can be specified in package.json
import HomeScreen from "./screens/HomeScreen.js";
import SignInScreen from "./screens/SignInScreen.js";
import MainScreen from "./screens/MainScreen.js";
import PlateSaleScreen from "./screens/PlateSaleScreen.js";
import CodeScannedScreen from "./screens/CodeScannedScreen.js";
import Colors from "./constants/Colors";

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: ({navigation}) =>({
      header: null,
    }),
  },
  SignIn:{
    screen: SignInScreen,
  },
  Main: {
    screen: MainScreen,
    navigationOptions: ({navigation}) =>({
      header: null,
    }),
  },
  PlateSale: {
    screen: PlateSaleScreen,
    navigationOptions: ({navigation}) =>({
      header: null,
    }),
  },
  CodeScanned: {
    screen: CodeScannedScreen,
  }
}, {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Colors.tintColor ,
      }, 
    }
});

const AppContainer = createAppContainer(AppNavigator);
export default class App extends React.Component {
  render(){
    return <AppContainer/>;
  }
}