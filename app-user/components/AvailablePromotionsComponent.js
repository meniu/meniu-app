import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import CustomIcon from './CustomIcon';
import BadgeComponent from './BadgeComponent';

export default class AvailablePromotionsComponent extends Component {

    constructor(props) {
        // promotionsNumber: Qty of promotions available
        // type: Type of promotion (deluxe,premium,basic)
        super(props)
    
        this.state = {
             
        }
    }
    

    render() {
        return (
        <View style={styles.container}>
            <View style={styles.badgeContainer}>
                <BadgeComponent type={this.props.type} />
            </View>
            <View style={styles.talkBubble}>
                <View style={[styles.talkBubbleTriangle,{borderRightColor:Colors[this.props.type]}]} />
                <View style={[styles.talkBubbleSquare,{backgroundColor:Colors[this.props.type]}]}>
                    <CustomIcon name="no-plan" size={60} color={Colors.white} />
                    <Text>{this.props.type}</Text>
                </View>
            </View>   
            <View style={styles.textContainer}>
                <Text>Platos Disponibles:</Text>
                <Text>{this.props.promotionsNumber || 0}</Text>
            </View>
        </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
    },
    badgeContainer:{
        margin:10,
        flex:1.9
    },
    talkBubble: {
        flex:2,
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
        flex:4,
        width: 120,
        height: 80,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
    },
    textContainer:{
        flex:6.2,
    }
})

