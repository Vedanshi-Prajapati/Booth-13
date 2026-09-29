import React, { useState } from 'react';
import { downloadPhotoStrip } from '../../utils/exportStrip';

export function ScreenActions({ customization, onTakeAnother }) {
  const [toast, setToast] = useState('');
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    try {
      setDownloading(true);
      await downloadPhotoStrip(customization);
      showToast('Photo strip saved to your device.');
    } catch {
      showToast('Failed to download. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  const handleShare = async () => {
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
  };

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  return (
    <section className="actions-screen" aria-label="Final Actions - Keep The Memory">
      {toast && <div className="curse-toast">{toast}</div>}

      <div className="actions-title-wrap">
        <h2 className="actions-heading">Keep the memory</h2>
        <span className="actions-subheading">(if you dare)</span>
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
          {downloading ? 'GENERATING STRIP...' : 'DOWNLOAD PHOTO STRIP'}
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
          SHARE
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
          TAKE ANOTHER
        </button>
      </div>

      <div className="occult-star-symbol" aria-hidden="true">
        ✦
      </div>
    </section>
  );
}
