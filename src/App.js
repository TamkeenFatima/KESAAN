/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Header } from 'react-native-elements/dist/header/Header';

import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { Icon } from 'react-native-vector-icons/Ionicons';
import Logo from 'svg';

import DashboardScreen from './Screens/DashboardScreen';
import AdvisoryScreen from './Screens/AdvisoryScreen';
import LinksScreen from './Screens/LinksScreen';
import FeedbackScreen from './Screens/FeedbackScreen';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
   primary: "green",
   accent: "white"
  },
};

const DashboardStack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createMaterialBottomTabNavigator();

const DashboardStackScreen = ({navigation}) => {
  return (
    <DashboardStack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: '#cbeedf',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold'
      }
    }}>
      <DashboardStack.Screen name="Wether Today" component={DashboardScreen} />
      <DashboardStack.Screen name="Feedback" component={FeedbackScreen} />
    </DashboardStack.Navigator>
  )
}

const App = () => {

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <PaperProvider theme={theme}>
        <StatusBar barStyle='dark-content' backgroundColor="green" />

        <Header
          placement="left"
          barStyle='light-content'
          backgroundColor="green"
          centerComponent={{ Logo }} />
        <Drawer.Navigator initialRouteName="Dashboard" screenOptions={{
        headerStyle: {
          backgroundColor: '#009387',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold'
        }
      }}>
          <Drawer.Screen name="Dashboard" component={DashboardStackScreen} />
          <Drawer.Screen name="Agro-Advisory" component={AdvisoryScreen} />
          <Drawer.Screen name="Useful Links" component={LinksScreen} />
        </Drawer.Navigator>

        </PaperProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
