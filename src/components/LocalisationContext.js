import React, { createContext, useState } from 'react';
import translations from '../../assets/languages/translations';
import AsyncStorage from '@react-native-async-storage/async-storage';

const APP_LANGUAGE = 'appLanguage';

export const LocalizationContext = createContext({
  translations,
  setAppLanguage: () => {},
  appLanguage: '',
  initializeAppLanguage: () => {},
});

export const LocalizationProvider = ({ children }) => {
  const [appLanguage, setAppLanguage] = useState('');

  const setLanguage = async (language) => {
    translations.setLanguage(language);
    setAppLanguage(language);
    try {
      await AsyncStorage.setItem(APP_LANGUAGE, language);
    } catch(e) {
      console.log(e);
    }
  };

  const initializeAppLanguage = async () => {
    let currentLanguage;
    try {
      currentLanguage = await AsyncStorage.getItem(APP_LANGUAGE);
    } catch(e) {
      console.log(e);
    }
    setLanguage(currentLanguage);
    translations.setLanguage(currentLanguage);
  };

  return (
    <LocalizationContext.Provider
      value={{
        translations,
        setAppLanguage: setLanguage,
        appLanguage,
        initializeAppLanguage,
      }}>
      {children}
    </LocalizationContext.Provider>
  );
};