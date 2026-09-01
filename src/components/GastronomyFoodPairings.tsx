import React, { useState } from 'react';
import { FOOD_PAIRINGS_DATABASE } from '../data/foodPairings';
import { FoodPairingItem, Language } from '../types';
import { Utensils, Flame, Sparkles, Wine, Sun, CheckCircle, XCircle, Lightbulb } from 'lucide-react';
import { playClinkSound } from '../utils/audio';

interface Props {
  language: Language;
}

export const GastronomyFoodPairings: React.FC<Props> = ({ language }) => {
  const isUa = language === 'uk';
  const [activeCategoryId, setActiveCategoryId] = useState<string>(FOOD_PAIRINGS_DATABASE[0].id);

  const currentPairing = FOOD_PAIRINGS_DATABASE.find((p) => p.id === activeCategoryId) || FOOD_PAIRINGS_DATABASE[0];

  return (
    <section id="food-pairings-section" className="py-12 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-2">
          <Utensils className="w-3.5 h-3.5" />
          {isUa ? 'Гастрономічний Пейринг' : 'Food & Spirit Pairing'}
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-['Unbounded'] tracking-tight">
          {isUa ? 'Чим Закушувати: Ідеальний Гастрономічний Баланс' : 'Food Pairing & Appetizer Codex'}
        </h2>
        <p className="mt-2 text-stone-400 text-sm sm:text-base">
          {isUa
            ? 'Які страви підкреслюють букет напою, які закуски рятують від сп\'яніння і яких помилок уникати.'
            : 'Culinary harmonies that elevate tasting bouquets, optimal snacks, and disastrous food clashes.'}
        </p>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2.5 justify-center mb-8">
        {FOOD_PAIRINGS_DATABASE.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setActiveCategoryId(item.id);
              playClinkSound();
            }}
            className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-300 border ${
              activeCategoryId === item.id
                ? 'bg-amber-500 text-stone-950 border-amber-400 font-bold shadow-lg shadow-amber-500/20 scale-105'
                : 'bg-stone-900 text-stone-400 border-stone-800 hover:border-stone-700'
            }`}
          >
            {isUa ? item.category : item.categoryEn}
          </button>
        ))}
      </div>

      {/* Main Pairing Card */}
      <div className="rounded-3xl bg-stone-900 border border-stone-800 p-6 sm:p-8 shadow-2xl space-y-6">
        <h3 className="text-xl sm:text-2xl font-black text-white font-['Unbounded'] border-b border-stone-800 pb-3">
          {isUa ? currentPairing.category : currentPairing.categoryEn}
        </h3>

        {/* 3 Columns: Best Dishes / Ideal Snacks / Worst Mistakes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Best Dishes */}
          <div className="p-5 rounded-2xl bg-stone-950 border border-stone-800">
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-3 flex items-center gap-1.5 font-['Unbounded']">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              {isUa ? 'Основні гарячі страви:' : 'Best Main Courses:'}
            </h4>
            <ul className="space-y-2 text-xs text-stone-300">
              {(isUa ? currentPairing.bestDishes : currentPairing.bestDishesEn).map((dish, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-amber-400">•</span>
                  <span>{dish}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Ideal Snacks */}
          <div className="p-5 rounded-2xl bg-stone-950 border border-stone-800">
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-3 flex items-center gap-1.5 font-['Unbounded']">
              <Sparkles className="w-4 h-4 text-amber-400" />
              {isUa ? 'Ідеальні холодні закуски:' : 'Ideal Finger Snacks:'}
            </h4>
            <ul className="space-y-2 text-xs text-stone-300">
              {(isUa ? currentPairing.idealSnacks : currentPairing.idealSnacksEn).map((snack, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-amber-400">•</span>
                  <span>{snack}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Worst Mistakes */}
          <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-900/40">
            <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wider mb-3 flex items-center gap-1.5 font-['Unbounded']">
              <XCircle className="w-4 h-4 text-rose-400" />
              {isUa ? 'Фатальні гастро-помилки:' : 'Disastrous Food Clashes:'}
            </h4>
            <ul className="space-y-2 text-xs text-stone-300">
              {(isUa ? currentPairing.worstMistakes : currentPairing.worstMistakesEn).map((mistake, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-rose-400">✖</span>
                  <span>{mistake}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Sommelier Rule Callout */}
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
          <Lightbulb className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <div className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-1">
              {isUa ? 'Золоте правило шеф-сомельє:' : 'Master Sommelier Golden Rule:'}
            </div>
            <p className="text-xs text-stone-300 leading-relaxed">
              {isUa ? currentPairing.sommelierRule : currentPairing.sommelierRuleEn}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
