import React, { Component } from 'react'
import { Text, TouchableHighlight, StyleSheet, View, FlatList } from 'react-native'
import { LinearGradient } from "expo";
import {Tooltip} from 'react-native-elements';
import Colors from '../constants/Colors';
import CustomIcon from './CustomIcon';
import { FormattedNumber, FormattedCurrency } from 'react-native-globalize';
import BadgeComponent from './BadgeComponent';

export default class MembershipCardComponent extends Component {

  /**
   * 
   * @param {} props 
   * membership- includes: name, price, description, coupons
   */
  constructor(props) {
    super(props)
  
    this.state = {
       
    }
  }

  handleBuyPress(){

  }

  renderGradientColors() {
    let colors = [];
    switch (this.props.membership.name) {
      case "Guerrero":
        colors = ["#3BE6EF", "#25A0FC"]  ;
        break;
      case "Premium":
        colors = ["#B0F463", "#66D557"];
        break;
      case "Deluxe":
        colors = ["#FEDE00", "#FB8D4C"];
        break;
      case "Personalizado":
        colors = ["#F65EE5", "#BC25ED"];
        break;   
      default:
        colors = ["#3BE6EF", "#25A0FC"];
        break;
    }
    return colors;
  }
  
  renderCoupons(){
    let coupons = this.props.membership.coupons;
    let manyPromotions = coupons.length > 1;
    if(manyPromotions) {
      return (
      <View style={{flexDirection:"row", justifyContent:"flex-start"}}>
        <FlatList
          horizontal={true}
          keyExtractor={(item)=>item.type}
          data={coupons}
          renderItem={({item}) => <BadgeComponent type={item.type}/>}
        />
      </View>
      );
    }
    else {
      let coupon = coupons[0];
      return (
      <View style={{flexDirection:"row", justifyContent:"flex-start", alignItems:"center"}}>
        <BadgeComponent type={coupon.type} color={Colors.backgroundColor} 
        />
        <Text style={[styles.couponBubble, {backgroundColor:Colors[coupon.type]}]}>
          {`${coupon.quantity} ${coupon.type}`}
          </Text>
      </View>
      );
    }
  }

  render() {
    
    return (
      <View style={styles.container}>
        
        <LinearGradient colors={this.renderGradientColors()} style={styles.gradient}
          start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
          <CustomIcon name="no-plan" size={70} color={Colors.black} />
          <Text style={styles.membershipTitle}>{this.props.membership.name}</Text>
        </LinearGradient>
        <View style={styles.descriptionContainer}>
          <Text>{this.props.membership.description}</Text>
          <FormattedNumber
            value={this.props.membership.price}
            numberStyle="decimal"
            style={styles.priceText}
            />
          {this.renderCoupons()}
        </View>
        <View style={styles.button}>
        <TouchableHighlight onPress={()=>{}}>
          <Tooltip popover={<Text>Disponible pronto</Text>}>
            <Text>Comprar</Text>
          </Tooltip>
        </TouchableHighlight>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container:{
      flex: 1,
      flexDirection: "row",
      margin: 5,
      borderWidth:1, 
      borderColor:Colors.border,
      borderRadius:5
    },
    gradient: {
      flex: 1.5,
      justifyContent:"center",
      alignItems:"stretch",
    },
    membershipTitle: {
      backgroundColor: Colors.whiteTransparent,
      fontStyle:"italic",
      fontSize:12,    
      textAlign:"center"
    },
    descriptionContainer: {
      flex: 4,
      paddingLeft: 5,
    },
    priceText: {
      fontWeight:"bold",
      fontSize:15,
    },
    button: {
      flex:1.2,
      alignItems: "center",
      justifyContent: "center",
      borderLeftWidth:1, 
      borderLeftColor:Colors.border,
    },
    couponBubble: {
      color:Colors.white,
      padding:2,
      borderTopRightRadius: 10,
      borderBottomRightRadius: 10,
  }
})
