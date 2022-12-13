import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import {CTextInput, RootView} from '../../../components';
export const CareerRoute = () => (
  <ScrollView style={{flex: 1,backgroundColor: 'lightgrey'}}>
    <View style={{marginTop: '10%'}}></View>
    <CTextInput
      title={'Type of Job'}
      placeholder={'Type of Job'}
      keyboardType={'numeric'}
      onChangeText={(text) => handleOnChange('mobile', text.trim())}
      errorText={'Enter Valid Mobile Number'}
      //  showErrorText={inputDataError.mobileError}
    />

    <CTextInput
      title={'Post / Designation'}
      placeholder={'Post / Designation'}
      keyboardType={'email-address'}
      onChangeText={(text) => handleOnChange('mobile', text.trim())}
      errorText={'Enter Valid Mobile Number'}
      //  showErrorText={inputDataError.mobileError}
    />

    <CTextInput
      title={'Department / Company Name'}
      placeholder={'Department / Company Name'}
      keyboardType={'numeric'}
      onChangeText={(text) => handleOnChange('mobile', text.trim())}
      errorText={'Enter Valid Mobile Number'}
      //  showErrorText={inputDataError.mobileError}
    />

    <CTextInput
      title={'Job Place'}
      placeholder={'Job Place'}
      keyboardType={'numeric'}
      onChangeText={(text) => handleOnChange('mobile', text.trim())}
      errorText={'Enter Valid Mobile Number'}
      //  showErrorText={inputDataError.mobileError}
    />

    <CTextInput
      title={'Montly Income of Candidate'}
      placeholder={'Montly Income of Candidate'}
      keyboardType={'numeric'}
      onChangeText={(text) => handleOnChange('mobile', text.trim())}
      errorText={'Enter Valid Mobile Number'}
      //  showErrorText={inputDataError.mobileError}
    />

    <CTextInput
      title={'Father Monthly Income'}
      placeholder={'Father Monthly Income'}
      keyboardType={'numeric'}
      onChangeText={(text) => handleOnChange('mobile', text.trim())}
      errorText={'Enter Valid Mobile Number'}
      //  showErrorText={inputDataError.mobileError}
    />

    <CTextInput
      title={'Mother Monthly Income'}
      placeholder={'Mother Monthly Income'}
      keyboardType={'numeric'}
      onChangeText={(text) => handleOnChange('mobile', text.trim())}
      errorText={'Enter Valid Mobile Number'}
      //  showErrorText={inputDataError.mobileError}
    />

  </ScrollView>
);
