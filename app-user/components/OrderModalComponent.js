import React, { Component } from 'react'
import { Image, View, StyleSheet, TouchableHighlight } from 'react-native'
import { Button, Divider, Overlay, Text } from 'react-native-elements';
import Modal from "react-native-modal"
import Layout from '../constants/Layout';
import Colors from '../constants/Colors';
import { Feather } from '@expo/vector-icons';

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

    CloseButton = (props) => {
        return( 
            <TouchableHighlight style={{position:"absolute",top: 10, right:10}} onPress={this.props.toggleVisible} >
                <Feather name="x" size={Layout.window.width/12}/>
            </TouchableHighlight>
        );
    }
    
    renderSuccessContent() {
        return(
        <View style={styles.modalSucessContent}>
            <this.CloseButton/>
            <View style={{justifyContent:"flex-end", alignItems:"center", marginTop:20}}>
                <Image
                    style={{height: Layout.window.width/4, width: Layout.window.width/3, resizeMode:"contain"}}
                    source={{uri:this.props.promotionEntity.uri}}
                />
                <Image
                    style={styles.circledImage}
                    source={{uri:this.props.restaurantEntity.uri}}
                />
                <Text style={styles.headerText}>{this.props.restaurantEntity.name}</Text>
            </View>

            <Text h4>Confirma tu orden</Text>

            <View style={{width:"100%", alignItems:"flex-start"}}>
                <Text style={styles.headerText}>Nombre del plato:</Text>
                <Text style={styles.subtitleText}>{this.props.promotionEntity.name}</Text>

                <Text style={styles.headerText}>Categoria:</Text>
                <Text style={styles.subtitleText}>{this.props.promotionEntity.type}</Text>
                
                <Text style={styles.headerText}>Ahorras:</Text>
                <Text style={styles.subtitleText}>$ {this.props.promotionEntity.discount}</Text>

                <Text style={styles.headerText}>Incluye:</Text>
                <Text style={styles.subtitleText}>{this.props.promotionEntity.description}</Text>
            </View>

            <Button buttonStyle={styles.buttonStyle} titleStyle={styles.textButtonStyle}
                title="Confirmar"onPress={this.props.buttonAction}>
            </Button>
        </View>
        );
    }

    renderFailureContent() {
        // let CloseButton = this.CloseButton;
        return(
            <View style={styles.modalFailureContent}>
                <this.CloseButton/>
                <Feather name="x" size={Layout.window.width/3} />
                <Text h4 style={{textAlign:"center"}}>Algo salió mal</Text>
                <Text style={{textAlign:"center", margin:10}}>No tienes cupones disponibles para esta promoción</Text>
                <Button buttonStyle={styles.buttonStyle} titleStyle={styles.textButtonStyle}
                    title="Ir a mi membresía" onPress={this.props.buttonAction}>
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
    modalSucessContent: { 
        justifyContent: "space-around",
        alignItems: "center",
        width: Layout.window.width * 0.7,
        height: Layout.window.height * 0.7,
        backgroundColor: Colors.white,
        padding: 5
    },
    modalFailureContent: {
        justifyContent: "center",
        alignItems: "center",
        width: Layout.window.width * 0.7,
        height: Layout.window.height * 0.5,
        backgroundColor: Colors.white ,
        padding: 5
    },
    headerText:{
        fontWeight:"bold",
    },
    subtitleText:{
        color:Colors.darkBackgroundColor,
    },
    circledImage:{
        flex:1,
        width: Layout.window.width/10, 
        height: Layout.window.width/10, 
        borderRadius: 500,
        margin: 10,
        position:"absolute",
        top:-25,
    },
    buttonStyle: {
        flexDirection:"column",
        width: "80%",
        backgroundColor: Colors.yellowMeniu,
        justifyContent: "center",
        alignItems:"center",
        alignContent:"center"
    },
    textButtonStyle: {
        color:Colors.black, 
        textAlign:"center",
    }
})

