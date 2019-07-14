import React from 'react';
import { View, FlatList, Text, StyleSheet} from 'react-native';
import Colors from '../constants/Colors';
import BadgeComponent from './BadgeComponent';

const CouponListComponent = (props) => {
    let coupons = props.coupons;
    let manyPromotions = coupons.length > 1;
    let combo = props.combo;
    if(manyPromotions) {
      return (
      <View style={{flexDirection:"row", justifyContent:"flex-start"}}>
        <FlatList
          horizontal={true}
          keyExtractor={(item)=>(item.coupon.type & item.coupon.id & combo.id)}
          data={coupons}
          renderItem={({item}) => <BadgeComponent type={item.coupon.type}/>}
        />
      </View>
      );
    }
    else {
      let coupon = coupons[0];
      return (
      <View style={{flexDirection:"row", justifyContent:"flex-start", alignItems:"center"}}>
        <BadgeComponent type={coupon.coupon.type} color={Colors.backgroundColor} 
        />
        <Text style={[styles.couponBubble, {backgroundColor:Colors[coupon.coupon.type]}]}>
          {`${coupon.foodQuantity} ${coupon.coupon.type}`}
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