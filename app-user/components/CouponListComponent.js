import React from 'react';
import { View, FlatList, Text, StyleSheet} from 'react-native';
import Colors from '../constants/Colors';
import BadgeComponent from './BadgeComponent';

const CouponListComponent = (props) => {
    let coupons = props.coupons;
    let manyPromotions = coupons.length > 1;
    if(manyPromotions) {
      return (
      <View style={{flexDirection:"row", justifyContent:"flex-start"}}>
        <FlatList
          horizontal={true}
          keyExtractor={(item)=>item.type}
          data={coupons}
          renderItem={({item}) => <BadgeComponent type={item.type}/>}
        />
      </View>
      );
    }
    else {
      let coupon = coupons[0];
      return (
      <View style={{flexDirection:"row", justifyContent:"flex-start", alignItems:"center"}}>
        <BadgeComponent type={coupon.type} color={Colors.backgroundColor} 
        />
        <Text style={[styles.couponBubble, {backgroundColor:Colors[coupon.type]}]}>
          {`${coupon.quantity} ${coupon.type}`}
          </Text>
      </View>
      );
    }
}

const styles = StyleSheet.create({
    couponBubble: {
        color:Colors.white,
        padding:2,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
    }
})


export default CouponListComponent;