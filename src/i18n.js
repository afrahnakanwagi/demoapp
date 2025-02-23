import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'react-native-localize';

const resources = {
  en: { translation: { "hello": "Hello" } },
  fr: { translation: { "hello": "Bonjour" } }
};

i18n.use(initReactI18next).init({
  resources,
  lng: Localization.getLocales()[0].languageCode || 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false }
});

export default i18n;
