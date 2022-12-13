import React from 'react';
import {View, Text} from 'react-native';
import R from '../../R';

const TitleValue = ({title, value}) => {
  return (
    <View>
      <Text style={{fontSize: R.dimensions.wp(4), color: R.colors.primaryGrey}}>
        {title}
      </Text>
      <Text style={{fontSize: R.dimensions.wp(4)}}>{value}</Text>
      <View
        style={{
          borderBottomWidth: 1,
          borderBottomColor: R.colors.primaryBlack,
          marginVertical: '5%',
        }}
      />
    </View>
  );
};

export default TitleValue;
