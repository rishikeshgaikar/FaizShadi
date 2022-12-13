import React, { useState, useRef, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import ImagePicker from 'react-native-image-crop-picker';

import Carousel, { Pagination } from 'react-native-snap-carousel';
import FeatherIcon from 'react-native-vector-icons/Feather';
//local imports
import R from '../R';
import { RootView } from '../components';
import { BasicRoute } from './MyProfileRoutes/BasicRoute';
import { CareerRoute } from './MyProfileRoutes/CareerRoute';
import { FamilyRoute } from './MyProfileRoutes/FamilyRoute';
import { ContactRoute } from './MyProfileRoutes/ContactRoute';
import { AuthContext } from '../context/auth/AuthContext';
import { PROFILE_IMAGE_URL, GALLERY_IMAGE_URL } from '../utils/Constants';

export const MyProfile = () => {
  const { authState } = useContext(AuthContext);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const carouselRef = useRef(null);
  console.log('--=====', authState);
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'Basic', title: 'Basic' },
    { key: 'Career', title: 'Career' },
    { key: 'Family', title: 'Family' },
    { key: 'Contact', title: 'Contact' },
  ]);

  const renderCarouselImg = (itemImg) => {
    return (
      <Image
        source={{
          uri: itemImg.item,
        }}
        resizeMode={'contain'}
        style={{ width: '100%', height: '100%' }}
      />
    );
  };

  const renderScene = SceneMap({
    Basic: () => <BasicRoute data={authState?.userObject} />,
    Career: () => <CareerRoute data={authState?.userObject} />,
    Family: () => <FamilyRoute data={authState?.userObject} />,
    Contact: () => <ContactRoute data={authState?.userObject} />,
  });
  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: '#6200ee' }}
      style={{ backgroundColor: 'white', paddingVertical: 4 }}
      renderLabel={({ route, focused }) => (
        <Text style={[{ color: focused ? '#6200ee' : 'gray' }]}>
          {route.title}
        </Text>
      )}
    />
  );

  const renderGalleryModal = () => {
    let carouselData = [];
    var item = authState.userObject;
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

  return (
    <RootView>
      <View style={styles.profileView}>
        <TouchableOpacity
          style={styles.imageContainer}
          onPress={() => setShowGalleryModal(true)}>
          <Image
            source={
              authState?.userObject?.profileImage != null ||
                authState?.userObject?.profileImage != ''
                ? { uri: PROFILE_IMAGE_URL + authState?.userObject?.profileImage }
                : R.images.defaultUser
            }
            style={styles.imageView}
          />
        </TouchableOpacity>
        <Text style={styles.boldText}>
          {authState?.userObject?.firstName} {authState?.userObject?.surname}
        </Text>
        <Text style={styles.boldText}>{authState?.userObject?.memberProfileId}</Text>
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

      {renderGalleryModal()}
    </RootView>
  );
};

const styles = StyleSheet.create({
  profileView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boldText: {
    fontSize: R.dimensions.wp(4),
    fontWeight: 'bold',
    marginTop: '2%',
  },
  imageContainer: {
    height: R.dimensions.wp(30),
    width: R.dimensions.wp(30),
    borderRadius: 100,
    overflow: 'hidden',
    borderColor: R.colors.primaryBrand,
    borderWidth: 2,
    alignSelf: 'center',
  },
  imageView: { height: R.dimensions.wp(30), width: R.dimensions.wp(30) },
});
