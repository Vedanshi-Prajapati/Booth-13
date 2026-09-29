import React, { useEffect, useRef } from 'react';
import { useSecrets } from '../../context/useSecrets';
import { renderGrain } from '../Compositor/layers/grainLayer';
import { renderVignette } from '../Compositor/layers/vignetteLayer';
import './SecretFifthFrame.css';

export function SecretFifthFrame({ width = 340, height = 460 }) {
  const { unlockedCount, unlockSecret } = useSecrets();
  const canvasRef = useRef(null);
  const isUnlocked = unlockedCount >= 5;

  useEffect(() => {
    if (isUnlocked) {
      unlockSecret('secret_fifth_photo');
    }
  }, [isUnlocked, unlockSecret]);

  useEffect(() => {
    if (!isUnlocked) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    try {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      if (typeof ctx.resetTransform === 'function') {
        ctx.resetTransform();
      } else {
        ctx.setTransform(1, 0, 0, 1, 0, 0);
      }
      ctx.scale(dpr, dpr);

    const scale = width / 400;
    const centerX = width * 0.5;
    const bottomY = height * 0.98;

    // 1. Dark Void Booth Background
    ctx.fillStyle = '#05070d';
    ctx.fillRect(0, 0, width, height);

    // Faint reddish background sodium glow
    const backGlow = ctx.createRadialGradient(
      centerX, height * 0.45, 10,
      centerX, height * 0.45, width * 0.7
    );
    backGlow.addColorStop(0, 'rgba(107, 26, 31, 0.35)');
    backGlow.addColorStop(0.6, 'rgba(14, 18, 36, 0.4)');
    backGlow.addColorStop(1, 'rgba(5, 7, 13, 0.9)');
    ctx.fillStyle = backGlow;
    ctx.fillRect(0, 0, width, height);

    // 2. Second Silhouette — NOW FACING THE CAMERA DIRECTLY
    ctx.save();
    ctx.fillStyle = '#070912';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.95)';
    ctx.shadowBlur = 28 * scale;

    // Symmetrical, direct-facing broad shoulders & torso
    const headRadius = 48 * scale;
    const headY = bottomY - 180 * scale;
    const shoulderWidth = 145 * scale;

    // Head directly facing viewer
    ctx.beginPath();
    ctx.ellipse(centerX, headY, headRadius * 0.88, headRadius * 1.05, 0, 0, Math.PI * 2);
    ctx.fill();

    // Body & Cloak facing forward
    ctx.beginPath();
    ctx.moveTo(centerX - 24 * scale, headY + headRadius * 0.75);
    ctx.quadraticCurveTo(centerX - shoulderWidth * 0.6, headY + headRadius + 30 * scale, centerX - shoulderWidth, bottomY);
    ctx.lineTo(centerX + shoulderWidth, bottomY);
    ctx.quadraticCurveTo(centerX + shoulderWidth * 0.6, headY + headRadius + 30 * scale, centerX + 24 * scale, headY + headRadius * 0.75);
    ctx.closePath();
    ctx.fill();

    // 3. Piercing Eyes staring directly out of screen
    // Left eye
    ctx.fillStyle = '#FFB347';
    ctx.shadowColor = '#FFB347';
    ctx.shadowBlur = 12 * scale;
    ctx.beginPath();
    ctx.ellipse(centerX - 16 * scale, headY - 2 * scale, 5 * scale, 3 * scale, 0, 0, Math.PI * 2);
    ctx.fill();

    // Right eye
    ctx.beginPath();
    ctx.ellipse(centerX + 16 * scale, headY - 2 * scale, 5 * scale, 3 * scale, 0, 0, Math.PI * 2);
    ctx.fill();

    // Glowing pupil centers (ghost-green #8FD18A)
    ctx.fillStyle = '#8FD18A';
    ctx.shadowColor = '#8FD18A';
    ctx.shadowBlur = 6 * scale;
    ctx.beginPath();
    ctx.arc(centerX - 16 * scale, headY - 2 * scale, 2 * scale, 0, Math.PI * 2);
    ctx.arc(centerX + 16 * scale, headY - 2 * scale, 2 * scale, 0, Math.PI * 2);
    ctx.fill();

    // Faint grim mouth line
    ctx.strokeStyle = 'rgba(255, 179, 71, 0.4)';
    ctx.lineWidth = 1.5 * scale;
    ctx.beginPath();
    ctx.moveTo(centerX - 12 * scale, headY + 22 * scale);
    ctx.lineTo(centerX + 12 * scale, headY + 22 * scale);
    ctx.stroke();

    ctx.restore();

      // 4. Tactile Grain & Vignette
      renderGrain(ctx, width, height);
      renderVignette(ctx, width, height);
    } catch (err) {
      console.error('SecretFifthFrame render error:', err);
    }
  }, [isUnlocked, width, height]);

  return (
    <div className={`fifth-frame-container ${isUnlocked ? 'unlocked' : 'locked'}`}>
      <div className="fifth-frame-border">
        {isUnlocked ? (
          <div className="canvas-wrapper">
            <canvas
              ref={canvasRef}
              className="fifth-frame-canvas"
              style={{ width: `${width}px`, height: `${height}px` }}
              aria-label="Secret Fifth Photo: The Second Silhouette Facing Camera"
            />
          </div>
        ) : (
          <div className="locked-slot" style={{ width: `${width}px`, height: `${height}px` }}>
            <div className="lock-icon" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            </div>
            <div className="lock-obscured">???</div>
            <p className="lock-label">LOCKED FIFTH FRAME</p>
            <div className="lock-progress">
              <span className="progress-text">Secrets: {unlockedCount}/5 Found</span>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${Math.min(100, (unlockedCount / 5) * 100)}%` }}
                />
              </div>
            </div>
            <span className="lock-hint">Discover secrets in the street and booth to reveal.</span>
          </div>
        )}
      </div>

      <div className="fifth-frame-caption">
        {isUnlocked ? (
          <span className="caption-revealed">“It was never behind you.”</span>
        ) : (
          <span className="caption-locked">FRAME V · [SEALED]</span>
        )}
      </div>
    </div>
  );
}

export default SecretFifthFrame;
