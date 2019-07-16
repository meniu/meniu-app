'use strict';

import React, { Component } from 'react';
import {
  Image,
  Text,
  StyleSheet,
  View, TouchableHighlight,
} from 'react-native';
import Colors from "../constants/Colors"
import Layout from "../constants/Layout"
import BadgeComponent from './BadgeComponent';


class RestaurantCardComponent extends Component {

  constructor(props) {
    super(props);
    //Props: entity with uri, name, description and rating
    this.state = {};
  }

  render() {

    let badges = this.props.entity.couponSummaryModels.map((coupon,i)=> {
      return(
        <BadgeComponent key = {this.props.entity.partner.identification + coupon.type} type={coupon.type} content={coupon.quantity}></BadgeComponent>
      );
    });

    return (
      <TouchableHighlight onPress={this.props.action}>
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.circledImage}
              resizeMode={"center"}
              source={{uri: "https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwiRtJ3nk43jAhVus1kKHaElAMYQjRx6BAgBEAU&url=https%3A%2F%2Fwww.colombia.com%2Fgastronomia%2Fnoticias%2Fsdi%2F70109%2Fhamburguesas-el-corral-inaugura-su-primer-restaurante-en-la-isla-de-san-andres&psig=AOvVaw2xoN7utahGB7F8R9fyd7Th&ust=1561844902558960"}}
            />
          </View>
          <View style={styles.cardInfo}>
            <Text style={styles.restaurantTitle}>{this.props.entity.partner.name}</Text>
            <View style={styles.badgesContainer}>
              {badges}
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container:{ 
    flex: 1, 
    flexDirection: "row",
    alignItems: "center", 
    justifyContent: "space-between",
    backgroundColor: Colors.backgroundColor,
    margin: 5
  },
  imageContainer:{
    flex:1,
    justifyContent:"center",
    alignItems:"center"
  },
  circledImage:{
    flex:1,
    width: Layout.window.width/6, 
    height: Layout.window.width/6, 
    borderRadius: 500,
    margin: 10,
  },
  cardInfo: {
    flex:4,
    justifyContent: "flex-end",
    alignItems: "flex-start",
    margin: 5
  },
  restaurantTitle: {
    flex:3,
    textAlignVertical:"bottom",
    margin: 10
  },
  badgesContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around"
  }
});


export default RestaurantCardComponent;