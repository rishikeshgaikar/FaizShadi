import React from 'react';
import { View, SafeAreaView, Platform, StyleSheet } from 'react-native';
//local imports
import R from '../R';

export const RootView = (props) => {
  return Platform.OS == 'android' ? (
    <View style={[styles.rootView, props.customStyle]}>
      <View style={styles.triangleCorner} />
      {props.children}
    </View>
  ) : (
    <SafeAreaView style={[styles.rootView, props.customStyle]}>
      {props.children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  rootView: {
    flex: 1,
    // backgroundColor: R.colors.primaryWhite,
  },
  triangleCorner: {
    position: 'absolute',
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderRightWidth: 40,
    borderTopWidth: 40,
    borderRightColor: 'transparent',
    borderTopColor: R.colors.primaryBrand,
    zIndex: +1,
  },
});
