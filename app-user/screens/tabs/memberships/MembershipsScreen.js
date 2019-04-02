
import React, { Component } from 'react';

import { Button, Platform, Image, StyleSheet,  
  TextInput, Picker, FlatList, View, Text } from 'react-native';
import Colors from '../../../constants/Colors';
import Layout from '../../../constants/Layout';

export default class MembershipsScreen extends React.Component {

  static navigationOptions = {
      title: 'Mi cuenta',
  };

  render() {
    let user = this.props.navigation.getParam("user",{});

    return (
      <View style={styles.container}>
        <View style={styles.userInfoContainer}>
          <Image
            style={styles.circledImage}
            resizeMode={"center"}
            source={{uri: "https://facebook.github.io/react-native/docs/assets/favicon.png"}}
          />
          <Text style={styles.flexCenter}>Usuario: {user.name}</Text>
          <View style={styles.flexCenter}>
            <Button title="Salir" onPress={()=>{}}/>
          </View>
        </View>
        <View style={styles.planContainer}>
          <Text style={styles.flexCenter}>{"<<Icono>>"}</Text>
          <View style={styles.flexCenter}>
            <Button title="obten plan" onPress={()=>{}}/>
          </View>
        </View>
        <View style={{flex:6}}>
          <Text>Promociones disponibles</Text>
          <View style={styles.availableDishesContainer}>
            <Text>0 basic</Text>
            <Text>0 premium</Text>
            <Text>0 deluxe</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: Colors.lightBackgroundColor,
  },
  userInfoContainer: {
    flex: 2,
    flexDirection: 'row',
    backgroundColor: Colors.lightBackgroundColor
  },
  planContainer: {
    flex: 2,
    flexDirection: 'row',
    backgroundColor: Colors.backgroundColor,
  },
  availableDishesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  flexCenter: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circledImage:{
    flex:1,
    width: Layout.window.width/6, 
    height: Layout.window.width/6, 
    borderRadius: 500,
    margin: 10,
  },

})
