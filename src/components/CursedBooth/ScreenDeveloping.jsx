import React, { useState, useEffect } from 'react';
import { soundEngine } from '../../utils/audio';

export function ScreenDeveloping({ onComplete }) {
  const [density, setDensity] = useState(0.05);

  useEffect(() => {
    soundEngine.playDeveloping();
    const startTime = Date.now();
    const duration = 2200;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(1, elapsed / duration);
      setDensity(0.05 + progress * 0.95);

      if (progress >= 1) {
        clearInterval(interval);
        setTimeout(onComplete, 400);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <section className="developing-quiet-chamber" aria-label="Developing Photograph">
      <div className="developing-photo-stage">
        <img
          src="/assets/photo_01.jpg"
          alt="Latent photograph emerging"
          className="developing-photo-img"
          style={{ opacity: density, filter: `contrast(${0.8 + density * 0.4})` }}
        />
        <div className="developing-chemical-wash" />
      </div>

      <div className="developing-caption-whisper">
        DEVELOPING
      </div>
    </section>
  );
}

export default ScreenDeveloping;
