import { traceSubjectPath } from './subjectPath';

/**
 * Subject Cutout Layer
 * Placeholder art: A grey silhouette for the subject.
 * Present in shots 1, 2, and 3.
 * Gone in shot 4 ("Occupant not found").
 */
export function renderSubject(ctx, width, height, shot) {
  // In Shot 4, the visitor is gone!
  if (shot >= 4) {
    return;
  }

  const centerX = width * 0.5;
  const bottomY = height * 0.98;
  const scale = width / 400; // dynamic scale based on canvas width

  ctx.save();

  // Subtle drop shadow behind subject on backdrop
  ctx.shadowColor = 'rgba(0, 0, 0, 0.45)';
  ctx.shadowBlur = 16 * scale;
  ctx.shadowOffsetX = 4 * scale;
  ctx.shadowOffsetY = 6 * scale;

  // Grey silhouette placeholder for subject
  ctx.fillStyle = '#4A4E58';
  traceSubjectPath(ctx, centerX, bottomY, scale);
  ctx.fill();

  // Subtle interior contour shading on subject for tactile depth
  ctx.shadowColor = 'transparent';
  ctx.fillStyle = '#383C45';
  ctx.beginPath();
  ctx.ellipse(centerX, bottomY - 170 * scale, 38 * scale, 45 * scale, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}
