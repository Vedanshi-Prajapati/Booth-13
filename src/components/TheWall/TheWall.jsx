import React, { useEffect } from 'react';
import { useSecrets } from '../../context/useSecrets';
import './TheWall.css';

const PAST_STRIPS = [
  {
    id: 'strip-0003',
    number: 'STRIP NO. 0003',
    date: '1968-04-13',
    rotate: -1.8,
    isAnomaly: false,
    frames: [
      { id: 1, desc: 'Visitor sitting quietly', tint: '#484d59' },
      { id: 2, desc: 'Shadow in corner', tint: '#3e424c' },
      { id: 3, desc: 'Faint double exposure', tint: '#343842' },
      { id: 4, desc: 'Empty booth chair', tint: '#22252c', empty: true },
    ],
  },
  {
    id: 'strip-0007',
    number: 'STRIP NO. 0007',
    date: '1974-03-13',
    rotate: 2.2,
    isAnomaly: true,
    note: 'An extra figure appears in frame 2 and the caption is backwards.',
    frames: [
      { id: 1, desc: 'Visitor smiling faintly', tint: '#4a505e' },
      { id: 2, desc: 'EXTRA FIGURE LOOMING BEHIND', tint: '#282b36', anomalyFrame: true },
      { id: 3, desc: 'Two silhouettes entwined', tint: '#20232c' },
      { id: 4, desc: 'Chalk outline and two shadows', tint: '#161820', empty: true, doubleShadow: true },
    ],
  },
  {
    id: 'strip-0009',
    number: 'STRIP NO. 0009',
    date: '1989-11-13',
    rotate: -0.8,
    isAnomaly: false,
    frames: [
      { id: 1, desc: 'Young person in coat', tint: '#464c58' },
      { id: 2, desc: 'Eyes in curtain', tint: '#3c404b' },
      { id: 3, desc: 'Dark shape beside shoulder', tint: '#30343f' },
      { id: 4, desc: 'Empty curtain', tint: '#1e212b', empty: true },
    ],
  },
  {
    id: 'strip-0012',
    number: 'STRIP NO. 0012',
    date: '2005-08-13',
    rotate: 1.5,
    isAnomaly: false,
    frames: [
      { id: 1, desc: 'Visitor looking sideways', tint: '#4c5260' },
      { id: 2, desc: 'Faint apparition', tint: '#3a3e49' },
      { id: 3, desc: 'Silhouette leans in', tint: '#2c303a' },
      { id: 4, desc: 'Empty seat', tint: '#1a1d26', empty: true },
    ],
  },
];

export function TheWall({ onReturnToBooth }) {
  const { unlockSecret, setActiveNoteCard } = useSecrets();

  // Visiting the wall triggers secret 9
  useEffect(() => {
    unlockSecret('wall_visited');
  }, [unlockSecret]);

  const handleAnomalyClick = () => {
    unlockSecret('wall_anomaly');
    setActiveNoteCard({
      tag: 'Pinned Evidence · Strip 0007',
      text: 'Look at frame two. It was taken in 1974.',
      subtext: 'The visitor swore they entered the booth alone. The second figure is smiling.',
      image: true,
    });
  };

  return (
    <div className="the-wall-scene" role="region" aria-label="The Wall of Past Photo Strips">
      {/* Wall Header */}
      <div className="wall-header">
        <div className="wall-title-group">
          <span className="wall-tag">ARCHIVE OF PREVIOUS OCCUPANTS</span>
          <h2 className="wall-title">THE WALL</h2>
          <p className="wall-subtitle">
            Every strip left behind by those who stepped through the curtain. Notice how the paper ages.
          </p>
        </div>

        <button
          type="button"
          id="take-another-btn"
          className="take-another-btn"
          onClick={onReturnToBooth}
        >
          ← Take Another Photo
        </button>
      </div>

      {/* Brick Wall Display Area */}
      <div className="brick-surface">
        <div className="wall-spotlight" />

        {/* Strips pinned across the wall */}
        <div className="pinned-strips-container">
          {PAST_STRIPS.map((strip) => {
            return (
              <div
                key={strip.id}
                id={`wall-${strip.id}`}
                className={`pinned-strip ${strip.isAnomaly ? 'anomaly-strip' : ''}`}
                style={{ transform: `rotate(${strip.rotate}deg)` }}
                onClick={strip.isAnomaly ? handleAnomalyClick : undefined}
                role={strip.isAnomaly ? 'button' : 'article'}
                tabIndex={strip.isAnomaly ? 0 : undefined}
                title={strip.isAnomaly ? 'Click to inspect this anomalous strip closely' : strip.number}
              >
                {/* Brass Pushpin */}
                <div className="pushpin" />

                {/* 4 Mini frames on the strip */}
                <div className="strip-frames-column">
                  {strip.frames.map((frame) => (
                    <div
                      key={frame.id}
                      className={`mini-frame ${frame.empty ? 'frame-empty' : ''} ${frame.anomalyFrame ? 'frame-anomaly' : ''}`}
                      style={{ backgroundColor: frame.tint }}
                    >
                      {/* Mini visual silhouette art */}
                      {!frame.empty ? (
                        <div className="mini-silhouette">
                          <span className="mini-head" />
                          <span className="mini-shoulders" />
                          {frame.anomalyFrame && (
                            <span className="mini-extra-figure" title="Wrongness: an extra figure" />
                          )}
                        </div>
                      ) : (
                        <div className="mini-chalk-trace">
                          <span className="mini-chalk-outline" />
                          {frame.doubleShadow && <span className="mini-double-shadow" />}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Strip Footer / Date */}
                <div className="strip-meta-footer">
                  <span className="meta-serial">{strip.number}</span>
                  <span className="meta-date">{strip.date}</span>
                </div>

                {strip.isAnomaly && (
                  <div className="anomaly-marker">
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                        <line x1="12" y1="9" x2="12" y2="13"/>
                        <line x1="12" y1="17" x2="12.01" y2="17"/>
                      </svg>
                      INSPECT
                    </span>
                  </div>
                )}
              </div>
            );
          })}

          {/* Empty Wall Space with Faint Outlines of Strips Not Yet Made */}
          <div className="empty-strip-slot slot-1">
            <div className="faint-pin-hole" />
            <div className="faint-outline">
              <span className="faint-text">STRIP NO. 0013</span>
              <span className="faint-subtext">[NOT YET MADE]</span>
            </div>
          </div>

          <div className="empty-strip-slot slot-2">
            <div className="faint-pin-hole" />
            <div className="faint-outline">
              <span className="faint-text">STRIP NO. 0014</span>
              <span className="faint-subtext">[RESERVED]</span>
            </div>
          </div>
        </div>
      </div>

      {/* Wall Bottom Bar */}
      <div className="wall-bottom-bar">
        <span className="wall-lore-quote">
          “They say none of them ever came back for their copies.”
        </span>
        <button
          type="button"
          className="take-another-btn secondary"
          onClick={onReturnToBooth}
        >
          Return to Booth 13
        </button>
      </div>
    </div>
  );
}

export default TheWall;
