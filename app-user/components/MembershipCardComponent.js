import React, { Component } from 'react'
import { Text, TouchableHighlight, StyleSheet, View } from 'react-native'
import {Tooltip} from 'react-native-elements';
import Colors from '../constants/Colors';

export default class MembershipCardComponent extends Component {

  /**
   * 
   * @param {} props 
   * membership- includes: name, price, description, promotionTypes
   */
  constructor(props) {
    super(props)
  
    this.state = {
       
    }
  }

  handleBuyPress(){

  }
  
  renderPromotionTypes(){
    let promotionTypes = this.props.membership.promotionTypes;
    return (<Text>{JSON.stringify(promotionTypes)}</Text> );
  }

  render() {
    
    return (
      <View style={styles.container}>
        
        <View style={styles.imageContainer}>
          <Text>{this.props.membership.name}</Text>
        </View>
        <View style={styles.descriptionContainer}>
          <Text>{this.props.membership.price}</Text>
          <Text>{this.props.membership.description}</Text>
          <View>{this.renderPromotionTypes()}</View>
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
    },
    imageContainer: {
      flex: 1,
      backgroundColor:Colors.darkBackgroundColor,
      justifyContent:"flex-end"
    },
    descriptionContainer: {
      flex: 4,
    },
    button: {
      flex:1,
      alignItems: "center",
      justifyContent: "center",
    }
})
