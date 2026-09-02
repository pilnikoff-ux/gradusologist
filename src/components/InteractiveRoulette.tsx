import React, { useState, useRef, useEffect } from 'react';
import { ROULETTE_OPTIONS } from '../data/rouletteOptions';
import { RouletteOption, Language } from '../types';
import { playTickSound, playWinSound } from '../utils/audio';
import confetti from 'canvas-confetti';
import { Dices, Sparkles, RefreshCw, Volume2, ShieldAlert, CheckCircle2, X, Radio, Music } from 'lucide-react';
import { Retro80sPlayerWidget } from './Retro80sPlayerWidget';
import { start80sMusic, stop80sMusic } from '../utils/retro80sPlayer';

interface Props {
  language: Language;
}

export const InteractiveRoulette: React.FC<Props> = ({ language }) => {
  const isUa = language === 'uk';
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedOption, setSelectedOption] = useState<RouletteOption | null>(null);
  const [showResultModal, setShowResultModal] = useState(false);
  const [history, setHistory] = useState<RouletteOption[]>([]);
  const currentAngleRef = useRef<number>(0);
  const animFrameRef = useRef<number | null>(null);

  const numOptions = ROULETTE_OPTIONS.length;
  const sliceAngle = (2 * Math.PI) / numOptions;

  // Draw the roulette wheel on canvas
  const drawWheel = (angle: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(centerX, centerY) - 18;

    ctx.clearRect(0, 0, width, height);

    // Save context for rotation
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(angle);

    // Outer glow ring
    ctx.beginPath();
    ctx.arc(0, 0, radius + 8, 0, 2 * Math.PI);
    ctx.lineWidth = 10;
    ctx.strokeStyle = '#d97706'; // Amber glow
    ctx.stroke();

    // Slices
    for (let i = 0; i < numOptions; i++) {
      const opt = ROULETTE_OPTIONS[i];
      const startAngle = i * sliceAngle;
      const endAngle = (i + 1) * sliceAngle;

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, radius, startAngle, endAngle);
      ctx.closePath();

      // Alternate color palette
      ctx.fillStyle = opt.color;
      ctx.fill();
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = '#1c1917';
      ctx.stroke();

      // Outer border arc
      ctx.beginPath();
      ctx.arc(0, 0, radius - 4, startAngle, endAngle);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Text inside slice
      ctx.save();
      ctx.rotate(startAngle + sliceAngle / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 12px "Plus Jakarta Sans", sans-serif';
      ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
      ctx.shadowBlur = 4;

      // Extract short label
      const rawText = isUa ? opt.textUa : opt.textEn;
      const textToDraw = rawText.length > 20 ? rawText.substring(0, 18) + '…' : rawText;

      ctx.fillText(textToDraw, radius - 24, 4);

      // Number badge circle near edge
      ctx.beginPath();
      ctx.arc(radius - 10, 0, 6, 0, 2 * Math.PI);
      ctx.fillStyle = 'rgba(255,255,255,0.3)';
      ctx.fill();

      ctx.restore();
    }

    // Center hub cap
    ctx.beginPath();
    ctx.arc(0, 0, 36, 0, 2 * Math.PI);
    const grad = ctx.createRadialGradient(0, 0, 5, 0, 0, 36);
    grad.addColorStop(0, '#fef3c7');
    grad.addColorStop(0.5, '#d97706');
    grad.addColorStop(1, '#78350f');
    ctx.fillStyle = grad;
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#fef08a';
    ctx.stroke();

    // Center text / icon
    ctx.fillStyle = '#1c1917';
    ctx.font = '900 13px "Unbounded", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('18+', 0, 0);

    ctx.restore();
  };

  useEffect(() => {
    drawWheel(currentAngleRef.current);
  }, [language]);

  const spin = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setSelectedOption(null);

    // Physics parameters
    const totalSpinTimeMs = 4500;
    const minRotations = 5;
    const randomExtraTurns = Math.random() * 3 + minRotations;
    // Choose winning index 0..16
    const winningIndex = Math.floor(Math.random() * numOptions);
    const targetSliceCenter = (winningIndex + 0.5) * sliceAngle;

    // Pointer is at the top (angle = 3 * PI / 2, i.e. 270 deg)
    // We want (finalAngle + targetSliceCenter) % (2*PI) = 3 * PI / 2
    const targetPointerAngle = (3 * Math.PI) / 2;
    const currentAngleMod = currentAngleRef.current % (2 * Math.PI);
    let deltaAngle = targetPointerAngle - (targetSliceCenter + currentAngleMod);
    while (deltaAngle < 0) {
      deltaAngle += 2 * Math.PI;
    }
    const finalTargetAngle = currentAngleRef.current + randomExtraTurns * 2 * Math.PI + deltaAngle;

    const startAngle = currentAngleRef.current;
    const totalDistance = finalTargetAngle - startAngle;
    const startTime = performance.now();
    let lastTickSlice = -1;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / totalSpinTimeMs, 1);

      // Ease out cubic deceleration
      const easeOut = 1 - Math.pow(1 - progress, 3.2);
      const newAngle = startAngle + totalDistance * easeOut;
      currentAngleRef.current = newAngle;

      // Play tick sound when crossing slice boundary
      const normalizedAngle = ((targetPointerAngle - newAngle) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);
      const currentSlice = Math.floor(normalizedAngle / sliceAngle);
      if (currentSlice !== lastTickSlice) {
        lastTickSlice = currentSlice;
        playTickSound(500 + (1 - progress) * 200);
      }

      drawWheel(newAngle);

      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(animate);
      } else {
        // Finished
        setIsSpinning(false);
        const winningOpt = ROULETTE_OPTIONS[winningIndex];
        setSelectedOption(winningOpt);
        setHistory((prev) => [winningOpt, ...prev.slice(0, 4)]);
        playWinSound();

        // Confetti celebration
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#f59e0b', '#ef4444', '#10b981', '#6366f1', '#ec4899']
        });

        // Show modal after short delay
        setTimeout(() => {
          setShowResultModal(true);
        }, 600);
      }
    };

    animFrameRef.current = requestAnimationFrame(animate);
  };

  return (
    <section id="roulette-section" className="relative py-12 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
          <Dices className="w-3.5 h-3.5" />
          {isUa ? 'Інтерактивна Рулетка Вибору' : 'Interactive Decision Wheel'}
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-['Unbounded'] tracking-tight">
          {isUa ? '«Що мені робити, коли я напився?»' : '"What should I do now that I\'m drunk?"'}
        </h2>
        <p className="mt-2 text-stone-400 text-sm sm:text-base">
          {isUa
            ? 'Колесо долі з 17 життєвими варіантами: від сну й песика до дзвінка колишній та філософії буття.'
            : 'Wheel of destiny with 17 real-life options: from peaceful sleep and walking the dog to texting your ex and cosmic philosophy.'}
        </p>
      </div>

      {/* Main Wheel Arena */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left/Center: The Wheel */}
        <div className="lg:col-span-8 flex flex-col items-center justify-center relative">
          {/* Wheel Container */}
          <div className="relative p-2 rounded-full bg-gradient-to-b from-amber-500/20 via-stone-900/80 to-stone-950 border border-amber-500/30 shadow-2xl shadow-amber-500/10">
            {/* Top Pointer Needle */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
              <div className="w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-t-[26px] border-t-amber-400 drop-shadow-[0_4px_8px_rgba(245,158,11,0.6)] animate-pulse" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-200 -mt-1 shadow" />
            </div>

            {/* Canvas */}
            <canvas
              ref={canvasRef}
              width={460}
              height={460}
              className="max-w-[320px] max-h-[320px] sm:max-w-[440px] sm:max-h-[440px] rounded-full touch-none select-none cursor-pointer transition-transform active:scale-[0.99]"
              onClick={spin}
            />
          </div>

          {/* Spin Button */}
          <div className="mt-6 flex flex-wrap gap-4 items-center justify-center">
            <button
              id="spin-roulette-btn"
              onClick={spin}
              disabled={isSpinning}
              className={`relative group px-8 py-3.5 rounded-2xl font-['Unbounded'] font-bold text-sm sm:text-base transition-all duration-300 shadow-xl flex items-center gap-3 ${
                isSpinning
                  ? 'bg-stone-800 text-stone-500 cursor-not-allowed border border-stone-700'
                  : 'bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-stone-950 hover:brightness-110 hover:shadow-amber-500/25 active:scale-95'
              }`}
            >
              <RefreshCw className={`w-5 h-5 ${isSpinning ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'}`} />
              {isSpinning
                ? isUa ? 'Колесо обертається...' : 'Spinning Destiny...'
                : isUa ? 'Крутанути Рулетку!' : 'Spin the Wheel!'}
            </button>
          </div>
        </div>

        {/* Right: Selected Result & Recent History */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          {/* Quick Result Highlight */}
          <div className="p-5 rounded-2xl bg-stone-900/90 border border-stone-800 shadow-lg relative overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                {isUa ? 'Поточний вердикт' : 'Active Verdict'}
              </span>
              {selectedOption && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono">
                  #{selectedOption.index}
                </span>
              )}
            </div>

            {selectedOption ? (
              <div className="space-y-3 animate-fadeIn">
                <div
                  className="keep-dark p-3 rounded-xl border text-white font-bold text-base shadow-sm"
                  style={{ backgroundColor: `${selectedOption.color}35`, borderColor: selectedOption.color }}
                >
                  <div className="text-xs uppercase tracking-wider opacity-90 mb-1 font-mono">
                    {isUa ? selectedOption.badge : selectedOption.badgeEn}
                  </div>
                  {isUa ? selectedOption.textUa : selectedOption.textEn}
                </div>
                <p className="text-xs text-stone-300 leading-relaxed">
                  {isUa ? selectedOption.adviceUa : selectedOption.adviceEn}
                </p>
                {(selectedOption.index === 14 || selectedOption.textUa.includes('80х')) && (
                  <div className="pt-2 border-t border-stone-800">
                    <Retro80sPlayerWidget language={language} compact={true} />
                  </div>
                )}
                <div className="pt-2 border-t border-stone-800 flex justify-between items-center">
                  <span className="text-[11px] text-stone-400">
                    {isUa ? 'Повний опис кроку' : 'Full step guide'}
                  </span>
                  <button
                    onClick={() => setShowResultModal(true)}
                    className="text-xs text-amber-400 hover:text-amber-300 font-semibold underline underline-offset-2"
                  >
                    {isUa ? 'Відкрити інструкцію →' : 'Open instruction →'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="py-6 text-center text-stone-500 text-xs">
                <Dices className="w-8 h-8 mx-auto mb-2 opacity-40 animate-bounce" />
                {isUa ? 'Натисни «Крутанути Рулетку», щоб доля обрала твій наступний крок!' : 'Click Spin to let fate decide your next step!'}
              </div>
            )}
          </div>

          {/* Quick List of All 17 Options (Collapsible Summary) */}
          <div className="p-4 rounded-2xl bg-stone-900/50 border border-stone-800/80">
            <h4 className="text-xs font-semibold text-stone-400 mb-2 uppercase tracking-wider flex items-center justify-between">
              <span>{isUa ? 'Всі 17 варіантів долі' : 'All 17 Wheel Options'}</span>
              <span className="text-[10px] text-stone-500 font-mono">1–17</span>
            </h4>
            <div className="max-h-48 overflow-y-auto pr-1 space-y-1.5 scrollbar-thin scrollbar-thumb-stone-700">
              {ROULETTE_OPTIONS.map((opt) => (
                <div
                  key={opt.index}
                  className={`px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between border transition-colors ${
                    selectedOption?.index === opt.index
                      ? 'bg-amber-500/20 border-amber-500 text-amber-500 font-bold'
                      : 'bg-stone-950/60 border-stone-800/60 text-stone-400 hover:border-stone-700'
                  }`}
                >
                  <span className="truncate">{isUa ? opt.textUa : opt.textEn}</span>
                  <span
                    className="w-2 h-2 rounded-full shrink-0 ml-2"
                    style={{ backgroundColor: opt.color }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Result Modal */}
      {showResultModal && selectedOption && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-lg rounded-3xl bg-stone-900 border-2 border-amber-500/50 p-6 sm:p-8 shadow-2xl shadow-amber-500/20 overflow-hidden">
            {/* Top decorative gradient glow */}
            <div
              className="absolute top-0 left-0 right-0 h-2"
              style={{ backgroundColor: selectedOption.color }}
            />

            {/* Close Button */}
            <button
              onClick={() => setShowResultModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-2 mb-2">
              <span
                className="px-2.5 py-1 rounded-full text-xs font-bold text-white uppercase tracking-wider"
                style={{ backgroundColor: selectedOption.color }}
              >
                {isUa ? selectedOption.badge : selectedOption.badgeEn}
              </span>
              <span className="text-xs text-stone-400 font-mono">
                {isUa ? `Варіант №${selectedOption.index}` : `Option #${selectedOption.index}`}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-['Unbounded'] mb-4">
              {isUa ? selectedOption.textUa : selectedOption.textEn}
            </h3>

            {/* Tactical Advice */}
            <div className="p-4 rounded-2xl bg-stone-950/80 border border-stone-800 space-y-3 mb-4">
              <div className="flex items-start gap-2.5 text-stone-300 text-sm leading-relaxed">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-stone-200 mb-1">
                    {isUa ? 'Тактична інструкція від Градусолога:' : 'Tactical advice from Gradusologist:'}
                  </div>
                  {isUa ? selectedOption.adviceUa : selectedOption.adviceEn}
                </div>
              </div>

              <div className="flex items-start gap-2.5 text-stone-300 text-xs leading-relaxed pt-2 border-t border-stone-800/80">
                <Volume2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-stone-400 font-medium">{isUa ? 'Рекомендована дія / трек: ' : 'Suggested action / track: '}</span>
                  <span className="text-amber-200 font-bold">{isUa ? selectedOption.suggestedTrackOrActionUa : selectedOption.suggestedTrackOrActionEn}</span>
                </div>
              </div>
            </div>

            {/* 80s Music Synthesizer Widget (Direct Play for Sector 14 or manual) */}
            {(selectedOption.index === 14 || selectedOption.textUa.includes('80х') || selectedOption.textEn.includes('80s')) && (
              <div className="mb-4">
                <Retro80sPlayerWidget language={language} compact={false} />
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  setShowResultModal(false);
                  spin();
                }}
                className="flex-1 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold font-['Unbounded'] text-xs sm:text-sm flex items-center justify-center gap-2 transition-all"
              >
                <RefreshCw className="w-4 h-4" />
                {isUa ? 'Крутанути ще раз!' : 'Spin Again!'}
              </button>
              <button
                onClick={() => setShowResultModal(false)}
                className="py-3 px-5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 font-medium text-xs sm:text-sm transition-all"
              >
                {isUa ? 'Прийняти долю' : 'Accept Fate'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
