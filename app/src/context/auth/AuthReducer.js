import {
  RETRIEVE_TOKEN,
  SIGN_OUT,
  SIGN_IN,
  SIGN_UP,
  SET_PROFILE,
} from './AuthActionTypes';
export const AuthReducer = (prevState, action) => {
  console.log(prevState, action);
  switch (action.type) {
    case RETRIEVE_TOKEN:
      return {
        ...prevState,
        ...action.payload,
        isLoading: false,
      };
    case SIGN_IN:
      return {
        ...action.payload,
        isLoading: false,
        isLoggedOut: false,
      };
    case SIGN_UP:
      return {
        ...action.payload,
        isLoading: false,
        isLoggedOut: false,
      };
    case SET_PROFILE:
      return {
        ...action.payload,
        isLoading: false,
        isLoggedOut: false,
      };
    case SIGN_OUT:
      return {
        ...prevState,
        userId: null,
        userEmail: null,
        userToken: null,
        isLoading: false,
        isLoggedOut: true,
      };
  }
};
