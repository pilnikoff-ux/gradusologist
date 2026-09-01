import React, { useState } from 'react';
import { ALCOHOL_HISTORY_DATABASE } from '../data/alcoholHistory';
import { AlcoholHistoryItem, Language } from '../types';
import { BookOpen, Sparkles, Flame, History, Globe, Compass, Wine, CheckCircle2, Award, Utensils } from 'lucide-react';
import { playClinkSound } from '../utils/audio';

interface Props {
  language: Language;
}

export const AlcoholHistory: React.FC<Props> = ({ language }) => {
  const isUa = language === 'uk';
  const [activeItemKey, setActiveItemKey] = useState<string>(ALCOHOL_HISTORY_DATABASE[0].id);

  const currentSpirit =
    ALCOHOL_HISTORY_DATABASE.find((s) => s.id === activeItemKey) ||
    ALCOHOL_HISTORY_DATABASE[0];

  return (
    <section id="history-section" className="py-12 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-2">
          <BookOpen className="w-3.5 h-3.5" />
          {isUa ? 'Історичний Літопис & Енциклопедія' : 'Chronicles of Spirits & Wine'}
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-['Unbounded'] tracking-tight">
          {isUa ? 'Історія Алкогольних Напоїв (За Фільтром)' : 'History of Spirits, Wine & Fermentation'}
        </h2>
        <p className="mt-2 text-stone-400 text-sm sm:text-base">
          {isUa
            ? 'Від 8000-річного вина та козацької оковити до карибського рому і мексиканської агави. Обирайте напій для повної історії та гастрономічного пейрингу.'
            : 'From 8000-year-old viticulture and Cossack spirits to Caribbean rums and Oaxaca agaves.'}
        </p>
      </div>

      {/* Spirit Category Filter Buttons */}
      <div className="flex flex-wrap gap-2.5 justify-center mb-8">
        {ALCOHOL_HISTORY_DATABASE.map((spirit) => {
          const isSelected = spirit.id === activeItemKey;
          return (
            <button
              key={spirit.id}
              onClick={() => {
                setActiveItemKey(spirit.id);
                playClinkSound();
              }}
              className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-300 border ${
                isSelected
                  ? 'bg-amber-500 text-stone-950 border-amber-400 font-bold shadow-lg shadow-amber-500/20 scale-105'
                  : 'bg-stone-900 text-stone-300 border-stone-800 hover:border-stone-700'
              }`}
            >
              {isUa ? spirit.name.split('(')[0] : spirit.nameEn.split('(')[0]}
            </button>
          );
        })}
      </div>

      {/* Main Encyclopedia Card */}
      <div className="rounded-3xl bg-stone-900 border border-stone-800 p-6 sm:p-8 shadow-2xl space-y-8">
        {/* Top Header with Image */}
        <div className="flex flex-col md:flex-row gap-6 items-center border-b border-stone-800 pb-6">
          <div className="w-full md:w-64 h-48 rounded-2xl overflow-hidden bg-stone-950 shrink-0 relative">
            <img
              src={currentSpirit.image}
              alt={currentSpirit.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded bg-black/80 text-[11px] font-mono text-amber-400 font-bold">
              {currentSpirit.abvRange}
            </div>
          </div>

          <div className="flex-1">
            <div className="flex flex-wrap gap-2 items-center mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase">
                {isUa ? currentSpirit.originCountry : currentSpirit.originCountryEn}
              </span>
              <span className="text-xs text-stone-400 font-mono">
                ⏳ {isUa ? currentSpirit.originCentury : currentSpirit.originCenturyEn}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-white font-['Unbounded']">
              {isUa ? currentSpirit.name : currentSpirit.nameEn}
            </h3>
            <p className="text-xs sm:text-sm text-amber-300 italic mt-1 mb-3">
              {isUa ? currentSpirit.shortTagline : currentSpirit.shortTaglineEn}
            </p>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              {isUa ? currentSpirit.history : currentSpirit.historyEn}
            </p>
          </div>
        </div>

        {/* Milestones Timeline */}
        <div>
          <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-4 flex items-center gap-2 font-['Unbounded']">
            <History className="w-4 h-4" />
            {isUa ? 'Ключові історичні віхи:' : 'Key Historical Milestones:'}
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {currentSpirit.keyMilestones.map((m, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-stone-950 border border-stone-800">
                <div className="text-base font-black text-amber-400 font-mono mb-1">{m.year}</div>
                <p className="text-xs text-stone-300 leading-relaxed">
                  {isUa ? m.event : m.eventEn}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Food Pairings & Snacks */}
        {currentSpirit.foodPairing && (
          <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-500/10 via-stone-950 to-amber-500/5 border border-amber-500/30">
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-2 font-['Unbounded']">
              <Utensils className="w-4 h-4 text-amber-400" />
              {isUa ? 'Гастрономічний пейринг & Їжа:' : 'Gastronomic Pairing & Food:'}
            </h4>
            <p className="text-xs sm:text-sm text-stone-200 leading-relaxed mb-4">
              {isUa ? currentSpirit.foodPairing : currentSpirit.foodPairingEn}
            </p>

            {currentSpirit.idealSnacks && currentSpirit.idealSnacks.length > 0 && (
              <div>
                <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider block mb-2">
                  {isUa ? 'Рекомендовані закуски:' : 'Recommended snacks & dishes:'}
                </span>
                <div className="flex flex-wrap gap-2">
                  {(isUa ? currentSpirit.idealSnacks : currentSpirit.idealSnacksEn || currentSpirit.idealSnacks).map(
                    (snack, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 rounded-xl bg-stone-900/90 border border-amber-500/20 text-xs text-stone-200"
                      >
                        🍴 {snack}
                      </span>
                    )
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Production & How to Drink */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 rounded-2xl bg-stone-950 border border-stone-800 space-y-2">
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5 font-['Unbounded']">
              <Flame className="w-4 h-4 text-amber-400" />
              {isUa ? 'Технологія виробництва:' : 'Distillation Method:'}
            </h4>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              {isUa ? currentSpirit.productionMethod : currentSpirit.productionMethodEn}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-stone-950 border border-stone-800 space-y-2">
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5 font-['Unbounded']">
              <Wine className="w-4 h-4 text-amber-400" />
              {isUa ? 'Культура споживання:' : 'How to Taste & Serve:'}
            </h4>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              {isUa ? currentSpirit.howToDrink : currentSpirit.howToDrinkEn}
            </p>
          </div>
        </div>

        {/* Fun facts */}
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30">
          <div className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-2 flex items-center gap-1.5 font-['Unbounded']">
            <Sparkles className="w-4 h-4 text-amber-400" />
            {isUa ? 'Цікаві факти та секрети:' : 'Fascinating Lore & Secrets:'}
          </div>
          <ul className="space-y-1.5 text-xs text-stone-300">
            {(isUa ? currentSpirit.funFacts : currentSpirit.funFactsEn).map((fact, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-amber-400">✦</span>
                <span>{fact}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
