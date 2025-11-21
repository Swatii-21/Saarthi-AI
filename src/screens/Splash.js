import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import './Splash.css';

const Splash = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { fontSize } = useApp();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      const hasSeenOnboarding = localStorage.getItem('saarthi-onboarding-seen');
      if (hasSeenOnboarding) {
        navigate('/home');
      } else {
        navigate('/onboarding');
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className={`splash splash-font-${fontSize}`}>
      <div className="splash-content">
        <div className="splash-logo" aria-hidden="true">
          🤖
        </div>
        <h1 className="splash-title">{t('app.name')}</h1>
        <p className="splash-tagline">{t('app.tagline')}</p>
        {loading && (
          <div className="splash-loader" aria-label={t('splash.loading')}>
            <div className="loader-spinner"></div>
            <p>{t('splash.loading')}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Splash;

