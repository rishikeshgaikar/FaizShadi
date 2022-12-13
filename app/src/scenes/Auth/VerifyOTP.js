import React, {useState} from 'react';
import {StyleSheet, Text, View, ImageBackground} from 'react-native';
import R from '../../R';
import {RootView, CButton, CTextInput} from '../../components';
export const VerifyOTP = ({navigation}) => {
  const [inputDataError, setInputDataError] = useState({
    OtpError: false,
  });

  const [inputData, setInputData] = useState({
    Otp: '',
  });
  const handleOnChange = (name, value) => {
    setInputData({...inputData, [name]: value});
    setInputDataError({...inputDataError, [`${name}Error`]: false});
  };
  return (
    <RootView customStyle={{backgroundColor: R.colors.primaryBrand}}>
      <ImageBackground
        source={R.images.couple}
        resizeMode="cover"
        style={{height: '100%', width: '100%'}}>
        <View style={{backgroundColor: 'rgba(255, 255, 255, 0.6)', flex: 1}}>
          <View
            style={{
              margin: '5%',
              marginTop: '10%',
            }}>
            <Text
              style={{
                fontSize: R.dimensions.hp(3),

                fontWeight: 'bold',
              }}>
              Verification Code
            </Text>

            <Text
              style={{
                fontSize: R.dimensions.hp(2),
              }}>
              Enter Verification Code
            </Text>

            <Text
              style={{
                fontSize: R.dimensions.hp(2.5),
                fontWeight: 'bold',
                alignSelf: 'center',
                paddingTop: '10%',
                color: R.colors.primaryWhite,
              }}>
              Register Yourself
            </Text>
            <View style={{marginTop: '10%'}}>
              <CTextInput
                title={'Enter OTP'}
                placeholder={'Enter OTP'}
                keyboardType={'numeric'}
                onChangeText={(text) => handleOnChange('Otp', text.trim())}
                errorText={'Enter Valid Otp '}
                showErrorText={inputDataError.OtpError}
              />

              <CButton
                title={'Verify OTP'}
                onPress={() => navigation.navigate('RegisterDetail')}
                customStyle={{alignSelf: 'center', marginTop: '30%'}}
              />
            </View>
          </View>
        </View>
      </ImageBackground>
    </RootView>
  );
};

const styles = StyleSheet.create({});
