import React, { useEffect } from 'react';
import { soundEngine } from '../../utils/audio';

export function ScreenRevelation({ onProceed }) {
  useEffect(() => {
    soundEngine.playJumpscare();
  }, []);

  return (
    <section className="revelation-screen" aria-label="Horror Climax Revelation">
      <div className="screamer-card">
        <img
          src="/assets/jumpscare.jpg"
          alt="Distorted Entity"
          className="screamer-img"
        />

        <div className="revelation-text-overlay">
          <h2 className="rev-line-1">
            YOU LEFT SOMETHING<br />
            BEHIND.
          </h2>
          <h1 className="rev-line-2">
            YOURSELF.
          </h1>

          <button
            type="button"
            className="btn-proceed-strip"
            onClick={onProceed}
            id="proceed-strip-btn"
          >
            VIEW YOUR STRIP →
          </button>
        </div>
      </div>
    </section>
  );
}
