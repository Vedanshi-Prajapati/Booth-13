import React, { useState } from 'react';
import { CUSTOMIZER_DATA } from '../../data/boothData';
import { CharacterComposite } from './CharacterComposite';
import { CustomizerIcon } from './CustomizerIcons';

export function ScreenCustomize({
  customization,
  onUpdateCustomization,
  onStepInside
}) {
  const [activeCategory, setActiveCategory] = useState('face'); // 'face', 'head', 'outfit', 'prop', 'background'

  // Helpers to cycle selections with arrows
  const cycleOption = (category, direction = 1) => {
    const list = CUSTOMIZER_DATA[category];
    const currentIndex = list.findIndex(item => item.id === customization[category]);
    const nextIndex = (currentIndex + direction + list.length) % list.length;
    onUpdateCustomization(category, list[nextIndex].id);
  };

  // Randomize all categories for instant surprise
  const handleRandomize = () => {
    const categories = ['face', 'head', 'outfit', 'prop', 'background'];
    categories.forEach(cat => {
      const list = CUSTOMIZER_DATA[cat];
      const randomItem = list[Math.floor(Math.random() * list.length)];
      onUpdateCustomization(cat, randomItem.id);
    });
  };

  const categories = [
    { id: 'face', label: 'Face' },
    { id: 'head', label: 'Headwear' },
    { id: 'outfit', label: 'Attire' },
    { id: 'prop', label: 'Keepsake' },
    { id: 'background', label: 'Chamber' },
  ];

  return (
    <section className="customize-screen" aria-label="Character Customization">
      {/* Title & Atmosphere */}
      <div className="customize-header-wrap">
        <span className="customize-badge">STAGE 01 · PREPARATION</span>
        <h2 className="customize-header-title">CONJURE YOUR LIKENESS</h2>
        <p className="customize-header-sub">
          Every choice is recorded on silver-halide film. Choose what enters the booth.
        </p>
      </div>

      <div className="customize-body">
        {/* Left Side: Dynamic Character Portrait with Real-Time Layers */}
        <div className="portrait-preview-container">
          <div className="portrait-frame">
            {/* Left / Right Quick Cycle Buttons */}
            <button
              type="button"
              className="portrait-nav-arrow left"
              onClick={() => cycleOption(activeCategory, -1)}
              aria-label={`Previous ${activeCategory}`}
              title={`Previous ${activeCategory}`}
            >
              <CustomizerIcon name="arrow_back" size={18} />
            </button>

            {/* The Live Layered Composite */}
            <CharacterComposite
              customization={customization}
              className="preview-composite-target"
            />

            <button
              type="button"
              className="portrait-nav-arrow right"
              onClick={() => cycleOption(activeCategory, 1)}
              aria-label={`Next ${activeCategory}`}
              title={`Next ${activeCategory}`}
            >
              <div style={{ transform: 'rotate(180deg)' }}>
                <CustomizerIcon name="arrow_back" size={18} />
              </div>
            </button>
          </div>

          {/* Quick Randomize & Status Footer */}
          <div className="portrait-meta-bar">
            <button
              type="button"
              className="btn-randomize"
              onClick={handleRandomize}
              title="Randomize Appearance"
            >
              <CustomizerIcon name="dice" size={15} />
              <span>RANDOMIZE</span>
            </button>

            <span className="portrait-selected-name">
              {CUSTOMIZER_DATA[activeCategory]?.find(i => i.id === customization[activeCategory])?.label}
            </span>
          </div>
        </div>

        {/* Right Side: Category Selection Tabs & Item Grids */}
        <div className="customizer-options-panel">
          {/* Category Tabs */}
          <div className="customizer-tabs" role="tablist" aria-label="Customization Categories">
            {categories.map(cat => (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={activeCategory === cat.id}
                className={`customizer-tab-btn ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Active Category Options Grid */}
          <div className="customizer-items-area">
            {/* 1. FACE OPTIONS */}
            {activeCategory === 'face' && (
              <div className="items-grid face-grid">
                {CUSTOMIZER_DATA.face.map(item => {
                  const isSelected = customization.face === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      className={`custom-item-card ${isSelected ? 'selected' : ''}`}
                      onClick={() => onUpdateCustomization('face', item.id)}
                    >
                      <div className="item-thumb-box">
                        <img src={item.image} alt={item.label} className="item-thumb-img" />
                      </div>
                      <div className="item-info">
                        <span className="item-title">{item.label}</span>
                        <span className="item-tag">{item.tag}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* 2. HEADWEAR OPTIONS (Zero Emojis, Real SVGs) */}
            {activeCategory === 'head' && (
              <div className="items-grid">
                {CUSTOMIZER_DATA.head.map(item => {
                  const isSelected = customization.head === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      className={`custom-item-card ${isSelected ? 'selected' : ''}`}
                      onClick={() => onUpdateCustomization('head', item.id)}
                    >
                      <div className="item-icon-box">
                        <CustomizerIcon name={item.icon} size={28} color={isSelected ? '#ffb347' : '#e4d5b7'} />
                      </div>
                      <div className="item-info">
                        <span className="item-title">{item.label}</span>
                        <span className="item-tag">{item.desc}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* 3. ATTIRE OPTIONS */}
            {activeCategory === 'outfit' && (
              <div className="items-grid">
                {CUSTOMIZER_DATA.outfit.map(item => {
                  const isSelected = customization.outfit === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      className={`custom-item-card ${isSelected ? 'selected' : ''}`}
                      onClick={() => onUpdateCustomization('outfit', item.id)}
                    >
                      <div className="item-icon-box">
                        <CustomizerIcon name={item.icon} size={28} color={isSelected ? '#ffb347' : '#e4d5b7'} />
                      </div>
                      <div className="item-info">
                        <span className="item-title">{item.label}</span>
                        <span className="item-tag">{item.desc}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* 4. KEEPSAKE / PROP OPTIONS */}
            {activeCategory === 'prop' && (
              <div className="items-grid">
                {CUSTOMIZER_DATA.prop.map(item => {
                  const isSelected = customization.prop === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      className={`custom-item-card ${isSelected ? 'selected' : ''}`}
                      onClick={() => onUpdateCustomization('prop', item.id)}
                    >
                      <div className="item-icon-box">
                        <CustomizerIcon name={item.icon} size={28} color={isSelected ? '#ffb347' : '#e4d5b7'} />
                      </div>
                      <div className="item-info">
                        <span className="item-title">{item.label}</span>
                        <span className="item-tag">{item.desc}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* 5. CHAMBER / BACKGROUND OPTIONS */}
            {activeCategory === 'background' && (
              <div className="items-grid">
                {CUSTOMIZER_DATA.background.map(item => {
                  const isSelected = customization.background === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      className={`custom-item-card ${isSelected ? 'selected' : ''}`}
                      onClick={() => onUpdateCustomization('background', item.id)}
                    >
                      <div className="item-icon-box" style={{ background: item.color }}>
                        <CustomizerIcon name={item.icon} size={28} color={isSelected ? '#ffb347' : '#e4d5b7'} />
                      </div>
                      <div className="item-info">
                        <span className="item-title">{item.label}</span>
                        <span className="item-tag">{item.desc}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Action Button */}
          <div className="customizer-action-bar">
            <button
              type="button"
              className="btn-step-inside"
              onClick={onStepInside}
              id="step-inside-btn"
            >
              STEP INSIDE THE BOOTH →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ScreenCustomize;
