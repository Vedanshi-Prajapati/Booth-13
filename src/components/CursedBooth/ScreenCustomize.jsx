import React, { useState } from 'react';
import { CUSTOMIZER_DATA } from '../../data/boothData';
import { CharacterComposite } from './CharacterComposite';
import { CustomizerIcon } from './CustomizerIcons';

export function ScreenCustomize({
  customization,
  onUpdateCustomization,
  onStepInside
}) {
  const [activeCategory, setActiveCategory] = useState('face');

  const categories = [
    { id: 'face', index: '01', label: 'Face / Visage' },
    { id: 'head', index: '02', label: 'Headwear' },
    { id: 'outfit', index: '03', label: 'Attire' },
    { id: 'prop', index: '04', label: 'Keepsake' },
    { id: 'background', index: '05', label: 'Chamber' },
  ];

  const handleRandomize = () => {
    const cats = ['face', 'head', 'outfit', 'prop', 'background'];
    cats.forEach(cat => {
      const list = CUSTOMIZER_DATA[cat];
      const randomItem = list[Math.floor(Math.random() * list.length)];
      onUpdateCustomization(cat, randomItem.id);
    });
  };

  const cycleOption = (category, direction = 1) => {
    const list = CUSTOMIZER_DATA[category];
    const currentIndex = list.findIndex(item => item.id === customization[category]);
    const nextIndex = (currentIndex + direction + list.length) % list.length;
    onUpdateCustomization(category, list[nextIndex].id);
  };

  const currentSelectionLabel = CUSTOMIZER_DATA[activeCategory]?.find(
    i => i.id === customization[activeCategory]
  )?.label;

  return (
    <section className="preparation-editorial-viewport" aria-label="Booth Photographic Preparation">
      {/* Editorial Header */}
      <header className="prep-editorial-header">
        <div className="prep-header-meta">
          <span className="prep-phase-tag">STAGE 01 OF 04 · DARKROOM PREPARATION</span>
          <span className="prep-plate-serial">SPECIMEN LOG // 1913</span>
        </div>
        <h2 className="prep-headline">PREPARE FOR THE EXPOSURE</h2>
        <p className="prep-instruction">
          Every element selected is fixed upon silver-halide emulsion. Configure your subject before entering the chamber.
        </p>
      </header>

      <div className="prep-workspace-grid">
        {/* Left Column: Live Photographic Print Preview (The Hero) */}
        <div className="prep-preview-column">
          <figure className="prep-photographic-mount">
            <div className="mount-meta-top">
              <span className="mount-tag">TEST PRINT // SILVER-HALIDE CONTACT</span>
              <span className="mount-status">EMULSION READY</span>
            </div>

            <div className="mount-viewport">
              <button
                type="button"
                className="mount-nav-btn prev"
                onClick={() => cycleOption(activeCategory, -1)}
                aria-label={`Previous ${activeCategory}`}
                title="Cycle previous"
              >
                <CustomizerIcon name="arrow_back" size={16} />
              </button>

              <CharacterComposite
                customization={customization}
                className="mount-composite-target"
              />

              <button
                type="button"
                className="mount-nav-btn next"
                onClick={() => cycleOption(activeCategory, 1)}
                aria-label={`Next ${activeCategory}`}
                title="Cycle next"
              >
                <div style={{ transform: 'rotate(180deg)' }}>
                  <CustomizerIcon name="arrow_back" size={16} />
                </div>
              </button>
            </div>

            <figcaption className="mount-footer-caption">
              <span className="mount-active-detail">
                {activeCategory.toUpperCase()}: <strong>{currentSelectionLabel}</strong>
              </span>
              <button
                type="button"
                className="btn-randomize-archival"
                onClick={handleRandomize}
                title="Randomize Appearance"
              >
                <CustomizerIcon name="dice" size={13} />
                <span>RANDOMIZE SPECIMEN</span>
              </button>
            </figcaption>
          </figure>
        </div>

        {/* Right Column: Restrained Contact Sheet Specimen Selector */}
        <div className="prep-contact-sheet-column">
          {/* Index Tabs */}
          <nav className="contact-sheet-nav" aria-label="Archival Specimen Categories">
            {categories.map(cat => (
              <button
                key={cat.id}
                type="button"
                className={`contact-nav-tab ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                <span className="tab-idx">{cat.index}</span>
                <span className="tab-name">{cat.label}</span>
              </button>
            ))}
          </nav>

          {/* Contact Sheet Specimen Tiles Grid */}
          <div className="contact-sheet-grid">
            {activeCategory === 'face' &&
              CUSTOMIZER_DATA.face.map((item, idx) => {
                const isSelected = customization.face === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    className={`contact-specimen-tile ${isSelected ? 'selected' : ''}`}
                    onClick={() => onUpdateCustomization('face', item.id)}
                  >
                    <div className="tile-thumb-frame">
                      <img src={item.image} alt={item.label} className="tile-thumb-image" />
                    </div>
                    <div className="tile-specimen-info">
                      <span className="specimen-id">SPEC. 0{idx + 1}</span>
                      <span className="specimen-label">{item.label}</span>
                      <span className="specimen-sub">{item.tag}</span>
                    </div>
                  </button>
                );
              })}

            {activeCategory === 'head' &&
              CUSTOMIZER_DATA.head.map((item, idx) => {
                const isSelected = customization.head === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    className={`contact-specimen-tile ${isSelected ? 'selected' : ''}`}
                    onClick={() => onUpdateCustomization('head', item.id)}
                  >
                    <div className="tile-icon-frame">
                      <CustomizerIcon
                        name={item.icon}
                        size={26}
                        color={isSelected ? '#c89f5c' : '#ded8c7'}
                      />
                    </div>
                    <div className="tile-specimen-info">
                      <span className="specimen-id">SPEC. 0{idx + 1}</span>
                      <span className="specimen-label">{item.label}</span>
                      <span className="specimen-sub">{item.desc}</span>
                    </div>
                  </button>
                );
              })}

            {activeCategory === 'outfit' &&
              CUSTOMIZER_DATA.outfit.map((item, idx) => {
                const isSelected = customization.outfit === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    className={`contact-specimen-tile ${isSelected ? 'selected' : ''}`}
                    onClick={() => onUpdateCustomization('outfit', item.id)}
                  >
                    <div className="tile-icon-frame">
                      <CustomizerIcon
                        name={item.icon}
                        size={26}
                        color={isSelected ? '#c89f5c' : '#ded8c7'}
                      />
                    </div>
                    <div className="tile-specimen-info">
                      <span className="specimen-id">SPEC. 0{idx + 1}</span>
                      <span className="specimen-label">{item.label}</span>
                      <span className="specimen-sub">{item.desc}</span>
                    </div>
                  </button>
                );
              })}

            {activeCategory === 'prop' &&
              CUSTOMIZER_DATA.prop.map((item, idx) => {
                const isSelected = customization.prop === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    className={`contact-specimen-tile ${isSelected ? 'selected' : ''}`}
                    onClick={() => onUpdateCustomization('prop', item.id)}
                  >
                    <div className="tile-icon-frame">
                      <CustomizerIcon
                        name={item.icon}
                        size={26}
                        color={isSelected ? '#c89f5c' : '#ded8c7'}
                      />
                    </div>
                    <div className="tile-specimen-info">
                      <span className="specimen-id">SPEC. 0{idx + 1}</span>
                      <span className="specimen-label">{item.label}</span>
                      <span className="specimen-sub">{item.desc}</span>
                    </div>
                  </button>
                );
              })}

            {activeCategory === 'background' &&
              CUSTOMIZER_DATA.background.map((item, idx) => {
                const isSelected = customization.background === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    className={`contact-specimen-tile ${isSelected ? 'selected' : ''}`}
                    onClick={() => onUpdateCustomization('background', item.id)}
                  >
                    <div className="tile-icon-frame" style={{ backgroundColor: item.color }}>
                      <CustomizerIcon
                        name={item.icon}
                        size={26}
                        color={isSelected ? '#c89f5c' : '#ded8c7'}
                      />
                    </div>
                    <div className="tile-specimen-info">
                      <span className="specimen-id">SPEC. 0{idx + 1}</span>
                      <span className="specimen-label">{item.label}</span>
                      <span className="specimen-sub">{item.desc}</span>
                    </div>
                  </button>
                );
              })}
          </div>

          {/* Primary Action Button (Prominent & Deliberate) */}
          <div className="contact-sheet-action">
            <button
              type="button"
              className="btn-step-inside-deliberate"
              onClick={onStepInside}
              id="step-inside-btn"
            >
              <span>STEP INSIDE THE BOOTH</span>
              <span className="action-arrow">→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ScreenCustomize;
