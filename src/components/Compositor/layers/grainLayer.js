/**
 * Grain Layer
 * Generates tactile film grain noise for the aged photo booth aesthetic.
 */
let cachedNoiseCanvas = null;

function getNoisePattern(ctx) {
  if (cachedNoiseCanvas) return ctx.createPattern(cachedNoiseCanvas, 'repeat');

  const patternCanvas = document.createElement('canvas');
  patternCanvas.width = 128;
  patternCanvas.height = 128;
  const pCtx = patternCanvas.getContext('2d');
  const imgData = pCtx.createImageData(128, 128);
  const data = imgData.data;

  for (let i = 0; i < data.length; i += 4) {
    const val = Math.random() * 255;
    // Monochrome silver-halide noise
    data[i] = val;
    data[i + 1] = val;
    data[i + 2] = val;
    // Low opacity for tactile texture
    data[i + 3] = Math.random() < 0.5 ? Math.random() * 32 : Math.random() * 18;
  }

  pCtx.putImageData(imgData, 0, 0);
  cachedNoiseCanvas = patternCanvas;
  return ctx.createPattern(cachedNoiseCanvas, 'repeat');
}

export function renderGrain(ctx, width, height) {
  try {
    ctx.save();
    ctx.globalCompositeOperation = 'overlay';
    ctx.globalAlpha = 0.65;
    const pattern = getNoisePattern(ctx);
    if (pattern) {
      ctx.fillStyle = pattern;
      ctx.fillRect(0, 0, width, height);
    }
    ctx.restore();
  } catch {
    // Grain pattern fallback for restricted canvas contexts
  }
}
