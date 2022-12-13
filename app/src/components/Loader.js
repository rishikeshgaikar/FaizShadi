import React from 'react';
import {View, Text, Modal, ActivityIndicator} from 'react-native';
//local imports
import R from '../R';

export const Loader = (props) => {
  return (
    <Modal visible={props.isVisible} animationType="fade" transparent={true}>
      <View
        style={{
          flex: 1,
          backgroundColor: R.colors.loaderModalBlack,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            backgroundColor: R.colors.primaryWhite,
            padding: '5%',
            borderRadius: 8,
            width: R.dimensions.wp('80%'),
            alignItems: 'center',
          }}>
          <ActivityIndicator size={'large'} color={R.colors.primaryBrand} />
          <Text
            style={{
              marginTop: '5%',
              fontSize: R.dimensions.hp('2%'),
              fontFamily: R.fonts.PoppinsRegular,
              textAlign: 'center',
            }}>
            Loading...
          </Text>
        </View>
      </View>
    </Modal>
  );
};
