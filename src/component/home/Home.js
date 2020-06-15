import React from 'react';
import {View, Text, Button} from 'react-native';
import {useRecoilState, useRecoilValue} from 'recoil';
import * as action from '../../recoils/authentication/recoil';

import * as screen from '../../navigation/ScreenTypes';

function HomeScreen({navigation}) {
  const text = useRecoilValue(action.textState);

  console.log(text, 'textRecoil')
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button onPress={()=> navigation.navigate(screen.LOGIN_SCREEN)} title="go to login"/>
    </View>
  );
}

 export default HomeScreen;
 