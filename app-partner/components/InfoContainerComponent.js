import React, { PureComponent } from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from 'react-native-elements';
import Colors from '../constants/Colors';
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Layout from '../constants/Layout';

// Component used to display warning, error or info screens
export default class InfoContainerComponent extends PureComponent {

    /**
     * Props:
     * -infoType: 'error' ...
     * -title
     * -subtitile
     * -children (JSX wrapped inside InfoContainerComponent tags)
     */

    renderGradientColors = () => {
        switch (this.props.infoType) {
            case "error":
                return [Colors.lightRed, Colors.darkRed];
            default:
                return [Colors.lightOrange, Colors.darkOrange];
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <LinearGradient colors={this.renderGradientColors()} style={styles.backGradient}
                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
                    <View style={{ backgroundColor: Colors.white, padding: 3, margin: 3, borderRadius: 15 }}>
                        <MaterialCommunityIcons name="qrcode-scan" size={50} />
                    </View>
                    <Text h4 style={this.props.infoType === "error" ? styles.whiteText : {}}>
                        {this.props.title}
                    </Text>
                    <Text style={this.props.infoType === "error" ? styles.whiteText : {}}>
                        {this.props.subtitle}
                    </Text>
                </LinearGradient>
                <View style={styles.mainContainer}>
                    {this.props.children}
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
        backgroundColor: Colors.backgroundColor,
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
        backgroundColor: Colors.lightBackgroundColor,
        justifyContent: "space-around",
        alignItems: "center",
    },
    whiteText: {
        color: Colors.backgroundColor,
    }
});
