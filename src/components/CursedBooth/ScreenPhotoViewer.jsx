import React from 'react';
import { PHOTOS_DATA } from '../../data/boothData';
import { CharacterComposite } from './CharacterComposite';

export function ScreenPhotoViewer({
  photoIndex, // 0, 1, 2, 3
  onNext,
  onPrev,
  customization
}) {
  const photo = PHOTOS_DATA[photoIndex];

  // Arrow key navigation
  React.useEffect(() => {
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
    <section className="photo-screen" aria-label={`Cursed Photo ${photoIndex + 1}`}>
      <div className="photo-screen-header">
        <div className="photo-step-pills">
          {[0, 1, 2, 3].map(idx => (
            <span
              key={idx}
              className={`photo-step-dot ${idx === photoIndex ? 'active' : ''} ${idx < photoIndex ? 'completed' : ''}`}
            />
          ))}
        </div>
        <span className="photo-header-step">EXPOSURE 0{photoIndex + 1} OF 04 · DEVELOPED STILL</span>
        <h2 className="photo-header-tagline">“{photo.caption}”</h2>
      </div>

      <div
        className="polaroid-frame"
        onClick={onNext}
        title="Click or press Right Arrow to examine next frame"
        role="button"
        tabIndex={0}
      >
        {/* Dynamic Character Composite showing custom character & progression of haunting */}
        <div className="polaroid-image-box">
          <CharacterComposite
            customization={customization}
            showHaunt={photoIndex > 0}
            hauntStage={photoIndex}
          />
        </div>

        <div className="photo-caption-bar">
          <span className="photo-caption-text">
            {photo.caption}
          </span>
          <span className="photo-subcaption-text">
            {photoIndex === 3 ? 'Occupant not found.' : photo.description}
          </span>
        </div>
      </div>

      <div className="photo-controls-row">
        {onPrev ? (
          <button
            type="button"
            className="btn-photo-nav prev"
            onClick={onPrev}
            id="photo-prev-btn"
          >
            ← Previous Photo
          </button>
        ) : <div />}

        <button
          type="button"
          className="btn-photo-nav next"
          onClick={onNext}
          id="photo-next-btn"
        >
          {photoIndex < 3 ? 'Examine Next Photo [→]' : 'Reveal The Outcome [→]'}
        </button>
      </div>
    </section>
  );
}

export default ScreenPhotoViewer;
