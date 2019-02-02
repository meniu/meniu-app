'use strict';

import React, { Component } from 'react';
import { createAppContainer, createStackNavigator, createBottomTabNavigator } from "react-navigation";
import TrendingPromotionsScreen from "./tabs/trending_promotions/TrendingPromotionsScreen.js";
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

const TrendingPromotionsStack = createStackNavigator({
  TrendingPromotions: { screen: TrendingPromotionsScreen },
  
},{
  defaultNavigationOptions:{
    headerStyle: {
        backgroundColor: Colors.tintColor ,
      }
  }
});

TrendingPromotionsStack.navigationOptions = {
  tabBarLabel: 'Promociones',
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
  tabBarLabel: 'Membresías',
  headerStyle: {
        backgroundColor: Colors.tintColor ,
      }
};


const TabNavigator = createBottomTabNavigator({
  PartnerSelectionStack,
  TrendingPromotionsStack,
  MembershipsStack
},{
  initialRouteName: "TrendingPromotionsStack",
  defaultNavigationOptions:({ navigation }) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = FontAwesome;
        let iconName;
        if (routeName === 'TrendingPromotionsStack') {
          iconName = 'home';
        } else if (routeName === 'PartnerSelectionStack') {
          iconName = 'cutlery';
        } else if (routeName === 'MembershipsStack') {
          IconComponent = MaterialCommunityIcons;
          iconName = 'knife';
        }

        // You can return any component that you like here!
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      }
    }),
  },
);


export default createAppContainer(TabNavigator);

