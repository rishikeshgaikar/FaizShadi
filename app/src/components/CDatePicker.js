import React from 'react'
import { View, Text } from 'react-native'
import R from "../R"
import DatePicker from 'react-native-datepicker'

export const CDatePicker = (props) => {
    return (
        <View style={{
            marginHorizontal: '5%',
            marginBottom: '5%',
        }}>
            <Text style={{
                marginBottom: '2%',
                fontSize: R.dimensions.wp(3.5),
                color: R.colors.primaryBlack,
                marginLeft: '1%',
                fontWeight: 'bold',
            }}>{props.title}<Text style={{ color: "red" }}>{props.isCompulsory ? "\t\t(*)" : ""}</Text>
            </Text>
            <View style={{
                backgroundColor: R.colors.primaryWhite,
                borderRadius: 8,
                paddingHorizontal: '5%',
                flex: 1,
                justifyContent: 'center',
                paddingVertical: '3%'
            }}>
                <DatePicker
                    style={{ width: 200 }}
                    date={props.date}
                    mode="date"
                    showIcon={false}
                    placeholder={props.placeholder}
                    format="DD/MM/YYYY"
                    maxDate={new Date()}
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                        alignSelf: 'flex-start',
                        alignItem: 'flex-start',
                        placeholderText: {
                            alignSelf: 'flex-start',
                        },
                        dateText: {
                            alignSelf: 'flex-start',
                        },
                        dateInput: {
                            borderWidth: 0,
                            alignSelf: 'flex-start'
                        }
                    }}
                    onDateChange={props.onDateChange}
                />
            </View>
            {props.showErrorText && (
                <Text style={{
                    marginTop: '2%',
                    marginHorizontal: '2%',
                    color: R.colors.primaryRed,
                    fontSize: R.dimensions.wp(3),
                }}>{props.errorText}</Text>
            )}
        </View>
    )
}

