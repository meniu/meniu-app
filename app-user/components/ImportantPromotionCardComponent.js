import React, { Component } from 'react'
import { Image, Text, StyleSheet, View } from 'react-native'
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import BadgeComponent from './BadgeComponent';
import { Badge } from 'react-native-elements';
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
        <View style={styles.imageContainer}>
            <Image
              style={styles.cardImage}
              source={{uri: this.props.uri}}
            />
        </View>
        <Badge status="warning" badgeStyle={{backgroundColor:Colors.yellowMeniu}} containerStyle={styles.floatingBadge}></Badge>
        <View style={styles.floating}>
          <BadgeComponent type={this.props.type}/>
          <Text style={styles.floatingText}>{this.props.name}</Text>
        </View>
        <View style={styles.descriptionContainer}>
            <Text>{this.props.description}</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection:"column",
    margin:5,
    minWidth: Layout.window.width/2,
},
  floatingBadge:{
    position:"absolute",
    top:7,
    left:7,
  },
  floating:{
      position:"absolute",
      bottom:46,
      flexDirection:"column",
      alignItems:"flex-start",
  },
  floatingText:{
    color:Colors.white,
    fontStyle:"italic",
  },
  imageContainer:{
      flex:3,
      backgroundColor:Colors.backgroundColor,
      justifyContent:"center",
      alignItems:"center",
  },
  cardImage:{
      flex:1,
      width: undefined, 
      height: undefined, 
      alignSelf: "stretch",
      resizeMode: "cover",
      // position: "absolute"
    },
  descriptionContainer:{
      flex:1,
      backgroundColor:Colors.yellowMeniu,
      opacity: 0.5,
  }
})
