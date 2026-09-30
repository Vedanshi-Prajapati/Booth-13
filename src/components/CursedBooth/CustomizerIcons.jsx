import React from 'react';

export function CustomizerIcon({ name, size = 20, color = 'currentColor', className = '' }) {
  const s = size;
  const stroke = color;

  switch (name) {
    case 'witch_hat':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M12 2L4 18h16L12 2z" />
          <path d="M2 19c3-1 7-1 10-1s7 0 10 1" />
          <rect x="9.5" y="14" width="5" height="3" rx="0.5" fill={color} fillOpacity="0.3" />
        </svg>
      );

    case 'horns':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M5 21C4 16 3 10 7 4c1 4 3 8 7 9" />
          <path d="M19 21c1-5 2-11-2-17-1 4-3 8-7 9" />
          <path d="M9 19c2 1 4 1 6 0" />
        </svg>
      );

    case 'top_hat':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M6 18V5h12v13" />
          <path d="M2 18h20v2H2z" />
          <line x1="6" y1="14" x2="18" y2="14" strokeWidth="2.5" />
        </svg>
      );

    case 'veil':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M7 6a5 5 0 0 1 10 0" />
          <path d="M6 6c0 6-2 10-3 15h18c-1-5-3-9-3-15" />
          <path d="M9 10c0 4 3 6 3 11" strokeDasharray="2 2" />
          <path d="M15 10c0 4-3 6-3 11" strokeDasharray="2 2" />
        </svg>
      );

    case 'robe':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M12 3a4 4 0 0 0-4 4v14h8V7a4 4 0 0 0-4-4z" />
          <path d="M8 8L3 14v7h5" />
          <path d="M16 8l5 6v7h-5" />
          <circle cx="12" cy="8" r="1.5" fill={color} />
        </svg>
      );

    case 'corset':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M6 4c2 3 3 7 1 17h10c-2-10-1-14 1-17L12 7 6 4z" />
          <line x1="9" y1="9" x2="15" y2="9" strokeDasharray="1.5 1.5" />
          <line x1="8.5" y1="13" x2="15.5" y2="13" strokeDasharray="1.5 1.5" />
          <line x1="8" y1="17" x2="16" y2="17" strokeDasharray="1.5 1.5" />
        </svg>
      );

    case 'sheet':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M12 3c-4.4 0-8 3.6-8 8 0 4 1 7 0 10 2-1 4 0 6-1 2 1 4 0 6 1-1-3 0-6 0-10 0-4.4-3.6-8-8-8z" />
          <circle cx="9.5" cy="10.5" r="1.2" fill={color} />
          <circle cx="14.5" cy="10.5" r="1.2" fill={color} />
        </svg>
      );

    case 'gown':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M8 4l4 4 4-4v4l-4 3-4-3V4z" />
          <path d="M7 11L3 21h18l-4-10-5 3-5-3z" />
          <path d="M12 14v7" />
        </svg>
      );

    case 'candle':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <rect x="9" y="10" width="6" height="11" rx="1" />
          <path d="M12 10V7" />
          <path d="M12 3c1 1.5 1.5 2.5 0 4-1.5-1.5-1-2.5 0-4z" fill={color} fillOpacity="0.4" />
          <path d="M7 21h10" />
        </svg>
      );

    case 'dagger':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M12 2L9 14h6L12 2z" />
          <path d="M7 14h10v2H7z" />
          <path d="M12 16v5" />
          <circle cx="12" cy="21.5" r="1.5" fill={color} />
        </svg>
      );

    case 'pumpkin':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <ellipse cx="12" cy="13" rx="8" ry="7" />
          <path d="M12 3v3" />
          <path d="M8.5 11l1.5 2h-3l1.5-2z" fill={color} />
          <path d="M15.5 11l1.5 2h-3l1.5-2z" fill={color} />
          <path d="M8 16c1.5 1.5 6.5 1.5 8 0-1 1-7 1-8 0z" fill={color} />
        </svg>
      );

    case 'roses':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <circle cx="12" cy="7" r="4" />
          <path d="M10 7a2 2 0 1 1 4 0c0 1-1 2-2 2" />
          <path d="M12 11v10" />
          <path d="M12 14c-2 0-3-1-4-2" />
          <path d="M12 17c2 0 3-1 4-2" />
        </svg>
      );

    case 'curtains':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <rect x="3" y="3" width="18" height="18" rx="1" />
          <path d="M3 3c3 4 5 10 5 18" />
          <path d="M21 3c-3 4-5 10-5 18" />
          <line x1="3" y1="5" x2="21" y2="5" />
        </svg>
      );

    case 'graveyard':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M7 21v-8a5 5 0 0 1 10 0v8H7z" />
          <line x1="12" y1="9" x2="12" y2="15" />
          <line x1="9.5" y1="11" x2="14.5" y2="11" />
          <path d="M3 21h18" />
        </svg>
      );

    case 'manor':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M4 21V9l8-6 8 6v12H4z" />
          <path d="M10 21v-5a2 2 0 0 1 4 0v5" />
          <rect x="8" y="10" width="3" height="3" rx="0.5" />
          <rect x="13" y="10" width="3" height="3" rx="0.5" />
        </svg>
      );

    case 'forest':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M12 2l-6 8h3l-4 7h14l-4-7h3l-6-8z" />
          <path d="M12 17v5" />
        </svg>
      );

    case 'sound_on':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
        </svg>
      );

    case 'sound_off':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <line x1="23" y1="9" x2="17" y2="15" />
          <line x1="17" y1="9" x2="23" y2="15" />
        </svg>
      );

    case 'arrow_back':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
      );

    case 'dice':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8" cy="8" r="1.5" fill={color} />
          <circle cx="16" cy="16" r="1.5" fill={color} />
          <circle cx="12" cy="12" r="1.5" fill={color} />
          <circle cx="16" cy="8" r="1.5" fill={color} />
          <circle cx="8" cy="16" r="1.5" fill={color} />
        </svg>
      );

    case 'grid':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
        </svg>
      );

    default:
      return null;
  }
}

export default CustomizerIcon;
