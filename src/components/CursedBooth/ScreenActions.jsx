import React, { useState } from 'react';
import { downloadPhotoStrip } from '../../utils/exportStrip';

export function ScreenActions({ customization, onTakeAnother }) {
  const [toast, setToast] = useState('');
  const [downloading, setDownloading] = useState(false);

  const showToast = React.useCallback((msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  }, []);

  const handleDownload = React.useCallback(async () => {
    try {
      setDownloading(true);
      await downloadPhotoStrip(customization);
      showToast('Photo strip saved to your device.');
    } catch {
      showToast('Failed to download. Please try again.');
    } finally {
      setDownloading(false);
    }
  }, [customization, showToast]);

  const handleShare = React.useCallback(async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'The Cursed Photo Booth',
          text: 'Four photos. One memory you won\'t forget... You brought a friend.',
          url: window.location.href,
        });
        showToast('Shared successfully!');
      } catch {
        // User cancelled share
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        showToast('Link copied to clipboard. Share if you dare.');
      } catch {
        showToast('Could not copy link.');
      }
    }
  }, [showToast]);

  // Keyboard shortcuts on actions screen
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'd' || e.key === 'D') {
        handleDownload();
      } else if (e.key === 's' || e.key === 'S') {
        handleShare();
      } else if (e.key === 't' || e.key === 'T' || e.key === 'r' || e.key === 'R') {
        onTakeAnother();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleDownload, handleShare, onTakeAnother]);

  return (
    <section className="actions-screen" aria-label="Final Actions - Keep The Memory">
      {toast && <div className="curse-toast">{toast}</div>}

      <div className="archival-stamp-badge" aria-hidden="true">
        <span className="stamp-circle">STRIP NO. 0013</span>
        <span className="stamp-sub">ARCHIVED</span>
      </div>

      <div className="actions-title-wrap">
        <h2 className="actions-heading">KEEP THE MEMORY</h2>
        <span className="actions-subheading">“Four photos. None of them belong to you anymore.”</span>
      </div>

      <div className="actions-btn-group">
        <button
          type="button"
          className="btn-action-primary"
          onClick={handleDownload}
          disabled={downloading}
          id="download-strip-btn"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          <span>{downloading ? 'GENERATING STRIP...' : 'DOWNLOAD PHOTO STRIP'}</span>
          <span className="btn-key-badge">[D]</span>
        </button>

        <button
          type="button"
          className="btn-action-secondary"
          onClick={handleShare}
          id="share-strip-btn"
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
            <polyline points="16 6 12 2 8 6" />
            <line x1="12" y1="2" x2="12" y2="15" />
          </svg>
          <span>SHARE STRIP</span>
          <span className="btn-key-badge">[S]</span>
        </button>

        <button
          type="button"
          className="btn-action-secondary"
          onClick={onTakeAnother}
          id="take-another-btn"
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="1 4 1 10 7 10" />
            <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
          </svg>
          <span>ENTER BOOTH AGAIN</span>
          <span className="btn-key-badge">[T]</span>
        </button>
      </div>

      <div className="occult-star-symbol" aria-hidden="true">
        ✦ · · · BOOTH 13 · · · ✦
      </div>
    </section>
  );
}
