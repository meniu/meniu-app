'use strict';

import React, { Component } from 'react';
import Colors from "../../../constants/Colors";
import Layout from "../../../constants/Layout";
import PlateComponent from "../../../components/PlateComponent";

import {
  StyleSheet,  Text, TextInput,  View, Image, Picker, Button,
  ScrollView, FlatList,
} from 'react-native';

class RestaurantPlatesScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('restaurant', 'Platos de Restaurante').name,
    };
  };
  

  constructor(props) {
    super(props);

    const { navigation } = this.props;
    this.restaurant = navigation.getParam('restaurant', 'Sin Restaurante');
    this.state = {};
  }


  render() {
    return (
      <View style={styles.container}>
        <Image
          style={{flex:3, height: Layout.window.width/2, width: Layout.window.width/2}}
          source={{uri:this.restaurant.uri}}
          resizeMode="contain"
        />
        <Text style={{flex:1}}>Cómo llegar</Text>
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
          <ScrollView style={{flex:7}}>
            <FlatList
              style={{flex:1}}
              data={[{key:"Chilaquiles"},{key:"Burrito"},{key:"Taco"}]}
              renderItem={({item}) => <PlateComponent dishName={item.key}/>}
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
    alignItems: "center", 
    justifyContent: "flex-start",
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
    flex:5,
    alignItems:"stretch"
  }

});


export default RestaurantPlatesScreen;