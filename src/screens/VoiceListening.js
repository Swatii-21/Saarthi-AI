import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import { startSpeechRecognition, stopSpeechRecognition } from '../utils/voiceUtils';
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
  const recognitionRef = useRef(null);

  useEffect(() => {
    startListening();
    return () => {
      if (recognitionRef.current) {
        stopSpeechRecognition(recognitionRef.current);
      }
    };
  }, []);

  const startListening = () => {
    setIsListening(true);
    setError('');
    setTranscript('');

    recognitionRef.current = startSpeechRecognition(
      language,
      (result) => {
        setTranscript(result);
        setIsListening(false);
        // Navigate to result screen after getting transcript
        setTimeout(() => {
          navigate(`/result/${category}`, { state: { query: result } });
        }, 500);
      },
      (err) => {
        setError(err);
        setIsListening(false);
      }
    );
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      stopSpeechRecognition(recognitionRef.current);
      setIsListening(false);
    }
  };

  const handleBack = () => {
    stopListening();
    navigate(`/category/${category}`);
  };

  return (
    <div className={`voice-listening voice-listening-font-${fontSize}`}>
      <div className="voice-listening-content">
        <button
          className="back-button"
          onClick={handleBack}
          aria-label={t('common.back')}
        >
          ← {t('common.back')}
        </button>

        <div className="voice-listening-main">
          <div className={`mic-container ${isListening ? 'listening' : ''}`}>
            <div className="mic-icon" aria-hidden="true">
              🎤
            </div>
            {isListening && (
              <div className="listening-animation" aria-hidden="true">
                <div className="wave wave1"></div>
                <div className="wave wave2"></div>
                <div className="wave wave3"></div>
              </div>
            )}
          </div>

          <h2 className="listening-status">
            {isListening ? t('voice.listening') : t('voice.speakNow')}
          </h2>

          {transcript && (
            <div className="transcript">
              <p>{transcript}</p>
            </div>
          )}

          {error && (
            <div className="error-message" role="alert">
              {error}
            </div>
          )}

          <div className="voice-actions">
            {isListening ? (
              <Button
                variant="secondary"
                size="large"
                onClick={stopListening}
                icon="⏹️"
                fullWidth
                ariaLabel={t('voice.stop')}
              >
                {t('voice.stop')}
              </Button>
            ) : (
              <Button
                variant="primary"
                size="large"
                onClick={startListening}
                icon="🎤"
                fullWidth
                ariaLabel={t('voice.speakNow')}
              >
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

