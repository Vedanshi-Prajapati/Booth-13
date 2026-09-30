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

  // Story progression:
  // Photo 1: normal portrait
  // Photo 2: barely perceptible presence in background (photo_02.jpg)
  // Photo 3: presence much closer, hands gripping shoulders (photo_03.jpg)
  // Photo 4: subject is gone, empty chair, burning candle (photo_04.jpg)
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
    <div className={`seamless-photographic-print ${className} ${getChamberWashClass()}`} style={style}>
      {/* 1. Core Silver-Halide Photographic Plate */}
      <img
        src={basePhotoSrc}
        alt={currentFace.label}
        className="photographic-film-image"
      />

      {/* 2. Subdued Analog Darkroom Grain & Optical Vignette */}
      <div className="photographic-vignette-grain" aria-hidden="true" />
    </div>
  );
}

export default CharacterComposite;
