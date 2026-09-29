import React, { useState, useEffect } from 'react';
import { soundEngine } from '../../utils/audio';

export function ScreenCountdown({ onComplete }) {
  const [step, setStep] = useState(3); // 3, 2, 1, 'FLASH', 'DONE'
  const showFlash = step === 'FLASH' || step === 'DONE';

  useEffect(() => {
    let timer;
    if (step === 3) {
      soundEngine.playTick();
      timer = setTimeout(() => setStep(2), 1000);
    } else if (step === 2) {
      soundEngine.playTick();
      timer = setTimeout(() => setStep(1), 1000);
    } else if (step === 1) {
      soundEngine.playTick();
      timer = setTimeout(() => setStep('FLASH'), 1000);
    } else if (step === 'FLASH') {
      soundEngine.playFlash();
      timer = setTimeout(() => {
        setStep('DONE');
        onComplete();
      }, 700);
    }
    return () => clearTimeout(timer);
  }, [step, onComplete]);

  return (
    <section className="countdown-screen" aria-label="Inside Photo Booth Countdown">
      {showFlash && <div className="flash-whiteout" />}

      <div className="booth-interior-frame">
        <img
          src="/assets/booth_interior.jpg"
          alt="Inside the Photo Booth"
          className="booth-interior-bg"
        />

        <div className="countdown-overlay">
          {typeof step === 'number' && (
            <div className="countdown-number" key={step}>
              {step}
            </div>
          )}

          {step === 'FLASH' && (
            <div className="countdown-flash-label">
              FLASH
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
