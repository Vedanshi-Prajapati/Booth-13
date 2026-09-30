import React from 'react';
import { CharacterComposite } from './CharacterComposite';

const SPECIMENS = [
  {
    id: 'witch',
    num: '01',
    title: 'SPELLCASTER',
    thumb: '/assets/photo_01.jpg',
    face: 'witch',
    head: 'witch_hat',
    outfit: 'robe',
    prop: 'candle',
    background: 'curtains'
  },
  {
    id: 'skull',
    num: '02',
    title: 'DEPARTED',
    thumb: '/assets/face_skull.jpg',
    face: 'skull',
    head: 'none',
    outfit: 'trenchcoat',
    prop: 'none',
    background: 'graveyard'
  },
  {
    id: 'vampire',
    num: '03',
    title: 'ARISTOCRAT',
    thumb: '/assets/face_vampire.jpg',
    face: 'vampire',
    head: 'veil',
    outfit: 'suit',
    prop: 'rose',
    background: 'manor'
  },
  {
    id: 'harbinger',
    num: '04',
    title: 'HARBINGER',
    thumb: '/assets/photo_03.jpg',
    face: 'crone',
    head: 'horns',
    outfit: 'shroud',
    prop: 'dagger',
    background: 'forest'
  }
];

export function ScreenCustomize({
  customization,
  onUpdateCustomization,
  onStepInside
}) {
  const currentId = customization.face || 'witch';

  const handleSelectSpecimen = (specimen) => {
    onUpdateCustomization('face', specimen.face);
    onUpdateCustomization('head', specimen.head);
    onUpdateCustomization('outfit', specimen.outfit);
    onUpdateCustomization('prop', specimen.prop);
    onUpdateCustomization('background', specimen.background);
  };

  const handleRandomize = () => {
    const next = SPECIMENS[Math.floor(Math.random() * SPECIMENS.length)];
    handleSelectSpecimen(next);
  };

  return (
    <section className="catalogue-layout" aria-label="Portrait Preparation">
      <div className="catalogue-portrait-hero">
        <div className="portrait-hero-plate">
          <CharacterComposite customization={customization} />
        </div>
        <div className="portrait-hero-caption">
          <span>PORTRAIT SPECIMEN · SEATED SUBJECT</span>
          <span>SILVER HALIDE NO. 13</span>
        </div>
      </div>

      <div className="catalogue-index-column">
        <header className="catalogue-header">
          <span className="catalogue-kicker">ARCHIVAL PROOFS</span>
          <h2 className="catalogue-heading">SELECT SUBJECT</h2>
        </header>

        <div className="catalogue-proof-grid">
          {SPECIMENS.map((specimen) => {
            const isSelected =
              currentId === specimen.id ||
              (specimen.id === 'witch' && currentId === 'witch');

            return (
              <button
                key={specimen.id}
                type="button"
                className={`catalogue-proof-tile ${isSelected ? 'selected-specimen' : ''}`}
                onClick={() => handleSelectSpecimen(specimen)}
                title={`Select ${specimen.title}`}
              >
                <div className="proof-tile-thumb-frame">
                  <img
                    src={specimen.thumb}
                    alt={specimen.title}
                    className="proof-tile-thumb"
                  />
                  {isSelected && <span className="proof-active-mark" />}
                </div>

                <div className="proof-tile-meta">
                  <span className="proof-num">{specimen.num}</span>
                  <span className="proof-title">{specimen.title}</span>
                </div>
              </button>
            );
          })}
        </div>

        <div className="catalogue-action-bar">
          <button
            type="button"
            className="btn-quiet-action"
            onClick={handleRandomize}
            id="randomize-btn"
          >
            RANDOMIZE
          </button>

          <button
            type="button"
            className="btn-step-inside-hero"
            onClick={onStepInside}
            id="step-inside-btn"
          >
            STEP INSIDE →
          </button>
        </div>
      </div>
    </section>
  );
}

export default ScreenCustomize;
