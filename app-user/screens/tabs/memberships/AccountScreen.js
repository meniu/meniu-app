
import React, { Component } from 'react';

import { Platform, Image, StyleSheet,  
  TextInput, Picker, FlatList, View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { LinearGradient } from "expo";
import CustomIcon from "../../../components/CustomIcon";
import Colors from '../../../constants/Colors';
import Layout from '../../../constants/Layout';
import AuthService from '../../../services/AuthService';
import AvailablePromotionsComponent from '../../../components/AvailablePromotionsComponent';

export default class AccountScreen extends React.Component {

  constructor(props) {
    super(props)
  
    this.state = {
       
    }

  }

  static navigationOptions = {
      title: 'Mi Cuenta',
      headerStyle: {
        backgroundColor: Colors.yellowMeniu,
      },
  };

  handleLogOutClick = ()=> {
    AuthService.logOut(()=>{
      this.props.navigation.navigate("Home");
    })
  }

  handleGetPlanClick = ()=> {
    this.props.navigation.navigate("Memberships");
  }

  PlanComponent= (props) => {
    return(
      <View style={styles.planContainer}>
        <LinearGradient colors={["#3BE6EF", "#25A0FC"]} style={styles.gradient}
          start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
          <CustomIcon name="no-plan" size={70} color={Colors.white} />
        </LinearGradient>
        <View style={{flex:3, justifyContent:"space-around", alignItems:"flex-start", paddingBottom:8 }}>
          <Text style={{fontStyle:"italic", fontWeight:"bold", fontSize:25}}>Guerrero </Text>
          <View style={{flexDirection:"row", justifyContent:"space-around"}}>
            <View style={styles.flexCenter}>
              <Text style={{fontWeight:"bold"}}>Tipo de plan</Text>
              <Text>Mensual</Text>
            </View>
            <View style={styles.flexCenter}>
              <Text style={{fontWeight:"bold"}}>Estado</Text>
              <Text>Activo</Text>
            </View>
            <View style={styles.flexCenter}>
              <Text style={{fontWeight:"bold"}}>Válido hasta</Text>
              <Text>25/12/2019</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
   
  NoPlanComponent = (props) => {
    return( 
      <View style={styles.planContainer}>
        <LinearGradient colors={["#FA786B", "#EF3481"]} style={styles.gradient}
          start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
          <CustomIcon name="no-plan" size={70} color={Colors.white} />
        </LinearGradient>
        <View style={{flex:2, justifyContent:"space-around", alignItems:"flex-start" }}>
          <Text>No tienes ningún plan disponible</Text>
          <Button buttonStyle={styles.buttonStyle} titleStyle={styles.textButtonStyle}
            title="obtener un plan" onPress={this.handleGetPlanClick}/>
        </View>
        <View style={{flex:1}} />
      </View>
    );
}

  render() {
    let user = this.props.navigation.getParam("user",{});
    let plan = Math.random() > 0.5;
    return (
      <View style={styles.container}>
        <View style={styles.userInfoContainer}>
          <Image
            style={styles.circledImage}
            source={{uri: "https://facebook.github.io/react-native/docs/assets/favicon.png"}}
          />
          <View style={{justifyContent:"center", alignItems:"flex-start", marginVertical:10}}>
            <Text style={{flex:1,fontWeight:"bold"}}>Fabio López</Text>
            <Text style={{flex:1}}>fabio.a.lopez@outlook.com</Text>
            <View style={{flex:2,flexDirection:"row", justifyContent:"flex-start", alignItems:"center"}}>
              <Button buttonStyle={[styles.buttonStyle, {backgroundColor:Colors.white, height:"80%"}]} 
                titleStyle={styles.textButtonStyle} title="Salir" onPress={this.handleLogOutClick}/>
            </View>
          </View>
        </View>
        {/* Conditional rendering, depending if client has plan or not */}
        {
          plan ? <this.PlanComponent/> : <this.NoPlanComponent/>
        }
        <View style={{flex:6}}>
          <View style={styles.availableDishesContainer}>
            <AvailablePromotionsComponent type="deluxe" promotionsNumber={10}/>
            <AvailablePromotionsComponent type="premium" promotionsNumber={10}/>
            <AvailablePromotionsComponent type="basic" promotionsNumber={10}/>
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
    flex:1, 
    margin:8,
    borderRadius:10,
    justifyContent:"center",
    alignItems:"center",
  },
  availableDishesContainer: {
    justifyContent: 'space-around',
  },
  flexCenter: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circledImage:{
    width: Layout.window.width/4, 
    height: Layout.window.width/4, 
    borderRadius: 500,
    margin: 10,
    resizeMode: "cover",
  },
  buttonStyle: {
    flexDirection:"column",
    backgroundColor: Colors.yellowMeniu,
    justifyContent: "center",
    alignItems:"center",
    alignContent:"center"
  },
  textButtonStyle: {
    color:Colors.black, 
    textAlign:"center",
  }

})
