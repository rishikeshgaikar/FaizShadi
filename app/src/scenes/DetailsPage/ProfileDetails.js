import React, { useState, useRef, useContext, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import axios from 'axios';

import Carousel, { Pagination } from 'react-native-snap-carousel';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useFocusEffect } from '@react-navigation/native';
//local imports
import R from '../../R';
import { Loader, RootView } from '../../components';
import { BasicRoute } from './BasicRoute';
import { CareerRoute } from './CareerRoute';
import { FamilyRoute } from './FamilyRoute';
import { ContactRoute } from './ContactRoute';
import { AuthContext } from '../../context/auth/AuthContext';
import {
  BASE_URL,
  PROFILE_IMAGE_URL,
  GALLERY_IMAGE_URL,
} from '../../utils/Constants';

export const ProfileDetails = ({ navigation, route }) => {
  console.log("🚀 ~ file: ProfileDetails.js ~ line 30 ~ ProfileDetails ~ route", route)
  let profileId = route.params.item;
  useFocusEffect(
    useCallback(() => {
      detailsAPI(profileId);
      setIndex(0)
    }, [profileId]),
  );
  const [showLoader, setShowLoader] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const carouselRef = useRef(null);
  const [index, setIndex] = useState(0);
  const { authState } = useContext(AuthContext);
  const [data, setData] = useState('');
  const [routes] = useState([
    { key: 'Basic', title: 'Basic' },
    { key: 'Career', title: 'Career' },
    { key: 'Family', title: 'Family' },
    { key: 'Contact', title: 'Contact' },
  ]);
  const renderScene = SceneMap({
    Basic: () => <BasicRoute data={data} />,
    Career: () => <CareerRoute data={data} />,
    Family: () => <FamilyRoute data={data} />,
    Contact: () => <ContactRoute data={data} />,
  });
  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: R.colors.primaryBrand }}
      style={{ backgroundColor: R.colors.primaryWhite, paddingVertical: 4 }}
      renderLabel={({ route, focused }) => (
        <Text
          style={[
            { color: focused ? R.colors.primaryBrand : R.colors.primaryGrey },
          ]}>
          {route.title}
        </Text>
      )}
    />
  );

  const renderCarouselImg = (itemImg) => {
    return (
      <View>
        <Image
          source={{
            uri: itemImg.item,
          }}
          resizeMode={'contain'}
          style={{ width: '100%', height: '100%' }}
        />
      </View>
    );
  };

  const renderGalleryModal = () => {
    let carouselData = [];
    var item = data;
    if (item.profileImage != null && item.profileImage != '') {
      carouselData.push(PROFILE_IMAGE_URL + item.profileImage);
    }
    if (item.galleryImage1 != null && item.galleryImage1 != '') {
      carouselData.push(PROFILE_IMAGE_URL + item.galleryImage1);
    }
    if (item.galleryImage2 != null && item.galleryImage2 != '') {
      carouselData.push(PROFILE_IMAGE_URL + item.galleryImage2);
    }
    if (item.galleryImage3 != null && item.galleryImage3 != '') {
      carouselData.push(PROFILE_IMAGE_URL + item.galleryImage3);
    }
    return (
      <Modal visible={showGalleryModal} animationType="fade" transparent={true}>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            backgroundColor: R.colors.modalBlack,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              flex: 0.5,
              width: '100%',
              flexDirection: 'row',
            }}>
            <View style={{ flex: 1 }}></View>
            <View
              style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Text
                style={{
                  color: R.colors.primaryWhite,
                  fontSize: R.dimensions.wp(4),
                  fontWeight: 'bold',
                }}>
                {activeIndex + 1} of {carouselData.length}
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: 'flex-end',
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                onPress={() => setShowGalleryModal(false)}
                style={{
                  backgroundColor: R.colors.primaryWhite,
                  borderRadius: 100,
                  padding: '1%',
                  margin: '2%',
                }}>
                <FeatherIcon name={'x'} size={R.dimensions.wp(6)} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ flex: 6 }}>
            <Carousel
              ref={carouselRef}
              layout={'default'}
              data={carouselData}
              sliderWidth={R.dimensions.wp('100%')}
              itemWidth={R.dimensions.wp('100%')}
              renderItem={renderCarouselImg}
              loop={true}
              onSnapToItem={(index) => setActiveIndex(index)}
            />
          </View>

          <View
            style={{
              flex: 0.5,
            }}></View>
        </View>
      </Modal>
    );
  };

  const detailsAPI = (profileId) => {
    var config = {
      method: 'get',
      url: BASE_URL + `/api/member/${profileId}`,
      headers: {
        Authorization: authState.userToken,
      },
    };
    setShowLoader(true)
    axios(config)
      .then(function (response) {
        setShowLoader(false)
        console.log(
          '🚀 ~ file: ProfileDetails.js ~ line 66 ~ response',
          response,
        );
        setData(response.data);
      })
      .catch(function (error) {
        setShowLoader(false)
        console.log(error);
      });
  };

  return (
    <RootView>
      <View style={styles.profileView}>
        <TouchableOpacity
          style={styles.imageContainer}
          onPress={() => setShowGalleryModal(true)}>
          <Image
            source={{
              uri: PROFILE_IMAGE_URL + data.profileImage,
            }}
            style={styles.imageView}
          />
        </TouchableOpacity>
        <Text style={styles.boldText}>
          {data.firstName + ' ' + data.surname}
        </Text>
        <Text style={styles.boldText}>{data.memberProfileId}</Text>
      </View>
      <View style={{ flex: 3 }}>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: 300 }}
          renderTabBar={renderTabBar}
        />
      </View>
      <Loader isVisible={showLoader} />
      {renderGalleryModal()}
    </RootView>
  );
};

const styles = StyleSheet.create({
  profileView: {
    flex: 1.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boldText: {
    fontSize: R.dimensions.wp(4),
    fontWeight: 'bold',
    marginTop: '2%',
    marginBottom: '1%',
  },
  imageContainer: {
    height: R.dimensions.wp(30),
    width: R.dimensions.wp(30),
    borderRadius: 100,
    overflow: 'hidden',
    borderColor: R.colors.primaryBrand,
    borderWidth: 1,
    alignSelf: 'center',
  },
  imageView: { height: R.dimensions.wp(30), width: R.dimensions.wp(30) },
});
