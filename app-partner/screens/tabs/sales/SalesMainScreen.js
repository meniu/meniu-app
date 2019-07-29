import React, { PureComponent } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import Colors from '../../../constants/Colors';

export default class SalesMainScreen extends PureComponent {

    handlePlateSaleClick = () => {
        this.props.navigation.navigate("PlateSale");
    }

    render() {
        return (
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={this.handlePlateSaleClick}
                >
                    <Text>Venta de plato</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => { }}
                >
                    <Text>Venta de plan</Text>
                </TouchableOpacity>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    buttonContainer: {
        flex: 1,
        margin: 10,
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "flex-start",
        backgroundColor: Colors.lightBackgroundColor,
    },
});
