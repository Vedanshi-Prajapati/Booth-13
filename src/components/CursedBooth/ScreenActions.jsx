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
      showToast('Photo strip archived to device.');
    } catch {
      showToast('Download interrupted. Please retry.');
    } finally {
      setDownloading(false);
    }
  }, [customization, showToast]);

  const handleShare = React.useCallback(async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Booth 13 — Archival Evidence',
          text: 'Four photographs. One of them won\'t include you.',
          url: window.location.href,
        });
        showToast('Evidence shared successfully.');
      } catch {
        // User cancelled
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        showToast('Archival URL copied to clipboard.');
      } catch {
        showToast('Clipboard copy failed.');
      }
    }
  }, [showToast]);

  // Keyboard shortcuts
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
    <section className="actions-editorial-viewport" aria-label="Archival Evidence Log">
      {toast && <div className="archival-toast-pill" role="status">{toast}</div>}

      <div className="actions-editorial-card">
        <header className="actions-card-header">
          <div className="actions-badge">CASE FILE // BOOTH-13</div>
          <h2 className="actions-headline">RECORD PERMANENTLY LOGGED</h2>
          <p className="actions-subtext">
            “Four photographs. None of them belong to you anymore.”
          </p>
        </header>

        <div className="actions-button-stack">
          <button
            type="button"
            className="btn-archival-action primary"
            onClick={handleDownload}
            disabled={downloading}
            id="download-strip-btn"
          >
            <span className="btn-main-text">
              {downloading ? 'GENERATING HIGH-RES STRIP...' : 'DOWNLOAD PHOTO STRIP'}
            </span>
            <span className="btn-key-badge">[D]</span>
          </button>

          <button
            type="button"
            className="btn-archival-action secondary"
            onClick={handleShare}
            id="share-strip-btn"
          >
            <span className="btn-main-text">SHARE EVIDENCE RECORD</span>
            <span className="btn-key-badge">[S]</span>
          </button>

          <button
            type="button"
            className="btn-archival-action tertiary"
            onClick={onTakeAnother}
            id="take-another-btn"
          >
            <span className="btn-main-text">RE-ENTER BOOTH 13</span>
            <span className="btn-key-badge">[T]</span>
          </button>
        </div>

        <footer className="actions-card-footer">
          <span className="footer-specimen-id">ARCHIVE REF: 0013 · SILVER-HALIDE</span>
          <span className="footer-warning">NO OCCUPANT MAY ENTER TWICE UNHARMED</span>
        </footer>
      </div>
    </section>
  );
}

export default ScreenActions;
