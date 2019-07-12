import React, { Component } from 'react'
import { Text, TouchableHighlight, StyleSheet, View, FlatList } from 'react-native'
import { LinearGradient } from "expo";
import { Tooltip } from 'react-native-elements';
import Colors from '../constants/Colors';
import CustomIcon from './CustomIcon';
import { FormattedNumber, FormattedCurrency } from 'react-native-globalize';
import BadgeComponent from './BadgeComponent';
import CouponListComponent from './CouponListComponent'

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

  handleBuyPress() {

  }


  renderCoupons() {

  }

  render() {

    return (
      <View style={styles.container}>

        <LinearGradient colors={Colors.gradient[this.props.membership.combo.type]} style={styles.gradient}
          start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
          <CustomIcon name="no-plan" size={70} color={Colors.black} style={{ textAlign: "center" }} />
          <Text style={styles.membershipTitle}>{this.props.membership.name}</Text>
        </LinearGradient>
        <View style={styles.descriptionContainer}>
          <Text>{this.props.membership.combo.description}</Text>
          <FormattedNumber
            value={this.props.membership.price}
            numberStyle="decimal"
            style={styles.priceText}
          />
          <CouponListComponent coupons={[{ type: this.props.membership.couponPlan.coupon.type, foodQuantity: this.props.membership.foodQuantity }]} />
        </View>
        <View style={styles.button}>
          <TouchableHighlight onPress={this.props.action}>
            <Text>Comprar</Text>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    margin: 5,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 5
  },
  gradient: {
    flex: 1.5,
    justifyContent: "center",
    alignItems: "stretch",
  },
  membershipTitle: {
    backgroundColor: Colors.whiteTransparent,
    fontStyle: "italic",
    fontSize: 12,
    textAlign: "center"
  },
  descriptionContainer: {
    flex: 4,
    paddingLeft: 5,
  },
  priceText: {
    fontWeight: "bold",
    fontSize: 15,
  },
  button: {
    flex: 1.2,
    alignItems: "center",
    justifyContent: "center",
    borderLeftWidth: 1,
    borderLeftColor: Colors.border,
  },
})
