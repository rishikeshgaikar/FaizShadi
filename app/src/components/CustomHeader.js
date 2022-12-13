import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
//local imports
import R from '../R';

export const CustomHeader = (props) => {
  return (
    <View style={styles.mainView}>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
      }}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => props.navigation.dispatch(DrawerActions.openDrawer())}>
          <FeatherIcon
            name={'menu'}
            size={R.dimensions.wp(6)}
            color={R.colors.primaryWhite}></FeatherIcon>
        </TouchableOpacity>
        <Text style={styles.heading}>{props.title}</Text>
      </View>
      <View style={{ alignItems: 'flex-end' }}>
        {props.showEdit && <TouchableOpacity onPress={() => props.navigation.navigate("EditProfile")}>
          <Text style={styles.heading}>Edit</Text>
        </TouchableOpacity>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flexDirection: 'row',
    backgroundColor: R.colors.primaryBrand,
    paddingHorizontal: R.dimensions.wp(3),
    height: R.dimensions.hp('3%') + StatusBar.currentHeight,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heading: {
    fontSize: R.dimensions.wp(5),
    fontWeight: '800',
    marginLeft: '10%',
    color: R.colors.primaryWhite,
  },
});
