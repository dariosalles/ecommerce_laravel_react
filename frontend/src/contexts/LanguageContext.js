import { createContext, useContext, useState, useEffect } from 'react';
import translations from '../locales/translations.json';

const LanguageContext = createContext();

// Define linguagens suportadas
const SUPPORTED_LANGUAGES = ['pt-br', 'en', 'es'];
const DEFAULT_LANGUAGE = 'pt-br';

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    // Carrega do localStorage se existir e for válido, senão usa PT-BR
    const saved = localStorage.getItem('preferred-language');
    return (saved && SUPPORTED_LANGUAGES.includes(saved)) ? saved : DEFAULT_LANGUAGE;
  });

  useEffect(() => {
    // Salva a preferência sempre que mudar
    localStorage.setItem('preferred-language', language);
    // Também seta o atributo lang do HTML para acessibilidade
    document.documentElement.lang = language;
  }, [language]);

  const changeLanguage = (lang) => {
    if (SUPPORTED_LANGUAGES.includes(lang) && translations[lang]) {
      setLanguage(lang);
    }
  };

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];

    for (const k of keys) {
      value = value?.[k];
      if (!value) return key;
    }

    return value;
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t, availableLanguages: SUPPORTED_LANGUAGES }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage deve ser usado dentro de <LanguageProvider>');
  }
  return context;
}
