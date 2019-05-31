import React, { Component } from 'react'
import { Image, Text, StyleSheet, View } from 'react-native'
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import BadgeComponent from './BadgeComponent';
import { Rating } from 'react-native-elements';
export default class ImportantPastPromotionCardComponent extends Component {

    constructor(props) {
      super(props)
    //   Props: 
    // item={uri, type, date, name, description, ...} 
    // of the promotion/plate
      this.state = {
         
      }
    }
    
  render() {
    return (
      <View style={styles.container}>
        <BadgeComponent type={this.props.entity.type} containerStyle={styles.floatingBadge}/>
        <View style={styles.imageContainer}>
            <Image
              style={styles.cardImage}
              source={{uri: this.props.entity.uri}}
            />
        </View>
        <View style={styles.floating}>
          <Rating
            imageSize={10}
            readonly
            startingValue={this.props.entity.rating}
            ratingBackgroundColor={Colors.transparent}
            type="custom"
            style={{backgroundColor:Colors.transparent}}
          />
          <Text style={styles.floatingText}>{this.props.entity.name}</Text>
          <Text style={styles.floatingDate}>{this.props.entity.transactionDate}</Text>
        </View>
        <View style={styles.descriptionContainer}>
            <Text>{this.props.entity.description}</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection:"column",
    margin:15,
    width: Layout.window.width*3/7,
},
  floatingBadge:{
    position:"absolute",
    top:7,
    left:7,
  },
  floatingBadge: {
    position: "absolute",
    top: -10,
    left: 0,
    zIndex: 2,
    elevation: 2,
  },
  floating:{
    position:"absolute",
    bottom:26,
    flexDirection:"column",
    justifyContent:"flex-end",
    alignItems:"flex-start",
  },
  floatingText:{
    color:Colors.white,
    fontStyle:"italic",
    fontWeight:"bold",
  },
  floatingDate:{
    color:Colors.white,
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
