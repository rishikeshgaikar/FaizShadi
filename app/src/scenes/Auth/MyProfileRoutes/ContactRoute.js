import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import {CTextInput, RootView} from '../../../components';

export const ContactRoute = () => (
  <ScrollView style={{flex: 1, backgroundColor: 'lightgrey'}}>
    <View style={{marginTop: '10%'}}></View>
    <CTextInput
      title={'Look / Nature / Height'}
      placeholder={'Look / Nature / Height'}
      keyboardType={'email-address'}
      onChangeText={(text) => handleOnChange('mobile', text.trim())}
      errorText={'Enter Valid Mobile Number'}
      //  showErrorText={inputDataError.mobileError}
    />

    <CTextInput
      title={'Education of your choice candidate'}
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
