import React, { useContext } from 'react';
import { StyleSheet, Image, View, Text } from 'react-native';
import { AuthContext } from '../context/auth/AuthContext';
import R from "../R"

export const MyAccount = () => {
  const { authState } = useContext(AuthContext);
  console.log("🚀 ~ file: MyAccount.js ~ line 8 ~ MyAccount ~ authState", authState)
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <Image
        resizeMode={'contain'}
        source={R.images.goldMembership}
        style={{ width: "100%", height: '40%' }}
      />
      <Text style={{
        marginTop: "5%",
        fontSize: R.dimensions.hp(3.5),
        fontWeight: 'bold'
      }}>Gold Plan</Text>
      {/* <Text style={{
        marginTop: "5%",
        fontSize: R.dimensions.hp(3),
        fontWeight: 'bold'
      }}>₹{authState?.userObject?.gender === "male" ? 1000 : 500}</Text> */}
    </View>
  );
};
const styles = StyleSheet.create({});
