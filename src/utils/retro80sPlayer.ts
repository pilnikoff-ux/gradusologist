// Retro 80s Synthesizer Music Engine (Web Audio API)
// Provides instant, offline 80s Synthwave & Eurodisco music playback

export interface RetroTrack {
  id: string;
  title: string;
  artist: string;
  year: number;
  bpm: number;
  genre: string;
  youtubeQuery: string;
}

export const RETRO_80S_TRACKS: RetroTrack[] = [
  {
    id: 'take_on_me',
    title: 'Take On Me (Synth Riff 1985)',
    artist: 'A-ha / Retro 80s Tribute',
    year: 1985,
    bpm: 168,
    genre: 'Synthpop',
    youtubeQuery: 'A-ha Take On Me official'
  },
  {
    id: 'miami_nights',
    title: 'Miami Nights & Neon Bar',
    artist: 'Jan Hammer Style',
    year: 1984,
    bpm: 118,
    genre: 'Outrun Synthwave',
    youtubeQuery: 'Miami Vice Theme Jan Hammer'
  },
  {
    id: 'cheri_cheri',
    title: 'Cheri Cheri Lady (Eurodisco)',
    artist: 'Modern Talking Style',
    year: 1985,
    bpm: 124,
    genre: 'Eurodisco',
    youtubeQuery: 'Modern Talking Cheri Cheri Lady'
  },
  {
    id: 'retro_cyber',
    title: 'Cyberpunk 1984 Night Ride',
    artist: 'Analog Synthwave Lab',
    year: 1986,
    bpm: 120,
    genre: 'Retrowave',
    youtubeQuery: '80s Synthwave Retro Bar Music'
  }
];

let audioCtx: AudioContext | null = null;
let isPlaying = false;
let currentTrackId = 'take_on_me';
let stepTimer: number | null = null;
let masterGain: GainNode | null = null;
let onStateChangeListeners: Array<(playing: boolean, trackId: string) => void> = [];

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

// Frequencies for musical notes
const NOTE_FREQS: Record<string, number> = {
  'F#3': 185.0,
  'G3': 196.0,
  'A3': 220.0,
  'B3': 246.94,
  'C4': 261.63,
  'C#4': 277.18,
  'D4': 293.66,
  'D#4': 311.13,
  'E4': 329.63,
  'F4': 349.23,
  'F#4': 369.99,
  'G4': 392.0,
  'G#4': 415.3,
  'A4': 440.0,
  'A#4': 466.16,
  'B4': 493.88,
  'C5': 523.25,
  'C#5': 554.37,
  'D5': 587.33,
  'D#5': 622.25,
  'E5': 659.25,
  'F5': 698.46,
  'F#5': 739.99,
  'G5': 783.99,
  'A5': 880.0,
  'B5': 987.77,
  'REST': 0
};

// Patterns for 80s tracks
// A-ha Take On Me Lead riff (16th notes)
const TAKE_ON_ME_LEAD = [
  'F#4', 'F#4', 'D4', 'B3', 'REST', 'B3', 'REST', 'E4',
  'REST', 'E4', 'REST', 'E4', 'G#4', 'G#4', 'A4', 'B4',
  'A4', 'A4', 'A4', 'E4', 'REST', 'D4', 'REST', 'F#4',
  'REST', 'F#4', 'REST', 'F#4', 'E4', 'E4', 'F#4', 'E4'
];
const TAKE_ON_ME_BASS = [
  'B3', 'B3', 'B3', 'B3', 'G3', 'G3', 'G3', 'G3',
  'D4', 'D4', 'D4', 'D4', 'A3', 'A3', 'A3', 'A3'
];

// Miami Vice style
const MIAMI_LEAD = [
  'D4', 'F4', 'A4', 'D5', 'C5', 'A4', 'F4', 'E4',
  'D4', 'F4', 'A4', 'D5', 'E5', 'F5', 'E5', 'C5',
  'A#4', 'D5', 'F5', 'A#5', 'A5', 'F5', 'D5', 'C5',
  'A4', 'C5', 'E5', 'A5', 'G5', 'E5', 'C#5', 'A4'
];

