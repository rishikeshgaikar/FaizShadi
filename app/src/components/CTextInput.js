import React, { useState } from 'react';
import { TextInput, StyleSheet, Text, View, Platform } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
//local imports
import R from '../R';

export const CTextInput = props => {
  const [IsFocus, setIsFocus] = useState(false);
  const [HidePassword, setHidePassword] = useState(true);

  const handleOnFocus = () => {
    setIsFocus(true);
  };
  const handleOnBlur = () => {
    setIsFocus(false);
  };
  return (
    <View style={styles.mainView}>
      {props.title && <Text style={styles.textInputTitle}>{props.title}<Text style={{ color: "red" }}>{props.isCompulsory ? "\t\t(*)" : ""}</Text></Text>}
      <View style={[styles.textInputStyleView, { borderWidth: props.showBorder ? 1 : 0 }]}>
        <TextInput
          style={styles.textInputStyle}
          defaultValue={props.defaultValue}
          onChangeText={props.onChangeText}
          placeholder={props.placeholder}
          keyboardType={props.keyboardType}
          secureTextEntry={props.secureTextEntry}
          value={props.value}
          ref={props.ref}
          autoCapitalize={'none'}
          textAlignVertical={'top'}
          multiline={props.multiline}
          onEndEditing={props.onEndEditing}
          autoFocus={props.autoFocus}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
          editable={props.editable}
          numberOfLines={props.numberOfLines}
          underlineColorAndroid="transparent"
          placeholderTextColor={R.colors.primaryGrey}
          secureTextEntry={props.secureTextEntry ? HidePassword : false}
          maxLength={props.maxLength}
          minHeight={
            Platform.OS === 'ios' && props.numberOfLines
              ? 20 * props.numberOfLines
              : null
          }
        />
        {props.secureTextEntry ? (
          <View style={styles.secureTextEntry}>
            <FeatherIcon
              name={HidePassword ? 'eye-off' : 'eye'}
              size={R.dimensions.hp('2.6%')}
              onPress={() => setHidePassword(!HidePassword)}
              style={{ paddingHorizontal: '2%' }}
            />
          </View>
        ) : null}
      </View>
      {props.showErrorText && (
        <Text style={styles.errorText}>{props.errorText}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    marginHorizontal: '5%',
    marginBottom: '5%',
  },
  textInputStyleView: {
    backgroundColor: R.colors.primaryWhite,
    borderRadius: 8,
  },
  textInputTitle: {
    marginBottom: '2%',
    fontSize: R.dimensions.wp(3.5),
    color: R.colors.primaryBlack,
    marginLeft: '1%',
    fontWeight: 'bold',
  },
  textInputStyle: {
    width: '90%',
    marginHorizontal: '5%',
    color: R.colors.primaryBlack,
    marginBottom: Platform.OS == 'ios' ? '5%' : '1%',
    marginTop: Platform.OS == 'ios' ? '5%' : '3%',
    fontSize: R.dimensions.wp(3.5),
  },
  errorText: {
    marginTop: '2%',
    marginHorizontal: '2%',
    color: R.colors.primaryRed,
    fontSize: R.dimensions.wp(3),
  },
  secureTextEntry: {
    position: 'absolute',
    right: '5%',
    bottom: 0,
    top: 0,
    backgroundColor: R.colors.PrimaryWhite,
    justifyContent: 'center',
  },
});
