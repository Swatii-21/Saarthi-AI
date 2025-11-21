import React, { useEffect } from 'react';
import { useApp } from './context/AppContext';

const AppWrapper = ({ children }) => {
  const { highContrast, voiceOnly } = useApp();

  useEffect(() => {
    if (highContrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
  }, [highContrast]);

  useEffect(() => {
    if (voiceOnly) {
      document.body.classList.add('voice-only');
    } else {
      document.body.classList.remove('voice-only');
    }
  }, [voiceOnly]);

  return <>{children}</>;
};

export default AppWrapper;

