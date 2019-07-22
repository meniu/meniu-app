
import React, { Component } from 'react';

import {
  Platform, Image, StyleSheet,
  TextInput, Picker, FlatList, View, Text
} from 'react-native';
import { Button } from 'react-native-elements';
import { LinearGradient } from "expo";
import { Bubbles } from 'react-native-loader';
import CustomIcon from "../../../components/CustomIcon";
import Colors from '../../../constants/Colors';
import Layout from '../../../constants/Layout';
import AuthService from '../../../services/AuthService';
import AvailableCouponsComponent from '../../../components/AvailableCouponsComponent';

export default class AccountScreen extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      user: null,
      couponsLeft: null
    }
  }

  static navigationOptions = {
    title: 'Mi Cuenta',
    headerStyle: {
      backgroundColor: Colors.yellowMeniu,
    },
  };

  handleLogOutClick = () => {
    AuthService.logOut(() => {
      this.props.navigation.navigate("SignIn");
    })
  }

  handleGetPlanClick = () => {
    this.props.navigation.navigate("Memberships", {
      user : this.state.user
    });
  }

  componentDidMount() {
    // console.log('aquí va la promsesa');
    AuthService.retrieveUserPromise().then(userResponse => {
      // console.log('aquí va user');
      // console.log(user);
      let user = JSON.parse(userResponse);
      let couponsLeft = {}

      if (user.activeCombo) {
        for (let coupon of user.comboCouponPlan.couponPlans) {
          couponsLeft[coupon.coupon.type] = coupon.foodQuantity;
        }
      }


      this.setState({
        user,
        couponsLeft
      });
    });
  }

  renderLoading() {
    return (
      <View style={{width:'100%',height:'100%',justifyContent:"center", alignItems:"center"}}>
        <Bubbles size={10} color={Colors.yellowMeniu} />
      </View>);
  }


  PlanComponent = (props) => {
    return (
      <View style={styles.planContainer}>
        <LinearGradient colors={["#3BE6EF", "#25A0FC"]} style={styles.gradient}
          start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
          <CustomIcon name="no-plan" size={70} color={Colors.white} />
        </LinearGradient>
        <View style={{ flex: 3, justifyContent: "space-around", alignItems: "flex-start", paddingBottom: 8 }}>
          <Text style={{ fontStyle: "italic", fontWeight: "bold", fontSize: 25 }}>{this.state.user.activeCombo.type}</Text>
          <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
            <View style={styles.flexCenter}>
              <Text style={{ fontWeight: "bold" }}>Tipo de plan</Text>
              <Text>{this.state.user.comboCouponPlan.couponPlans[0].plan.type}</Text>
            </View>
            <View style={styles.flexCenter}>
              <Text style={{ fontWeight: "bold" }}>Fecha de compra</Text>
              <Text>{this.state.user.activeCombo.createdOn.substring(0,10)}</Text>
            </View>
            <View style={styles.flexCenter}>
              <Text style={{ fontWeight: "bold" }}>Válido durante</Text>
              <Text>{this.state.user.comboCouponPlan.couponPlans[0].plan.validityInDays + " días"}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }

  NoPlanComponent = (props) => {
    return (
      <View style={styles.planContainer}>
        <LinearGradient colors={["#FA786B", "#EF3481"]} style={styles.gradient}
          start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
          <CustomIcon name="no-plan1" size={70} color={Colors.white} />
        </LinearGradient>
        <View style={{ flex: 2, justifyContent: "space-around", alignItems: "flex-start" }}>
          <Text>No tienes ningún plan disponible</Text>
          <Button buttonStyle={styles.buttonStyle} titleStyle={styles.textButtonStyle}
            title="obtener un plan" onPress={this.handleGetPlanClick} />
        </View>
        <View style={{ flex: 1 }} />
      </View>
    );
  }

  render() {

    let plan = this.state.user && this.state.user.activeCombo;

    if (!this.state.user || !this.state.couponsLeft)
      return this.renderLoading();
    return (
      <View style={styles.container}>
        <View style={styles.userInfoContainer}>
          <View style={styles.circledImage}>
            <CustomIcon name="usuario-hombre" size={70} color={Colors.white} />
          </View>  
          <View style={{ justifyContent: "center", alignItems: "flex-start", marginVertical: 10 }}>
            <Text style={{ flex: 1, fontWeight: "bold" }}>{this.state.user.name + ' ' + this.state.user.lastName}</Text>
            <Text style={{ flex: 1 }}>{this.state.user.applicationUser.email}</Text>
            <View style={{ flex: 2, flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
              <Button buttonStyle={[styles.buttonStyle, { backgroundColor: Colors.white, height: "80%" }]}
                titleStyle={styles.textButtonStyle} title="Salir" onPress={this.handleLogOutClick} />
            </View>
          </View>
        </View>
        {/* Conditional rendering, depending if client has plan or not */}
        {
          plan ? <this.PlanComponent /> : <this.NoPlanComponent />
        }
        <View style={{ flex: 6 }}>
          <View style={styles.availableDishesContainer}>
            <AvailableCouponsComponent type="Gold" promotionsNumber={this.state.couponsLeft.Gold} />
            <AvailableCouponsComponent type="Deluxe" promotionsNumber={this.state.couponsLeft.Deluxe} />
            <AvailableCouponsComponent type="Premium" promotionsNumber={this.state.couponsLeft.Premium} />
            <AvailableCouponsComponent type="Basic" promotionsNumber={this.state.couponsLeft.Basic} />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightBackgroundColor,
  },
  userInfoContainer: {
    flex: 2,
    flexDirection: 'row',
    backgroundColor: Colors.yellowMeniu,
  },
  planContainer: {
    flex: 2,
    flexDirection: 'row',
    backgroundColor: Colors.backgroundColor,
  },
  gradient: {
    // flex: 1,
    width:Layout.window.width * 0.25,
    height:Layout.window.width * 0.25,
    margin: 8,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  availableDishesContainer: {
    justifyContent: 'space-around',
  },
  flexCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circledImage: {
    width: Layout.window.width / 4,
    height: Layout.window.width / 4,
    borderRadius: 500,
    margin: 10,
    backgroundColor: Colors.darkBackgroundColor,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonStyle: {
    flexDirection: "column",
    backgroundColor: Colors.yellowMeniu,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    borderRadius: 10,
  },
  textButtonStyle: {
    color: Colors.black,
    textAlign: "center",
  }

})
