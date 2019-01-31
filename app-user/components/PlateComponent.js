'use strict';

import React, { Component } from 'react';
import {
  Image,
  Text,
  StyleSheet,
  View,
} from 'react-native';
import Colors from "../constants/Colors"

class PlateComponent extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={{width: 50, height: 50}}
          source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}}
        />
        <View>
          <Text>{this.props.dishName}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{ 
    flex: 1, 
    flexDirection: "row",
    alignItems: "center", 
    justifyContent: "space-around",
    backgroundColor: Colors.cardColor,
  },
  plate_container: {
    flex: 1,
    alignItems: "center", 
    justifyContent: "space-between",
    // backgroundColor: Colors.cardColor,
  }
});


export default PlateComponent;