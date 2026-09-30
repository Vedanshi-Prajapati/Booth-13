import React from 'react';
import { CUSTOMIZER_DATA } from '../../data/boothData';

export function CharacterComposite({
  customization,
  className = '',
  style = {},
  showHaunt = false,
  hauntStage = 0 // 0: Photo 1, 1: Photo 2, 2: Photo 3, 3: Photo 4
}) {
  const currentFace = CUSTOMIZER_DATA.face.find(f => f.id === customization.face) || CUSTOMIZER_DATA.face[0];
  const bg = customization.background || 'curtains';

  // Determine base photograph according to narrative horror progression
  let basePhotoSrc = '/assets/photo_01.jpg';

  if (hauntStage === 1) {
    basePhotoSrc = '/assets/photo_02.jpg';
  } else if (hauntStage === 2) {
    basePhotoSrc = '/assets/photo_03.jpg';
  } else if (hauntStage === 3) {
    basePhotoSrc = '/assets/photo_04.jpg';
  } else {
    // Normal exposure 1 / Preparation:
    if (customization.face === 'skull') {
      basePhotoSrc = '/assets/face_skull.jpg';
    } else if (customization.face === 'vampire') {
      basePhotoSrc = '/assets/face_vampire.jpg';
    } else if (customization.face === 'crone') {
      basePhotoSrc = '/assets/photo_02.jpg';
    } else {
      basePhotoSrc = '/assets/photo_01.jpg';
    }
  }

  // Background atmosphere tint matching chosen chamber
  const getChamberWashClass = () => {
    switch (bg) {
      case 'curtains':
        return 'wash-curtains';
      case 'graveyard':
        return 'wash-graveyard';
      case 'manor':
        return 'wash-manor';
      case 'forest':
        return 'wash-forest';
      default:
        return '';
    }
  };

  return (
    <div className={`analog-photographic-composite ${className} ${getChamberWashClass()}`} style={style}>
      {/* 1. Master Photographic Silver-Halide Base */}
      <div className="composite-master-layer">
        <img
          src={basePhotoSrc}
          alt={currentFace.label}
          className="composite-master-img"
        />
      </div>

      {/* 2. Atmospheric Chamber Wash (Seamless Color Grade) */}
      <div className={`composite-chamber-grade ${getChamberWashClass()}`} aria-hidden="true" />

      {/* 3. Stage 4 Vacant Seat Overlay Annotation */}
      {hauntStage === 3 && (
        <div className="composite-chalk-ghost-layer" aria-hidden="true">
          <div className="chalk-silhouette-trace" />
          <div className="residual-smoke-drift" />
        </div>
      )}

      {/* 4. Optical Silver-Halide Darkroom Grain & Vignette */}
      <div className="composite-darkroom-grain" aria-hidden="true">
        <div className="optical-vignette" />
        <div className="silver-grain-texture" />
        <div className="film-burn-corner" />
      </div>
    </div>
  );
}

export default CharacterComposite;
