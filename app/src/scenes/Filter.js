import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import R from '../R';
import axios from 'axios';
import {BASE_URL} from '../utils/Constants';
import {CDropDown, CTextInput} from '../components';
export const Filter = () => {
  const [countryList, setCountryList] = useState([]);
  const [countryId, setCountryId] = useState('');
  const [stateList, setStateList] = useState([]);
  const [stateId, setStateId] = useState('');
  const [educationList, setEducationList] = useState([]);
  const [educationId, setEducationId] = useState('');
  const [casteId, setCasteId] = useState('');
  const [subCasteId, setSubCasteId] = useState('');

  const [casteList, setCasteList] = useState([]);
  const [subCasteList, setSubCasteList] = useState([]);

  const MARITAL_STATUS_OPTIONS_ARRAY = [
    {id: 1, label: 'Unmarried', value: 'unmarried'},
    {id: 2, label: 'Divorced', value: 'divorced'},
    {id: 3, label: 'Widowed', value: 'widowed'},
  ];

  useEffect(() => {
    getCountryList();
    getEducationList();
    getCasteList();
  }, []);

  const [inputData, setInputData] = useState({
    surname: '',
    firstName: '',
    lastName: '',
    gender: '',
    dateOfBirth: '',
    email: '',
    caste: '',
    subCaste: '',
    maritalStatus: '',
    numberOfChild: '',
    height: '',
    weight: '',
    bloodGroup: '',
    isHandicap: '',
    password: '',
    confirmPassword: '',
    education: '',
    occupation: '',
    monthlyIncome: '',
    fatherName: '',
    fatherOccupation: '',
    fatherMonthlyIncome: '',
    motherName: '',
    motherOccupation: '',
    motherMonthlyIncome: '',
    totalFamilyMembers: '',
    marriedBrothers: '',
    unmarriedBrothers: '',
    marriedSisters: '',
    unmarriedSisters: '',
    contactDetailName: '',
    relationShipCandidate: '',
    contactNumber1: '',
    contactNumber2: '',
    contactEmail: '',
    country: '',
    state: '',
    city: '',
    streetAddress: '',
    fullAddress: '',
  });

  const [inputDataError, setInputDataError] = useState({
    surnameError: false,
    firstNameError: false,
    lastNameError: false,
    genderError: false,
    dateOfBirthError: false,
    emailError: false,
    casteError: false,
    subCasteError: false,
    maritalStatusError: false,
    numberOfChildError: false,
    heightError: false,
    weightError: false,
    bloodGroupError: false,
    isHandicapError: false,
    passwordError: false,
    confirmPasswordError: false,
    educationError: false,
    occupationError: false,
    monthlyIncomeError: false,
    fatherNameError: false,
    fatherOccupationError: false,
    fatherMonthlyIncomeError: false,
    motherNameError: false,
    motherOccupationError: false,
    motherMonthlyIncomeError: false,
    totalFamilyMembersError: false,
    marriedBrothersError: false,
    unmarriedBrothersError: false,
    marriedSistersError: false,
    unmarriedSisteError: false,
    contactDetailNameError: false,
    relationShipCandidateError: false,
    contactNumber1Error: false,
    contactNumber2Error: false,
    contactEmailError: false,
    countryError: false,
    stateError: false,
    cityError: false,
    streetAddressError: false,
    fullAddressError: false,
  });

  const getSubCasteList = (id) => {
    var config = {
      method: 'get',
      url: BASE_URL + `/auth/get-sub-caste/${id}`,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
        setSubCasteList(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleOnChange = (name, value) => {
    setInputData({...inputData, [name]: value});
    setInputDataError({...inputDataError, [`${name}Error`]: false});
  };

  const getCasteList = () => {
    var config = {
      method: 'get',
      url: BASE_URL + '/auth/get-caste',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
        setCasteList(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getStateList = (id) => {
    var config = {
      method: 'get',
      url: BASE_URL + `/auth/get-state/${id}`,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
        setStateList(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getEducationList = () => {
    var config = {
      method: 'get',
      url: BASE_URL + '/auth/get-education',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
        setEducationList(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getCountryList = () => {
    var config = {
      method: 'get',
      url: BASE_URL + '/auth/get-country',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    axios(config)
      .then(function (response) {
        console.log('sss', response.data);
        setCountryList(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <ScrollView style={{padding: 20, marginBottom: 20}}>
      <View style={{marginTop: '5%'}} />
      <View style={styles.dividedView}>
        <Text style={{fontWeight: 'bold', fontSize: R.dimensions.hp(3)}}>
          Filter
        </Text>
      </View>

      <CDropDown
        value={inputData.country}
        data={countryList}
        title={'Country'}
        itemLabel={'name'}
        isCompulsory={true}
        label={'Select Country'}
        onChangeText={(selectedItem, index) => {
          handleOnChange('country', selectedItem.name);
          getStateList(selectedItem.countryId);
          setCountryId(selectedItem.countryId);
        }}
        labelExtractor={({name}) => name}
        valueExtractor={({countryId}) => countryId}
        errorText={'Select Country'}
        showErrorText={inputDataError.countryError}
      />
      <CDropDown
        value={inputData.state}
        data={stateList}
        title={'State'}
        itemLabel={'name'}
        isCompulsory={true}
        label={'Select State'}
        onChangeText={(selectedItem, index) => {
          handleOnChange('state', selectedItem.name);
          //getCityList(selectedItem.stateId);
          setStateId(selectedItem.stateId);
        }}
        labelExtractor={({name}) => name}
        valueExtractor={({stateId}) => stateId}
        errorText={'Select State'}
        showErrorText={inputDataError.stateError}
      />

      <CDropDown
        value={inputData.education}
        data={educationList}
        isCompulsory={true}
        title={'Education'}
        itemLabel={'name'}
        label={'Select Education'}
        onChangeText={(selectedItem, index) => {
          handleOnChange('education', selectedItem.name);
          setEducationId(selectedItem.educationId);
        }}
        labelExtractor={({name}) => name}
        valueExtractor={({educationId}) => educationId}
        errorText={'Select Education'}
        showErrorText={inputDataError.educationError}
      />

      <CDropDown
        value={inputData.caste}
        data={casteList}
        isCompulsory={true}
        itemLabel={'casteName'}
        title={'Caste'}
        label={'Select Caste'}
        onChangeText={(selectedItem, index) => {
          handleOnChange('caste', selectedItem.casteName);
          setCasteId(selectedItem.casteId);
          getSubCasteList(selectedItem.casteId);
        }}
        labelExtractor={({casteName}) => casteName}
        valueExtractor={({casteId}) => casteId}
        errorText={'Select Caste'}
        showErrorText={inputDataError.casteError}
      />

      <CDropDown
        value={inputData.subCaste}
        data={subCasteList}
        title={'Sub Caste'}
        itemLabel={'subCasteName'}
        isCompulsory={true}
        label={'Select Sub Caste'}
        onChangeText={(selectedItem, index) => {
          handleOnChange('subCaste', selectedItem.subCasteName);
          setSubCasteId(selectedItem.subCasteId);
        }}
        labelExtractor={({subCasteName}) => subCasteName}
        valueExtractor={({subCasteId}) => subCasteId}
        errorText={'Select SubCaste'}
        showErrorText={inputDataError.subCasteError}
      />

      <CDropDown
        value={inputData.maritalStatus}
        data={MARITAL_STATUS_OPTIONS_ARRAY}
        title={'Marital Status'}
        itemLabel={'label'}
        isCompulsory={true}
        label={'Select Marital Status'}
        onChangeText={(selectedItem, index) =>
          handleOnChange('maritalStatus', selectedItem.value)
        }
        errorText={'Select Marital Status'}
        showErrorText={inputDataError.maritalStatusError}
      />
      <>
        {!(
          inputData.maritalStatus == 'unmarried' ||
          inputData.maritalStatus == ''
        ) && (
          <CTextInput
            title={'Number of child'}
            value={inputData.numberOfChild}
            placeholder={'Number of child'}
            isCompulsory={true}
            keyboardType={'numeric'}
            onChangeText={(text) => handleOnChange('numberOfChild', text)}
            errorText={'Enter Valid Number Of Childs'}
            showErrorText={inputDataError.numberOfChildError}
          />
        )}
      </>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  dividedView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '5%',
  },
});
