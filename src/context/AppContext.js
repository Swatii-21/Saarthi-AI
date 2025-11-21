import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [fontSize, setFontSize] = useState(() => {
    const saved = localStorage.getItem('saarthi-fontSize');
    return saved || 'medium';
  });

  const [highContrast, setHighContrast] = useState(() => {
    const saved = localStorage.getItem('saarthi-highContrast');
    return saved === 'true';
  });

  const [voiceOnly, setVoiceOnly] = useState(() => {
    const saved = localStorage.getItem('saarthi-voiceOnly');
    return saved === 'true';
  });

  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [lastSync, setLastSync] = useState(() => {
    const saved = localStorage.getItem('saarthi-lastSync');
    return saved || null;
  });

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('saarthi-fontSize', fontSize);
  }, [fontSize]);

  useEffect(() => {
    localStorage.setItem('saarthi-highContrast', highContrast);
  }, [highContrast]);

  useEffect(() => {
    localStorage.setItem('saarthi-voiceOnly', voiceOnly);
  }, [voiceOnly]);

  const syncNow = () => {
    setLastSync(new Date().toISOString());
    localStorage.setItem('saarthi-lastSync', new Date().toISOString());
  };

  return (
    <AppContext.Provider
      value={{
        fontSize,
        setFontSize,
        highContrast,
        setHighContrast,
        voiceOnly,
        setVoiceOnly,
        isOffline,
        lastSync,
        syncNow,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

