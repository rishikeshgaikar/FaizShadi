import React from 'react';
import { View, ScrollView } from 'react-native';

import TitleValue from '../DetailsPage/TitleValue';
export const CareerRoute = (props) => {
  let data = props.data;
  console.log('🚀 ~ file: BasicRoute.js ~ line 6 ~ BasicRoute ~ props', props);
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: 'lightgrey', paddingHorizontal: '5%' }}>
      <View style={{ marginTop: '10%' }}></View>
      {/* <TitleValue title={'Occupation'} value={data.occupation} /> */}
      <TitleValue title={'Monthly Income'} value={data.monthlyIncome} />
      <TitleValue title={'Education'} value={data.educationName} />
      <TitleValue title={'Occupation'} value={data.occupation} />
    </ScrollView>
  );
};
