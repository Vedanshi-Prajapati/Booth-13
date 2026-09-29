import React from 'react';
import './NoteCard.css';

/**
 * NoteCard Component
 * Displays a torn piece of aged paper with typewriter text and brass pin/tape.
 */
export function NoteCard({ note, onClose }) {
  if (!note) return null;

  return (
    <div className="notecard-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className="notecard-paper"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="notecard-pin" />
        
        {note.tag && <div className="notecard-tag">{note.tag}</div>}
        
        {note.image && (
          <div className="notecard-photo-frame">
            <div className="notecard-smeared-photo" />
          </div>
        )}

        <div className="notecard-body">
          <p className="notecard-quote">“{note.text}”</p>
          {note.subtext && <p className="notecard-subtext">{note.subtext}</p>}
        </div>

        <div className="notecard-footer">
          <span className="notecard-evidence">EXHIBIT #13</span>
          <button type="button" className="notecard-close-btn" onClick={onClose}>
            [Fold away]
          </button>
        </div>
      </div>
    </div>
  );
}

export default NoteCard;
