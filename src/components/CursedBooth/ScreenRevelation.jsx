import React, { useEffect } from 'react';
import { soundEngine } from '../../utils/audio';

export function ScreenRevelation({ onProceed }) {
  useEffect(() => {
    soundEngine.playJumpscare();
  }, []);

  return (
    <section className="revelation-cinematic-viewport" aria-label="The Horror Climax Revelation">
      {/* Dominant Photograph Partially Concealed in Deep Darkness */}
      <div className="revelation-cinema-frame">
        <img
          src="/assets/jumpscare.jpg"
          alt="Distorted Entity lurking in the booth darkness"
          className="revelation-entity-plate"
        />

        {/* Cinematic Vignette Shadow Shroud */}
        <div className="revelation-shadow-shroud" />

        {/* Minimal Stark Editorial Text Overlay */}
        <div className="revelation-editorial-overlay">
          <div className="revelation-text-block">
            <span className="revelation-line-prelude">
              YOU LEFT SOMETHING BEHIND.
            </span>
            <h1 className="revelation-line-monument">
              YOURSELF.
            </h1>
          </div>

          <div className="revelation-action-block">
            <button
              type="button"
              className="btn-view-strip-editorial"
              onClick={onProceed}
              id="proceed-strip-btn"
            >
              <span>VIEW YOUR STRIP</span>
              <span className="btn-arrow">→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ScreenRevelation;
