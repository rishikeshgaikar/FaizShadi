import React from 'react';
import { View, ScrollView } from 'react-native';
import TitleValue from './TitleValue';
export const ContactRoute = (props) => {
  let data = props.data;
  console.log('🚀 ~ file: BasicRoute.js ~ line 6 ~ BasicRoute ~ props', props);
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: 'lightgrey', paddingHorizontal: '5%' }}>
      <View style={{ marginTop: '10%' }}></View>
      <TitleValue
        title={'Contact Details - Name'}
        value={data.contactDetailName}
      />
      <TitleValue
        title={'Relation with Candidates'}
        value={data.relationshipWithCandidate}
      />
      <TitleValue title={'Contact Number 1'} value={data.contactNumber1} />
      <TitleValue title={'Contact Number 2'} value={data.contactNumber2} />
      <TitleValue title={'Contact - Email'} value={data.contactEmail} />
      <TitleValue title={'Country'} value={data.countryName} />
      <TitleValue title={'State'} value={data.stateName} />

      <TitleValue title={'City Name'} value={data.cityName} />

      <TitleValue title={'Street Address'} value={data.streetAddress} />

      {data.fullAddress == null ? null : (
        <TitleValue title={'Full Address'} value={data.fullAddress} />
      )}
    </ScrollView>
  );
};
