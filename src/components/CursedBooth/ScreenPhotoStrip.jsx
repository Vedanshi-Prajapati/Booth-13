import React from 'react';
import { CharacterComposite } from './CharacterComposite';

export function ScreenPhotoStrip({ customization, onProceed }) {
  return (
    <section className="strip-screen" aria-label="Assembled Photo Strip">
      <div className="strip-screen-header">
        <span className="strip-badge">MEMORIAL EVIDENCE</span>
        <h2 className="strip-title">THE COMPLETED STRIP</h2>
        <p className="strip-subtitle">Four exposures from Booth 13. Count how many people entered.</p>
      </div>

      <div className="wood-table-stage">
        <div className="vertical-photo-strip" id="photo-strip-element">
          {/* Frame 1: The Initial Still */}
          <div className="strip-frame-item">
            <CharacterComposite
              customization={customization}
              hauntStage={0}
            />
          </div>

          {/* Frame 2: The Presence */}
          <div className="strip-frame-item">
            <CharacterComposite
              customization={customization}
              showHaunt={true}
              hauntStage={1}
            />
          </div>

          {/* Frame 3: The Gathering */}
          <div className="strip-frame-item">
            <CharacterComposite
              customization={customization}
              showHaunt={true}
              hauntStage={2}
            />
          </div>

          {/* Frame 4: Vanished */}
          <div className="strip-frame-item">
            <CharacterComposite
              customization={customization}
              hauntStage={3}
            />
          </div>

          {/* Authentic Photo Strip Branding Footer */}
          <div className="strip-bottom-banner">
            <span className="strip-brand-title">
              BOOTH 13 · STRIP NO. 0013
            </span>
            <span className="strip-date">{new Date().toISOString().slice(0, 10)}</span>
            <span className="strip-handwritten-note">“You brought a friend.”</span>
          </div>
        </div>
      </div>

      <div className="strip-action-wrap">
        <button
          type="button"
          className="btn-action-primary"
          onClick={onProceed}
          id="finish-btn"
        >
          KEEP THE MEMORY →
        </button>
      </div>
    </section>
  );
}

export default ScreenPhotoStrip;
