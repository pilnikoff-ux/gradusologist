import React, { useState } from 'react';
import { EMOTIONS_LIST, EmotionMeta } from '../data/emotions';
import { COCKTAILS_DATABASE } from '../data/cocktails';
import { EmotionType, Language, CocktailItem } from '../types';
import { Sparkles, Brain, Flame, Info, Wine, ArrowRight, Heart, Utensils, Eye } from 'lucide-react';
import { playClinkSound } from '../utils/audio';

interface Props {
  language: Language;
  onOpenCocktailModal: (cocktail: CocktailItem) => void;
}

export const EmotionalBar: React.FC<Props> = ({ language, onOpenCocktailModal }) => {
  const isUa = language === 'uk';
  const [selectedEmotionId, setSelectedEmotionId] = useState<EmotionType>('joy');

  const selectedEmotion =
    EMOTIONS_LIST.find((e) => e.id === selectedEmotionId) || EMOTIONS_LIST[0];

  // Find cocktails matching emotional fit or recommended IDs
  const matchedCocktails = COCKTAILS_DATABASE.filter((c) => {
    if (c.emotionalFit?.includes(selectedEmotionId)) return true;
    if (selectedEmotion.recommendedIds?.includes(c.id)) return true;
    return false;
  });

  // Fallback to top 3 cocktails if none found
  const displayedCocktails =
    matchedCocktails.length > 0 ? matchedCocktails : COCKTAILS_DATABASE.slice(0, 3);

  return (
    <section id="emotions-section" className="py-12 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold uppercase tracking-wider mb-2">
          <Brain className="w-3.5 h-3.5" />
          {isUa ? 'Нейро-Міксологія & Емоційний Бар' : 'Neuro-Mixology & Emotional Bar'}
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-['Unbounded'] tracking-tight">
          {isUa ? 'Коктейль за Твоїм Емоційним Станом' : 'Mood-Driven Cocktail Selector'}
        </h2>
        <p className="mt-2 text-stone-400 text-sm sm:text-base">
          {isUa
            ? 'Обери, що ти відчуваєш просто зараз — програма автоматично підбере ідеальний коктейль, гастрономічний пейринг та розбір емоційного стану.'
            : 'Select what you feel right now — our sommelier algorithm automatically pairs the exact drink, food pairings, and emotional balance.'}
        </p>
      </div>

      {/* Emotion Selector Buttons Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mb-10">
        {EMOTIONS_LIST.map((emo) => {
          const isSelected = emo.id === selectedEmotionId;
          return (
            <button
              id={`emotion-btn-${emo.id}`}
              key={emo.id}
              onClick={() => {
                setSelectedEmotionId(emo.id);
                playClinkSound();
              }}
              className={`p-3.5 sm:p-4 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between relative overflow-hidden group cursor-pointer ${
                isSelected
                  ? 'bg-zinc-900 border-amber-400 shadow-xl shadow-amber-500/15 scale-[1.03] ring-1 ring-amber-400'
                  : 'bg-zinc-900/60 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-2">
                <span className="text-2xl group-hover:scale-110 transition-transform">
                  {emo.emoji}
                </span>
                {isSelected && (
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                )}
              </div>
              <div>
                <div
                  className={`text-xs sm:text-sm font-bold font-['Unbounded'] leading-snug transition-colors ${
                    isSelected ? 'text-amber-400' : 'text-stone-200'
                  }`}
                >
                  {isUa ? emo.labelUa : emo.labelEn}
                </div>
                <div className="text-[11px] text-stone-400 mt-1 line-clamp-1">
                  {isUa ? emo.taglineUa : emo.taglineEn}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Emotion Breakdown Card */}
      <div className="rounded-3xl bg-stone-900 border border-stone-800 p-6 sm:p-8 shadow-2xl mb-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-800 pb-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-stone-950 border border-stone-800 flex items-center justify-center text-3xl shrink-0">
              {selectedEmotion.emoji}
            </div>
            <div>
              <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                {isUa ? 'Діагностика емоційного фону:' : 'Diagnosed emotional state:'}
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white font-['Unbounded']">
                {isUa ? selectedEmotion.labelUa : selectedEmotion.labelEn}
              </h3>
              <p className="text-xs sm:text-sm text-stone-400 italic">
                "{isUa ? selectedEmotion.taglineUa : selectedEmotion.taglineEn}"
              </p>
            </div>
          </div>

          <div className="max-w-md p-3.5 rounded-2xl bg-stone-950/80 border border-stone-800 text-xs text-stone-300 leading-relaxed">
            <span className="font-bold text-amber-300 block mb-1">
              🧠 {isUa ? 'Нейро-фізіологічний розбір:' : 'Neuro-physiological mechanism:'}
            </span>
            {isUa
              ? selectedEmotion.psychologicalDescriptionUa
              : selectedEmotion.psychologicalDescriptionEn}
          </div>
        </div>

        {/* Sommelier Recommendation line */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-transparent border border-amber-500/30 flex items-start gap-3">
          <Wine className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-stone-200">
            <span className="font-bold text-amber-300 mr-1.5">
              {isUa ? 'Рекомендований барний профіль:' : 'Recommended Cocktail Profile:'}
            </span>
            {isUa ? selectedEmotion.cocktailVibeUa : selectedEmotion.cocktailVibeEn}
          </div>
        </div>
      </div>

      {/* Matched Cocktails Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm sm:text-base font-bold text-white font-['Unbounded'] flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            {isUa
              ? `Ідеальні коктейлі під цей настрій (${displayedCocktails.length})`
              : `Curated Matches (${displayedCocktails.length})`}
          </h4>
          <span className="text-xs text-stone-400">
            {isUa ? 'Натисніть на картку, щоб відкрити рецепт та закуски' : 'Click card for recipe & food pairings'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedCocktails.map((cocktail) => (
            <div
              key={cocktail.id}
              onClick={() => {
                playClinkSound();
                onOpenCocktailModal(cocktail);
              }}
              className="cursor-pointer rounded-3xl bg-stone-900 border border-stone-800 hover:border-amber-400 p-5 shadow-xl hover:shadow-amber-500/15 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="h-44 rounded-2xl overflow-hidden bg-stone-950 mb-4 relative">
                  <img
                    src={cocktail.image}
                    alt={cocktail.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 right-2 px-2.5 py-1 rounded-full bg-stone-950/85 backdrop-blur-md text-[10px] font-bold font-mono text-amber-400 border border-amber-500/30">
                    {cocktail.abv}% ABV
                  </div>
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-amber-300 font-bold font-['Unbounded'] text-xs">
                    <Eye className="w-4 h-4" />
                    {isUa ? 'Відкрити рецепт' : 'View Recipe'}
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2 mb-1">
                  <h5 className="text-base font-bold text-white font-['Unbounded'] group-hover:text-amber-400 transition-colors truncate">
                    {isUa ? cocktail.name : cocktail.nameEn}
                  </h5>
                  <span className="text-xs px-2 py-0.5 rounded-lg bg-stone-800 text-stone-300 font-semibold uppercase">
                    {cocktail.type}
                  </span>
                </div>

                <p className="text-xs text-stone-400 line-clamp-2 mt-1 mb-3">
                  {isUa
                    ? (cocktail.description || cocktail.emotionalReason)
                    : (cocktail.descriptionEn || cocktail.emotionalReasonEn)}
                </p>

                {cocktail.foodPairing && (
                  <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-200/90 flex items-center gap-1.5 mb-2 line-clamp-1">
                    <Utensils className="w-3 h-3 text-amber-400 shrink-0" />
                    <span className="truncate">{isUa ? cocktail.foodPairing : cocktail.foodPairingEn}</span>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-stone-800 flex items-center justify-between text-xs">
                <span className="text-amber-400 font-medium flex items-center gap-1">
                  <Utensils className="w-3.5 h-3.5" />
                  {isUa ? 'Рецепт + Закуски' : 'Recipe + Food Pairing'}
                </span>
                <ArrowRight className="w-4 h-4 text-stone-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
