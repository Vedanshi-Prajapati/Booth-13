import { traceSubjectPath } from './subjectPath';

/**
 * Apparitions Layer
 * Dispatches distinct hauntings and shot 4 scenes per backdrop type:
 *
 * 1. 'red-curtain':
 *    - Shot 2: subtle rustle/shadow behind curtain
 *    - Shot 3: a hand parts the curtain behind you
 *    - Shot 4: curtain is open and empty (+ shadow on wall)
 *
 * 2. 'wallpaper':
 *    - Shot 2: faces slowly form in the pattern
 *    - Shot 3: contorted faces manifested beside subject
 *    - Shot 4: wallpaper pattern person-shaped gap (+ chalk outline)
 *
 * 3. 'graveyard-fence':
 *    - Shot 2: a small figure stands far at the fence
 *    - Shot 3: the figure is closer, gripping the fence
 *    - Shot 4: figure is right in foreground, your spot is empty
 *
 * 4. 'empty-hallway':
 *    - Shot 2: door opens sliver, faint silhouette inside
 *    - Shot 3: door opens wider, shadow stretching toward you
 *    - Shot 4: door fully open with blazing light, subject spot empty
 */
export function renderApparitions(ctx, width, height, shot = 1, backdropType = 'red-curtain') {
  const scale = width / 400;
  const centerX = width * 0.5;
  const bottomY = height * 0.98;

  ctx.save();

  switch (backdropType) {
    case 'wallpaper':
      renderWallpaperApparition(ctx, width, height, scale, centerX, bottomY, shot);
      break;

    case 'graveyard-fence':
      renderGraveyardApparition(ctx, width, height, scale, centerX, bottomY, shot);
      break;

    case 'empty-hallway':
      renderHallwayApparition(ctx, width, height, scale, centerX, bottomY, shot);
      break;

    case 'red-curtain':
    default:
      renderCurtainApparition(ctx, width, height, scale, centerX, bottomY, shot);
      break;
  }

  ctx.restore();
}

/**
 * RED CURTAIN HAUNTING
 * "a hand parts the curtain behind you; in shot 4 the curtain is open and empty"
 */
