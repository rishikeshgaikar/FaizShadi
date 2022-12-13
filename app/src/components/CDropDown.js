import React, { useState, useEffect, useRef } from 'react';
import { View, Text } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown'
import FeatherIcon from 'react-native-vector-icons/Feather';
import R from '../R';

const CDropDown = (props) => {
  const [value, setValue] = useState("")
  const dropdownRef = useRef({});
  useEffect(() => {
    if (props.value == "") {
      dropdownRef.current.reset()
    }
    setValue(props.value)
    console.log("🚀 ~ file: CDropDown.js ~ line 11 ~ useEffect ~ props.value", props.value)
  }, [props.value])

  return (
    <View
      style={{
        marginHorizontal: '5%',
        marginBottom: '5%',

      }}>
      {props.title && (
        <Text
          style={{
            marginBottom: '2%',
            fontSize: R.dimensions.wp(3.5),
            color: R.colors.primaryBlack,
            marginLeft: '1%',
            fontWeight: 'bold',
          }}>
          {props.title}
          <Text style={{ color: 'red' }}>
            {props.isCompulsory ? '\t\t(*)' : ''}
          </Text>
        </Text>
      )}
      <View
        style={{
          backgroundColor: R.colors.primaryWhite,
          borderRadius: 8,
          paddingHorizontal: '5%',
          paddingVertical: '2%',
          flex: 1,
          borderColor: "#000",
          borderWidth: props.showBorder ? 1 : 0
        }}>
        <SelectDropdown
          ref={dropdownRef}
          dropdownStyle={{ width: "80%", }}
          buttonStyle={{ width: "100%", backgroundColor: R.colors.primaryWhite, alignSelf: 'flex-start' }}
          buttonTextStyle={{ fontSize: R.dimensions.wp(3.5), textAlign: "left", marginLeft: 0, paddingLeft: 0 }}
          rowTextStyle={{ fontSize: R.dimensions.wp(3.5), textAlign: 'left' }}
          defaultButtonText={value == "" ? props.label : value.toString().charAt(0).toUpperCase() + value.toString().slice(1)}
          renderDropdownIcon={(isOpened) => <FeatherIcon name={isOpened ? "chevron-up" : "chevron-down"} size={20} />}
          data={props.data}
          dropdownIconPosition={"right"}
          onSelect={props.onChangeText}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem[props.itemLabel]
          }}
          rowTextForSelection={(item, index) => {
            return item[props.itemLabel]
          }}
        />
      </View>
      {props.showErrorText && (
        <Text
          style={{
            marginTop: '2%',
            marginHorizontal: '2%',
            color: R.colors.primaryRed,
            fontSize: R.dimensions.wp(3),
          }}>
          {props.errorText}
        </Text>
      )}
    </View>
  );
};

export default CDropDown;
