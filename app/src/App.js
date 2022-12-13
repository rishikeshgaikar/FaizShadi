import React from 'react';
//local imports
import { RootNavigator } from './Routes';
import { AuthProvider } from './context/auth/AuthProvider';
// hides logs in app
console.disableYellowBox = true;

export const App = () => {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
};
