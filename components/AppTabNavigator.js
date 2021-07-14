import React ,{Component} from 'react';
import {Image} from 'react-native';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import HomeScreen from '../screens/HomeScreen';
import ExchangeScreen from '../screens/ExchangeScreen';

export const AppTabNavigator = createBottomTabNavigator({
    HomeScreen:{
        screen:HomeScreen,
        navigationOptions:{
            tabBarIcon:<Image source = {require('../assets/unnamed.png')} style = {{width:20,height:20}}/>,
            tabBarLabel:'HomeScreen'

        }
    },
    ExchangeItem:{
        screen:ExchangeScreen,
        navigationOptions:{
            tabBarIcon:<Image source = {require('../assets/arrows_exchange-512.png')} style = {{width:20,height:20}}/>,
            tabBarLabel:'ExchangeScreen'

        }
    },
})