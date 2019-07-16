'use strict';

import React, { Component } from 'react';
import {
  Image,
  Text,
  StyleSheet,
  View, TouchableHighlight,
  ImageBackground
} from 'react-native';
import Colors from "../constants/Colors"
import Layout from "../constants/Layout"
import BadgeComponent from './BadgeComponent';
import Config from '../constants/Config';


class RestaurantCardComponent extends Component {

  constructor(props) {
    super(props);
    //Props: entity with uri, name, description and rating
    this.state = {};
  }

  render() {

    let badges = this.props.entity.couponSummaryModels.map((coupon, i) => {
      return (
        <BadgeComponent key={this.props.entity.partner.identification + coupon.type} type={coupon.type} content={coupon.quantity}></BadgeComponent>
      );
    });

    return (
      <TouchableHighlight onPress={this.props.action}>
        <ImageBackground
          style={styles.backgroundImage}
          source={{ uri: Config.azureStorageUrl + this.props.entity.partner.backgroundImagePath }}
        >
          <View style={styles.container}>
            <View style={styles.imageContainer}>
              <Image
                style={styles.circledImage}
                resizeMode={"center"}
                source={{
                  uri:
                    Config.azureStorageUrl + this.props.entity.partner.imagePath
                }}
              />
            </View>
            <View style={styles.cardInfo}>
              <Text style={styles.restaurantTitle}>{this.props.entity.partner.name}</Text>
              <View style={styles.badgesContainer}>
                {badges}
              </View>
            </View>
          </View>
        </ImageBackground>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  circledImage: {
    flex: 1,
    width: Layout.window.width / 6,
    height: Layout.window.width / 6,
    borderRadius: 500,
    margin: 10,
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    margin: 5
  },
  cardInfo: {
    flex: 4,
    justifyContent: "flex-end",
    alignItems: "flex-start",
    margin: 5
  },
  restaurantTitle: {
    flex: 3,
    textAlignVertical: "bottom",
    marginHorizontal: 5,
    marginVertical: 10,
    color: Colors.lightBackgroundColor,
    textShadowRadius: 50,
    textShadowColor: Colors.black,
    textShadowOffset: { width: -1, height: 1 },
  },
  badgesContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around"
  }
});


export default RestaurantCardComponent;