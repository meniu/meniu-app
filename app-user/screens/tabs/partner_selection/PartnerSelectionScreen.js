
import React, { Component } from 'react';

import { ToastAndroid, Platform, Image, StyleSheet,  
  TextInput, Picker, FlatList, View, Text,
  ScrollView, Button, TouchableHighlight } from 'react-native';
import Colors from "../../../constants/Colors";
import Layout from "../../../constants/Layout";
import { StackActions, NavigationActions } from "react-navigation";
import RestaurantCardComponent from "../../../components/RestaurantCardComponent";
import BadgeComponent from '../../../components/BadgeComponent';
import FilterButtonComponent from '../../../components/FilterButtonComponent';
import MockData from '../../../constants/MockData';
import ImportantPromotionCardComponent from '../../../components/ImportantPromotionCardComponent';

/**
 * Restaurantes ordenados por ranking siempre.
 * Filtros por tag / localización
 */
export default class PartnerSelectionScreen extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
      text:"",
      //Layout: By icon or traditional
      layout:"icon",
    };

    this.handleRestaurantPress = this.handleRestaurantPress.bind(this);
  }

  static navigationOptions = {
      title: 'Restaurantes',
  };

  handleRestaurantPress(restaurant){
    this.props.navigation.navigate("RestaurantPlates",{
      restaurant
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.upperView}>
          <View style={{flex:1}}></View>
          <View style={{flex:3, backgroundColor:Colors.backgroundColor}}>
            <ScrollView style={{flex:1}} horizontal={true}>
              <FlatList
                horizontal={true}
                keyExtractor={(item)=>item.name}
                data={MockData.promotions}
                renderItem={({item})=>{
                  return <ImportantPromotionCardComponent name={item.name} type={item.type}
                  description={item.description} uri={item.uri} />
                }}
              />
            </ScrollView>
          </View>
          <View style={styles.typeFilterView}>
              <FilterButtonComponent type="basic"></FilterButtonComponent>
              <FilterButtonComponent type="premium"></FilterButtonComponent>
              <FilterButtonComponent type="deluxe"></FilterButtonComponent>
          </View>
        </View>
        <View style={{flex:5, backgroundColor:Colors.white}}>
          <ScrollView style={{flex:1}} >
            <FlatList 
              style={{flex:1}}
              key={(this.state.layout)}
              numColumns={1}
              keyExtractor={(item)=>item.name}
              // onPressItem={this.handleRestaurantPress}
              data={MockData.restaurants}
              renderItem={({item}) => {
                return <RestaurantCardComponent entity={item} action={()=>this.handleRestaurantPress(item)}/>
              }}
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
    height: 50,
    alignItems: "stretch", 
    justifyContent: "space-between",
    backgroundColor: Colors.white,
  },
  userView:{
    alignItems:"center",
  },
  upperView:{
    flex:5,
    justifyContent: "space-evenly",
    alignItems:"center",
    backgroundColor: Colors.lightBackgroundColor,
  },
  horizontalImageView:{
    flex:1,
    flexDirection:"row",
    backgroundColor: Colors.backgroundColor,
    height:110,
  },
  typeFilterView: {
    backgroundColor: Colors.white,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  
});

