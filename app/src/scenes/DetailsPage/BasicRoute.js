import React from 'react';
import { View, ScrollView } from 'react-native';
import moment from 'moment';

import TitleValue from './TitleValue';
export const BasicRoute = (props) => {
  let data = props.data;
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: 'lightgrey', paddingHorizontal: '5%' }}>
      <View style={{ marginTop: '10%' }}></View>
      <TitleValue title={'Surname'} value={data.surname} />
      <TitleValue title={'First Name'} value={data.firstName} />
      <TitleValue title={'Middle Name'} value={data.lastName} />
      <TitleValue title={'Email'} value={data.email} />
      <TitleValue title={'Gender'} value={data.gender} />
      <TitleValue title={'Age'} value={data.age} />
      <TitleValue
        title={'Date Of Birth'}
        value={moment(data?.dateOfBirth?.date).format('DD MM YYYY')}
      />
      <TitleValue title={'Caste'} value={data.casteName} />
      <TitleValue title={'Sub Caste'} value={data.subCasteName} />
      <TitleValue title={'Marital Status'} value={data.maritalStatus} />
      {data.maritalStatus != 'unmarried' && (
        <TitleValue title={'No Of Child'} value={data.noOfChild} />
      )}
      <TitleValue title={'Height'} value={data.height} />
      <TitleValue title={'Weight'} value={data.weight} />
      <TitleValue title={'Blood Group'} value={data.bloodGroup} />
      <TitleValue
        title={'Physically Handicapped'}
        value={data.physicallyHandicapped}
      />
    </ScrollView>
  );
};
