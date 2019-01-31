'use strict';

import React, { Component } from 'react';
import { createAppContainer, createBottomTabNavigator } from "react-navigation";
import TrendingPromotionsScreen from "./tabs/trending_promotions/TrendingPromotionsScreen.js";
import PartnerSelectionScreen from "./tabs/partner_selection/PartnerSelectionScreen.js";
import MembershipsScreen from "./tabs/memberships/MembershipsScreen.js";

const TabNavigator = createBottomTabNavigator({
  PartnerSelection: { screen: PartnerSelectionScreen },
  TrendingPromotions: { screen: TrendingPromotionsScreen },
  Memberships: { screen: MembershipsScreen },
},{
  initialRouteName: "TrendingPromotions",
});


export default createAppContainer(TabNavigator);

