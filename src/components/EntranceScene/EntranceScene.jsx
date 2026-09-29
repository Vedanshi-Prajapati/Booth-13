import React, { useState, useEffect, useRef } from 'react';
import { useSecrets } from '../../context/useSecrets';
import './EntranceScene.css';

const HINTS = [
  'Something is watching the poster.',
  'The bin smells like rust and salt.',
  'Moths crave what burns.',
  'The coin slot has a memory.',
  'The brick wall remembers faces that never left.',
];

export function EntranceScene({ onCoin13Unlock }) {
  const { unlockSecret, setActiveNoteCard, isReturningVisitor } = useSecrets();

  // Coin slot click tracker
  const [coinCount, setCoinCount] = useState(0);

  // Inactivity hint tracking (20s)
  const [hintIndex, setHintIndex] = useState(0);
  const [showIdleHint, setShowIdleHint] = useState(false);
  const lastActiveRef = useRef(0);

  // Moth cursor tracking
  const [mothPos, setMothPos] = useState({ x: 28, y: 18 });
  const [isFollowingCursor, setIsFollowingCursor] = useState(false);
  const containerRef = useRef(null);

  // Idle timer logic
  useEffect(() => {
    lastActiveRef.current = Date.now();
    const handleActivity = () => {
      lastActiveRef.current = Date.now();
      // Keep hint visible if already triggered, but reset timer
    };

    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keydown', handleActivity);
    window.addEventListener('click', handleActivity);

    const interval = setInterval(() => {
      const idleTime = Date.now() - lastActiveRef.current;
      if (idleTime >= 20000) {
        setShowIdleHint(true);
        unlockSecret('inactivity_hint');
        // Cycle hints gently
        setHintIndex((prev) => (prev + 1) % HINTS.length);
      }
    }, 4000);

    return () => {
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      window.removeEventListener('click', handleActivity);
      clearInterval(interval);
    };
  }, [unlockSecret]);

  // Moth following cursor briefly on mouse move inside container
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const relX = ((e.clientX - rect.left) / rect.width) * 100;
    const relY = ((e.clientY - rect.top) / rect.height) * 100;

    // If mouse is near upper sign area, moth flutters toward it
    if (relY < 45 && relX > 15 && relX < 85) {
      setIsFollowingCursor(true);
      setMothPos({
        x: Math.max(10, Math.min(88, relX + (Math.random() * 8 - 4))),
        y: Math.max(10, Math.min(42, relY + (Math.random() * 8 - 4))),
      });
    } else {
      setIsFollowingCursor(false);
    }
  };

  // Missing-Person Poster click
  const handlePosterClick = () => {
    unlockSecret('poster');
    setActiveNoteCard({
      tag: 'Torn Poster · Notice #84',
      text: 'Last seen: inside.',
      subtext: 'No record of departure. The curtain was still swaying.',
      image: true,
    });
  };

  // Eyes in the bin click
  const handleBinClick = () => {
    unlockSecret('bin');
    setActiveNoteCard({
      tag: 'Discarded Paper · Scrap',
      text: "Don't feed it.",
      subtext: 'It rejects regular garbage. It only eats what you leave behind.',
    });
  };

  // Moth click
  const handleMothClick = (e) => {
    e.stopPropagation();
    unlockSecret('moth');
    setActiveNoteCard({
      tag: 'Observation · Sodium Lamp',
      text: 'It only comes out for the light.',
      subtext: 'Drawn to the hot wire of the flash bulb. It circles the 13.',
    });
  };

  // Coin slot click
  const handleCoinClick = () => {
    const nextCount = coinCount + 1;
    setCoinCount(nextCount);

    if (nextCount === 13) {
      unlockSecret('coin13');
      if (onCoin13Unlock) onCoin13Unlock();
      setActiveNoteCard({
        tag: 'Dispenser Jam · Secret Strip',
        text: 'The slot spit out an extra strip.',
        subtext: 'Torn from 1974. Four shots of an empty bench and a lingering shadow.',
      });
    }
  };

  return (
    <div
      ref={containerRef}
      className="entrance-street-scene"
      onMouseMove={handleMouseMove}
      aria-label="Entrance Street Scene"
    >
      {/* Sodium Lamp Ambient Lighting Cone */}
      <div className="sodium-lamp-cone" />

      {/* Main Street Sign */}
      <div className="street-sign-box">
        <div className="sign-frame">
          <div className="sign-neon">
            <span className="sign-line-1">
              {isReturningVisitor ? 'BOOTH 13 · WELCOME BACK' : 'BOOTH 13 · PHOTOS'}
            </span>
            <span className="sign-line-2">4 FOR 1 SOUL</span>
          </div>

          {/* Moth circling the sign */}
          <div
            id="moth-secret-obj"
            className={`street-moth ${isFollowingCursor ? 'fluttering-fast' : ''}`}
            style={{ left: `${mothPos.x}%`, top: `${mothPos.y}%` }}
            onClick={handleMothClick}
            role="button"
            tabIndex={0}
            title="A pale moth flutters near the bulb"
          >
            <span className="moth-wing left" />
            <span className="moth-body" />
            <span className="moth-wing right" />
          </div>
        </div>
      </div>

      {/* Interactive Street Objects Row */}
      <div className="street-objects-row">
        {/* Missing-Person Poster */}
        <div
          id="poster-secret-obj"
          className="street-poster-card"
          onClick={handlePosterClick}
          role="button"
          tabIndex={0}
          title="Click to inspect the weather-beaten poster"
        >
          <div className="poster-pin" />
          <div className="poster-header">MISSING</div>
          <div className="poster-silhouette-photo">
            <div className="smeared-figure" />
          </div>
          <div className="poster-caption">OCCUPANT #13</div>
          <span className="hover-whisper">Inspect</span>
        </div>

        {/* Coin Slot */}
        <div className="street-coin-box">
          <button
            type="button"
            id="coin-slot-btn"
            className="coin-slot-unit"
            onClick={handleCoinClick}
            title="Click to insert coins (13 clicks triggers something)"
          >
            <span className="coin-slot-rim">
              <span className="coin-aperture" />
              <span className="coin-text">INSERT 13¢</span>
            </span>
          </button>
          <div className="coin-tally-hint">
            {coinCount > 0 && coinCount < 13 && `Fed: ${coinCount}/13`}
            {coinCount >= 13 && <span className="extra-strip-awarded">★ Extra Strip Printed ★</span>}
          </div>
        </div>

        {/* Eyes in the Bin */}
        <div
          id="bin-secret-obj"
          className="street-trash-bin"
          onClick={handleBinClick}
          role="button"
          tabIndex={0}
          title="Click to inspect the dark metal bin"
        >
          <div className="bin-rim" />
          <div className="bin-darkness">
            <div className="bin-eyes">
              <span className="bin-eye left" />
              <span className="bin-eye right" />
            </div>
          </div>
          <div className="bin-ribs">
            <span /><span /><span />
          </div>
          <span className="hover-whisper">Inspect</span>
        </div>
      </div>

      {/* Requirement 7: Very Faint Inactivity Hint */}
      <footer className="entrance-idle-hint" aria-live="polite">
        <p className={`hint-text ${showIdleHint ? 'visible' : 'latent'}`}>
          {showIdleHint ? HINTS[hintIndex] : '...'}
        </p>
      </footer>
    </div>
  );
}

export default EntranceScene;
