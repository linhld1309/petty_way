import React from 'react';
import {
  RecoilRoot,
} from 'recoil';
import 'react-native-gesture-handler';
import AppNavigator from './navigation/index';

function App() {
  return (
    <RecoilRoot>
      <AppNavigator />
    </RecoilRoot>
  );
}

export default App;