// lib/languageContext.js
import { createContext, useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const router = useRouter();
  const [locale, setLocale] = useState(router.locale || 'en');
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize language from cookie or browser language if available
  useEffect(() => {
    if (!isInitialized) {
      const savedLanguage = Cookies.get('language');
      if (savedLanguage) {
        changeLanguage(savedLanguage);
      } else {
        // If no saved language, detect browser language
        const browserLang = navigator.language?.split('-')[0]; // 'en-US' -> 'en'
        if (browserLang && ['en', 'fr', 'es'].includes(browserLang)) {
          changeLanguage(browserLang);
        }
      }
      setIsInitialized(true);
    }
  }, [router.isReady]);

  const changeLanguage = (newLocale) => {
    if (newLocale === locale) return;
    
    const { pathname, asPath, query } = router;
    router.push({ pathname, query }, asPath, { locale: newLocale });
    setLocale(newLocale);
    Cookies.set('language', newLocale, { expires: 365 }); // Save in cookie for a year
  };

  return (
    <LanguageContext.Provider value={{ locale, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);