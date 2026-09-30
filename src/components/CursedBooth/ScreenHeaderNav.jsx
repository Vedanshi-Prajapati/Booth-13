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
    <header className="archival-top-nav" aria-label="Darkroom Navigation Controls">
      {/* Left: Physical Back Lever / Est. Mark */}
      <div className="nav-control-left">
        {!isLanding ? (
          <button
            type="button"
            className="nav-lever-button"
            onClick={onGoBack}
            title="Return to previous screen [Esc]"
            aria-label="Back"
            id="nav-back-btn"
          >
            <CustomizerIcon name="arrow_back" size={14} />
            <span className="lever-label">BACK</span>
          </button>
        ) : (
          <div className="nav-provenance-stamp">
            <span className="provenance-dot" />
            <span>EST. 1913</span>
          </div>
        )}
      </div>

      {/* Center: Monolithic Booth 13 Display */}
      <div
        className="nav-center-mast"
        onClick={() => onSelectScreen('landing')}
        role="button"
        tabIndex={0}
        title="Return to Booth 13 Entrance"
      >
        <span className="nav-title-main">
          BOOTH <span className="nav-title-num">13</span>
        </span>
        <span className="nav-screen-indicator">
          {currentScreen === 'landing' && 'ENTRANCE'}
          {currentScreen === 'customize' && 'PLATE PREPARATION'}
          {currentScreen === 'countdown' && 'SHUTTER CHAMBER'}
          {currentScreen === 'developing' && 'CHEMICAL BATH'}
          {currentScreen === 'photo1' && 'EXPOSURE 01'}
          {currentScreen === 'photo2' && 'EXPOSURE 02'}
          {currentScreen === 'photo3' && 'EXPOSURE 03'}
          {currentScreen === 'photo4' && 'EXPOSURE 04'}
          {currentScreen === 'revelation' && 'ANOMALY LOG'}
          {currentScreen === 'strip' && 'CONTACT PROOF'}
          {currentScreen === 'actions' && 'ARCHIVAL LOG'}
          {currentScreen === 'overview' && 'ALL SPECIMENS'}
        </span>
      </div>

      {/* Right: Camera / Darkroom Hardware Switches */}
      <div className="nav-control-right">
        <button
          type="button"
          className={`nav-hardware-switch ${!isMuted ? 'active' : ''}`}
          onClick={onToggleSound}
          title={isMuted ? 'Sound Off [M to activate]' : 'Sound Active [M to mute]'}
          aria-label={isMuted ? 'Unmute Sound' : 'Mute Sound'}
          id="toggle-sound-btn"
        >
          <CustomizerIcon
            name={isMuted ? 'sound_off' : 'sound_on'}
            size={15}
            color={isMuted ? '#8a8880' : '#c89f5c'}
          />
          <span className="switch-text">{isMuted ? 'MUTED' : 'AUDIO'}</span>
        </button>

        <button
          type="button"
          className={`nav-hardware-switch ${currentScreen === 'overview' ? 'active' : ''}`}
          onClick={() => onSelectScreen(currentScreen === 'overview' ? 'landing' : 'overview')}
          title="Toggle Specimen Matrix Overview"
          aria-label="Toggle Specimen Matrix"
          id="toggle-grid-btn"
        >
          <CustomizerIcon
            name="grid"
            size={14}
            color={currentScreen === 'overview' ? '#c89f5c' : '#8a8880'}
          />
          <span className="switch-text">MATRIX</span>
        </button>
      </div>
    </header>
  );
}

export default ScreenHeaderNav;
