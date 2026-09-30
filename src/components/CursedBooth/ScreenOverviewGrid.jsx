import React from 'react';
import { PHOTOS_DATA } from '../../data/boothData';

export function ScreenOverviewGrid({ onSelectScreen, customization }) {
  // Respect custom face for photo 1
  let photo1Img = PHOTOS_DATA[0].image;
  if (customization.face === 'skull') photo1Img = '/assets/face_skull.jpg';
  else if (customization.face === 'vampire') photo1Img = '/assets/face_vampire.jpg';

  const screens = [
    { id: 'landing', label: '01 · THRESHOLD', sub: 'Exterior Facade & Coin Mechanism', img: '/assets/booth_exterior.jpg' },
    { id: 'customize', label: '02 · REGISTRATION', sub: 'Subject Specimen Preparation', img: photo1Img },
    { id: 'countdown', label: '03 · EXPOSURE', sub: 'Shutter & Optical Flash Chamber', img: '/assets/booth_interior.jpg' },
    { id: 'developing', label: '04 · LATENT EMULSION', sub: 'Silver-Halide Chemical Agitation', img: photo1Img, sepia: true },
    { id: 'photo1', label: '05 · PROOF 01', sub: 'Subject Initial Seating', img: photo1Img },
    { id: 'photo2', label: '06 · PROOF 02', sub: 'Lurking Shadow Aberration', img: '/assets/photo_02.jpg' },
    { id: 'photo3', label: '07 · PROOF 03', sub: 'Physical Gripping Manifestation', img: '/assets/photo_03.jpg' },
    { id: 'photo4', label: '08 · PROOF 04', sub: 'Subject Missing from Frame', img: '/assets/photo_04.jpg' },
    { id: 'revelation', label: '09 · THE RESIDUE', sub: 'Supernatural Climax Reveal', img: '/assets/jumpscare.jpg' },
    { id: 'strip', label: '10 · CONTACT STRIP', sub: 'Four-Frame Physical Proof', img: '/assets/photo_03.jpg' },
    { id: 'actions', label: '11 · ARCHIVAL LOG', sub: 'Export & Evidentiary Disposition', img: '/assets/wood_table.jpg' },
  ];

  return (
    <section className="overview-matrix-screen" aria-label="Darkroom Contact Proof Index">
      <div className="overview-header-block">
        <span className="overview-badge">ARCHIVAL CONTACT PROOF · ROLL #13-B</span>
        <h2 className="overview-title">DARKROOM MASTER PROOFS</h2>
        <p className="overview-desc">
          Select any contact frame below to inspect its individual exposure, chemical treatment, and latent evidence.
        </p>
      </div>

      <div className="overview-proof-grid">
        {screens.map((s, idx) => (
          <article
            key={s.id}
            className="overview-proof-frame"
            onClick={() => onSelectScreen(s.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onSelectScreen(s.id)}
            title={`Open ${s.label}`}
          >
            <div className="proof-edge-sprocket top-sprocket">
              <span>▪ ▪ ▪</span>
              <span>EXP {String(idx + 1).padStart(2, '0')}</span>
              <span>KODAK SAFETY FILM 5063</span>
            </div>

            <div className="proof-image-stage">
              <img
                src={s.img}
                alt={s.label}
                className={`proof-photo-thumbnail ${s.sepia ? 'proof-sepia' : ''}`}
                loading="lazy"
              />
              <div className="proof-overlay-hover">
                <span>INSPECT FRAME →</span>
              </div>
            </div>

            <div className="proof-caption-block">
              <span className="proof-label">{s.label}</span>
              <span className="proof-sub">{s.sub}</span>
            </div>

            <div className="proof-edge-sprocket bottom-sprocket">
              <span>{`#${idx + 1}A`}</span>
              <span>BOOTH 13 ARCHIVE</span>
              <span>▪ ▪ ▪</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
