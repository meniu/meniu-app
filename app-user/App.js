import React from "react";
import { createAppContainer, createStackNavigator } from "react-navigation"; // Version can be specified in package.json

import SignUpScreen from "./screens/SignUpScreen.js";
import SignInScreen from "./screens/SignInScreen.js";
import MainScreen from "./screens/MainScreen.js";
import OrderScreen from "./screens/OrderScreen.js";

import Colors from "./constants/Colors.js";

import * as Font from 'expo-font';
import { setCustomText } from 'react-native-global-props';
import { FormattedProvider } from 'react-native-globalize';

const AppNavigator = createStackNavigator({
  SignUp: {
    screen: SignUpScreen,
    navigationOptions: ({ navigation }) => ({
      header: null,
    }),
  },
  SignIn: {
    screen: SignInScreen,
    navigationOptions: ({ navigation }) => ({
      header: null,
    }),
  },
  Main: {
    screen: MainScreen,
    navigationOptions: ({ navigation }) => ({
      header: null,
    }),
  },
  Order: {
    screen: OrderScreen,
  }
}, {
    initialRouteName: "SignIn",
    /* header default config is here */
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Colors.cardColor,
        height: 40,
      },
    },
    headerLayoutPreset: "center",
  });

const AppContainer = createAppContainer(AppNavigator);
export default class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      fontLoaded: false,
    }
  }

  componentDidMount() {
    Font.loadAsync({
      'meniu': require('./assets/fonts/meniu.ttf'),
    }).then(() => {
      this.defaultFonts();
      this.setState({ fontLoaded: true });
    });
  }

  defaultFonts() {
    const customTextProps = {
      style: {
        fontFamily: 'meniu',
        lineHeight: 18
      }
    }
    setCustomText({ customTextProps })
  }

  render() {
    return this.state.fontLoaded ?
      <FormattedProvider locale="es-419">
        <AppContainer />
      </FormattedProvider>
      : null;
  }
}