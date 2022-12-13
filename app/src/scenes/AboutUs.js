import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RootView } from '../components';
import R from '../R';

export const AboutUs = () => {
  return (
    <RootView>
      <Text
        style={{
          color: R.colors.primaryBrand,
          fontWeight: 'bold',
          fontSize: R.dimensions.wp(8),
          marginTop: '3%',
          textAlign: 'center',
        }}>
        About Faiz Marriage Bureau
      </Text>
      <Text
        style={{
          margin: '3%',
          textAlign: 'center',
          fontSize: R.dimensions.wp(4),
        }}>
        Welcome to Faiz Marriage Bureau (Matrimonial service by Faiz Young Circle).
        {'\n\n'}The main aim of Faiz Marriage Bureau is to awaken the young Muslim
        generation regarding the institution of marriage. In todays times, it is
        difficult for parents to find a prospective groom for their daughter,
        this is mainly because there exists an unfound belief that it is not
        right for them to approach eligible boys for their daughter(s).{'\n'}
        Faiz Marriage Bureau tries to eliminate this belief and offers a common ground
        for prospective grooms and brides where they can meet and exchange
        thoughts and ideas with each other. This forum is like the first step
        towards a long journey of a blissful married life.{'\n'}Faiz Marriage Bureau
        strives to collect a database of eligible boys and girls offering you a
        wide choice to choose your life partner from. Our staff is helpful and
        can guide you with your search.
      </Text>
    </RootView>
  );
};

const styles = StyleSheet.create({});
