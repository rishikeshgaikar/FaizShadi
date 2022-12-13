import React from 'react';
import {StyleSheet, Text, View, Linking, TouchableOpacity} from 'react-native';
import {RootView} from '../components';
import FeatherIcon from 'react-native-vector-icons/Feather';
import R from '../R';

export const ContactUs = () => {
  return (
    <RootView>
      <View style={{margin: '3%'}}>
        <Text
          style={{
            color: R.colors.primaryBrand,
            fontWeight: 'bold',
            fontSize: R.dimensions.wp(8),
            marginTop: '3%',
            textAlign: 'center',
            paddingBottom: '5%',
          }}>
          Office Address
        </Text>
        <View style={styles.dividedView}>
          <FeatherIcon
            name={'map-pin'}
            size={R.dimensions.wp(6)}
            style={{paddingRight: '5%', alignSelf: 'center'}}
          />
          <Text>At&po: Kalla Taluka: Karjan Vadodara, Gujarat</Text>
        </View>

        <Text
          style={{
            color: R.colors.primaryBrand,
            fontWeight: 'bold',
            fontSize: R.dimensions.wp(8),
            marginTop: '3%',
            textAlign: 'center',
            paddingBottom: '5%',
          }}>
          Contact our Team
        </Text>

        <TouchableOpacity
          style={styles.dividedView}
          onPress={() => Linking.openURL('tel: +91-9723518311')}>
          <FeatherIcon
            name={'phone-call'}
            size={R.dimensions.wp(6)}
            style={{paddingRight: '5%'}}
          />
          <Text>+91-9723518311</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.dividedView}
          onPress={() => Linking.openURL('tel: +91-7202015946')}>
          <FeatherIcon
            name={'phone-call'}
            size={R.dimensions.wp(6)}
            style={{paddingRight: '5%'}}
          />
          <Text>+91-7202015946 </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.dividedView}
          onPress={() => Linking.openURL('mailto:info@faizshaadi.in')}>
          <FeatherIcon
            name={'mail'}
            size={R.dimensions.wp(6)}
            style={{paddingRight: '5%'}}
          />
          <Text>info@faizshaadi.in</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.dividedView}
          onPress={() => Linking.openURL('http://faizshaadi.in/')}>
          <FeatherIcon
            name={'link'}
            size={R.dimensions.wp(6)}
            style={{paddingRight: '5%'}}
          />
          <Text>http://faizshaadi.in/</Text>
        </TouchableOpacity>
      </View>
    </RootView>
  );
};

const styles = StyleSheet.create({
  dividedView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '5%',
  },
});
