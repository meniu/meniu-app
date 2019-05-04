import React, { Component } from 'react'
import { Text, StyleSheet, View, ScrollView, FlatList } from 'react-native'
import Colors from '../../../constants/Colors';
import MockData from '../../../constants/MockData';
import MembershipCardComponent from '../../../components/MembershipCardComponent';

export default class MembershipsScreen extends Component {

    constructor(props) {
      super(props)
    
      // layout can be either week or month
      this.state = {
         layout:"week"
      }
      this.handleMembershipPress = this.handleMembershipPress.bind(this)
    }
    

    static navigationOptions = {
        title: 'Membresías',
    };

    handleMembershipPress() {

    }

    render() {
        return (
        <View style={styles.container}>
            <View style={styles.timeFilters}></View>
            <View style={styles.planDetail}></View>
            <View style={styles.planList}>
                <ScrollView style={{flex:1}} >
                    <FlatList 
                    style={{flex:1}}
                    // key={(this.state.layout)}
                    numColumns={1}
                    keyExtractor={(item)=>item.name}
                    onPressItem={this.handleMembershipPress}
                    data={MockData.memberships}
                    renderItem={({item}) => {
                        return <MembershipCardComponent membership={item}/>
                    }}
                    />
                </ScrollView>
            </View>
        </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    timeFilters:{
        flex:1,
        backgroundColor:Colors.darkBackgroundColor,
    },
    planDetail:{
        flex:2,
        backgroundColor:Colors.backgroundColor,

    },
    planList:{
        flex:7,
        backgroundColor:Colors.lightBackgroundColor,
    }
    
})

