import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import Button from '../components/Button';
import './CategoryInteraction.css';

const CategoryInteraction = () => {
  const navigate = useNavigate();
  const { category } = useParams();
  const { t, language } = useLanguage();
  const { fontSize, voiceOnly } = useApp();
  const [inputText, setInputText] = useState('');

  const handleSpeak = () => {
    navigate(`/voice/${category}`);
  };

  const handleType = () => {
    if (inputText.trim()) {
      navigate(`/result/${category}`, { state: { query: inputText } });
    }
  };

  const handleBack = () => {
    navigate('/home');
  };

  return (
    <div className={`category-interaction category-interaction-font-${fontSize}`}>
      <div className="category-interaction-content">
        <button
          className="back-button"
          onClick={handleBack}
          aria-label={t('common.back')}
        >
          ← {t('common.back')}
        </button>

        <h1 className="category-interaction-title">{t('category.selectTopic')}</h1>

        <div className="interaction-options">
          <div className="speak-option">
            <Button
              variant="primary"
              size="extra-large"
              onClick={handleSpeak}
              icon="🎤"
              fullWidth
              ariaLabel={t('category.speakButton')}
            >
              {t('category.speak')}
            </Button>
          </div>

          <div className="divider">
            <span>{t('category.or')}</span>
          </div>

          <div className="type-option">
            <textarea
              className="type-input"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={t('category.typePlaceholder')}
              rows={4}
              aria-label={t('category.typePlaceholder')}
            />
            <Button
              variant="secondary"
              size="large"
              onClick={handleType}
              disabled={!inputText.trim()}
              fullWidth
              ariaLabel={t('category.type')}
            >
              {t('category.type')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryInteraction;

