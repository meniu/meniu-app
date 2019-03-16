
import React, { Component } from 'react';

import { ToastAndroid, Platform, Image, StyleSheet,  
  TextInput, Picker, FlatList, View, Text,
  ScrollView, Button, TouchableHighlight } from 'react-native';
import Colors from "../../../constants/Colors";
import Layout from "../../../constants/Layout";
import { StackActions, NavigationActions } from "react-navigation";
import RestaurantCardComponent from "../../../components/RestaurantCardComponent";
import BadgeComponent from '../../../components/BadgeComponent';

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
          <View style={{flex:4}}></View>
          <View style={styles.typeFilterView}>
          {/* TODO Each filter button should be a component */}
              <TouchableHighlight style={{flex:1}} onPress={()=>{}}>
                <View style={styles.horizontal}>
                  <BadgeComponent type="basic" content="B"></BadgeComponent>
                  <Text>basic</Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight style={{flex:1}} onPress={()=>{}}>
                <View style={styles.horizontal}>
                  <BadgeComponent type="premium" content="P"></BadgeComponent>
                  <Text>premium</Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight style={{flex:1}} onPress={()=>{}}>
                <View style={styles.horizontal}>
                  <BadgeComponent type="deluxe" content="D"></BadgeComponent>
                  <Text>deluxe</Text>
                </View>
              </TouchableHighlight>
          </View>
        </View>
        <View style={{flex:7, backgroundColor:Colors.white}}>
          <ScrollView style={{flex:1}} >
            <FlatList 
              style={{flex:1}}
              key={(this.state.layout)}
              numColumns={1}
              keyExtractor={(item)=>item.name}
              // onPressItem={this.handleRestaurantPress}
              data={[{name:"Super Duper", description:"restaurante hamburguesas", rating:5, type:"restaurant",
                        uri:"https://meniu.com.co/wp-content/uploads/2018/08/Logos-Aliados-fondo-balncoMesa-de-trabajo-1.png",},
                    {name:"Polliseria", description:"restaurante pollos", rating:4.5, type:"restaurant",
                              uri:"https://meniu.com.co/wp-content/uploads/2018/08/Logos-Aliados-fondo-balncoMesa-de-trabajo-2.png",},
                    {name:"One Burrito", description:"restaurante burritos", rating:3.5, type:"restaurant",
                              uri:"https://meniu.com.co/wp-content/uploads/2018/08/Logos-Aliados-fondo-balncoMesa-de-trabajo-3.png",},
                    {name:"Flügel", description:"restaurante alitas", rating:4, type:"restaurant",
                              uri:"https://meniu.com.co/wp-content/uploads/2018/08/Logos-Aliados-fondo-balncoMesa-de-trabajo-4.png",},
                    {name:"Próximamente", description:"restaurante pendiente", rating:5, type:"restaurant",
                              uri:"https://meniu.com.co/wp-content/uploads/2018/08/Logos-Aliados-fondo-balncoMesa-de-trabajo-5.png",},
                    ]}
              renderItem={({item}) => {
                return <RestaurantCardComponent entity={item} action={()=>this.handleRestaurantPress(item)}/>
              }
            }
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
    backgroundColor: Colors.darkBackgroundColor,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around"
  },
  horizontal: {
    flexDirection:"row"
  }
});