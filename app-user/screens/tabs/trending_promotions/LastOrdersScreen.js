'use strict';

import React, { Component } from 'react';
import { ToastAndroid, Platform, Image, StyleSheet,  
  TextInput, Picker, FlatList, View, Text, ScrollView,
  AsyncStorage } from 'react-native';
import Colors from "../../../constants/Colors";
import RestaurantCardComponent from "../../../components/RestaurantCardComponent";

export default class TrendingPromotionsScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user:this.props.user,
      signedIn:true,
      text:"",
    };
  }

  static navigationOptions = {
    title: 'Órdenes Recientes',
  };

  componentDidMount() {
    this.getLocalUser();
    
  }

  async getLocalUser(){
    try {
      const value = await AsyncStorage.getItem('user');
      const user = JSON.parse(value);
      if (user !== null) {
        // We have data!!
        if(Platform.OS === 'android')
          ToastAndroid.show('Bienvenido, ' + user.name, ToastAndroid.SHORT);
        this.setState({
          user 
        });
      }
    } catch (error) {
      // Error retrieving data
      alert(error);
      this.setState({
        signedIn:false 
      });
    }
  }

  checkSignIn(){
    if (!this.state.signedIn)
    {
      if(Platform.OS === 'android')
        ToastAndroid.show('Por favor ingresa', ToastAndroid.SHORT);
      this.props.navigation.navigate("SignIn");
    }

  }

  handlePlatePress(plate){
    this.props.navigation.navigate("Order",{
      plate: plate,
      restaurant: {}
    });
  }

  renderLoading(){
    return (<View>
      <Text>Loading...</Text>
    </View>);
  }

  render() {
    if(!this.state.user)
      return this.renderLoading();
    else
      this.checkSignIn();
      return (
        <View style={styles.container}>
          <View style={styles.userView}>
            <Image
              style={{width: 50, height: 50}}
              source={{uri: this.state.user.photoUrl}}
            />
            <Text>{this.state.user.name}</Text>
            <Text>¡Bienvenido a Meniu, {this.state.user.name}!</Text>
          </View>
          <View style={styles.horizontalView}>
            <TextInput
              style={{flex:1, height: 40, borderColor: 'gray', borderWidth: 1}}
              onChangeText={(text) => this.setState({text})}
              value={this.state.text}
              placeholder="Búsqueda"
            />
            <Picker
              selectedValue={""}
              style={{ flex:1, height: 50, width: 100 }}
              onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>
              <Picker.Item label="Premium" value="PR" />
              <Picker.Item label="Basic" value="BA" />
            </Picker>
          </View>
          <View 
            style={styles.flatListView}>
            <ScrollView style={{flex:1}}>
              <FlatList
                style={{flex:1}}
                keyExtractor={(item)=>item.name}
                data={[
                  {name:"Chilaquiles", description:"Deliciosos Chilaquiles", rating:4,discount:"1000", type:"plate",
                  uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'},
                  {name:"Burrito", description:"Delicioso Burrito", rating:4,discount:"1000", type:"plate",
                  uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'},
                  {name:"Taco", description:"Delicioso Taco", rating:4,discount:"1000", type:"plate",
                  uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'},
                ]}
                renderItem={({item}) => <RestaurantCardComponent entity={item} action={()=>this.handlePlatePress(item)}/>}
              />
            </ScrollView>
          </View>
        </View>
      );
  }
}

const styles = StyleSheet.create({
  container:{ 
    flex: 1, 
    alignItems: "stretch", 
    justifyContent: "space-around",
    backgroundColor: Colors.backgroundColor,
  },
  userView:{
    flex:2,
    alignItems:"center",
  },
  horizontalView:{
    flex:1,
    flexDirection:"row",
    justifyContent: "space-around",
    backgroundColor: Colors.cardColor,
  },
  flatListView:{
    flex:7,
    alignItems:"stretch"

  }

});

