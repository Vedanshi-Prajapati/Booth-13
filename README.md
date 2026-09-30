# BOOTH 13

An interactive 1970s analog horror photographic story.

Four photographs. One of them won't include you.

## Premise

BOOTH 13 is an abandoned silver-halide photo booth discovered at an empty coastal pier. Visitors take four consecutive exposures, discovering frame-by-frame that something impossible is sharing the space. The horror is conveyed not through monsters or screamer graphics, but through stillness, atmosphere, and human absence.

## Art Direction & Design Principles

- **Photographic Dominance**: The photographs are the experience. The interface does not compete with the images; UI chrome and dashboard borders have been removed.
- **Silver-Halide Palette**: Warm photographic ivory, near-black charcoal, aged brass, darkroom sepia, and restrained blood red used strictly for pivotal actions and reveals.
- **Editorial Typography**: High-contrast serifs paired with clean monospace labels.
- **Authentic Horror Progression**:
  - Exposure 01: A normal seated portrait.
  - Exposure 02: A barely perceptible shadow presence in the background.
  - Exposure 03: Physical contact with gaunt hands gripping the subject's shoulders.
  - Exposure 04: Complete absence. An empty chair with a still-burning candle and personal objects left behind.
- **100% On-Device**: All photo synthesis, compositing, and export processing occurs entirely in-browser. Zero cloud telemetry. Zero external storage.

## Audio Architecture

A fully procedural Web Audio API soundscape requiring no external audio assets:
- **Sub-Bass Drones**: Detuned low-frequency oscillators generating darkroom ventilation and transformer hum.
- **Analog Tape Hiss**: Procedural filtered noise simulating magnetic tape flutter and vinyl surface friction.
- **Eerie Minor Chimes**: Atmospheric notes played at randomized intervals with decaying stereo delay.
- **Shutter Mechanics & Flash**: Synthesized mechanical solenoid clicks, shutter pulses, and retinal whiteout flashes.
- **Screen-Reactive Tension**: Audio cutoff frequencies and harmonic dissonances dynamically escalate as the visitor advances through the exposures.

## Features

- **Cinematic Full-Bleed Entrance**: Editorial opening frame presenting the exterior facade and an integrated 13-cent brass coin slot.
- **Contact Sheet Catalogue**: A 60/40 layout displaying a large live portrait alongside four specimen proofs (Spellcaster, Departed, Aristocrat, Harbinger).
- **Full-Viewport Shutter Chamber**: Countdown sequence with camera framing guides, brief blinding flash, and momentary pitch darkness.
- **Silent Emulsion Developing**: Latent image emergence through chemical reaction.
- **Exposure Viewer**: Large 75vh photographic plates with quiet captions and keyboard navigation.
- **Physical Contact Sheet**: Four developed photographic prints resting asymmetrically on a dark wooden darkroom surface.
- **High-Resolution Canvas Export**: Client-side rendering and instant download of the complete 4-frame photo strip.
- **Keyboard Navigation**:
  - `M`: Toggle darkroom audio
  - `Arrow Right` / `Space`: Advance exposure
  - `Arrow Left`: Previous exposure
  - `Esc`: Step back
  - `D`: Download strip
  - `S`: Share archive
  - `T`: Re-enter booth

## Project Structure

```text
src/
├── components/
│   └── CursedBooth/
│       ├── CharacterComposite.jsx   # Seamless photographic blending
│       ├── CustomizerIcons.jsx      # SVG iconography
│       ├── ScreenActions.jsx        # Archive disposition & download
│       ├── ScreenCountdown.jsx      # Shutter chamber & optical flash
│       ├── ScreenCustomize.jsx      # Specimen catalogue & live portrait
│       ├── ScreenDeveloping.jsx     # Silent latent emulsion emergence
│       ├── ScreenHeaderNav.jsx      # Understated masthead navigation
│       ├── ScreenLanding.jsx        # Full-viewport cinematic entrance
│       ├── ScreenOverviewGrid.jsx   # Archive contact index
│       ├── ScreenPhotoStrip.jsx     # Tabletop physical print proof
│       ├── ScreenPhotoViewer.jsx    # 75vh photographic print viewer
│       └── ScreenRevelation.jsx     # Climax study of absence
├── data/
│   ├── boothData.js                # Photographic sequence metadata
│   └── secretsData.js              # Easter egg registry
├── styles/
│   └── screens.css                 # Photographic horror layout system
├── utils/
│   ├── audio.js                    # Procedural Web Audio BGM engine
│   └── exportStrip.js              # Canvas photo strip renderer
├── App.jsx                         # State coordinator & route controller
├── index.css                       # Design tokens & typography definitions
└── main.jsx                        # Application root entry
```

## Getting Started

### Prerequisites

Node.js (v18 or higher recommended)

### Installation

```bash
git clone https://github.com/Vedanshi-Prajapati/Booth-13.git
cd Booth-13
npm install
```

### Development Server

```bash
npm run dev
```

Visit `http://localhost:5173` in your browser.

### Production Build

```bash
npm run build
```

Production artifacts will be generated in the `dist/` directory.

## License

MIT
