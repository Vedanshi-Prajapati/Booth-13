import React, { useState, useEffect } from 'react';
import { soundEngine } from '../../utils/audio';

export function ScreenCountdown({ onComplete }) {
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
      timer = setTimeout(() => {
        setStep('DARKNESS');
      }, 200);
    } else if (step === 'DARKNESS') {
      timer = setTimeout(() => {
        setStep('DONE');
        onComplete();
      }, 400);
    }

    return () => clearTimeout(timer);
  }, [step, onComplete]);

  return (
    <section className="fullscreen-shutter-chamber" aria-label="Shutter Chamber">
      <img
        src="/assets/booth_interior.jpg"
        alt="Inside the booth"
        className={`shutter-hero-background ${step === '1' ? 'shutter-subtle-jitter' : ''}`}
      />

      {step === 'FLASH' && <div className="optical-flash-whiteout" />}

      {step === 'DARKNESS' && <div className="pitch-darkness-void" />}

      <div className="shutter-corner top-left">BOOTH 13 CAMERA NO. 1</div>
      <div className="shutter-corner top-right">EXPOSURE 01 / 04</div>
      <div className="shutter-corner bottom-left">50MM F/2.8</div>
      <div className="shutter-corner bottom-right">SILVER HALIDE</div>

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
