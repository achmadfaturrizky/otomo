import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {BottomNavigator} from './bottomNavigator';
import Detail from '../Screens/Home/Detail';

export default createStackNavigator({
  Home: {
    screen: BottomNavigator,
    navigationOptions: {
      headerShown: false,
    },
  },
  Detail: {
    screen: Detail,
    navigationOptions: {
      headerShown: false,
    },
  },
});
