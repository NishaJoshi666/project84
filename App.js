import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import { AppDrawerNavigator } from './components/AppDrawerNavigatior';
import WelcomeScreen from './screens/WelcomeScreen';
import AppTabNavigator from './components/AppTabNavigator';


export default function App() {
  return (
    <AppContainer/>
  );
}

const SwitchNavigator = createSwitchNavigator({
  WelcomeScreen:{screen:WelcomeScreen},
  DrawerTab:{screen:AppDrawerNavigator}
})

const AppContainer = createAppContainer({SwitchNavigator})