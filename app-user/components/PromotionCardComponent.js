import React, { Component } from 'react'
import { Image, Text, TouchableHighlight, View, StyleSheet } from 'react-native'
import Colors from '../constants/Colors';
import BadgeComponent from './BadgeComponent';
import { Rating, Tile, Card } from 'react-native-elements';
import Layout from "../constants/Layout";

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
            {/* <View style={styles.imageContainer}>
                <BadgeComponent type={this.props.entity.type}/>
                <Image
                    style={{width: 50, height: 50}}
                    source={{uri: this.props.entity.uri}}
                />
                <Text>{"$ " + this.props.entity.discount}</Text>
            </View> */}
            <Card
                image={{uri: this.props.entity.imagePath}}
                imageStyle={{ width:'100%', height:55, }}
                imageProps={{resizeMode:"cover"}}
                imageWrapperStyle={{overflow:"hidden"}}
                containerStyle={styles.imageContainer}
                // wrapperStyle={{opacity:0.5}}
                >
                <View style={{justifyContent:"center", alignItems:"center"}}>
                    <Text>
                        {"-$ " + this.props.entity.discount}
                    </Text>
                </View>
            </Card>
            <BadgeComponent type={this.props.entity.couponPlan.coupon.couponType} containerStyle={styles.floatingBadge} />
            <View style={styles.infoContainer} >
                <Rating
                    imageSize={10}
                    readonly
                    startingValue={this.props.entity.rating}
                />
                <Text>{this.props.entity.name}</Text>
                <Text style={{color:Colors.darkBackgroundColor}}>{this.renderSubtitle()}</Text>
            </View>
            <TouchableHighlight style={styles.actionButton} onPress={this.props.action}>
                <Text style={{color:Colors.darkBackgroundColor}}>{this.renderOrder()}</Text>
            </TouchableHighlight>
        </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{ 
      flex: 1, 
      flexDirection: "row",
      alignItems: "stretch", 
      justifyContent: "space-between",
      backgroundColor: Colors.cardColor,
      borderWidth: 1,
      borderColor: Colors.border,
      borderRadius: Layout.radius,
      margin:2,
    },
    imageContainer: {
        flex: 1,
        alignItems: "stretch", 
        justifyContent: "flex-start",
        backgroundColor: Colors.yellowMeniu,
        borderRadius:Layout.radius,
        margin:5,
        marginBottom:5,
        overflow:"hidden",
    },
    infoContainer: {
        flex:2,
        flexDirection: "column",
        justifyContent:"center",
        alignItems: "flex-start",
        borderRightWidth:1, 
        borderRightColor:Colors.border,
    },
    actionButton:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
    }, 
    floatingBadge: {
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 2,
        elevation: 2,
    }
  });
  