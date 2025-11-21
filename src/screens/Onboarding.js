import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import Button from '../components/Button';
import './Onboarding.css';

const Onboarding = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { fontSize } = useApp();
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      icon: '👋',
      title: t('onboarding.step1.title'),
      description: t('onboarding.step1.description'),
    },
    {
      icon: '📱',
      title: t('onboarding.step2.title'),
      description: t('onboarding.step2.description'),
    },
    {
      icon: '🌐',
      title: t('onboarding.step3.title'),
      description: t('onboarding.step3.description'),
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleGetStarted();
    }
  };

  const handleSkip = () => {
    handleGetStarted();
  };

  const handleGetStarted = () => {
    localStorage.setItem('saarthi-onboarding-seen', 'true');
    navigate('/language');
  };

  return (
    <div className={`onboarding onboarding-font-${fontSize}`}>
      <div className="onboarding-content">
        <div className="onboarding-step">
          <div className="step-icon" aria-hidden="true">
            {steps[currentStep].icon}
          </div>
          <h1 className="step-title">{steps[currentStep].title}</h1>
          <p className="step-description">{steps[currentStep].description}</p>
        </div>

        <div className="onboarding-indicators">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`indicator ${index === currentStep ? 'active' : ''}`}
              aria-label={`Step ${index + 1}`}
            />
          ))}
        </div>

        <div className="onboarding-actions">
          <Button
            variant="outline"
            onClick={handleSkip}
            ariaLabel={t('onboarding.skip')}
          >
            {t('onboarding.skip')}
          </Button>
          <Button
            variant="primary"
            onClick={handleNext}
            ariaLabel={currentStep === steps.length - 1 ? t('onboarding.getStarted') : t('onboarding.next')}
          >
            {currentStep === steps.length - 1 ? t('onboarding.getStarted') : t('onboarding.next')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;

