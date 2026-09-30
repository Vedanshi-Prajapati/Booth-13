import React, { useState, useEffect } from 'react';
import { soundEngine } from '../../utils/audio';

export function ScreenRevelation({ onProceed }) {
  const [showSecondLine, setShowSecondLine] = useState(false);
  const [showAction, setShowAction] = useState(false);

  useEffect(() => {
    soundEngine.setScreen('revelation');

    const timer1 = setTimeout(() => {
      setShowSecondLine(true);
    }, 1400);

    const timer2 = setTimeout(() => {
      setShowAction(true);
    }, 2800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <section className="reveal-absence-viewport" aria-label="Final Revelation">
      <div className="reveal-photograph-stage">
        <img
          src="/assets/photo_04.jpg"
          alt="The empty chair left behind"
          className="reveal-absence-photo"
        />
        <div className="reveal-shadow-gradient" />
      </div>

      <div className="reveal-text-composition">
        <p className="reveal-line-prelude">
          YOU LEFT SOMETHING BEHIND.
        </p>

        {showSecondLine && (
          <h1 className="reveal-line-monument">
            YOURSELF.
          </h1>
        )}

        {showAction && (
          <div className="reveal-action-fade">
            <button
              type="button"
              className="btn-view-strip-quiet"
              onClick={onProceed}
              id="proceed-strip-btn"
            >
              VIEW THE STRIP →
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default ScreenRevelation;
