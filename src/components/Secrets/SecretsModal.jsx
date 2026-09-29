import React from 'react';
import { useSecrets } from '../../context/useSecrets';
import './SecretsModal.css';

export function SecretsModal({ isOpen, onClose }) {
  const { secretsList, unlockedSecrets } = useSecrets();

  if (!isOpen) return null;

  return (
    <div className="secrets-modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="secrets-modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="secrets-modal-header">
          <div className="header-meta">
            <span className="secrets-tag">ARCHIVAL LOG · BOOTH 13</span>
            <h2 className="secrets-modal-title">Secrets Tally ({unlockedSecrets.length}/13)</h2>
          </div>
          <button type="button" className="secrets-close-btn" onClick={onClose} aria-label="Close panel">
            ✕
          </button>
        </div>

        <p className="secrets-subtitle">
          Torn ticket stubs retrieved from the booth’s shadows. Gather 5 to unlock the forbidden fifth frame.
        </p>

        <div className="ticket-stubs-grid">
          {secretsList.map((secret) => {
            const isUnlocked = unlockedSecrets.includes(secret.id);

            return (
              <div
                key={secret.id}
                className={`ticket-stub ${isUnlocked ? 'stub-unlocked' : 'stub-locked'}`}
              >
                <div className="stub-perforation-left" />
                <div className="stub-content">
                  <div className="stub-header-row">
                    <span className="stub-serial">NO. 00{secret.number < 10 ? `0${secret.number}` : secret.number}</span>
                    <span className="stub-status">
                      {isUnlocked ? '✦ FOUND' : '??'}
                    </span>
                  </div>

                  {isUnlocked ? (
                    <>
                      <h4 className="stub-name">{secret.name}</h4>
                      <p className="stub-lore">{secret.lore}</p>
                    </>
                  ) : (
                    <div className="stub-hidden">
                      <span className="stub-obscured">???</span>
                      <p className="stub-clue">{secret.hint}</p>
                    </div>
                  )}
                </div>
                <div className="stub-perforation-right" />
              </div>
            );
          })}
        </div>

        <div className="secrets-modal-footer">
          <span className="footer-whisper">“Some memories are printed in invisible developer.”</span>
          <button type="button" className="footer-back-btn" onClick={onClose}>
            Return to Booth
          </button>
        </div>
      </div>
    </div>
  );
}

export default SecretsModal;
