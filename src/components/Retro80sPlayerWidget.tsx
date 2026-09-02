import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import {
  RETRO_80S_TRACKS,
  start80sMusic,
  stop80sMusic,
  subscribe80sMusic,
  RetroTrack
} from '../utils/retro80sPlayer';
import { Play, Square, Disc, Volume2, ExternalLink, Sparkles, Radio } from 'lucide-react';
import { playClinkSound } from '../utils/audio';

interface Props {
  language: Language;
  onClose?: () => void;
  compact?: boolean;
}

export const Retro80sPlayerWidget: React.FC<Props> = ({
  language,
  compact = false
}) => {
  const isUa = language === 'uk';
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedTrackId, setSelectedTrackId] = useState('take_on_me');

  useEffect(() => {
    const unsubscribe = subscribe80sMusic((playing, trackId) => {
      setIsPlaying(playing);
      setSelectedTrackId(trackId);
    });
    return () => unsubscribe();
  }, []);

  const currentTrack =
    RETRO_80S_TRACKS.find((t) => t.id === selectedTrackId) || RETRO_80S_TRACKS[0];

  const handleTogglePlay = () => {
    playClinkSound();
    if (isPlaying) {
      stop80sMusic();
    } else {
      start80sMusic(selectedTrackId);
    }
  };

  const handleSelectTrack = (track: RetroTrack) => {
    playClinkSound();
    setSelectedTrackId(track.id);
    start80sMusic(track.id);
  };

  const openYoutubeSearch = (track: RetroTrack) => {
    const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(
      track.youtubeQuery
    )}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="w-full bg-gradient-to-br from-purple-950 via-zinc-900 to-pink-950 border-2 border-pink-500/50 rounded-2xl p-4 sm:p-5 shadow-2xl text-white relative overflow-hidden animate-fadeIn">
      {/* 80s Neon grid background effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-pink-500/10 via-transparent to-purple-900/20 pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between relative z-10 mb-3 border-b border-pink-500/30 pb-2.5">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-pink-500/20 border border-pink-400/50 flex items-center justify-center text-pink-300 shadow-[0_0_12px_rgba(236,72,153,0.5)]">
            <Radio className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black tracking-widest uppercase text-pink-400 font-mono">
                📼 RETRO 80s CASSETTE
              </span>
              <span className="text-[10px] bg-pink-500/30 text-pink-200 px-2 py-0.5 rounded-full font-bold uppercase">
                {isPlaying ? '▶ ON AIR' : '⏸ PAUSED'}
              </span>
            </div>
            <h4 className="text-sm font-bold text-white font-['Unbounded']">
              {isUa ? 'Синтезатор Хітів 80-х' : '80s Synth Hits Player'}
            </h4>
          </div>
        </div>

        {/* Animated Equalizer Bars */}
        <div className="flex items-end gap-1 h-6">
          <span
            className={`w-1 bg-pink-400 rounded-full transition-all duration-150 ${
              isPlaying ? 'h-5 animate-pulse' : 'h-1.5 opacity-40'
            }`}
          />
          <span
            className={`w-1 bg-amber-400 rounded-full transition-all duration-200 ${
              isPlaying ? 'h-6 animate-bounce' : 'h-2 opacity-40'
            }`}
          />
          <span
            className={`w-1 bg-cyan-400 rounded-full transition-all duration-100 ${
              isPlaying ? 'h-4 animate-pulse' : 'h-1 opacity-40'
            }`}
          />
          <span
            className={`w-1 bg-purple-400 rounded-full transition-all duration-300 ${
              isPlaying ? 'h-6 animate-bounce' : 'h-2.5 opacity-40'
            }`}
          />
        </div>
      </div>

      {/* Active Track Display */}
      <div className="bg-black/60 border border-pink-500/30 rounded-xl p-3 mb-3 relative z-10 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 overflow-hidden">
          <div
            className={`w-10 h-10 rounded-full bg-gradient-to-tr from-pink-600 to-amber-400 flex items-center justify-center shrink-0 shadow-md ${
              isPlaying ? 'animate-spin' : ''
            }`}
            style={{ animationDuration: '4s' }}
          >
            <Disc className="w-5 h-5 text-black" />
          </div>
          <div className="truncate">
            <div className="text-xs font-bold text-pink-200 truncate">
              {currentTrack.title}
            </div>
            <div className="text-[11px] text-zinc-400 flex items-center gap-1.5">
              <span>{currentTrack.artist}</span>
              <span>•</span>
              <span className="text-amber-400 font-mono">{currentTrack.year}</span>
              <span>•</span>
              <span className="text-cyan-300 font-mono">{currentTrack.bpm} BPM</span>
            </div>
          </div>
        </div>

        {/* Play/Stop Button */}
        <button
          onClick={handleTogglePlay}
          className={`shrink-0 px-4 py-2.5 rounded-xl font-bold font-['Unbounded'] text-xs flex items-center gap-2 cursor-pointer transition-all shadow-lg active:scale-95 ${
            isPlaying
              ? 'bg-red-500 hover:bg-red-600 text-white shadow-red-500/30'
              : 'bg-gradient-to-r from-pink-500 to-amber-500 hover:from-pink-400 hover:to-amber-400 text-black shadow-pink-500/30'
          }`}
        >
          {isPlaying ? (
            <>
              <Square className="w-3.5 h-3.5 fill-current" />
              <span>{isUa ? 'СТОП' : 'STOP'}</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{isUa ? 'СЛУХАТИ' : 'PLAY'}</span>
            </>
          )}
        </button>
      </div>

      {/* Track Selection List */}
      {!compact && (
        <div className="space-y-1.5 relative z-10 mb-3">
          <div className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">
            {isUa ? 'Обери ретро-трек:' : 'Select retro track:'}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            {RETRO_80S_TRACKS.map((track) => {
              const isSelected = track.id === selectedTrackId;
              return (
                <div
                  key={track.id}
                  onClick={() => handleSelectTrack(track)}
                  className={`p-2 rounded-lg border text-left cursor-pointer transition-all flex items-center justify-between text-xs ${
                    isSelected
                      ? 'bg-pink-500/20 border-pink-400 text-pink-100 shadow-sm'
                      : 'bg-zinc-800/60 border-zinc-700/60 hover:border-pink-500/40 text-zinc-300'
                  }`}
                >
                  <div className="truncate pr-2">
                    <span className="font-bold block truncate">{track.title}</span>
                    <span className="text-[10px] text-zinc-400">{track.genre}</span>
                  </div>
                  {isSelected && isPlaying ? (
                    <span className="w-2 h-2 rounded-full bg-pink-400 animate-ping shrink-0" />
                  ) : (
                    <Play className="w-3 h-3 text-zinc-500 shrink-0" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* External Original Search Button */}
      <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between text-xs relative z-10">
        <span className="text-[11px] text-zinc-400">
          {isUa
            ? '🎧 Синтезатор генерує звук у браузері'
            : '🎧 Real-time Web Audio 80s Synthesizer'}
        </span>
        <button
          onClick={() => openYoutubeSearch(currentTrack)}
          className="text-pink-400 hover:text-pink-300 font-bold flex items-center gap-1.5 cursor-pointer text-[11px] hover:underline"
        >
          <span>{isUa ? 'Оригінал на YouTube' : 'Original on YouTube'}</span>
          <ExternalLink className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};
