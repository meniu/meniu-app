import React, { PureComponent } from 'react'
import { Text, TouchableHighlight, StyleSheet, View } from 'react-native'
import { LinearGradient } from "expo-linear-gradient";
import Colors from '../constants/Colors';
import CustomIcon from './CustomIcon';
import { FormattedNumber } from 'react-native-globalize';
import CouponListComponent from './CouponListComponent'

export default class MembershipCardComponent extends PureComponent {

 
  // PROPS
  // membership- includes: name, price, description, coupons


  handleBuyPress() {

  }


  renderCoupons() {

  }

  /**
   * Translator. If plan name comes in spanish this shouldn't be necessary
   */
  getIconByPlanName(planName) {
    let plan = planName.toLowerCase();

    switch (plan) {
      case "warrior": return "guerrero";
      case "executive": return "ejecutivo";
      case "elite": return "elite";
      case "balanced": return "balanceado";
      case "smart": return "smart";
      case "express": return "express";
      case "adventure": return "aventura";
      case "complete": return "completo";
      case "personalized": return "planpersonalizado";
      // Por defecto no lo formatea
      default: return plan;
    }
  }

  getPlanName(planName) {
    let plan = planName.toLowerCase();

    switch (plan) {
      case "warrior": return "Guerrero";
      case "executive": return "Ejecutivo";
      case "elite": return "Elite";
      case "balanced": return "Balanceado";
      case "smart": return "Smart";
      case "express": return "Express";
      case "adventure": return "Aventura";
      case "complete": return "Completo";
      case "personalized": return "Personalizado";
      // Por defecto no lo formatea
      default: return plan;
    }
  }

  render() {

    return (
      <View style={styles.container}>

        <LinearGradient colors={Colors.gradient[this.props.membership.combo.type || "default"]} style={styles.gradient}
          start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
          <CustomIcon name={this.getIconByPlanName(this.props.membership.combo.type)} size={70} color={Colors.black} style={{ textAlign: "center" }} />
          <Text style={styles.membershipTitle}>{this.getPlanName(this.props.membership.combo.type)}</Text>
        </LinearGradient>
        <View style={styles.descriptionContainer}>
          <Text>{this.props.membership.combo.description}</Text>
          <FormattedNumber
            value={this.props.membership.combo.price}
            numberStyle="decimal"
            style={styles.priceText}
          />
          <CouponListComponent coupons={this.props.membership.couponPlans} combo = {this.props.membership} showNumber = {false}/>
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
