'use strict';

import React, { Component } from 'react';
import Colors from "../../../constants/Colors";
import Layout from "../../../constants/Layout";
import PromotionCardComponent from "../../../components/PromotionCardComponent";
import MockData from "../../../constants/MockData";
import {
  StyleSheet,  Text, TextInput,  View, Image, Picker, Button,
  ScrollView, FlatList, TouchableHighlight
} from 'react-native';
import OrderModalComponent from '../../../components/OrderModalComponent';

class RestaurantPlatesScreen extends Component {
  
  constructor(props) {
    super(props);

    const { navigation } = this.props;
    this.restaurant = navigation.getParam('restaurant', 'Sin Restaurante');
    this.state = {
      ordering:"AZ",
      selectedPlate:null,
      successModalVisible:false,
      failureModalVisible:false,
    };

    this.handlePlatePress = this.handlePlatePress.bind(this);
    this.disableModals = this.disableModals.bind(this);
    this.navigateOrder = this.navigateOrder.bind(this);
    this.navigateMemberShips = this.navigateMemberShips.bind(this);
  }
  
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('restaurant', 'Platos de Restaurante').name,
    };
  };
  


  handlePlatePress(plate){
    if(Math.random() > 0.5)
      this.setState({
        successModalVisible: true,
        selectedPlate: plate
      });
    else 
      this.setState({
        failureModalVisible: true,
        selectedPlate: plate
      });
  }

  disableModals() {
    this.setState({
      successModalVisible: false,
      failureModalVisible: false
    })
  }

  navigateOrder(plate, restaurant) {
    this.disableModals();
    this.props.navigation.navigate("Order",{
      plate: plate,
      restaurant: restaurant
    });
  }

  navigateMemberShips() {
    this.disableModals();
    this.props.navigation.navigate("MembershipsStack");
  }

  renderModal(_type){
    return this.state.selectedPlate ? (
      <OrderModalComponent 
        type={_type} 
        visible={_type === "success" ? this.state.successModalVisible : this.state.failureModalVisible}
        promotionEntity={this.state.selectedPlate} 
        restaurantEntity={this.restaurant}
        toggleVisible={this.disableModals}
        buttonAction={_type === "success" ? 
          ()=>this.navigateOrder(this.state.selectedPlate, this.restaurant) : 
          this.navigateMemberShips}/>
    ): null;
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderModal("success")}
        {this.renderModal("failure")}
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
            onValueChange={(itemValue) => this.setState({ordering: itemValue})}>
            <Picker.Item label="A-Z" value="AZ" />
            <Picker.Item label="Z-A" value="ZA" />
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
              data={MockData.promotions}
              renderItem={({item}) => <PromotionCardComponent actionType="order" entity={item} action={()=>this.handlePlatePress(item)}/>}
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
  },
  

});


export default RestaurantPlatesScreen;