import React, { Component } from 'react'
import { Image, Text, StyleSheet, View } from 'react-native'
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import BadgeComponent from './BadgeComponent';

export default class ImportantPromotionCardComponent extends Component {

    constructor(props) {
      super(props)
    //   Props: uri, type, name and description of the promotion/plate
      this.state = {
         
      }
    }
    
  render() {
    return (
      <View style={styles.container}>
        <BadgeComponent style={styles.floatingBadge} type={this.props.type}/>
        <View style={styles.imageContainer}>
            <Image
              style={styles.cardImage}
              resizeMode={"contain"}
              source={{uri: this.props.uri}}
            />
        </View>
        <View style={styles.descriptionContainer}>
            <Text>{this.props.name}</Text>
            <Text>{this.props.description}</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    floatingBadge:{
        position:"absolute",
        bottom:60,
    },
    container:{
        flex:1,
        flexDirection:"column",
        margin:5
    },
    imageContainer:{
        flex:2,
        backgroundColor:Colors.backgroundColor,
        justifyContent:"center",
        alignItems:"center",
    },
    cardImage:{
        flex:1,
        width: undefined, 
        height: undefined, 
        alignSelf: "stretch",
        // position: "absolute"
      },
    descriptionContainer:{
        flex:1,
        backgroundColor:Colors.darkBackgroundColor,
    }
})
