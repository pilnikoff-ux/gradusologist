import React, { useState } from 'react';
import { TOASTS_DATABASE } from '../data/toasts';
import { ToastItem, Language } from '../types';
import { Sparkles, Wine, Copy, Check, MessageSquareQuote, RefreshCw, Flame, Heart, Users, Flag, Gift, Smile } from 'lucide-react';
import { playClinkSound } from '../utils/audio';

interface Props {
  language: Language;
}

export const ToastGenerator: React.FC<Props> = ({ language }) => {
  const isUa = language === 'uk';

  const [selectedOccasion, setSelectedOccasion] = useState<string>('friends');
  const [selectedTone, setSelectedTone] = useState<string>('funny');
  const [customRecipient, setCustomRecipient] = useState<string>('');
  const [activeToast, setActiveToast] = useState<ToastItem>(TOASTS_DATABASE[0]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const occasions = [
    { key: 'friends', labelUa: 'Для друзів / Братухи', labelEn: 'Friends / Buddies', icon: Users },
    { key: 'friday', labelUa: 'П\'ятниця / Кінець тижня', labelEn: 'Friday / Weekend', icon: Flame },
    { key: 'love', labelUa: 'За жінок / Романтика', labelEn: 'To Women / Romance', icon: Heart },
    { key: 'peace_victory', labelUa: 'За Перемогу / Захисників', labelEn: 'To Victory / Defenders', icon: Flag },
    { key: 'birthday', labelUa: 'День народження', labelEn: 'Birthday', icon: Gift },
    { key: 'wild_party', labelUa: 'Шалена тусовка', labelEn: 'Wild Party', icon: Smile }
  ];

  const tones = [
    { key: 'funny', labelUa: 'З гумором та сарказмом', labelEn: 'Funny & Sarcastic' },
    { key: 'hearty', labelUa: 'Душевний та теплий', labelEn: 'Warm & Hearty' },
    { key: 'short', labelUa: 'Короткий як постріл', labelEn: 'Short & Punchy' },
    { key: 'philosophical', labelUa: 'Глибокий філософський', labelEn: 'Deep Philosophical' },
    { key: 'spicy', labelUa: 'З перчинкою (18+)', labelEn: 'Spicy (18+)' }
  ];

  const handleGenerate = async () => {
    if (isGenerating) return;
    setIsGenerating(true);
    playClinkSound();

    try {
      const res = await fetch('/api/gemini/generate-toast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          occasion: selectedOccasion,
          tone: selectedTone,
          recipient: customRecipient,
          language
        })
      });

      if (!res.ok) throw new Error('API failed');

      const resData = await res.json();
      const rawToast = resData?.toast || resData;

      if (!rawToast || !rawToast.title) {
        throw new Error('Invalid toast response');
      }

      const normalizedToast: ToastItem = {
        id: rawToast.id || `toast_${Date.now()}`,
        occasion: rawToast.occasion || selectedOccasion,
        tone: rawToast.tone || selectedTone,
        title: rawToast.title,
        titleEn: rawToast.titleEn || rawToast.title,
        text: rawToast.text,
        textEn: rawToast.textEn || rawToast.text,
        punchline: rawToast.punchline || (isUa ? 'Будьмо!' : 'Cheers!'),
        punchlineEn: rawToast.punchlineEn || rawToast.punchline || 'Cheers!',
        suggestedDrink: rawToast.suggestedDrink,
        suggestedDrinkEn: rawToast.suggestedDrinkEn || rawToast.suggestedDrink
      };

      setActiveToast(normalizedToast);
    } catch {
      // Find matching offline toasts for occasion and tone
      const matchingToasts = TOASTS_DATABASE.filter(
        (t) => t.occasion === selectedOccasion && (selectedTone ? t.tone === selectedTone : true)
      );
      const fallbackList = matchingToasts.length > 0
        ? matchingToasts
        : TOASTS_DATABASE.filter((t) => t.occasion === selectedOccasion);

      const pool = fallbackList.length > 0 ? fallbackList : TOASTS_DATABASE;
      const randomPick = pool[Math.floor(Math.random() * pool.length)];
      setActiveToast(randomPick);
    } finally {
      setIsGenerating(false);
      playClinkSound();
    }
  };

  const handleNextRandomFromCategory = () => {
    playClinkSound();
    const matching = TOASTS_DATABASE.filter((t) => t.occasion === selectedOccasion);
    const pool = matching.length > 0 ? matching : TOASTS_DATABASE;
    // pick one that is not current
    const remaining = pool.filter((t) => t.id !== activeToast.id);
    const next = remaining.length > 0 ? remaining[Math.floor(Math.random() * remaining.length)] : pool[0];
    setActiveToast(next);
  };

  const handleCopy = () => {
    const text = isUa
      ? `🥂 ${activeToast.title}\n\n${activeToast.text}\n\n👉 ${activeToast.punchline}\n(Напій: ${activeToast.suggestedDrink || 'Улюблений келих'})`
      : `🥂 ${activeToast.titleEn || activeToast.title}\n\n${activeToast.textEn || activeToast.text}\n\n👉 ${activeToast.punchlineEn || activeToast.punchline}\n(Drink: ${activeToast.suggestedDrinkEn || activeToast.suggestedDrink || 'Your favorite glass'})`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="toasts-section" className="py-12 px-4 sm:px-6 max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-2">
          <MessageSquareQuote className="w-3.5 h-3.5" />
          {isUa ? 'Майстерність Застілля' : 'Toast Crafting'}
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-['Unbounded'] tracking-tight">
          {isUa ? 'Генератор Тостів (На Всі Випадки Життя)' : 'Toast Generator (For Every Occasion)'}
        </h2>
        <p className="mt-2 text-stone-400 text-sm sm:text-base">
          {isUa
            ? 'Від іскрометного сарказму до глибоких слів за Перемогу. Обирай привід і дивуй компанію красномовством!'
            : 'From sparkling witty banter to solemn toasts to Victory. Choose your vibe and inspire the room!'}
        </p>
      </div>

      {/* Main Toast Generator Box */}
      <div className="rounded-3xl bg-stone-900 border border-stone-800 p-6 sm:p-8 shadow-2xl space-y-6">
        {/* Step 1: Occasion Pills */}
        <div>
          <label className="block text-xs font-bold text-stone-400 uppercase tracking-wider mb-3">
            {isUa ? '1. Обери привід для тосту:' : '1. Select occasion:'}
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {occasions.map((occ) => {
              const Icon = occ.icon;
              const isSelected = selectedOccasion === occ.key;
              return (
                <button
                  key={occ.key}
                  onClick={() => setSelectedOccasion(occ.key)}
                  className={`p-3 rounded-2xl text-xs font-semibold flex items-center gap-2 border transition-all text-left ${
                    isSelected
                      ? 'bg-amber-500 text-stone-950 border-amber-400 font-bold shadow-md shadow-amber-500/20'
                      : 'bg-stone-950 text-stone-300 border-stone-800 hover:border-stone-700'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{isUa ? occ.labelUa : occ.labelEn}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Tone & Custom Recipient */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">
              {isUa ? '2. Тональність тосту:' : '2. Desired tone:'}
            </label>
            <select
              value={selectedTone}
              onChange={(e) => setSelectedTone(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-200 text-xs sm:text-sm focus:outline-none focus:border-amber-500"
            >
              {tones.map((t) => (
                <option key={t.key} value={t.key}>
                  {isUa ? t.labelUa : t.labelEn}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">
              {isUa ? '3. Кому чи на честь кого? (опціонально):' : '3. Dedicated to (optional):'}
            </label>
            <input
              type="text"
              value={customRecipient}
              onChange={(e) => setCustomRecipient(e.target.value)}
              placeholder={isUa ? 'Наприклад: Олегу, коханій, колегам по IT...' : 'e.g. For Alex, my partner, devs...'}
              className="w-full px-4 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-200 placeholder-stone-600 text-xs sm:text-sm focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        {/* Generate and Browse Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="flex-1 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:brightness-110 text-stone-950 font-bold font-['Unbounded'] text-sm sm:text-base flex items-center justify-center gap-3 transition-all shadow-lg shadow-amber-500/20 active:scale-95 disabled:opacity-50 cursor-pointer"
          >
            <Sparkles className={`w-5 h-5 ${isGenerating ? 'animate-spin' : ''}`} />
            {isGenerating
              ? isUa ? 'ШІ складає красномовний тост...' : 'AI crafting words...'
              : isUa ? 'Згенерувати Авторський Тост' : 'Generate Custom Toast'}
          </button>
          <button
            onClick={handleNextRandomFromCategory}
            className="py-3.5 px-5 rounded-2xl bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 font-bold font-['Unbounded'] text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
          >
            <RefreshCw className="w-4 h-4 text-amber-400" />
            <span>{isUa ? 'Інший тост з бази' : 'Another from DB'}</span>
          </button>
        </div>

        {/* Display Active Toast Card */}
        {activeToast && (
          <div className="toast-display-card p-6 sm:p-7 rounded-2xl bg-stone-950 border-2 border-amber-500/40 relative shadow-inner animate-fadeIn">
            <div className="flex items-center justify-between mb-3 border-b border-stone-800 pb-3">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider font-['Unbounded']">
                {isUa ? activeToast.title : activeToast.titleEn || activeToast.title}
              </span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-900 border border-stone-800 text-stone-300 hover:text-white hover:border-amber-500 text-xs font-semibold transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">{isUa ? 'Скопійовано!' : 'Copied!'}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>{isUa ? 'Скопіювати' : 'Copy'}</span>
                  </>
                )}
              </button>
            </div>

            <p className="text-sm sm:text-base text-stone-200 leading-relaxed font-serif italic mb-4">
              "{isUa ? activeToast.text : activeToast.textEn || activeToast.text}"
            </p>

            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 font-bold text-xs sm:text-sm mb-3">
              🎯 {isUa ? activeToast.punchline : activeToast.punchlineEn || activeToast.punchline}
            </div>

            {activeToast.suggestedDrink && (
              <div className="text-xs text-stone-400 flex items-center gap-2">
                <Wine className="w-3.5 h-3.5 text-amber-400" />
                <span>{isUa ? 'Ідеальний келих під цей тост: ' : 'Recommended glass: '}</span>
                <span className="text-stone-300 font-medium">
                  {isUa ? activeToast.suggestedDrink : activeToast.suggestedDrinkEn || activeToast.suggestedDrink}
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
