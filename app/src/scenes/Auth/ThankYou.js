import React from 'react';
import {
  ImageBackground,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import R from '../../R';
export const ThankYou = ({ navigation, route }) => {
  console.log('🚀  file: ThankYou.js  line 11  ThankYou  route', route);
  const data = route?.params?.member_profile_id;
  console.log('==============', data);
  return (
    <View style={{ backgroundColor: R.colors.primaryBrand }}>
      <ImageBackground
        source={R.images.couple}
        resizeMode="cover"
        style={{ height: '100%', width: '100%' }}>
        <View
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
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
              color: R.colors.primaryBrand,
              fontWeight: 'bold',
              textAlign: 'center',
              marginTop: '10%',
              fontSize: R.dimensions.hp(4),
            }}>
            Thank you for registration!
          </Text>
          <Text
            style={{
              color: R.colors.secondaryBrand,
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: R.dimensions.hp(2.2),
              marginTop: '10%',
            }}>
            Your Profile Id : {route?.params?.response?.data?.member_profile_id}
          </Text>
          <Text
            style={{
              color: R.colors.secondaryBrand,
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: R.dimensions.hp(2.2),
              marginTop: '10%',
            }}>
            Please Wait for Admin to approve your profile.
          </Text>
          <Text
            style={{
              color: R.colors.secondaryBrand,
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: R.dimensions.hp(2.2),
            }}>
            Need Help ?
          </Text>
          <Text
            style={{
              color: R.colors.secondaryBrand,
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: R.dimensions.hp(2.2),
            }}>
            {' '}
            Call +91-9723518311 / +91-7202015946
          </Text>

          <TouchableOpacity
            onPress={() => navigation.push('Login')}
            style={{
              backgroundColor: R.colors.primaryBrand,
              width: '40%',
              padding: '3%',
              alignSelf: 'center',
              alignItems: 'center',
              marginTop: '10%',
            }}>
            <Text
              style={{
                color: R.colors.primaryWhite,
                fontWeight: 'bold',
                fontSize: 16,
              }}>
              Back to Login
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};
