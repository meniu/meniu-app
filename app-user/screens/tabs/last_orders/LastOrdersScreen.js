'use strict';

import React, { Component } from 'react';
import { ToastAndroid, Platform, Image, StyleSheet,  
  TextInput, Picker, FlatList, View, ScrollView,
  AsyncStorage } from 'react-native';
import { Text } from 'react-native-elements';
import Colors from "../../../constants/Colors";
import RestaurantCardComponent from "../../../components/RestaurantCardComponent";
import MockData from '../../../constants/MockData';
import PromotionCardComponent from '../../../components/PromotionCardComponent';
import ImportantPastPromotionCardComponent from '../../../components/ImportantPastPromotionCardComponent';

export default class TrendingPromotionsScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user:this.props.user,
      signedIn:true,
      text:"",
      sorting:"ALL",
    };
  }

  static navigationOptions = {
    title: 'Tus últimas órdenes',
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

  renderDiscountSum(array){
    let sum = array.map(prom => prom.discount).reduce((a,b)=>
      a + b
    ,0);
    return sum;
  }

  render() {
    if(!this.state.user)
      return this.renderLoading();
    else
      this.checkSignIn();
      return (
        <View style={styles.container}>
          <View style={styles.horizontalView}>
            <View style={styles.userView}>
              <Text style={{fontWeight:"bold"}}>Felicitaciones, {this.state.user.name}!</Text>
              <View style={{flexDirection:"row"}}>
                <Text>Has ahorrado </Text>  
                <Text style={{fontWeight:"bold",}}>${this.renderDiscountSum(MockData.spentPromotions)}!</Text>
              </View>
            </View>
            <Picker
              selectedValue={""}
              style={{ flex:1, height: 50, width: 100 }}
              onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>
              <Picker.Item label="Esta Semana" value="week" />
              <Picker.Item label="Mensual" value="month" />
            </Picker>
          </View>
          <View style={{flex:3}}>
            <ScrollView style={{flex:1}} horizontal={true}>
              <FlatList
                horizontal={true}
                keyExtractor={(item)=>item.name}
                data={MockData.spentPromotions}
                renderItem={({item})=>{
                  return <ImportantPastPromotionCardComponent entity={item} />
                }}
              />
            </ScrollView>
          </View>
          <View style={styles.horizontalView}>
            <Text style={{flex:1}}>Tus últimas órdenes</Text>
            <Text style={{flex:1}}>Ahorro total: ${ this.renderDiscountSum(MockData.spentPromotions) }</Text>
            <Picker
              selectedValue={""}
              style={{ flex:1, height: 50, width: 100 }}
              onValueChange={(itemValue, itemIndex) => this.setState({sorting: itemValue})}>
              <Picker.Item label="Todos" value="ALL" />
              <Picker.Item label="Deluxe" value="DE" />
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
                data={MockData.spentPromotions}
                renderItem={({item}) => <PromotionCardComponent actionType="reorder" entity={item} action={()=>this.handlePlatePress(item)}/>}
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
    alignItems:"flex-start",
    margin:5,
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

