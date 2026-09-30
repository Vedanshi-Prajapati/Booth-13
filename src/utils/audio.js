// Synthesized atmospheric 1970s analog horror sound engine & procedural BGM using Web Audio API
class HorrorSoundEngine {
  constructor() {
    this.ctx = null;
    this.muted = true; // Default muted per browser autoplay policy
    this.currentScreen = 'landing';

    // BGM node references
    this.bgmMasterGain = null;
    this.droneSub1 = null;
    this.droneSub2 = null;
    this.droneMid = null;
    this.droneFilter = null;
    this.lfoOsc = null;
    this.lfoGain = null;
    this.hissSource = null;
    this.hissFilter = null;
    this.hissGain = null;
    this.chimeTimer = null;
    this.pulseTimer = null;
    this.isBgmRunning = false;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.init();
    this.muted = !this.muted;
    if (this.muted) {
      this.stopBgm();
    } else {
      this.startBgm();
      this.playTick();
    }
    return this.muted;
  }

  unmute() {
    if (this.muted) {
      this.toggleMute();
    }
  }

  /* ==========================================================================
     PROCEDURAL 1970s ANALOG HORROR BGM (Background Music)
     - Low Sub-Bass Drones (38Hz - 55Hz) with phase detuning
     - Resonant Filter Sweep simulating darkroom ventilation & transformer hum
     - Vintage Analog Tape Hiss & Vinyl Noise Floor
     - Haunting Random Minor Chimes (D minor / A diminished)
     - Screen-Reactive Tension Modulation
     ========================================================================== */

  startBgm() {
    if (this.muted || !this.ctx || this.isBgmRunning) return;
    this.init();

    try {
      const now = this.ctx.currentTime;
      this.isBgmRunning = true;

      // 1. Master BGM Gain Node
      this.bgmMasterGain = this.ctx.createGain();
      this.bgmMasterGain.gain.setValueAtTime(0.001, now);
      // Smooth fade in over 2.5 seconds
      this.bgmMasterGain.gain.exponentialRampToValueAtTime(0.35, now + 2.5);
      this.bgmMasterGain.connect(this.ctx.destination);

      // 2. Resonant Darkroom Lowpass Filter
      this.droneFilter = this.ctx.createBiquadFilter();
      this.droneFilter.type = 'lowpass';
      this.droneFilter.frequency.setValueAtTime(140, now);
      this.droneFilter.Q.setValueAtTime(3.5, now);
      this.droneFilter.connect(this.bgmMasterGain);

      // 3. LFO (Low-Frequency Oscillator) for breathing drone swell (0.12 Hz)
      this.lfoOsc = this.ctx.createOscillator();
      this.lfoGain = this.ctx.createGain();
      this.lfoOsc.type = 'sine';
      this.lfoOsc.frequency.setValueAtTime(0.12, now);
      this.lfoGain.gain.setValueAtTime(45, now); // Sweeps cutoff between ~95Hz and ~185Hz
      this.lfoOsc.connect(this.lfoGain);
      this.lfoGain.connect(this.droneFilter.frequency);
      this.lfoOsc.start(now);

      // 4. Sub-Bass Drone 1 (Deep 38.89 Hz - Low D#1)
      this.droneSub1 = this.ctx.createOscillator();
      const sub1Gain = this.ctx.createGain();
      this.droneSub1.type = 'sawtooth';
      this.droneSub1.frequency.setValueAtTime(38.89, now);
      sub1Gain.gain.setValueAtTime(0.22, now);
      this.droneSub1.connect(sub1Gain);
      sub1Gain.connect(this.droneFilter);
      this.droneSub1.start(now);

      // 5. Sub-Bass Drone 2 (Detuned 43.65 Hz - Low F1) for eerie binaural beating
      this.droneSub2 = this.ctx.createOscillator();
      const sub2Gain = this.ctx.createGain();
      this.droneSub2.type = 'triangle';
      this.droneSub2.frequency.setValueAtTime(43.65, now);
      sub2Gain.gain.setValueAtTime(0.28, now);
      this.droneSub2.connect(sub2Gain);
      sub2Gain.connect(this.droneFilter);
      this.droneSub2.start(now);

      // 6. Mid-range Spectral Humming (110 Hz - A2)
      this.droneMid = this.ctx.createOscillator();
      const midGain = this.ctx.createGain();
      this.droneMid.type = 'sine';
      this.droneMid.frequency.setValueAtTime(110, now);
      midGain.gain.setValueAtTime(0.15, now);
      this.droneMid.connect(midGain);
      midGain.connect(this.droneFilter);
      this.droneMid.start(now);

      // 7. Analog Tape Hiss & Darkroom Room Tone
      this.startTapeHiss();

      // 8. Start Chime Melody Generator (Eerie Music Box)
      this.scheduleNextChime();

      // 9. Start Distant Heartbeat / Mechanical Winding Pulse
      this.startAmbientPulse();

      // Apply initial screen tension
      this.setScreen(this.currentScreen);
    } catch (err) {
      console.warn('BGM initialization deferred until user gesture', err);
      this.isBgmRunning = false;
    }
  }

