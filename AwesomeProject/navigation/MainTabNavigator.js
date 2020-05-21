import React from 'react';
import {
  createStackNavigator,
  createBottomTabNavigator,
  createSwitchNavigator
} from 'react-navigation';


import { Ionicons } from '@expo/vector-icons';

import TabBarIcon from '../components/TabBarIcon';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Icon from 'react-native-vector-icons/FontAwesome5';

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
    Products: {
      screen: ProductsScreen,
      navigationOptions: {
        tabBarLabel: 'Product',
        tabBarIcon: ({tintColor, activeTintColor}) => (
           <Icon name="apple-alt" size={25} color={tintColor} />
           )
      },
    },
    Order: {
      screen: OrderScreen, 
      navigationOptions: {
        tabBarLabel: 'Order',
        tabBarIcon: ({tintColor, activeTintColor}) => (
           <Icon name="shopping-bag" size={25} color={tintColor} />
           )
      },
    },
    Invoice: {
      screen: InvoiceScreen,
      navigationOptions: {
        tabBarLabel: 'Invoice',
        tabBarIcon: ({tintColor, activeTintColor}) => (
           <Icon name="money-check-alt" size={25} color={tintColor} />
           )
      },
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        tabBarLabel: 'Profile',
        tabBarIcon: ({tintColor, activeTintColor}) => (
           <Icon name="user" size={25} color={tintColor} />
           )
      },},
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
