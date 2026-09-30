import React from 'react';
import { CUSTOMIZER_DATA } from '../../data/boothData';

export function CharacterComposite({
  customization,
  className = '',
  style = {},
  showHaunt = false,
  hauntStage = 0
}) {
  const currentFace = CUSTOMIZER_DATA.face.find(f => f.id === customization.face) || CUSTOMIZER_DATA.face[0];
  const bg = customization.background || 'curtains';

  let basePhotoSrc = '/assets/photo_01.jpg';

  if (hauntStage === 1) {
    basePhotoSrc = '/assets/photo_02.jpg';
  } else if (hauntStage === 2) {
    basePhotoSrc = '/assets/photo_03.jpg';
  } else if (hauntStage === 3) {
    basePhotoSrc = '/assets/photo_04.jpg';
  } else {
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
      <img
        src={basePhotoSrc}
        alt={currentFace.label}
        className="photographic-film-image"
      />
      <div className="photographic-vignette-grain" aria-hidden="true" />
    </div>
  );
}

export default CharacterComposite;
