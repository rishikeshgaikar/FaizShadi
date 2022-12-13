import React from 'react';
import {View, ScrollView} from 'react-native';
import TitleValue from './TitleValue';
export const FamilyRoute = (props) => {
  let data = props.data;
  console.log('🚀 ~ file: BasicRoute.js ~ line 6 ~ BasicRoute ~ props', props);
  return (
    <ScrollView
      style={{flex: 1, backgroundColor: 'lightgrey', paddingHorizontal: '5%'}}>
      <View style={{marginTop: '10%'}}></View>
      <TitleValue title={'Father Name'} value={data.fatherName} />
      <TitleValue title={'Father Occupation'} value={data.fatherOccupation} />
      <TitleValue
        title={'Father Monthly Income'}
        value={data.fatherMonthlyIncome}
      />

      <TitleValue title={'Mother Name'} value={data.motherName} />
      <TitleValue title={'Mother Occupation'} value={data.motherOccupation} />
      <TitleValue
        title={'Mother Monthly Income'}
        value={data.motherMonthlyIncome}
      />
      <TitleValue
        title={'Total Family Members'}
        value={data.totalFamilyMembers}
      />
      <TitleValue title={'Maried Brothers'} value={data.marriedBrother} />
      <TitleValue title={'Unmarried Brother'} value={data.unmarriedBrother} />
      <TitleValue title={'Maried Sisters'} value={data.marriedSister} />
      <TitleValue title={'Unmarried Sisters'} value={data.unmarriedSister} />
    </ScrollView>
  );
};
