import React from 'react';
import { NavigationContainer } from '@react-navigation/native';


import AppContainer from './AppContainer';

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <AppContainer/>
    </NavigationContainer>
  );
};

export default AppNavigator;
