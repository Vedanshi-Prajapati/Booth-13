import React from 'react';

export function ScreenHeaderNav({
  currentScreen,
  onGoBack,
  onSelectScreen,
  isMuted,
  onToggleSound
}) {
  const isLanding = currentScreen === 'landing';

  return (
    <header className="quiet-header" aria-label="Booth Navigation">
      {/* Left: Minimal Back Link */}
      <div className="header-zone left">
        {!isLanding && (
          <button
            type="button"
            className="quiet-nav-link"
            onClick={onGoBack}
            id="nav-back-btn"
          >
            ← BACK
          </button>
        )}
      </div>

      {/* Center: Understated Brand Identity */}
      <div
        className="header-zone center brand-clickable"
        onClick={() => onSelectScreen('landing')}
        role="button"
        tabIndex={0}
      >
        <span className="brand-title">BOOTH 13</span>
        <span className="brand-subtitle">PHOTO BOOTH / ARCHIVE</span>
      </div>

      {/* Right: Minimal Understated Controls */}
      <div className="header-zone right">
        <button
          type="button"
          className={`quiet-nav-link ${!isMuted ? 'active-audio' : ''}`}
          onClick={onToggleSound}
          title={isMuted ? 'Enable Sound (M)' : 'Mute Sound (M)'}
          id="toggle-sound-btn"
        >
          {isMuted ? 'AUDIO OFF' : 'AUDIO ON'}
        </button>

        <button
          type="button"
          className="quiet-nav-link"
          onClick={() => onSelectScreen(currentScreen === 'overview' ? 'landing' : 'overview')}
          id="toggle-grid-btn"
        >
          ARCHIVE
        </button>
      </div>
    </header>
  );
}

export default ScreenHeaderNav;
