'use strict';

import React, { Component } from 'react';
import { StackActions, NavigationActions } from "react-navigation";

import {
  StyleSheet,
  View
} from 'react-native';
import { Button, Text } from 'react-native-elements'
import { FontAwesome, Feather } from '@expo/vector-icons';
import Colors from '../../../constants/Colors';
import PromotionService from '../../../services/PromotionService';
import AuthService from '../../../services/AuthService';
import InfoContainerComponent from '../../../components/InfoContainerComponent';
import { Bubbles } from 'react-native-loader';

class CodeScannedScreen extends Component {

  static navigationOptions = {
    title: 'Escáner',
  };

  constructor(props) {
    super(props);

    const { navigation } = this.props;
    this.data = navigation.getParam('data', '');
    this.target = this.data.target;
    this.type = this.data.type;
    this.data = JSON.parse(this.data.data);
    this.state = {
      res: null,
      state: 0
    };

    /**
     * This.state.state is related to the result of reading QR and its response from back endpoint:
     * 0 -> No response yet (before fetch).
     * 1 -> Success (no errors).
     * 2 -> Invalid (response errors).
     * 3 -> Another restaurant plate (different partnerId).
     */

    // Info data
    this.infoType = "success";
    this.title = "title"
    this.subtitle = "subtitle";

    this.isDataValid = this.isDataValid.bind(this);
    this.renderNotInRestaurantPlate = this.renderNotInRestaurantPlate.bind(this);
    this.renderInvalidCode = this.renderInvalidCode.bind(this);
    this.renderValidCode = this.renderValidCode.bind(this);
  }

  renderLoading() {
    return (
      <View style={{ width: '100%', height: '100%', justifyContent: "center", alignItems: "center" }}>
        <Bubbles size={10} color={Colors.yellowMeniu} />
      </View>);
  }

  async componentDidMount() {
    let partnerIdentification = (await AuthService.retrieveUser()).applicationBranchOffice.branchOffice.partner.identification;
    /* console.log(partnerIdentification);
    console.log(this.data.partnerIdentification); */
    if (partnerIdentification === this.data.partnerIdentification) {
      PromotionService.readCode(JSON.stringify(this.data)).then(res => res.json()).then(resJSON => {
        if (resJSON._statusCode) {
          this.setState({
            res: resJSON,
            state: 2
          });
        }
        else {
          this.setState({
            res: resJSON,
            state: 1
          });
        }
      });
    }
    else {
      this.setState({
        state: 3,
        res: null
      });
    }
  }

  isDataValid() {
    let valid = true;

    //TODO Validar que tenga los datos necesarios (tipo plan, tipo plato)

    return valid;
  }

  plateInRestaurant() {
    let plateInRestaurant = true;
    //TODO Validar que plato sea de este restaurante

    return plateInRestaurant;
  }

  handleGoBack = () => {
    this.props.navigation.pop();
  }

  handleOrderFinished = () => {
    this.props.navigation.navigate("SalesMain");
  }

  renderNotInRestaurantPlate() {
    this.title = "Plato de otro restaurante";
    this.subtitle = "El cupón no se puede redimir en este restaurante";
    this.infoType = "error";
    return (
      <View style={styles.container}>
        <Feather name={'x'} size={80} color={Colors.black} />
        <Text h4>No disponible</Text>
        <Text>El plato escaneado no se encuentra disponible en tu restaurante</Text>
        <Button buttonStyle={styles.buttonStyle} titleStyle={styles.textButtonStyle}
          title="Volver" onPress={this.handleGoBack} />
      </View>
    );

  }

  renderInvalidCode() {
    this.title = "Código no validado";
    this.subtitle = "El código no pudo ser validado";
    this.infoType = "error";
    return (
      <View style={styles.container}>
        <Feather name={'x'} size={80} color={Colors.black} />
        <Text h4>No disponible</Text>
        <Text>El plato escaneado no es válido o no se encuentra disponible en tu restaurante</Text>
        <Button buttonStyle={styles.buttonStyle} titleStyle={styles.textButtonStyle}
          title="Volver" onPress={this.handleGoBack} />
      </View>
    );

  }

  renderValidCode() {
    this.title = "Código validado";
    this.subtitle = "Ya puedes entregar el plato a nuestro Meniuser";
    this.infoType = "success";
    // console.log("data QR", this.data);
    // this.data = {
    //   "comboType": "Warrior",
    //     "couponType": 0,
    //       "partnerIdentification": 123456789,
    //         "planType": 0,
    //           "promotionCouponId": 1,
    //             "userEmail": "asd@asd.com",
    // }

    return (<View style={styles.container}>
      <FontAwesome name={'check'} size={80} color={Colors.successColor} />

      <View style={{ width: "80%", alignItems: "flex-start" }}>
        <Text style={styles.headerText}>Nombre del plato:</Text>
        <Text style={styles.subtitleText}>'Nombre'</Text>

        <Text style={styles.headerText}>Categoría:</Text>
        <Text style={styles.subtitleText}>'Categoría'</Text>

        <Text style={styles.headerText}>Incluye:</Text>
        <Text style={styles.subtitleText}>'Incluye'</Text>
      </View>
      <Button buttonStyle={styles.buttonStyle} titleStyle={styles.textButtonStyle}
        title="Orden realizada" onPress={this.handleOrderFinished} />
    </View>);
  }
  /**
  *Conditional render: should evaluate navigation props to check whether:
  * - code was valid: renderValidCode
  * - plate was not in the restaurant: renderNotInRestaurantPlate
  * - Code in wrong format or not working: renderInvalidCode
  */
  render() {
    let conditionalContent;
    if (this.state.state === 0)
      return this.renderLoading();

    if (this.state.state === 1) {
      conditionalContent = this.renderValidCode();
    }
    else if (this.state.state === 3) {
      conditionalContent = this.renderNotInRestaurantPlate();
    }
    else {
      conditionalContent = this.renderInvalidCode();
    }
    /* if (this.) {
      conditionalContent = this.renderLoading();
    }
    else if (!this.isDataValid()) {
      conditionalContent = this.renderInvalidCode();
    }
    else if (!this.plateInRestaurant()) {
      conditionalContent = this.renderNotInRestaurantPlate();
    }
    else {
      conditionalContent = this.renderValidCode();
    } */
    // conditionalContent = this.renderInvalidCode();
    return (
      <InfoContainerComponent title={this.title} subtitle={this.subtitle} infoType={this.infoType}>
        {conditionalContent}
      </InfoContainerComponent>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  buttonStyle: {
    flexDirection: "column",
    width: "80%",
    backgroundColor: Colors.yellowMeniu,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    borderRadius: 10,
  },
  textButtonStyle: {
    color: Colors.black,
    textAlign: "center",
  },
  headerText: {
    fontWeight: "bold",
  },
  subtitleText: {
    color: Colors.darkBackgroundColor,
  },
});


export default CodeScannedScreen;