/**
 * Subject Path Helper
 * Defines the standard portrait silhouette path for the subject (head, neck, shoulders).
 * Used by subjectLayer (fill) and apparitionsLayer (shadow and chalk outline).
 */
export function traceSubjectPath(ctx, centerX, bottomY, scale = 1) {
  ctx.beginPath();
  
  const headRadius = 48 * scale;
  const headCenterY = bottomY - 170 * scale;
  const neckWidth = 24 * scale;
  const neckTopY = headCenterY + headRadius * 0.7;
  const shoulderWidth = 140 * scale;
  const chestBottomY = bottomY;

  // Head (oval)
  ctx.ellipse(centerX, headCenterY, headRadius * 0.85, headRadius, 0, 0, Math.PI * 2);
  ctx.closePath();

  // Neck & Shoulders
  ctx.moveTo(centerX - neckWidth, neckTopY);
  ctx.quadraticCurveTo(
    centerX - shoulderWidth * 0.5,
    neckTopY + 35 * scale,
    centerX - shoulderWidth,
    chestBottomY
  );
  ctx.lineTo(centerX + shoulderWidth, chestBottomY);
  ctx.quadraticCurveTo(
    centerX + shoulderWidth * 0.5,
    neckTopY + 35 * scale,
    centerX + neckWidth,
    neckTopY
  );
  ctx.closePath();
}
