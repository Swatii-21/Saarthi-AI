import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import { recordAndTranscribe } from '../utils/voiceUtils';

import Button from '../components/Button';
import './VoiceListening.css';

const VoiceListening = () => {
  const navigate = useNavigate();
  const { category } = useParams();
  const { t, language } = useLanguage();
  const { fontSize } = useApp();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    startListening();
  }, []);

  const startListening = async () => {
    setIsListening(true);
    setError('');
    setTranscript('');

    recordAndTranscribe(
      (result) => {
        setTranscript(result);
        setIsListening(false);

        // Navigate to result page
        setTimeout(() => {
          navigate(`/result/${category}`, { state: { query: result } });
        }, 600);
      },
      (err) => {
        setError(err);
        setIsListening(false);
      },
      5000 // duration for recording
    );
  };

  const stopListening = () => {
    // Whisper style recording auto-stops after duration
    setIsListening(false);
  };

  const handleBack = () => {
    stopListening();
    navigate(`/category/${category}`);
  };

  return (
    <div className={`voice-listening voice-listening-font-${fontSize}`}>
      <div className="voice-listening-content">
        <button className="back-button" onClick={handleBack}>
          ← {t('common.back')}
        </button>

        <div className="voice-listening-main">
          <div className={`mic-container ${isListening ? 'listening' : ''}`}>
            <div className="mic-icon">🎤</div>

            {isListening && (
              <div className="listening-animation">
                <div className="wave wave1"></div>
                <div className="wave wave2"></div>
                <div className="wave wave3"></div>
              </div>
            )}
          </div>

          <h2 className="listening-status">
            {isListening ? t('voice.listening') : t('voice.speakNow')}
          </h2>

          {transcript && <div className="transcript"><p>{transcript}</p></div>}
          {error && <div className="error-message">{error}</div>}

          <div className="voice-actions">
            {isListening ? (
              <Button variant="secondary" size="large" onClick={stopListening} icon="⏹️" fullWidth>
                {t('voice.stop')}
              </Button>
            ) : (
              <Button variant="primary" size="large" onClick={startListening} icon="🎤" fullWidth>
                {t('voice.tryAgain')}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceListening;
