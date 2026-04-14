import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import commonEN from './locales/en/common.json';
import commonHI from './locales/hi/common.json';
import commonGU from './locales/gu/common.json';

const resources = {
  en: { common: commonEN },
  hi: { common: commonHI },
  gu: { common: commonGU }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    ns: ['common'],
    defaultNS: 'common',
    interpolation: {
      escapeValue: false // React already escapes values
    }
  });

export default i18n;
