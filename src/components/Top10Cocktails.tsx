import React, { useState } from 'react';
import { COCKTAILS_DATABASE } from '../data/cocktails';
import { CocktailItem, Language } from '../types';
import { Trophy, Award, Star, Wine, ArrowRight, Flame, Sparkles, Utensils, Eye } from 'lucide-react';
import { playClinkSound } from '../utils/audio';

interface Props {
  language: Language;
  onOpenCocktailModal: (c: CocktailItem) => void;
}

export const Top10Cocktails: React.FC<Props> = ({ language, onOpenCocktailModal }) => {
  const isUa = language === 'uk';

  // Filter top 10 cocktails from database and sort by their rank
  const top10List = COCKTAILS_DATABASE
    .filter((c) => Boolean(c.top10Rank || c.isTop10))
    .sort((a, b) => (a.top10Rank || 99) - (b.top10Rank || 99))
    .slice(0, 10);

  const [selectedCocktailId, setSelectedCocktailId] = useState<string>(top10List[0]?.id || 'negroni');

  const activeCocktail = top10List.find((c) => c.id === selectedCocktailId) || top10List[0];

  const handleCardClick = (item: CocktailItem) => {
    setSelectedCocktailId(item.id);
    playClinkSound();
    onOpenCocktailModal(item);
  };

  return (
    <section id="top10-section" className="py-12 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-2">
          <Trophy className="w-3.5 h-3.5" />
          {isUa ? 'Світовий Зал Слави' : 'World Hall of Fame'}
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-['Unbounded'] tracking-tight">
          {isUa ? 'Топ-10 Найпопулярніших Коктейлів Світу' : 'Top 10 Most Iconic Cocktails on Earth'}
        </h2>
        <p className="mt-2 text-stone-400 text-sm sm:text-base">
          {isUa
            ? 'Золотий фонд світової міксології за версією Drinks International. Натисніть на будь-який коктейль, щоб відкрити рецепт та ідеальні закуски.'
            : 'The definitive gold standard of global bar culture. Click any cocktail to open recipe & food pairings.'}
        </p>
      </div>

      {/* Top 3 Podium Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 items-end">
        {/* #2 Rank */}
        {top10List[1] && (
          <div
            onClick={() => handleCardClick(top10List[1])}
            className="group cursor-pointer rounded-3xl p-6 border transition-all duration-300 relative overflow-hidden bg-stone-900/80 border-stone-800 hover:border-amber-400 hover:shadow-xl hover:shadow-amber-500/20 hover:scale-[1.02]"
          >
            <div className="absolute top-4 right-4 flex items-center justify-center w-10 h-10 rounded-2xl bg-stone-300 text-stone-950 font-black font-['Unbounded'] text-lg shadow-lg z-10">
              #2
            </div>
            <div className="h-44 rounded-2xl overflow-hidden mb-4 bg-stone-950 relative">
              <img
                src={top10List[1].image}
                alt={top10List[1].name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-amber-300 font-bold font-['Unbounded'] text-xs">
                <Eye className="w-4 h-4" />
                {isUa ? 'Відкрити рецепт' : 'Open Recipe'}
              </div>
            </div>
            <h4 className="text-xl font-bold text-white font-['Unbounded'] group-hover:text-amber-400 transition-colors">
              {isUa ? top10List[1].name : top10List[1].nameEn}
            </h4>
            <p className="text-xs text-stone-400 mt-1 line-clamp-2">
              {isUa
                ? (top10List[1].description || top10List[1].emotionalReason || top10List[1].history)
                : (top10List[1].descriptionEn || top10List[1].emotionalReasonEn || top10List[1].historyEn)}
            </p>
            <div className="mt-3 flex items-center gap-1.5 text-amber-400 text-xs font-semibold">
              <Utensils className="w-3.5 h-3.5" />
              <span>{isUa ? 'З закусками та їжею' : 'With Food Pairings'}</span>
            </div>
          </div>
        )}

        {/* #1 Rank (Champion) */}
        {top10List[0] && (
          <div
            onClick={() => handleCardClick(top10List[0])}
            className="group cursor-pointer rounded-3xl p-7 border-2 transition-all duration-300 relative overflow-hidden md:-translate-y-4 shadow-2xl bg-gradient-to-b from-stone-900 via-stone-900 to-stone-950 border-amber-500/80 hover:border-amber-400 hover:shadow-amber-500/30 hover:scale-[1.03]"
          >
            <div className="absolute top-4 right-4 flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-300 text-stone-950 font-black font-['Unbounded'] text-xl shadow-xl animate-pulse z-10">
              #1
            </div>
            <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold uppercase tracking-wider mb-2">
              <Trophy className="w-3 h-3 text-amber-400" />
              {isUa ? 'Абсолютний Лідер Світу' : 'World Champion #1'}
            </div>
            <div className="h-52 rounded-2xl overflow-hidden mb-4 bg-stone-950 relative">
              <img
                src={top10List[0].image}
                alt={top10List[0].name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-amber-300 font-bold font-['Unbounded'] text-xs">
                <Eye className="w-4 h-4" />
                {isUa ? 'Відкрити рецепт та закуски' : 'Open Recipe & Pairings'}
              </div>
            </div>
            <h4 className="text-2xl font-black text-amber-400 font-['Unbounded']">
              {isUa ? top10List[0].name : top10List[0].nameEn}
            </h4>
            <p className="text-xs sm:text-sm text-stone-300 mt-1 line-clamp-2">
              {isUa
                ? (top10List[0].description || top10List[0].emotionalReason || top10List[0].history)
                : (top10List[0].descriptionEn || top10List[0].emotionalReasonEn || top10List[0].historyEn)}
            </p>
            <div className="mt-4 flex items-center justify-between text-xs">
              <span className="text-stone-400">{top10List[0].abv}% ABV</span>
              <span className="text-amber-300 font-semibold flex items-center gap-1">
                <Utensils className="w-3.5 h-3.5" />
                {isUa ? 'Гастрономічний пейринг' : 'Gastronomic Pairing'}
              </span>
            </div>
          </div>
        )}

        {/* #3 Rank */}
        {top10List[2] && (
          <div
            onClick={() => handleCardClick(top10List[2])}
            className="group cursor-pointer rounded-3xl p-6 border transition-all duration-300 relative overflow-hidden bg-stone-900/80 border-stone-800 hover:border-amber-400 hover:shadow-xl hover:shadow-amber-500/20 hover:scale-[1.02]"
          >
            <div className="absolute top-4 right-4 flex items-center justify-center w-10 h-10 rounded-2xl bg-amber-700 text-amber-100 font-black font-['Unbounded'] text-lg shadow-lg z-10">
              #3
            </div>
            <div className="h-44 rounded-2xl overflow-hidden mb-4 bg-stone-950 relative">
              <img
                src={top10List[2].image}
                alt={top10List[2].name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-amber-300 font-bold font-['Unbounded'] text-xs">
                <Eye className="w-4 h-4" />
                {isUa ? 'Відкрити рецепт' : 'Open Recipe'}
              </div>
            </div>
            <h4 className="text-xl font-bold text-white font-['Unbounded'] group-hover:text-amber-400 transition-colors">
              {isUa ? top10List[2].name : top10List[2].nameEn}
            </h4>
            <p className="text-xs text-stone-400 mt-1 line-clamp-2">
              {isUa
                ? (top10List[2].description || top10List[2].emotionalReason || top10List[2].history)
                : (top10List[2].descriptionEn || top10List[2].emotionalReasonEn || top10List[2].historyEn)}
            </p>
            <div className="mt-3 flex items-center gap-1.5 text-amber-400 text-xs font-semibold">
              <Utensils className="w-3.5 h-3.5" />
              <span>{isUa ? 'З закусками та їжею' : 'With Food Pairings'}</span>
            </div>
          </div>
        )}
      </div>

      {/* Ranks 4 to 10 Quick Grid */}
      <div className="rounded-3xl bg-stone-900 border border-stone-800 p-6 sm:p-8 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider font-['Unbounded']">
            {isUa ? 'Позиції з #4 по #10 (натисніть, щоб відкрити):' : 'Positions #4 through #10 (click to view):'}
          </h4>
          <span className="text-xs text-amber-400 font-mono">100% IBA Classics</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {top10List.slice(3).map((item, idx) => {
            const rank = idx + 4;
            return (
              <div
                key={item.id}
                onClick={() => handleCardClick(item)}
                className="group p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 bg-stone-950/60 border-stone-800 hover:border-amber-400 hover:bg-stone-950 hover:shadow-lg hover:shadow-amber-500/10"
              >
                <span className="font-mono font-black text-sm text-amber-400 w-7">
                  #{rank}
                </span>
                <div className="w-14 h-14 rounded-xl overflow-hidden bg-stone-900 shrink-0 relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold font-['Unbounded'] truncate text-white group-hover:text-amber-400 transition-colors">
                    {isUa ? item.name : item.nameEn}
                  </div>
                  <div className="text-[10px] text-stone-400">{item.abv}% ABV • {item.type}</div>
                  <div className="text-[10px] text-amber-300/80 flex items-center gap-1 mt-0.5">
                    <Utensils className="w-2.5 h-2.5" />
                    <span>{isUa ? 'Пейринг закусок' : 'Food pairing'}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
