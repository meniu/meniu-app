import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import CustomIcon from './CustomIcon';
import BadgeComponent from './BadgeComponent';

export default class AvailableCouponsComponent extends Component {

    constructor(props) {
        // couponsNumber: Qty of coupons available
        // type: Type of coupon (deluxe,premium,basic)
        super(props)
    
        this.state = {
             
        }
    }
    

    render() {
        return (
        <View style={styles.container}>
            <View style={styles.badgeContainer}>
                <BadgeComponent 
                    type={this.props.type} 
                    badgeStyle={{
                        width:Layout.window.width/12,
                        height:Layout.window.width/12,
                        borderRadius:500
                    }}
                    textStyle={{
                        fontSize:18
                    }}
                    />
            </View>
            <View style={styles.talkBubble}>
                <View style={[styles.talkBubbleTriangle,{borderRightColor:Colors[this.props.type]}]} />
                <View style={[styles.talkBubbleSquare,{backgroundColor:Colors[this.props.type]}]}>
                    <CustomIcon name={this.props.type.toLowerCase()} size={60} color={Colors.white} />
                    <Text style={{opacity:0.6}}>{this.props.type}</Text>
                </View>
            </View>   
            <View style={styles.textContainer}>
                <Text style={{color:Colors[this.props.type], fontSize:16,}}>Platos Disponibles:</Text>
                <Text style={{color:Colors[this.props.type], fontSize:28, fontWeight:"bold"}}>{this.props.promotionsNumber || 0}</Text>
            </View>
        </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        alignItems:"stretch",
        margin: 5,
    },
    badgeContainer:{
        flex:1.2,
        justifyContent:"center",
        alignItems:"center",
    },
    talkBubble: {
        flex:3,
        backgroundColor: Colors.transparent,
        flexDirection: "row",
        alignItems:"center",
    },
    talkBubbleTriangle: {
        flex:1,
        width: 0,
        height: 0,
        borderTopColor: Colors.transparent,
        borderTopWidth: Layout.window.width/50,
        borderRightWidth: Layout.window.width/50,
        borderBottomWidth: Layout.window.width/50,
        borderBottomColor: Colors.transparent
    },
    talkBubbleSquare: {
        flex:3.5,
        width: 105,
        height: 70,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        justifyContent:"center",
        alignItems:"center"
    },
    textContainer:{
        flex:6,
        padding:5
    }
})

