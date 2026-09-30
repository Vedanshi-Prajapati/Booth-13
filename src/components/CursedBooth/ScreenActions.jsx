import React, { useState, useEffect, useCallback } from 'react';
import { downloadPhotoStrip } from '../../utils/exportStrip';

export function ScreenActions({ customization, onTakeAnother }) {
  const [toast, setToast] = useState('');
  const [downloading, setDownloading] = useState(false);

  const showToast = useCallback((msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  }, []);

  const handleDownload = useCallback(async () => {
    try {
      setDownloading(true);
      await downloadPhotoStrip(customization);
      showToast('Photo strip saved to device.');
    } catch {
      showToast('Download interrupted.');
    } finally {
      setDownloading(false);
    }
  }, [customization, showToast]);

  const handleShare = useCallback(async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Booth 13',
          text: 'Four photographs. One of them won\'t include you.',
          url: window.location.href,
        });
        showToast('Shared.');
      } catch {}
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        showToast('URL copied to clipboard.');
      } catch {
        showToast('Copy failed.');
      }
    }
  }, [showToast]);

  // Keyboard shortcuts
  useEffect(() => {
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
    <section className="conclusion-viewport" aria-label="Archive Conclusion">
      {toast && <div className="quiet-toast" role="status">{toast}</div>}

      <div className="conclusion-editorial-layout">
        <header className="conclusion-header">
          <h1 className="conclusion-title">THE PHOTOGRAPHS REMAIN</h1>
          <p className="conclusion-quote">
            “Four photographs. None of them belong to you anymore.”
          </p>
        </header>

        <div className="conclusion-action-links">
          <button
            type="button"
            className="conclusion-link-button primary"
            onClick={handleDownload}
            disabled={downloading}
            id="download-strip-btn"
          >
            {downloading ? 'SAVING STRIP...' : 'DOWNLOAD PHOTO STRIP →'}
          </button>

          <button
            type="button"
            className="conclusion-link-button secondary"
            onClick={handleShare}
            id="share-strip-btn"
          >
            SHARE ARCHIVE
          </button>

          <button
            type="button"
            className="conclusion-link-button secondary"
            onClick={onTakeAnother}
            id="take-another-btn"
          >
            ENTER THE BOOTH AGAIN
          </button>
        </div>
      </div>
    </section>
  );
}

export default ScreenActions;
