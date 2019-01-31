'use strict';

import React, { Component } from 'react';
import { ToastAndroid, Platform, Image, StyleSheet,  
  TextInput, Picker, FlatList, View, Text } from 'react-native';
import Colors from "../../../constants/Colors";
import PlateComponent from "../../../components/PlateComponent";

export default class TrendingPromotionsScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user:this.props.user,
      signedIn:true,
      text:"Búsqueda",
    };
  }

  static navigationOptions = {
    title: 'Platos',
  };

  componentDidMount() {
    let user = this.props.navigation.getParam("user",{});
    if(!user)
      this.setState({
        signedIn:false 
      });
    else
      this.setState({
        user 
      });
  }

  checkSignIn(){
    if (!this.state.signedIn)
    {
      if(Platform.OS === 'android')
        ToastAndroid.show('Por favor ingresa', ToastAndroid.SHORT);
      this.props.navigation.navigate("SignIn");
    }

  }

  renderLoading(){
    return (<View>
      <Text>Loading...</Text>
    </View>);
  }

  render() {
    if(!this.state.user)
      return this.renderLoading();
    else
      this.checkSignIn();
      return (
        <View style={styles.container}>
          <View style={styles.userView}>
            <Image
              style={{width: 50, height: 50}}
              source={{uri: this.state.user.photoUrl}}
            />
            <Text>{this.state.user.name}</Text>
          </View>
          <Text>¡Bienvenido a Meniu, {this.state.user.name}!</Text>
          <View style={styles.horizontalView}>
            <TextInput
              style={{height: 40, borderColor: 'gray', borderWidth: 1}}
              onChangeText={(text) => this.setState({text})}
              value={this.state.text}
            />
            <Picker
              selectedValue={""}
              style={{ height: 50, width: 100 }}
              onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>
              <Picker.Item label="Premium" value="PR" />
              <Picker.Item label="Basic" value="BA" />
            </Picker>
          </View>
          <FlatList
            data={[{key:"Chilaquiles"},{key:"Burrito"},{key:"Taco"}]}
            renderItem={({item}) => <PlateComponent dishName={item.key}/>}
          />
        </View>
      );
  }
}

const styles = StyleSheet.create({
  container:{ 
    flex: 1, 
    alignItems: "stretch", 
    justifyContent: "space-around",
    backgroundColor: Colors.backgroundColor,
  },
  userView:{
    alignItems:"center",
  },
  horizontalView:{
    flexDirection:"row",
    justifyContent: "space-around",
    backgroundColor: Colors.cardColor,
  }
});