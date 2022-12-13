import React, { useState, useContext } from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ToastAndroid,
} from 'react-native';
import { CButton, CTextInput, Loader } from '../../components';
import R from '../../R';
import { AuthContext } from '../../context/auth/AuthContext';
import { BASE_URL } from '../../utils/Constants';
export const Login = ({ navigation }) => {
  const { authAction } = useContext(AuthContext);
  const [inputDataError, setInputDataError] = useState({
    emailError: false,
    passwordError: false,
  });

  const [inputData, setInputData] = useState({
    email: '',
    password: '',
  });
  const [showLoader, setShowLoader] = useState(false);

  const handleOnChange = (name, value) => {
    setInputData({ ...inputData, [name]: value });
    setInputDataError({ ...inputDataError, [`${name}Error`]: false });
  };

  const loginAPI = () => {
    var axios = require('axios');

    var config = {
      method: 'post',
      url: BASE_URL + `/auth/login?member_profile_id=${inputData.email}&password=${inputData.password}`,
      headers: {},
    };
    console.log('call started');
    setShowLoader(true)
    axios(config)
      .then(function (response) {
        setShowLoader(false)
        console.log('🚀 ~ file: Login.js ~ line 40 ~ response', response);
        if (response.data.message == 'success!') {
          console.log(
            '🚀 ~ file: Login.js ~ line 42 ~ response.data',
            response.data,
          );
          let userInfo = {
            userToken: response.data.token,
            userObject: response.data.user_data,
          };
          authAction.signIn(userInfo);
        } else {
          ToastAndroid.show(
            'Member ID or password is incorrect',
            ToastAndroid.SHORT,
          );
        }
      })
      .catch(function (error) {
        setShowLoader(false)
        console.log(error);
      });
  };
  return (
    <View style={{ backgroundColor: R.colors.primaryBrand }}>
      <ImageBackground
        source={R.images.couple}
        resizeMode="cover"
        style={{ height: '100%', width: '100%' }}>
        <View style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)', flex: 1 }}>
          <View
            style={{
              margin: '5%',
              marginTop: '10%',
              //backgroundColor: R.colors.primaryBrand,
            }}>
            <Text style={{ fontSize: R.dimensions.hp(5) }}>Let's go in</Text>
            <Text style={{ fontSize: R.dimensions.hp(2) }}>
              Enter your mobile and password
            </Text>
            <View style={{ marginTop: '10%' }}>
              <CTextInput
                title={'Enter Member ID'}
                placeholder={'Enter Member ID'}
                onChangeText={(text) => handleOnChange('email', text.trim())}
                errorText={'Enter Valid Email'}
                showErrorText={inputDataError.emailError}
              />

              <CTextInput
                title={'Enter Password'}
                secureTextEntry={true}
                placeholder={'Enter password'}
                onChangeText={(text) => handleOnChange('password', text.trim())}
                errorText={'Enter Valid password'}
                showErrorText={inputDataError.passwordError}
              />

              <CButton
                title={'LOG IN'}
                onPress={() => loginAPI()}
                customStyle={{ alignSelf: 'center', marginTop: '10%' }}
              />
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: '15%',
              }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('RegisterDetail')}
                style={{
                  backgroundColor: R.colors.primaryBrand,
                  width: '50%',
                  padding: '3%',
                  alignSelf: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{ color: R.colors.primaryWhite, fontWeight: 'bold' }}>
                  Register your Profile
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate('ForgotPassword')}
                style={{
                  backgroundColor: R.colors.primaryBrand,
                  width: '40%',
                  padding: '3%',
                  alignSelf: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{ color: R.colors.primaryWhite, fontWeight: 'bold' }}>
                  Forgot Password
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity>
              <Text
                style={{
                  color: R.colors.primaryBlack,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  marginTop: '10%',
                }}>
                Need Help ? Call +91-9723518311 / +91-7202015946
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Loader isVisible={showLoader} />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({});
