import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { AppProvider } from './context/AppContext';
import AppWrapper from './AppWrapper';
import Splash from './screens/Splash';
import Onboarding from './screens/Onboarding';
import LanguageSelection from './screens/LanguageSelection';
import Home from './screens/Home';
import CategoryInteraction from './screens/CategoryInteraction';
import VoiceListening from './screens/VoiceListening';
import AIResult from './screens/AIResult';
import Settings from './screens/Settings';
import SyncStatus from './screens/SyncStatus';
import './App.css';

function App() {
  return (
    <LanguageProvider>
      <AppProvider>
        <AppWrapper>
          <Router>
            <div className="App">
              <Routes>
                <Route path="/" element={<Splash />} />
                <Route path="/onboarding" element={<Onboarding />} />
                <Route path="/language" element={<LanguageSelection />} />
                <Route path="/home" element={<Home />} />
                <Route path="/category/:category" element={<CategoryInteraction />} />
                <Route path="/voice/:category" element={<VoiceListening />} />
                <Route path="/result/:category" element={<AIResult />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/sync" element={<SyncStatus />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </div>
          </Router>
        </AppWrapper>
      </AppProvider>
    </LanguageProvider>
  );
}

export default App;

