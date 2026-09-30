import React from 'react';
import { PHOTOS_DATA } from '../../data/boothData';

export function ScreenOverviewGrid({ onSelectScreen, customization }) {
  let photo1Img = PHOTOS_DATA[0].image;
  if (customization.face === 'skull') photo1Img = '/assets/face_skull.jpg';
  else if (customization.face === 'vampire') photo1Img = '/assets/face_vampire.jpg';

  const items = [
    { id: 'landing', num: '01', title: 'THRESHOLD', img: '/assets/booth_exterior.jpg' },
    { id: 'customize', num: '02', title: 'SELECTION', img: photo1Img },
    { id: 'countdown', num: '03', title: 'SHUTTER', img: '/assets/booth_interior.jpg' },
    { id: 'developing', num: '04', title: 'DEVELOPING', img: photo1Img },
    { id: 'photo1', num: '05', title: 'EXPOSURE 01', img: photo1Img },
    { id: 'photo2', num: '06', title: 'EXPOSURE 02', img: '/assets/photo_02.jpg' },
    { id: 'photo3', num: '07', title: 'EXPOSURE 03', img: '/assets/photo_03.jpg' },
    { id: 'photo4', num: '08', title: 'EXPOSURE 04', img: '/assets/photo_04.jpg' },
    { id: 'revelation', num: '09', title: 'ABSENCE', img: '/assets/photo_04.jpg' },
    { id: 'strip', num: '10', title: 'CONTACT SHEET', img: '/assets/photo_03.jpg' },
    { id: 'actions', num: '11', title: 'ARCHIVE', img: '/assets/wood_table.jpg' },
  ];

  return (
    <section className="archive-index-viewport" aria-label="Archive Index">
      <header className="archive-index-header">
        <h2 className="archive-index-title">PHOTOGRAPHIC INDEX</h2>
      </header>

      <div className="archive-index-grid">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            className="archive-index-thumb"
            onClick={() => onSelectScreen(item.id)}
            title={`Go to ${item.title}`}
          >
            <div className="index-thumb-frame">
              <img src={item.img} alt={item.title} className="index-thumb-img" />
            </div>
            <div className="index-thumb-label">
              <span className="index-thumb-num">{item.num}</span>
              <span className="index-thumb-text">{item.title}</span>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

export default ScreenOverviewGrid;
