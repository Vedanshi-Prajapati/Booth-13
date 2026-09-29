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
        {/* Vintage Neon / Marquee Sign */}
        <div className="vintage-marquee-sign">
          <div className="marquee-bulbs top">
            <span className="bulb b1" /><span className="bulb b2" /><span className="bulb b3" />
            <span className="bulb b4" /><span className="bulb b5" /><span className="bulb b6" />
          </div>
          <div className="marquee-content">
            <span className="sign-kicker">PHOTOS · 4 FOR 1 SOUL</span>
            <h1 className="sign-main">BOOTH 13</h1>
            <span className="sign-sub">THE CURSED PHOTO BOOTH</span>
          </div>
          <div className="marquee-bulbs bottom">
            <span className="bulb b6" /><span className="bulb b5" /><span className="bulb b4" />
            <span className="bulb b3" /><span className="bulb b2" /><span className="bulb b1" />
          </div>
        </div>

        <p className="landing-tagline">
          Four photos.<br />
          <span className="tagline-emphasis">One of them won't include you.</span>
        </p>

        {/* Interactive Coin Slot & Enter Button Row */}
        <div className="landing-action-cluster">
          <button
            type="button"
            className="btn-enter-booth"
            onClick={handleEnterBooth}
            id="enter-booth-btn"
          >
            <span className="btn-icon">🚪</span>
            <span>ENTER THE BOOTH</span>
            <span className="btn-key-hint">↵ ENTER</span>
          </button>

          {/* Authentic Brass Coin Slot */}
          <button
            type="button"
            className={`vintage-coin-slot ${coinInserted ? 'active-drop' : ''}`}
            onClick={handleCoinInsert}
            title="Click to drop 13¢ coin"
            aria-label="Insert 13 cents coin slot"
            id="insert-coin-btn"
          >
            <div className="slot-screws">
              <span className="brass-screw tl" />
              <span className="brass-screw tr" />
            </div>
            <div className="coin-slot-mouth">
              <span className="coin-aperture" />
            </div>
            <div className="coin-slot-label">
              INSERT 13¢
            </div>
            <div className="coin-click-counter">
              {coinClicks > 0 && `${coinClicks}¢ FEED`}
            </div>
            <div className="slot-screws">
              <span className="brass-screw bl" />
              <span className="brass-screw br" />
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
          <span className="badge-shield">🔒</span>
          <span>100% On-Device · No images leave your browser · No backend</span>
        </div>

        <p className="landing-disclaimer">
          No refunds. No retakes. Probably.
        </p>
      </div>

      <div className="landing-right">
        <div className="booth-exterior-card">
          <div className="booth-card-glass-glow" />
          <img
            src="/assets/booth_exterior.jpg"
            alt="The Cursed Photo Booth Exterior"
            className="booth-exterior-img"
          />
          <div className="booth-curtain-teaser">
            <span className="curtain-slit" />
            <span className="curtain-whisper">“Enter alone...”</span>
          </div>
        </div>
      </div>
    </section>
  );
}
