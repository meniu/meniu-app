import React, { Component } from 'react'
import { Image, Text, TouchableHighlight, View, StyleSheet } from 'react-native'
import Colors from '../constants/Colors';
import BadgeComponent from './BadgeComponent';

export default class PromotionCardComponent extends Component {
    
    /** PROPS: 
      -entity:
          type, uri, price(discount), score, name, description(optional), date (optional) 
      -actionType:
          "order" // "reorder"
      -action:
          function to be executed.
     */
    constructor(props) {
      super(props)
    
      this.state = {
         
      }
    }

  
    renderSubtitle(){
        switch (this.props.actionType) {
            case "reorder":
                return this.props.entity.transactionDate;
            case "order":
                return this.props.entity.description;
        }
    }

    renderOrder(){
        switch (this.props.actionType) {
            case "reorder":
                return "Reordenar";
            case "order":
                return "Ordenar";
        }
    }

    render() {
        return (
        <View style={styles.container}>
            <View>
                <BadgeComponent type={this.props.entity.type}/>
                <Image
                style={{width: 50, height: 50}}
                source={{uri: this.props.entity.uri}}
                />
                <Text>{"$ " + this.props.entity.discount}</Text>
            </View>
            <View>
                <Text>{this.props.entity.rating}</Text>
                <Text>{this.props.entity.name}</Text>
                <Text>{this.renderSubtitle()}</Text>
            </View>
            <TouchableHighlight onPress={this.props.action}>
                <Text>{this.renderOrder()}</Text>
            </TouchableHighlight>
        </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{ 
      flex: 1, 
      flexDirection: "row",
      alignItems: "center", 
      justifyContent: "space-around",
      backgroundColor: Colors.cardColor,
    },
    plate_container: {
      flex: 1,
      alignItems: "center", 
      justifyContent: "space-between",
      // backgroundColor: Colors.cardColor,
    }
  });
  