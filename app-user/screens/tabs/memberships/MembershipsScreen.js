import React, { Component } from 'react'
import { Text, StyleSheet, View, ScrollView, FlatList } from 'react-native'
import { ButtonGroup } from 'react-native-elements';
import Colors from '../../../constants/Colors';
import MockData from '../../../constants/MockData';
import MembershipCardComponent from '../../../components/MembershipCardComponent';

export default class MembershipsScreen extends Component {

    constructor(props) {
      super(props)
    
    //   timeIndex: determines whether week or month is selected
    //   0: mensual, 1: dos semanas
      this.state = {
         timeIndex:0
      }
      this.timeButtons = ["Mensual", "Dos semanas"];
    }
    

    static navigationOptions = {
        title: 'Membresías',
    };

    updateIndex = (timeIndex) => {
        this.setState({timeIndex})
    }

    handleMembershipPress = () => {

    }

    render() {
        return (
        <View style={styles.container}>
            <View style={styles.planDetail}>
                <View style={{flex:1}}></View>
                <View style={{flex:4, alignItems:"flex-start"}}>
                    <Text>{this.state.timeIndex === 0 ? "Plan Mensual" : "Plan semi mensual"}</Text>
                    <Text>Disfruta platos y ahorra</Text>
                    <Text>{this.state.timeIndex === 0 ? "Obten 20 platos" : "Obten 10 platos"}</Text>
                    <Text>{this.state.timeIndex === 0 ? "Válido: 2 meses" : "Válido: 4 semanas"}</Text>
                </View>
            </View>
            <View style={styles.timeFiltersContainer}>
            <ButtonGroup
                onPress={this.updateIndex}
                selectedIndex={this.state.timeIndex}
                buttons={this.timeButtons}
                containerStyle={styles.timeFilters}
                selectedButtonStyle={styles.selectedTimeFilter}
                selectedTextStyle={{fontWeight:"bold", color:"black", fontFamily:"meniu"}}
                textStyle={{fontFamily:"meniu"}}
                />
            </View>
            <View style={styles.planList}>
                <ScrollView style={{flex:1}} >
                    <FlatList 
                    style={{flex:1}}
                    // key={(this.state.timeIndex)}
                    numColumns={1}
                    keyExtractor={(item)=>item.name}
                    onPressItem={this.handleMembershipPress}
                    data={this.state.timeIndex === 0 ? MockData.monthMemberships : MockData.twoWeekMemberships}
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
    planDetail:{
        flex:2,
        backgroundColor:Colors.darkBackgroundColor,
        flexDirection:"row",
        justifyContent:"flex-start",
        alignItems:"center",
    },
    timeFiltersContainer:{
        flex:1,
        backgroundColor:Colors.lightBackgroundColor,
    },
    timeFilters: {
        width:"60%",
    },
    selectedTimeFilter:{
        backgroundColor:Colors.yellowMeniu,
    },
    planList:{
        flex:7,
        backgroundColor:Colors.lightBackgroundColor,
    }
    
})

