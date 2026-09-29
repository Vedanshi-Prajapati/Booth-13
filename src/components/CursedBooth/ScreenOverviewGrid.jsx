import React from 'react';
import { PHOTOS_DATA } from '../../data/boothData';

export function ScreenOverviewGrid({ onSelectScreen, customization }) {
  // Respect custom face for photo 1
  let photo1Img = PHOTOS_DATA[0].image;
  if (customization.face === 'skull') photo1Img = '/assets/face_skull.jpg';
  else if (customization.face === 'vampire') photo1Img = '/assets/face_vampire.jpg';

  return (
    <section className="overview-grid-screen" aria-label="All 12 Screens Matrix Overview">
      <div className="overview-title-bar">
        <h2 className="overview-heading">THE CURSED PHOTO BOOTH — ALL SCREENS</h2>
        <span style={{ fontFamily: 'var(--font-caption)', fontSize: '11px', color: '#9da3b4' }}>
          Click any screen to interact
        </span>
      </div>

      <div className="screens-matrix-grid">
        {/* Card 1: Landing */}
        <div
          className="screen-card-preview"
          onClick={() => onSelectScreen('landing')}
          title="Screen 01: Landing"
        >
          <div className="card-preview-header">01 · LANDING</div>
          <div className="card-preview-content" style={{ padding: '12px', background: '#090b10' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', transform: 'scale(0.85)', transformOrigin: 'center' }}>
              <span style={{ fontFamily: 'var(--font-title)', fontSize: '10px', color: '#eae4d9' }}>THE CURSED</span>
              <span style={{ fontFamily: 'var(--font-title)', fontSize: '14px', fontWeight: '900', color: '#cf222e' }}>PHOTO BOOTH</span>
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: '9px', color: '#999', margin: '4px 0' }}>Four photos. One memory...</span>
              <div style={{ background: 'rgba(107,26,31,0.5)', border: '1px solid #8e2329', padding: '3px 8px', borderRadius: '4px', fontSize: '8px', color: '#fff', marginTop: '6px' }}>
                ENTER THE BOOTH
              </div>
            </div>
            <img
              src="/assets/booth_exterior.jpg"
              alt="Booth"
              style={{ width: '45%', borderRadius: '3px', marginLeft: 'auto' }}
            />
          </div>
        </div>

        {/* Card 2: Customize */}
        <div
          className="screen-card-preview"
          onClick={() => onSelectScreen('customize')}
          title="Screen 02: Customize"
        >
          <div className="card-preview-header">02 · CUSTOMIZE</div>
          <div className="card-preview-content" style={{ padding: '10px', background: '#0c0e14', flexDirection: 'column', gap: '6px' }}>
            <span style={{ fontFamily: 'var(--font-title)', fontSize: '9px', letterSpacing: '1px', color: '#ded6c8' }}>
              CUSTOMIZE CHARACTER
            </span>
            <div style={{ display: 'flex', gap: '8px', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
              <img
                src={photo1Img}
                alt="Customizer"
                style={{ width: '40%', aspectRatio: '3/4', objectFit: 'cover', borderRadius: '3px', border: '1px solid #443' }}
              />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', width: '50%' }}>
                {['FACE', 'HEAD', 'OUTFIT', 'PROP'].map((cat, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                    <span style={{ fontSize: '7px', fontFamily: 'var(--font-title)', color: '#888', width: '28px' }}>{cat}</span>
                    <div style={{ width: '14px', height: '14px', background: '#1c202a', borderRadius: '2px', border: '1px solid #444' }} />
                    <div style={{ width: '14px', height: '14px', background: '#2a1a1f', borderRadius: '2px', border: '1px solid #8e2329' }} />
                    <div style={{ width: '14px', height: '14px', background: '#1c202a', borderRadius: '2px', border: '1px solid #444' }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: In-Booth Countdown */}
        <div
          className="screen-card-preview"
          onClick={() => onSelectScreen('countdown')}
          title="Screen 03: Flash"
        >
          <div className="card-preview-header">03 · FLASH</div>
          <div className="card-preview-content">
            <img
              src="/assets/booth_interior.jpg"
              alt="Interior"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: '11px', fontFamily: 'var(--font-title)', color: '#fff', opacity: 0.6 }}>3</span>
              <span style={{ fontSize: '11px', fontFamily: 'var(--font-title)', color: '#fff', opacity: 0.8 }}>2</span>
              <span style={{ fontSize: '11px', fontFamily: 'var(--font-title)', color: '#fff' }}>1</span>
              <span style={{ fontSize: '18px', fontFamily: 'var(--font-title)', fontWeight: 'bold', color: '#cf222e', textShadow: '0 0 10px #cf222e' }}>FLASH</span>
            </div>
          </div>
        </div>

        {/* Card 4: Developing */}
        <div
          className="screen-card-preview"
          onClick={() => onSelectScreen('developing')}
          title="Screen 04: Developing"
        >
          <div className="card-preview-header">04 · DEVELOPING</div>
          <div className="card-preview-content" style={{ flexDirection: 'column', gap: '8px', padding: '12px' }}>
            <div style={{ width: '60%', aspectRatio: '3/4', background: '#181512', border: '1px solid #443', padding: '4px' }}>
              <img
                src={photo1Img}
                alt="Developing"
                style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4, filter: 'sepia(0.8)' }}
              />
            </div>
            <span style={{ fontFamily: 'var(--font-title)', fontSize: '8px', letterSpacing: '1px', color: '#999' }}>
              PHOTO DEVELOPING...
            </span>
            <div style={{ width: '60%', height: '2px', background: '#333' }}>
              <div style={{ width: '65%', height: '100%', background: '#e5b061' }} />
            </div>
          </div>
        </div>

        {/* Card 5: Photo 01 */}
        <div
          className="screen-card-preview"
          onClick={() => onSelectScreen('photo1')}
          title="Screen 05: Photo 01"
        >
          <div className="card-preview-header">PHOTO 01</div>
          <div className="card-preview-content" style={{ padding: '8px' }}>
            <div className="polaroid-frame" style={{ width: '75%', height: 'auto', padding: '6px 6px 10px' }}>
              <div className="polaroid-image-box" style={{ height: '78%' }}>
                <img src={photo1Img} alt="Photo 01" className="polaroid-img" />
              </div>
              <div className="photo-caption-bar" style={{ height: '22%' }}>
                <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '11px', color: '#c4baa7' }}>
                  Smile.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 6: Photo 02 */}
        <div
          className="screen-card-preview"
          onClick={() => onSelectScreen('photo2')}
          title="Screen 06: Photo 02"
        >
          <div className="card-preview-header">PHOTO 02</div>
          <div className="card-preview-content" style={{ padding: '8px' }}>
            <div className="polaroid-frame" style={{ width: '75%', height: 'auto', padding: '6px 6px 10px' }}>
              <div className="polaroid-image-box" style={{ height: '78%' }}>
                <img src="/assets/photo_02.jpg" alt="Photo 02" className="polaroid-img" />
              </div>
              <div className="photo-caption-bar" style={{ height: '22%' }}>
                <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '11px', color: '#c4baa7' }}>
                  Did you see that?
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 7: Photo 03 */}
        <div
          className="screen-card-preview"
          onClick={() => onSelectScreen('photo3')}
          title="Screen 07: Photo 03"
        >
          <div className="card-preview-header">PHOTO 03</div>
          <div className="card-preview-content" style={{ padding: '8px' }}>
            <div className="polaroid-frame" style={{ width: '75%', height: 'auto', padding: '6px 6px 10px' }}>
              <div className="polaroid-image-box" style={{ height: '78%' }}>
                <img src="/assets/photo_03.jpg" alt="Photo 03" className="polaroid-img" />
              </div>
              <div className="photo-caption-bar" style={{ height: '22%' }}>
                <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '11px', color: '#c4baa7' }}>
                  One more.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 8: Photo 04 */}
        <div
          className="screen-card-preview"
          onClick={() => onSelectScreen('photo4')}
          title="Screen 08: Photo 04"
        >
          <div className="card-preview-header">PHOTO 04</div>
          <div className="card-preview-content" style={{ padding: '8px' }}>
            <div className="polaroid-frame" style={{ width: '75%', height: 'auto', padding: '6px 6px 10px' }}>
              <div className="polaroid-image-box" style={{ height: '78%' }}>
                <img src="/assets/photo_04.jpg" alt="Photo 04" className="polaroid-img" />
              </div>
              <div className="photo-caption-bar" style={{ height: '22%' }}>
                <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '10px', color: '#c4baa7' }}>
                  Thank you for the company.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 9: Horror Revelation */}
        <div
          className="screen-card-preview"
          onClick={() => onSelectScreen('revelation')}
          title="Screen 09: Revelation"
        >
          <div className="card-preview-header">09 · REVELATION</div>
          <div className="card-preview-content">
            <img src="/assets/jumpscare.jpg" alt="Revelation" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.65)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '8px' }}>
              <span style={{ fontFamily: 'var(--font-title)', fontSize: '10px', color: '#eae4d9' }}>YOU LEFT SOMETHING BEHIND.</span>
              <span style={{ fontFamily: 'var(--font-title)', fontSize: '16px', fontWeight: '900', color: '#cf222e', marginTop: '4px' }}>YOURSELF.</span>
            </div>
          </div>
        </div>

        {/* Card 10: Photo Strip */}
        <div
          className="screen-card-preview"
          onClick={() => onSelectScreen('strip')}
          title="Screen 10: Photo Strip"
        >
          <div className="card-preview-header">10 · PHOTO STRIP</div>
          <div className="card-preview-content" style={{ background: 'url(/assets/wood_table.jpg) center/cover' }}>
            <div style={{ width: '42%', background: '#1c1916', padding: '4px 3px', border: '1px solid #443', transform: 'rotate(-2deg)', display: 'flex', flexDirection: 'column', gap: '3px' }}>
              <img src={photo1Img} alt="Frame" style={{ width: '100%', aspectRatio: '1.2', objectFit: 'cover' }} />
              <img src="/assets/photo_02.jpg" alt="Frame" style={{ width: '100%', aspectRatio: '1.2', objectFit: 'cover' }} />
              <img src="/assets/photo_03.jpg" alt="Frame" style={{ width: '100%', aspectRatio: '1.2', objectFit: 'cover' }} />
              <img src="/assets/photo_04.jpg" alt="Frame" style={{ width: '100%', aspectRatio: '1.2', objectFit: 'cover' }} />
              <span style={{ fontSize: '6px', textAlign: 'center', color: '#aaa', fontFamily: 'var(--font-title)' }}>THE CURSED</span>
            </div>
          </div>
        </div>

        {/* Card 11: Keep the memory */}
        <div
          className="screen-card-preview"
          onClick={() => onSelectScreen('actions')}
          title="Screen 11: Actions"
        >
          <div className="card-preview-header">11 · ACTIONS</div>
          <div className="card-preview-content" style={{ flexDirection: 'column', gap: '6px', padding: '16px', textAlign: 'center' }}>
            <span style={{ fontFamily: 'var(--font-serif)', fontSize: '13px', color: '#ded6c8' }}>Keep the memory</span>
            <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '9px', color: '#888' }}>(if you dare)</span>
            <div style={{ width: '80%', background: '#8e2329', padding: '6px', borderRadius: '4px', fontSize: '7px', fontFamily: 'var(--font-title)', color: '#fff', marginTop: '6px' }}>
              DOWNLOAD PHOTO STRIP
            </div>
            <div style={{ width: '80%', border: '1px solid #444', padding: '5px', borderRadius: '4px', fontSize: '7px', fontFamily: 'var(--font-title)', color: '#ccc' }}>
              SHARE
            </div>
            <div style={{ width: '80%', border: '1px solid #444', padding: '5px', borderRadius: '4px', fontSize: '7px', fontFamily: 'var(--font-title)', color: '#ccc' }}>
              TAKE ANOTHER
            </div>
            <span style={{ fontSize: '10px', color: '#666', marginTop: '4px' }}>✦</span>
          </div>
        </div>

        {/* Card 12: Mobile Device Mockup */}
        <div
          className="screen-card-preview"
          onClick={() => onSelectScreen('landing')}
          title="Screen 12: Mobile View"
        >
          <div className="card-preview-header">MOBILE VIEW</div>
          <div className="card-preview-content">
            <div className="mobile-device-frame">
              <div className="mobile-notch" />
              <div style={{ padding: '10px 8px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', height: '100%', justifyContent: 'space-around' }}>
                <span style={{ fontFamily: 'var(--font-title)', fontSize: '8px', color: '#eae4d9' }}>THE CURSED</span>
                <span style={{ fontFamily: 'var(--font-title)', fontSize: '11px', fontWeight: '900', color: '#cf222e' }}>PHOTO BOOTH</span>
                <img src="/assets/booth_exterior.jpg" alt="Mobile Booth" style={{ width: '70%', borderRadius: '2px' }} />
                <div style={{ background: '#8e2329', padding: '3px 8px', borderRadius: '4px', fontSize: '7px', color: '#fff', width: '75%' }}>
                  ENTER THE BOOTH
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
