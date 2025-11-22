import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import { getOfflineAIResponse } from '../utils/aiUtils';
import { speakText, stopSpeaking } from '../utils/voiceUtils';
import Button from '../components/Button';
import './AIResult.css';

const AIResult = () => {
  const navigate = useNavigate();
  const { category } = useParams();
  const location = useLocation();
  const { t, language } = useLanguage();
  const { fontSize } = useApp();

  const [result, setResult] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const query = location.state?.query || '';
    const response = getOfflineAIResponse(category, query);
    setResult(response);
  }, [category, location.state]);

  useEffect(() => {
    return () => stopSpeaking();
  }, []);

  const handlePlayAudio = () => {
    if (!result) return;

    if (isPlaying) {
      stopSpeaking();
      setIsPlaying(false);
      return;
    }

    const stepText = result.steps[currentStep];
    const fullText = `${result.title}. ${t('result.step')} ${currentStep + 1}: ${stepText}`;

    speakText(fullText, language, () => {
      setIsPlaying(false);
    });

    setIsPlaying(true);
  };

  const handleNextStep = () => {
    if (currentStep < result.steps.length - 1) {
      stopSpeaking();
      setIsPlaying(false);
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      stopSpeaking();
      setIsPlaying(false);
      setCurrentStep(currentStep - 1);
    }
  };

  const handleBack = () => {
    stopSpeaking();
    navigate(`/category/${category}`);
  };

  if (!result) {
    return <div className="ai-result"><div className="loading">Loading...</div></div>;
  }

  return (
    <div className={`ai-result ai-result-font-${fontSize}`}>
      <div className="ai-result-content">
        <button className="back-button" onClick={handleBack}>
          ← {t('common.back')}
        </button>

        <h1 className="result-title">{result.title}</h1>

        <div className="step-indicator">
          {t('result.step')} {currentStep + 1} / {result.steps.length}
        </div>

        <div className="step-content">
          <div className="step-number">{currentStep + 1}</div>
          <p className="step-text">{result.steps[currentStep]}</p>
        </div>

        <Button
          variant={isPlaying ? "secondary" : "primary"}
          size="large"
          onClick={handlePlayAudio}
          icon={isPlaying ? "⏹️" : "🔊"}
          fullWidth
        >
          {isPlaying ? t('result.stopAudio') : t('result.playAudio')}
        </Button>

        <div className="step-navigation">
          <Button variant="outline" onClick={handlePreviousStep} disabled={currentStep === 0}>
            ← {t('result.previousStep')}
          </Button>
          <Button variant="primary" onClick={handleNextStep} disabled={currentStep === result.steps.length - 1}>
            {t('result.nextStep')} →
          </Button>
        </div>

      </div>
    </div>
  );
};

export default AIResult;
