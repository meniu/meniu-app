import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableHighlight } from 'react-native'
import { Button } from 'react-native-elements';
import { LinearGradient } from "expo-linear-gradient";
import CustomIcon from '../../../components/CustomIcon'
import CouponListComponent from '../../../components/CouponListComponent';
import Colors from '../../../constants/Colors';
import Layout from '../../../constants/Layout';


export default class PostPurchaseScreen extends Component {

    constructor(props) {
        super(props);

        const { navigation } = this.props;
        this.plan = navigation.getParam('plan', 'Sin Plan');

        this.state = {

        }
    }

    static navigationOptions = {
        title: "meniu",
        headerLeft: null,
    };

    getCouponQty = () => {
        let allCoupons = this.plan.coupons.reduce((a, b) => {
            return { quantity: a.foodQuantity + b.foodQuantity }
        });
        return allCoupons.quantity;
    }
    goToRestaurantsClick = () => {
        this.props.navigation.navigate("PartnerSelection");
    }

    render() {
        return (
            <View style={styles.container}>
                <LinearGradient colors={[Colors.lightOrange, Colors.darkOrange]} style={styles.backGradient}
                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
                    <View style={{ backgroundColor: Colors.white, padding: 3, margin: 3, borderRadius: 15 }}>
                        <CustomIcon name="no-plan" size={70} color={Colors.black} style={{ textAlign: "center" }} />
                    </View>
                    <Text style={styles.headerText}>¡Has adquirido un nuevo plan!</Text>
                    <Text style={styles.subtitleText}>A continuación los detalles de tu plan</Text>
                </LinearGradient>
                <View style={styles.mainContainer}>
                    <LinearGradient colors={Colors.gradient[this.plan.combo.type]} style={styles.gradient}
                        start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
                        <CustomIcon name="no-plan" size={70} color={Colors.white} style={{ textAlign: "center" }} />
                        <Text style={styles.membershipTitle}>{this.plan.combo.type}</Text>
                    </LinearGradient>

                    <View style={{ width: "80%", alignItems: "flex-start" }}>
                        <Text style={styles.headerText}>Tipo de plan:</Text>
                        <Text style={styles.subtitleText}>{this.plan.combo.type}</Text>

                        <Text style={styles.headerText}>Precio:</Text>
                        <Text style={[styles.subtitleText, { fontWeight: "900" }]}>$ {this.plan.price}</Text>

                        <Text style={styles.headerText}>Incluye:</Text>
                        <CouponListComponent coupons={[{ type: this.plan.couponPlan.coupon.type, foodQuantity: this.plan.foodQuantity }]} />

                        <Text style={styles.headerText}>Válido:</Text>
                        <Text style={styles.subtitleText}>{this.plan.couponPlan.plan.validityInDays} días</Text>
                    </View>

                    <Button buttonStyle={styles.buttonStyle} titleStyle={styles.textButtonStyle}
                        title="Ir a restaurantes" onPress={this.goToRestaurantsClick} />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundColor: Colors.darkBackgroundColor,
    },
    backGradient: {
        height: Layout.window.height * 0.25,
        width: "100%",
        paddingBottom: 25,
        justifyContent: "center",
        alignItems: "center",
    },
    mainContainer: {
        height: Layout.window.height * 0.55,
        width: Layout.window.width * 0.8,
        position: "relative",
        top: -25,
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 15,
        backgroundColor: Colors.backgroundColor,
        justifyContent: "space-around",
        alignItems: "center",
    },
    gradient: {
        height: Layout.window.height / 8,
        width: "40%",
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
