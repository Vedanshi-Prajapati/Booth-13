import React, { useState, useEffect } from 'react';
import { soundEngine } from '../../utils/audio';

export function ScreenCountdown({ onComplete }) {
  // Sequence: 'STANDBY', '3', '2', '1', 'FLASH', 'DARKNESS', 'DONE'
  const [step, setStep] = useState('STANDBY');

  useEffect(() => {
    let timer;

    if (step === 'STANDBY') {
      timer = setTimeout(() => {
        soundEngine.playTick();
        setStep('3');
      }, 700);
    } else if (step === '3') {
      timer = setTimeout(() => {
        soundEngine.playTick();
        setStep('2');
      }, 900);
    } else if (step === '2') {
      timer = setTimeout(() => {
        soundEngine.playTick();
        setStep('1');
      }, 900);
    } else if (step === '1') {
      timer = setTimeout(() => {
        soundEngine.playFlash();
        setStep('FLASH');
      }, 800);
    } else if (step === 'FLASH') {
      // Very brief blinding white flash
      timer = setTimeout(() => {
        setStep('DARKNESS');
      }, 200);
    } else if (step === 'DARKNESS') {
      // Fraction of a second of pitch darkness
      timer = setTimeout(() => {
        setStep('DONE');
        onComplete();
      }, 400);
    }

    return () => clearTimeout(timer);
  }, [step, onComplete]);

  return (
    <section className="fullscreen-shutter-chamber" aria-label="Shutter Chamber">
      {/* Full-viewport booth photograph */}
      <img
        src="/assets/booth_interior.jpg"
        alt="Inside the booth"
        className={`shutter-hero-background ${step === '1' ? 'shutter-subtle-jitter' : ''}`}
      />

      {/* Brief optical flash overlay */}
      {step === 'FLASH' && <div className="optical-flash-whiteout" />}

      {/* Complete pitch blackness fraction of a second */}
      {step === 'DARKNESS' && <div className="pitch-darkness-void" />}

      {/* Minimal camera information in corners */}
      <div className="shutter-corner top-left">BOOTH 13 CAMERA NO. 1</div>
      <div className="shutter-corner top-right">EXPOSURE 01 / 04</div>
      <div className="shutter-corner bottom-left">50MM F/2.8</div>
      <div className="shutter-corner bottom-right">SILVER HALIDE</div>

      {/* Large central countdown */}
      {step !== 'DARKNESS' && step !== 'DONE' && (
        <div className="shutter-center-focus">
          <div className="shutter-countdown-display">
            {step}
          </div>
        </div>
      )}
    </section>
  );
}

export default ScreenCountdown;
