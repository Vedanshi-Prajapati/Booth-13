import React from 'react';
import { useSecrets } from '../../context/useSecrets';
import './DevPanel.css';

const BACKDROPS = [
  { id: 'red-curtain', label: 'Red Curtain', haunt: 'Hand parts curtain; open & empty in shot 4' },
  { id: 'wallpaper', label: 'Wallpaper', haunt: 'Faces form in damask; person-shaped gap in shot 4' },
  { id: 'graveyard-fence', label: 'Graveyard Fence', haunt: 'Figure approaches; closer in shot 4 and spot empty' },
  { id: 'empty-hallway', label: 'Empty Hallway', haunt: 'Door opens progressively; fully open with light in shot 4' },
];

export function DevPanel({
  currentShot,
  onSelectShot,
  currentBackdrop,
  onSelectBackdrop,
  onOpenSecretFifthFrame,
}) {
  const {
    unlockedCount,
    totalSecrets,
    isReturningVisitor,
    toggleReturningVisitor,
    resetAllSecrets,
  } = useSecrets();

  return (
    <div className="dev-panel" role="region" aria-label="Shot State & Discovery Dev Panel">
      <div className="dev-panel-header">
        <span className="dev-badge">DEV CONTROLS</span>
        <h3 className="dev-title">Director Console</h3>
      </div>

      {/* Backdrop Selector (Requirement 3: Show all four shot sequences) */}
      <div className="dev-section-group">
        <span className="section-label">Backdrop Environment:</span>
        <div className="backdrop-buttons-grid">
          {BACKDROPS.map((bd) => {
            const isSelected = currentBackdrop === bd.id;
            return (
              <button
                key={bd.id}
                type="button"
                className={`dev-bd-btn ${isSelected ? 'active' : ''}`}
                onClick={() => onSelectBackdrop(bd.id)}
                title={bd.haunt}
              >
                <span className="bd-name">{bd.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Shot Selector (1 to 4) */}
      <div className="dev-section-group">
        <span className="section-label">Shot Sequence (1 to 4):</span>
        <div className="dev-buttons" role="group" aria-label="Shot navigation">
          {[1, 2, 3, 4].map((shotNum) => {
            const isActive = currentShot === shotNum;
            return (
              <button
                key={shotNum}
                type="button"
                id={`dev-shot-btn-${shotNum}`}
                className={`dev-shot-btn ${isActive ? 'active' : ''}`}
                onClick={() => onSelectShot(shotNum)}
                aria-pressed={isActive}
              >
                <span className="btn-shot-num">Shot {shotNum}</span>
                <span className="btn-shot-desc">
                  {shotNum === 1 && 'Subject Only'}
                  {shotNum === 2 && 'Apparition I'}
                  {shotNum === 3 && 'Apparition II'}
                  {shotNum === 4 && 'Vanished'}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Discovery & Return Visit Controls */}
      <div className="dev-section-group discovery-tools">
        <span className="section-label">Discovery & Return Visit:</span>
        <div className="dev-actions-row">
          <button
            type="button"
            className={`dev-toggle-btn ${isReturningVisitor ? 'toggle-on' : ''}`}
            onClick={toggleReturningVisitor}
            title="Toggle between First-Time and Returning Visitor modes"
          >
            Visitor Mode: <strong>{isReturningVisitor ? 'Returning (Again)' : 'First Visit'}</strong>
          </button>

          <button
            type="button"
            className="dev-toggle-btn view-fifth"
            onClick={onOpenSecretFifthFrame}
            title="View the secret 5th photo frame"
          >
            {unlockedCount >= 5 ? '★ View Frame V' : `[Locked] Frame V (${unlockedCount}/5)`}
          </button>
        </div>

        <div className="dev-meta-row">
          <span className="meta-secrets-status">Secrets: {unlockedCount}/{totalSecrets}</span>
          <button
            type="button"
            className="dev-reset-btn"
            onClick={resetAllSecrets}
            title="Reset all secrets in localStorage"
          >
            Reset Secrets
          </button>
        </div>
      </div>
    </div>
  );
}

export default DevPanel;
