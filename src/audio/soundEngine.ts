/**
 * Web Audio API Sound Synthesizer
 * Zero external audio files required — 100% procedural 8-bit / 16-bit retro arcade audio.
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  public isMuted: boolean = false;
  public isBgmActive: boolean = false;
  private bgmInterval: number | null = null;
  private bgmStep: number = 0;
  private onStateChangeCallbacks: Array<() => void> = [];

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public subscribe(cb: () => void) {
    this.onStateChangeCallbacks.push(cb);
    return () => {
      this.onStateChangeCallbacks = this.onStateChangeCallbacks.filter((c) => c !== cb);
    };
  }

  private notify() {
    this.onStateChangeCallbacks.forEach((cb) => cb());
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.isMuted && this.isBgmActive) {
      this.stopBgm();
    }
    this.notify();
    return this.isMuted;
  }

  /** Short tactile mechanical keyboard/arcade button click */
  public playClick() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(110, this.ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.04);
    } catch {
      // AudioContext policy handled gracefully
    }
  }

  /** Slot machine tick when rolling */
  public playRoll(pitchMod: number = 1) {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'square';
      const baseFreq = 440 * pitchMod;
      osc.frequency.setValueAtTime(baseFreq, this.ctx.currentTime);
      osc.frequency.setValueAtTime(baseFreq * 1.5, this.ctx.currentTime + 0.02);

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch {
      // Ignored
    }
  }

  /** 8-bit Arcade coin chime (B5 -> E6) */
  public playCoin() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(987.77, this.ctx.currentTime); // B5
      osc.frequency.setValueAtTime(1318.51, this.ctx.currentTime + 0.08); // E6

      gain.gain.setValueAtTime(0.18, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.35);
    } catch {
      // Ignored
    }
  }

  /** Epic Jackpot / Mindblown reveal fanfare */
  public playJackpot() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98]; // C5, E5, G5, C6, E6, G6
      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const startTime = this.ctx.currentTime + idx * 0.06;

        osc.type = 'square';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.15, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.2);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.22);
      });
    } catch {
      // Ignored
    }
  }

  /** CRT Power on / Degauss buzzing sound */
  public playCrtBuzz() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(60, this.ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(12000, this.ctx.currentTime + 0.15);

      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.18);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.18);
    } catch {
      // Ignored
    }
  }

  /** Quiz Correct Chime */
  public playCorrect() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const notes = [587.33, 880.00]; // D5, A5
      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const start = this.ctx.currentTime + idx * 0.1;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, start);
        gain.gain.setValueAtTime(0.2, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.25);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(start);
        osc.stop(start + 0.25);
      });
    } catch {
      // Ignored
    }
  }

  /** Quiz Wrong / Error Buzz */
  public playError() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(130, this.ctx.currentTime);
      osc.frequency.setValueAtTime(110, this.ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.25);
    } catch {
      // Ignored
    }
  }

  /** Classic 8-bit Power Up Arpeggio */
  public playPowerUp(pitchMod: number = 1) {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      // G4, B4, D5, G5, B5
      const freqs = [392.0, 493.88, 587.33, 783.99, 987.77].map((f) => f * pitchMod);
      freqs.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const start = this.ctx.currentTime + idx * 0.05;

        osc.type = 'square';
        osc.frequency.setValueAtTime(freq, start);
        gain.gain.setValueAtTime(0.15, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.12);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(start);
        osc.stop(start + 0.12);
      });
    } catch {
      // Ignored
    }
  }

  /** Retro 8-bit Explosion (Crunchy noise & low-frequency blast) */
  public playExplosion() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const bufferSize = this.ctx.sampleRate * 0.35;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1000, this.ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(40, this.ctx.currentTime + 0.35);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.35);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start();
      noise.stop(this.ctx.currentTime + 0.35);
    } catch {
      // Ignored
    }
  }

  /** Iconic 1-Up Chime */
  public play1Up() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      // E6, G6, E7, C7, D7, G7
      const notes = [1318.51, 1567.98, 2637.02, 2093.0, 2349.32, 3135.96];
      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const start = this.ctx.currentTime + idx * 0.07;

        osc.type = 'square';
        osc.frequency.setValueAtTime(freq, start);
        gain.gain.setValueAtTime(0.12, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.18);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(start);
        osc.stop(start + 0.18);
      });
    } catch {
      // Ignored
    }
  }

  /** Arcade Laser Pew-Pew */
  public playLaser() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(1200, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(90, this.ctx.currentTime + 0.14);

      gain.gain.setValueAtTime(0.18, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.14);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.14);
    } catch {
      // Ignored
    }
  }

  /** Sci-Fi Warp Glide */
  public playWarp() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1400, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(250, this.ctx.currentTime + 0.28);

      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.28);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.28);
    } catch {
      // Ignored
    }
  }

  /** Tactile Sticker Slap sound */
  public playSlap() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(450, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(60, this.ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } catch {
      // Ignored
    }
  }

  /** Kart Boost / Engine Acceleration */
  public playKartBoost() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(140, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.26);

      gain.gain.setValueAtTime(0.18, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.26);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.26);
    } catch {
      // Ignored
    }
  }


  public currentTrackIndex: number = 0;
  private analyser: AnalyserNode | null = null;
  private bgmGain: GainNode | null = null;

  public tracks = [
    { id: 0, name: 'NEON HIGHWAY 1988', genre: 'Synthwave Lead', bpm: 128, vibe: 'Nostalgic Outrun' },
    { id: 1, name: '16-BIT DUNGEON CRAWL', genre: 'RPG Adventure', bpm: 110, vibe: 'Mysterious Depths' },
    { id: 2, name: 'CYBERPUNK SPEEDRUN', genre: 'Hyper Arcade', bpm: 145, vibe: 'High-Velocity Neon' },
    { id: 3, name: 'LAVENDER MYSTERY 1996', genre: 'Eerie Chiptune', bpm: 95, vibe: 'Haunting Memory' },
    { id: 4, name: 'BOSS BATTLE CLIMAX', genre: 'Final Showdown', bpm: 140, vibe: 'Intense Climax' },
  ];

  /** Toggle ambient 90s chiptune arpeggio loop */
  public toggleBgm() {
    this.initContext();
    if (this.isBgmActive) {
      this.stopBgm();
    } else {
      this.startBgm();
    }
    this.notify();
  }

  public setTrack(idx: number) {
    this.currentTrackIndex = (idx + this.tracks.length) % this.tracks.length;
    if (this.isBgmActive) {
      this.stopBgm();
      this.startBgm();
    }
    this.notify();
  }

  public nextTrack() {
    this.setTrack(this.currentTrackIndex + 1);
  }

  public prevTrack() {
    this.setTrack(this.currentTrackIndex - 1);
  }

  public getVisualizerData(): Uint8Array {
    if (!this.analyser) return new Uint8Array(16);
    const dataArray = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(dataArray);
    return dataArray;
  }

  private startBgm() {
    if (this.isMuted) this.isMuted = false;
    this.isBgmActive = true;
    this.bgmStep = 0;
    this.initContext();
    if (!this.ctx) return;

    // Set up AnalyserNode for Visualizer
    if (!this.analyser) {
      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 64;
      this.analyser.smoothingTimeConstant = 0.8;
      this.bgmGain = this.ctx.createGain();
      this.bgmGain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      this.bgmGain.connect(this.analyser);
      this.analyser.connect(this.ctx.destination);
    }

    // Melodies for 5 unique tracks
    const trackMelodies: Record<number, { notes: number[]; stepDuration: number; type1: OscillatorType; type2: OscillatorType }> = {
      0: {
        // Neon Highway: E minor / C Maj9
        notes: [
          329.63, 392.00, 493.88, 587.33, 659.25, 493.88, 392.00, 329.63,
          261.63, 329.63, 392.00, 523.25, 659.25, 523.25, 392.00, 329.63,
          293.66, 369.99, 440.00, 587.33, 739.99, 587.33, 440.00, 369.99,
          246.94, 329.63, 392.00, 493.88, 587.33, 493.88, 392.00, 246.94
        ],
        stepDuration: 180,
        type1: 'triangle',
        type2: 'sine',
      },
      1: {
        // Dungeon Crawl: A minor misterioso
        notes: [
          220.00, 261.63, 329.63, 440.00, 392.00, 329.63, 261.63, 220.00,
          196.00, 246.94, 293.66, 392.00, 329.63, 293.66, 246.94, 196.00,
          174.61, 220.00, 261.63, 349.23, 329.63, 261.63, 220.00, 174.61,
          164.81, 207.65, 246.94, 329.63, 392.00, 329.63, 246.94, 207.65
        ],
        stepDuration: 210,
        type1: 'square',
        type2: 'triangle',
      },
      2: {
        // Cyberpunk Speedrun: Hyper 145 BPM driving pulse
        notes: [
          293.66, 293.66, 587.33, 440.00, 392.00, 440.00, 587.33, 659.25,
          261.63, 261.63, 523.25, 392.00, 349.23, 392.00, 523.25, 587.33,
          220.00, 220.00, 440.00, 329.63, 293.66, 329.63, 440.00, 493.88,
          349.23, 392.00, 440.00, 523.25, 587.33, 659.25, 783.99, 880.00
        ],
        stepDuration: 135,
        type1: 'sawtooth',
        type2: 'square',
      },
      3: {
        // Lavender Town Mystery: High-octave eerie bell arpeggio
        notes: [
          523.25, 659.25, 783.99, 1046.50, 987.77, 783.99, 659.25, 523.25,
          493.88, 622.25, 739.99, 987.77, 932.33, 739.99, 622.25, 493.88,
          440.00, 554.37, 659.25, 880.00, 830.61, 659.25, 554.37, 440.00,
          415.30, 523.25, 622.25, 830.61, 783.99, 622.25, 523.25, 415.30
        ],
        stepDuration: 220,
        type1: 'sine',
        type2: 'triangle',
      },
      4: {
        // Boss Battle Climax: Fast tension riff
        notes: [
          146.83, 293.66, 349.23, 440.00, 349.23, 293.66, 261.63, 246.94,
          146.83, 293.66, 349.23, 440.00, 493.88, 440.00, 349.23, 293.66,
          138.59, 277.18, 329.63, 415.30, 329.63, 277.18, 246.94, 220.00,
          130.81, 261.63, 311.13, 392.00, 440.00, 523.25, 587.33, 659.25
        ],
        stepDuration: 145,
        type1: 'square',
        type2: 'sawtooth',
      }
    };

    const cur = trackMelodies[this.currentTrackIndex] || trackMelodies[0];

    this.bgmInterval = window.setInterval(() => {
      if (!this.isBgmActive || this.isMuted || !this.ctx || !this.bgmGain) return;
      try {
        const freq = cur.notes[this.bgmStep % cur.notes.length];
        const osc = this.ctx.createOscillator();
        const noteGain = this.ctx.createGain();

        osc.type = this.bgmStep % 2 === 0 ? cur.type1 : cur.type2;
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

        noteGain.gain.setValueAtTime(0.6, this.ctx.currentTime);
        noteGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.15);

        osc.connect(noteGain);
        noteGain.connect(this.bgmGain);

        osc.start();
        osc.stop(this.ctx.currentTime + 0.15);

        this.bgmStep++;
      } catch {
        // Ignored
      }
    }, cur.stepDuration);
  }

  private stopBgm() {
    this.isBgmActive = false;
    if (this.bgmInterval !== null) {
      clearInterval(this.bgmInterval);
      this.bgmInterval = null;
    }
  }
}

export const sound = new SoundEngine();

