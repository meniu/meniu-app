'use strict';

import React, { Component } from 'react';
import { Image } from 'react-native';
import { createAppContainer, createStackNavigator, createBottomTabNavigator } from "react-navigation";
import LastOrdersScreen from "./tabs/last_orders/LastOrdersScreen.js";
import PartnerSelectionScreen from "./tabs/partner_selection/PartnerSelectionScreen.js";
import RestaurantPlatesScreen from "./tabs/partner_selection/RestaurantPlatesScreen.js";
import MembershipsScreen from "./tabs/memberships/MembershipsScreen.js";
import Colors from "../constants/Colors";
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';

const PartnerSelectionStack = createStackNavigator({
  PartnerSelection: PartnerSelectionScreen,
  RestaurantPlates: RestaurantPlatesScreen,
},{
  defaultNavigationOptions:{
    headerStyle: {
        backgroundColor: Colors.tintColor ,
      }
  }
});

PartnerSelectionStack.navigationOptions = {
  tabBarLabel: 'Restaurantes',
  
};

const LastOrdersStack = createStackNavigator({
  LastOrders: { screen: LastOrdersScreen },
  
},{
  defaultNavigationOptions:{
    headerStyle: {
        backgroundColor: Colors.tintColor ,
      }
  }
});

LastOrdersStack.navigationOptions = {
  tabBarLabel: 'Recientes',
};



const MembershipsStack = createStackNavigator({
  Memberships : MembershipsScreen,
},{
  defaultNavigationOptions:{
    headerStyle: {
      backgroundColor: Colors.tintColor ,
    }
  }
});

MembershipsStack.navigationOptions = {
  tabBarLabel: 'Mi cuenta',
  headerStyle: {
        backgroundColor: Colors.tintColor ,
      }
};


const TabNavigator = createBottomTabNavigator({
  PartnerSelectionStack,
  LastOrdersStack,
  MembershipsStack
},{
  initialRouteName: "PartnerSelectionStack",
  defaultNavigationOptions:({ navigation }) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = FontAwesome;
        let iconName;
        switch (routeName) {
          case 'PartnerSelectionStack':
            IconComponent = MaterialCommunityIcons;
            iconName = 'store';
            break;
          case 'LastOrdersStack':
            iconName = 'clock-o';
            break;
          case 'MembershipsStack':
            IconComponent = MaterialCommunityIcons;
            iconName = 'face-profile';
            break;
          default:
            iconName = 'home';

            break;
        }

        // You can return any component that you like here!
        return <IconComponent name={iconName} size={25} color={tintColor} />;
        // return <Image
        //     style={{width: undefined, height: undefined}}
        //     source={require('../assets/images/M-sin-fondo.jpeg')}
        //   />;
      }
    }),
  },
);


export default createAppContainer(TabNavigator);

