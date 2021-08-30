/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect, useMemo, useReducer } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Image,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import { SafeAreaProvider } from 'react-native-safe-area-context';

import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import RootStackScreen from './components/RootStackScreen';
import BottomTabScreens from './components/BottomTabs';
import SettingsScreen from './Screens/SettingsScreen';
import SplashScreen from './Screens/SplashScreen';
import { SidebarMenu } from './components/SidebarMenu';
import LangSelectScreen from './Screens/LangSelectScreen';
import { AuthContext } from './components/context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LocalizationProvider } from './LocalisationContext';
const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
   primary: "green",
   accent: "white"
  },
};

const Drawer = createDrawerNavigator();

function LogoTitle() {
  return (
    <Image
      style={{ width: 200, height: 50 }}
      source={require('../assets/images/Logo.png')}
    />
  );
}

const App = () => {

  const initialLoginState = {
    isLoading: true,
    isFirstRegistration: true,
    userToken: null,
    mobNo: null,
    language: '',
  };

  const loginReducer = ( prevState, action ) => {
    switch( action.type ) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
          isFirstRegistration: action.first,
        };
      case 'LOGIN':
        return {
          ...prevState,
          mobNo: action.id,
          userToken: action.token,
          isLoading: false,
          isFirstRegistration: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          mobNo: null,
          userToken: null,
          isLoading: false,
          isFirstRegistration: false,
        };
      case 'REGISTER':
        return {
          ...prevState,
          mobNo: action.id,
          userToken: action.token,
          isLoading: false,
          isFirstRegistration: false,
          language: action.lang,
        };
      case 'LANGUAGE':
        return {
          ...prevState,
          mobNo: null,
          userToken: null,
          isLoading: false,
          isFirstRegistration: false,
          language: action.id,
        };
    }
  };

  const [loginState, dispatch] = useReducer(loginReducer, initialLoginState);

  const authContext = useMemo(() => ({
    logIn: async (mobNo) => {
      let userToken;
      userToken = null;
      // Provide static mobile number to check login functionality
      if ( mobNo == '1234567890' ) {
        try {
          userToken = 'sfdg';
          await AsyncStorage.setItem('userToken', userToken)
          await AsyncStorage.setItem('isFirstRegistration', JSON.stringify(false))
        } catch(e) {
          console.log(e);
        }
      }
      dispatch({ type: 'LOGIN', id: mobNo, token: userToken });
    },
    logOut: async () => {
      try {
        await AsyncStorage.removeItem('userToken')
      } catch(e) {
        console.log(e);
      }
      dispatch({ type: 'LOGOUT' });
    },
    register: async (info) => {
      let userToken;
      userToken = null;
      try {
        userToken = 'sfdg';
        await AsyncStorage.setItem('userToken', userToken)
        await AsyncStorage.setItem('isFirstRegistration', JSON.stringify(false))
      } catch(e) {
        console.log(e);
      }
      console.log(info)
      dispatch({ type: 'REGISTER', id: info.user_mobile, lang: info.sel_lang, token: userToken });
    },
    selectLang: async(lang) => {
      try {
        await AsyncStorage.setItem('language', lang)
      } catch(e) {
        console.log(e);
      }
      dispatch({ type: 'LANGUAGE', id: lang });
    },
  }), [])

  useEffect(() => {
    setTimeout( async() => {
      let userToken;
      userToken = null;
      let isFirstRegistration;
      isFirstRegistration = true;
      try {
        userToken = await AsyncStorage.getItem('userToken')
        isFirstRegistration = JSON.parse( await AsyncStorage.getItem('isFirstRegistration') )
        if ( isFirstRegistration == null ) {
          isFirstRegistration = true;
        }
      } catch(e) {
        console.log(e);
      }
      dispatch({ type: 'RETRIEVE_TOKEN', token: userToken, first: isFirstRegistration });
    }, 1000);
  }, [])

  if ( loginState.isLoading ) {
    return <SplashScreen />;
  }

  return (
    <LocalizationProvider>
    <SafeAreaProvider>
      <AuthContext.Provider value={authContext}>
        <NavigationContainer>
          <PaperProvider theme={theme}>
          <StatusBar barStyle='dark-content' backgroundColor="gray" />
          { loginState.isFirstRegistration ?
            <LangSelectScreen /> : (
            loginState.userToken !== null ? (
              <Drawer.Navigator
                initialRouteName="Home"
                drawerContent={props => <SidebarMenu {...props} />}
                screenOptions={{
                  headerStyle: {
                    backgroundColor: '#000',
                  },
                  headerTintColor: '#fff',
                  headerTitle: props => <LogoTitle {...props} />,
              }} >
                <Drawer.Screen name="HOME" component={BottomTabScreens} />
                <Drawer.Screen name="Settings" component={SettingsScreen} />
              </Drawer.Navigator>
            ) :
              <RootStackScreen />
            )
          }
          </PaperProvider>
        </NavigationContainer>
      </AuthContext.Provider>
    </SafeAreaProvider>
    </LocalizationProvider>
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
