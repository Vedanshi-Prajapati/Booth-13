import { PHOTOS_DATA } from '../data/boothData';

export async function downloadPhotoStrip(customization) {
  const canvas = document.createElement('canvas');
  const width = 640;
  const height = 1920;
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  // Background aged dark paper
  ctx.fillStyle = '#181512';
  ctx.fillRect(0, 0, width, height);

  // Subtle outer paper border
  ctx.strokeStyle = '#3d342c';
  ctx.lineWidth = 4;
  ctx.strokeRect(12, 12, width - 24, height - 24);

  // Custom face selection
  let photo1 = PHOTOS_DATA[0].image;
  if (customization?.face === 'skull') photo1 = '/assets/face_skull.jpg';
  else if (customization?.face === 'vampire') photo1 = '/assets/face_vampire.jpg';
  else if (customization?.face === 'crone') photo1 = '/assets/photo_02.jpg';
  else if (customization?.face === 'witch') photo1 = '/assets/face_witch.jpg';

  const imageSrcs = [
    photo1,
    PHOTOS_DATA[1].image,
    PHOTOS_DATA[2].image,
    PHOTOS_DATA[3].image
  ];

  const loadImage = (src) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => resolve(img);
      img.onerror = () => resolve(null);
      img.src = src;
    });
  };

  const loadedImages = await Promise.all(imageSrcs.map(loadImage));

  // Layout parameters for the 4 frames
  const frameMarginX = 36;
  const frameWidth = width - frameMarginX * 2; // 568px
  const frameHeight = 365;
  const frameGap = 24;
  const topOffset = 36;

  loadedImages.forEach((img, i) => {
    const y = topOffset + i * (frameHeight + frameGap);

    // Frame border
    ctx.fillStyle = '#0a0908';
    ctx.fillRect(frameMarginX - 4, y - 4, frameWidth + 8, frameHeight + 8);

    if (img) {
      // Draw image cropped to frame aspect ratio
      ctx.drawImage(img, frameMarginX, y, frameWidth, frameHeight);

      // Custom background atmosphere color wash
      if (customization?.background === 'curtains') {
        ctx.fillStyle = 'rgba(70, 10, 15, 0.22)';
        ctx.fillRect(frameMarginX, y, frameWidth, frameHeight);
      } else if (customization?.background === 'graveyard') {
        ctx.fillStyle = 'rgba(15, 35, 30, 0.25)';
        ctx.fillRect(frameMarginX, y, frameWidth, frameHeight);
      } else if (customization?.background === 'forest') {
        ctx.fillStyle = 'rgba(10, 25, 15, 0.25)';
        ctx.fillRect(frameMarginX, y, frameWidth, frameHeight);
      } else if (customization?.background === 'manor') {
        ctx.fillStyle = 'rgba(30, 20, 35, 0.22)';
        ctx.fillRect(frameMarginX, y, frameWidth, frameHeight);
      }

      // Vignette effect over photo
      const grad = ctx.createRadialGradient(
        width / 2, y + frameHeight / 2, frameWidth * 0.25,
        width / 2, y + frameHeight / 2, frameWidth * 0.75
      );
      grad.addColorStop(0, 'rgba(0,0,0,0)');
      grad.addColorStop(1, 'rgba(10,5,5,0.45)');
      ctx.fillStyle = grad;
      ctx.fillRect(frameMarginX, y, frameWidth, frameHeight);
    }
  });

  // Footer Branding
  const footerY = topOffset + 4 * (frameHeight + frameGap) + 10;

  ctx.textAlign = 'center';
  ctx.fillStyle = '#e4d5b7';
  ctx.font = 'bold 24px "Cinzel", Georgia, serif';
  ctx.fillText('THE CURSED', width / 2, footerY + 28);
  ctx.fillText('PHOTO BOOTH', width / 2, footerY + 58);

  ctx.fillStyle = '#8f8576';
  ctx.font = '16px "Special Elite", monospace';
  ctx.fillText('31 · 10 · 2026', width / 2, footerY + 95);

  ctx.fillStyle = '#cf7980';
  ctx.font = 'italic 32px "Caveat", cursive, Georgia';
  ctx.fillText('You brought a friend.', width / 2, footerY + 140);

  // Trigger download
  const dataUrl = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.download = 'the-cursed-photo-strip-31-10-2026.png';
  link.href = dataUrl;
  link.click();
}
