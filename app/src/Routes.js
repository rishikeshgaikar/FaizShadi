import React, {useContext, useEffect} from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
//local imports
import R from './R';
import {MainNavigator} from './navigation/MainNavigator';
import {AuthNavigator} from './navigation/AuthNavigator';
import {SplashScreen} from './scenes/Auth/SplashScreen';
import {AuthContext} from './context/auth/AuthContext';
const Stack = createStackNavigator();

export const RootNavigator = () => {
  const {authState, authAction} = useContext(AuthContext);
  useEffect(() => {
    const timer = setTimeout(() => {
      authAction.getData();
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <StatusBar backgroundColor={R.colors.primaryBrand} />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          {authState.isLoading ? (
            <Stack.Screen name="SplashScreen" component={SplashScreen} />
          ) : authState.userToken == null ? (
            <Stack.Screen name="AuthNavigator" component={AuthNavigator} />
          ) : (
            <Stack.Screen name="MainNavigator" component={MainNavigator} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};
