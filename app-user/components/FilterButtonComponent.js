import React, { Component } from 'react'
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import BadgeComponent from './BadgeComponent';
import Colors from '../constants/Colors';

export default class FilterButtonComponent extends Component {
    constructor(props) {
      super(props);
    // type: "basic", "medium", "deluxe" or "gold"
    // selected: boolean. If true, badge will be white and background of type color

    }

    toggleSelected = () => {
        this.setState((state)=>({selected:!state.selected}));
        // TODO: The parent component must know about this change of filter.
    }

    getBackgroundColor = () => {
        return this.props.selected ? 
            Colors[this.props.type]:
            Colors.white;
    }

    getBadgeColor = () => {
        return this.props.selected ? 
            Colors.white:
            Colors[this.props.type];
    }
    
    render() {
        
        return (
            <TouchableHighlight style={{flex:1}} onPress={this.props.toggleSelected}>
                <View style={{...styles.container, backgroundColor: this.getBackgroundColor()}}>
                    <BadgeComponent type={this.props.type} color = {this.getBadgeColor()}></BadgeComponent>
                    <Text>{this.props.type}</Text>
                </View>
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection:"row",
        margin:2,
        borderRadius:5,
        alignItems:"center",
        justifyContent:"center",
    }
});

