// Third Party Libraries
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Local Components and Hooks
import enTranslations from './en/en.json';
import trTranslations from './tr/tr.json';

const resources = {
  en: {
    translation: enTranslations,
  },
  tr: {
    translation: trTranslations,
  },
};

export const defaultNS = 'translation';

// Note: getInitialLanguage is imported from utils/language when needed
// to avoid circular dependency issues during initial app setup
let initialLanguage = 'en';

// Try to get stored language safely at startup
try {
  // We import storage here to avoid circular dependency
  const { storage } = require('../utils/helpers/storage');
  const storedLanguage = storage.getString('app_language');
  if (storedLanguage && ['en', 'tr'].includes(storedLanguage)) {
    initialLanguage = storedLanguage;
  }
} catch (error) {
  console.warn('Failed to get stored language during i18n init:', error);
}

i18n.use(initReactI18next).init({
  resources,
  lng: initialLanguage,
  fallbackLng: 'en',
  defaultNS,
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
  compatibilityJSON: 'v4',
  react: {
    useSuspense: false, // Disable suspense to avoid loading issues
  },
  debug: false, // Disable debug logs
});

// Store the initial language if it wasn't already stored
try {
  const { storage } = require('../utils/helpers/storage');
  if (!storage.getString('app_language')) {
    storage.set('app_language', initialLanguage);
  }
} catch (error) {
  console.warn('Failed to store initial language:', error);
}

export default i18n;
