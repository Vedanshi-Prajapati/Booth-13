import React, { useEffect, useRef } from 'react';
import { useSecrets } from '../../context/useSecrets';
import { renderBackdrop } from './layers/backdropLayer';
import { renderSubject } from './layers/subjectLayer';
import { renderApparitions } from './layers/apparitionsLayer';
import { renderGrain } from './layers/grainLayer';
import { renderVignette } from './layers/vignetteLayer';
import './Compositor.css';

/**
 * Compositor Component
 * Renders a canvas scene composed from modular layers:
 *  1. Backdrop (red-curtain, wallpaper, graveyard-fence, empty-hallway)
 *  2. Apparitions (distinct backdrop-specific haunts)
 *  3. Subject Cutout (grey silhouette, omitted in shot 4)
 *  4. Grain (film grain texture)
 *  5. Vignette (radial shadow & amber sodium leak)
 *
 * Driven by prop `shot` (1 to 4) and `backdropType`.
 */
export function Compositor({
  shot = 1,
  backdropType = 'red-curtain',
  width = 340,
  height = 460,
  className = '',
}) {
  const canvasRef = useRef(null);
  const { unlockSecret } = useSecrets();

  // Check secrets when shot 4 is reached for backdrops
  useEffect(() => {
    if (shot === 4) {
      if (backdropType === 'red-curtain') unlockSecret('shot4_curtain');
      if (backdropType === 'wallpaper') unlockSecret('shot4_wallpaper');
      if (backdropType === 'graveyard-fence') unlockSecret('shot4_graveyard');
      if (backdropType === 'empty-hallway') unlockSecret('shot4_hallway');
    }
  }, [shot, backdropType, unlockSecret]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    try {
      // Handle high DPI screens for crisp rendering
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      if (typeof ctx.resetTransform === 'function') {
        ctx.resetTransform();
      } else {
        ctx.setTransform(1, 0, 0, 1, 0, 0);
      }
      ctx.scale(dpr, dpr);

      // Layer 1: Backdrop
      renderBackdrop(ctx, width, height, backdropType, shot);

      // Layer 2: Apparitions (backdrop-specific hauntings)
      renderApparitions(ctx, width, height, shot, backdropType);

      // Layer 3: Subject Cutout (grey silhouette, shots 1-3 only)
      renderSubject(ctx, width, height, shot);

      // Layer 4: Tactile Film Grain
      renderGrain(ctx, width, height);

      // Layer 5: Vignette & Light Leak
      renderVignette(ctx, width, height);
    } catch (err) {
      console.error('Compositor render error:', err);
    }
  }, [shot, backdropType, width, height]);

  return (
    <div className={`compositor-frame ${className}`}>
      <div className="canvas-wrapper">
        <canvas
          ref={canvasRef}
          className="compositor-canvas"
          style={{ width: `${width}px`, height: `${height}px` }}
          aria-label={`Photo booth shot ${shot} with ${backdropType}`}
        />
      </div>

      {/* Caption specified for shot 4 in SPEC.md */}
      <div className={`shot-caption ${shot === 4 ? 'visible' : 'empty'}`}>
        {shot === 4 ? 'Occupant not found.' : '\u00A0'}
      </div>
    </div>
  );
}

export default Compositor;
