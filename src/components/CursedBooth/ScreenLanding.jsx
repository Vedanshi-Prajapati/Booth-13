import React, { useState } from 'react';
import { soundEngine } from '../../utils/audio';

export function ScreenLanding({ onEnter, isMuted, onToggleSound }) {
  const [coinClicks, setCoinClicks] = useState(0);
  const [easterEggActive, setEasterEggActive] = useState(false);

  const handleCoinInsert = (e) => {
    e.stopPropagation();
    soundEngine.playCoin();
    const nextCount = coinClicks + 1;
    setCoinClicks(nextCount);

    if (nextCount === 13) {
      setEasterEggActive(true);
      soundEngine.playJumpscare();
    }
  };

  const handleEnterBooth = () => {
    if (isMuted && onToggleSound) {
      onToggleSound();
    }
    soundEngine.playCurtain();
    onEnter();
  };

  return (
    <section className="cinema-landing" aria-label="Booth 13 Entrance">
      {/* Full-bleed visual hero: The physical abandoned booth */}
      <div className="landing-photograph-stage">
        <img
          src="/assets/booth_exterior.jpg"
          alt="The Abandoned Booth 13"
          className="hero-booth-photograph"
        />
        <div className="photographic-shadow-veil" />
      </div>

      {/* Cinematic Film Title Composition directly within the frame */}
      <div className="landing-title-composition">
        <div className="film-prelude">EST. 1913 · ARCHIVAL RECORD</div>

        <h1 className="film-monument-title">BOOTH 13</h1>
        
        <p className="film-subtitle">THE CURSED PHOTO BOOTH</p>

        <p className="film-narrative-lead">
          Four photographs.<br />
          <em>One of them won’t include you.</em>
        </p>

        <div className="film-action-group">
          <button
            type="button"
            className="btn-film-primary"
            onClick={handleEnterBooth}
            id="enter-booth-btn"
          >
            ENTER THE BOOTH →
          </button>

          {/* Discreet physical coin mechanism integrated into the booth */}
          <button
            type="button"
            className="discreet-coin-mechanism"
            onClick={handleCoinInsert}
            title="Drop 13¢ coin"
            aria-label="Insert 13 cents coin"
            id="insert-coin-btn"
          >
            <span className="coin-slot-slit" />
            <span className="coin-slot-label">
              {coinClicks === 0 ? 'INSERT 13¢' : `${coinClicks}¢ DEPOSITED`}
            </span>
          </button>
        </div>

        {easterEggActive && (
          <div className="film-anomaly-whisper" role="alert">
            Anomaly awakened. Extra exposure logged in chamber.
          </div>
        )}

        <div className="film-quiet-assurance">
          100% on-device · No image leaves your browser
        </div>
      </div>
    </section>
  );
}

export default ScreenLanding;
