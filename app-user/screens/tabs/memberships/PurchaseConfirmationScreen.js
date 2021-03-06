import React, { Component } from 'react'
import {
    Text, StyleSheet, View, TouchableHighlight,
    ImageBackground, ActivityIndicator
} from 'react-native'
import { Button } from 'react-native-elements';
import { LinearGradient } from "expo-linear-gradient";
import CustomIcon from '../../../components/CustomIcon'
import CouponListComponent from '../../../components/CouponListComponent';
import Colors from '../../../constants/Colors';
import Layout from '../../../constants/Layout';
import * as WebBrowser from 'expo-web-browser'
import Config from '../../../constants/Config';
import base64 from 'react-native-base64';
import PaymentService from '../../../services/PaymentService';
import AuthService from '../../../services/AuthService';
import { Alert } from "react-native";
import AccountService from '../../../services/AccountService';

export default class PurchaseConfirmationScreen extends Component {

    constructor(props) {
        super(props);

        const { navigation } = this.props;
        this.plan = navigation.getParam('plan', 'Sin Plan');
        this.user = navigation.getParam('user', 'Sin User');
        this.type = navigation.getParam('type', 'Sin Type');
        this.state = {
            loading: false
        }
    }

    static navigationOptions = {
        header: null,
    };

    navigateBack = () => {
        this.props.navigation.pop();
    }

    CloseButton = (props) => {
        return (
            <TouchableHighlight style={{ position: "absolute", top: 20, right: 20 }} onPress={this.navigateBack} >
                <CustomIcon name="x" size={Layout.window.width / 12} />
            </TouchableHighlight>
        );
    }

    getCouponQty = () => {
        let allCoupons = this.plan.coupons.reduce((a, b) => {
            return { quantity: a.quantity + b.quantity }
        });
        return allCoupons.quantity;
    }

    openBrowser = async (object64) => {
        await WebBrowser.openAuthSessionAsync(Config.payUpageUrl + `?${object64}`);
        //web browser closed
        AccountService.retrieveUserGet().then(response => response.json()).then(responseJSON => {
            AuthService.saveUserLocally(responseJSON);
            if (responseJSON.activeCombo && !this.user.activeCombo) {
                this.props.navigation.navigate("PostPurchase", {
                    plan: this.plan
                });
            }
            else {
                this.user = responseJSON;
            }
        });
    }

    /**
     * Buys plan (Pay U flow)
     * Once confirmed, redirects to PostPurchase Screen
     */
    handleGetPlanClick = async () => {
        this.setState({
            loading: true
        }, async () => {
            let correctProcess = false;
            PaymentService.initiatePayment(this.plan.combo.type).then(response => {
                if (response.status === 200) {
                    correctProcess = true;
                }
                return response.json();
            }).then(responseJSON => {
                this.setState({
                    loading: false
                }, () => {
                    if (correctProcess) {
                        let object = {
                            userEmail: this.user.applicationUser.email,
                            comboType: this.plan.combo.type,
                            price: this.plan.combo.price,
                            userFullName: this.user.name + " " + this.user.lastName,
                            paymentId: responseJSON.id,
                            planType: this.type
                        }
                        // console.log(object);
                        let object64 = base64.encode(JSON.stringify(object));
                        this.openBrowser(object64);
                    }
                    else {
                        let error = responseJSON._message;
                        Alert.alert("Existe un pago en proceso para este plan. Inténtalo más tarde.");
                    }
                });
            }).catch( error => {
                this.setState({
                    loading: false
                }, () => {
                    Alert.alert("Hubo un error. Inténtelo más tarde.");
                });
            });
        });
        /*  */
    }

    render() {
        return (
            <ImageBackground
                source={require('../../../assets/images/confirmacion-compraplan-bg.jpg')}
                style={{ resizeMode: "cover", width: Layout.window.width, height: Layout.window.height }}
            >
                <View style={styles.container}>
                    <View style={styles.mainContainer}>
                        <this.CloseButton />
                        <LinearGradient colors={Colors.gradient[this.plan.combo.type]} style={styles.gradient}
                            start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
                            <CustomIcon name="no-plan" size={70} color={Colors.white} style={{ textAlign: "center" }} />
                            <Text style={styles.membershipTitle}>{this.plan.combo.type}</Text>
                        </LinearGradient>

                        <Text style={{ fontSize: 24 }}>Confirma tu compra</Text>

                        <View style={{ width: "80%", alignItems: "flex-start" }}>
                            <Text style={styles.headerText}>Plan:</Text>
                            <Text style={styles.subtitleText}>{this.plan.combo.type}</Text>

                            {/* <Text style={styles.headerText}>Platos:</Text>
                            <Text style={styles.subtitleText}>{this.plan.foodQuantity} platos</Text> */}

                            <Text style={styles.headerText}>Precio:</Text>
                            <Text style={[styles.subtitleText, { fontWeight: "900" }]}>$ {this.plan.combo.price}</Text>

                            <Text style={styles.headerText}>Incluye:</Text>
                            <CouponListComponent coupons={this.plan.couponPlans} combo={this.plan.combo} showNumber={true} />

                            <Text style={styles.headerText}>Válido:</Text>
                            <Text style={styles.subtitleText}>{this.plan.couponPlans[0].plan.validityInDays} días</Text>
                        </View>

                        <Button buttonStyle={styles.buttonStyle} titleStyle={styles.textButtonStyle}
                            title="Confirmar" onPress={() => this.handleGetPlanClick()} />
                    </View>
                </View>
                {this.state.loading &&
                    <View style={styles.loading}>
                        <ActivityIndicator size='large' color='#000000' />
                    </View>
                }
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F5FCFF88'
    },
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-around",
    },
    mainContainer: {
        height: Layout.window.height * 0.7,
        width: Layout.window.width * 0.8,
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 20,
        padding: 20,
        backgroundColor: Colors.backgroundColor,
        justifyContent: "space-around",
        alignItems: "center",
    },
    gradient: {
        marginTop: 20,
        height: Layout.window.height / 6,
        width: "50%",
        justifyContent: "center",
        alignItems: "stretch",
    },
    membershipTitle: {
        backgroundColor: Colors.whiteTransparent,
        fontStyle: "italic",
        fontSize: 12,
        textAlign: "center"
    },
    headerText: {
        fontWeight: "bold",
    },
    subtitleText: {
        color: Colors.darkBackgroundColor,
    },
    buttonStyle: {
        flexDirection: "column",
        width: "80%",
        backgroundColor: Colors.yellowMeniu,
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        borderRadius: 10,
    },
    textButtonStyle: {
        color: Colors.black,
        textAlign: "center",
    },
})
