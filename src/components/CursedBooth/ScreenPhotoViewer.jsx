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

  // Keyboard navigation: right arrow / space to advance, left arrow to go back
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

  const getArchivalObservation = () => {
    switch (photoIndex) {
      case 0:
        return 'Subject seated. Emulsion clean. No anomaly detected.';
      case 1:
        return 'Notice the background shadows. A second silhouette is faint.';
      case 2:
        return 'Entity manifestation undeniable. Cold contact observed.';
      case 3:
        return 'Subject absent from plate. Only residual artifacts remain.';
      default:
        return '';
    }
  };

  return (
    <section className="print-viewer-viewport" aria-label={`Examine Photographic Plate 0${photoIndex + 1}`}>
      {/* Editorial Metadata Header */}
      <header className="print-viewer-header">
        <div className="viewer-contact-index">
          {[0, 1, 2, 3].map((idx) => (
            <span
              key={idx}
              className={`contact-index-pip ${idx === photoIndex ? 'active' : ''} ${idx < photoIndex ? 'viewed' : ''}`}
            >
              EXP 0{idx + 1}
            </span>
          ))}
        </div>

        <div className="viewer-title-group">
          <span className="viewer-exposure-tag">
            EXPOSURE 0{photoIndex + 1} OF 04 · SILVER-HALIDE RECORD
          </span>
          <h2 className="viewer-caption-quote">
            “{photo.caption}”
          </h2>
        </div>
      </header>

      {/* Main Photographic Print Mount (Occupies 60–70% Viewport Height) */}
      <div className="print-mount-stage">
        <figure
          className="physical-photographic-print"
          onClick={onNext}
          title="Click or press [→] to examine next exposure"
          role="button"
          tabIndex={0}
        >
          {/* Top border archival plate stamp */}
          <div className="print-plate-header">
            <span className="plate-serial-stamp">BOOTH 13 // NEGATIVE #0013-{photoIndex + 1}</span>
            <span className="plate-grain-indicator">ILFORD HP5 · 400 ASA</span>
          </div>

          {/* Physical Photo Frame */}
          <div className="print-image-aperture">
            <CharacterComposite
              customization={customization}
              showHaunt={photoIndex > 0}
              hauntStage={photoIndex}
            />
          </div>

          {/* Bottom Archival Inscription */}
          <figcaption className="print-plate-footer">
            <div className="print-annotation-row">
              <span className="print-handwritten-caption">
                {photo.caption}
              </span>
              <span className="print-observation-note">
                {getArchivalObservation()}
              </span>
            </div>
            <div className="print-date-stamp">
              REC. 13 OCT 1982 · ARCHIVAL EVIDENCE
            </div>
          </figcaption>
        </figure>
      </div>

      {/* Bottom Nav Controls */}
      <footer className="print-viewer-controls">
        {onPrev ? (
          <button
            type="button"
            className="btn-print-nav secondary"
            onClick={onPrev}
            id="photo-prev-btn"
          >
            ← PREVIOUS EXPOSURE
          </button>
        ) : (
          <div className="nav-spacer" />
        )}

        <button
          type="button"
          className="btn-print-nav primary"
          onClick={onNext}
          id="photo-next-btn"
        >
          <span>{photoIndex < 3 ? 'EXAMINE NEXT EXPOSURE' : 'REVEAL THE OCCURRENCE'}</span>
          <span className="btn-key-indicator">[→]</span>
        </button>
      </footer>
    </section>
  );
}

export default ScreenPhotoViewer;
