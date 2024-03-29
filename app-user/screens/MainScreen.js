'use strict';

import React from 'react';
import { createAppContainer, createStackNavigator, createBottomTabNavigator } from "react-navigation";
import LastOrdersScreen from "./tabs/last_orders/LastOrdersScreen.js";
import PartnerSelectionScreen from "./tabs/partner_selection/PartnerSelectionScreen.js";
import RestaurantPlatesScreen from "./tabs/partner_selection/RestaurantPlatesScreen.js";
import AccountScreen from "./tabs/memberships/AccountScreen.js";
import MembershipsScreen from "./tabs/memberships/MembershipsScreen.js"
import Colors from "../constants/Colors";
import CustomIcon from '../components/CustomIcon.js';
import PurchaseConfirmationScreen from './tabs/memberships/PurchaseConfirmationScreen.js';
import PostPurchaseScreen from './tabs/memberships/PostPurchaseScreen.js';

const PartnerSelectionStack = createStackNavigator({
  PartnerSelection: PartnerSelectionScreen,
  RestaurantPlates: RestaurantPlatesScreen,
},{
  defaultNavigationOptions:{
    headerStyle: {
        backgroundColor: Colors.cardColor ,
        height:40,
      }
  },
  headerLayoutPreset: "center",
});

PartnerSelectionStack.navigationOptions = {
  tabBarLabel: 'Restaurantes',
  
};

const LastOrdersStack = createStackNavigator({
  LastOrders: { screen: LastOrdersScreen },
  
},{
  defaultNavigationOptions:{
    headerStyle: {
        backgroundColor: Colors.cardColor ,
        height:40,
      }
  },
  headerLayoutPreset: "center",
});

LastOrdersStack.navigationOptions = {
  tabBarLabel: 'Recientes',
};



const MembershipsStack = createStackNavigator({
  Account : AccountScreen,
  Memberships : MembershipsScreen,
  PurchaseConfirmation : PurchaseConfirmationScreen,
  PostPurchase: PostPurchaseScreen,
},{
  defaultNavigationOptions:{
    headerStyle: {
      backgroundColor: Colors.cardColor ,
      height:40,
    }
  },
  headerLayoutPreset: "center",
});

MembershipsStack.navigationOptions = {
  tabBarLabel: 'Mi cuenta',
  headerStyle: {
        backgroundColor: Colors.cardColor ,
        height:40,
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
        let IconComponent = CustomIcon;
        let iconName;
        switch (routeName) {
          case 'PartnerSelectionStack':
            iconName = 'restaurants';
            break;
          case 'LastOrdersStack':
            iconName = 'orders';
            break;
          case 'MembershipsStack':
            iconName = 'usuario-hombre';
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

