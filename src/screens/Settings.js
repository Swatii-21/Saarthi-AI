import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import Toggle from '../components/Toggle';
import Button from '../components/Button';
import './Settings.css';

const Settings = () => {
  const navigate = useNavigate();
  const { t, language, changeLanguage } = useLanguage();
  const { fontSize, setFontSize, highContrast, setHighContrast, voiceOnly, setVoiceOnly } = useApp();

  const handleBack = () => {
    navigate('/home');
  };

  const handleLanguageChange = () => {
    navigate('/language');
  };

  const fontSizes = [
    { value: 'small', label: t('settings.small') },
    { value: 'medium', label: t('settings.medium') },
    { value: 'large', label: t('settings.large') },
    { value: 'extraLarge', label: t('settings.extraLarge') },
  ];

  return (
    <div className={`settings settings-font-${fontSize} ${highContrast ? 'settings-high-contrast' : ''}`}>
      <div className="settings-content">
        <button
          className="back-button"
          onClick={handleBack}
          aria-label={t('common.back')}
        >
          ← {t('common.back')}
        </button>

        <h1 className="settings-title">{t('settings.title')}</h1>

        <div className="settings-section">
          <h2 className="section-title">{t('settings.accessibility')}</h2>

          <div className="setting-item">
            <label className="setting-label">{t('settings.fontSize')}</label>
            <div className="font-size-options">
              {fontSizes.map((size) => (
                <button
                  key={size.value}
                  className={`font-size-option ${fontSize === size.value ? 'active' : ''}`}
                  onClick={() => setFontSize(size.value)}
                  aria-label={`${t('settings.fontSize')}: ${size.label}`}
                  aria-pressed={fontSize === size.value}
                >
                  {size.label}
                </button>
              ))}
            </div>
          </div>

          <div className="setting-item">
            <Toggle
              label={t('settings.highContrast')}
              checked={highContrast}
              onChange={(e) => setHighContrast(e.target.checked)}
              ariaLabel={t('settings.highContrast')}
            />
          </div>

          <div className="setting-item">
            <Toggle
              label={t('settings.voiceOnly')}
              checked={voiceOnly}
              onChange={(e) => setVoiceOnly(e.target.checked)}
              ariaLabel={t('settings.voiceOnly')}
            />
          </div>
        </div>

        <div className="settings-section">
          <h2 className="section-title">{t('settings.language')}</h2>
          <Button
            variant="outline"
            size="large"
            onClick={handleLanguageChange}
            fullWidth
            ariaLabel={t('settings.language')}
          >
            {t('language.select')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Settings;

