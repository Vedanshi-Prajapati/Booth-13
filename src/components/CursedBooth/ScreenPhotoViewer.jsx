import React, { useEffect } from 'react';
import { PHOTOS_DATA } from '../../data/boothData';
import { CharacterComposite } from './CharacterComposite';

export function ScreenPhotoViewer({
  photoIndex, // 0, 1, 2, 3
  onNext,
  onPrev,
  customization
}) {
  const photo = PHOTOS_DATA[photoIndex];

  // Keyboard navigation: right arrow / space advances, left arrow returns
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        onNext();
      } else if (e.key === 'ArrowLeft' && onPrev) {
        e.preventDefault();
        onPrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onNext, onPrev]);

  return (
    <section className="exposure-gallery-viewport" aria-label={`Exposure 0${photoIndex + 1}`}>
      {/* 70–80% viewport height hero photograph — unconstrained by heavy cards */}
      <div
        className="exposure-photo-canvas"
        onClick={onNext}
        role="button"
        tabIndex={0}
        title="Examine (click or press → to advance)"
      >
        <div className="exposure-print-image">
          <CharacterComposite
            customization={customization}
            showHaunt={photoIndex > 0}
            hauntStage={photoIndex}
          />
        </div>
      </div>

      {/* Minimal caption beneath */}
      <div className="exposure-meta-line">
        <span className="exposure-number">EXPOSURE 0{photoIndex + 1} / 04</span>
        <span className="exposure-caption">“{photo.caption}”</span>
      </div>

      {/* Quiet restrained navigation — no giant red buttons */}
      <nav className="exposure-nav-bar" aria-label="Photo Navigation">
        {onPrev ? (
          <button
            type="button"
            className="quiet-exposure-nav prev"
            onClick={onPrev}
            id="photo-prev-btn"
          >
            ← PREVIOUS
          </button>
        ) : (
          <span className="quiet-exposure-nav placeholder" />
        )}

        <button
          type="button"
          className="quiet-exposure-nav next"
          onClick={onNext}
          id="photo-next-btn"
        >
          {photoIndex < 3 ? 'NEXT →' : 'REVEAL →'}
        </button>
      </nav>
    </section>
  );
}

export default ScreenPhotoViewer;
