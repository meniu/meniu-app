
import React, { Component } from 'react';

import { ToastAndroid, Platform, Image, StyleSheet,  
  TextInput, Picker, FlatList, View, Text,
  ScrollView, Button, TouchableHighlight } from 'react-native';
import Colors from "../../../constants/Colors";
import Layout from "../../../constants/Layout";
import { StackActions, NavigationActions } from "react-navigation";
import CardComponent from "../../../components/CardComponent";


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
        <View style={styles.horizontalView}>
          <TextInput
            style={{ flex:1, height: 40, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
            placeholder="Restaurante"
          />
          <Picker
            selectedValue={this.state.layout}
            style={{ flex:1, height: 50, width: 100 }}
            onValueChange={(itemValue, itemIndex) => this.setState({layout: itemValue})}>
            <Picker.Item label="Iconos" value="icon" />
            <Picker.Item label="Tradicional" value="traditional" />
          </Picker>
          <Button
          style={{flex:1, height:50}}
          title="Filtro"
          color={Colors.tintColor}
          onPress={()=>{}}
          />
        </View>
        <View style={{flex:9, backgroundColor:Colors.backgroundColor}}>
          <ScrollView style={{flex:1}} >
            {/*A futuro se necesita un componente-gridview que agrupe de a dos o 3 por fila*/}
            <FlatList 
              style={{flex:1}}
              key={(this.state.layout)}
              numColumns={(this.state.layout==="icon" ? 2 : 1)}
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
                if(this.state.layout==="icon")
                  return (<TouchableHighlight  onPress={()=>this.handleRestaurantPress(item)}>
                            <Image
                                style={{flex:1, width: Layout.window.width/2-5, height: Layout.window.width/2-5}}
                                source={{uri:item.uri}}
                                resizeMode="contain"
                              />
                          </TouchableHighlight>);
                else if(this.state.layout==="traditional")
                  return <CardComponent entity={item} action={()=>this.handleRestaurantPress(item)}/>
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
    backgroundColor: Colors.backgroundColor,
  },
  userView:{
    alignItems:"center",
  },
  horizontalView:{
    flex:1,
    flexDirection:"row",
    justifyContent: "space-evenly",
    alignItems:"center",
    backgroundColor: Colors.cardColor,
  },
  horizontalImageView:{
    flex:1,
    flexDirection:"row",
    backgroundColor: Colors.backgroundColor,
    height:110,
  }
});