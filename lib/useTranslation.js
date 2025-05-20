// lib/useTranslation.js
import { useRouter } from 'next/router';
import { useLanguage } from './languageContext';

// This custom hook makes it easy to use translations throughout components
export const useTranslation = () => {
  const { locale } = useLanguage();
  const router = useRouter();
  
  // Simple translation function that gets nested translations
  const t = (key) => {
    try {
      // Split the key by dots to navigate nested objects
      const keys = key.split('.');
      
      // Start with the translations for the current locale
      let translations;
      
      // Use the correct import based on the locale
      if (typeof window !== 'undefined') {
        // Client-side
        try {
          translations = require(`../public/locales/${locale}/common.json`);
        } catch (error) {
          // Fallback to English if translation file not found
          translations = require('../public/locales/en/common.json');
        }
      } else {
        // Server-side: we can't dynamically require files
        // You might need to use a different approach for SSR
        return key; // Fallback to key
      }
      
      // Navigate through the nested object
      let result = translations;
      for (const k of keys) {
        if (result[k] === undefined) {
          // If translation not found, return the key
          return key;
        }
        result = result[k];
      }
      
      return result;
    } catch (error) {
      // If any error occurs during translation, return the key
      console.error(`Translation error for key: ${key}`, error);
      return key;
    }
  };
  
  return { t, locale };
};