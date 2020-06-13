import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from '../component/home/Home';
import Product from '../component/product/Product';
import Login from '../component/authentication/login/Login';

import * as ScreenTypes from './ScreenTypes';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function GroupTabNavigator() {
  return (
      <Tab.Navigator>
        <Tab.Screen name={ScreenTypes.HOME_SCREEN} component={Home} />
        <Tab.Screen name={ScreenTypes.CATEGORY_SCREEN} component={Product}/>
      </Tab.Navigator>
  );
}


function GroupStackNavigation() {
  return (
      <Stack.Navigator>
        <Stack.Screen name={ScreenTypes.GROUP_TAB} component={GroupTabNavigator} />
        <Stack.Screen name={ScreenTypes.LOGIN_SCREEN} component={Login} />
      </Stack.Navigator>
  );
}

function AppContainer() {
  return (
      <Drawer.Navigator initialRouteName={ScreenTypes.GROUP_STACK}>
        <Drawer.Screen name={ScreenTypes.GROUP_STACK} component={GroupStackNavigation} />
      </Drawer.Navigator>
  );
}

export default AppContainer;
