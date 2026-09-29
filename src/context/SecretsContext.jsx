import React, { useState, useEffect } from 'react';
import { SecretsContext } from './context';
import { SECRETS_LIST } from '../data/secretsData';

export function SecretsProvider({ children }) {
  // Load saved secrets from localStorage if available
  const [unlockedSecrets, setUnlockedSecrets] = useState(() => {
    try {
      const saved = localStorage.getItem('booth13_secrets');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Track returning visitor
  const [isReturningVisitor, setIsReturningVisitor] = useState(() => {
    try {
      return localStorage.getItem('booth13_visited') === 'true';
    } catch {
      return false;
    }
  });

  // Active toast for recently found secret: { id, name }
  const [latestSecretToast, setLatestSecretToast] = useState(null);

  // Active note card modal: { title, text, type }
  const [activeNoteCard, setActiveNoteCard] = useState(null);

  // Save unlocked secrets to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('booth13_secrets', JSON.stringify(unlockedSecrets));
    } catch {
      // storage unavailable
    }
  }, [unlockedSecrets]);

  // Set visitor flag
  useEffect(() => {
    try {
      if (!isReturningVisitor) {
        // Mark that user has visited once
        const timer = setTimeout(() => {
          localStorage.setItem('booth13_visited', 'true');
        }, 3000);
        return () => clearTimeout(timer);
      }
    } catch {
      // ignore
    }
  }, [isReturningVisitor]);

  const unlockSecret = (secretId) => {
    const secretItem = SECRETS_LIST.find((s) => s.id === secretId);
    if (!secretItem) return false;

    setUnlockedSecrets((prev) => {
      if (prev.includes(secretId)) {
        return prev;
      }
      const updated = [...prev, secretId];

      // Trigger stamp notification
      setLatestSecretToast({
        id: secretItem.id,
        name: secretItem.name,
        number: secretItem.number,
      });

      // Auto clear toast after 4s
      setTimeout(() => {
        setLatestSecretToast((curr) => (curr?.id === secretItem.id ? null : curr));
      }, 4200);

      return updated;
    });

    return true;
  };

  const toggleReturningVisitor = () => {
    setIsReturningVisitor((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('booth13_visited', String(next));
      } catch {
        // ignore
      }
      if (next) {
        unlockSecret('returning_visit');
      }
      return next;
    });
  };

  const resetAllSecrets = () => {
    setUnlockedSecrets([]);
    try {
      localStorage.removeItem('booth13_secrets');
    } catch {
      // ignore
    }
  };

  return (
    <SecretsContext.Provider
      value={{
        secretsList: SECRETS_LIST,
        unlockedSecrets,
        unlockedCount: unlockedSecrets.length,
        totalSecrets: SECRETS_LIST.length,
        unlockSecret,
        latestSecretToast,
        setLatestSecretToast,
        activeNoteCard,
        setActiveNoteCard,
        isReturningVisitor,
        setIsReturningVisitor,
        toggleReturningVisitor,
        resetAllSecrets,
      }}
    >
      {children}
    </SecretsContext.Provider>
  );
}

export default SecretsProvider;
