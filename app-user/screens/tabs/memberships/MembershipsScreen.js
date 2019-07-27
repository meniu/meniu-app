import React, { Component } from 'react'
import {
    Text, StyleSheet, View, ScrollView, FlatList,
    ImageBackground, Alert
} from 'react-native'
import { ButtonGroup } from 'react-native-elements';
import { Bubbles } from 'react-native-loader';
import Colors from '../../../constants/Colors';
import MockData from '../../../constants/MockData';
import MembershipCardComponent from '../../../components/MembershipCardComponent';
import ComboService from "../../../services/ComboService";
import CustomIcon from '../../../components/CustomIcon';

export default class MembershipsScreen extends Component {

    constructor(props) {
        super(props);

        const { navigation } = this.props;
        this.user = navigation.getParam('user', 'Sin User');

        //   timeIndex: determines whether week or month is selected
        //   0: mensual, 1: dos semanas
        this.state = {
            timeIndex: 0,
            combos: []
        }
        this.timeButtons = ["Mensual", "Dos semanas"];
    }

    componentDidMount() {
        // console.log('im gonna');
        ComboService.retrieveCombos()
            .then(response => response.json())
            .then(combos => {

                // console.log('ya se tiene');
                // console.log({combos});
                let x = [];
                combos = combos.map(combo => {
                    // TODO add logic and modal to treat this combo as a special case. 
                    // Commented until then.
                    // this.addPersonalizedToCombo(combo);
                    return combo;
                });
                this.setState({
                    combos: combos
                });
            })
            .catch(error => {
                console.log({ error });
                Alert.alert("Error obteniendo los planes", "Por favor revisa tu conexión a internet")
            }

            );

    }

    static navigationOptions = {
        title: 'meniu',
    };

    addPersonalizedToCombo = (combo) => {
        combo.comboCouponPlans.push({
            active: true,
            combo: {
                id: 0,
                description: "A tu medida, como más te guste",
                type: "Personalized",
                // Must be overwritten when properly configured in modal
                price: 100
            },
            couponPlans: [
                {
                    id: 1,
                    coupon: { type: "Basic" },
                    foodQuantity: 5,
                    plan: {
                        "type": combo.plan.type,
                        "validityInDays": combo.plan.validityInDays,
                    }
                },
                {
                    id: 2,
                    coupon: { type: "Premium" },
                    foodQuantity: 5,
                    plan: {
                        "type": combo.plan.type,
                        "validityInDays": combo.plan.validityInDays,
                    }
                },
                {
                    id: 3,
                    coupon: { type: "Deluxe" },
                    foodQuantity: 5,
                    plan: {
                        "type": combo.plan.type,
                        "validityInDays": combo.plan.validityInDays,
                    }
                },
                {
                    id: 4,
                    coupon: { type: "Gold" },
                    foodQuantity: 5,
                    plan: {
                        "type": combo.plan.type,
                        "validityInDays": combo.plan.validityInDays,
                    }
                },
            ]
        });
    }

    updateIndex = (timeIndex) => {
        this.setState({ timeIndex })
    }

    handleMembershipPress = (plan) => {
        this.props.navigation.navigate("PurchaseConfirmation", {
            plan,
            user: this.user,
            type: this.timeButtons[this.state.timeIndex]
        });
    }

    renderLoading() {
        return (
            <View style={{ width: '100%', height: '100%', justifyContent: "center", alignItems: "center" }}>
                <Bubbles size={10} color={Colors.yellowMeniu} />
            </View>);
    }


    render() {

        if (this.state.combos.length <= 0)
            return this.renderLoading();
        return (
            <View style={styles.container}>
                <ImageBackground
                    source={require('../../../assets/images/planes-portrait.jpg')}
                    style={{ resizeMode: "cover", flex: 2 }}
                >
                    <View style={styles.planDetail}>
                        <View
                            style={{
                                flex: 1, marginHorizontal: 10, backgroundColor: Colors.brownTransparent,
                                borderColor: Colors.white, borderRadius: 5, borderWidth: 2,
                            }}>
                            <CustomIcon
                                name={this.state.timeIndex === 0 ? "plan-mensual" : "plan-semimensual"}
                                size={70}
                                color={Colors.white}
                            />
                        </View>
                        <View style={{ flex: 4, alignItems: "flex-start" }}>
                            <Text style={{ backgroundColor: Colors.lightBackgroundColor, padding: 5 }}>
                                {"Plan " + this.state.combos[this.state.timeIndex].plan.type}
                            </Text>
                            <Text style={styles.whiteTextShadow}>Disfruta nuevos platos y ahorra</Text>
                            <Text style={styles.whiteTextShadow}>
                                {this.state.timeIndex === 0 ? "Obten 20 platos" : "Obten 10 platos"}
                            </Text>
                            <Text style={{ backgroundColor: Colors.lightOrange, color: Colors.lightBackgroundColor, borderRadius: 15, padding: 5 }}>
                                {"Válido: " + this.state.combos[this.state.timeIndex].plan.validityInDays + " días"}
                            </Text>
                        </View>
                    </View>
                </ImageBackground>
                <View style={styles.timeFiltersContainer}>
                    <ButtonGroup
                        onPress={this.updateIndex}
                        selectedIndex={this.state.timeIndex}
                        buttons={this.timeButtons}
                        containerStyle={styles.timeFilters}
                        selectedButtonStyle={styles.selectedTimeFilter}
                        selectedTextStyle={{ fontWeight: "bold", color: "black", fontFamily: "meniu" }}
                        textStyle={{ fontFamily: "meniu" }}
                    />
                </View>
                <View style={styles.planList}>
                    {
                        this.state.combos.length <= 0 ?
                            <View style={{ width: '100%', height: '100%', justifyContent: "center", alignItems: "center" }}>
                                <Bubbles size={10} color={Colors.yellowMeniu} />
                            </View> :
                            <ScrollView style={{ flex: 1 }} >
                                <FlatList
                                    style={{ flex: 1 }}
                                    /* key={(this.state.timeIndex)} */
                                    numColumns={1}
                                    keyExtractor={(item) => item.combo.id.toString()}
                                    onPressItem={this.handleMembershipPress}
                                    data={this.state.timeIndex === 0 ? this.state.combos[0].comboCouponPlans : this.state.combos[1].comboCouponPlans}
                                    renderItem={({ item }) => {
                                        return <MembershipCardComponent membership={item} action={() => this.handleMembershipPress(item)} />
                                    }}
                                />
                            </ScrollView>
                    }
                </View>
            </View>
        )

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    planDetail: {
        flex: 2,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    whiteTextShadow: {
        color: Colors.lightBackgroundColor,
        textShadowRadius: 50,
        textShadowColor: Colors.black,
        textShadowOffset: { width: -1, height: 1 },
    },
    timeFiltersContainer: {
        flex: 1,
        backgroundColor: Colors.lightBackgroundColor,
    },
    timeFilters: {
        width: "60%",
    },
    selectedTimeFilter: {
        backgroundColor: Colors.yellowMeniu,
    },
    planList: {
        flex: 7,
        backgroundColor: Colors.lightBackgroundColor,
    }

})

