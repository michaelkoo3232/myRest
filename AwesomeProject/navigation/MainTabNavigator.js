import React from 'react';
import {
  createStackNavigator,
  createBottomTabNavigator,
  createSwitchNavigator
} from 'react-navigation';

import {
  Icon
} from 'react-native-elements';

import { Ionicons } from '@expo/vector-icons';

import TabBarIcon from '../components/TabBarIcon';

import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import OrderScreen from '../screens/OrderScreen';
import ProductsScreen from '../screens/ProductsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import InvoiceScreen from '../screens/InvoiceScreen'

const LoginStack = createStackNavigator(
  {
    Login: {screen: LoginScreen},
    Register: {screen: RegisterScreen},
  },
  {
    headerMode: 'none',
    }
);

const HomeStack = createBottomTabNavigator(
  {
    Products: {screen: ProductsScreen}, 
    Order: {screen: OrderScreen, defaultNavigationOptions:{
     
      tabBarVisible: false
    }},
    Inovice: {screen: InvoiceScreen},
    Profile: {screen: ProfileScreen},
  },
  {
  headerMode: 'screen',
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
