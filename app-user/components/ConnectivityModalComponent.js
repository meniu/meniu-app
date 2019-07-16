import React from 'react';
import { View, TouchableHighlight, StyleSheet} from 'react-native';
import { Text } from 'react-native-elements';
import Colors from '../constants/Colors';
import BadgeComponent from './BadgeComponent';
import Modal from 'react-native-modal';
import {Feather, MaterialIcons} from '@expo/vector-icons';

export default function ConnectivityModalComponent() {
    /**
     * PROPS: 
     * visible (bool)
     * toggleVisible (function: should update prop visible too)
     */
    
    return (
        <Modal
            style={styles.modal}
            isVisible={this.props.visible}>
            <View style={styles.modalFailureContent}>
                <TouchableHighlight style={{position:"absolute",top: 10, right:10}} onPress={this.props.toggleVisible} >
                    <Feather name="x" size={Layout.window.width/12}/>
                </TouchableHighlight>
                <MaterialIcons name="signal-wifi-off" size={Layout.window.width/3} />
                <Text h4 style={{textAlign:"center"}}>Sin conexión</Text>
                <Text style={{textAlign:"center", margin:10}}>Por favor revisa tu conexión a internet</Text>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modal: {
        flex:1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalFailureContent: {
        justifyContent: "center",
        alignItems: "center",
        width: Layout.window.width * 0.7,
        height: Layout.window.height * 0.5,
        backgroundColor: Colors.white ,
        padding: 5
    },
})
