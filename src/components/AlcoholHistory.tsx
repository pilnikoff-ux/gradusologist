import React, { useState, useMemo } from 'react';
import { ALCOHOL_HISTORY_DATABASE } from '../data/alcoholHistory';
import { AlcoholProductionGroup, Language } from '../types';
import {
  BookOpen,
  Sparkles,
  Flame,
  History,
  Wine,
  Utensils,
  Search,
  GlassWater,
  Wheat,
  Globe2,
  HeartHandshake
} from 'lucide-react';
import { playClinkSound } from '../utils/audio';

interface Props {
  language: Language;
}

export const AlcoholHistory: React.FC<Props> = ({ language }) => {
  const isUa = language === 'uk';
  const [selectedGroup, setSelectedGroup] = useState<AlcoholProductionGroup | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeItemKey, setActiveItemKey] = useState<string>('beer');

  const categories: { id: AlcoholProductionGroup | 'all'; labelUa: string; labelEn: string; count: number }[] = useMemo(() => [
    { id: 'all', labelUa: 'Всі категорії', labelEn: 'All Types', count: ALCOHOL_HISTORY_DATABASE.length },
    { id: 'fermented', labelUa: '1. Зброджені (3–20%)', labelEn: '1. Fermented (3-20%)', count: ALCOHOL_HISTORY_DATABASE.filter(d => d.productionGroup === 'fermented').length },
    { id: 'distilled', labelUa: '2. Дистильовані (35–70%+)', labelEn: '2. Distilled (35-70%+)', count: ALCOHOL_HISTORY_DATABASE.filter(d => d.productionGroup === 'distilled').length },
    { id: 'fortified', labelUa: '3. Кріплені вина (15–22%)', labelEn: '3. Fortified Wines', count: ALCOHOL_HISTORY_DATABASE.filter(d => d.productionGroup === 'fortified').length },
    { id: 'liqueurs', labelUa: '4. Лікери та настоянки', labelEn: '4. Liqueurs & Amari', count: ALCOHOL_HISTORY_DATABASE.filter(d => d.productionGroup === 'liqueurs').length },
    { id: 'regional', labelUa: '5. Регіональні напої', labelEn: '5. Regional & Heritage', count: ALCOHOL_HISTORY_DATABASE.filter(d => d.productionGroup === 'regional').length },
  ], []);

  const filteredSpirits = useMemo(() => {
    return ALCOHOL_HISTORY_DATABASE.filter((spirit) => {
      const matchesGroup = selectedGroup === 'all' || spirit.productionGroup === selectedGroup;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q ||
        spirit.name.toLowerCase().includes(q) ||
        spirit.nameEn.toLowerCase().includes(q) ||
        spirit.rawMaterial.toLowerCase().includes(q) ||
        spirit.originCountry.toLowerCase().includes(q) ||
        spirit.history.toLowerCase().includes(q);
      return matchesGroup && matchesSearch;
    });
  }, [selectedGroup, searchQuery]);

  // Keep active spirit valid
  const currentSpirit = useMemo(() => {
    const found = filteredSpirits.find((s) => s.id === activeItemKey);
    return found || filteredSpirits[0] || ALCOHOL_HISTORY_DATABASE[0];
  }, [filteredSpirits, activeItemKey]);

  return (
    <section id="history-section" className="py-12 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
          <BookOpen className="w-3.5 h-3.5" />
          {isUa ? 'Енциклопедія Алкогольних Напоїв та Культури' : 'Encyclopedia of Spirits, Wine & Culture'}
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-['Unbounded'] tracking-tight">
          {isUa ? 'Типи Алкоголю, Історія та Культура Вживання' : 'Types of Alcohol, History & Drinking Culture'}
        </h2>
        <p className="mt-2 text-stone-300 text-sm sm:text-base leading-relaxed">
          {isUa
            ? 'Повна класифікація напоїв за способом виробництва: від стародавнього бродіння без перегонки до мідних аламбіків, кріплених вин, монастирських лікерів та регіональних перлин.'
            : 'Complete classification by production method: fermented grains, distilled pot stills, fortified wines, botanical amari, and regional treasures.'}
        </p>
      </div>

      {/* Production Group Tabs (User-specified classification) */}
      <div className="flex flex-wrap gap-2 justify-center mb-6">
        {categories.map((cat) => {
          const isActive = selectedGroup === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedGroup(cat.id);
                playClinkSound();
              }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all border shadow-xs cursor-pointer ${
                isActive
                  ? 'bg-amber-500 text-stone-950 font-bold border-amber-400 shadow-lg shadow-amber-500/20 scale-[1.02]'
                  : 'bg-stone-900/90 hover:bg-stone-800/80 text-stone-300 hover:text-white border-stone-800 hover:border-amber-400/50'
              }`}
            >
              <span>{isUa ? cat.labelUa : cat.labelEn}</span>
              <span className={`ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] ${isActive ? 'bg-stone-950/20 text-stone-950 font-black' : 'bg-stone-800 text-stone-400 border border-stone-700/50'}`}>
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Search Bar */}
      <div className="max-w-md mx-auto mb-6 relative">
        <Search className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={isUa ? 'Пошук напою, сировини чи країни (напр. рис, мед, агава)...' : 'Search beverage, raw material or country...'}
          className="w-full pl-9 pr-4 py-2.5 rounded-2xl text-xs sm:text-sm bg-stone-950/90 border border-stone-800 text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/30 transition-colors shadow-inner"
        />
      </div>

      {/* Individual Drink Buttons */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {filteredSpirits.map((spirit) => {
          const isSelected = spirit.id === currentSpirit?.id;
          return (
            <button
              key={spirit.id}
              onClick={() => {
                setActiveItemKey(spirit.id);
                playClinkSound();
              }}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all border flex items-center gap-1.5 cursor-pointer shadow-xs ${
                isSelected
                  ? 'bg-amber-500 text-stone-950 border-amber-400 font-bold shadow-lg shadow-amber-500/25 scale-105'
                  : 'bg-stone-900/90 hover:bg-stone-800/80 text-stone-300 hover:text-white border-stone-800 hover:border-amber-400/50'
              }`}
            >
              <span>{isUa ? spirit.name.split('(')[0].trim() : spirit.nameEn.split('(')[0].trim()}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${isSelected ? 'bg-stone-950/20 text-stone-950 font-black' : 'bg-stone-950 text-amber-400/90 border border-stone-800'}`}>
                {spirit.abvRange}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Encyclopedia Detailed Card */}
      {currentSpirit && (
        <div className="rounded-3xl bg-stone-900/90 backdrop-blur-md border border-stone-800 p-6 sm:p-8 shadow-2xl shadow-black/50 space-y-8 text-stone-100 transition-colors">
          {/* Top Classification Header */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-800 pb-4">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300 text-xs font-bold uppercase tracking-wider">
                {isUa ? currentSpirit.productionGroupTitleUa : currentSpirit.productionGroupTitleEn}
              </span>
              {currentSpirit.subType && (
                <span className="text-xs text-stone-400 font-medium">
                  {isUa ? `Стилі: ${currentSpirit.subType}` : `Styles: ${currentSpirit.subTypeEn || currentSpirit.subType}`}
                </span>
              )}
            </div>
            <div className="text-xs font-mono font-bold text-amber-400">
              Міцність: {currentSpirit.abvRange}
            </div>
          </div>

          {/* Top Header with Image & Story */}
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="w-full md:w-72 h-56 rounded-2xl overflow-hidden bg-stone-950 shrink-0 relative border border-stone-800 shadow-lg">
              <img
                src={currentSpirit.image}
                alt={currentSpirit.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded bg-black/85 text-[11px] font-mono text-amber-300 font-bold backdrop-blur-xs border border-stone-800">
                {currentSpirit.originCountry}
              </div>
            </div>

            <div className="flex-1 space-y-3">
              <div className="flex flex-wrap gap-2 items-center">
                <span className="px-2.5 py-1 rounded-lg bg-amber-950/40 text-amber-300 text-xs font-bold flex items-center gap-1.5 border border-amber-500/30">
                  <Globe2 className="w-3.5 h-3.5" />
                  {isUa ? currentSpirit.originCountry : currentSpirit.originCountryEn}
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-stone-950/80 text-stone-300 text-xs font-mono border border-stone-800">
                  ⏳ {isUa ? currentSpirit.originCentury : currentSpirit.originCenturyEn}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white font-['Unbounded']">
                {isUa ? currentSpirit.name : currentSpirit.nameEn}
              </h3>
              <p className="text-sm text-amber-400 italic font-medium">
                {isUa ? currentSpirit.shortTagline : currentSpirit.shortTaglineEn}
              </p>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                {isUa ? currentSpirit.history : currentSpirit.historyEn}
              </p>
            </div>
          </div>

          {/* Raw Materials Banner */}
          <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30 flex items-start gap-3">
            <Wheat className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-xs font-bold text-amber-300 uppercase tracking-wider block mb-0.5">
                {isUa ? 'Базова сировина:' : 'Primary Raw Materials:'}
              </span>
              <p className="text-xs sm:text-sm font-semibold text-stone-200">
                {isUa ? currentSpirit.rawMaterial : currentSpirit.rawMaterialEn}
              </p>
            </div>
          </div>

          {/* Cultural Rituals & Etiquette */}
          {currentSpirit.culturalRituals && (
            <div className="p-5 rounded-2xl bg-stone-950/80 border border-stone-800 space-y-2">
              <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5 font-['Unbounded']">
                <HeartHandshake className="w-4 h-4 text-amber-400" />
                {isUa ? 'Культурні ритуали, тости та традиції споживання:' : 'Cultural Rituals, Toasts & Traditions:'}
              </h4>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                {isUa ? currentSpirit.culturalRituals : currentSpirit.culturalRitualsEn}
              </p>
            </div>
          )}

          {/* Milestones Timeline */}
          <div>
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-4 flex items-center gap-2 font-['Unbounded']">
              <History className="w-4 h-4" />
              {isUa ? 'Ключові історичні віхи:' : 'Key Historical Milestones:'}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {currentSpirit.keyMilestones.map((m, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-stone-950/80 border border-stone-800">
                  <div className="text-base font-black text-amber-400 font-mono mb-1">{m.year}</div>
                  <p className="text-xs text-stone-300 leading-relaxed">
                    {isUa ? m.event : m.eventEn}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Production & How to Drink */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-stone-950/80 border border-stone-800 space-y-2">
              <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5 font-['Unbounded']">
                <Flame className="w-4 h-4 text-amber-400" />
                {isUa ? 'Технологія виробництва:' : 'Distillation / Fermentation Method:'}
              </h4>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                {isUa ? currentSpirit.productionMethod : currentSpirit.productionMethodEn}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-stone-950/80 border border-stone-800 space-y-2">
              <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5 font-['Unbounded']">
                <Wine className="w-4 h-4 text-amber-400" />
                {isUa ? 'Як правильно подавати та пити:' : 'Service & Glassware Etiquette:'}
              </h4>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                {isUa ? currentSpirit.howToDrink : currentSpirit.howToDrinkEn}
              </p>
            </div>
          </div>

          {/* Food Pairings & Snacks */}
          {currentSpirit.foodPairing && (
            <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/30">
              <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-2 flex items-center gap-2 font-['Unbounded']">
                <Utensils className="w-4 h-4 text-amber-400" />
                {isUa ? 'Гастрономічний пейринг & Їжа:' : 'Gastronomic Pairing & Food:'}
              </h4>
              <p className="text-xs sm:text-sm text-stone-200 leading-relaxed mb-4 font-medium">
                {isUa ? currentSpirit.foodPairing : currentSpirit.foodPairingEn}
              </p>

              {currentSpirit.idealSnacks && currentSpirit.idealSnacks.length > 0 && (
                <div>
                  <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider block mb-2">
                    {isUa ? 'Рекомендовані закуски:' : 'Recommended snacks & appetizers:'}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {(isUa ? currentSpirit.idealSnacks : currentSpirit.idealSnacksEn || currentSpirit.idealSnacks).map(
                      (snack, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1.5 rounded-xl bg-stone-950 border border-amber-500/30 text-xs font-semibold text-stone-200 shadow-xs"
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

          {/* Fun facts */}
          <div className="p-5 rounded-2xl bg-stone-950/80 border border-stone-800">
            <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-3 flex items-center gap-1.5 font-['Unbounded']">
              <Sparkles className="w-4 h-4 text-amber-400" />
              {isUa ? 'Цікаві факти та секрети:' : 'Fascinating Lore & Secrets:'}
            </div>
            <ul className="space-y-2 text-xs text-stone-300">
              {(isUa ? currentSpirit.funFacts : currentSpirit.funFactsEn).map((fact, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="text-amber-400 text-sm">✦</span>
                  <span className="leading-relaxed">{fact}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
};
