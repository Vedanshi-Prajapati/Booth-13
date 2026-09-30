import React from 'react';
import { CharacterComposite } from './CharacterComposite';

export function ScreenPhotoStrip({ customization, onProceed }) {
  const today = new Date();
  const formattedDate = `${today.getDate().toString().padStart(2, '0')} · ${(today.getMonth() + 1).toString().padStart(2, '0')} · ${today.getFullYear()}`;

  return (
    <section className="strip-editorial-viewport" aria-label="Assembled Evidence Strip">
      {/* Header */}
      <header className="strip-editorial-header">
        <div className="strip-meta-lead">
          <span className="lead-tag">EXHIBIT NO. 13 · CONTACT PROOF</span>
          <span className="lead-date">DEVELOPED: {formattedDate}</span>
        </div>
        <h2 className="strip-headline">THE RECOVERED STRIP</h2>
        <p className="strip-subheadline">
          Four exposures retrieved from the darkroom dispenser. Review the progression closely.
        </p>
      </header>

      {/* Darkroom Table Stage */}
      <div className="darkroom-table-workspace">
        <article className="archival-vertical-strip" id="photo-strip-element">
          {/* Header Serial on Film Strip */}
          <div className="strip-top-margin">
            <span className="strip-sprocket-text">KODAK SAFETY FILM · 5063 · 35MM</span>
          </div>

          {/* Exposure 01: Normal */}
          <div className="strip-frame-unit">
            <div className="frame-meta-line">
              <span className="frame-exposure-label">EXPOSURE 01</span>
              <span className="frame-time-code">14:02:11</span>
            </div>
            <div className="frame-photograph-crop">
              <CharacterComposite
                customization={customization}
                hauntStage={0}
              />
            </div>
          </div>

          {/* Exposure 02: Faint Presence */}
          <div className="strip-frame-unit">
            <div className="frame-meta-line">
              <span className="frame-exposure-label">EXPOSURE 02</span>
              <span className="frame-time-code">14:02:14</span>
            </div>
            <div className="frame-photograph-crop">
              <CharacterComposite
                customization={customization}
                showHaunt={true}
                hauntStage={1}
              />
            </div>
          </div>

          {/* Exposure 03: The Grasp */}
          <div className="strip-frame-unit">
            <div className="frame-meta-line">
              <span className="frame-exposure-label">EXPOSURE 03</span>
              <span className="frame-time-code">14:02:17</span>
            </div>
            <div className="frame-photograph-crop">
              <CharacterComposite
                customization={customization}
                showHaunt={true}
                hauntStage={2}
              />
            </div>
          </div>

          {/* Exposure 04: Vanished */}
          <div className="strip-frame-unit">
            <div className="frame-meta-line">
              <span className="frame-exposure-label">EXPOSURE 04</span>
              <span className="frame-time-code">14:02:20</span>
            </div>
            <div className="frame-photograph-crop">
              <CharacterComposite
                customization={customization}
                hauntStage={3}
              />
            </div>
          </div>

          {/* Archival Strip Branding Footer */}
          <footer className="strip-archival-footer">
            <div className="strip-footer-brand">BOOTH 13</div>
            <div className="strip-footer-metadata">STRIP NO. 0013 · {formattedDate}</div>
            <div className="strip-footer-annotation">“You brought a friend.”</div>
          </footer>
        </article>
      </div>

      {/* Action CTA */}
      <footer className="strip-action-footer">
        <button
          type="button"
          className="btn-archive-memory"
          onClick={onProceed}
          id="finish-btn"
        >
          <span>ARCHIVE EVIDENCE RECORD</span>
          <span className="btn-arrow">→</span>
        </button>
      </footer>
    </section>
  );
}

export default ScreenPhotoStrip;
