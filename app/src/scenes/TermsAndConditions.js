import { View, Text } from 'react-native'
import React from 'react'
import R from '../R'

export const TermsAndConditions = () => {
    return (
        <View style={{ flex: 1, marginHorizontal: "5%" }}>
            <Text style={{ color: R.colors.primaryBrand, fontSize: R.dimensions.hp(2.5), marginTop: "5%", marginBottom: "3%" }}>FAIZ MARRIAGE BUREAU Membership and rights of admission is reserved solely for :</Text>
            <Text style={{ fontSize: R.dimensions.hp(2) }}>{`• Indian Nationals & Citizens.\n• Persons of Indian Origin (PIO).\n• Non Resident Indians (NRI).\n• Persons of Indian Descent or Indian Heritage.\n• Persons who intend to marry persons of Indian Origin.`}</Text>
            <Text style={{ color: R.colors.primaryBrand, fontSize: R.dimensions.hp(2.5), marginTop: "5%", marginBottom: "3%" }}>Further in capacity as FAIZ MARRIAGE BUREAU member you confirm that you are :</Text>
            <Text style={{ fontSize: R.dimensions.hp(2) }}>
                {`•18 years or above (if you are a woman) or 21 years or above (if you are a man).\n• Legally competent to marry as per the law applicable to you , and Not prohibited or prevented by any applicable law for the time being in force from entering into a valid marriage.`}</Text>
        </View>
    )
}
