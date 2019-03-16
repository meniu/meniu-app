import React, { Component } from 'react'
import { Text, View } from 'react-native'

export default class FavoritesScreen extends Component {

    static navigationOptions = {
        title: 'Favoritos',
    };

    render() {
        return (
        <View>
            <Text> Aqui encontrarás tus restaurantes preferidos! </Text>
        </View>
        )
    }
}
