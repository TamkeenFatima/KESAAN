import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import HomeScreen from '../Screens/HomeScreen';
import AdvisoryScreen from '../Screens/AdvisoryScreen';
import LinksScreen from '../Screens/LinksScreen';
import FeedbackScreen from '../Screens/FeedbackScreen';
import { LocalizationProvider } from '../LocalisationContext';

const Tab = createMaterialBottomTabNavigator();

const BottomTabScreens = () => {
    return (
        <LocalizationProvider>
        <Tab.Navigator
            initialRouteName="Home"
            activeColor="#fff"
            shifting={true}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    title: 'Home',
                    tabBarLabel: 'Home',
                    tabBarColor: '#897396',
                    tabBarIcon: ({ color }) => (
                        <Icon name="home" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="Advisory"
                component={AdvisoryScreen}
                options={{
                    title: 'Agro-Advisory',
                    tabBarLabel: 'Advisory',
                    tabBarColor: '#009387',
                    tabBarIcon: ({ color }) => (
                        <Icon name="information-circle" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="Feedback"
                component={FeedbackScreen}
                options={{
                    title: 'Feedback',
                    tabBarLabel: 'Feedback',
                    tabBarColor: '#d0b206',
                    tabBarIcon: ({ color }) => (
                        <Icon name="chatbox-ellipses" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="Links"
                component={LinksScreen}
                options={{
                    title: 'Useful Links',
                    tabBarLabel: 'Links',
                    tabBarColor: '#d02860',
                    tabBarIcon: ({ color }) => (
                        <Icon name="link" color={color} size={26} />
                    ),
                }}
            />
        </Tab.Navigator>
        </LocalizationProvider>
    )
}

export default BottomTabScreens;
