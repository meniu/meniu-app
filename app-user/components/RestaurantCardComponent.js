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
    return (
      <TouchableHighlight onPress={this.props.action}>
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.circledImage}
              resizeMode={"center"}
              source={{uri: this.props.entity.uri}}
            />
          </View>
          <View style={styles.cardInfo}>
            <Text style={styles.restaurantTitle}>{this.props.entity.name}</Text>
            <View style={styles.badgesContainer}>
              <BadgeComponent type="basic" content="10"></BadgeComponent>
              <BadgeComponent type="premium" content="15"></BadgeComponent>
              <BadgeComponent type="deluxe" content="5"></BadgeComponent>
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