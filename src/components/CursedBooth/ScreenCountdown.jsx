import React, { useState, useEffect } from 'react';
import { soundEngine } from '../../utils/audio';

export function ScreenCountdown({ onComplete }) {
  const [step, setStep] = useState(3); // 3, 2, 1, 'STUTTER', 'FLASH', 'DONE'
  const showFlash = step === 'FLASH' || step === 'DONE';

  useEffect(() => {
    let timer;
    if (step === 3) {
      soundEngine.playTick();
      timer = setTimeout(() => setStep(2), 900);
    } else if (step === 2) {
      soundEngine.playTick();
      timer = setTimeout(() => setStep(1), 900);
    } else if (step === 1) {
      soundEngine.playTick();
      // Final tick stutters per SPEC
      timer = setTimeout(() => {
        soundEngine.playGlitch();
        setStep('STUTTER');
      }, 500);
    } else if (step === 'STUTTER') {
      timer = setTimeout(() => setStep('FLASH'), 400);
    } else if (step === 'FLASH') {
      soundEngine.playFlash();
      timer = setTimeout(() => {
        setStep('DONE');
        onComplete();
      }, 650);
    }
    return () => clearTimeout(timer);
  }, [step, onComplete]);

  const getWhisperPrompt = () => {
    switch (step) {
      case 3:
        return '“Hold still.”';
      case 2:
        return '“Don\'t look behind you.”';
      case 1:
      case 'STUTTER':
        return '“It is already here.”';
      default:
        return '';
    }
  };

  return (
    <section className="countdown-screen" aria-label="Inside Photo Booth Countdown">
      {showFlash && <div className="flash-whiteout" />}

      <div className="booth-interior-frame">
        <img
          src="/assets/booth_interior.jpg"
          alt="Inside the Photo Booth"
          className={`booth-interior-bg ${step === 'STUTTER' ? 'stuttering-lens' : ''}`}
        />

        {/* Vintage Camera Viewfinder Reticle & Tally Light */}
        <div className="viewfinder-crosshairs" aria-hidden="true">
          <div className="tally-indicator">
            <span className="tally-dot" />
            <span className="tally-text">REC · EXPOSURE 01</span>
          </div>
          <div className="reticle-corner tl" />
          <div className="reticle-corner tr" />
          <div className="reticle-corner bl" />
          <div className="reticle-corner br" />
        </div>

        <div className="countdown-overlay">
          {typeof step === 'number' && (
            <div className="countdown-number" key={step}>
              {step}
            </div>
          )}

          {step === 'STUTTER' && (
            <div className="countdown-number stutter-glitch">
              1
            </div>
          )}

          {step === 'FLASH' && (
            <div className="countdown-flash-label">
              FLASH
            </div>
          )}

          {step !== 'FLASH' && step !== 'DONE' && (
            <div className="countdown-whisper-text">
              {getWhisperPrompt()}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
