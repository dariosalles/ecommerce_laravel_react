import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import './LanguageSwitcher.css';

function LanguageSwitcher() {
  const { language, changeLanguage } = useLanguage();

  return (
    <div className="language-switcher">
      <button
        className={`lang-btn ${language === 'pt-br' ? 'active' : ''}`}
        onClick={() => changeLanguage('pt-br')}
        title="Português Brasileiro"
      >
        PT-BR
      </button>
      <button
        className={`lang-btn ${language === 'en' ? 'active' : ''}`}
        onClick={() => changeLanguage('en')}
        title="English"
      >
        EN
      </button>
      <button
        className={`lang-btn ${language === 'es' ? 'active' : ''}`}
        onClick={() => changeLanguage('es')}
        title="Español"
      >
        ES
      </button>
    </div>
  );
}

export default LanguageSwitcher;
