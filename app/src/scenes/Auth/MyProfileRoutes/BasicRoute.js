import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import {CTextInput, RootView} from '../../../components';
export const BasicRoute = () => (
  <ScrollView style={{flex: 1, backgroundColor: 'lightgrey'}}>
    <View style={{marginTop: '10%'}}></View>
    <CTextInput
      title={'Age'}
      placeholder={'Enter Age'}
      keyboardType={'numeric'}
      onChangeText={(text) => handleOnChange('mobile', text.trim())}
      errorText={'Enter Valid Mobile Number'}
      //  showErrorText={inputDataError.mobileError}
    />

    <CTextInput
      title={'Marrital Status'}
      placeholder={'Enter Marrital Status'}
      keyboardType={'email-address'}
      onChangeText={(text) => handleOnChange('mobile', text.trim())}
      errorText={'Enter Valid Mobile Number'}
      //  showErrorText={inputDataError.mobileError}
    />

    <CTextInput
      title={'Height'}
      placeholder={'Enter Height'}
      keyboardType={'numeric'}
      onChangeText={(text) => handleOnChange('mobile', text.trim())}
      errorText={'Enter Valid Mobile Number'}
      //  showErrorText={inputDataError.mobileError}
    />

    <CTextInput
      title={'Weight'}
      placeholder={'Enter Weight'}
      keyboardType={'numeric'}
      onChangeText={(text) => handleOnChange('mobile', text.trim())}
      errorText={'Enter Valid Mobile Number'}
      //  showErrorText={inputDataError.mobileError}
    />

    <CTextInput
      title={'Blood Group'}
      placeholder={'Enter Blood Group'}
      keyboardType={'email-address'}
      onChangeText={(text) => handleOnChange('mobile', text.trim())}
      errorText={'Enter Valid Mobile Number'}
      //  showErrorText={inputDataError.mobileError}
    />

    <CTextInput
      title={'Educational Qualification'}
      placeholder={'Enter Educational Qualification'}
      keyboardType={'email-address'}
      onChangeText={(text) => handleOnChange('mobile', text.trim())}
      errorText={'Enter Valid Mobile Number'}
      //  showErrorText={inputDataError.mobileError}
    />

    <CTextInput
      title={'Is Handicapped ?'}
      placeholder={'Enter Yes / No'}
      keyboardType={'email-address'}
      onChangeText={(text) => handleOnChange('mobile', text.trim())}
      errorText={'Enter Valid Mobile Number'}
      //  showErrorText={inputDataError.mobileError}
    />

    <CTextInput
      title={'Country'}
      placeholder={'Enter Country'}
      keyboardType={'email-address'}
      onChangeText={(text) => handleOnChange('mobile', text.trim())}
      errorText={'Enter Valid Mobile Number'}
      //  showErrorText={inputDataError.mobileError}
    />

    <CTextInput
      title={'State'}
      placeholder={'Enter State'}
      keyboardType={'email-address'}
      onChangeText={(text) => handleOnChange('mobile', text.trim())}
      errorText={'Enter Valid Mobile Number'}
      //  showErrorText={inputDataError.mobileError}
    />
  </ScrollView>
);
