import React from 'react';
import {Image} from 'react-native';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import HomeScreen from '../screens/HomeScreen';
import ExchangeScreen from '../screens/ExchangeScreen';

export const AppTabNavigator = createBottomTabNavigator({
    Home:{
        screen:HomeScreen,
            tabBarIcon:<Image source = {require("../assets/request-list.png")} style={{width:40, height:40}}/>,
        tabBarLabel:"Home"
    },
    ExchangeBook:{
        screen:ExchangeScreen,
            tabBarIcon:<Image source = {require("../assets/request-book.png")} style={{width:40, height:40}}/>,
        tabBarLabel:"Exchange Books"
    }
})
