import React from 'react';
import { AuthContext } from './AuthContext';
import { AuthReducer } from './AuthReducer';
import AsyncStorage from '@react-native-community/async-storage';
import {
  RETRIEVE_TOKEN,
  SIGN_OUT,
  SIGN_IN,
  SIGN_UP,
  SET_PROFILE,
} from './AuthActionTypes';

export const AuthProvider = (props) => {
  const initialAuthState = {
    isLoading: true,
    userToken: null,
    userId: null,
    userObject: null,
    isLoggedOut: false,
  };
  const [authState, dispatch] = React.useReducer(AuthReducer, initialAuthState);

  const authAction = React.useMemo(
    () => ({
      signIn: async (userInfo) => {
        let finalObj = { ...authState, ...userInfo };
        console.log("🚀 ~ file: AuthProvider.js ~ line 27 ~ signIn: ~ finalObj", finalObj)
        try {
          const jsonObj = JSON.stringify(finalObj);
          await AsyncStorage.setItem('userInfo', jsonObj);
        } catch (e) {
          console.log(e);
        }
        dispatch({ type: SIGN_IN, payload: finalObj });
      },
      signUp: async (userInfo) => {
        try {
          const jsonObj = JSON.stringify(userInfo);
          await AsyncStorage.setItem('userInfo', jsonObj);
        } catch (e) {
          console.log(e);
        }
        dispatch({ type: SIGN_UP, payload: userInfo });
      },
      signOut: async () => {
        let finalObj = { ...initialAuthState, isLoggedOut: true };
        try {
          const jsonObj = JSON.stringify(finalObj);
          await AsyncStorage.setItem('userInfo', jsonObj);
        } catch (e) {
          console.log(e);
        }
        dispatch({ type: SIGN_OUT });
      },
      getData: async () => {
        try {
          let userInfo = await AsyncStorage.getItem('userInfo');
          console.log(
            '🚀 ~ file: AuthProvider.js ~ line 55 ~ getData: ~ userInfo',
            userInfo,
          );
          var userObj = JSON.parse(userInfo);
        } catch (e) {
          console.log(e);
        }
        dispatch({ type: RETRIEVE_TOKEN, payload: userObj });
      },
      setProfile: async (userInfo) => {
        console.log("🚀 ~ file: AuthProvider.js ~ line 79 ~ setProfile: ~ userInfo", userInfo)
        let finalObj = { ...userInfo };
        try {
          const jsonObj = JSON.stringify(finalObj);
          await AsyncStorage.setItem('userInfo', jsonObj);
        } catch (e) {
          console.log(e);
        }
        dispatch({ type: SET_PROFILE, payload: finalObj });
      },
    }),
    [],
  );

  return (
    <AuthContext.Provider value={{ authState, authAction, dispatch }}>
      {props.children}
    </AuthContext.Provider>
  );
};
