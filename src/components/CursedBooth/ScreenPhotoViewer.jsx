import React, { useEffect } from 'react';
import { PHOTOS_DATA } from '../../data/boothData';
import { CharacterComposite } from './CharacterComposite';

export function ScreenPhotoViewer({
  photoIndex,
  onNext,
  onPrev,
  customization
}) {
  const photo = PHOTOS_DATA[photoIndex];

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
      <div
        className="exposure-photo-canvas"
        onClick={onNext}
        role="button"
        tabIndex={0}
        title="Examine"
      >
        <div className="exposure-print-image">
          <CharacterComposite
            customization={customization}
            showHaunt={photoIndex > 0}
            hauntStage={photoIndex}
          />
        </div>
      </div>

      <div className="exposure-meta-line">
        <span className="exposure-number">EXPOSURE 0{photoIndex + 1} / 04</span>
        <span className="exposure-caption">“{photo.caption}”</span>
      </div>

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
