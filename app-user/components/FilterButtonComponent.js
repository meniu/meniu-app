import React, { Component } from 'react'
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import BadgeComponent from './BadgeComponent';

export default class FilterButtonComponent extends Component {
    constructor(props) {
      super(props);
    //   type: "basic", "medium" or "deluxe"
      this.state = {
         
      }
    }

    
    
    render() {
        
        return (
            <TouchableHighlight style={{flex:1}} onPress={()=>{}}>
                <View style={styles.horizontal}>
                    <BadgeComponent type={this.props.type}></BadgeComponent>
                    <Text>{this.props.type}</Text>
                </View>
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    horizontal: {
        flexDirection:"row"
    }
});

