import React, { useState, useContext, useRef } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  ToastAndroid,
} from 'react-native';
//import ABC from '../../../CustomModule';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/FontAwesome';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import axios from 'axios';

import { AuthContext } from '../context/auth/AuthContext';
//local imports
import R from '../R';
import { PROFILE_IMAGE_URL, GALLERY_IMAGE_URL, BASE_URL } from '../utils/Constants';

export const MainCard = (props) => {
  let item = props.item;
  const { authState } = useContext(AuthContext);

  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const carouselRef = useRef(null);

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

  const deleteFav = (memberId) => {
    if (item.favouriteMember != 0) {
      var config = {
        method: 'delete',
        url: BASE_URL + `/api/favourite/remove/${memberId}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: authState.userToken,
        },
      };

      axios(config)
        .then(function (response) {
          ToastAndroid.show(
            'Removed from favorite',
            ToastAndroid.LONG,
            ToastAndroid.CENTER,
          );

          props?.deleteFavCallBack();
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
  const addFav = (memberId) => {
    if (item.favouriteMember != 0) {
      var config = {
        method: 'post',
        url: BASE_URL + `/api/favourite/add/${memberId}`,
        headers: {
          'Content-Type': 'application/json',

          Authorization: authState.userToken,
        },
      };
      axios(config)
        .then(function (response) {
          // ToastAndroid.showWithGravityAndOffset(
          //   'Added in favorite',
          //   ToastAndroid.SHORT,
          //   ToastAndroid.CENTER,
          // );
          ToastAndroid.show('Added in favorite', ToastAndroid.SHORT);
          props?.addFavCallBack();
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const renderGalleryModal = () => {
    let carouselData = [];
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
    <>
      <TouchableOpacity style={styles.mainView} onPress={props.onPress}>
        <TouchableOpacity onPress={() => setShowGalleryModal(true)}>
          <View style={styles.imageContainer}>
            <Image
              source={
                item.profileImage != null || item.profileImage != ''
                  ? { uri: PROFILE_IMAGE_URL + item.profileImage }
                  : R.images.defaultUser
              }
              style={styles.imageView}
            />
          </View>
        </TouchableOpacity>
        <View style={styles.textView}>
          <Text style={styles.nameText} numberOfLines={1} ellipsizeMode="tail">
            {item.firstName} {item.surname}
          </Text>
          <Text style={styles.otherText}>
            {item.age} Years, {item.height} ft
          </Text>
          <Text style={styles.otherText}>{item.maritalStatus}</Text>
          <Text style={styles.otherText}>{item.subCasteName}</Text>
          <Text style={styles.otherText} numberOfLines={2}>
            {item.occupation},{item.cityName}
          </Text>
          {/* <Text style={styles.otherText}></Text> */}
          <Text style={styles.otherText}>{item.memberProfileId}</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.heartView}
        onPress={() => {
          !item.favouriteMember
            ? addFav(item.memberId)
            : deleteFav(item.memberId);
        }}>
        {item.favouriteMember ? (
          <Icon name="heart" size={25} color={R.colors.primaryBrand} />
        ) : (
          <FeatherIcon
            name={'heart'}
            size={R.dimensions.wp(6)}
            color={R.colors.primaryBrand}
          />
        )}
      </TouchableOpacity>
      {renderGalleryModal()}
    </>
  );
};

const styles = StyleSheet.create({
  mainView: {
    marginHorizontal: '3%',
    marginVertical: '5%',
    backgroundColor: R.colors.primaryWhite,
    borderTopLeftRadius: 100,
    borderBottomLeftRadius: 100,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    flexDirection: 'row',
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    height: R.dimensions.wp(40),
    width: R.dimensions.wp(40),
    borderRadius: 100,
    overflow: 'hidden',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  imageView: { height: R.dimensions.wp(40), width: R.dimensions.wp(40) },
  textView: {
    paddingVertical: '3%',
    marginHorizontal: '2%',
    width: R.dimensions.wp(50),
  },
  nameText: {
    fontSize: R.dimensions.wp(4),
    fontWeight: 'bold',
  },
  otherText: { fontSize: R.dimensions.wp(4) },
  heartView: {
    backgroundColor: R.colors.primaryWhite,
    elevation: 7,
    position: 'absolute',
    bottom: 10,
    right: 20,
    padding: '2%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    tintColor: R.colors.primaryBrand,
  },
});
