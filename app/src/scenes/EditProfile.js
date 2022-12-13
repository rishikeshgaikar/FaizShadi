import React, { useState, useEffect, useContext } from 'react';
import { Text, View, TouchableOpacity, ScrollView, Image } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';
import FormData from 'form-data';
import moment from 'moment';
//local imports
import R from '../R';
import {
  CButton,
  CTextInput,
  Loader,
  CDropDown,
  CDatePicker,
} from '../components';
import {
  BASE_URL,
  EMAIL_REGEX_PATTERN,
  PROFILE_IMAGE_URL,
} from '../utils/Constants';
import { AuthContext } from '../context/auth/AuthContext';

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
  { id: 1, label: "Yes", value: 'yes' },
  { id: 2, label: "No", value: 'no' },
]
const INITIAL_SECTION = "initialSection"
const BASIC_INFORMATION_SECTION = "basicInformationSection"
const CAREER_INFORMATION_SECTION = "careerInformationSection"
const CONTACT_INFORMATION_SECTION = "contactInformationSection"
const FAMILY_INFORMATION_SECTION = "familyInformationSection"
const IMAGE_INFORMATION_SECTION = "imagesInformationSection"


export const EditProfile = ({ navigation }) => {
  const { authState, authAction } = useContext(AuthContext)
  console.log("🚀 ~ file: EditProfile.js ~ line 42 ~ EditProfile ~ authState", authState)

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
    surname: authState?.userObject?.surname,
    firstName: authState?.userObject?.firstName,
    lastName: authState?.userObject?.lastName,
    gender: authState?.userObject?.gender,
    dateOfBirth: moment(authState?.userObject?.dateOfBirth).format(
      'DD/MM/YYYY',
    ),
    email: authState?.userObject?.email,
    caste: authState?.userObject?.casteName,
    subCaste: authState?.userObject?.subCasteName,
    maritalStatus: authState?.userObject?.maritalStatus,
    numberOfChild: authState?.userObject?.noOfChild ?? 0,
    height: authState?.userObject?.height,
    weight: authState?.userObject?.weight,
    bloodGroup: authState?.userObject?.bloodGroup,
    isHandicap: authState?.userObject?.physicallyHandicapped,
    education: authState?.userObject?.educationName,
    occupation: authState?.userObject?.occupation,
    monthlyIncome: authState?.userObject?.monthlyIncome,
    fatherName: authState?.userObject?.fatherName,
    fatherOccupation: authState?.userObject?.fatherOccupation,
    fatherMonthlyIncome: authState?.userObject?.fatherMonthlyIncome,
    motherName: authState?.userObject?.motherName,
    motherOccupation: authState?.userObject?.motherOccupation,
    motherMonthlyIncome: authState?.userObject?.motherMonthlyIncome,
    totalFamilyMembers: authState?.userObject?.totalFamilyMembers,
    marriedBrothers: authState?.userObject?.marriedBrother.toString(),
    unmarriedBrothers: authState?.userObject?.unmarriedBrother.toString(),
    marriedSisters: authState?.userObject?.marriedSister.toString(),
    unmarriedSisters: authState?.userObject?.unmarriedSister.toString(),
    contactDetailName: authState?.userObject?.contactDetailName,
    relationShipCandidate: authState?.userObject?.relationshipWithCandidate,
    contactNumber1: authState?.userObject?.contactNumber1,
    contactNumber2: authState?.userObject?.contactNumber2,
    contactEmail: authState?.userObject?.contactEmail,
    country: authState?.userObject?.countryName,
    state: authState?.userObject?.stateName,
    city: authState?.userObject?.cityName,
    streetAddress: authState?.userObject?.streetAddress,
    fullAddress: authState?.userObject?.fullAddress,
  });
  console.log("🚀 ~ file: EditProfile.js ~ line 60 ~ EditProfile ~ inputData", inputData)

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

  const [profileImage, setProfileImage] = useState({
    url: authState?.userObject?.profileImage != null ? authState?.userObject?.profileImage : null,
    data: null,
    mime: null,
  });
  const [addressImage, setAddressImage] = useState({
    url: authState?.userObject?.addressProof != null ? authState?.userObject?.addressProof : null,
    data: null,
    mime: null,
  });
  const [birthProof, setBirthProof] = useState({
    url: authState?.userObject?.birthProof != null ? authState?.userObject?.birthProof : null,
    data: null,
    mime: null,
  });
  const [galleryImage1, setGalleryImage1] = useState({
    url: authState?.userObject?.galleryImage1 != null ? authState?.userObject?.galleryImage1 : null,
    data: null,
    mime: null,
  });
  const [galleryImage2, setGalleryImage2] = useState({
    url:
      authState?.userObject?.galleryImage2 != null
        ? authState?.userObject?.galleryImage2
        : null,
    data: null,
    mime: null,
  });
  const [galleryImage3, setGalleryImage3] = useState({
    url:
      authState?.userObject?.galleryImage3 != null
        ? authState?.userObject?.galleryImage3
        : null,
    data: null,
    mime: null,
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
    getEducationList()
    getSubCasteList(authState?.userObject?.caste)
    getStateList(authState?.userObject?.country)
    getCityList(authState?.userObject?.state)
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
    data.append('caste', casteId == "" ? authState?.userObject?.caste : casteId);
    data.append('sub_caste', subCasteId == "" ? authState?.userObject?.subCaste : subCasteId);
    data.append('marital_status', inputData.maritalStatus);
    data.append('no_of_child', inputData.numberOfChild);
    data.append('height', inputData.height);
    data.append('weight', inputData.weight);
    data.append('blood_group', inputData.bloodGroup);
    data.append('physically_handicapped', inputData.isHandicap);

    data.append('education', educationId == "" ? authState?.userObject?.education : educationId);
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

    data.append('country', countryId == "" ? authState?.userObject?.country : countryId);
    data.append('state', stateId == "" ? authState?.userObject?.state : stateId);
    data.append('city', cityId == "" ? authState?.userObject?.city : cityId);
    data.append('street_address', inputData.streetAddress);
    data.append('full_address', inputData.fullAddress);
    data.append('contact_detail_name', inputData.contactDetailName);
    data.append('relationship_with_candidate', inputData.relationShipCandidate);
    data.append('contact_number_1', inputData.contactNumber1);
    data.append('contact_number_2', inputData.contactNumber2);
    data.append('contact_email', inputData.contactEmail);
    data.append(
      'partner_expectation',
      'Need a partner with atleast completed graduation',
    );
    data.append('profile_image', profileImage?.data == null ? profileImage.url : profileImage?.data);
    data.append('profile_image_mime', profileImage?.mime);
    data.append('gallary_image1', galleryImage1?.data == null ? galleryImage1.url : galleryImage1.data);
    data.append('gallary_image1_mime', galleryImage1?.mime);
    data.append('gallary_image2', galleryImage2?.data == null ? galleryImage2.url : galleryImage2.data);
    data.append('gallary_image2_mime', galleryImage2?.mime);
    data.append('gallary_image3', galleryImage3?.data == null ? galleryImage3.url : galleryImage3.data);
    data.append('gallary_image3_mime', galleryImage3?.mime);
    data.append('address_proof', addressImage?.data == null ? addressImage?.url : addressImage.data);
    data.append('address_proof_mime', addressImage?.mime);
    data.append('birth_proof', birthProof?.data == null ? birthProof.url : birthProof.data);
    data.append('birth_proof_mime', birthProof?.mime);
    console.log(
      '🚀 ~ file: RegisterDetail.js ~ line 312 ~ RegistrationApiCall ~ data',
      data,
    );
    setShowLoader(true);
    var config = {
      method: 'post',
      url: 'http://api.faizshaadi.in/api/update-profile',
      headers: {
        'Authorization': authState.userToken,
      },
      data: data
    };

    axios(config)
      .then(async (result) => {
        console.log('APi call Done=====>>>', result);
        await setShowLoader(false);
        let userInfo = {
          ...authState,
          userObject: result?.data?.data
        }
        authAction.setProfile(userInfo);
        navigation.goBack()
      })
      .catch((error) => {
        setShowLoader(false);
        console.log('error', error);
      });
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
    console.log("🚀 ~ file: EditProfile.js ~ line 476 ~ getSubCasteList ~ config", config)

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
      setProfileImage({ ...profileImage, ...image });
    });
  };

  const imageAddressPicker = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
    }).then((image) => {
      setAddressImage({ ...addressImage, ...image });
    });
  };

  const imageBirthPicker = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
    }).then((image) => {
      setBirthProof({ ...birthProof, ...image });
    });
  };

  const imageGalleryPicker1 = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
    }).then((image) => {
      setGalleryImage1({ ...galleryImage1, ...image });
    });
  };
  const imageGalleryPicker2 = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
    }).then((image) => {
      setGalleryImage2({ ...galleryImage2, ...image });
    });
  };
  const imageGalleryPicker3 = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
    }).then((image) => {
      setGalleryImage3({ ...galleryImage3, ...image });
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
    console.log("test", inputData)
    if (inputData.surname == '') {
      setInputDataError({ ...inputDataError, surnameError: true });
    } else if (inputData.firstName == '') {
      setInputDataError({ ...inputDataError, firstNameError: true });
    } else if (inputData.lastName == '') {
      setInputDataError({ ...inputDataError, lastNameError: true });
    } else if (inputData.gender == '') {
      setInputDataError({ ...inputDataError, genderError: true });
    } else if (inputData.dateOfBirth == '') {
      setInputDataError({ ...inputDataError, dateOfBirthError: true });
    } else if (
      inputData.email == '' ||
      EMAIL_REGEX_PATTERN.test(inputData.email) == false
    ) {
      setInputDataError({ ...inputDataError, emailError: true });
    } else if (inputData.caste == '') {
      setInputDataError({ ...inputDataError, casteError: true });
    } else if (inputData.subCaste == '') {
      setInputDataError({ ...inputDataError, subCasteError: true });
    } else if (inputData.maritalStatus == '') {
      setInputDataError({ ...inputDataError, maritalStatusError: true });
    } else if (
      inputData.maritalStatus != 'unmarried' &&
      inputData.numberOfChild == ''
    ) {
      setInputDataError({ ...inputDataError, numberOfChildError: true });
    } else if (inputData.height == '') {
      setInputDataError({ ...inputDataError, heightError: true });
    } else if (inputData.weight == '') {
      setInputDataError({ ...inputDataError, weightError: true });
    } else if (inputData.isHandicap == '') {
      setInputDataError({ ...inputDataError, isHandicapError: true });
    } else {
      console.log("=>>", inputData)
      handleSection(INITIAL_SECTION)
    }
  };

  const validateCareerInformation = () => {
    if (inputData.education == '') {
      setInputDataError({ ...inputDataError, educationError: true });
    } else if (inputData.occupation == '') {
      setInputDataError({ ...inputDataError, occupationError: true });
    } else if (inputData.monthlyIncome == '') {
      setInputDataError({ ...inputDataError, monthlyIncomeError: true });
    } else {
      handleSection(INITIAL_SECTION)
    }
  };

  const validateFamilyInformation = () => {
    if (inputData.fatherName == '') {
      setInputDataError({ ...inputDataError, fatherNameError: true });
    } else if (inputData.fatherOccupation == '') {
      setInputDataError({ ...inputDataError, fatherOccupationError: true });
    } else if (inputData.fartherMonthlyIncome == '') {
      setInputDataError({ ...inputDataError, fartherMonthlyIncomeError: true });
    } else if (inputData.MotherName == '') {
      setInputDataError({ ...inputDataError, MotherNameError: true });
    } else if (inputData.totalFamilyMember == '') {
      setInputDataError({ ...inputDataError, totalFamilyMemberError: true });
    } else {
      handleSection(INITIAL_SECTION)
    }
  };

  const validateContactInformation = () => {
    console.log(inputData);
    if (inputData.contactDetailName == '') {
      setInputDataError({ ...inputDataError, contactDetailNameError: true });
    } else if (inputData.relationShipCandidate == '') {
      setInputDataError({ ...inputDataError, relationShipCandidateError: true });
    } else if (inputData.contactNumber1 == '') {
      setInputDataError({ ...inputDataError, contactNumber1Error: true });
    } else if (inputData.country == '') {
      setInputDataError({ ...inputDataError, countyError: true });
    } else if (inputData.state == '') {
      setInputDataError({ ...inputDataError, stateError: true });
    } else if (inputData.city == '') {
      setInputDataError({ ...inputDataError, cityError: true });
    } else if (inputData.streetAddress == '') {
      setInputDataError({ ...inputDataError, streetAddressError: true });
    } else {
      handleSection(INITIAL_SECTION)
    }
  };

  const validateImagesInformation = () => {
    if (profileImage == null) {
      alert('Please Upload Profile Image');
    } else if (galleryImage1 == null) {
      alert('Please Upload Gallery Image 1');
    } else if (addressImage == null) {
      alert('Please Upload Address Proof');
    } else if (birthProof == null) {
      alert('Please upload Birth Proof');
    } else {
      handleSection(INITIAL_SECTION)
    }
  };

  const submitValidation = (params) => {
    RegistrationApiCall()
  }

  return (
    <View style={{ backgroundColor: 'lightgrey', flex: 1 }}>
      {showSection.initialSection && (
        <ScrollView style={{ flex: 1, }}>
          <DetailsTab title={"Basic Information"} image={R.images.myProfile} onPress={() => handleSection(BASIC_INFORMATION_SECTION)} />
          <DetailsTab title={"Education & Career Information"} image={R.images.career} onPress={() => handleSection(CAREER_INFORMATION_SECTION)} />
          <DetailsTab title={"Familiy Information"} image={R.images.family} onPress={() => handleSection(FAMILY_INFORMATION_SECTION)} />
          <DetailsTab title={"Contact Details"} image={R.images.contact} onPress={() => handleSection(CONTACT_INFORMATION_SECTION)} />
          <DetailsTab title={"Profile Images / Other Proof's"} image={R.images.career} onPress={() => handleSection(IMAGE_INFORMATION_SECTION)} />
          <CButton title={"Update"} onPress={() => submitValidation()} customStyle={{ backgroundColor: R.colors.secondaryBrand, }} />
          <Loader isVisible={showLoader} />
        </ScrollView>
      )}

      {showSection.basicInformationSection && (
        <>
          <BackHeader title={'Basic Information'} />
          <ScrollView style={{ backgroundColor: 'lightgrey' }}>
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

            {/* <CDropDown
              value={inputData.gender}
              isCompulsory={true}
              itemLabel={"label"}
              data={GENDER_OPTIONS_ARRAY}
              title={'Gender'}
              label={'Select Gender'}
              onChangeText={(selectedItem, index) => handleOnChange('gender', selectedItem.value)}
              showErrorText={inputDataError.genderError}
              errorText={'Select Gender'}
            /> */}

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
              editable={false}
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

            <CButton
              title={'SAVE'}
              onPress={() => validateBasicInformation()}
              customStyle={{ alignSelf: 'center', marginTop: '5%' }}
            />
          </ScrollView>
        </>
      )}

      {
        showSection.careerInformationSection && (
          <>
            <BackHeader title={'Education & career information'} />
            <ScrollView style={{ backgroundColor: 'lightgrey' }}>
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
              {/* <CTextInput
            title={'Education'}
            value={inputData.education}
            isCompulsory={true}
            placeholder={'Education'}
            onChangeText={(text) => handleOnChange('education', text)}
            errorText={'Enter Valid Education'}
            showErrorText={inputDataError.educationError}
          /> */}

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
          </>
        )
      }

      {
        showSection.familyInformationSection && (
          <>
            <BackHeader title={'Family Information'} />
            <ScrollView style={{ backgroundColor: 'lightgrey' }}>
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
          </>
        )
      }

      {
        showSection.contactInformationSection && (
          <>
            <BackHeader title={'Contact Details'} />
            <ScrollView style={{ backgroundColor: 'lightgrey' }}>
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
                  // handleOnChange('country', selectedItem.name);
                  // handleOnChange('state', "");
                  setInputData({ ...inputData, country: selectedItem.name, state: "", city: "" })
                  setInputDataError({ ...inputDataError, countryError: false, stateError: false, cityError: false })
                  getStateList(selectedItem.countryId);
                  setCountryId(selectedItem.countryId);
                  setCityList([])
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
                  console.log("🚀 ~ file: EditProfile.js ~ line 1210 ~ EditProfile ~ selectedItem", selectedItem)
                  // handleOnChange('state', selectedItem.name);
                  // handleOnChange('city', "");
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
          </>
        )
      }

      {
        showSection.imagesInformationSection && (
          <>
            <BackHeader title={"Profile Images / Other Proof's"} />
            <ScrollView style={{ backgroundColor: 'lightgrey' }}>
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
                <Image
                  source={{
                    uri:
                      profileImage.data != null
                        ? `data:${profileImage.mime};base64,${profileImage.data}`
                        : PROFILE_IMAGE_URL + profileImage.url,
                  }}
                  style={{
                    width: R.dimensions.wp(50),
                    height: R.dimensions.wp(50),
                    marginTop: '5%',
                  }}
                />
                <CButton
                  title={"Update Profile Image"}
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
                <Image
                  source={{
                    uri:
                      galleryImage1.data != null
                        ? `data:${galleryImage1.mime};base64,${galleryImage1.data}`
                        : PROFILE_IMAGE_URL + galleryImage1.url,
                  }}
                  style={{
                    width: R.dimensions.wp(50),
                    height: R.dimensions.wp(50),
                    marginTop: '5%',
                  }}
                />
                <CButton
                  title={"Update Gallery Image 1"}
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
                {(galleryImage2.uri != null || galleryImage2.data != null) && <Image
                  source={{
                    uri:
                      galleryImage2.data != null
                        ? `data:${galleryImage2.mime};base64,${galleryImage2.data}`
                        : PROFILE_IMAGE_URL + galleryImage2.url,
                  }}
                  style={{
                    width: R.dimensions.wp(50),
                    height: R.dimensions.wp(50),
                    marginTop: '5%',
                  }}
                />}
                {(galleryImage2.uri == null && galleryImage2.data == null) ? <CButton
                  title={'Please Select Gallery Image 2'}
                  onPress={() => imageGalleryPicker2()}
                  customStyle={{
                    alignSelf: 'center',
                    backgroundColor: R.colors.secondaryBrand,
                  }}
                /> : <View style={{ flexDirection: 'row', justifyContent: "space-around" }}>
                  <CButton
                    title={'Update'}
                    onPress={() => imageGalleryPicker2()}
                    customStyle={{
                      backgroundColor: R.colors.secondaryBrand,
                      width: '40%',
                      paddingHorizontal: '1%',
                      marginHorizontal: "1%",
                      marginVertcal: "5%"
                    }}
                  />
                  <CButton
                    title={'Remove'}
                    onPress={() => setGalleryImage2({
                      url: null,
                      data: null,
                      mime: null,
                    })}
                    customStyle={{
                      backgroundColor: R.colors.secondaryBrand,
                      width: '40%',
                      paddingHorizontal: '1%',
                      marginHorizontal: "1%",
                      marginVertcal: "5%"
                    }}
                  />
                </View>}
              </View>
              <View
                style={{
                  alignItems: 'center',
                  backgroundColor: '#fff',
                  marginHorizontal: '5%',
                  borderRadius: 10,
                  marginTop: '4%',
                }}>
                {(galleryImage3.uri != null || galleryImage3.data != null) && <Image
                  source={{
                    uri:
                      galleryImage3.data != null
                        ? `data:${galleryImage3.mime};base64,${galleryImage3.data}`
                        : PROFILE_IMAGE_URL + galleryImage3.url,
                  }}
                  style={{
                    width: R.dimensions.wp(50),
                    height: R.dimensions.wp(50),
                    marginTop: '5%',
                  }}
                />}

                {(galleryImage3.uri == null && galleryImage3.data == null) ? <CButton
                  title={'Please Select Gallery Image 3'}
                  onPress={() => imageGalleryPicker3()}
                  customStyle={{
                    alignSelf: 'center',
                    backgroundColor: R.colors.secondaryBrand,
                  }}
                /> :
                  <View style={{ flexDirection: 'row', justifyContent: "space-around" }}>
                    <CButton
                      title={'Update'}
                      onPress={() => imageGalleryPicker3()}
                      customStyle={{
                        backgroundColor: R.colors.secondaryBrand,
                        width: '40%',
                        paddingHorizontal: '1%',
                        marginHorizontal: "1%",
                        marginVertcal: "5%"
                      }}
                    />
                    <CButton
                      title={'Remove'}
                      onPress={() => setGalleryImage3({
                        url: null,
                        data: null,
                        mime: null,
                      })}
                      customStyle={{
                        backgroundColor: R.colors.secondaryBrand,
                        width: '40%',
                        paddingHorizontal: '1%',
                        marginHorizontal: "1%",
                        marginVertcal: "5%"
                      }}
                    />
                  </View>}
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
                <Image
                  source={{
                    uri:
                      addressImage.data != null
                        ? `data:${addressImage.mime};base64,${addressImage.data}`
                        : PROFILE_IMAGE_URL + addressImage.url,
                  }}
                  style={{
                    width: R.dimensions.wp(50),
                    height: R.dimensions.wp(50),
                    marginTop: '5%',
                  }}
                />
                <CButton
                  title={'Update Address Image'}
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
                <Image
                  source={{
                    uri:
                      birthProof.data != null
                        ? `data:${birthProof.mime};base64,${birthProof.data}`
                        : PROFILE_IMAGE_URL + birthProof.url,
                  }}
                  style={{
                    width: R.dimensions.wp(50),
                    height: R.dimensions.wp(50),
                    marginTop: '5%',
                  }}
                />
                <CButton
                  title={'Update Birth Proof'}
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
          </>
        )
      }
    </View >
  );
};
