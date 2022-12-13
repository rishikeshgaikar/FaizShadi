import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
//local imports
import { Onboarding } from '../scenes/Auth/Onboarding';
import { Login } from '../scenes/Auth/Login';
import { VerifyOTP } from '../scenes/Auth/VerifyOTP';
import { Register } from '../scenes/Auth/Register';
import { RegisterDetail } from '../scenes/Auth/RegisterDetail';
import { ForgotPassword } from '../scenes/Auth/ForgotPassword';

import { MyProfile } from '../scenes/Auth/MyProfileRoutes/MyProfile';
import { ThankYou } from '../scenes/Auth/ThankYou';
import { PrivacyPolicy } from '../scenes/PrivacyPolicy';
import { TermsAndConditions } from '../scenes/TermsAndConditions';
const Stack = createStackNavigator();

export const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="RegisterDetail" component={RegisterDetail} />
      <Stack.Screen name="VerifyOTP" component={VerifyOTP} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="MyProfile" component={MyProfile} />
      <Stack.Screen name="ThankYou" component={ThankYou} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} options={{ headerShown: true, title: "Privacy Policy" }} />
      <Stack.Screen name="TermsAndConditions" component={TermsAndConditions} options={{ headerShown: true, title: "Terms And Conditions" }} />
    </Stack.Navigator>
  );
};
