'use strict';

import React, { Component } from 'react';
import { StackActions, NavigationActions } from "react-navigation";

import {
  StyleSheet,
  View, Text
} from 'react-native';

class CodeScannedScreen extends Component {
  constructor(props) {
    super(props);

    const { navigation } = this.props;
    this.data = navigation.getParam('data', '');
    console.log("data", this.data.data);
    this.state = {};
  }

  renderNotInRestaurantPlate(){

  }

  renderInvalidCode(){

  }

  renderValidCode(){

  }
  /**
  *Conditional render: should evaluate navigation props to check whether:
  * - code was valid: renderValidCode
  * - plate was not in the restaurant: renderNotInRestaurantPlate
  * - Code in wrong format or not working: renderInvalidCode
  */
  render() {

    return (
      <Text>
        {this.data.data}
      </Text>
    );
  }
}

const styles = StyleSheet.create({

});


export default CodeScannedScreen;