  startTapeHiss() {
    if (!this.ctx || !this.bgmMasterGain) return;
    try {
      // 2 seconds looping pink noise buffer
      const bufferSize = this.ctx.sampleRate * 2;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        data[i] = (b0 + b1 + b2 + white * 0.5362) * 0.08;
      }

      this.hissSource = this.ctx.createBufferSource();
      this.hissSource.buffer = buffer;
      this.hissSource.loop = true;

      this.hissFilter = this.ctx.createBiquadFilter();
      this.hissFilter.type = 'bandpass';
      this.hissFilter.frequency.setValueAtTime(1800, this.ctx.currentTime);
      this.hissFilter.Q.setValueAtTime(0.8, this.ctx.currentTime);

      this.hissGain = this.ctx.createGain();
      this.hissGain.gain.setValueAtTime(0.045, this.ctx.currentTime);

      this.hissSource.connect(this.hissFilter);
      this.hissFilter.connect(this.hissGain);
      this.hissGain.connect(this.bgmMasterGain);
      this.hissSource.start();
    } catch {}
  }

  scheduleNextChime() {
    if (this.muted || !this.isBgmRunning || !this.ctx) return;

    // Random delay between 4 to 9 seconds for subtle unpredictable horror
    const delayMs = 4000 + Math.random() * 5000;
    this.chimeTimer = setTimeout(() => {
      this.playEerieChime();
      this.scheduleNextChime();
    }, delayMs);
  }

  playEerieChime() {
    if (this.muted || !this.ctx || !this.bgmMasterGain) return;
    try {
      const now = this.ctx.currentTime;
      // D minor / A diminished atmospheric scale
      const notes = [146.83, 174.61, 220.00, 246.94, 293.66, 349.23, 440.00, 587.33];
      const freq = notes[Math.floor(Math.random() * notes.length)];

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const panner = this.ctx.createStereoPanner ? this.ctx.createStereoPanner() : null;

      osc.type = Math.random() > 0.4 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, now);
      // Slight pitch drift simulating warbled magnetic tape
      osc.frequency.linearRampToValueAtTime(freq * (1 + (Math.random() * 0.02 - 0.01)), now + 3.0);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.05, now + 0.15);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.5);

      if (panner) {
        // Random spatial placement in soundstage
        panner.pan.setValueAtTime(Math.random() * 1.6 - 0.8, now);
        osc.connect(gain);
        gain.connect(panner);
        panner.connect(this.bgmMasterGain);
      } else {
        osc.connect(gain);
        gain.connect(this.bgmMasterGain);
      }

      osc.start(now);
      osc.stop(now + 3.6);
    } catch {}
  }

  startAmbientPulse() {
    if (this.muted || !this.isBgmRunning || !this.ctx) return;

    const pulseInterval = 2800; // ~42 BPM eerie slow pulse
    this.pulseTimer = setInterval(() => {
      if (this.muted || !this.ctx || !this.bgmMasterGain) return;
      try {
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        // Sub low thud
        osc.frequency.setValueAtTime(50, now);
        osc.frequency.exponentialRampToValueAtTime(28, now + 0.22);

        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.24);

        osc.connect(gain);
        gain.connect(this.bgmMasterGain);
        osc.start(now);
        osc.stop(now + 0.25);
      } catch {}
    }, pulseInterval);
  }

  stopBgm() {
    this.isBgmRunning = false;
    if (this.chimeTimer) {
      clearTimeout(this.chimeTimer);
      this.chimeTimer = null;
    }
    if (this.pulseTimer) {
      clearInterval(this.pulseTimer);
      this.pulseTimer = null;
    }

    if (this.bgmMasterGain && this.ctx) {
      try {
        const now = this.ctx.currentTime;
        this.bgmMasterGain.gain.setValueAtTime(this.bgmMasterGain.gain.value, now);
        this.bgmMasterGain.gain.linearRampToValueAtTime(0.001, now + 0.4);
        setTimeout(() => {
          this.cleanupBgmNodes();
        }, 450);
      } catch {
        this.cleanupBgmNodes();
      }
    } else {
      this.cleanupBgmNodes();
    }
  }

  cleanupBgmNodes() {
    [this.droneSub1, this.droneSub2, this.droneMid, this.lfoOsc, this.hissSource].forEach(node => {
      if (node) {
        try {
          node.stop();
          node.disconnect();
        } catch {}
      }
    });
    this.droneSub1 = null;
    this.droneSub2 = null;
    this.droneMid = null;
    this.lfoOsc = null;
    this.hissSource = null;
    this.droneFilter = null;
    this.bgmMasterGain = null;
  }

  /* ==========================================================================
     SCREEN REACTIVE TENSION
     Adjusts the BGM mood and harmonic frequency depending on where the user is
     ========================================================================== */
  setScreen(screenId) {
    this.currentScreen = screenId;
    if (!this.ctx || !this.droneFilter || !this.bgmMasterGain) return;

    try {
      const now = this.ctx.currentTime;
      switch (screenId) {
        case 'landing':
          this.droneFilter.frequency.linearRampToValueAtTime(140, now + 1.2);
          this.bgmMasterGain.gain.linearRampToValueAtTime(0.32, now + 1.0);
          break;

        case 'customize':
          this.droneFilter.frequency.linearRampToValueAtTime(180, now + 1.2);
          this.bgmMasterGain.gain.linearRampToValueAtTime(0.35, now + 1.0);
          break;

        case 'countdown':
          this.droneFilter.frequency.linearRampToValueAtTime(260, now + 0.8);
          this.bgmMasterGain.gain.linearRampToValueAtTime(0.42, now + 0.8);
          break;

        case 'developing':
          this.droneFilter.frequency.linearRampToValueAtTime(200, now + 1.5);
          this.bgmMasterGain.gain.linearRampToValueAtTime(0.38, now + 1.5);
          break;

        case 'photo1':
          this.droneFilter.frequency.linearRampToValueAtTime(160, now + 1.0);
          this.bgmMasterGain.gain.linearRampToValueAtTime(0.34, now + 1.0);
          break;

        case 'photo2':
          // Tension creeps up
          this.droneFilter.frequency.linearRampToValueAtTime(220, now + 1.0);
          this.bgmMasterGain.gain.linearRampToValueAtTime(0.38, now + 1.0);
          break;

        case 'photo3':
          // Threat is real
          this.droneFilter.frequency.linearRampToValueAtTime(320, now + 1.0);
          this.bgmMasterGain.gain.linearRampToValueAtTime(0.46, now + 1.0);
          break;

        case 'photo4':
          // Vacuum / absence — drop cutoff low and heavy
          this.droneFilter.frequency.linearRampToValueAtTime(90, now + 1.5);
          this.bgmMasterGain.gain.linearRampToValueAtTime(0.48, now + 1.5);
          break;

        case 'revelation':
          this.droneFilter.frequency.linearRampToValueAtTime(450, now + 0.5);
          this.bgmMasterGain.gain.linearRampToValueAtTime(0.55, now + 0.5);
          break;

        case 'strip':
        case 'actions':
          // Resolution, dark melancholy
          this.droneFilter.frequency.linearRampToValueAtTime(150, now + 1.5);
          this.bgmMasterGain.gain.linearRampToValueAtTime(0.32, now + 1.5);
          break;

        default:
          this.droneFilter.frequency.linearRampToValueAtTime(140, now + 1.0);
          this.bgmMasterGain.gain.linearRampToValueAtTime(0.32, now + 1.0);
          break;
      }
    } catch {}
  }

  // Alias for backward compatibility
  startAmbient() {
    this.startBgm();
  }

  stopAmbient() {
    this.stopBgm();
  }

  /* ==========================================================================
     INDIVIDUAL SOUND EFFECTS
     ========================================================================== */

  playTick() {
    if (this.muted || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(200, this.ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.06);
    } catch {}
  }

  playFlash() {
    if (this.muted || !this.ctx) return;
    try {
      // Noise burst + mechanical shutter click
      const bufferSize = this.ctx.sampleRate * 0.3;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = (Math.random() * 2 - 1) * Math.exp(-i / (this.ctx.sampleRate * 0.08));
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 1200;

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.4, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.28);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);
      whiteNoise.start();

      // Shutter click pulse
      const osc = this.ctx.createOscillator();
      const oscGain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(120, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(40, this.ctx.currentTime + 0.08);

      oscGain.gain.setValueAtTime(0.5, this.ctx.currentTime);
      oscGain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.08);

      osc.connect(oscGain);
      oscGain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.1);
    } catch {}
  }

  playJumpscare() {
    if (this.muted || !this.ctx) return;
    try {
      // Sudden dissonant screech + heavy sub impact
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const sub = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc1.type = 'sawtooth';
      osc2.type = 'sawtooth';
      sub.type = 'sine';

      const now = this.ctx.currentTime;
      osc1.frequency.setValueAtTime(440, now);
      osc1.frequency.exponentialRampToValueAtTime(880, now + 0.3);

      osc2.frequency.setValueAtTime(466, now); // Minor second dissonance
      osc2.frequency.exponentialRampToValueAtTime(932, now + 0.3);

      sub.frequency.setValueAtTime(90, now);
      sub.frequency.exponentialRampToValueAtTime(30, now + 0.8);

      gain.gain.setValueAtTime(0.45, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 1.2);

      osc1.connect(gain);
      osc2.connect(gain);
      sub.connect(gain);
      gain.connect(this.ctx.destination);

      osc1.start(now);
      osc2.start(now);
      sub.start(now);

      osc1.stop(now + 1.2);
      osc2.stop(now + 1.2);
      sub.stop(now + 1.2);
    } catch {}
  }

  playDeveloping() {
    if (this.muted || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, this.ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(440, this.ctx.currentTime + 1.5);

      gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 1.5);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 1.5);
    } catch {}
  }

  playCoin() {
    if (this.muted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc1 = this.ctx.createOscillator();
      const gain1 = this.ctx.createGain();
      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(1420, now);
      osc1.frequency.exponentialRampToValueAtTime(980, now + 0.08);

      gain1.gain.setValueAtTime(0.35, now);
      gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.08);

      osc1.connect(gain1);
      gain1.connect(this.ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.09);

      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(1680, now + 0.06);
      osc2.frequency.exponentialRampToValueAtTime(1100, now + 0.16);

      gain2.gain.setValueAtTime(0.25, now + 0.06);
      gain2.gain.exponentialRampToValueAtTime(0.01, now + 0.16);

      osc2.connect(gain2);
      gain2.connect(this.ctx.destination);
      osc2.start(now + 0.06);
      osc2.stop(now + 0.17);
    } catch {}
  }

  playCurtain() {
    if (this.muted || !this.ctx) return;
    try {
      const bufferSize = this.ctx.sampleRate * 0.45;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = (Math.random() * 2 - 1) * Math.sin((i / bufferSize) * Math.PI);
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(450, this.ctx.currentTime);
      filter.frequency.linearRampToValueAtTime(220, this.ctx.currentTime + 0.4);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.42);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);
      noise.start();
    } catch {}
  }

  playGlitch() {
    if (this.muted || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      const now = this.ctx.currentTime;
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.setValueAtTime(110, now + 0.04);
      osc.frequency.setValueAtTime(330, now + 0.08);

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.16);
    } catch {}
  }
}

export const soundEngine = new HorrorSoundEngine();
