/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect, useMemo } from 'react';

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

import { AuthContext } from './components/context';

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
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  const authContext = useMemo(() => {
    signIn: () => {
      setUserToken('fgh');
      setIsLoading(false);
    }
    signOut: () => {
      setUserToken(null);
      setIsLoading(false);
    }
    register: () => {
      setUserToken('fgh');
      setIsLoading(false);
    }
  })

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  }, [])

  if ( isLoading ) {
    return <SplashScreen />;
  }
  return (
    <SafeAreaProvider>
      <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <PaperProvider theme={theme}>
        <StatusBar barStyle='dark-content' backgroundColor="gray" />
        <RootStackScreen />
        {/* <Drawer.Navigator initialRouteName="Home" screenOptions={{
        headerStyle: {
          backgroundColor: '#000',
        },
        headerTintColor: '#fff',
        headerTitle: props => <LogoTitle {...props} />,
      }} >
          <Drawer.Screen name="HOME" component={BottomTabScreens} />
          <Drawer.Screen name="Settings" component={SettingsScreen} />
        </Drawer.Navigator> */}

        <View backgroundColor='gray'>

        </View>

        </PaperProvider>
      </NavigationContainer>
      </AuthContext.Provider>
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
