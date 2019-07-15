'use strict';

import React, { Component } from 'react';
import Colors from "../../../constants/Colors";
import Layout from "../../../constants/Layout";
import PromotionCardComponent from "../../../components/PromotionCardComponent";
import MockData from "../../../constants/MockData";
import {
  StyleSheet,  View, Image, Picker,
  ScrollView, FlatList, Text, ImageBackground,
} from 'react-native';
import { Tooltip } from 'react-native-elements';
import { Bubbles } from 'react-native-loader';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import OrderModalComponent from '../../../components/OrderModalComponent';
import FilterButtonComponent from '../../../components/FilterButtonComponent';
import BadgeComponent from '../../../components/BadgeComponent';
import PromotionService from "../../../services/PromotionService";

class RestaurantPlatesScreen extends Component {
  
  constructor(props) {
    super(props);

    const { navigation } = this.props;
    console.log('Aquí va el navigation object');
    console.log(navigation);
    this.restaurant = navigation.getParam('restaurant', 'Sin Restaurante');
    console.log('Aquí va restauranty');
    console.log(this.restaurant);
    
    this.allPromotions = [];
    this.state = {
      sorting:"AZ",
      selectedPlate:null,
      successModalVisible:false,
      failureModalVisible:false,
      promotionList:[],
      selectedFilters:{
        Basic:false,
        Premium:false,
        Deluxe:false,
        Gold:false,
      }
    };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: "meniu",
    };
  };
  
  componentDidMount() {
    PromotionService.retrievePromotionsByPartner(this.restaurant.partner.identification).then(response => response.json()).then(responseJSON => {
      console.log('wtf')
      console.log(responseJSON);
      // All Promotions saved for future filtering
      this.allPromotions = responseJSON.promotionCoupons;
      this.setState({
        promotionList: this.allPromotions
      });
    });
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
        sortFunction =  (a,b)=>a.name.toLowerCase().localeCompare(b.name.toLowerCase());
        break;
      case "ZA":
        sortFunction =  (a,b)=>b.name.toLowerCase().localeCompare(a.name.toLowerCase());
        break;
      default:
        break;
    }
    promotions = promotions.sort(sortFunction);
    
    return promotions;
  }

  filterPromotions = () => {
    // Filters by selected values
    let filters = this.state.selectedFilters;
    let promotionsFiltered = this.allPromotions;
    Object.keys(filters).forEach(type => {
      if(!filters[type])
        promotionsFiltered = promotionsFiltered.filter(promotion => {
          // couponPlan coupon type
          return promotion.couponPlan.coupon.type !== type;
        });
    });
    return promotionsFiltered;
  }

  toggleSelected = (type) => {
    
    this.setState((state)=>{
      let newSelected = state.selectedFilters;
      newSelected[type] = !state.selectedFilters[type];
      return ({
        selectedFilters:newSelected,
        promotionList: this.filterPromotions(),
      });
    });
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

  renderPartnerCouponSummary = () => {
    return (
      <View style={styles.badgesContainer}>
        {
          this.restaurant.couponSummaryModels.map(coupon =>
            <BadgeComponent type={coupon.type} content={coupon.quantity}></BadgeComponent>
          )
        }
      </View>
    );
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
        <ImageBackground
          source={require('../../../assets/images/restaurant1-portrait.jpg')} 
          style={{resizeMode:"cover", flex:2}}
        >
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
              <Text style={[styles.restaurantTitle,styles.whiteTextShadow]}>{this.restaurant.partner.name}</Text>
              <Text style={styles.whiteTextShadow}>{this.restaurant.partner.preferredLocation.referenceAddress}</Text>
              {
                this.renderPartnerCouponSummary()
              }
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
        </ImageBackground>
        <View style={styles.horizontalView}>
          <FilterButtonComponent type="Basic" selected={this.state.selectedFilters.Basic} toggleSelected={()=>this.toggleSelected("Basic")}></FilterButtonComponent>
          <FilterButtonComponent type="Premium" selected={this.state.selectedFilters.Premium} toggleSelected={()=>this.toggleSelected("Premium")}></FilterButtonComponent>
          <FilterButtonComponent type="Deluxe" selected={this.state.selectedFilters.Deluxe} toggleSelected={()=>this.toggleSelected("Deluxe")}></FilterButtonComponent>
          <FilterButtonComponent type="Gold" selected={this.state.selectedFilters.Gold} toggleSelected={()=>this.toggleSelected("Gold")}></FilterButtonComponent>
          <Picker
            selectedValue={this.state.sorting}
            style={{ flex:1, height: 50, width: 100 }}
            onValueChange={this.handlePickerSelect}>
            <Picker.Item label="A-Z" value="AZ" />
            <Picker.Item label="Z-A" value="ZA" />
          </Picker>
        </View>
        <View style={styles.flatListView}>
          {
            this.allPromotions.length <= 0 ?
              <View style={{width:'100%',height:'100%',justifyContent:"center", alignItems:"center"}}>
                <Bubbles size={10} color={Colors.yellowMeniu} />
              </View> :
            <ScrollView style={{flex:1}}>
              <FlatList
                style={{flex:1}}
                keyExtractor={(item)=>(item.name)}
                data={this.state.promotionList}
                renderItem={({item}) => <PromotionCardComponent actionType="order" entity={item} action={()=>this.handlePlatePress(item)}/>}
              />
            </ScrollView>
          }
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
  whiteTextShadow:{
    color:Colors.lightBackgroundColor,
    textShadowRadius:20,
    shadowColor:Colors.black,
    textShadowOffset: {width: -1, height: 1},
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