'use strict';

import React, { Component } from 'react';
import Colors from "../../../constants/Colors";
import Layout from "../../../constants/Layout";
import RestaurantCardComponent from "../../../components/RestaurantCardComponent";

import {
  StyleSheet,  Text, TextInput,  View, Image, Picker, Button,
  ScrollView, FlatList,
} from 'react-native';

class RestaurantPlatesScreen extends Component {
  
  constructor(props) {
    super(props);

    const { navigation } = this.props;
    this.restaurant = navigation.getParam('restaurant', 'Sin Restaurante');
    this.state = {};

    this.handlePlatePress = this.handlePlatePress.bind(this);
  }
  
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('restaurant', 'Platos de Restaurante').name,
    };
  };
  


  handlePlatePress(plate){
    this.props.navigation.navigate("Order",{
      plate: plate,
      restaurant: this.restaurant
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            style={{height: Layout.window.width/3, width: Layout.window.width/3}}
            source={{uri:this.restaurant.uri}}
            resizeMode="contain"
          />
          <Text>Cómo llegar</Text>
        </View>
        <View style={styles.horizontalView}>
          <TextInput
            style={{ flex:1, height: 40, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
            placeholder="Restaurante"
          />
          <Picker
            selectedValue={""}
            style={{ flex:1, height: 50, width: 100 }}
            onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>
            <Picker.Item label="Iconos" value="icon" />
            <Picker.Item label="Tradicional" value="card" />
          </Picker>
          <Button
          style={{flex:1, height:50}}
          title="Filtro"
          color={Colors.tintColor}
          onPress={()=>{}}
          />
        </View>
        <View style={styles.flatListView}>
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
    justifyContent: "space-between",
    backgroundColor: Colors.backgroundColor,
  },
  imageContainer:{
    flex:3,
    alignItems:"center",
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
    flex:6,
    alignItems:"stretch"
  }

});


export default RestaurantPlatesScreen;