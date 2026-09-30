import React, { useState, useEffect } from 'react';
import { soundEngine } from '../../utils/audio';

export function ScreenDeveloping({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    soundEngine.playDeveloping();
    const startTime = Date.now();
    const duration = 2400; // 2.4 seconds developing per SPEC

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(pct);

      if (pct >= 100) {
        clearInterval(interval);
        setTimeout(onComplete, 350);
      }
    }, 35);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <section className="darkroom-developing-viewport" aria-label="Darkroom Chemical Development Process">
      <div className="darkroom-tray-stage">
        {/* Physical Photographic Plate Emerging in Chemical Tray */}
        <figure className="developing-print-mount">
          <div className="developing-bath-tray">
            <img
              src="/assets/photo_01.jpg"
              alt="Film latent image developing in chemical bath"
              className="developing-latent-image"
              style={{ opacity: 0.12 + (progress / 100) * 0.88 }}
            />
            <div className="chemical-liquid-ripple" />
          </div>

          <figcaption className="developing-tray-caption">
            <span className="tray-id">TRAY BATH NO. 01 — FIXER & ACCELERATOR</span>
            <span className="tray-pct">{progress}% LATENT DENSITY</span>
          </figcaption>
        </figure>

        <div className="developing-status-block">
          <div className="developing-process-title">
            DEVELOPING SILVER-HALIDE STILL
          </div>
          <div
            className="developing-hairline-meter"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin="0"
            aria-valuemax="100"
          >
            <div className="meter-fill" style={{ width: `${progress}%` }} />
          </div>
          <div className="developing-note">
            Archival fixer setting. Do not open chamber.
          </div>
        </div>
      </div>
    </section>
  );
}

export default ScreenDeveloping;
