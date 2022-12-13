import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import ImagePicker from 'react-native-image-crop-picker';
//local imports
import R from '../../../R';
import { RootView } from '../../../components';
import { BasicRoute } from './../MyProfileRoutes/BasicRoute';
import { CareerRoute } from './../MyProfileRoutes/CareerRoute';
import { FamilyRoute } from './../MyProfileRoutes/FamilyRoute';
import { ContactRoute } from './../MyProfileRoutes/ContactRoute';

export const MyProfile = () => {
  const [index, setIndex] = useState(0);
  const [images, setImage] = useState(null);
  const [path, setPath] = useState('');
  const [routes] = useState([
    { key: 'Basic', title: 'Basic' },
    { key: 'Career', title: 'Career' },
    { key: 'Family', title: 'Family' },
    { key: 'Contact', title: 'Contact' },
  ]);
  const renderScene = SceneMap({
    Basic: BasicRoute,
    Career: CareerRoute,
    Family: FamilyRoute,
    Contact: ContactRoute,
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


  const gotoPickImage = () => {
    ImagePicker.openPicker({
      width: 400,
      height: 400,
      cropping: true,
      includeBase64: true,
      multiple: false,
    })
      .then((image) => {
        setPath(image.path)

        setImage(`data:image/png;base64,` + image.data);

      })
      .catch((e) => alert(e));
  };

  return (
    <RootView>
      <View style={styles.profileView}>
        <TouchableOpacity style={styles.imageContainer} onPress={() => gotoPickImage()}>
          <Image
            source={{ uri: path ? path : 'https://i.vimeocdn.com/portrait/58832_300x300.jpg' }}
            style={styles.imageView}
          />
        </TouchableOpacity>
        <Text style={styles.boldText}>First Name Last Name</Text>
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
