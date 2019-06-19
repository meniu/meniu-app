import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Colors from '../constants/Colors';
import { Badge } from 'react-native-elements';
export default class BadgeComponent extends Component {

    constructor(props) {
      super(props)
      // content: number, letter or whatever you want to put on the badge. 
      // Default will enter the letter according type
      // type: type of promotion, basic/premium/deluxe
      // color (optional): sets a color, no matter which the type is
      // containerStyle: additional styling for the container (position, for example)
      this.state = {
         
      }
    }

    getColor = () => {
      return this.props.color || Colors[this.props.type]
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
          <Badge 
            badgeStyle={{
              backgroundColor:this.getColor(),
            }} 
            value={
              this.props.content ? 
              this.props.content + " " : this.defaultContent() + " "
            }
            textStyle={
              styles.innerText
            }
            containerStyle={{
              ...this.props.containerStyle,
              ...styles.container
            }
            }
          />
        )
    }

}

const styles = StyleSheet.create({
  innerText: {
    color: 'black',
    opacity: 0.6,
    fontStyle:'italic',
  },
  container: {
    margin: 2,
  }
})

    