import React, { useState, useEffect, useRef } from 'react';
import { useSecrets } from '../../context/useSecrets';
import { SecretsModal } from '../Secrets/SecretsModal';
import './TopBar.css';

export function TopBar({ activeScene, onSelectScene }) {
  const {
    unlockedCount,
    totalSecrets,
    latestSecretToast,
    isReturningVisitor,
  } = useSecrets();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stampActive, setStampActive] = useState(false);
  const prevCountRef = useRef(unlockedCount);

  // Trigger stamp animation when unlockedCount increases
  useEffect(() => {
    if (unlockedCount > prevCountRef.current) {
      prevCountRef.current = unlockedCount;
      const animTimer = setTimeout(() => setStampActive(true), 10);
      const resetTimer = setTimeout(() => setStampActive(false), 950);
      return () => {
        clearTimeout(animTimer);
        clearTimeout(resetTimer);
      };
    }
    prevCountRef.current = unlockedCount;
  }, [unlockedCount]);

  return (
    <>
      <header className="topbar">
        {/* Navigation between Booth and The Wall */}
        <nav className="topbar-nav" aria-label="Scene navigation">
          <button
            type="button"
            className={`topbar-nav-btn ${activeScene === 'booth' ? 'active' : ''}`}
            onClick={() => onSelectScene('booth')}
          >
            Booth 13
          </button>
          <button
            type="button"
            className={`topbar-nav-btn ${activeScene === 'wall' ? 'active' : ''}`}
            onClick={() => onSelectScene('wall')}
          >
            The Wall
          </button>
        </nav>

        {/* Center Visitor Status indicator */}
        <div className="topbar-center">
          {isReturningVisitor ? (
            <span className="returning-banner">
              <span className="flicker-bulb">●</span> WELCOME BACK
            </span>
          ) : (
            <span className="booth-status-idle">CURTAIN READY</span>
          )}
        </div>

        {/* Right side: Secrets Tally Button */}
        <div className="topbar-right">
          <button
            type="button"
            id="secrets-tally-btn"
            className={`secrets-tally-btn ${stampActive ? 'stamped' : ''}`}
            onClick={() => setIsModalOpen(true)}
            title="Click to view discovered secrets"
          >
            <span className="ticket-icon" aria-hidden="true" style={{ display: 'inline-flex', alignItems: 'center' }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/>
                <path d="M13 5v2"/>
                <path d="M13 17v2"/>
                <path d="M13 11v2"/>
              </svg>
            </span>
            <span className="tally-text">Secrets {unlockedCount}/{totalSecrets}</span>
            {stampActive && <span className="stamp-overlay">+1</span>}
          </button>
        </div>
      </header>

      {/* Secret Found Stamp Toast */}
      {latestSecretToast && (
        <aside className="secret-found-toast" role="status" aria-live="polite">
          <div className="toast-stamp-mark">EVIDENCE UNLOCKED</div>
          <div className="toast-content">
            <span className="toast-tag">Secret found:</span>
            <strong className="toast-name">“{latestSecretToast.name}”</strong>
          </div>
        </aside>
      )}

      {/* Secrets Drawer / Modal */}
      <SecretsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}

export default TopBar;
