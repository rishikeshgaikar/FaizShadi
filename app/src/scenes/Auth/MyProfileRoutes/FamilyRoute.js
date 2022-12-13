import React from 'react';
import {View, Text,ScrollView} from 'react-native';
import { CTextInput, RootView } from '../../../components';

export const FamilyRoute = () => (
  <ScrollView style={{flex: 1,backgroundColor: 'lightgrey'}}>
  <View style={{marginTop: '10%'}}></View>
  <CTextInput
    title={'Father Name'}
    placeholder={'Father Name'}
    keyboardType={'numeric'}
    onChangeText={(text) => handleOnChange('mobile', text.trim())}
    errorText={'Enter Valid Mobile Number'}
    //  showErrorText={inputDataError.mobileError}
  />

  <CTextInput
    title={'Fathers Occupation'}
    placeholder={'Fathers Occupation'}
    keyboardType={'email-address'}
    onChangeText={(text) => handleOnChange('mobile', text.trim())}
    errorText={'Enter Valid Mobile Number'}
    //  showErrorText={inputDataError.mobileError}
  />

<CTextInput
    title={'Mother Name'}
    placeholder={'Mother Name'}
    keyboardType={'numeric'}
    onChangeText={(text) => handleOnChange('mobile', text.trim())}
    errorText={'Enter Valid Mobile Number'}
    //  showErrorText={inputDataError.mobileError}
  />

<CTextInput
    title={'Mothers Occupation'}
    placeholder={'Occupation'}
    keyboardType={'email-address'}
    onChangeText={(text) => handleOnChange('mobile', text.trim())}
    errorText={'Enter Valid Mobile Number'}
    //  showErrorText={inputDataError.mobileError}
  />

  <CTextInput
    title={'Total Family Members'}
    placeholder={'Total Family Members'}
    keyboardType={'numeric'}
    onChangeText={(text) => handleOnChange('mobile', text.trim())}
    errorText={'Enter Valid Mobile Number'}
    //  showErrorText={inputDataError.mobileError}
  />

<CTextInput
    title={'Married Brothers'}
    placeholder={'Married Brothers'}
    keyboardType={'numeric'}
    onChangeText={(text) => handleOnChange('mobile', text.trim())}
    errorText={'Enter Valid Mobile Number'}
    //  showErrorText={inputDataError.mobileError}
  />

<CTextInput
    title={'Unmarried Brothers'}
    placeholder={'Unmarried Brothers'}
    keyboardType={'numeric'}
    onChangeText={(text) => handleOnChange('mobile', text.trim())}
    errorText={'Enter Valid Mobile Number'}
    //  showErrorText={inputDataError.mobileError}
  />

<CTextInput
    title={'Married Sisters'}
    placeholder={'Married Sisters'}
    keyboardType={'numeric'}
    onChangeText={(text) => handleOnChange('mobile', text.trim())}
    errorText={'Enter Valid Mobile Number'}
    //  showErrorText={inputDataError.mobileError}
  />


<CTextInput
    title={'Additional Family Information'}
    placeholder={'Additional Family Information'}
    keyboardType={'numeric'}
    onChangeText={(text) => handleOnChange('mobile', text.trim())}
    errorText={'Enter Valid Mobile Number'}
    //  showErrorText={inputDataError.mobileError}
  />


  <CTextInput
    title={'Total Family Members'}
    placeholder={'Total Family Members'}
    keyboardType={'numeric'}
    onChangeText={(text) => handleOnChange('mobile', text.trim())}
    errorText={'Enter Valid Mobile Number'}
    //  showErrorText={inputDataError.mobileError}
  />

  <CTextInput
    title={'Married Brothers'}
    placeholder={'Married Brothers'}
    keyboardType={'numeric'}
    onChangeText={(text) => handleOnChange('mobile', text.trim())}
    errorText={'Enter Valid Mobile Number'}
    //  showErrorText={inputDataError.mobileError}
  />

<CTextInput
    title={'Unmarried Brothers'}
    placeholder={'Unmarried Brothers'}
    keyboardType={'numeric'}
    onChangeText={(text) => handleOnChange('mobile', text.trim())}
    errorText={'Enter Valid Mobile Number'}
    //  showErrorText={inputDataError.mobileError}
  />


  <CTextInput
  
    title={'Hometown / Native'}
    placeholder={'Enter Hometown'}
    keyboardType={'email-address'}
    onChangeText={(text) => handleOnChange('mobile', text.trim())}
    errorText={'Enter Valid Mobile Number'}
    //  showErrorText={inputDataError.mobileError}
  />

  <CTextInput
    title={'Paraganu'}
    placeholder={'Paraganu'}
    keyboardType={'email-address'}
    onChangeText={(text) => handleOnChange('mobile', text.trim())}
    errorText={'Enter Valid Mobile Number'}
    //  showErrorText={inputDataError.mobileError}
  />

  <CTextInput
    title={'District'}
    placeholder={'Enter District'}
    keyboardType={'email-address'}
    onChangeText={(text) => handleOnChange('mobile', text.trim())}
    errorText={'Enter Valid Mobile Number'}
    //  showErrorText={inputDataError.mobileError}
  />

  <CTextInput
    title={'Taluka'}
    placeholder={'Enter Taluka'}
    keyboardType={'email-address'}
    onChangeText={(text) => handleOnChange('mobile', text.trim())}
    errorText={'Enter Valid Mobile Number'}
    //  showErrorText={inputDataError.mobileError}
  />

<CTextInput
    title={'Current Resident City'}
    placeholder={'Enter Current Resident City'}
    keyboardType={'email-address'}
    onChangeText={(text) => handleOnChange('mobile', text.trim())}
    errorText={'Enter Valid Mobile Number'}
    //  showErrorText={inputDataError.mobileError}
  />

<CTextInput
    title={'Current District'}
    placeholder={'Enter District'}
    keyboardType={'email-address'}
    onChangeText={(text) => handleOnChange('mobile', text.trim())}
    errorText={'Enter Valid Mobile Number'}
    //  showErrorText={inputDataError.mobileError}
  />

<CTextInput
    title={'Candidates Mosal'}
    placeholder={'Enter Mosal'}
    keyboardType={'email-address'}
    onChangeText={(text) => handleOnChange('mobile', text.trim())}
    errorText={'Enter Valid Mobile Number'}
    //  showErrorText={inputDataError.mobileError}
  />

<CTextInput
    title={'Fathers Mosal'}
    placeholder={'Enter Mosal'}
    keyboardType={'email-address'}
    onChangeText={(text) => handleOnChange('mobile', text.trim())}
    errorText={'Enter Valid Mobile Number'}
    //  showErrorText={inputDataError.mobileError}
  />

<CTextInput
    title={'Mothers Mosal'}
    placeholder={'Enter Mosal'}
    keyboardType={'email-address'}
    onChangeText={(text) => handleOnChange('mobile', text.trim())}
    errorText={'Enter Valid Mobile Number'}
    //  showErrorText={inputDataError.mobileError}
  />



</ScrollView>
);
