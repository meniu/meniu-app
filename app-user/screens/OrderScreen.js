'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View, Text, Image
} from 'react-native';
import { Button, Rating } from 'react-native-elements';

import Colors from "../constants/Colors";
import PromotionService from "../services/PromotionService";
import Config from "../constants/Config";


class OrderScreen extends Component {


  constructor(props) {
    super(props);

    const { navigation } = this.props;
    this.restaurant = navigation.getParam('restaurant', '(Sin Restaurante)');
    this.plate = navigation.getParam('plate', '(Sin Plato)');
    this.codePath = navigation.getParam('codePath', '(Sin QR)')
    console.log(this.restaurant);
    console.log(this.plate);
    console.log(this.codePath);
    this.state = {

    };
  }

  static navigationOptions = {
    title: 'Tu orden',
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.horizontalView}>
          <View>
            <Image
              style={styles.imageStyle}
              source={{ uri: this.plate.uri }}
            />
            <Rating
              imageSize={10}
              readonly
              startingValue={this.plate.rating}
              style={{ position: "absolute", bottom: 25, left: 2, }}
            />
            <Text style={{ marginTop: 3 }}>{this.restaurant.name}</Text>
          </View>
          <View>
            <Text style={styles.textTitle}>Nombre del plato:</Text>
            <Text style={styles.textSubTitle}>{this.plate.name}</Text>
            <Text style={styles.textTitle}>Categoria:</Text>
            <Text style={styles.textSubTitle}>{this.plate.couponPlan.coupon.type}</Text>
            <Text style={styles.textTitle}>Ahorraste:</Text>
            <Text style={styles.textSubTitle}>$ {this.plate.saving}</Text>
            <Text style={styles.textTitle}>Incluye:</Text>
            <Text style={styles.textSubTitle}>{this.plate.description}</Text>
          </View>
        </View>
        <View style={styles.QRContainer}>
          <Text style={{ fontSize: 25, color: Colors.darkGreen }}>¡Código QR generado!</Text>
          <View style={styles.QRBorder}>
            <Image
              style={styles.QRStyle}
              source={{ uri: Config.azureStorageUrl + this.codePath }}
              resizeMode="contain"
            />
          </View>
          <View style={{ alignItems: "center" }}>
            <Text style={{ fontWeight: "bold", color: Colors.darkGreen }}>Bon Appetit</Text>
            <Text style={{ color: Colors.darkGreen }}>Ahora puedes ir a reclamar tu pedido</Text>
          </View>
          <Button buttonStyle={styles.buttonStyle} titleStyle={styles.textButtonStyle}
            title="Ir a restaurante" onPress={() => { }} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "space-between",
    backgroundColor: Colors.backgroundColor,
  },
  horizontalView: {
    flex: 2,
    margin: 5,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: Colors.backgroundColor,
    borderStyle: "dashed",
    borderColor: Colors.darkGreen,
    borderWidth: 2,
    borderRadius: 5,
  },
  textTitle: {
    color: Colors.darkGreen,
    fontWeight: "bold",
  },
  textSubTitle: {
    color: Colors.darkBackgroundColor,
  },
  imageStyle: {
    width: 120,
    height: 96,
    borderColor: Colors.darkGreen,
    borderWidth: 1,
    borderRadius: 5,
  },
  centralText: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    fontSize: 20,
  },
  QRContainer: {
    flex: 4,
    backgroundColor: Colors.backgroundColor,
    justifyContent: "space-around",
    alignItems: "center",
  },
  QRBorder: {
    width: 170,
    height: 170,
    justifyContent: "center",
    alignItems: "center",
    borderColor: Colors.darkGreen,
    borderWidth: 1,
    borderRadius: 5,
  },
  QRStyle: {
    width: 150,
    height: 150,
    resizeMode: "contain",
  },
  buttonStyle: {
    flexDirection: "column",
    width: "80%",
    backgroundColor: Colors.yellowMeniu,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center"
  },
  textButtonStyle: {
    color: Colors.black,
    textAlign: "center",
  }
});


export default OrderScreen;