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
    console.log("data", this.data);
    this.state = {
      res: "Waiting for response..."
    };

    // Info data
    this.infoType = "success";
    this.title = "title"
    this.subtitle = "subtitle";

    this.isDataValid = this.isDataValid.bind(this);
    this.renderNotInRestaurantPlate = this.renderNotInRestaurantPlate.bind(this);
    this.renderInvalidCode = this.renderInvalidCode.bind(this);
    this.renderValidCode = this.renderValidCode.bind(this);
  }

  async componentDidMount() {
    let partnerIdentification = (await AuthService.retrieveUser()).applicationBranchOffice.branchOffice.partner.identification;
    console.log('id1', partnerIdentification);
    console.log('id2', this.data.partnerIdentification);
    if (partnerIdentification === this.data.partnerIdentification) {
      PromotionService.readCode(JSON.stringify(this.data)).then(res => res.json()).then(resJSON => {
        console.log('Respesta readcode:');
        console.log(resJSON);
        this.setState({
          res: JSON.stringify(resJSON)
        });
      });
    }
    else {
      this.setState({
        res: "This QR code is related to another restaurant's promotion"
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
          title="Volver" onPress={handleGoBack} />
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
    if (!this.isDataValid()) {
      conditionalContent = this.renderInvalidCode();
    }
    else if (!this.plateInRestaurant()) {
      conditionalContent = this.renderNotInRestaurantPlate();
    }
    else {
      conditionalContent = this.renderValidCode();
    }
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