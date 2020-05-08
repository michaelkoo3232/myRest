import React from 'react';
import {
  createStackNavigator,
  createBottomTabNavigator,
  createSwitchNavigator
} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';

import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import OrderScreen from '../screens/OrderScreen';
import ProductsScreen from '../screens/ProductsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import RecordScreen from '../screens/RecordScreen'

const LoginStack = createStackNavigator(
  {
    Login: {screen: LoginScreen},
    Register: {screen: RegisterScreen},
  }
);

const HomeStack = createBottomTabNavigator(
  {
    Products: {screen: ProductsScreen},
    Order: {screen: OrderScreen},
    Record: {screen: RecordScreen},
    Profile: {screen: ProfileScreen},
  },
  {
  headerMode: 'none',
  }
);


export default createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    Auth: LoginStack,
    App: HomeStack,
  },
  {
    initialRouteName: 'App',
    headerMode: 'none',
  }
);
