import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  ToastAndroid,
} from 'react-native';
import R from '../../R';
import {RootView, CButton, CTextInput} from '../../components';
export const Register = ({navigation}) => {
  const [inputDataError, setInputDataError] = useState({
    mobileError: false,
    passwordError: false,
  });

  const [inputData, setInputData] = useState({
    mobile: '',
    password: '',
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
                fontSize: R.dimensions.hp(2.5),
                textAlign: 'center',
                fontWeight: 'bold',
              }}>
              Ready to meet your future soul mate?
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
                title={'Enter Mobile Number'}
                placeholder={'Enter mobile number'}
                keyboardType={'numeric'}
                maxLength={10}
                onChangeText={(text) => handleOnChange('mobile', text.trim())}
                errorText={'Enter Valid Mobile Number'}
                showErrorText={inputDataError.mobileError}
              />

              <CButton
                title={'Register your Profile'}
                //onPress={() => navigation.navigate('VerifyOTP')}
                onPress={() => navigation.navigate('RegisterDetail')}
                customStyle={{alignSelf: 'center', marginTop: '30%'}}
              />
            </View>

            <TouchableOpacity
              style={{marginTop: '40%'}}
              onPress={() => navigation.navigate('Login')}>
              <Text
                style={{
                  color: R.colors.primaryBlack,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  fontSize: R.dimensions.hp(2),
                }}>
                Already have an account? Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </RootView>
  );
};

const styles = StyleSheet.create({});
