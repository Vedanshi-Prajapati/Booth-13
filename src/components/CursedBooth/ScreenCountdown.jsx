import React, { useState, useEffect } from 'react';
import { soundEngine } from '../../utils/audio';

export function ScreenCountdown({ onComplete }) {
  const [phase, setPhase] = useState('ARM'); // 'ARM' (3), 'SEEK' (2), 'LOCK' (1), 'SHUTTER', 'FLASH', 'DONE'
  const [seconds, setSeconds] = useState(3);
  const showFlash = phase === 'FLASH' || phase === 'DONE';

  useEffect(() => {
    let timer;

    if (seconds === 3) {
      soundEngine.playTick();
      timer = setTimeout(() => {
        setSeconds(2);
        setPhase('SEEK');
      }, 900);
    } else if (seconds === 2) {
      soundEngine.playTick();
      timer = setTimeout(() => {
        setSeconds(1);
        setPhase('LOCK');
      }, 900);
    } else if (seconds === 1) {
      soundEngine.playTick();
      // Final tick stutters per spec
      timer = setTimeout(() => {
        soundEngine.playGlitch();
        setPhase('SHUTTER');
      }, 550);
    }

    return () => clearTimeout(timer);
  }, [seconds]);

  useEffect(() => {
    let shutterTimer;
    if (phase === 'SHUTTER') {
      shutterTimer = setTimeout(() => {
        soundEngine.playFlash();
        setPhase('FLASH');
      }, 350);
    } else if (phase === 'FLASH') {
      shutterTimer = setTimeout(() => {
        setPhase('DONE');
        onComplete();
      }, 600);
    }
    return () => clearTimeout(shutterTimer);
  }, [phase, onComplete]);

  const getArchivalPrompt = () => {
    switch (seconds) {
      case 3:
        return 'Hold still for the emulsion.';
      case 2:
        return 'Keep your gaze fixed forward.';
      case 1:
        return phase === 'SHUTTER' ? 'Do not look behind you.' : 'Focusing lens...';
      default:
        return '';
    }
  };

  return (
    <section className="booth-chamber-viewport" aria-label="Inside Photo Booth Shutter Chamber">
      {/* Retinal Flash Whiteout */}
      {showFlash && <div className="flash-optical-burn" />}

      <div className="chamber-camera-stage">
        {/* Large Cinematic Viewport Occupying Majority of Viewport */}
        <div className="chamber-optics-frame">
          <img
            src="/assets/booth_interior.jpg"
            alt="Inside Booth 13 vintage booth chamber"
            className={`chamber-lens-image ${phase === 'SHUTTER' ? 'shutter-stutter' : ''}`}
          />

          {/* Authentic Camera Viewfinder Overlay */}
          <div className="camera-viewfinder-overlay" aria-hidden="true">
            {/* Top Bar: Camera Specs */}
            <div className="viewfinder-header-meta">
              <span className="rec-tally">
                <span className="tally-square" />
                <span className="tally-label">SHUTTER CHARGED</span>
              </span>
              <span className="lens-spec">F/2.8 · 1/60s · 50MM</span>
              <span className="plate-serial">EXP 01 // 04</span>
            </div>

            {/* Lens Framing Crosshairs */}
            <div className="viewfinder-crosshair center" />
            <div className="viewfinder-bracket tl" />
            <div className="viewfinder-bracket tr" />
            <div className="viewfinder-bracket bl" />
            <div className="viewfinder-bracket br" />

            {/* Center Countdown / Shutter State */}
            <div className="viewfinder-shutter-readout">
              {phase !== 'FLASH' && phase !== 'DONE' && (
                <div className="shutter-timer-digit" key={seconds}>
                  {phase === 'SHUTTER' ? '—' : seconds}
                </div>
              )}

              {phase === 'FLASH' && (
                <div className="shutter-flash-burn-text">
                  EXPOSING
                </div>
              )}

              <div className="shutter-whisper-caption">
                {getArchivalPrompt()}
              </div>
            </div>

            {/* Bottom Bar: Mechanical Tape Feed */}
            <div className="viewfinder-footer-meta">
              <span>AGFA-GEVAERT 1974 SILVER-HALIDE</span>
              <span>STANDBY FOR DISPENSE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ScreenCountdown;
