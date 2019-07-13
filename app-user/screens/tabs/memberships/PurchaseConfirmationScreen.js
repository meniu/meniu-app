import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableHighlight } from 'react-native'
import { Button } from 'react-native-elements';
import { LinearGradient } from "expo";
import CustomIcon from '../../../components/CustomIcon'
import CouponListComponent from '../../../components/CouponListComponent';
import Colors from '../../../constants/Colors';
import Layout from '../../../constants/Layout';
import { WebBrowser } from 'expo';

export default class PurchaseConfirmationScreen extends Component {

    constructor(props) {
        super(props);

        const { navigation } = this.props;
        this.plan = navigation.getParam('plan', 'Sin Plan');
    
        this.state = {
             
        }
    }

    static navigationOptions = {
        header: null,
    };

    navigateBack = () => {
        this.props.navigation.pop();
    }

    CloseButton = (props) => {
        return( 
            <TouchableHighlight style={{position:"absolute",top: 10, right:10}} onPress={this.navigateBack} >
                <CustomIcon name="x" size={Layout.window.width/12}/>
            </TouchableHighlight>
        );
    }

    getCouponQty = () => {
        let allCoupons = this.plan.coupons.reduce((a,b) => {
            return {quantity: a.quantity + b.quantity}
        });
        return allCoupons.quantity;
    }

    /**
     * Buys plan (Pay U flow)
     * Once confirmed, redirects to PostPurchase Screen
     */
    handleGetPlanClick = async (pDescription, pReferenceCode, pAmount) =>{
        let result = await WebBrowser.openBrowserAsync(`http://192.168.0.34:3000/buy?description=${pDescription}&amount=${pAmount}&referenceCode=${pReferenceCode}`);
        console.log('result:');
        console.log(result);
        /* this.props.navigation.navigate("PostPurchase",{
            plan: this.plan
        }); */
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.mainContainer}>
                    <this.CloseButton/>
                    <LinearGradient colors={Colors.gradient[this.plan.combo.type]} style={styles.gradient}
                        start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
                        <CustomIcon name="no-plan" size={70} color={Colors.white} style={{textAlign:"center"}} />
                        <Text style={styles.membershipTitle}>{this.plan.combo.type}</Text>
                    </LinearGradient>

                    <Text style={{fontSize:26}}>Confirma tu compra</Text>

                    <View style={{width:"80%", alignItems:"flex-start"}}>
                        <Text style={styles.headerText}>Tipo de plan:</Text>
                        <Text style={styles.subtitleText}>{this.plan.combo.type}</Text>

                        {/* <Text style={styles.headerText}>Platos:</Text>
                        <Text style={styles.subtitleText}>{this.plan.foodQuantity} platos</Text> */}
                        
                        <Text style={styles.headerText}>Precio:</Text>
                        <Text style={[styles.subtitleText,{fontWeight:"900"}]}>$ {this.plan.combo.price}</Text>

                        <Text style={styles.headerText}>Incluye:</Text>
                        <CouponListComponent coupons={this.plan.couponPlans} combo = {this.plan.combo}/>

                        <Text style={styles.headerText}>Válido:</Text>
                        <Text style={styles.subtitleText}>{this.plan.couponPlans[0].plan.validityInDays} días</Text>
                    </View>

                    <Button buttonStyle={styles.buttonStyle} titleStyle={styles.textButtonStyle}
                        title="Confirmar" onPress={() => this.handleGetPlanClick(this.plan.combo.type, this.plan.combo.type, this.plan.combo.price)}/>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-around",
        backgroundColor: Colors.darkBackgroundColor,
    },
    mainContainer: {
        height:Layout.window.height * 0.7,
        width: Layout.window.width * 0.8,
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 15,
        backgroundColor: Colors.backgroundColor,
        justifyContent:"space-around",
        alignItems:"center",
    },
    gradient: {
        height:Layout.window.height/8,
        width:"40%",
        justifyContent:"center",
        alignItems:"stretch",
    },
    membershipTitle: {
        backgroundColor: Colors.whiteTransparent,
        fontStyle:"italic",
        fontSize:12,    
        textAlign:"center"
    },
    headerText:{
        fontWeight:"bold",
    },
    subtitleText:{
        color:Colors.darkBackgroundColor,
    },
    buttonStyle: {
        flexDirection:"column",
        width:"80%",
        backgroundColor: Colors.yellowMeniu,
        justifyContent: "center",
        alignItems:"center",
        alignContent:"center",
        borderRadius:10,
    },
    textButtonStyle: {
        color:Colors.black, 
        textAlign:"center",
    },
})
