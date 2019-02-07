'use strict';

import React, { Component } from 'react';
import {
  Image,
  Text,
  StyleSheet,
  View, TouchableHighlight,
} from 'react-native';
import Colors from "../constants/Colors"

class CardComponent extends Component {

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
              style={{width: 100, height: 100}}
              source={{uri: this.props.entity.uri}}
            />
          </View>
          <View style={styles.cardInfo}>
            <Text>{this.props.entity.name}</Text>
            <Text>{this.props.entity.description}</Text>
            <Text>{this.props.entity.rating}</Text>
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
  },
  imageContainer:{
    flex:1,
    justifyContent:"center",
    alignItems:"center"
  },
  cardInfo: {
    flex:1,
    justifyContent: "flex-start",
    alignItems: "center", 
    backgroundColor: Colors.backgroundColor,
  }
});


export default CardComponent;