import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import { recordAndTranscribe } from '../utils/voiceUtils';
import Button from '../components/Button';
import './CategoryInteraction.css';

const CategoryInteraction = () => {
  const navigate = useNavigate();
  const { category } = useParams();
  const { t } = useLanguage();
  const { fontSize } = useApp();

  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);

  const toggleVoiceInput = () => {
    if (!isListening) {
      setIsListening(true);

      recordAndTranscribe(
        (text) => {
          setInputText(prev => (prev + " " + text).trim());
          setIsListening(false);
        },
        (error) => {
          console.error("Transcription Error:", error);
          alert("Voice input failed. Try again!");
          setIsListening(false);
        },
        4000 // 4 sec voice input
      );
    } else {
      setIsListening(false);
    }
  };

  const handleContinue = () => {
    if (inputText.trim()) {
      navigate(`/result/${category}`, { state: { query: inputText } });
    }
  };

  const handleBack = () => navigate('/home');

  return (
    <div className={`category-interaction category-interaction-font-${fontSize}`}>
      <div className="category-interaction-content">
        <button className="back-button" onClick={handleBack}>
          ← {t('common.back')}
        </button>

        <h1 className="category-interaction-title">{category}</h1>

        <textarea
          className="type-input"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={t('interaction.placeholder')}
          rows={5}
        />

        <Button
          variant={isListening ? "secondary" : "primary"}
          size="large"
          onClick={toggleVoiceInput}
          icon={isListening ? "🛑" : "🎤"}
          fullWidth
        >
          {isListening ? t('interaction.stopListening') : t('interaction.speak')}
        </Button>

        <Button
          variant="primary"
          size="large"
          onClick={handleContinue}
          disabled={!inputText.trim()}
          fullWidth
        >
          {t('interaction.continue')} →
        </Button>

      </div>
    </div>
  );
};

export default CategoryInteraction;
