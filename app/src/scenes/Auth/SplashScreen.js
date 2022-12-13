import React from 'react';
import { View, Text, ImageBackground, Image } from 'react-native';
//local imports
import R from '../../R';

export const SplashScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightcyan',
      }}>
      <ImageBackground
        source={R.images.couple}
        resizeMode="cover"
        style={{ height: '100%', width: '100%' }}>
        <View
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={R.images.appLogo}
            style={{ height: R.dimensions.hp(10), width: R.dimensions.hp(10) }}
          />
          <Text
            style={{
              fontSize: R.dimensions.hp(5),
              textAlign: 'center',
              fontWeight: '900', color: R.colors.primaryWhite
            }}>
            {"Faiz\nMarriage Bureau"}
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
};
