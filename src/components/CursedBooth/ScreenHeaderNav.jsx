import React from 'react';
import { CustomizerIcon } from './CustomizerIcons';

export function ScreenHeaderNav({
  currentScreen,
  onGoBack,
  onSelectScreen,
  isMuted,
  onToggleSound
}) {
  const isLanding = currentScreen === 'landing';

  return (
    <header className="screen-nav-bar" aria-label="Booth Navigation Controls">
      {/* Left side: Back Button or Booth Badge */}
      <div className="nav-left-section">
        {!isLanding ? (
          <button
            type="button"
            className="nav-back-button"
            onClick={onGoBack}
            title="Return to previous screen"
            aria-label="Back"
            id="nav-back-btn"
          >
            <CustomizerIcon name="arrow_back" size={16} />
            <span className="back-text">BACK</span>
          </button>
        ) : (
          <div className="nav-booth-emblem" aria-hidden="true">
            <span className="emblem-dot" />
            <span className="emblem-text">EST. 1913</span>
          </div>
        )}
      </div>

      {/* Center: Atmospheric Booth Marquee */}
      <div className="nav-marquee" onClick={() => onSelectScreen('landing')} role="button" tabIndex={0} title="Booth 13 Home">
        <h1 className="nav-marquee-title">
          BOOTH <span className="title-number">13</span>
        </h1>
        <span className="nav-marquee-subtitle">
          {currentScreen === 'customize' && 'SELECTION CHAMBER'}
          {currentScreen === 'countdown' && 'PREPARE FOR FLASH'}
          {currentScreen === 'developing' && 'DARKROOM BATH'}
          {currentScreen.startsWith('photo') && 'DEVELOPED STILL'}
          {currentScreen === 'revelation' && 'THE OCCURRENCE'}
          {currentScreen === 'strip' && 'MEMORY STRIP'}
          {currentScreen === 'actions' && 'ARCHIVAL LOG'}
          {currentScreen === 'overview' && 'ALL CHAMBERS'}
          {currentScreen === 'landing' && 'FOUR PHOTOS · ONE SOUL'}
        </span>
      </div>

      {/* Right side: Audio Mute & Grid View */}
      <div className="nav-tools">
        <button
          type="button"
          className={`nav-icon-btn ${!isMuted ? 'sound-active' : ''}`}
          onClick={onToggleSound}
          title={isMuted ? 'Sound Off (Press M to enable)' : 'Sound Active (Press M to mute)'}
          aria-label={isMuted ? 'Unmute Sound' : 'Mute Sound'}
          id="toggle-sound-btn"
        >
          <CustomizerIcon
            name={isMuted ? 'sound_off' : 'sound_on'}
            size={18}
            color={isMuted ? '#8a91a3' : '#ffb347'}
          />
          {!isMuted && (
            <span className="sound-waves-indicator" aria-hidden="true">
              <span className="wave-bar w1" />
              <span className="wave-bar w2" />
              <span className="wave-bar w3" />
            </span>
          )}
        </button>

        <button
          type="button"
          className={`nav-icon-btn ${currentScreen === 'overview' ? 'active' : ''}`}
          onClick={() => onSelectScreen(currentScreen === 'overview' ? 'landing' : 'overview')}
          title="Toggle Grid Overview"
          aria-label="Toggle Grid Overview"
          id="toggle-grid-btn"
        >
          <CustomizerIcon name="grid" size={17} color={currentScreen === 'overview' ? '#ffb347' : '#9da3b4'} />
        </button>
      </div>
    </header>
  );
}

export default ScreenHeaderNav;
