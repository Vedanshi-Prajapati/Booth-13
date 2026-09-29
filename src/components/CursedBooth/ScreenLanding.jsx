import React from 'react';

export function ScreenLanding({ onEnter }) {
  return (
    <section className="landing-screen" aria-label="The Cursed Photo Booth Entrance">
      <div className="landing-left">
        <div className="landing-title-group">
          <h2 className="title-sub">THE CURSED</h2>
          <h1 className="title-main">PHOTO BOOTH</h1>
        </div>

        <p className="landing-tagline">
          Four photos.<br />
          One memory you won't forget.
        </p>

        <button
          type="button"
          className="btn-enter-booth"
          onClick={onEnter}
          id="enter-booth-btn"
        >
          ENTER THE BOOTH
        </button>

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
