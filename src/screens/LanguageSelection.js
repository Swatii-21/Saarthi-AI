import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import Card from '../components/Card';
import Button from '../components/Button';
import './LanguageSelection.css';

const LanguageSelection = () => {
  const navigate = useNavigate();
  const { language, changeLanguage, t } = useLanguage();
  const { fontSize } = useApp();

  const languages = [
    { code: 'en', name: t('language.english'), native: 'English' },
    { code: 'hi', name: t('language.hindi'), native: 'हिंदी' },
    { code: 'mr', name: t('language.marathi'), native: 'मराठी' },
    { code: 'te', name: t('language.telugu'), native: 'తెలుగు' },
    { code: 'ta', name: t('language.tamil'), native: 'தமிழ்' },
    { code: 'kn', name: t('language.kannada'), native: 'ಕನ್ನಡ' },
    { code: 'gu', name: t('language.gujarati'), native: 'ગુજરાતી' },
    { code: 'bn', name: t('language.bengali'), native: 'বাংলা' },
    { code: 'pa', name: t('language.punjabi'), native: 'ਪੰਜਾਬੀ' },
    { code: 'ml', name: t('language.malayalam'), native: 'മലയാളം' },
  ];

  const handleLanguageSelect = (langCode) => {
    changeLanguage(langCode);
  };

  const handleContinue = () => {
    navigate('/home');
  };

  return (
    <div className={`language-selection language-selection-font-${fontSize}`}>
      <div className="language-selection-content">
        <h1 className="language-selection-title">{t('language.select')}</h1>
        
        <div className="language-grid">
          {languages.map((lang) => (
            <Card
              key={lang.code}
              onClick={() => handleLanguageSelect(lang.code)}
              icon={lang.code === language ? '✓' : '🌐'}
              title={lang.native}
              subtitle={lang.name}
              className={lang.code === language ? 'card-selected' : ''}
              ariaLabel={`Select ${lang.name}`}
            />
          ))}
        </div>

        <div className="language-selection-actions">
          <Button
            variant="primary"
            size="large"
            onClick={handleContinue}
            fullWidth
            ariaLabel={t('common.ok')}
          >
            {t('common.ok')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LanguageSelection;

