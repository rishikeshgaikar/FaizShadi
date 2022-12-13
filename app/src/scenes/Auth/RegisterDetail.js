import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  ToastAndroid,
} from 'react-native';
import CheckBox from 'react-native-check-box';
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';
import FormData from 'form-data';
//import ABC from '../../../../CustomModule';
//local imports
import R from '../../R';
import { CButton, CTextInput, Loader } from '../../components';
import CDropDown from '../../components/CDropDown';
import { BASE_URL, EMAIL_REGEX_PATTERN } from '../../utils/Constants';
import { CDatePicker } from '../../components/CDatePicker';

const GENDER_OPTIONS_ARRAY = [
  { id: 1, label: 'Male', value: 'male' },
  { id: 2, label: 'Female', value: 'female' },
];
const MARITAL_STATUS_OPTIONS_ARRAY = [
  { id: 1, label: 'Unmarried', value: 'unmarried' },
  { id: 2, label: 'Divorced', value: 'divorced' },
  { id: 3, label: 'Widowed', value: 'widowed' },
];
const HANDICAP_OPTIONS_ARRAY = [
  { id: 1, label: 'Yes', value: 'yes' },
  { id: 2, label: 'No', value: 'no' },
];
const INITIAL_SECTION = 'initialSection';
const BASIC_INFORMATION_SECTION = 'basicInformationSection';
const CAREER_INFORMATION_SECTION = 'careerInformationSection';
const CONTACT_INFORMATION_SECTION = 'contactInformationSection';
const FAMILY_INFORMATION_SECTION = 'familyInformationSection';
const IMAGE_INFORMATION_SECTION = 'imagesInformationSection';

