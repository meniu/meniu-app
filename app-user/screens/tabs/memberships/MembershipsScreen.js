
import React, { Component } from 'react';

import { ToastAndroid, Platform, Image, StyleSheet,  
  TextInput, Picker, FlatList, View, Text } from 'react-native';

export default class MembershipsScreen extends React.Component {

  static navigationOptions = {
      title: 'Membresías',
  };

  render() {
    let user = this.props.navigation.getParam("user",{});

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Membresías!</Text>
        <Text>Usuario: {user.name}</Text>
      </View>
    );
  }
}