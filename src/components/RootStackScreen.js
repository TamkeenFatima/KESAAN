import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import LangSelectScreen from '../Screens/LangSelectScreen';
import Welcome from '../Screens/WelcomeScreen';
import RegisterScreen from '../Screens/RegisterScreen';
import LoginScreen from '../Screens/LoginScreen';
import { LocalizationProvider } from '../LocalisationContext';

const RootStack = createStackNavigator();

export default function RootStackScreen() {
    return (
        <LocalizationProvider>
        <RootStack.Navigator screenOptions={{headerShown: false}}>
            <RootStack.Screen name='Welcome' component={Welcome} />
            <RootStack.Screen name='Register' component={RegisterScreen} />
            <RootStack.Screen name='LogIn' component={LoginScreen} />
        </RootStack.Navigator>
        </LocalizationProvider>
    )
}
