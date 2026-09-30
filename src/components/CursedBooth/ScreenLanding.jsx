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
    setTimeout(() => setCoinInserted(false), 500);

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
    <section className="landing-editorial-viewport" aria-label="Booth 13 Entrance">
      {/* Left Column: Brand & Archival Typography (~45% width) */}
      <div className="landing-editorial-col">
        <header className="landing-masthead">
          <div className="landing-archival-kicker">
            <span className="kicker-rule" />
            <span className="kicker-text">ARCHIVAL RECORD · EST. 1913</span>
          </div>

          <h1 className="landing-hero-title">
            BOOTH <span className="title-numeral">13</span>
          </h1>

          <div className="landing-hero-subtitle">
            THE CURSED PHOTO BOOTH
          </div>
        </header>

        <div className="landing-copy-block">
          <p className="landing-editorial-quote">
            “Four photographs.<br />
            <span className="quote-emphasis">One of them won’t include you.”</span>
          </p>
          <p className="landing-synopsis">
            A vintage silver-halide booth found abandoned at the pier. Each exposure penetrates
            deeper into the shadows. Take your seat, insert your coin, and keep your eyes forward.
          </p>
        </div>

        {/* Primary CTA and Analog Coin Mechanism */}
        <div className="landing-action-row">
          <button
            type="button"
            className="btn-enter-editorial"
            onClick={handleEnterBooth}
            id="enter-booth-btn"
          >
            <span className="btn-label">ENTER THE BOOTH</span>
            <span className="btn-key-code">↵ ENTER</span>
          </button>

          {/* Authentic Brass Coin Slot */}
          <button
            type="button"
            className={`analog-coin-slot ${coinInserted ? 'coin-drop' : ''}`}
            onClick={handleCoinInsert}
            title="Click to drop 13¢ coin"
            aria-label="Insert 13 cents coin slot"
            id="insert-coin-btn"
          >
            <div className="coin-slot-housing">
              <span className="coin-chute" />
            </div>
            <div className="coin-slot-text">INSERT 13¢</div>
            {coinClicks > 0 && (
              <span className="coin-deposited-count">{coinClicks}¢ IN CHUTE</span>
            )}
          </button>
        </div>

        {easterEggActive && (
          <div className="easter-egg-archival-note" role="alert">
            ✦ ANOMALY DETECTED: Extra Strip 0013 Commencing... ✦
          </div>
        )}

        {/* Mandatory Spec Verification: 100% On-Device */}
        <footer className="landing-editorial-footer">
          <div className="footer-spec-badge">
            <span className="status-dot" />
            <span>100% ON-DEVICE · NO IMAGE LEAVES YOUR BROWSER · ZERO CLOUD</span>
          </div>
          <div className="footer-disclaimer">
            Silver-halide chemical processing. No refunds. No retakes.
          </div>
        </footer>
      </div>

      {/* Right Column: Hero Photograph of Booth 13 (~55% width) */}
      <div className="landing-photo-col">
        <figure className="booth-photographic-plate">
          <div className="plate-inner-mat">
            <img
              src="/assets/booth_exterior.jpg"
              alt="Booth 13 abandoned vintage photo booth exterior"
              className="booth-plate-image"
            />
          </div>
          <figcaption className="plate-caption">
            <span className="plate-id">FIG. 01 — THE BOOTH (ORIGINAL SPECIMEN)</span>
            <span className="plate-origin">RECOVERED AT DUSK</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

export default ScreenLanding;
