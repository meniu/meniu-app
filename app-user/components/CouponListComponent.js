import React from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';
import BadgeComponent from './BadgeComponent';

const CouponListComponent = (props) => {
  let coupons = props.coupons;
  let showNumber = props.showNumber;
  let combo = props.combo;
  if (!showNumber) {
    return (
      <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
        <FlatList
          horizontal={true}
          keyExtractor={(item) => (item.coupon.type + item.coupon.id + combo.id)}
          data={coupons}
          renderItem={({ item }) => <BadgeComponent type={item.coupon.type} />}
        />
      </View>
    );
  }
  else {
    return (
      <View style={{ flexDirection: "row", justifyContent: "flex-start"}}>
        <FlatList          
          horizontal={false}
          keyExtractor={(item) => (item.coupon.type + item.coupon.id + combo.id)}
          numColumns = {3}
          data={coupons}
          renderItem={({ item }) => <this.BadgeComponentWithNumber coupon={item} />}
        />
      </View>
    );
  }
}

BadgeComponentWithNumber = (props) => {
  return (
    <View style={{ padding: 2 }}>
      <Text style={[styles.couponBubbleComplete, { backgroundColor: Colors[props.coupon.coupon.type] }]}>
        {` ${props.coupon.foodQuantity} ${props.coupon.coupon.type} `}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  couponBubble: {
    color: Colors.white,
    padding: 2,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  couponBubbleComplete: {
    color: Colors.black,
    padding: 2,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    fontWeight: 'bold'
  }
})


export default CouponListComponent;