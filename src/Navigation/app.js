import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {BottomNavigator} from './bottomNavigator';
import Detail from '../Screens/Home/Detail';
import DetailTransaction from '../Screens/Transaction/Detail';

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
  DetailTransaction: {
    screen: DetailTransaction,
    navigationOptions: {
      headerShown: false,
    },
  },
});
