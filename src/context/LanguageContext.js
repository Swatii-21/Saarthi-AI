import React, { createContext, useContext, useState, useEffect } from 'react';
import enTranslations from '../translations/en.json';
import hiTranslations from '../translations/hi.json';
import mrTranslations from '../translations/mr.json';
import teTranslations from '../translations/te.json';
import taTranslations from '../translations/ta.json';
import knTranslations from '../translations/kn.json';
import guTranslations from '../translations/gu.json';
import bnTranslations from '../translations/bn.json';
import paTranslations from '../translations/pa.json';
import mlTranslations from '../translations/ml.json';

const translations = {
  en: enTranslations,
  hi: hiTranslations,
  mr: mrTranslations,
  te: teTranslations,
  ta: taTranslations,
  kn: knTranslations,
  gu: guTranslations,
  bn: bnTranslations,
  pa: paTranslations,
  ml: mlTranslations,
};

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('saarthi-language');
    return saved || 'en';
  });

  const [translationsData, setTranslationsData] = useState(translations[language]);

  useEffect(() => {
    setTranslationsData(translations[language]);
    localStorage.setItem('saarthi-language', language);
    // Update document language for accessibility
    document.documentElement.lang = language;
  }, [language]);

  const t = (path) => {
    const keys = path.split('.');
    let value = translationsData;
    for (const key of keys) {
      if (value && typeof value === 'object') {
        value = value[key];
      } else {
        return path; // Return path if translation not found
      }
    }
    return value || path;
  };

  const changeLanguage = (lang) => {
    setLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

