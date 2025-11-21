import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import Card from '../components/Card';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { fontSize, isOffline } = useApp();

  const categories = [
    {
      id: 'health',
      icon: '🏥',
      title: t('home.health'),
      route: '/category/health',
    },
    {
      id: 'firstAid',
      icon: '🩹',
      title: t('home.firstAid'),
      route: '/category/firstAid',
    },
    {
      id: 'fireSafety',
      icon: '🔥',
      title: t('home.fireSafety'),
      route: '/category/fireSafety',
    },
    {
      id: 'disasterHelp',
      icon: '🌪️',
      title: t('home.disasterHelp'),
      route: '/category/disasterHelp',
    },
    {
      id: 'awareness',
      icon: '📚',
      title: t('home.awareness'),
      route: '/category/awareness',
    },
  ];

  const handleCategoryClick = (route) => {
    navigate(route);
  };

  const handleSettingsClick = () => {
    navigate('/settings');
  };

  const handleSyncStatusClick = () => {
    navigate('/sync');
  };

  return (
    <div className={`home home-font-${fontSize}`}>
      <div className="home-header">
        <h1 className="home-title">{t('home.title')}</h1>
        <p className="home-subtitle">{t('home.subtitle')}</p>
        {isOffline && (
          <div className="offline-indicator" role="status" aria-label="Offline mode">
            📴 {t('sync.status')}: {t('sync.synced')}
          </div>
        )}
      </div>

      <div className="home-categories">
        {categories.map((category) => (
          <Card
            key={category.id}
            onClick={() => handleCategoryClick(category.route)}
            icon={category.icon}
            title={category.title}
            ariaLabel={`${category.title} category`}
          />
        ))}
      </div>

      <div className="home-footer">
        <button
          className="footer-button"
          onClick={handleSettingsClick}
          aria-label={t('home.settings')}
        >
          ⚙️ {t('home.settings')}
        </button>
        <button
          className="footer-button"
          onClick={handleSyncStatusClick}
          aria-label={t('home.syncStatus')}
        >
          🔄 {t('home.syncStatus')}
        </button>
      </div>
    </div>
  );
};

export default Home;

