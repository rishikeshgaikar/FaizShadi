import React, { useState, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ToastAndroid,
} from 'react-native';
import R from '../R';
import { RootView, CButton, CTextInput, Loader } from '../components';
//import ABC from '../../../CustomModule';

import { AuthContext } from '../context/auth/AuthContext';
import { BASE_URL } from '../utils/Constants';
export const ChangePassword = ({ navigation }) => {
  const [inputDataError, setInputDataError] = useState({
    newPassword: false,
    currentPassword: false,
  });

  const [showLoader, setShowLoader] = useState(false);

  const { authState } = useContext(AuthContext);
  const { authAction } = useContext(AuthContext);
  const [inputData, setInputData] = useState({
    currentPassword: '',
    newPassword: '',
  });
  const handleOnChange = (name, value) => {
    setInputData({ ...inputData, [name]: value });
    setInputDataError({ ...inputDataError, [`${name}Error`]: false });
  };

  const changePasswordApi = () => {
    console.log(authState.userToken);
    var axios = require('axios');
    var FormData = require('form-data');
    var data = new FormData();
    data.append('current_password', inputData.currentPassword);
    data.append('new_password', inputData.newPassword);

    var config = {
      method: 'post',
      url: BASE_URL + '/api/change-password',
      headers: {
        Authorization: authState.userToken,
        // ...data.getHeaders(),
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));

        if (response.data.status == 'success') {
          // ToastAndroid.show('Your password has been changed successfully');
          ToastAndroid.show(
            'Your password has been changed successfully',
            ToastAndroid.LONG,
          );
          return;
        } else {
          //  ToastAndroid.show('Something went wrong');
          ToastAndroid.show('Something went wrong', ToastAndroid.LONG);
          return;
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <RootView style={{ backgroundColor: R.colors.primaryBrand }}>
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
              Change Password
            </Text>

            <View style={{ marginTop: '5%' }}>
              <CTextInput
                title={'Enter current Password'}
                placeholder={'Enter current Password'}
                onChangeText={(text) =>
                  handleOnChange('currentPassword', text.trim())
                }
                errorText={'Enter Valid Mobile number '}
                showErrorText={inputDataError.numberError}
              />
              <View style={{ marginTop: '5%' }}></View>
              <CTextInput
                title={'Enter new Password'}
                placeholder={'Enter new Password'}
                onChangeText={(text) =>
                  handleOnChange('newPassword', text.trim())
                }
                errorText={'Enter Valid Mobile number '}
                showErrorText={inputDataError.numberError}
              />

              <CButton
                title={'Update Password'}
                onPress={() => changePasswordApi()}
                customStyle={{ alignSelf: 'center', marginTop: '5%' }}
              />
            </View>
          </View>
        </View>
      </ImageBackground>
    </RootView>
  );
};

const styles = StyleSheet.create({});
