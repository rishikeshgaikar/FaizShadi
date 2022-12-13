import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
// local imports
import { CustomDrawer } from '../components';
import { Home } from '../scenes/Home';
import { CustomHeader } from '../components';
import { MyProfile } from '../scenes/MyProfile';
import { MyAccount } from '../scenes/MyAccount';
import { Favorites } from '../scenes/Favorites';
import { AboutUs } from '../scenes/AboutUs';
import { ContactUs } from '../scenes/ContactUs';

import { ChangePassword } from '../scenes/ChangePassword';
import { ProfileDetails } from '../scenes/DetailsPage/ProfileDetails';
import R from '../R';
import { EditProfile } from '../scenes/EditProfile';
const Drawer = createDrawerNavigator();

export const DrawerNavigator = ({ navigation }) => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: true,
      }}
      drawerStyle={{
        width: '60%',
      }}
      drawerContent={(props) => <CustomDrawer {...props} />}>
      <Drawer.Screen
        name={'Home'}
        component={Home}
        options={{
          header: () => <CustomHeader title={'Home'} navigation={navigation} />,
        }}
      />
      <Drawer.Screen
        name={'MyProfile'}
        component={MyProfile}
        options={{
          header: () => (
            <CustomHeader
              title={'My Profile'}
              navigation={navigation}
              showEdit={true}
            />
          ),
        }}
      />
      <Drawer.Screen
        name={'MyAccount'}
        component={MyAccount}
        options={{
          header: () => (
            <CustomHeader title={'My Account'} navigation={navigation} />
          ),
        }}
      />
      <Drawer.Screen
        name={'Favorites'}
        component={Favorites}
        options={{
          header: () => (
            <CustomHeader title={'Favorites'} navigation={navigation} />
          ),
        }}
      />
      <Drawer.Screen
        name={'AboutUs'}
        component={AboutUs}
        options={{
          header: () => (
            <CustomHeader title={'About Us'} navigation={navigation} />
          ),
        }}
      />
      <Drawer.Screen
        name={'ContactUs'}
        component={ContactUs}
        options={{
          header: () => (
            <CustomHeader title={'Contact Us'} navigation={navigation} />
          ),
        }}
      />
      <Drawer.Screen
        name={'ChangePassword'}
        component={ChangePassword}
        options={{
          header: () => (
            <CustomHeader title={'Change Password'} navigation={navigation} />
          ),
        }}
      />
      <Drawer.Screen
        name="ProfileDetails"
        component={ProfileDetails}
        options={{
          header: () => (
            <CustomHeader title={'Profile Details'} navigation={navigation} />
          ),
        }}
      />
      <Drawer.Screen
        name={'EditProfile'}
        component={EditProfile}
        options={{
          header: () => (
            <CustomHeader title={'Edit Profile'} navigation={navigation} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};
