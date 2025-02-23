import React, { createContext, useState, useContext } from 'react';
import i18n from '../i18n';

const SettingsContext = createContext();

export const useSettings = () => {
  return useContext(SettingsContext);
};

export const SettingsProvider = ({ children }) => {
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);
  const [selectedCurrency, setSelectedCurrency] = useState('UGX');

  const changeLanguage = (code) => {
    setSelectedLanguage(code);
    i18n.changeLanguage(code);
  };

  const changeCurrency = (currency) => {
    setSelectedCurrency(currency);
  };

  return (
    <SettingsContext.Provider value={{ selectedLanguage, selectedCurrency, changeLanguage, changeCurrency }}>
      {children}
    </SettingsContext.Provider>
  );
};
