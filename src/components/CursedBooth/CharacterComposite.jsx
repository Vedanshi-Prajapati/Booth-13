import React from 'react';
import { CUSTOMIZER_DATA } from '../../data/boothData';

export function CharacterComposite({
  customization,
  className = '',
  style = {},
  showHaunt = false, // for photo 2 (creeper), photo 3 (gripping hands), photo 4 (vanished)
  hauntStage = 0 // 0: normal, 1: faint face, 2: gripping hands, 3: vanished
}) {
  const currentFace = CUSTOMIZER_DATA.face.find(f => f.id === customization.face) || CUSTOMIZER_DATA.face[0];
  const faceImage = currentFace.image || currentFace.preview;

  const bg = customization.background || 'curtains';
  const head = customization.head || 'witch_hat';
  const outfit = customization.outfit || 'robe';
  const prop = customization.prop || 'candle';

  return (
    <div className={`character-composite-frame ${className}`} style={style}>
      {/* 1. Dynamic Background Scene */}
      <div className={`composite-bg-scene bg-${bg}`}>
        {bg === 'curtains' && (
          <div className="bg-decor-curtains">
            <div className="curtain-fold c1" />
            <div className="curtain-fold c2" />
            <div className="curtain-fold c3" />
            <div className="curtain-fold c4" />
            <div className="curtain-fold c5" />
          </div>
        )}

        {bg === 'graveyard' && (
          <div className="bg-decor-graveyard">
            <div className="cemetery-moon" />
            <div className="cemetery-tombstones" />
            <div className="cemetery-iron-fence" />
            <div className="cemetery-fog" />
          </div>
        )}

        {bg === 'manor' && (
          <div className="bg-decor-manor">
            <div className="manor-wallpaper-pattern" />
            <div className="manor-arch-shadow" />
            <div className="manor-candle-sconce left" />
            <div className="manor-candle-sconce right" />
          </div>
        )}

        {bg === 'forest' && (
          <div className="bg-decor-forest">
            <div className="forest-moonbeam" />
            <div className="forest-branches-left" />
            <div className="forest-branches-right" />
            <div className="forest-creeping-mist" />
          </div>
        )}
      </div>

      {/* Apparition Behind Subject (Photo 2 / 3) */}
      {showHaunt && hauntStage === 1 && (
        <div className="haunt-presence stage-1" aria-hidden="true">
          <div className="haunt-creeper-face" />
        </div>
      )}

      {/* 2. Base Character Portrait (Face) - Vanishes in stage 3! */}
      {hauntStage !== 3 ? (
        <div className="composite-portrait-layer">
          <img
            src={faceImage}
            alt={currentFace.label}
            className="composite-base-img"
          />
        </div>
      ) : (
        /* Stage 3: Empty Seat with chalk silhouette outline */
        <div className="composite-vanished-void">
          <div className="vanished-chalk-outline" />
          <div className="vanished-shadow-stain" />
          <div className="vanished-whisper-text">Occupant not found.</div>
        </div>
      )}

      {/* Apparition Gripping Hands (Photo 3) */}
      {showHaunt && hauntStage === 2 && (
        <div className="haunt-presence stage-2" aria-hidden="true">
          <div className="spectral-grip-hand left" />
          <div className="spectral-grip-hand right" />
          <div className="spectral-entity-shadow" />
        </div>
      )}

      {/* 3. Layered Outfit Collar / Garment */}
      {hauntStage !== 3 && (
        <div className={`composite-outfit-layer outfit-${outfit}`}>
          {outfit === 'robe' && (
            <div className="outfit-asset robe-overlay">
              <div className="robe-cowl" />
              <div className="robe-talisman" />
            </div>
          )}

          {outfit === 'corset' && (
            <div className="outfit-asset corset-overlay">
              <div className="corset-choker" />
              <div className="corset-neckline" />
            </div>
          )}

          {outfit === 'sheet' && (
            <div className="outfit-asset sheet-overlay">
              <div className="sheet-drape" />
            </div>
          )}

          {outfit === 'gown' && (
            <div className="outfit-asset gown-overlay">
              <div className="gown-velvet-collar" />
              <div className="gown-filigree-trim" />
            </div>
          )}
        </div>
      )}

      {/* 4. Layered Headwear */}
      <div className={`composite-head-layer head-${head} ${hauntStage === 3 ? 'left-behind' : ''}`}>
        {head === 'witch_hat' && (
          <div className="head-asset witch-hat-overlay">
            <div className="hat-cone" />
            <div className="hat-brim" />
            <div className="hat-buckle" />
          </div>
        )}

        {head === 'horns' && (
          <div className="head-asset demon-horns-overlay">
            <div className="horn-left" />
            <div className="horn-right" />
          </div>
        )}

        {head === 'top_hat' && (
          <div className="head-asset top-hat-overlay">
            <div className="tophat-cylinder" />
            <div className="tophat-band" />
            <div className="tophat-brim" />
          </div>
        )}

        {head === 'veil' && (
          <div className="head-asset veil-overlay">
            <div className="veil-tiara" />
            <div className="veil-lace-mesh" />
          </div>
        )}
      </div>

      {/* 5. Layered Prop (Left in stage 3 on empty chair) */}
      <div className={`composite-prop-layer prop-${prop} ${hauntStage === 3 ? 'abandoned-prop' : ''}`}>
        {prop === 'candle' && (
          <div className="prop-asset candle-overlay">
            <div className="candle-holder" />
            <div className="candle-stem" />
            <div className="candle-flame-glow" />
            <div className="candle-flame" />
          </div>
        )}

        {prop === 'dagger' && (
          <div className="prop-asset dagger-overlay">
            <div className="dagger-blade" />
            <div className="dagger-hilt" />
            <div className="dagger-sheen" />
          </div>
        )}

        {prop === 'pumpkin' && (
          <div className="prop-asset pumpkin-overlay">
            <div className="pumpkin-body" />
            <div className="pumpkin-eyes" />
            <div className="pumpkin-mouth" />
            <div className="pumpkin-stem" />
          </div>
        )}

        {prop === 'roses' && (
          <div className="prop-asset roses-overlay">
            <div className="rose-bloom r1" />
            <div className="rose-bloom r2" />
            <div className="rose-stems" />
            <div className="rose-petals-falling" />
          </div>
        )}
      </div>

      {/* 6. Film Texture & Atmosphere Overlay */}
      <div className="composite-film-overlay" aria-hidden="true">
        <div className="film-vignette" />
        <div className="film-amber-lightleak" />
        <div className="film-scratches" />
      </div>
    </div>
  );
}

export default CharacterComposite;
