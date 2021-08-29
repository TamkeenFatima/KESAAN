import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import LangSelectScreen from '../Screens/LangSelectScreen';
import Welcome from '../Screens/WelcomeScreen';
import LoginScreen1 from '../Screens/RegisterScreen';
import LoginScreen from '../Screens/LoginScreen';

const RootStack = createStackNavigator();

export default function RootStackScreen() {
    return (
        <RootStack.Navigator screenOptions={{headerShown: false}}>
            <RootStack.Screen name='Welcome' component={Welcome} />
            <RootStack.Screen name='Register' component={LoginScreen1} />
            <RootStack.Screen name='LogIn' component={LoginScreen} />
        </RootStack.Navigator>
    )
}
