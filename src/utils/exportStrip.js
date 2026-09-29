import { PHOTOS_DATA } from '../data/boothData';

export async function downloadPhotoStrip(customization) {
  const canvas = document.createElement('canvas');

  // Tight layout dimensions: no negative dead space or awkward margins
  const width = 600;
  const paddingX = 16;
  const frameWidth = width - paddingX * 2; // 568px
  const frameHeight = Math.round(frameWidth * 0.85); // 483px (snug photobooth frame)
  const frameGap = 12;
  const topPadding = 16;

  const totalFramesHeight = 4 * frameHeight + 3 * frameGap;
  const footerPaddingTop = 14;
  const footerContentHeight = 100;
  const bottomPadding = 16;

  // Exact height computed to match content precisely: zero trailing whitespace
  const height = topPadding + totalFramesHeight + footerPaddingTop + footerContentHeight + bottomPadding;
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  // Background aged dark paper
  ctx.fillStyle = '#141210';
  ctx.fillRect(0, 0, width, height);

  // Subtle outer paper border
  ctx.strokeStyle = 'rgba(228, 213, 183, 0.28)';
  ctx.lineWidth = 2;
  ctx.strokeRect(6, 6, width - 12, height - 12);

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

  // Helper to draw image covering frame completely (no letterbox bars or negative space)
  const drawImageCover = (img, dx, dy, dWidth, dHeight) => {
    const sWidth = img.naturalWidth || img.width;
    const sHeight = img.naturalHeight || img.height;
    const imgRatio = sWidth / sHeight;
    const targetRatio = dWidth / dHeight;
    let sx = 0;
    let sy = 0;
    let cropWidth = sWidth;
    let cropHeight = sHeight;

    if (imgRatio > targetRatio) {
      cropWidth = sHeight * targetRatio;
      sx = (sWidth - cropWidth) / 2;
    } else {
      cropHeight = sWidth / targetRatio;
      sy = (sHeight - cropHeight) / 2;
    }

    ctx.drawImage(img, sx, sy, cropWidth, cropHeight, dx, dy, dWidth, dHeight);
  };

  loadedImages.forEach((img, i) => {
    const y = topPadding + i * (frameHeight + frameGap);

    // Frame backdrop
    ctx.fillStyle = '#08080a';
    ctx.fillRect(paddingX, y, frameWidth, frameHeight);

    if (img) {
      // Draw image edge-to-edge covering frame completely
      drawImageCover(img, paddingX, y, frameWidth, frameHeight);

      // Custom background atmosphere color wash
      if (customization?.background === 'curtains') {
        ctx.fillStyle = 'rgba(70, 10, 15, 0.22)';
        ctx.fillRect(paddingX, y, frameWidth, frameHeight);
      } else if (customization?.background === 'graveyard') {
        ctx.fillStyle = 'rgba(15, 35, 30, 0.25)';
        ctx.fillRect(paddingX, y, frameWidth, frameHeight);
      } else if (customization?.background === 'forest') {
        ctx.fillStyle = 'rgba(10, 25, 15, 0.25)';
        ctx.fillRect(paddingX, y, frameWidth, frameHeight);
      } else if (customization?.background === 'manor') {
        ctx.fillStyle = 'rgba(30, 20, 35, 0.22)';
        ctx.fillRect(paddingX, y, frameWidth, frameHeight);
      }

      // Vignette effect over photo
      const grad = ctx.createRadialGradient(
        width / 2, y + frameHeight / 2, frameWidth * 0.25,
        width / 2, y + frameHeight / 2, frameWidth * 0.75
      );
      grad.addColorStop(0, 'rgba(0,0,0,0)');
      grad.addColorStop(1, 'rgba(5, 5, 8, 0.55)');
      ctx.fillStyle = grad;
      ctx.fillRect(paddingX, y, frameWidth, frameHeight);
    }

    // Crisp inner frame line
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.6)';
    ctx.lineWidth = 1;
    ctx.strokeRect(paddingX, y, frameWidth, frameHeight);
  });

  // Footer Branding: snug and perfectly centered without extra negative space
  const footerY = topPadding + totalFramesHeight + footerPaddingTop;

  ctx.textAlign = 'center';
  ctx.fillStyle = '#ffb347';
  ctx.font = '24px "Alfa Slab One", cursive, serif';
  ctx.fillText('BOOTH 13', width / 2, footerY + 24);

  ctx.fillStyle = '#a8a095';
  ctx.font = '13px "Special Elite", monospace';
  const today = new Date();
  const dateFormatted = `${today.getDate().toString().padStart(2, '0')} · ${(today.getMonth() + 1).toString().padStart(2, '0')} · ${today.getFullYear()}`;
  ctx.fillText(`STRIP NO. 0013 · ${dateFormatted}`, width / 2, footerY + 50);

  ctx.fillStyle = '#cf7980';
  ctx.font = 'italic 30px "Caveat", cursive, Georgia';
  ctx.fillText('“You brought a friend.”', width / 2, footerY + 86);

  // Trigger download
  const dataUrl = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.download = 'booth-13-strip-0013.png';
  link.href = dataUrl;
  link.click();
}