export const RegisterDetail = ({ navigation }) => {
  const [isChecked, setisChecked] = useState(false);

  const [showLoader, setShowLoader] = useState(false);

  const [showSection, setShowSection] = useState({
    initialSection: true,
    basicInformationSection: false,
    careerInformationSection: false,
    familyInformationSection: false,
    contactInformationSection: false,
    imagesInformationSection: false,
  });

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

  const [casteId, setCasteId] = useState('');
  const [subCasteId, setSubCasteId] = useState('');
  const [countryId, setCountryId] = useState('');
  const [stateId, setStateId] = useState('');
  const [cityId, setCityId] = useState('');
  const [educationId, setEducationId] = useState('');

  const [profileImage, setProfileImage] = useState({ data: null, mime: null });
  const [addressImage, setAddressImage] = useState({ data: null, mime: null });
  const [birthProof, setBirthProof] = useState({ data: null, mime: null });
  const [galleryImage1, setGalleryImage1] = useState({ data: null, mime: null });
  const [galleryImage2, setGalleryImage2] = useState({ data: null, mime: null });
  const [galleryImage3, setGalleryImage3] = useState({ data: null, mime: null });

  const [finalValidation, setFinalValidation] = useState({
    basicInformationSectionCompleted: false,
    careerInformationSection: false,
    familyInformationSectionCompleted: false,
    contactInformationSectionCompleted: false,
    galleryImageInformationSectionCompleted: false,
  });

  const [casteList, setCasteList] = useState([]);
  const [subCasteList, setSubCasteList] = useState([]);
  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [educationList, setEducationList] = useState([]);

  useEffect(() => {
    getCasteList();
    getCountryList();
    getEducationList();
  }, []);

  const handleOnChange = (name, value) => {
    setInputData({ ...inputData, [name]: value });
    setInputDataError({ ...inputDataError, [`${name}Error`]: false });
  };

  const handleSection = (section) => {
    switch (section) {
      case INITIAL_SECTION:
        setShowSection({
          initialSection: true,
          basicInformationSection: false,
          careerInformationSection: false,
          familyInformationSection: false,
          contactInformationSection: false,
          imagesInformationSection: false,
        });
        break;
      case BASIC_INFORMATION_SECTION:
        setShowSection({
          initialSection: false,
          basicInformationSection: true,
          careerInformationSection: false,
          familyInformationSection: false,
          contactInformationSection: false,
          imagesInformationSection: false,
        });
        break;
      case FAMILY_INFORMATION_SECTION:
        setShowSection({
          initialSection: false,
          basicInformationSection: false,
          careerInformationSection: false,
          familyInformationSection: true,
          contactInformationSection: false,
          imagesInformationSection: false,
        });
        break;
      case CAREER_INFORMATION_SECTION:
        setShowSection({
          initialSection: false,
          basicInformationSection: false,
          careerInformationSection: true,
          familyInformationSection: false,
          contactInformationSection: false,
          imagesInformationSection: false,
        });
        break;
      case CONTACT_INFORMATION_SECTION:
        setShowSection({
          initialSection: false,
          basicInformationSection: false,
          careerInformationSection: false,
          familyInformationSection: false,
          contactInformationSection: true,
          imagesInformationSection: false,
        });
        break;
      case IMAGE_INFORMATION_SECTION:
        setShowSection({
          initialSection: false,
          basicInformationSection: false,
          careerInformationSection: false,
          familyInformationSection: false,
          contactInformationSection: false,
          imagesInformationSection: true,
        });
        break;
      default:
        setShowSection({
          initialSection: true,
          basicInformationSection: false,
          careerInformationSection: false,
          familyInformationSection: false,
          contactInformationSection: false,
          imagesInformationSection: false,
        });
        break;
    }
  };

  const RegistrationApiCall = () => {
    var data = new FormData();
    data.append('surname', inputData.surname);
    data.append('first_name', inputData.firstName);
    data.append('last_name', inputData.lastName);
    data.append('gender', inputData.gender);
    data.append('date_of_birth', inputData.dateOfBirth);
    data.append('email', inputData.email);
    data.append('caste', casteId);
    data.append('sub_caste', subCasteId);
    data.append('marital_status', inputData.maritalStatus);
    data.append('no_of_child', inputData.numberOfChild);
    data.append('height', inputData.height);
    data.append('weight', inputData.weight);
    data.append('blood_group', inputData.bloodGroup);
    data.append('physically_handicapped', inputData.isHandicap);
    data.append('password', inputData.password);

    data.append('education', educationId);
    data.append('occupation', inputData.occupation);
    data.append('monthly_income', inputData.monthlyIncome);

    data.append('father_name', inputData.fatherName);
    data.append('father_occupation', inputData.fatherOccupation);
    data.append('father_monthly_income', inputData.fatherMonthlyIncome);
    data.append('mother_name', inputData.motherName);
    data.append('mother_occupation', inputData.motherOccupation);
    data.append('mother_monthly_income', inputData.motherMonthlyIncome);
    data.append('total_family_members', inputData.totalFamilyMembers);
    data.append('married_brother', inputData.marriedBrothers);
    data.append('unmarried_brother', inputData.unmarriedBrothers);
    data.append('married_sister', inputData.marriedSisters);
    data.append('unmarried_sister', inputData.unmarriedSisters);

    data.append('country', countryId);
    data.append('state', stateId);
    data.append('city', cityId);
    data.append('street_address', inputData.streetAddress);
    data.append('full_address', inputData.fullAddress);
    data.append('contact_detail_name', inputData.contactDetailName);
    data.append('relationship_with_candidate', inputData.relationShipCandidate);
    data.append('contact_number_1', inputData.contactNumber1);
    data.append('contact_number_2', inputData.contactNumber2);
    data.append('contact_email', inputData.contactDetailName);
    data.append(
      'partner_expectation',
      'Need a partner with atleast completed graduation',
    );

    data.append('profile_image', profileImage?.data);
    data.append('profile_image_mime', profileImage?.mime);
    data.append('gallary_image1', galleryImage1?.data);
    data.append('gallary_image1_mime', galleryImage1?.mime);
    data.append('gallary_image2', galleryImage2?.data);
    data.append('gallary_image2_mime', galleryImage2?.mime);
    data.append('gallary_image3', galleryImage3?.data);
    data.append('gallary_image3_mime', galleryImage3?.mime);
    data.append('address_proof', addressImage?.data);
    data.append('address_proof_mime', addressImage?.mime);
    data.append('birth_proof', birthProof?.data);
    data.append('birth_proof_mime', birthProof?.mime);
    console.log(
      '🚀 ~ file: RegisterDetail.js ~ line 312 ~ RegistrationApiCall ~ data',
      data,
    );

    var config = {
      method: 'post',
      url: BASE_URL + '/auth/register',
      data: data,
    };
    setShowLoader(true);
    axios(config).then(function (response) {
      setShowLoader(false);
      console.log(JSON.stringify(response.data));
      if (response.data.status != 'error') {
        console.log('APi call Done=====>>>', response);
        navigation.reset({
          index: 0,
          routes: [
            {
              name: 'ThankYou',
              params: { response: response },
            },
          ],
        });
      } else {
        setShowLoader(false);
        alert(response.data.message);
      }
    }).catch((e) => {
      setShowLoader(false);
      alert("Something went wrong");
    })
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
        console.log(response.data);
        setCountryList(response.data);
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
  const getCityList = (id) => {
    var config = {
      method: 'get',
      url: BASE_URL + `/auth/get-city/${id}`,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
        setCityList(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
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

  const imageProfilePicker = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
    }).then((image) => {
      setProfileImage(image);
    });
  };

  const imageAddressPicker = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
    }).then((image) => {
      setAddressImage(image);
    });
  };

  const imageBirthPicker = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
    }).then((image) => {
      setBirthProof(image);
    });
  };

  const imageGalleryPicker1 = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
    }).then((image) => {
      setGalleryImage1(image);
    });
  };
  const imageGalleryPicker2 = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
    }).then((image) => {
      setGalleryImage2(image);
    });
  };
  const imageGalleryPicker3 = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
    }).then((image) => {
      setGalleryImage3(image);
    });
  };

  const DetailsTab = (props) => {
    return (
      <TouchableOpacity
        style={{
          backgroundColor: R.colors.primaryWhite,
          margin: '5%',
          marginTop: 20,
          alignItems: 'center',
          justifyContent: 'space-between',
          borderRadius: 8,
          flexDirection: 'row',
          width: '90%',
          height: 70,
        }}
        onPress={props.onPress}>
        <View
          style={{
            width: '20%',
            height: '100%',
            backgroundColor: props.isCompleted
              ? R.colors.secondaryBrand
              : R.colors.primaryBrand,
            justifyContent: 'center',
          }}>
          <Image
            resizeMode={'contain'}
            source={props.image}
            style={{
              height: 30,
              width: 30,
              alignSelf: 'center',
              tintColor: props.isCompleted ? '#fff' : null,
            }}
          />
        </View>
        <Text
          style={{
            color: R.colors.primaryBlack,
            fontWeight: 'bold',
            fontSize: R.dimensions.hp(2),
            paddingRight: 20,
            paddingLeft: 10,
          }}>
          {props.title}
        </Text>
        <View style={{}}>
          <Image
            resizeMode={'contain'}
            source={R.images.arrow}
            style={{
              height: 30,
              width: 30,
              alignSelf: 'flex-end',
            }}
          />
        </View>
      </TouchableOpacity>
    );
  };

  const BackHeader = (props) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: '2%',
          paddingHorizontal: '3%',
          backgroundColor: R.colors.primaryBrand,
        }}>
        <TouchableOpacity onPress={() => handleSection(INITIAL_SECTION)}>
          <Image
            resizeMode={'contain'}
            source={R.images.arrow}
            style={{
              transform: [{ rotateY: '180deg' }],
              height: R.dimensions.wp(8),
              width: R.dimensions.wp(8),
            }}></Image>
        </TouchableOpacity>
        <Text
          style={{
            color: R.colors.primaryBlack,
            fontWeight: 'bold',
            fontSize: R.dimensions.hp(2),
            paddingRight: 20,
            paddingLeft: 10,
          }}>
          {props.title}
        </Text>
      </View>
    );
  };

  const validateBasicInformation = () => {
    console.log("testing 123", inputData, casteId, subCasteId)
    if (inputData.surname == '') {
      ToastAndroid.show(
        'Please Enter Surname',
        ToastAndroid.TOP,
        ToastAndroid.LONG,
      );
      setInputDataError({ ...inputDataError, surnameError: true });
    } else if (inputData.firstName == '') {
      ToastAndroid.show(
        'Please Enter first Name',
        ToastAndroid.CENTER,
        ToastAndroid.LONG,
      );
      setInputDataError({ ...inputDataError, firstNameError: true });
    } else if (inputData.lastName == '') {
      ToastAndroid.show(
        'Please Enter Middle Name',
        ToastAndroid.TOP,
        ToastAndroid.LONG,
      );
      setInputDataError({ ...inputDataError, lastNameError: true });
    } else if (inputData.gender == '') {
      ToastAndroid.show('Please Enter gender', ToastAndroid.LONG);
      setInputDataError({ ...inputDataError, genderError: true });
    } else if (inputData.dateOfBirth == '') {
      ToastAndroid.show('Please Enter date Of Birth', ToastAndroid.LONG);
      setInputDataError({ ...inputDataError, dateOfBirthError: true });
    } else if (
      inputData.email == '' ||
      EMAIL_REGEX_PATTERN.test(inputData.email) == false
    ) {
      ToastAndroid.show('Please Enter valid email', ToastAndroid.LONG);
      setInputDataError({ ...inputDataError, emailError: true });
    } else if (inputData.caste == '') {
      ToastAndroid.show('Please Enter caste', ToastAndroid.LONG);
      setInputDataError({ ...inputDataError, casteError: true });
    } else if (inputData.subCaste == '') {
      ToastAndroid.show('Please Enter Sub Caste', ToastAndroid.LONG);
      setInputDataError({ ...inputDataError, subCasteError: true });
    } else if (inputData.maritalStatus == '') {
      ToastAndroid.show('Please Enter maritalStatus', ToastAndroid.LONG);
      setInputDataError({ ...inputDataError, maritalStatusError: true });
    } else if (
      inputData.maritalStatus != 'unmarried' &&
      inputData.numberOfChild == ''
    ) {
      setInputDataError({ ...inputDataError, numberOfChildError: true });
    } else if (inputData.height == '') {
      ToastAndroid.show('Please Enter height', ToastAndroid.LONG);
      setInputDataError({ ...inputDataError, heightError: true });
    } else if (inputData.weight == '') {
      ToastAndroid.show('Please Enter Weight', ToastAndroid.LONG);
      setInputDataError({ ...inputDataError, weightError: true });
    } else if (inputData.isHandicap == '') {
      ToastAndroid.show('Please Enter isHandicap', ToastAndroid.LONG);
      setInputDataError({ ...inputDataError, isHandicapError: true });
    } else if (inputData.password == '') {
      ToastAndroid.show('Please Enter password', ToastAndroid.LONG);
      setInputDataError({ ...inputDataError, passwordError: true });
    } else if (inputData.confirmPassword == '') {
      ToastAndroid.show('Please Enter Confirm password', ToastAndroid.LONG);
      setInputDataError({ ...inputDataError, confirmPasswordError: true });
    } else {
      console.log('=>>', inputData);
      setFinalValidation({
        ...finalValidation,
        basicInformationSectionCompleted: true,
      });
      handleSection(INITIAL_SECTION);
    }
  };

  const validateCareerInformation = () => {
    if (inputData.education == '') {
      ToastAndroid.show('Please Enter education', ToastAndroid.LONG);
      setInputDataError({ ...inputDataError, educationError: true });
    } else if (inputData.occupation == '') {
      ToastAndroid.show('Please Enter occupation', ToastAndroid.LONG);
      setInputDataError({ ...inputDataError, occupationError: true });
    } else if (inputData.monthlyIncome == '') {
      ToastAndroid.show('Please Enter monthlyIncome', ToastAndroid.LONG);
      setInputDataError({ ...inputDataError, monthlyIncomeError: true });
    } else {
      setFinalValidation({ ...finalValidation, careerInformationSection: true });
      handleSection(INITIAL_SECTION);
    }
  };

  const validateFamilyInformation = () => {
    if (inputData.fatherName == '') {
      ToastAndroid.show('Please Enter father Name', ToastAndroid.LONG);
      setInputDataError({ ...inputDataError, fatherNameError: true });
    } else if (inputData.fatherOccupation == '') {
      ToastAndroid.show('Please Enter father Occupation', ToastAndroid.LONG);
      setInputDataError({ ...inputDataError, fatherOccupationError: true });
    } else if (inputData.fartherMonthlyIncome == '') {
      ToastAndroid.show(
        'Please Enter father Monthly Income',
        ToastAndroid.LONG,
      );
      setInputDataError({ ...inputDataError, fartherMonthlyIncomeError: true });
    } else if (inputData.MotherName == '') {
      ToastAndroid.show('Please Enter Mother Name', ToastAndroid.LONG);
      setInputDataError({ ...inputDataError, MotherNameError: true });
    } else if (inputData.totalFamilyMember == '') {
      ToastAndroid.show('Please Enter total Family Member', ToastAndroid.LONG);
      setInputDataError({ ...inputDataError, totalFamilyMemberError: true });
    } else {
      setFinalValidation({
        ...finalValidation,
        familyInformationSectionCompleted: true,
      });
      handleSection(INITIAL_SECTION);
    }
  };

  const validateContactInformation = () => {
    console.log(inputData);
    if (inputData.contactDetailName == '') {
      ToastAndroid.show('Please Enter contact Detail Name', ToastAndroid.LONG);
      setInputDataError({ ...inputDataError, contactDetailNameError: true });
    } else if (inputData.relationShipCandidate == '') {
      ToastAndroid.show(
        'Please Enter relationShip with Candidate',
        ToastAndroid.LONG,
      );
      setInputDataError({ ...inputDataError, relationShipCandidateError: true });
    } else if (inputData.contactNumber1 == '') {
      ToastAndroid.show('Please Enter contact Number 1 ', ToastAndroid.LONG);
      setInputDataError({ ...inputDataError, contactNumber1Error: true });
    } else if (inputData.country == '') {
      ToastAndroid.show('Please Enter country Name', ToastAndroid.LONG);
      setInputDataError({ ...inputDataError, countyError: true });
    } else if (inputData.state == '') {
      ToastAndroid.show('Please Enter state Name', ToastAndroid.LONG);
      setInputDataError({ ...inputDataError, stateError: true });
    } else if (inputData.city == '') {
      ToastAndroid.show('Please Enter city Name', ToastAndroid.LONG);
      setInputDataError({ ...inputDataError, cityError: true });
    } else if (inputData.streetAddress == '') {
      ToastAndroid.show('Please Enter street Address', ToastAndroid.LONG);
      setInputDataError({ ...inputDataError, streetAddressError: true });
    } else {
      setFinalValidation({
        ...finalValidation,
        contactInformationSectionCompleted: true,
      });
      handleSection(INITIAL_SECTION);
    }
  };

  const validateImagesInformation = () => {
    console.log(profileImage)
    if (profileImage.data === null) {
      ToastAndroid.show('Please Upload Profile Image', ToastAndroid.LONG);
    } else if (galleryImage1.data === null) {
      ToastAndroid.show('lease Upload Gallery Image 1', ToastAndroid.LONG);
    } else if (addressImage.data === null) {
      ToastAndroid.show('Please Upload Address Proof', ToastAndroid.LONG);
    } else if (birthProof.data === null) {
      ToastAndroid.show('Please upload Birth Proof', ToastAndroid.LONG);
    } else {
      setFinalValidation({
        ...finalValidation,
        galleryImageInformationSectionCompleted: true,
      });
      handleSection(INITIAL_SECTION);
    }
  };

  const submitValidation = (params) => {
    if (!finalValidation.basicInformationSectionCompleted) {
      ToastAndroid.show('Please Complete Basic Profile', ToastAndroid.LONG);
    } else if (!finalValidation.careerInformationSection) {
      ToastAndroid.show('Please Complete Career Section', ToastAndroid.LONG);
    } else if (!finalValidation.familyInformationSectionCompleted) {
      ToastAndroid.show('Please Complete Family Section', ToastAndroid.LONG);
    } else if (!finalValidation.contactInformationSectionCompleted) {
      ToastAndroid.show('Please Complete Contact Section', ToastAndroid.LONG);
    } else if (!finalValidation.galleryImageInformationSectionCompleted) {
      ToastAndroid.show('Please Complete Images Section', ToastAndroid.LONG);
    } else if (!isChecked) {
      ToastAndroid.show(
        'Please accept terms and conditions',
        ToastAndroid.LONG,
      );
    } else {
      console.log('===>', inputData);
      RegistrationApiCall();
    }
  };

  return (
    <View style={{ backgroundColor: 'lightgrey', flex: 1 }}>
      {showSection.initialSection && (
        <ScrollView style={{ flex: 1 }}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 30,
              textAlign: 'center',
              paddingTop: 15,
            }}>
            Registration
          </Text>
          <DetailsTab
            title={'Basic Information'}
            isCompleted={finalValidation.basicInformationSectionCompleted}
            image={R.images.myProfile}
            onPress={() => handleSection(BASIC_INFORMATION_SECTION)}
          />
          <DetailsTab
            title={'Education & Career Information'}
            isCompleted={finalValidation.careerInformationSection}
            image={R.images.career}
            onPress={() => handleSection(CAREER_INFORMATION_SECTION)}
          />
          <DetailsTab
            title={'Familiy Information'}
            isCompleted={finalValidation.familyInformationSectionCompleted}
            image={R.images.family}
            onPress={() => handleSection(FAMILY_INFORMATION_SECTION)}
          />
          <DetailsTab
            title={'Contact Details'}
            isCompleted={finalValidation.contactInformationSectionCompleted}
            image={R.images.contact}
            onPress={() => handleSection(CONTACT_INFORMATION_SECTION)}
          />
          <DetailsTab
            title={"Profile Images / Other Proof's"}
            isCompleted={
              finalValidation.galleryImageInformationSectionCompleted
            }
            image={R.images.career}
            onPress={() => handleSection(IMAGE_INFORMATION_SECTION)}
          />
          <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: 'flex-start' }}>
            <CheckBox
              style={{ padding: 10, paddingLeft: '5%' }}
              onClick={() => setisChecked(!isChecked)}
              isChecked={isChecked}
            />
            <Text>Agree to <Text onPress={() => navigation.navigate("TermsAndConditions")} style={{ textDecorationLine: 'underline' }}>Terms & Conditions</Text> And <Text onPress={() => navigation.navigate("PrivacyPolicy")} style={{ textDecorationLine: 'underline' }}>Privacy Policy</Text></Text>
          </View>
          <CButton
            title={'Submit'}
            onPress={() => submitValidation()}
            customStyle={{ backgroundColor: R.colors.secondaryBrand }}
          />
          <Loader isVisible={showLoader} />
        </ScrollView>
      )}

      {showSection.basicInformationSection && (
        <ScrollView style={{ backgroundColor: 'lightgrey' }}>
          <BackHeader title={'Basic Information'} />
          <View style={{ marginTop: '5%' }} />
          <CTextInput
            title={'Surname'}
            value={inputData.surname}
            isCompulsory={true}
            placeholder={'Surname'}
            onChangeText={(text) => handleOnChange('surname', text)}
            errorText={'Enter Valid Surname'}
            showErrorText={inputDataError.surnameError}
          />

          <CTextInput
            title={'First Name'}
            value={inputData.firstName}
            isCompulsory={true}
            placeholder={'First Name'}
            onChangeText={(text) => handleOnChange('firstName', text)}
            errorText={'Enter Valid First Name'}
            showErrorText={inputDataError.firstNameError}
          />

          <CTextInput
            title={'Middle Name'}
            value={inputData.lastName}
            isCompulsory={true}
            placeholder={'Middle Name'}
            onChangeText={(text) => handleOnChange('lastName', text)}
            errorText={'Enter Valid Middle Name'}
            showErrorText={inputDataError.lastNameError}
          />

          <CDropDown
            value={inputData.gender}
            isCompulsory={true}
            itemLabel={"label"}
            data={GENDER_OPTIONS_ARRAY}
            title={'Gender'}
            label={'Select Gender'}
            onChangeText={(selectedItem, index) => handleOnChange('gender', selectedItem.value)}
            showErrorText={inputDataError.genderError}
            errorText={'Select Gender'}
          />

          <CDatePicker
            date={inputData.dateOfBirth}
            title={'Date Of Birth'}
            isCompulsory={true}
            placeholder={'Enter Date Of Birth'}
            onDateChange={(date) => handleOnChange('dateOfBirth', date)}
            errorText={'Enter Valid Date'}
            showErrorText={inputDataError.dateOfBirthError}
          />

          <CTextInput
            title={'Email'}
            value={inputData.email}
            isCompulsory={true}
            placeholder={'Enter Email'}
            keyboardType={'email-address'}
            onChangeText={(text) => handleOnChange('email', text)}
            errorText={'Enter Valid Email'}
            showErrorText={inputDataError.emailError}
          />

          <CDropDown
            value={inputData.caste}
            data={casteList}
            isCompulsory={true}
            itemLabel={"casteName"}
            title={'Caste'}
            label={'Select Caste'}
            onChangeText={(selectedItem, index) => {
              handleOnChange('caste', selectedItem.casteName);
              setCasteId(selectedItem.casteId);
              getSubCasteList(selectedItem.casteId);
            }}
            labelExtractor={({ casteName }) => casteName}
            valueExtractor={({ casteId }) => casteId}
            errorText={'Select Caste'}
            showErrorText={inputDataError.casteError}
          />

          <CDropDown
            value={inputData.subCaste}
            data={subCasteList}
            title={'Sub Caste'}
            itemLabel={"subCasteName"}
            isCompulsory={true}
            label={'Select Sub Caste'}
            onChangeText={(selectedItem, index) => {
              handleOnChange('subCaste', selectedItem.subCasteName);
              setSubCasteId(selectedItem.subCasteId);
            }}
            labelExtractor={({ subCasteName }) => subCasteName}
            valueExtractor={({ subCasteId }) => subCasteId}
            errorText={'Select SubCaste'}
            showErrorText={inputDataError.subCasteError}
          />

          <CDropDown
            value={inputData.maritalStatus}
            data={MARITAL_STATUS_OPTIONS_ARRAY}
            title={'Marital Status'}
            itemLabel={"label"}
            isCompulsory={true}
            label={'Select Marital Status'}
            onChangeText={(selectedItem, index) => handleOnChange('maritalStatus', selectedItem.value)}
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

          <CTextInput
            title={'Height'}
            value={inputData.height}
            placeholder={'Enter Height'}
            isCompulsory={true}
            keyboardType={'numeric'}
            onChangeText={(text) => handleOnChange('height', text)}
            errorText={'Enter Valid Height'}
            showErrorText={inputDataError.heightError}
          />

          <CTextInput
            title={'Weight'}
            value={inputData.weight}
            placeholder={'Enter Weight'}
            isCompulsory={true}
            keyboardType={'numeric'}
            onChangeText={(text) => handleOnChange('weight', text)}
            errorText={'Enter Valid Weight'}
            showErrorText={inputDataError.weightError}
          />

          <CTextInput
            title={'Blood Group'}
            value={inputData.bloodGroup}
            placeholder={'Enter Blood Group'}
            onChangeText={(text) => handleOnChange('bloodGroup', text)}
            errorText={'Enter Valid Mobile Number'}
            showErrorText={inputDataError.bloodGroupError}
          />

          <CDropDown
            value={inputData.isHandicap}
            data={HANDICAP_OPTIONS_ARRAY}
            title={'Is Handicapped ?'}
            isCompulsory={true}
            itemLabel={"label"}
            label={'Select Yes / No'}
            onChangeText={(selectedItem, index) => handleOnChange('isHandicap', selectedItem.value)}
            errorText={'Select Option'}
            showErrorText={inputDataError.isHandicapError}
          />

          <CTextInput
            title={'Password'}
            value={inputData.password}
            placeholder={'Enter password'}
            isCompulsory={true}
            onChangeText={(text) => handleOnChange('password', text)}
            errorText={'Enter Valid Password'}
            secureTextEntry={true}
            showErrorText={inputDataError.passwordError}
          />

          <CTextInput
            title={'Confirm Password'}
            value={inputData.confirmPassword}
            placeholder={'Re-enter password'}
            isCompulsory={true}
            onChangeText={(selectedItem, index) => handleOnChange('confirmPassword', selectedItem.value)}
            errorText={'Enter Valid Confirm Password'}
            secureTextEntry={true}
            showErrorText={inputDataError.confirmPasswordError}
          />

          <CButton
            title={'SAVE'}
            onPress={() => validateBasicInformation()}
            customStyle={{ alignSelf: 'center', marginTop: '5%' }}
          />
        </ScrollView>
      )}

      {showSection.careerInformationSection && (
        <ScrollView style={{ backgroundColor: 'lightgrey' }}>
          <BackHeader title={'Education & career information'} />
          <View style={{ marginTop: '5%' }} />

          <CDropDown
            value={inputData.education}
            data={educationList}
            isCompulsory={true}
            title={'Education'}
            itemLabel={"name"}
            label={'Select Education'}
            onChangeText={(selectedItem, index) => {
              handleOnChange('education', selectedItem.name);
              setEducationId(selectedItem.educationId);
            }}
            labelExtractor={({ name }) => name}
            valueExtractor={({ educationId }) => educationId}
            errorText={'Select Education'}
            showErrorText={inputDataError.educationError}
          />

          <CTextInput
            title={'Occupation'}
            value={inputData.occupation}
            isCompulsory={true}
            placeholder={'Occupation'}
            onChangeText={(text) => handleOnChange('occupation', text)}
            errorText={'Enter Valid Occupation'}
            showErrorText={inputDataError.occupationError}
          />

          <CTextInput
            title={'Monthly Income'}
            value={inputData.monthlyIncome}
            isCompulsory={true}
            placeholder={'Monthly Income'}
            keyboardType={'numeric'}
            onChangeText={(text) => handleOnChange('monthlyIncome', text)}
            errorText={'Enter Valid Monthly'}
            showErrorText={inputDataError.monthlyIncomeError}
          />
          <CButton
            title={'SAVE'}
            onPress={() => validateCareerInformation()}
            customStyle={{ alignSelf: 'center', marginTop: '6%' }}
          />
        </ScrollView>
      )}

      {showSection.familyInformationSection && (
        <ScrollView style={{ backgroundColor: 'lightgrey' }}>
          <BackHeader title={'Family Information'} />
          <View style={{ marginTop: '5%' }} />
          <CTextInput
            title={'Father Name'}
            isCompulsory={true}
            value={inputData.fatherName}
            placeholder={'Father Name'}
            onChangeText={(text) => handleOnChange('fatherName', text)}
            errorText={'Enter Valid Father Name'}
            showErrorText={inputDataError.fatherNameError}
          />
          <CTextInput
            title={'Father Occupation'}
            isCompulsory={true}
            value={inputData.fatherOccupation}
            placeholder={'Father Occupation'}
            onChangeText={(text) => handleOnChange('fatherOccupation', text)}
            errorText={'Enter Valid Father Occupation'}
            showErrorText={inputDataError.fatherOccupationError}
          />
          <CTextInput
            title={'Father Monthly Income'}
            isCompulsory={true}
            value={inputData.fatherMonthlyIncome}
            placeholder={'Father Monthly Income'}
            keyboardType={'numeric'}
            onChangeText={(text) => handleOnChange('fatherMonthlyIncome', text)}
            errorText={'Enter Valid Father Monthly Income'}
            showErrorText={inputDataError.fatherMonthlyIncomeError}
          />
          <CTextInput
            title={'Mother Name'}
            isCompulsory={true}
            value={inputData.motherName}
            placeholder={'Mother Name'}
            onChangeText={(text) => handleOnChange('motherName', text)}
            errorText={'Enter Valid Mother Name'}
            showErrorText={inputDataError.MotherNameError}
          />
          <CTextInput
            title={'Mother Occupation'}
            value={inputData.motherOccupation}
            placeholder={'Mother Occupation'}
            onChangeText={(text) => handleOnChange('motherOccupation', text)}
            errorText={'Enter Valid Mother Occupation'}
            showErrorText={inputDataError.MotherOccupationError}
          />

          <CTextInput
            title={'Mother Monthly Income'}
            value={inputData.motherMonthlyIncome}
            placeholder={'Mother Monthly Income'}
            onChangeText={(text) => handleOnChange('motherMonthlyIncome', text)}
            errorText={'Enter Valid Mother Monthly Income'}
            showErrorText={inputDataError.monthlyIncomeError}
          />

          <CTextInput
            title={'Total Family Members'}
            value={inputData.totalFamilyMembers}
            isCompulsory={true}
            placeholder={'Total Family Members'}
            keyboardType={'numeric'}
            onChangeText={(text) => handleOnChange('totalFamilyMembers', text)}
            errorText={'Enter Valid Total Family Members'}
            showErrorText={inputDataError.totalFamilyMembersError}
          />

          <CTextInput
            title={'Married Brothers'}
            value={inputData.marriedBrothers}
            placeholder={'Married Brothers'}
            onChangeText={(text) => handleOnChange('marriedBrothers', text)}
            errorText={'Enter Valid Married Brothers'}
            showErrorText={inputDataError.marriedBrothersError}
          />

          <CTextInput
            title={'Unmarried Brothers'}
            value={inputData.unmarriedBrothers}
            placeholder={'Unmarried Brothers'}
            onChangeText={(text) => handleOnChange('unmarriedBrothers', text)}
            errorText={'Enter Valid Unmarried Brothers'}
            showErrorText={inputDataError.unmarriedBrothersError}
          />

          <CTextInput
            title={'Married Sisters'}
            value={inputData.marriedSisters}
            placeholder={'Married Sisters'}
            onChangeText={(text) => handleOnChange('marriedSisters', text)}
            errorText={'Enter Valid Married Sisters'}
            showErrorText={inputDataError.marriedSistersError}
          />

          <CTextInput
            title={'Unmarried Sisters'}
            value={inputData.unmarriedSisters}
            placeholder={'Unmarried Sisters'}
            onChangeText={(text) => handleOnChange('unmarriedSisters', text)}
            errorText={'Enter Valid Unmarried Sisters'}
            showErrorText={inputDataError.unmarriedSisteError}
          />

          <CButton
            title={'SAVE'}
            onPress={() => validateFamilyInformation()}
            customStyle={{ alignSelf: 'center', marginTop: '5%' }}
          />
        </ScrollView>
      )}

      {showSection.contactInformationSection && (
        <ScrollView style={{ backgroundColor: 'lightgrey' }}>
          <BackHeader title={'Contact Details'} />
          <View style={{ marginTop: '5%' }} />
          <CTextInput
            title={'Contact Detail Name'}
            value={inputData.contactDetailName}
            isCompulsory={true}
            placeholder={'Contact Detail Name'}
            onChangeText={(text) => handleOnChange('contactDetailName', text)}
            errorText={'Enter Valid Name'}
            showErrorText={inputDataError.contactDetailNameError}
          />

          <CTextInput
            title={'Relationship with Candidate'}
            value={inputData.relationShipCandidate}
            isCompulsory={true}
            placeholder={'Relationship with Candidate'}
            onChangeText={(text) =>
              handleOnChange('relationShipCandidate', text)
            }
            errorText={'Enter Valid Relationship with candidate'}
            showErrorText={inputDataError.relationShipCandidateError}
          />

          <CTextInput
            title={'Contact Number 1'}
            value={inputData.contactNumber1}
            isCompulsory={true}
            keyboardType={"numeric"}
            placeholder={'Contact Number 1'}
            onChangeText={(text) => handleOnChange('contactNumber1', text)}
            errorText={'Enter Valid Mobile Number'}
            showErrorText={inputDataError.contactNumber1Error}
          />

          <CTextInput
            title={'Contact Number 2'}
            value={inputData.contactNumber2}
            placeholder={'Contact Number 2'}
            onChangeText={(text) => handleOnChange('contactNumber2', text)}
            errorText={'Enter Valid Mobile Number'}
            showErrorText={inputDataError.contactNumber2Error}
          />

          <CTextInput
            title={'Contact Email'}
            value={inputData.contactEmail}
            placeholder={'Contact Email'}
            keyboardType={'email-address'}
            onChangeText={(text) => handleOnChange('contactEmail', text)}
            errorText={'Enter Valid Email Address'}
            showErrorText={inputDataError.contactEmailError}
          />

          <CDropDown
            value={inputData.country}
            data={countryList}
            title={'Country'}
            itemLabel={"name"}
            isCompulsory={true}
            label={'Select Country'}
            onChangeText={(selectedItem, index) => {
              setInputData({ ...inputData, country: selectedItem.name, state: "", city: "" })
              setInputDataError({ ...inputDataError, countryError: false, stateError: false, cityError: false })
              getStateList(selectedItem.countryId);
              setCountryId(selectedItem.countryId);
            }}
            labelExtractor={({ name }) => name}
            valueExtractor={({ countryId }) => countryId}
            errorText={'Select Country'}
            showErrorText={inputDataError.countryError}
          />
          <CDropDown
            value={inputData.state}
            data={stateList}
            title={'State'}
            itemLabel={"name"}
            isCompulsory={true}
            label={'Select State'}
            onChangeText={(selectedItem, index) => {
              setInputData({ ...inputData, state: selectedItem.name, city: "" })
              setInputDataError({ ...inputDataError, stateError: false, cityError: false })
              getCityList(selectedItem.stateId);
              setStateId(selectedItem.stateId);
            }}
            labelExtractor={({ name }) => name}
            valueExtractor={({ stateId }) => stateId}
            errorText={'Select State'}
            showErrorText={inputDataError.stateError}
          />

          <CDropDown
            value={inputData.city}
            data={cityList}
            title={'City'}
            itemLabel={"name"}
            isCompulsory={true}
            label={'Select City'}
            onChangeText={(selectedItem, index) => {
              handleOnChange('city', selectedItem.name);
              setCityId(selectedItem.cityId);
            }}
            labelExtractor={({ name }) => name}
            valueExtractor={({ cityId }) => cityId}
            errorText={'Select City'}
            showErrorText={inputDataError.cityError}
          />

          <CTextInput
            title={'Street Address'}
            value={inputData.streetAddress}
            isCompulsory={true}
            placeholder={'Street Address'}
            onChangeText={(text) => handleOnChange('streetAddress', text)}
            errorText={'Enter Street Address'}
            showErrorText={inputDataError.streetAddressError}
          />

          <CTextInput
            title={'Full Address'}
            value={inputData.fullAddress}
            placeholder={'Full Address'}
            onChangeText={(text) => handleOnChange('fullAddress', text)}
            errorText={'Enter Valid Address'}
            showErrorText={inputDataError.fullAddressError}
          />

          <CButton
            title={'SAVE'}
            onPress={() => validateContactInformation()}
            customStyle={{ alignSelf: 'center', marginTop: '5%' }}
          />
        </ScrollView>
      )}

      {showSection.imagesInformationSection && (
        <ScrollView style={{ backgroundColor: 'lightgrey' }}>
          <BackHeader title={"Profile Images / Other Proof's"} />
          <View style={{ marginTop: '5%' }} />
          <Text
            style={{ marginHorizontal: '5%', fontSize: R.dimensions.hp(2.5) }}>
            Profile Images
          </Text>
          <View
            style={{
              alignItems: 'center',
              backgroundColor: '#fff',
              marginHorizontal: '5%',
              borderRadius: 10,
              marginTop: '4%',
            }}>
            {profileImage.data != null && (
              <Image
                source={{
                  uri: `data:${profileImage.mime};base64,${profileImage.data}`,
                }}
                style={{
                  width: R.dimensions.wp(50),
                  height: R.dimensions.wp(50),
                  marginTop: '5%',
                }}
              />
            )}
            <CButton
              title={'Please Select Profile Image'}
              onPress={() => imageProfilePicker()}
              customStyle={{
                alignSelf: 'center',
                backgroundColor: R.colors.secondaryBrand,
              }}
            />
          </View>
          <View
            style={{
              alignItems: 'center',
              backgroundColor: '#fff',
              marginHorizontal: '5%',
              borderRadius: 10,
              marginTop: '4%',
            }}>
            {galleryImage1.data != null && (
              <Image
                source={{
                  uri: `data:${galleryImage1.mime};base64,${galleryImage1.data}`,
                }}
                style={{
                  width: R.dimensions.wp(50),
                  height: R.dimensions.wp(50),
                  marginTop: '5%',
                }}
              />
            )}
            <CButton
              title={'Please Select Gallery Image 1'}
              onPress={() => imageGalleryPicker1()}
              customStyle={{
                alignSelf: 'center',
                backgroundColor: R.colors.secondaryBrand,
              }}
            />
          </View>
          <View
            style={{
              alignItems: 'center',
              backgroundColor: '#fff',
              marginHorizontal: '5%',
              borderRadius: 10,
              marginTop: '4%',
            }}>
            {galleryImage2.data != null && (
              <Image
                source={{
                  uri: `data:${galleryImage2.mime};base64,${galleryImage2.data}`,
                }}
                style={{
                  width: R.dimensions.wp(50),
                  height: R.dimensions.wp(50),
                  marginTop: '5%',
                }}
              />
            )}
            <CButton
              title={'Please Select Gallery Image 2'}
              onPress={() => imageGalleryPicker2()}
              customStyle={{
                alignSelf: 'center',
                backgroundColor: R.colors.secondaryBrand,
              }}
            />
          </View>
          <View
            style={{
              alignItems: 'center',
              backgroundColor: '#fff',
              marginHorizontal: '5%',
              borderRadius: 10,
              marginTop: '4%',
            }}>
            {galleryImage3.data != null && (
              <Image
                source={{
                  uri: `data:${galleryImage3.mime};base64,${galleryImage3.data}`,
                }}
                style={{
                  width: R.dimensions.wp(50),
                  height: R.dimensions.wp(50),
                  marginTop: '5%',
                }}
              />
            )}
            <CButton
              title={'Please Select Gallery Image 3'}
              onPress={() => imageGalleryPicker3()}
              customStyle={{
                alignSelf: 'center',
                backgroundColor: R.colors.secondaryBrand,
              }}
            />
          </View>
          <Text
            style={{
              marginHorizontal: '5%',
              fontSize: R.dimensions.hp(2.5),
              marginTop: '5%',
            }}>
            Other Proof's
          </Text>
          <View
            style={{
              alignItems: 'center',
              backgroundColor: '#fff',
              marginHorizontal: '5%',
              borderRadius: 10,
              marginTop: '4%',
            }}>
            {addressImage.data != null && (
              <Image
                source={{
                  uri: `data:${addressImage.mime};base64,${addressImage.data}`,
                }}
                style={{
                  width: R.dimensions.wp(50),
                  height: R.dimensions.wp(50),
                  marginTop: '5%',
                }}
              />
            )}
            <CButton
              title={'Please Select Address Image'}
              onPress={() => imageAddressPicker()}
              customStyle={{
                alignSelf: 'center',
                backgroundColor: R.colors.secondaryBrand,
              }}
            />
          </View>
          <View
            style={{
              alignItems: 'center',
              backgroundColor: '#fff',
              marginHorizontal: '5%',
              borderRadius: 10,
              marginTop: '4%',
            }}>
            {birthProof.data != null && (
              <Image
                source={{
                  uri: `data:${birthProof.mime};base64,${birthProof.data}`,
                }}
                style={{
                  width: R.dimensions.wp(50),
                  height: R.dimensions.wp(50),
                  marginTop: '5%',
                }}
              />
            )}
            <CButton
              title={'Please Select Birth Proof'}
              onPress={() => imageBirthPicker()}
              customStyle={{
                alignSelf: 'center',
                backgroundColor: R.colors.secondaryBrand,
              }}
            />
          </View>
          <CButton
            title={'SAVE'}
            onPress={() => validateImagesInformation()}
            customStyle={{ alignSelf: 'center', marginTop: '5%' }}
          />
        </ScrollView>
      )}
    </View>
  );
};
