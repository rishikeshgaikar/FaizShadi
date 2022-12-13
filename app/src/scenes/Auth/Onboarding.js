import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
//local imports
import AppIntroSlider from 'react-native-app-intro-slider';
import Icon from 'react-native-vector-icons/Ionicons';
import R from '../../R';

export const Onboarding = ({ navigation }) => {
  const slides = [
    {
      key: 1,
      title: 'Faiz Marriage Bureau',
      text: 'Create Profile with easy steps',

      backgroundColor: '#59b2ab',
    },
    {
      key: 2,
      title: 'Faiz Marriage Bureau',
      text: 'Meet your perfect partner right here',

      backgroundColor: '#febe29',
    },
  ];

  const renderItem = ({ item }) => {
    return (
      <ImageBackground
        source={R.images.couple}
        resizeMode="cover"
        style={{ height: '100%', width: '100%' }}>
        <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', flex: 1 }}>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 2,
            }}>
            {/* <Text style={{fontSize: R.dimensions.hp(7),paddingTop:'20%',marginBottom:'30%'}}>{item.title}</Text> */}
            <View style={{ flex: 1.2, justifyContent: 'flex-end' }}>
              <Image
                source={R.images.appLogo}
                style={{
                  height: R.dimensions.hp(10),
                  width: R.dimensions.hp(10),
                  alignSelf: 'center',
                }}
              />
            </View>

            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
              <Text
                style={{
                  fontSize: R.dimensions.hp(2.5),
                  textAlign: 'center',
                  justifyContent: 'center',
                  paddingBottom: '20%',

                  color: R.colors.primaryWhite,
                }}>
                {item.text}
              </Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    );
  };
  const renderNextButton = () => {
    return (
      <TouchableOpacity
        style={styles.buttonCircle}
        onPress={() => navigation.navigate('Login')}>
        <Text
          style={{
            padding: '20%',
            color: R.colors.primaryWhite,
            fontWeight: 'bold',
          }}>
          Skip
        </Text>
      </TouchableOpacity>
    );
  };
  const renderDoneButton = () => {
    return (
      <TouchableOpacity
        style={styles.buttonCircles}
        onPress={() => navigation.navigate('RegisterDetail')}>
        <Text
          style={{
            padding: '10%',
            color: R.colors.primaryWhite,
            fontWeight: 'bold',
          }}>
          Register
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <AppIntroSlider
      data={slides}
      renderItem={renderItem}
      renderDoneButton={renderDoneButton}
      renderNextButton={renderNextButton}
    />
  );
};

const styles = StyleSheet.create({
  buttonCircle: {
    width: R.dimensions.hp(7),
    height: R.dimensions.wp(10),
    backgroundColor: 'rgba(0, 0, 0, .5)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonCircles: {
    width: R.dimensions.hp(10),
    height: R.dimensions.wp(10),
    backgroundColor: 'rgba(0, 0, 0, .5)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  //[...]
});
