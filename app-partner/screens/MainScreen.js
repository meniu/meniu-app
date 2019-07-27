'use strict';
import React from 'react';
import { createAppContainer, createStackNavigator, createBottomTabNavigator } from "react-navigation";
import SalesMainScreen from "./tabs/sales/SalesMainScreen";
import Colors from '../constants/Colors';
import { FontAwesome } from '@expo/vector-icons';
import OffersMainScreen from './tabs/offers/OffersMainScreen';
import ReportsMainScreen from './tabs/reports/ReportsMainScreen';
import CodeScannedScreen from './tabs/sales/CodeScannedScreen';
import PlateSaleScreen from './tabs/sales/PlateSaleScreen';

const SalesStack = createStackNavigator({
  SalesMain: SalesMainScreen,
  CodeScanned: CodeScannedScreen,
  PlateSale: PlateSaleScreen,
}, {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Colors.backgroundColor,
        height: 40,
      }
    },
    headerLayoutPreset: "center",
  });

SalesStack.navigationOptions = {
  tabBarLabel: 'Ventas',
};

const OffersStack = createStackNavigator({
  OffersMain: OffersMainScreen,
}, {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Colors.backgroundColor,
        height: 40,
      }
    },
    headerLayoutPreset: "center",
  });

OffersStack.navigationOptions = {
  tabBarLabel: 'Ofertas',
};

const ReportsStack = createStackNavigator({
  ReportsMain: ReportsMainScreen,
}, {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Colors.backgroundColor,
        height: 40,
      }
    },
    headerLayoutPreset: "center",
  });

ReportsStack.navigationOptions = {
  tabBarLabel: 'Reportes',
};


const TabNavigator = createBottomTabNavigator({
  SalesStack,
  OffersStack,
  ReportsStack
}, {
    initialRouteName: "SalesStack",
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = FontAwesome;
        let iconName;
        switch (routeName) {
          case 'SalesStack':
            iconName = 'home';
            break;
          case 'OffersStack':
            iconName = 'home';
            break;
          case 'ReportsStack':
            iconName = 'home';
            break;
          default:
            iconName = 'home';

            break;
        }

        // You can return any component that you like here!
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      }
    }),
  },
);

export default createAppContainer(TabNavigator);
