import React, { PureComponent } from 'react'
import { Image, Text, StyleSheet, View, 
  TouchableHighlight, } from 'react-native'
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import BadgeComponent from './BadgeComponent';
import { Rating } from 'react-native-elements';
import Config from '../constants/Config';

export default class ImportantPastPromotionCardComponent extends PureComponent {


    //   PROPS: 
    // item={uri, type, date, name, description, ...} 
    // of the promotion/plate
    // action
    // function to execute when reorder is pressed
    
  render() {
    return (
      <View style={styles.container}>
        <BadgeComponent type={this.props.entity.type} containerStyle={styles.floatingBadge}/>
        <View style={styles.imageContainer}>
            <Image
              style={styles.cardImage}
              source={{uri: Config.azureStorageUrl + this.props.entity.imagePath}}
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
          <Text>-${this.props.entity.discount}</Text>
          <TouchableHighlight onPress={this.props.action}>
            <Text style={{color:Colors.darkBackgroundColor}}>Reordenar</Text>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flexDirection:"column",
    margin:15,
    height: Layout.window.width*0.3,
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
      backgroundColor:Colors.yellowMeniuTransparent,
      flexDirection:"row",
      justifyContent:"space-between",
      padding:3,
  }
})
