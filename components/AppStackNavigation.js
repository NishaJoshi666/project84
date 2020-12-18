import React from 'react';
import {createStackNavigator} from 'react-navigation-tabs';
import BookDonateScreen from '../screens/BookDonateScreen';
import RecieverDetails from '../screens/recieverDetails';

export const AppStackNavigator = createStackNavigator({
    ExchangeList : {
        screen: ExchangeScreen,
        navigationOptions :{
         headerShown:false
        }
      },
      RecieverDetails: {
        screen: RecieverDetails,
        navigationOptions :{
          
        }
      }
},
{initialRouteName:'BookDonateList'}) 