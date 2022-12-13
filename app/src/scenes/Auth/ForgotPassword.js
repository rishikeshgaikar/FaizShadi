import React, { useState, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Alert,
  ToastAndroid,
} from 'react-native';
import R from '../../R';
//import ABC from '../../../../CustomModule';
import { RootView, CButton, CTextInput, Loader } from '../../components';

import { AuthContext } from '../../context/auth/AuthContext';
import { BASE_URL } from '../../utils/Constants';
export const ForgotPassword = ({ navigation }) => {
  const [inputDataError, setInputDataError] = useState({
    numberError: false,
  });

  const [showLoader, setShowLoader] = useState(false);

  const { authAction } = useContext(AuthContext);
  const [inputData, setInputData] = useState({
    number: '',
  });
  const handleOnChange = (name, value) => {
    setInputData({ ...inputData, [name]: value });
    setInputDataError({ ...inputDataError, [`${name}Error`]: false });
  };

  const forgotPasswordApi = () => {
    setShowLoader(true);
    var axios = require('axios');
    var FormData = require('form-data');
    var data = new FormData();
    data.append('mobile_number', inputData.number);

    var config = {
      method: 'post',
      url: BASE_URL + '/auth/forgot-password',
      data: data,
    };

    axios(config)
      .then(function (response) {
        setShowLoader(false);
        console.log(JSON.stringify(response.data));
        if (response.data.status == 'success') {
          Alert.alert(
            'Faiz Marriage Bureau',
            'Password has been send to mobile number',
            [
              {
                text: 'OK',
                onPress: () => navigation.navigate('Login'),
                style: 'ok',
              },
            ],
          );

          return;
        } else {
          //ToastAndroid.show('Profile Not Found!');
          setShowLoader(false);

          ToastAndroid.show('Profile Not Found !', ToastAndroid.SHORT);

          // ToastAndroid.showWithGravityAndOffset(
          //   'Removed from favorite',
          //   ToastAndroid.SHORT,
          //   ToastAndroid.CENTER,
          // );
          return;
        }
      })
      .catch(function (error) {
        setShowLoader(false);
        console.log(error);
      });
  };

  return (
    <View style={{ backgroundColor: R.colors.primaryBrand }}>
      <ImageBackground
        source={R.images.couple}
        resizeMode="cover"
        style={{ height: '100%', width: '100%' }}>
        <Loader isVisible={showLoader} />

        <View style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)', flex: 1 }}>
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
              Mobile Verification
            </Text>

            <Text
              style={{
                fontSize: R.dimensions.hp(2),
              }}>
              Enter your Mobile number
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
            <View style={{ marginTop: '10%' }}>
              <CTextInput
                title={'Enter Mobile number'}
                placeholder={'Enter Mobile number'}
                keyboardType={'numeric'}
                maxLength={10}
                onChangeText={(text) => handleOnChange('number', text.trim())}
                errorText={'Enter Valid Mobile number '}
                showErrorText={inputDataError.numberError}
              />

              <CButton
                title={'Verify Mobile number'}
                onPress={() => forgotPasswordApi()}
                customStyle={{ alignSelf: 'center', marginTop: '30%' }}
              />
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({});
