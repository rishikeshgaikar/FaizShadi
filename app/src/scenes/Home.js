import React, { useContext, useEffect, useCallback, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  Modal
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import axios from 'axios';

//local imports
import R from '../R';
import {
  RootView,
  MainCard,
  Loader,
  CDropDown,
  CButton,
  CTextInput,
} from '../components';
import { BASE_URL } from '../utils/Constants';
import { AuthContext } from '../context/auth/AuthContext';
import { useFocusEffect } from '@react-navigation/native';

export const Home = ({ navigation }) => {
  const { authState } = useContext(AuthContext);
  const [listData, setListData] = useState([]);
  const [filteredListData, setFilteredListData] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [filterPageNo, setFilterPageNo] = useState(1);
  const [flatListRefreshing, setFlatListRefreshing] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  const [filterApplied, setFilterApplied] = useState(false)

  const [isModalVisible, setModalVisible] = useState(false);
  const [countryList, setCountryList] = useState([]);
  const [countryId, setCountryId] = useState('');
  const [stateList, setStateList] = useState([]);
  const [stateId, setStateId] = useState('');
  const [cityList, setCityList] = useState([]);
  const [cityId, setCityId] = useState('');
  const [educationList, setEducationList] = useState([]);
  const [educationId, setEducationId] = useState('');
  const [casteList, setCasteList] = useState([]);
  const [casteId, setCasteId] = useState('');
  const [subCasteList, setSubCasteList] = useState([]);
  const [subCasteId, setSubCasteId] = useState('');

  const MARITAL_STATUS_OPTIONS_ARRAY = [
    { id: 1, label: 'Unmarried', value: 'unmarried' },
    { id: 2, label: 'Divorced', value: 'divorced' },
    { id: 3, label: 'Widowed', value: 'widowed' },
  ];

  useFocusEffect(
    useCallback(() => {
      getDataApiCall();
    }, []),
  );

  useEffect(() => {
    getCountryList();
    getEducationList();
    getCasteList();
  }, []);

  const [inputData, setInputData] = useState({
    maritalStatus: "",
    fromAge: "",
    toAge: '',
    caste: '',
    subCaste: '',
    country: "",
    state: "",
    city: "",
    education: "",
    firstName: "",
    surname: "",
    memberProfileId: ""
  })

  const handleOnChange = (name, value) => {
    setInputData({ ...inputData, [name]: value });
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
  const getDataApiCall = () => {
    setShowLoader(true);
    let url = BASE_URL + `/api/members-list?page=${pageNo}`;
    let config = {
      method: 'get',
      url: url,
      headers: {
        'Content-Type': 'application/json',
        Authorization: authState.userToken,
      },
    };
    axios(config)
      .then((response) => {
        console.log(
          '🚀 ~ file: Home.js ~ line 43 ~ .then ~ response',
          response,
        );
        setShowLoader(false);
        let data = response.data;
        let finalData = [...listData, ...data];
        setListData(finalData);
        setPageNo(pageNo + 1);
      })
      .catch((error) => {
        setShowLoader(false);
        console.log(error);
      });
  };
  const getFilteredDataApiCall = (pageNumber) => {
    setShowLoader(true);
    let filteredurl = BASE_URL + `/api/members-list?first_name=${inputData.firstName}&member_profile_id=${inputData.memberProfileId}&marital_status=${inputData.maritalStatus}&education=${educationId}&country=${countryId}&state=${stateId}&city=${cityId}&age_from=${inputData.fromAge}&age_to=${inputData.toAge}&page=${pageNumber}`;
    let config = {
      method: 'get',
      url: filteredurl,
      headers: {
        'Content-Type': 'application/json',
        Authorization: authState.userToken,
      },
    };
    console.log("🚀 ~ file: Home.js ~ line 185 ~ getDataApiCall ~ config", config)
    axios(config)
      .then((response) => {
        console.log(
          '🚀 ~ file: Home.js ~ line 43 ~ .then ~ response',
          response,
        );
        setShowLoader(false);
        let data = response.data;
        let finalData = pageNumber > 1 ? [...filteredListData, ...data] : [...data];
        console.log("🚀 ~ file: Home.js ~ line 224 ~ .then ~ finalData", finalData)
        setFilteredListData(finalData);
        setFilterPageNo(filterPageNo + 1);
      })
      .catch((error) => {
        setShowLoader(false);
        console.log(error);
      });
  };


  const renderFooter = () => {
    if (flatListRefreshing) {
      return (
        <View
          style={{
            height: R.dimensions.hp(10),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator
            size={'large'}
            color={R.colors.primaryBrand}
            style={{ height: 30, width: 40 }}
          />
        </View>
      );
    } else {
      return null;
    }
  };

  const handleFavToggle = (item, isFav) => {
    let testData = filterApplied ? [...filteredListData] : [...listData];
    if (isFav) {
      testData.map((e) => {
        if (e.memberProfileId == item.memberProfileId) {
          e.favouriteMember = 1;
        }
      });
    } else {
      testData.map((e) => {
        if (e.memberProfileId == item.memberProfileId) {
          e.favouriteMember = null;
        }
      });
    }
    filterApplied ? setFilteredListData(testData) : setListData(testData);
  };

  const renderFilterModal = () => {
    return <Modal visible={isModalVisible} style={{ flex: 1, width: "100%" }}>
      <View style={{ flex: 1, backgroundColor: 'white', }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View
            style={{
              flexDirection: 'row',
              marginTop: '3%', marginHorizontal: '5%'
            }}>
            <Text style={{ fontWeight: 'bold', fontSize: R.dimensions.hp(3) }}>
              Filter
            </Text>
            <View
              style={{
                flex: 1,
                alignItems: 'flex-end',
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={{
                  backgroundColor: R.colors.primaryBrand,
                  borderRadius: 100,
                  padding: '1%',
                  margin: '2%',
                }}>
                <FeatherIcon name={'x'} size={R.dimensions.wp(6)} />
              </TouchableOpacity>
            </View>
          </View>
          <CTextInput
            showBorder={true}
            title={'First Name '}
            value={inputData.firstName}
            placeholder={'First Name'}
            onChangeText={(text) => handleOnChange("firstName", text)}
          />
          {/* <CTextInput
            showBorder={true}
            title={'Surname'}
            value={inputData.surname}
            placeholder={'Surname'}
            onChangeText={(text) => handleOnChange("surname", text)}
          /> */}
          <CTextInput
            showBorder={true}
            title={'Member Profile Id'}
            value={inputData.memberProfileId}
            placeholder={'Member Profile Id'}
            onChangeText={(text) => handleOnChange("memberProfileId", text)}
          />

          <CDropDown
            showBorder={true}
            value={inputData.maritalStatus}
            data={MARITAL_STATUS_OPTIONS_ARRAY}
            title={'Marital Status'}
            itemLabel={'label'}
            label={'Select Marital Status'}
            onChangeText={(selectedItem, index) =>
              handleOnChange('maritalStatus', selectedItem.value)
            }
          />

          <Text style={{
            marginBottom: '2%',
            fontSize: R.dimensions.wp(3.5),
            color: R.colors.primaryBlack,
            marginLeft: '1%',
            fontWeight: 'bold',
            marginLeft: '5%',
          }}>Age</Text>
          <View style={{ flexDirection: 'row', marginHorizontal: '2.5%' }}>
            <View style={{ flex: 1 }}>
              <CTextInput
                showBorder={true}
                title={'From'}
                value={inputData.fromAge}
                placeholder={'From'}
                onChangeText={(text) => handleOnChange("fromAge", text)}
                keyboardType={"numeric"}
              />
            </View>
            <View style={{ flex: 1 }}>
              <CTextInput
                showBorder={true}
                title={'To'}
                value={inputData.toAge}
                placeholder={'To'}
                onChangeText={(text) => handleOnChange("toAge", text)}
                keyboardType={"numeric"}
              />
            </View>
          </View>
          <CDropDown
            showBorder={true}
            value={inputData.country}
            data={countryList}
            title={'Country'}
            itemLabel={'name'}
            label={'Select Country'}
            onChangeText={(selectedItem, index) => {
              setInputData({ ...inputData, country: selectedItem.name, state: "", city: "" })
              getStateList(selectedItem.countryId);
              setCountryId(selectedItem.countryId);
            }}
            labelExtractor={({ name }) => name}
            valueExtractor={({ countryId }) => countryId}
          />
          <CDropDown
            showBorder={true}
            value={inputData.state}
            data={stateList}
            title={'State'}
            itemLabel={'name'}
            label={'Select State'}
            onChangeText={(selectedItem, index) => {
              setInputData({ ...inputData, state: selectedItem.name, city: "" })
              setStateId(selectedItem.stateId);
              getCityList(selectedItem.stateId);
            }}
            labelExtractor={({ name }) => name}
            valueExtractor={({ stateId }) => stateId}
          />
          <CDropDown
            showBorder={true}
            value={inputData.city}
            data={cityList}
            title={'City'}
            itemLabel={"name"}
            label={'Select City'}
            onChangeText={(selectedItem, index) => {
              handleOnChange('city', selectedItem.name);
              setCityId(selectedItem.cityId);
            }}
            labelExtractor={({ name }) => name}
            valueExtractor={({ cityId }) => cityId}
          />
          <CDropDown
            showBorder={true}
            value={inputData.education}
            data={educationList}
            title={'Education'}
            itemLabel={'name'}
            label={'Select Education'}
            onChangeText={(selectedItem, index) => {
              handleOnChange('education', selectedItem.name);
              setEducationId(selectedItem.educationId);
            }}
            labelExtractor={({ name }) => name}
            valueExtractor={({ educationId }) => educationId}
          />

          {/* <CDropDown
            showBorder={true}
            value={inputData.caste}
            data={casteList}
            itemLabel={'casteName'}
            title={'Caste'}
            label={'Select Caste'}
            onChangeText={(selectedItem, index) => {
              handleOnChange('caste', selectedItem.casteName);
              setCasteId(selectedItem.casteId);
              getSubCasteList(selectedItem.casteId);
            }}
            labelExtractor={({ casteName }) => casteName}
            valueExtractor={({ casteId }) => casteId}
          />

          <CDropDown
            showBorder={true}
            value={inputData.subCaste}
            data={subCasteList}
            title={'Sub Caste'}
            itemLabel={'subCasteName'}
            label={'Select Sub Caste'}
            onChangeText={(selectedItem, index) => {
              handleOnChange('subCaste', selectedItem.subCasteName);
              setSubCasteId(selectedItem.subCasteId);
            }}
            labelExtractor={({ subCasteName }) => subCasteName}
            valueExtractor={({ subCasteId }) => subCasteId}
          /> */}
          {filterApplied ?
            <View style={{ flexDirection: "row" }}>
              <View style={{ flex: 1 }}>
                <CButton
                  title={'Apply'}
                  onPress={() => {
                    setModalVisible(false);
                    setFilteredListData([])
                    getFilteredDataApiCall(1)
                  }}
                  customStyle={{ alignSelf: 'center', marginTop: '10%' }}
                />
              </View>
              <View style={{ flex: 1 }}>
                <CButton
                  title={'Clear'}
                  onPress={() => {
                    setModalVisible(false);
                    setPageNo(1)
                    setFilterPageNo(1)
                    setFilteredListData([])
                    setFilterApplied(false)
                    getDataApiCall()
                    setCountryId('')
                    setStateId('')
                    setCityId('')
                    setEducationId('')
                    setInputData({
                      maritalStatus: "",
                      fromAge: "",
                      toAge: '',
                      caste: '',
                      subCaste: '',
                      country: "",
                      state: "",
                      city: "",
                      education: "",
                      firstName: "",
                      surname: "",
                      memberProfileId: ""
                    })
                  }}
                  customStyle={{ alignSelf: 'center', marginTop: '10%' }}
                />
              </View>
            </View>
            :
            <CButton
              title={'Apply'}
              onPress={() => {
                setModalVisible(false);
                setPageNo(1)
                setListData([])
                setFilterApplied(true)
                setFilteredListData([])
                getFilteredDataApiCall(1)
              }}
              customStyle={{ alignSelf: 'center', marginTop: '10%' }}
            />}
        </ScrollView>
      </View>
    </Modal>
  }

  return (
    <RootView>
      <FlatList
        data={filterApplied ? filteredListData : listData}
        extraData={filterApplied ? filteredListData : listData}
        renderItem={(item) => (
          (
            <MainCard
              onPress={() =>
                navigation.navigate('ProfileDetails', {
                  item: item.item.memberId,
                })
              }
              item={item.item}
              deleteFavCallBack={() => handleFavToggle(item.item, false)}
              addFavCallBack={() => handleFavToggle(item.item, true)}
            />
          )
        )}
        onEndReached={() =>
          filterApplied
            ? filteredListData.length > 4
              ? getFilteredDataApiCall(filterPageNo)
              : null
            : listData.length > 4
              ? getDataApiCall()
              : null}

        onEndReachedThreshold={0.2}
        keyExtractor={(item) => item.memberProfileId.toString()}
        ListFooterComponent={renderFooter()}
        ListEmptyComponent={() => <Text
          style={{
            textAlign: 'center',
            fontSize: 18,
            fontWeight: 'bold',
            paddingTop: 20,
          }}>
          {filterApplied ? "No Data Found" : ""}
        </Text>}
      />
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          height: R.dimensions.hp(8),
          elevation: 5,
          backgroundColor: R.colors.primaryWhite,
        }}>
        <TouchableOpacity
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          onPress={() => navigation.navigate('Favorites')}>
          <FeatherIcon name={'heart'} size={R.dimensions.wp(6)} />
          <Text style={{ fontSize: R.dimensions.wp(3) }}>Favorites</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <FeatherIcon
            name={'filter'}
            size={R.dimensions.wp(6)}
          />
          <Text style={{ fontSize: R.dimensions.wp(3) }}>Filter</Text>
        </TouchableOpacity>
        <View
          style={{
            position: 'absolute',
            top: -24,
            left: 0,
            right: 0,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              backgroundColor: R.colors.primaryBrand,
              padding: '4%',
              borderRadius: 100,
              borderWidth: 6,
              borderColor: '#fff',
            }}>
            <FeatherIcon
              name={'home'}
              size={R.dimensions.wp(7)}
              color={R.colors.primaryWhite}
            />
          </View>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}></View>
        <TouchableOpacity
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          onPress={() => navigation.navigate('AboutUs')}>
          <FeatherIcon name={'file-text'} size={R.dimensions.wp(6)} />
          <Text style={{ fontSize: R.dimensions.wp(3) }}>About Us</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          onPress={() => navigation.navigate('MyProfile')}>
          <FeatherIcon name={'user'} size={R.dimensions.wp(6)} />
          <Text style={{ fontSize: R.dimensions.wp(3) }}>My Profile</Text>
        </TouchableOpacity>
      </View>
      <Loader isVisible={showLoader} />
      {renderFilterModal()}
    </RootView>
  );
};
