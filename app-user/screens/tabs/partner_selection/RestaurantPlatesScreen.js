'use strict';

import React, { Component } from 'react';
import Colors from "../../../constants/Colors";
import Layout from "../../../constants/Layout";
import PromotionCardComponent from "../../../components/PromotionCardComponent";
import MockData from "../../../constants/MockData";
import {
  StyleSheet,  View, Image, Picker,
  ScrollView, FlatList, Text
} from 'react-native';
import { Tooltip } from 'react-native-elements';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import OrderModalComponent from '../../../components/OrderModalComponent';
import FilterButtonComponent from '../../../components/FilterButtonComponent';
import BadgeComponent from '../../../components/BadgeComponent';

class RestaurantPlatesScreen extends Component {
  
  constructor(props) {
    super(props);

    const { navigation } = this.props;
    this.restaurant = navigation.getParam('restaurant', 'Sin Restaurante');
    // Available sorting values: 
    this.state = {
      sorting:"AZ",
      selectedPlate:null,
      successModalVisible:false,
      failureModalVisible:false,
      promotionList:[],
    };

  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('restaurant', 'Platos de Restaurante').name,
    };
  };
  
  componentDidMount() {
    let promotionsFetch = MockData.promotions;
    this.setState({promotionList: this.sortPromotions(this.state.sorting, promotionsFetch)});
  }

  /**
   * If there is a parameter, use it to set the new state.
   * Otherwise, use the previous promotionList.
   * 
   */
  sortPromotions = (_sorting, _promotionList) => {
    let promotions = _promotionList || this.state.promotionList;
    let sortFunction;
    // console.log({_sorting});
    
    switch (_sorting) {
      case "AZ":
        sortFunction =  (a,b)=>a.name.toLowerCase().localeCompare(b.name.toLowerCase())
      case "ZA":
        sortFunction =  (a,b)=>b.name.toLowerCase().localeCompare(a.name.toLowerCase())
      default:
        break;
    }
    promotions = promotions.sort(sortFunction);
    
    return promotions;
  }

  handlePickerSelect = (itemValue) => {
    this.setState({
      promotionList:this.sortPromotions(itemValue),
      sorting:itemValue,
    })
  }

  handlePlatePress = (plate) => {
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

  disableModals = () => {
    this.setState({
      successModalVisible: false,
      failureModalVisible: false
    })
  }

  navigateOrder =(plate, restaurant) => {
    this.disableModals();
    this.props.navigation.navigate("Order",{
      plate: plate,
      restaurant: restaurant
    });
  }

  navigateMemberShips = () => {
    this.disableModals();
    this.props.navigation.navigate("MembershipsStack");
  }

  renderModal = (_type) => {
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
        <View style={styles.partnerContainer}>
          <Image
            style={styles.backgroundImage}
            source={{uri:this.restaurant.backgroundUri}}
          >
          </Image>
          <Image
            style={styles.circledImage}
            source={{uri:this.restaurant.uri}}
            resizeMode="contain"
          />
          <View style={styles.partnerDetails}>
            <Text style={styles.restaurantTitle}>{this.restaurant.name}</Text>
            <Text>Horario de atención</Text>
            <View style={styles.badgesContainer}>
              <BadgeComponent type="basic" content="10"></BadgeComponent>
              <BadgeComponent type="premium" content="15"></BadgeComponent>
              <BadgeComponent type="deluxe" content="5"></BadgeComponent>
            </View>
          </View>
          <View style={styles.locationContainer}>
            <Tooltip popover={<Text>Ir al restaurante</Text>}>
              <Icon.Button
                name="location-pin"
                backgroundColor={Colors.yellowMeniu}
                color={"black"}
                iconStyle={{marginRight:0}}
              ></Icon.Button>
            </Tooltip>
          </View>
        </View>
        <View style={styles.horizontalView}>
          <FilterButtonComponent type="basic"></FilterButtonComponent>
          <FilterButtonComponent type="premium"></FilterButtonComponent>
          <FilterButtonComponent type="deluxe"></FilterButtonComponent>
          <Picker
            selectedValue={this.state.sorting}
            style={{ flex:1, height: 50, width: 100 }}
            onValueChange={this.handlePickerSelect}>
            <Picker.Item label="A-Z" value="AZ" />
            <Picker.Item label="Z-A" value="ZA" />
          </Picker>
        </View>
        <View style={styles.flatListView}>
          <ScrollView style={{flex:1}}>
            <FlatList
              style={{flex:1}}
              keyExtractor={(item)=>item.name}
              data={this.state.promotionList}
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
  partnerContainer:{
    flex:2,
    justifyContent:"flex-start",
    flexDirection: "row",
    alignItems:"center",
  },
  backgroundImage:{
    position:"absolute",
    width:"100%",
    height:"100%",
    resizeMode:"cover",

  },
  circledImage:{
    flex:1,
    width: Layout.window.width/6, 
    height: Layout.window.width/6, 
    borderRadius: 500,
    margin: 10,
  },
  partnerDetails:{
    flex:2,
    flexDirection:"column",
  },
  restaurantTitle:{
    fontSize: 18,
  },
  locationContainer:{
    flex:2,
    // flexDirection:"row",
    justifyContent:"flex-end",
    alignItems:"flex-end",
    margin:5
  },
  badgesContainer:{
    flexDirection: "row",
    justifyContent: "space-around"
  },
  horizontalView:{
    flexDirection:"row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: Colors.white,
  },
  flatListView:{
    flex:6,
  },
  

});


export default RestaurantPlatesScreen;