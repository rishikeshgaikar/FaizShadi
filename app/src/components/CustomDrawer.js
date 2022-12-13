import React, { useContext } from 'react';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
//local imports
import R from '../R';
import { CButton } from './CButton';
import { AuthContext } from '../context/auth/AuthContext';
import { PROFILE_IMAGE_URL } from '../utils/Constants';

export const CustomDrawer = (props) => {
  const { authState, authAction } = useContext(AuthContext);

  const drawerItems = [
    { id: 0, title: 'Dashboard', image: R.images.dashboard, navigation: 'Home' },
    {
      id: 1,
      title: 'My Profile',
      image: R.images.myProfile,
      navigation: 'MyProfile',
    },
    {
      id: 2,
      title: 'My Account',
      image: R.images.myAccount,
      navigation: 'MyAccount',
    },
    {
      id: 3,
      title: 'Favorites',
      image: R.images.favorites,
      navigation: 'Favorites',
    },
    {
      id: 4,
      title: 'About Us',
      image: R.images.aboutUs,
      navigation: 'AboutUs',
    },
    {
      id: 5,
      title: 'Contact Us',
      image: R.images.conatctUs,
      navigation: 'ContactUs',
    },
    {
      id: 6,
      title: 'Change Password',
      image: R.images.password,
      navigation: 'ChangePassword',
    },
  ];

  return (
    <SafeAreaView style={styles.mainView}>
      <View style={styles.triangleCorner} />
      <View style={styles.triangleCorner2} />
      <View style={styles.profileView}>
        <View style={styles.imageContainer}>
          <Image
            source={
              authState?.userObject?.profileImage != null ||
                authState?.userObject?.profileImage != ''
                ? { uri: PROFILE_IMAGE_URL + authState?.userObject?.profileImage }
                : R.images.defaultUser
            }
            style={styles.imageView}
          />
        </View>
        <View style={styles.profileTexts}>
          <Text style={styles.boldText}>
            {authState?.userObject?.firstName}
          </Text>
          <Text style={styles.boldText}>{authState?.userObject?.surname}</Text>
          <Text>{authState?.userObject?.contactNumber1}</Text>
        </View>
      </View>
      <DrawerContentScrollView {...props}>
        {drawerItems.map((item) => {
          return (
            <TouchableOpacity
              onPress={() => props.navigation.navigate(item.navigation)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: '5%',
                backgroundColor:
                  item.id == props.state.index
                    ? R.colors.primaryBrand
                    : R.colors.primaryWhite,
              }}>
              <Image
                source={item.image}
                resizeMode={'contain'}
                tintColor={
                  item.id == props.state.index
                    ? R.colors.primaryWhite
                    : R.colors.primaryBlack
                }
                style={{
                  width: R.dimensions.wp(5),
                  height: R.dimensions.wp(5),
                  marginHorizontal: '5%',
                }}></Image>
              <Text
                style={{
                  marginLeft: '3%',
                  fontSize: R.dimensions.wp(5),
                  color:
                    item.id == props.state.index
                      ? R.colors.primaryWhite
                      : R.colors.primaryBlack,
                }}>
                {item.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </DrawerContentScrollView>
      <CButton title={'Log Out'} onPress={() => authAction.signOut()} />
      <Text style={styles.versionText}>Version 0.0.1</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  triangleCorner: {
    position: 'absolute',
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderRightWidth: 50,
    borderTopWidth: 50,
    borderRightColor: 'transparent',
    borderTopColor: R.colors.primaryBrand,
    zIndex: -1,
    transform: [{ rotate: '90deg' }],
    right: 0,
    top: 0,
  },
  triangleCorner2: {
    position: 'absolute',
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderRightWidth: 50,
    borderTopWidth: 50,
    borderRightColor: 'transparent',
    borderTopColor: 'rgba(0, 0, 0, 0.4)',
    zIndex: -1,
    transform: [{ rotate: '90deg' }],
    right: 0,
    top: 0,
  },
  mainView: {
    flex: 1,
  },
  profileView: {
    flexDirection: 'row',
    paddingBottom: '5%',
    marginHorizontal: '5%',
    marginTop: '5%',
  },
  profileTexts: {
    justifyContent: 'center',
    marginHorizontal: '5%',
  },
  boldText: {
    fontSize: R.dimensions.wp(4),
    fontWeight: 'bold',
  },
  imageContainer: {
    height: R.dimensions.wp(25),
    width: R.dimensions.wp(25),
    borderRadius: 100,
    overflow: 'hidden',
    borderColor: R.colors.primaryBrand,
    borderWidth: 1,
    alignSelf: 'center',
  },
  imageView: { height: R.dimensions.wp(25), width: R.dimensions.wp(25) },
  versionText: { textAlign: 'center', marginBottom: '5%' },
});
