import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from "react-navigation"; // Version can be specified in package.json
import SignInScreen from "./screens/SignInScreen.js";
import MainScreen from "./screens/MainScreen.js";
import Colors from "./constants/Colors";
import PlateSaleScreen from './screens/PlateSaleScreen';

const AppNavigator = createStackNavigator({
  SignIn: {
    screen: SignInScreen,
    navigationOptions: () => ({
      header: null,
    }),
  },
  Main: {
    screen: MainScreen,
    navigationOptions: ({ navigation }) => ({
      header: null,
    }),
  },
  PlateSale: {
    screen: PlateSaleScreen,
    navigationOptions: () => ({
      header: null,
    }),
  }

}, {
    initialRouteName: "SignIn",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Colors.tintColor,
      },
    }
  });

const AppContainer = createAppContainer(AppNavigator);
export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}