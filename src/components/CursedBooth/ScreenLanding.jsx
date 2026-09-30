import React, { useState } from 'react';
import { soundEngine } from '../../utils/audio';

export function ScreenLanding({ onEnter }) {
  const [coinClicks, setCoinClicks] = useState(0);
  const [coinInserted, setCoinInserted] = useState(false);
  const [easterEggActive, setEasterEggActive] = useState(false);

  const handleCoinInsert = () => {
    soundEngine.playCoin();
    const nextCount = coinClicks + 1;
    setCoinClicks(nextCount);
    setCoinInserted(true);
    setTimeout(() => setCoinInserted(false), 600);

    // Easter egg from SPEC: Click coin slot 13 times
    if (nextCount === 13) {
      setEasterEggActive(true);
      soundEngine.playJumpscare();
    }
  };

  const handleEnterBooth = () => {
    soundEngine.playCurtain();
    onEnter();
  };

  return (
    <section className="landing-screen" aria-label="The Cursed Photo Booth Entrance">
      <div className="landing-left">
        {/* Editorial Signboard */}
        <div className="vintage-marquee-sign">
          <div className="marquee-content">
            <span className="sign-kicker">PHOTOS · 4 FOR 1 SOUL</span>
            <h1 className="sign-main">BOOTH 13</h1>
            <span className="sign-sub">THE CURSED PHOTO BOOTH</span>
          </div>
        </div>

        <p className="landing-tagline">
          Four photos.<br />
          <span className="tagline-emphasis">One of them won't include you.</span>
        </p>

        {/* Coin Slot & Enter Button Row */}
        <div className="landing-action-cluster">
          <button
            type="button"
            className="btn-enter-booth"
            onClick={handleEnterBooth}
            id="enter-booth-btn"
          >
            <span>ENTER THE BOOTH</span>
            <span className="btn-key-hint">↵ ENTER</span>
          </button>

          {/* Brass Coin Slot */}
          <button
            type="button"
            className={`vintage-coin-slot ${coinInserted ? 'active-drop' : ''}`}
            onClick={handleCoinInsert}
            title="Click to drop 13¢ coin"
            aria-label="Insert 13 cents coin slot"
            id="insert-coin-btn"
          >
            <div className="coin-slot-mouth">
              <span className="coin-aperture" />
            </div>
            <div className="coin-slot-label">
              INSERT 13¢
            </div>
            <div className="coin-click-counter">
              {coinClicks > 0 && `${coinClicks}¢ FEED`}
            </div>
          </button>
        </div>

        {easterEggActive && (
          <div className="easter-egg-banner" role="alert">
            ✦ CURSE UNLOCKED: Extra Strip 0013 Commencing... ✦
          </div>
        )}

        {/* Spec requirement: State on the first screen that processing is on-device */}
        <div className="landing-privacy-badge">
          <span>100% On-Device · No images leave your browser · No backend</span>
        </div>

        <p className="landing-disclaimer">
          No refunds. No retakes. Probably.
        </p>
      </div>

      <div className="landing-right">
        <div className="booth-exterior-card">
          <img
            src="/assets/booth_exterior.jpg"
            alt="The Cursed Photo Booth Exterior"
            className="booth-exterior-img"
          />
        </div>
      </div>
    </section>
  );
}
