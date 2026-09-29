/**
 * Vignette & Light Leak Layer
 * Aged photo booth vignette with subtle sodium-lamp ambient glow and light leak.
 */
export function renderVignette(ctx, width, height) {
  ctx.save();

  // 1. Radial Vignette (dark midnight edges)
  const centerX = width * 0.5;
  const centerY = height * 0.5;
  const radius = Math.hypot(width, height) * 0.55;

  const vignetteGrad = ctx.createRadialGradient(
    centerX, centerY, radius * 0.45,
    centerX, centerY, radius
  );
  vignetteGrad.addColorStop(0, 'rgba(14, 18, 36, 0)');
  vignetteGrad.addColorStop(0.7, 'rgba(14, 18, 36, 0.45)');
  vignetteGrad.addColorStop(1, 'rgba(8, 10, 20, 0.88)');

  ctx.fillStyle = vignetteGrad;
  ctx.fillRect(0, 0, width, height);

  // 2. Subtle sodium-lamp amber light leak on upper right edge
  const leakGrad = ctx.createRadialGradient(
    width * 0.95, height * 0.05, 0,
    width * 0.95, height * 0.05, width * 0.6
  );
  leakGrad.addColorStop(0, 'rgba(255, 179, 71, 0.14)');
  leakGrad.addColorStop(0.5, 'rgba(255, 179, 71, 0.04)');
  leakGrad.addColorStop(1, 'rgba(255, 179, 71, 0)');

  ctx.globalCompositeOperation = 'screen';
  ctx.fillStyle = leakGrad;
  ctx.fillRect(0, 0, width, height);

  ctx.restore();
}
