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

  return (
    <section className="photo-screen" aria-label={`Cursed Photo ${photoIndex + 1}`}>
      <div className="photo-screen-header">
        <span className="photo-header-step">{photo.header} · DEVELOPED STILL</span>
        <h2 className="photo-header-tagline">“{photo.caption}”</h2>
      </div>

      <div
        className="polaroid-frame"
        onClick={onNext}
        title="Click to view next frame"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') onNext();
        }}
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
            {photo.description}
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
          {photoIndex < 3 ? 'Examine Next Photo →' : 'Reveal The Outcome →'}
        </button>
      </div>
    </section>
  );
}

export default ScreenPhotoViewer;
