import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import Button from '../components/Button';
import './SyncStatus.css';

const SyncStatus = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { fontSize, isOffline, lastSync, syncNow } = useApp();

  const handleBack = () => {
    navigate('/home');
  };

  const handleSync = () => {
    if (!isOffline) {
      syncNow();
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return t('sync.never');
    try {
      const date = new Date(dateString);
      return date.toLocaleString();
    } catch {
      return t('sync.never');
    }
  };

  return (
    <div className={`sync-status sync-status-font-${fontSize}`}>
      <div className="sync-status-content">
        <button
          className="back-button"
          onClick={handleBack}
          aria-label={t('common.back')}
        >
          ← {t('common.back')}
        </button>

        <h1 className="sync-status-title">{t('sync.title')}</h1>

        <div className="sync-info">
          <div className="sync-status-item">
            <span className="sync-label">{t('sync.status')}:</span>
            <span className={`sync-value ${isOffline ? 'offline' : 'online'}`}>
              {isOffline ? '📴 ' + t('sync.synced') : '🟢 ' + t('sync.synced')}
            </span>
          </div>

          <div className="sync-status-item">
            <span className="sync-label">{t('sync.lastSync')}:</span>
            <span className="sync-value">{formatDate(lastSync)}</span>
          </div>
        </div>

        <div className="sync-actions">
          <Button
            variant="primary"
            size="large"
            onClick={handleSync}
            disabled={isOffline}
            fullWidth
            ariaLabel={t('sync.syncNow')}
          >
            {isOffline ? t('sync.syncing') : t('sync.syncNow')}
          </Button>
        </div>

        {isOffline && (
          <div className="offline-notice" role="alert">
            <p>{t('sync.syncing')}</p>
            <p className="notice-subtitle">
              You are currently offline. Sync will happen automatically when you are back online.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SyncStatus;