// Cheri Cheri style
const CHERI_LEAD = [
  'C#5', 'REST', 'C#5', 'B4', 'A4', 'B4', 'C#5', 'REST',
  'A4', 'REST', 'A4', 'G#4', 'F#4', 'G#4', 'A4', 'REST',
  'B4', 'REST', 'B4', 'A4', 'G#4', 'A4', 'B4', 'REST',
  'G#4', 'REST', 'G#4', 'F#4', 'E4', 'F#4', 'G#4', 'REST'
];

function playNote(freq: number, duration: number, type: OscillatorType, gainVal: number, ctx: AudioContext, destination: AudioNode) {
  if (freq === 0) return;
  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(type === 'sawtooth' ? 3200 : 1200, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + duration);

    gain.gain.setValueAtTime(gainVal, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch {
    // audio failure guard
  }
}

let stepIndex = 0;

function runSequencer() {
  const ctx = getAudioContext();
  if (!ctx || !isPlaying || !masterGain) return;

  let leadPattern = TAKE_ON_ME_LEAD;
  let tempo = 135;

  if (currentTrackId === 'miami_nights') {
    leadPattern = MIAMI_LEAD;
    tempo = 120;
  } else if (currentTrackId === 'cheri_cheri') {
    leadPattern = CHERI_LEAD;
    tempo = 128;
  } else if (currentTrackId === 'retro_cyber') {
    leadPattern = MIAMI_LEAD;
    tempo = 112;
  }

  const stepDurationMs = (60 / tempo / 4) * 1000;
  const leadNote = leadPattern[stepIndex % leadPattern.length];
  const bassNote = TAKE_ON_ME_BASS[Math.floor(stepIndex / 2) % TAKE_ON_ME_BASS.length];

  const leadFreq = NOTE_FREQS[leadNote] || 0;
  const bassFreq = (NOTE_FREQS[bassNote] || 0) / 2;

  // Play lead synth (Sawtooth with 80s chorus vibe)
  if (leadFreq > 0) {
    playNote(leadFreq, stepDurationMs / 1000 * 0.9, 'sawtooth', 0.14, ctx, masterGain);
    playNote(leadFreq * 1.002, stepDurationMs / 1000 * 0.9, 'sawtooth', 0.08, ctx, masterGain); // detune chorus
  }

  // Play bass on 8th notes (Square wave synth bass)
  if (stepIndex % 2 === 0 && bassFreq > 0) {
    playNote(bassFreq, (stepDurationMs * 2) / 1000 * 0.85, 'square', 0.16, ctx, masterGain);
  }

  // Play hi-hat / snare pulse
  if (stepIndex % 4 === 2) {
    // Snare slap
    playNote(220, 0.08, 'triangle', 0.12, ctx, masterGain);
  } else if (stepIndex % 2 === 0) {
    // Hi-hat tick
    playNote(3500, 0.02, 'triangle', 0.04, ctx, masterGain);
  }

  stepIndex++;
  stepTimer = window.setTimeout(runSequencer, stepDurationMs);
}

export function start80sMusic(trackId = 'take_on_me') {
  const ctx = getAudioContext();
  if (!ctx) return;

  currentTrackId = trackId;
  if (!masterGain) {
    masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.3, ctx.currentTime);
    masterGain.connect(ctx.destination);
  }

  if (stepTimer) {
    clearTimeout(stepTimer);
    stepTimer = null;
  }

  stepIndex = 0;
  isPlaying = true;
  runSequencer();
  notifyState();
}

export function stop80sMusic() {
  isPlaying = false;
  if (stepTimer) {
    clearTimeout(stepTimer);
    stepTimer = null;
  }
  notifyState();
}

export function toggle80sMusic(trackId?: string) {
  if (isPlaying && (!trackId || trackId === currentTrackId)) {
    stop80sMusic();
  } else {
    start80sMusic(trackId || currentTrackId);
  }
}

export function is80sMusicActive(): boolean {
  return isPlaying;
}

export function getCurrent80sTrackId(): string {
  return currentTrackId;
}

export function subscribe80sMusic(listener: (playing: boolean, trackId: string) => void) {
  onStateChangeListeners.push(listener);
  listener(isPlaying, currentTrackId);
  return () => {
    onStateChangeListeners = onStateChangeListeners.filter((l) => l !== listener);
  };
}

function notifyState() {
  onStateChangeListeners.forEach((l) => l(isPlaying, currentTrackId));
}
