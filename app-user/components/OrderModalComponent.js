import React, { Component } from 'react'
import { Button, Image, Text, View, StyleSheet } from 'react-native'
import Modal from "react-native-modal"
import Layout from '../constants/Layout';
import Colors from '../constants/Colors';

export default class OrderModalComponent extends Component {

    /**
     * 
     * @param {*} props 
     * type: "success"/"failure", 
     * promotionEntity, 
     * restaurantEntity
     * togglevisible: toggle visibility in parent (function)
     * buttonAction: function to do in desired button.
     */
    constructor(props) {
        super(props)
        
    }

    
    renderSuccessContent() {
        return(
        <View style={styles.modalContent}>
            <Image
                style={{height: Layout.window.width/3, width: Layout.window.width/3}}
                source={{uri:this.props.restaurantEntity.uri}}
                resizeMode="contain"
            />
            <Text>{this.props.restaurantEntity.name}</Text>
            <Text>Confirma tu orden</Text>

            <Text>Nombre del plato:</Text>
            <Text>{this.props.promotionEntity.name}</Text>

            <Text>Categoria:</Text>
            <Text>{this.props.promotionEntity.type}</Text>

            <Text>Ahorras:</Text>
            <Text>$ {this.props.promotionEntity.discount}</Text>

            <Text>Incluye:</Text>
            <Text>{this.props.promotionEntity.description}</Text>


            <Button title="Confirmar"onPress={this.props.buttonAction}>
            </Button>
        </View>
        );
    }

    renderFailureContent() {
        return(
            <View style={styles.modalContent}>
                <Text>Algo falló!</Text>
                <Text>No puedes gastar en estas promociones</Text>
                <Button title="Revisar tu membresía" onPress={this.props.buttonAction}>
                </Button>
            </View>
            );
    }

    renderContent() {
        if(this.props.type === "success")
            return this.renderSuccessContent();
        if(this.props.type === "failure")
            return this.renderFailureContent();
    }

    render() {
        return (
            <Modal
                style={styles.modal}
                isVisible={this.props.visible}>
                {this.renderContent()}
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    modal: {
        flex:1,
        justifyContent: "center",
        alignItems: "center",
      },
      modalContent: { 
        justifyContent: "center",
        alignItems: "center",
        width: Layout.window.width * 0.7,
        height: Layout.window.width,
        backgroundColor: Colors.white }
})

