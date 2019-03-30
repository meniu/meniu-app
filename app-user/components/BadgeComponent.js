import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Colors from '../constants/Colors';

export default class BadgeComponent extends Component {

    constructor(props) {
      super(props)
      // content: number, letter or whatever you want to put on the badge
      // type: type of promotion, basic/premium/deluxe
      this.state = {
         
      }
    }
    
    /**
     * according to the type entered in props, determine the corresponding letter
     * basic: B, premium: P, deluxe: D.
     */
    defaultContent() {
      let letter = "";
        switch (this.props.type) {
            case "basic":
                letter = "B";
                break;
            case "premium":
                letter = "P";
                break;
            case "deluxe":
                letter = "D";
                break;
            default:
                break;
        }
        return letter;
    }
    
    render() {
        return (
            <View style={{
              backgroundColor:Colors[this.props.type],
              borderRadius: 26/2,
              width:26,
              height:26,
              margin: 5
            }}>
                <Text style={styles.innerText}> {this.props.content ? this.props.content : this.defaultContent()}</Text>
            </View>
        )
    }

}

const styles = StyleSheet.create({
  innerText: {
    fontStyle:'italic',
    textAlign:"left"
  }
})

    