function renderCurtainApparition(ctx, width, height, scale, centerX, bottomY, shot) {
  if (shot === 1) return;

  if (shot === 2) {
    // Faint eerie eyes and silhouette behind drape
    const appX = width * 0.28;
    const appY = height * 0.35;
    ctx.save();
    ctx.fillStyle = 'rgba(143, 209, 138, 0.7)';
    ctx.shadowColor = '#8FD18A';
    ctx.shadowBlur = 8 * scale;
    ctx.beginPath();
    ctx.ellipse(appX - 8 * scale, appY, 3.5 * scale, 2 * scale, -0.1, 0, Math.PI * 2);
    ctx.ellipse(appX + 8 * scale, appY, 3.5 * scale, 2 * scale, 0.1, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  if (shot === 3) {
    // "a hand parts the curtain behind you"
    ctx.save();
    const handX = centerX + 60 * scale;
    const handY = bottomY - 180 * scale;

    // Darkened second silhouette in the curtain split
    ctx.fillStyle = '#0a0d18';
    ctx.beginPath();
    ctx.ellipse(handX + 15 * scale, handY - 20 * scale, 30 * scale, 45 * scale, 0.15, 0, Math.PI * 2);
    ctx.fill();

    // Pale, gaunt hand parting the fabric
    ctx.fillStyle = '#dcd4c3';
    ctx.strokeStyle = '#2b231f';
    ctx.lineWidth = 1.2 * scale;
    ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
    ctx.shadowBlur = 8 * scale;

    // Wrist & Palm grasping curtain edge
    ctx.beginPath();
    ctx.ellipse(handX, handY, 12 * scale, 16 * scale, -0.3, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Four long fingers curling over the drape
    for (let f = 0; f < 4; f++) {
      const fy = handY - 14 * scale + f * 9 * scale;
      ctx.beginPath();
      if (typeof ctx.roundRect === 'function') {
        ctx.roundRect(handX - 18 * scale, fy, 22 * scale, 6 * scale, 3 * scale);
      } else {
        ctx.rect(handX - 18 * scale, fy, 22 * scale, 6 * scale);
      }
      ctx.fill();
      ctx.stroke();
    }
    ctx.restore();
  }

  if (shot === 4) {
    // "in shot 4 the curtain is open and empty"
    // Residual shadow on the back wall and faint chalk outline
    ctx.save();
    ctx.fillStyle = 'rgba(5, 7, 14, 0.65)';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.85)';
    ctx.shadowBlur = 24 * scale;
    traceSubjectPath(ctx, centerX + 8 * scale, bottomY, scale);
    ctx.fill();

    // Chalk outline
    ctx.strokeStyle = '#F2E8D5';
    ctx.lineWidth = 2 * scale;
    ctx.setLineDash([4 * scale, 4 * scale]);
    ctx.globalAlpha = 0.85;
    traceSubjectPath(ctx, centerX, bottomY, scale);
    ctx.stroke();
    ctx.restore();
  }
}

/**
 * WALLPAPER HAUNTING
 * "faces slowly form in the pattern; in shot 4 the wallpaper pattern has a person-shaped gap"
 */
function renderWallpaperApparition(ctx, width, height, scale, centerX, bottomY, shot) {
  if (shot === 1) return;

  if (shot === 2) {
    // Faint spectral eyes forming naturally in the damask curves
    const faces = [
      { x: width * 0.2, y: height * 0.28 },
      { x: width * 0.78, y: height * 0.38 },
    ];
    faces.forEach((f) => {
      ctx.save();
      ctx.fillStyle = 'rgba(143, 209, 138, 0.45)';
      ctx.shadowColor = '#8FD18A';
      ctx.shadowBlur = 6 * scale;
      // Slanted eyes
      ctx.beginPath();
      ctx.ellipse(f.x - 7 * scale, f.y, 3 * scale, 1.8 * scale, -0.2, 0, Math.PI * 2);
      ctx.ellipse(f.x + 7 * scale, f.y, 3 * scale, 1.8 * scale, 0.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });
  }

  if (shot === 3) {
    // "faces slowly form in the pattern" — fully contorted spectral faces staring
    const faces = [
      { x: width * 0.24, y: height * 0.32, rot: -0.1 },
      { x: width * 0.75, y: height * 0.42, rot: 0.15 },
      { x: width * 0.18, y: height * 0.62, rot: 0.05 },
    ];
    faces.forEach((f) => {
      ctx.save();
      ctx.translate(f.x, f.y);
      ctx.rotate(f.rot);

      // Pale hollow face contour
      ctx.fillStyle = 'rgba(15, 20, 36, 0.85)';
      ctx.beginPath();
      ctx.ellipse(0, 0, 22 * scale, 30 * scale, 0, 0, Math.PI * 2);
      ctx.fill();

      // Hollow dark eye sockets
      ctx.fillStyle = '#04060c';
      ctx.beginPath();
      ctx.ellipse(-8 * scale, -4 * scale, 5 * scale, 7 * scale, 0, 0, Math.PI * 2);
      ctx.ellipse(8 * scale, -4 * scale, 5 * scale, 7 * scale, 0, 0, Math.PI * 2);
      ctx.fill();

      // Ghost-green pinpoint pupils
      ctx.fillStyle = '#8FD18A';
      ctx.shadowColor = '#8FD18A';
      ctx.shadowBlur = 5 * scale;
      ctx.beginPath();
      ctx.arc(-8 * scale, -4 * scale, 1.8 * scale, 0, Math.PI * 2);
      ctx.arc(8 * scale, -4 * scale, 1.8 * scale, 0, Math.PI * 2);
      ctx.fill();

      // Gaping mouth
      ctx.fillStyle = '#04060c';
      ctx.beginPath();
      ctx.ellipse(0, 12 * scale, 6 * scale, 10 * scale, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    });
  }

  if (shot === 4) {
    // Wallpaper gap is rendered directly in backdropLayer!
    // Here we add faint ghostly dust / chalk outline around the peeled void
    ctx.save();
    ctx.strokeStyle = 'rgba(255, 179, 71, 0.4)';
    ctx.lineWidth = 1.5 * scale;
    ctx.setLineDash([2 * scale, 6 * scale]);
    traceSubjectPath(ctx, centerX, bottomY, scale);
    ctx.stroke();
    ctx.restore();
  }
}

/**
 * GRAVEYARD FENCE HAUNTING
 * "a small figure stands at the fence; in shot 4 the figure is closer and your spot is empty"
 */
function renderGraveyardApparition(ctx, width, height, scale, centerX, bottomY, shot) {
  if (shot === 1) return;

  if (shot === 2) {
    // "a small figure stands at the fence" (distant, behind pickets)
    const figX = width * 0.28;
    const figY = height * 0.48;

    ctx.save();
    ctx.fillStyle = '#060914';
    ctx.beginPath();
    // Head
    ctx.arc(figX, figY - 24 * scale, 9 * scale, 0, Math.PI * 2);
    // Robed body
    ctx.moveTo(figX - 10 * scale, figY);
    ctx.lineTo(figX, figY - 18 * scale);
    ctx.lineTo(figX + 10 * scale, figY);
    ctx.closePath();
    ctx.fill();

    // Two faint white pinpricks
    ctx.fillStyle = '#F2E8D5';
    ctx.beginPath();
    ctx.arc(figX - 2.5 * scale, figY - 24 * scale, 1 * scale, 0, Math.PI * 2);
    ctx.arc(figX + 2.5 * scale, figY - 24 * scale, 1 * scale, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  if (shot === 3) {
    // "the figure is closer" (right at fence beside subject)
    const figX = centerX + 85 * scale;
    const figBottomY = bottomY - 30 * scale;

    ctx.save();
    ctx.fillStyle = '#05070f';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.9)';
    ctx.shadowBlur = 16 * scale;

    // Body
    ctx.beginPath();
    const hR = 26 * scale;
    const hY = figBottomY - 130 * scale;
    ctx.ellipse(figX, hY, hR * 0.85, hR, 0, 0, Math.PI * 2);
    ctx.moveTo(figX - 35 * scale, figBottomY);
    ctx.lineTo(figX - 18 * scale, hY + hR * 0.7);
    ctx.lineTo(figX + 18 * scale, hY + hR * 0.7);
    ctx.lineTo(figX + 35 * scale, figBottomY);
    ctx.closePath();
    ctx.fill();

    // Pale hands grasping the iron picket fence
    ctx.fillStyle = '#dcd4c3';
    ctx.beginPath();
    ctx.arc(figX - 22 * scale, figBottomY - 50 * scale, 5 * scale, 0, Math.PI * 2);
    ctx.arc(figX + 22 * scale, figBottomY - 50 * scale, 5 * scale, 0, Math.PI * 2);
    ctx.fill();

    // Staring eyes
    ctx.fillStyle = '#8FD18A';
    ctx.shadowColor = '#8FD18A';
    ctx.shadowBlur = 8 * scale;
    ctx.beginPath();
    ctx.arc(figX - 7 * scale, hY, 2.5 * scale, 0, Math.PI * 2);
    ctx.arc(figX + 7 * scale, hY, 2.5 * scale, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  if (shot === 4) {
    // "in shot 4 the figure is closer and your spot is empty"
    // The figure has stepped into the foreground center-right, while the visitor's spot is empty!
    const figX = centerX + 30 * scale;
    const figBottomY = bottomY;

    ctx.save();
    ctx.fillStyle = '#04060c';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.95)';
    ctx.shadowBlur = 24 * scale;

    // Large looming figure in foreground
    ctx.beginPath();
    const hR = 42 * scale;
    const hY = figBottomY - 170 * scale;
    ctx.ellipse(figX, hY, hR * 0.82, hR, 0, 0, Math.PI * 2);
    ctx.moveTo(figX - 60 * scale, figBottomY);
    ctx.lineTo(figX - 30 * scale, hY + hR * 0.6);
    ctx.lineTo(figX + 30 * scale, hY + hR * 0.6);
    ctx.lineTo(figX + 60 * scale, figBottomY);
    ctx.closePath();
    ctx.fill();

    // Piercing staring amber/green eyes directly at camera
    ctx.fillStyle = '#FFB347';
    ctx.shadowColor = '#FFB347';
    ctx.shadowBlur = 10 * scale;
    ctx.beginPath();
    ctx.arc(figX - 12 * scale, hY - 2 * scale, 4 * scale, 0, Math.PI * 2);
    ctx.arc(figX + 12 * scale, hY - 2 * scale, 4 * scale, 0, Math.PI * 2);
    ctx.fill();

    // Subtle chalk outline where user used to be
    ctx.strokeStyle = 'rgba(242, 232, 213, 0.4)';
    ctx.lineWidth = 1.5 * scale;
    ctx.setLineDash([4 * scale, 6 * scale]);
    traceSubjectPath(ctx, centerX - 50 * scale, bottomY, scale);
    ctx.stroke();

    ctx.restore();
  }
}

/**
 * EMPTY HALLWAY HAUNTING
 * "a door at the far end opens a little more each shot; in shot 4 the door is fully open and the light is on"
 */
function renderHallwayApparition(ctx, width, height, scale, centerX, bottomY, shot) {
  if (shot === 1) return;

  const backX = width * 0.32;
  const backY = height * 0.2;
  const backW = width * 0.36;
  const backH = height * 0.55;
  const doorW = backW * 0.44;
  const doorH = backH * 0.75;
  const doorX = backX + (backW - doorW) * 0.5;
  const doorY = backY + backH - doorH;

  if (shot === 2) {
    // Subtle shadow hand / eye in the door sliver
    ctx.save();
    ctx.fillStyle = '#8FD18A';
    ctx.shadowColor = '#8FD18A';
    ctx.shadowBlur = 6 * scale;
    ctx.beginPath();
    ctx.arc(doorX + doorW * 0.78, doorY + doorH * 0.45, 1.8 * scale, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  if (shot === 3) {
    // Shadow figure stepping out into the hallway
    ctx.save();
    ctx.fillStyle = '#060812';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
    ctx.shadowBlur = 10 * scale;

    const figX = doorX + doorW * 0.65;
    const figBottomY = doorY + doorH;
    ctx.beginPath();
    ctx.ellipse(figX, figBottomY - 32 * scale, 7 * scale, 9 * scale, 0, 0, Math.PI * 2);
    ctx.moveTo(figX - 8 * scale, figBottomY);
    ctx.lineTo(figX, figBottomY - 26 * scale);
    ctx.lineTo(figX + 8 * scale, figBottomY);
    ctx.closePath();
    ctx.fill();

    // Long elongated shadow stretching toward the subject
    ctx.fillStyle = 'rgba(4, 6, 12, 0.75)';
    ctx.beginPath();
    ctx.moveTo(figX - 6 * scale, figBottomY);
    ctx.lineTo(centerX + 70 * scale, bottomY);
    ctx.lineTo(centerX + 30 * scale, bottomY);
    ctx.lineTo(figX + 6 * scale, figBottomY);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  if (shot === 4) {
    // Blazing door light is rendered in backdropLayer!
    // The subject's spot is empty, with a sharp long shadow cast forward by the blazing doorway
    ctx.save();
    // Long forward shadow cast by missing occupant onto the floorboards
    ctx.fillStyle = 'rgba(6, 8, 16, 0.85)';
    ctx.beginPath();
    ctx.moveTo(centerX - 40 * scale, bottomY);
    ctx.lineTo(centerX + 40 * scale, bottomY);
    ctx.lineTo(centerX + 120 * scale, height);
    ctx.lineTo(centerX - 120 * scale, height);
    ctx.closePath();
    ctx.fill();

    // Chalk outline on the floor
    ctx.strokeStyle = '#F2E8D5';
    ctx.lineWidth = 2 * scale;
    ctx.setLineDash([4 * scale, 4 * scale]);
    traceSubjectPath(ctx, centerX, bottomY, scale);
    ctx.stroke();
    ctx.restore();
  }
}
