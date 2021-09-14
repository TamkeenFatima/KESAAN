/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useMemo, useReducer, useContext } from 'react';

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
  Alert
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
import { LocalizationProvider, LocalizationContext } from './components/LocalisationContext';
import SupportScreen from './Screens/SupportScreen';
import ProfileScreen from './Screens/ProfileScreen';

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

  const { setAppLanguage, initializeAppLanguage } = useContext(LocalizationContext);

  useEffect(() => {
    initializeAppLanguage();
  }, []);

  const initialLoginState = {
    isLoading: true,
    isFirstRegistration: true,
    userToken: null,
    mobNo: '',
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
          mobNo: '',
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
          mobNo: '',
          userToken: null,
          isLoading: false,
          isFirstRegistration: false,
          language: action.id,
        };
    }
  };

  const [loginState, dispatch] = useReducer(loginReducer, initialLoginState);

  const authContext = useMemo(() => ({
    logIn: (mobNo) => {
      let LoginAPIURL = "http://10.0.2.2:80/api/login.php";

      let headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      };

      let Data = {
        user_mobile: mobNo,
      };

      fetch (LoginAPIURL,
        {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(Data)
        }
      )
      .then((response) => response.json())
      .then(async (response) => {
          Alert.alert(response.Message);
          if ( response.id !== null ) {
            let userToken;
            let userInfo = {
              name: response.user_name,
              mobile: response.user_mobile,
              location_id: response.location_id,
            };
            userToken = null;
            try {
              userToken = response.id;
              await AsyncStorage.setItem('userToken', JSON.stringify(userToken))
              await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo))
              await AsyncStorage.setItem('isFirstRegistration', JSON.stringify(false))
            } catch(e) {
              console.log(e);
            }
            setAppLanguage(response.sel_lang);
            dispatch({ type: 'LOGIN', id: userInfo.mobile, token: userToken });
      }})
      .catch((e) => {
        Alert.alert("ERROR " + e);
      })
    },

    logOut: async () => {
      try {
        await AsyncStorage.removeItem('userToken')
        await AsyncStorage.removeItem('userInfo')
      } catch(e) {
        console.log(e);
      }
      dispatch({ type: 'LOGOUT' });
    },

    register: (info) => {
      let RegisterAPIURL = "http://10.0.2.2:80/api/register.php";

      let headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      };

      let Data = {
        location_id: info.location_id,
        sel_lang: info.sel_lang,
        user_name: info.user_name,
        user_mobile: info.user_mobile,
        mob_model: info.mob_model,
        mob_os: info.mob_os,
        os_version: info.os_version,
      };

      fetch (RegisterAPIURL,
        {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(Data)
        }
      )
      .then((response) => response.json())
      .then(async (response) => {
          Alert.alert(response.Message);
          if ( response.id !== 0 ) {
            let userToken;
            let userInfo = {
              name: info.user_name,
              mobile: info.user_mobile,
              location_id: info.location_id,
            };
            userToken = null;
            try {
              userToken = response.id;
              await AsyncStorage.setItem('userToken', JSON.stringify(userToken))
              await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo))
              await AsyncStorage.setItem('isFirstRegistration', JSON.stringify(false))
            } catch(e) {
              console.log(e);
            }
            console.log(info)
            dispatch({ type: 'REGISTER', id: info.user_mobile, lang: info.sel_lang, token: userToken });
      }})
      .catch((e) => {
        Alert.alert("ERROR " + e);
      })
    },

    selectLang: (lang) => {
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
                  <Drawer.Screen name="Profile" component={ProfileScreen} options={{headerShown: false}} />
                  <Drawer.Screen name="Settings" component={SettingsScreen} options={{headerShown: false}} />
                  <Drawer.Screen name="Support" component={SupportScreen} options={{headerShown: false}} />
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
