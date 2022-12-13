import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
//local imports
import {DrawerNavigator} from './DrawerNavigator';
const Stack = createStackNavigator();

export const MainNavigator = ({navigation}) => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="HomeDrawer" component={DrawerNavigator} />
    </Stack.Navigator>
  );
};
