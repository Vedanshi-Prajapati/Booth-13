import React from 'react';
import { CharacterComposite } from './CharacterComposite';

export function ScreenPhotoStrip({ customization, onProceed }) {
  return (
    <section className="contact-workspace-viewport" aria-label="Physical Contact Prints">
      <header className="contact-workspace-header">
        <span className="contact-workspace-badge">CONTACT PROOF · ROLL #13</span>
        <h2 className="contact-workspace-title">FOUR DEVELOPED EXPOSURES</h2>
      </header>

      {/* The 4 Developed Prints physically laid out on the wooden darkroom surface */}
      <div className="tabletop-stage" id="photo-strip-element">
        {/* Print 01: Normal */}
        <article className="tabletop-print print-01" title="Exposure 01">
          <div className="print-surface-mat">
            <CharacterComposite customization={customization} hauntStage={0} />
          </div>
          <footer className="print-edge-inscription">
            <span>EXP 01</span>
            <span>NORMAL SEATING</span>
          </footer>
        </article>

        {/* Print 02: Faint Shadow */}
        <article className="tabletop-print print-02" title="Exposure 02">
          <div className="print-surface-mat">
            <CharacterComposite customization={customization} showHaunt={true} hauntStage={1} />
          </div>
          <footer className="print-edge-inscription">
            <span>EXP 02</span>
            <span>SHADOW INTRUSION</span>
          </footer>
        </article>

        {/* Print 03: The Grasp */}
        <article className="tabletop-print print-03" title="Exposure 03">
          <div className="print-surface-mat">
            <CharacterComposite customization={customization} showHaunt={true} hauntStage={2} />
          </div>
          <footer className="print-edge-inscription">
            <span>EXP 03</span>
            <span>COLD CONTACT</span>
          </footer>
        </article>

        {/* Print 04: The Unsettling Absence */}
        <article className="tabletop-print print-04 unsettling-absence" title="Exposure 04: Subject Absent">
          <div className="print-surface-mat">
            <CharacterComposite customization={customization} hauntStage={3} />
          </div>
          <footer className="print-edge-inscription">
            <span className="absence-mark">EXP 04</span>
            <span className="absence-mark">SUBJECT ABSENT</span>
          </footer>
        </article>
      </div>

      {/* Restrained Forward Action */}
      <div className="contact-workspace-action">
        <button
          type="button"
          className="btn-film-primary"
          onClick={onProceed}
          id="finish-btn"
        >
          PRESERVE EVIDENCE →
        </button>
      </div>
    </section>
  );
}

export default ScreenPhotoStrip;
