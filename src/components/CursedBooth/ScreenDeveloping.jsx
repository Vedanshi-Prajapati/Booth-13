import React, { useState, useEffect } from 'react';
import { soundEngine } from '../../utils/audio';

export function ScreenDeveloping({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    soundEngine.playDeveloping();
    const startTime = Date.now();
    const duration = 2400; // 2.4 seconds developing

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(pct);

      if (pct >= 100) {
        clearInterval(interval);
        setTimeout(onComplete, 400);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <section className="developing-screen" aria-label="Photo Developing Process">
      <div className="developing-photo-card">
        <div className="developing-plate">
          <img
            src="/assets/photo_01.jpg"
            alt="Developing Film"
            className="developing-fade-img"
            style={{ opacity: 0.15 + (progress / 100) * 0.85 }}
          />
          <div className="developing-chemical-overlay" />
        </div>
      </div>

      <div className="developing-text-label">
        PHOTO DEVELOPING...
      </div>

      <div className="developing-progress-bar-wrap" role="progressbar" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100">
        <div
          className="developing-progress-fill"
          style={{ width: `${progress}%` }}
        />
      </div>
    </section>
  );
}
