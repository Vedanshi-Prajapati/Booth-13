import { traceSubjectPath } from './subjectPath';

/**
 * Backdrop Layer
 * Supports 4 distinct backdrop environments from the spec:
 * 1. 'red-curtain': Classic oxblood velvet curtains (parts open in shot 4).
 * 2. 'wallpaper': Victorian damask wallpaper (person-shaped gap in shot 4).
 * 3. 'graveyard-fence': Midnight iron cemetery fence & fog.
 * 4. 'empty-hallway': Perspective hallway with receding door (opens progressively).
 */
export function renderBackdrop(ctx, width, height, backdropType = 'red-curtain', shot = 1) {
  ctx.save();

  switch (backdropType) {
    case 'wallpaper':
      renderWallpaperBackdrop(ctx, width, height, shot);
      break;

    case 'graveyard-fence':
      renderGraveyardBackdrop(ctx, width, height, shot);
      break;

    case 'empty-hallway':
      renderHallwayBackdrop(ctx, width, height, shot);
      break;

    case 'red-curtain':
    default:
      renderRedCurtainBackdrop(ctx, width, height, shot);
      break;
  }

  ctx.restore();
}

/**
 * 1. Red Curtain Backdrop
 * In shot 4: "the curtain is open and empty"
 */
function renderRedCurtainBackdrop(ctx, width, height, shot) {
  if (shot === 4) {
    // Shot 4: Curtain is parted wide open, revealing deep black void & back booth wood
    ctx.fillStyle = '#05070D';
    ctx.fillRect(0, 0, width, height);

    // Faint brickwork / wood seams in the exposed booth cavity
    ctx.strokeStyle = 'rgba(255, 179, 71, 0.08)';
    ctx.lineWidth = 1;
    for (let y = 30; y < height; y += 28) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Left pulled-back curtain drape
    const drapeLeft = ctx.createLinearGradient(0, 0, width * 0.22, 0);
    drapeLeft.addColorStop(0, '#6B1A1F');
    drapeLeft.addColorStop(0.7, '#421013');
    drapeLeft.addColorStop(1, 'rgba(30, 8, 10, 0.2)');
    ctx.fillStyle = drapeLeft;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(width * 0.26, height * 0.3, width * 0.12, height * 0.7, width * 0.28, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fill();

    // Right pulled-back curtain drape
    const drapeRight = ctx.createLinearGradient(width, 0, width * 0.78, 0);
    drapeRight.addColorStop(0, '#6B1A1F');
    drapeRight.addColorStop(0.7, '#421013');
    drapeRight.addColorStop(1, 'rgba(30, 8, 10, 0.2)');
    ctx.fillStyle = drapeRight;
    ctx.beginPath();
    ctx.moveTo(width, 0);
    ctx.bezierCurveTo(width * 0.74, height * 0.3, width * 0.88, height * 0.7, width * 0.72, height);
    ctx.lineTo(width, height);
    ctx.closePath();
    ctx.fill();
    return;
  }

  // Standard Red Curtain (shots 1 - 3)
  ctx.fillStyle = '#0E1224';
  ctx.fillRect(0, 0, width, height);

  const folds = [
    { c1: '#6B1A1F', c2: '#4A1215' },
    { c1: '#541418', c2: '#6B1A1F' },
    { c1: '#6B1A1F', c2: '#3D0E11' },
    { c1: '#5A151A', c2: '#6B1A1F' },
    { c1: '#4A1215', c2: '#5C161B' },
    { c1: '#6B1A1F', c2: '#380C0F' },
  ];

  const colW = width / folds.length;
  for (let i = 0; i < folds.length; i++) {
    const grad = ctx.createLinearGradient(i * colW, 0, (i + 1) * colW, 0);
    grad.addColorStop(0, folds[i].c1);
    grad.addColorStop(1, folds[i].c2);
    ctx.fillStyle = grad;
    ctx.fillRect(i * colW, 0, colW + 1, height);
  }

  // Horizontal wainscot panel
  ctx.fillStyle = '#090B16';
  ctx.fillRect(0, height * 0.82, width, height * 0.18);
  ctx.fillStyle = '#FFB347';
  ctx.globalAlpha = 0.22;
  ctx.fillRect(0, height * 0.816, width, height * 0.006);
  ctx.globalAlpha = 1.0;
}

/**
 * 2. Wallpaper Backdrop
 * In shot 4: "the wallpaper pattern has a person-shaped gap"
 */
function renderWallpaperBackdrop(ctx, width, height, shot) {
  // Base wallpaper wall in deep vintage taupe/oxblood
  ctx.fillStyle = '#1e141a';
  ctx.fillRect(0, 0, width, height);

  // Damask pattern motif drawer
  const drawPattern = () => {
    ctx.fillStyle = '#3a1b24';
    ctx.strokeStyle = '#54202e';
    ctx.lineWidth = 1.5;

    const spacingX = 40;
    const spacingY = 48;

    for (let x = -20; x < width + 40; x += spacingX) {
      for (let y = -20; y < height + 40; y += spacingY) {
        ctx.save();
        ctx.translate(x, y);

        // Damask diamond / floral motif
        ctx.beginPath();
        ctx.moveTo(0, -14);
        ctx.bezierCurveTo(12, -8, 14, 4, 0, 14);
        ctx.bezierCurveTo(-14, 4, -12, -8, 0, -14);
        ctx.fill();
        ctx.stroke();

        // Inner petal
        ctx.beginPath();
        ctx.arc(0, 0, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#6b1a1f';
        ctx.fill();

        ctx.restore();
      }
    }
  };

  if (shot === 4) {
    // In Shot 4: draw wallpaper everywhere EXCEPT inside the person-shaped gap
    drawPattern();

    // Clip out the person-shaped void and reveal blank raw plaster wall
    const scale = width / 400;
    const centerX = width * 0.5;
    const bottomY = height * 0.98;

    ctx.save();
    // Raw exposed blank plaster inside the silhouette void
    ctx.fillStyle = '#0a0d16';
    traceSubjectPath(ctx, centerX, bottomY, scale);
    ctx.fill();

    // Jagged / peeled wallpaper edge around the silhouette gap
    ctx.strokeStyle = 'rgba(242, 232, 213, 0.55)';
    ctx.lineWidth = 2 * scale;
    ctx.setLineDash([4 * scale, 3 * scale]);
    traceSubjectPath(ctx, centerX, bottomY, scale);
    ctx.stroke();
    ctx.restore();
  } else {
    drawPattern();
  }

  // Wooden floorboard trim at bottom
  ctx.fillStyle = '#0a0c14';
  ctx.fillRect(0, height * 0.86, width, height * 0.14);
}

/**
 * 3. Graveyard Fence Backdrop
 * Iron picket fence under midnight sky & tombstones in fog
 */
function renderGraveyardBackdrop(ctx, width, height, _shot) {
  // Midnight sky gradient
  const skyGrad = ctx.createLinearGradient(0, 0, 0, height);
  skyGrad.addColorStop(0, '#060812');
  skyGrad.addColorStop(0.5, '#0E1324');
  skyGrad.addColorStop(0.85, '#192238');
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, width, height);

  // Pale ghostly moon high up
  ctx.save();
  ctx.fillStyle = 'rgba(242, 232, 213, 0.12)';
  ctx.beginPath();
  ctx.arc(width * 0.8, height * 0.18, 36, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = 'rgba(242, 232, 213, 0.4)';
  ctx.beginPath();
  ctx.arc(width * 0.8, height * 0.18, 22, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Distant headstones & silhouettes
  ctx.fillStyle = '#080c16';
  ctx.beginPath();
  ctx.rect(width * 0.12, height * 0.52, 26, 36);
  ctx.arc(width * 0.12 + 13, height * 0.52, 13, Math.PI, 0);
  ctx.fill();

  ctx.beginPath();
  ctx.rect(width * 0.65, height * 0.56, 30, 32);
  ctx.arc(width * 0.65 + 15, height * 0.56, 15, Math.PI, 0);
  ctx.fill();

  // Iron Fence Rails
  ctx.fillStyle = '#04060b';
  ctx.fillRect(0, height * 0.58, width, 6);
  ctx.fillRect(0, height * 0.76, width, 6);

  // Iron Picket Bars
  const barSpacing = 28;
  for (let x = 12; x < width; x += barSpacing) {
    ctx.fillRect(x, height * 0.45, 5, height * 0.38);
    // Spear / Fleur-de-lis finial top
    ctx.beginPath();
    ctx.moveTo(x - 2, height * 0.45);
    ctx.lineTo(x + 2.5, height * 0.45 - 12);
    ctx.lineTo(x + 7, height * 0.45);
    ctx.closePath();
    ctx.fill();
  }

  // Low crawling fog
  const fogGrad = ctx.createLinearGradient(0, height * 0.55, 0, height);
  fogGrad.addColorStop(0, 'rgba(143, 209, 138, 0)');
  fogGrad.addColorStop(0.5, 'rgba(143, 209, 138, 0.08)');
  fogGrad.addColorStop(1, 'rgba(14, 18, 36, 0.6)');
  ctx.fillStyle = fogGrad;
  ctx.fillRect(0, height * 0.55, width, height * 0.45);
}

/**
 * 4. Empty Hallway Backdrop
 * Perspective hallway with a door at the far end that opens each shot:
 * - Shot 1: closed door
 * - Shot 2: slightly ajar sliver
 * - Shot 3: door open wider (~45 deg)
 * - Shot 4: door fully open, blazing light on
 */
function renderHallwayBackdrop(ctx, width, height, shot) {
  // Hallway ceiling & floor perspective
  ctx.fillStyle = '#080a14';
  ctx.fillRect(0, 0, width, height);

  // Far back wall rectangle
  const backX = width * 0.32;
  const backY = height * 0.2;
  const backW = width * 0.36;
  const backH = height * 0.55;

  ctx.fillStyle = '#101424';
  ctx.fillRect(backX, backY, backW, backH);

  // Left wall perspective
  ctx.fillStyle = '#181e33';
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(backX, backY);
  ctx.lineTo(backX, backY + backH);
  ctx.lineTo(0, height);
  ctx.closePath();
  ctx.fill();

  // Right wall perspective
  ctx.fillStyle = '#13182b';
  ctx.beginPath();
  ctx.moveTo(width, 0);
  ctx.lineTo(backX + backW, backY);
  ctx.lineTo(backX + backW, backY + backH);
  ctx.lineTo(width, height);
  ctx.closePath();
  ctx.fill();

  // Floorboards perspective lines
  ctx.strokeStyle = '#0a0d18';
  ctx.lineWidth = 1.5;
  const floorPoints = [0, width * 0.25, width * 0.5, width * 0.75, width];
  floorPoints.forEach((fx) => {
    ctx.beginPath();
    ctx.moveTo(backX + backW * (fx / width), backY + backH);
    ctx.lineTo(fx, height);
    ctx.stroke();
  });

  // Door at far end
  const doorW = backW * 0.44;
  const doorH = backH * 0.75;
  const doorX = backX + (backW - doorW) * 0.5;
  const doorY = backY + backH - doorH;

  // Door frame
  ctx.fillStyle = '#05070d';
  ctx.fillRect(doorX - 3, doorY - 3, doorW + 6, doorH + 3);

  if (shot === 1) {
    // Closed wooden door
    ctx.fillStyle = '#261b17';
    ctx.fillRect(doorX, doorY, doorW, doorH);
    // Door panels
    ctx.strokeStyle = '#140d0a';
    ctx.strokeRect(doorX + 3, doorY + 6, doorW - 6, doorH * 0.4);
    ctx.strokeRect(doorX + 3, doorY + doorH * 0.48, doorW - 6, doorH * 0.46);
    // Brass knob
    ctx.fillStyle = '#FFB347';
    ctx.beginPath();
    ctx.arc(doorX + doorW - 5, doorY + doorH * 0.52, 2, 0, Math.PI * 2);
    ctx.fill();
  } else if (shot === 2) {
    // Door cracked slightly ajar with sliver of amber light
    ctx.fillStyle = '#05070c';
    ctx.fillRect(doorX, doorY, doorW, doorH);

    // Light sliver
    ctx.fillStyle = '#FFB347';
    ctx.shadowColor = '#FFB347';
    ctx.shadowBlur = 8;
    ctx.fillRect(doorX + doorW * 0.78, doorY, 4, doorH);
    ctx.shadowBlur = 0;

    // Angled door edge
    ctx.fillStyle = '#261b17';
    ctx.beginPath();
    ctx.moveTo(doorX, doorY);
    ctx.lineTo(doorX + doorW * 0.78, doorY);
    ctx.lineTo(doorX + doorW * 0.76, doorY + doorH);
    ctx.lineTo(doorX, doorY + doorH);
    ctx.closePath();
    ctx.fill();
  } else if (shot === 3) {
    // Door half open (~45 deg)
    ctx.fillStyle = '#05070c';
    ctx.fillRect(doorX, doorY, doorW, doorH);

    // Eerie warm light spilling through half-open doorway
    const lightCast = ctx.createRadialGradient(
      doorX + doorW * 0.6, doorY + doorH * 0.5, 0,
      doorX + doorW * 0.6, doorY + doorH * 0.5, doorW * 2
    );
    lightCast.addColorStop(0, 'rgba(255, 179, 71, 0.45)');
    lightCast.addColorStop(1, 'rgba(255, 179, 71, 0)');
    ctx.fillStyle = lightCast;
    ctx.fillRect(doorX, doorY, doorW * 1.5, doorH * 1.2);

    // Door angled inward
    ctx.fillStyle = '#261b17';
    ctx.beginPath();
    ctx.moveTo(doorX, doorY);
    ctx.lineTo(doorX + doorW * 0.35, doorY - 4);
    ctx.lineTo(doorX + doorW * 0.35, doorY + doorH - 4);
    ctx.lineTo(doorX, doorY + doorH);
    ctx.closePath();
    ctx.fill();
  } else if (shot === 4) {
    // In shot 4: door is fully open and the light is on!
    // Blazing bright amber/gold void from within the room
    const blazingLight = ctx.createRadialGradient(
      doorX + doorW * 0.5, doorY + doorH * 0.5, 2,
      doorX + doorW * 0.5, doorY + doorH * 0.5, width * 0.45
    );
    blazingLight.addColorStop(0, '#FFE8B5');
    blazingLight.addColorStop(0.3, '#FFB347');
    blazingLight.addColorStop(0.7, 'rgba(255, 179, 71, 0.35)');
    blazingLight.addColorStop(1, 'rgba(255, 179, 71, 0)');

    ctx.fillStyle = blazingLight;
    ctx.fillRect(0, 0, width, height);

    // Doorway opening itself blazing white-gold
    ctx.fillStyle = '#FFF1D0';
    ctx.shadowColor = '#FFB347';
    ctx.shadowBlur = 24;
    ctx.fillRect(doorX, doorY, doorW, doorH);
    ctx.shadowBlur = 0;

    // Door fully swung flat open against left wall
    ctx.fillStyle = '#1c1310';
    ctx.fillRect(doorX - doorW * 0.7, doorY + 2, doorW * 0.7, doorH - 2);
  }
}
