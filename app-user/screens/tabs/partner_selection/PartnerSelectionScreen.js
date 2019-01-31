
import React, { Component } from 'react';

import { ToastAndroid, Platform, Image, StyleSheet,  
  TextInput, Picker, FlatList, View, Text } from 'react-native';

export default class PartnerSelectionScreen extends React.Component {

  static navigationOptions = {
      title: 'Restaurantes',
  };

  render() {
    let user = this.props.navigation.getParam("user",{});

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Partner Selection!</Text>
        <Text>{user.name}</Text>
      </View>
    );
  }
}