import React, { useState, useMemo } from 'react';
import { COCKTAILS_DATABASE } from '../data/cocktails';
import { CocktailItem, Language } from '../types';
import {
  Search,
  Filter,
  Wine,
  Flame,
  Sparkles,
  Award,
  BookOpen,
  Heart,
  Utensils,
  Eye,
  Check,
  Share2,
  Compass
} from 'lucide-react';
import { playClinkSound } from '../utils/audio';
import { smartTextMatch, convertKeyboardLayout } from '../utils/searchHelper';
import { CocktailModal } from './CocktailModal';

interface Props {
  language: Language;
  onSelectCocktail?: (c: CocktailItem) => void;
  onOpenCocktailModal?: (c: CocktailItem) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}

export const CocktailCatalog: React.FC<Props> = ({
  language,
  onOpenCocktailModal,
  favorites,
  onToggleFavorite
}) => {
  const isUa = language === 'uk';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCollection, setSelectedCollection] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedBase, setSelectedBase] = useState<string>('all');
  const [selectedStrength, setSelectedStrength] = useState<string>('all');
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [activeModalCocktail, setActiveModalCocktail] = useState<CocktailItem | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const collections = useMemo(() => [
    { id: 'all', labelUa: 'Всі джерела', labelEn: 'All Sources', count: COCKTAILS_DATABASE.length },
    { id: 'savoy', labelUa: 'The Savoy Book (1930)', labelEn: 'The Savoy Book (1930)', count: COCKTAILS_DATABASE.filter(c => c.collection === 'savoy' || c.history?.includes('Savoy') || c.historyEn?.includes('Savoy')).length },
    { id: 'difford', labelUa: "Difford's Guide Top 100", labelEn: "Difford's Guide Top 100", count: COCKTAILS_DATABASE.filter(c => c.collection === 'difford' || c.sourceReference?.includes('Difford')).length },
    { id: 'iba', labelUa: 'IBA Official', labelEn: 'IBA Official', count: COCKTAILS_DATABASE.filter(c => c.ibaOfficial).length },
    { id: 'top10', labelUa: 'Топ-10 Світу', labelEn: 'World Top 10', count: COCKTAILS_DATABASE.filter(c => c.isTop10 || c.top10Rank).length },
    { id: 'author', labelUa: 'Авторські / Крафт', labelEn: 'Craft & Custom', count: COCKTAILS_DATABASE.filter(c => c.isAuthor).length }
  ], []);

  const strengthOptions = [
    { key: 'all', labelUa: 'Будь-яка міцність', labelEn: 'Any ABV', icon: '🍷' },
    { key: 'zero', labelUa: '0% Безалкогольні', labelEn: '0% Non-Alcoholic', icon: '🌿' },
    { key: 'light', labelUa: '1–15% Легкі', labelEn: '1–15% Light', icon: '🥂' },
    { key: 'medium', labelUa: '16–25% Середні', labelEn: '16–25% Medium', icon: '🍸' },
    { key: 'strong', labelUa: '26%+ Міцні', labelEn: '26%+ Strong', icon: '🔥' }
  ];

  const typeOptions = [
    { key: 'all', labelUa: 'Всі типи', labelEn: 'All Types' },
    { key: 'long', labelUa: 'Лонг (Long)', labelEn: 'Long' },
    { key: 'short', labelUa: 'Шорт (Short)', labelEn: 'Short' },
    { key: 'shot', labelUa: 'Шоти (Shots)', labelEn: 'Shots' },
    { key: 'aperitif', labelUa: 'Аперитиви', labelEn: 'Aperitifs' },
    { key: 'digestif', labelUa: 'Дижестиви', labelEn: 'Digestifs' },
    { key: 'hot', labelUa: 'Гарячі', labelEn: 'Hot Drinks' },
    { key: 'mocktail', labelUa: 'Безалкогольні', labelEn: 'Mocktails' }
  ];

  const baseOptions = [
    { key: 'all', labelUa: 'Будь-який алкоголь', labelEn: 'Any Spirit' },
    { key: 'gin', labelUa: 'Джин (Gin)', labelEn: 'Gin' },
    { key: 'whiskey', labelUa: 'Віскі / Бурбон', labelEn: 'Whisky / Bourbon' },
    { key: 'rum', labelUa: 'Ром (Rum)', labelEn: 'Rum' },
    { key: 'vodka', labelUa: 'Горілка (Vodka)', labelEn: 'Vodka' },
    { key: 'tequila', labelUa: 'Текіла & Мескаль', labelEn: 'Tequila & Mezcal' },
    { key: 'wine', labelUa: 'Ігристе / Вино', labelEn: 'Wine / Sparkling' },
    { key: 'cognac', labelUa: 'Коньяк / Бренді', labelEn: 'Cognac / Brandy' },
    { key: 'liqueur', labelUa: 'Лікери & Біттери', labelEn: 'Liqueurs & Bitters' }
  ];

  const convertedSearchLayout = useMemo(() => {
    if (!searchQuery.trim()) return '';
    const conv = convertKeyboardLayout(searchQuery.trim());
    return conv !== searchQuery.trim().toLowerCase() ? conv : '';
  }, [searchQuery]);

  const filteredCocktails = useMemo(() => {
    return COCKTAILS_DATABASE.filter((c) => {
      // Collection filter
      if (selectedCollection === 'savoy') {
        const isSavoy = c.collection === 'savoy' || c.history?.includes('Savoy') || c.historyEn?.includes('Savoy');
        if (!isSavoy) return false;
      } else if (selectedCollection === 'difford') {
        const isDifford = c.collection === 'difford' || c.sourceReference?.includes('Difford');
        if (!isDifford) return false;
      } else if (selectedCollection === 'iba') {
        if (!c.ibaOfficial) return false;
      } else if (selectedCollection === 'top10') {
        if (!c.isTop10 && !c.top10Rank) return false;
      } else if (selectedCollection === 'author') {
        if (!c.isAuthor) return false;
      }

      // Search query matches
      if (searchQuery.trim()) {
        const q = searchQuery.trim();
        const matchesName = smartTextMatch(c.name, q) || smartTextMatch(c.nameEn, q) || smartTextMatch(c.originalName || '', q);
        const matchesIngredient = c.ingredients?.some(
          (ing) => smartTextMatch(ing.name, q) || smartTextMatch(ing.nameEn, q)
        );
        const matchesFood = smartTextMatch(c.foodPairing, q) || smartTextMatch(c.foodPairingEn, q);
        const matchesBase = smartTextMatch(c.baseSpirit, q);
        const matchesDesc = smartTextMatch(c.description, q) || smartTextMatch(c.descriptionEn, q);

        if (!matchesName && !matchesIngredient && !matchesFood && !matchesBase && !matchesDesc) {
          return false;
        }
      }

      // Type filter
      if (selectedType !== 'all' && c.type !== selectedType) {
        return false;
      }

      // Base spirit filter
      if (selectedBase !== 'all' && c.baseSpirit !== selectedBase) {
        return false;
      }

      // Strength (ABV) filter
      if (selectedStrength !== 'all') {
        if (selectedStrength === 'zero' && c.abv > 0 && c.type !== 'mocktail') return false;
        if (selectedStrength === 'light' && (c.abv <= 0 || c.abv > 15)) return false;
        if (selectedStrength === 'medium' && (c.abv <= 15 || c.abv > 25)) return false;
        if (selectedStrength === 'strong' && c.abv <= 25) return false;
      }

      // Favorites filter
      if (onlyFavorites && !favorites.includes(c.id)) {
        return false;
      }

      return true;
    });
  }, [searchQuery, selectedCollection, selectedType, selectedBase, selectedStrength, onlyFavorites, favorites]);

  const handleCopyRecipe = (c: CocktailItem) => {
    const text = isUa
      ? `🍸 ${c.name} (${c.type.toUpperCase()}, ${c.abv}% об.)\n\nІнгредієнти:\n${(c.ingredients || []).map((i) => `• ${i.name}: ${i.amount}`).join('\n')}\n\nПриготування:\n${(c.instructions || []).join('\n')}${c.foodPairing ? `\n\n🍽️ Закуски та їжа: ${c.foodPairing}` : ''}`
      : `🍸 ${c.nameEn} (${c.type.toUpperCase()}, ${c.abv}% ABV)\n\nIngredients:\n${(c.ingredients || []).map((i) => `• ${i.nameEn}: ${i.amount}`).join('\n')}\n\nPreparation:\n${(c.instructionsEn || c.instructions || []).join('\n')}${c.foodPairingEn ? `\n\n🍽️ Food Pairing: ${c.foodPairingEn}` : ''}`;

    navigator.clipboard.writeText(text);
    setCopiedId(c.id);
    playClinkSound();
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleOpenModal = (c: CocktailItem) => {
    playClinkSound();
    if (onOpenCocktailModal) {
      onOpenCocktailModal(c);
    } else {
      setActiveModalCocktail(c);
    }
  };

  return (
    <section id="catalog-section" className="py-12 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-stone-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            {isUa ? 'База Коктейлів: The Savoy Book & Difford\'s Guide' : 'Cocktail Codex: Savoy & Difford\'s'}
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-['Unbounded'] tracking-tight">
            {isUa ? 'Повна База Коктейлів' : 'Complete Cocktail Database'}
          </h2>
          <p className="mt-1 text-stone-400 text-sm">
            {isUa
              ? `Відображено ${filteredCocktails.length} з ${COCKTAILS_DATABASE.length} класичних та світових рецептів з точними пропорціями та пейрингом`
              : `Showing ${filteredCocktails.length} of ${COCKTAILS_DATABASE.length} recipes from the greatest mixology encyclopedias`}
          </p>
        </div>

        {/* Quick Favorite Action */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => {
              playClinkSound();
              setOnlyFavorites(!onlyFavorites);
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold font-['Unbounded'] flex items-center gap-1.5 transition-all cursor-pointer border ${
              onlyFavorites
                ? 'bg-rose-500 text-white border-rose-500 shadow-md shadow-rose-500/25'
                : 'bg-stone-900/90 hover:bg-stone-800 text-stone-300 hover:text-white border-stone-800 hover:border-stone-700'
            }`}
          >
            <Heart className={`w-4 h-4 ${onlyFavorites ? 'fill-white text-white' : 'text-rose-500'}`} />
            <span>{isUa ? 'Улюблені' : 'Favorites'}</span>
            <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono ${onlyFavorites ? 'bg-black/30 text-white' : 'bg-stone-800 text-stone-300 border border-stone-700/50'}`}>
              {favorites.length}
            </span>
          </button>
        </div>
      </div>

      {/* Collection Source Tabs */}
      <div className="flex flex-wrap gap-2 justify-start sm:justify-center mb-6">
        {collections.map((col) => {
          const isActive = selectedCollection === col.id;
          return (
            <button
              key={col.id}
              onClick={() => {
                playClinkSound();
                setSelectedCollection(col.id);
              }}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all border flex items-center gap-1.5 shadow-xs cursor-pointer ${
                isActive
                  ? 'bg-amber-500 text-stone-950 font-bold border-amber-400 shadow-lg shadow-amber-500/20 scale-[1.02]'
                  : 'bg-stone-900/90 hover:bg-stone-800/80 text-stone-300 hover:text-white border-stone-800 hover:border-amber-400/50'
              }`}
            >
              <span>{isUa ? col.labelUa : col.labelEn}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${isActive ? 'bg-stone-950/20 text-stone-950 font-black' : 'bg-stone-800 text-stone-400 border border-stone-700/50'}`}>
                {col.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Filter Controls Bar */}
      <div className="space-y-4 mb-8 bg-stone-900/80 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-stone-800 shadow-xl shadow-black/20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isUa ? 'Пошук: назва, інгредієнт...' : 'Search: name, ingredient...'}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-950/90 border border-stone-800 text-stone-100 placeholder-stone-500 text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/30 transition-colors shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-200 text-xs cursor-pointer"
              >
                ✕
              </button>
            )}
            {convertedSearchLayout && (
              <div className="absolute left-0 -bottom-5 text-[10px] text-amber-400 font-mono flex items-center gap-1">
                <span>🔄 {isUa ? 'Шукаємо також:' : 'Also searching:'}</span>
                <span className="font-bold underline">{convertedSearchLayout}</span>
              </div>
            )}
          </div>

          {/* Strength (ABV) Select */}
          <div className="relative">
            <select
              value={selectedStrength}
              onChange={(e) => {
                playClinkSound();
                setSelectedStrength(e.target.value);
              }}
              className="w-full px-4 py-2.5 rounded-xl bg-stone-950/90 border border-stone-800 text-amber-300 text-sm focus:outline-none focus:border-amber-500 appearance-none cursor-pointer font-medium shadow-inner"
            >
              {strengthOptions.map((opt) => (
                <option key={opt.key} value={opt.key} className="bg-stone-900 text-stone-200">
                  {opt.icon} {isUa ? opt.labelUa : opt.labelEn}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-amber-400">
              ▼
            </div>
          </div>

          {/* Type Select */}
          <div className="relative">
            <select
              value={selectedType}
              onChange={(e) => {
                playClinkSound();
                setSelectedType(e.target.value);
              }}
              className="w-full px-4 py-2.5 rounded-xl bg-stone-950/90 border border-stone-800 text-stone-200 text-sm focus:outline-none focus:border-amber-500 appearance-none cursor-pointer shadow-inner"
            >
              {typeOptions.map((opt) => (
                <option key={opt.key} value={opt.key} className="bg-stone-900 text-stone-200">
                  {isUa ? opt.labelUa : opt.labelEn}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-stone-400">
              ▼
            </div>
          </div>

          {/* Base Spirit Select */}
          <div className="relative">
            <select
              value={selectedBase}
              onChange={(e) => {
                playClinkSound();
                setSelectedBase(e.target.value);
              }}
              className="w-full px-4 py-2.5 rounded-xl bg-stone-950/90 border border-stone-800 text-stone-200 text-sm focus:outline-none focus:border-amber-500 appearance-none cursor-pointer shadow-inner"
            >
              {baseOptions.map((opt) => (
                <option key={opt.key} value={opt.key} className="bg-stone-900 text-stone-200">
                  {isUa ? opt.labelUa : opt.labelEn}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-stone-400">
              ▼
            </div>
          </div>
        </div>

        {/* Strength ABV Quick Chips Row */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 border-t border-stone-800/80 scrollbar-none">
          <span className="text-xs text-amber-400 font-bold uppercase tracking-wider shrink-0 flex items-center gap-1">
            <Flame className="w-3 h-3 text-amber-400" />
            {isUa ? 'Міцність:' : 'Strength:'}
          </span>
          {strengthOptions.map((opt) => (
            <button
              key={opt.key}
              onClick={() => {
                playClinkSound();
                setSelectedStrength(opt.key);
              }}
              className={`px-3 py-1 rounded-lg text-xs whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1.5 border ${
                selectedStrength === opt.key
                  ? 'bg-amber-500 text-stone-950 font-bold shadow-md border-amber-400'
                  : 'bg-stone-950/80 text-stone-300 hover:text-amber-300 border-stone-800 hover:border-stone-700'
              }`}
            >
              <span>{opt.icon}</span>
              <span>{isUa ? opt.labelUa : opt.labelEn}</span>
            </button>
          ))}
        </div>

        {/* Quick Horizontal Type Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-xs text-stone-400 font-semibold uppercase tracking-wider shrink-0 flex items-center gap-1">
            <Filter className="w-3 h-3 text-stone-400" />
            {isUa ? 'Тип:' : 'Type:'}
          </span>
          {typeOptions.map((opt) => (
            <button
              key={opt.key}
              onClick={() => {
                playClinkSound();
                setSelectedType(opt.key);
              }}
              className={`px-3 py-1 rounded-lg text-xs whitespace-nowrap transition-colors cursor-pointer border ${
                selectedType === opt.key
                  ? 'bg-amber-500 text-stone-950 font-bold border-amber-400 shadow-md'
                  : 'bg-stone-950/80 text-stone-400 hover:text-stone-200 border-stone-800 hover:border-stone-700'
              }`}
            >
              {isUa ? opt.labelUa : opt.labelEn}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Cocktails */}
      {filteredCocktails.length === 0 ? (
        <div className="py-16 text-center rounded-2xl bg-stone-900/40 border border-dashed border-stone-800">
          <Wine className="w-12 h-12 text-stone-600 mx-auto mb-3" />
          <p className="text-stone-400 font-medium">
            {isUa ? 'Нічого не знайдено за такими фільтрами' : 'No cocktails match your filters'}
          </p>
          <button
            onClick={() => {
              playClinkSound();
              setSearchQuery('');
              setSelectedCollection('all');
              setSelectedType('all');
              setSelectedBase('all');
              setSelectedStrength('all');
            }}
            className="mt-3 text-xs text-amber-400 hover:text-amber-300 underline font-bold cursor-pointer"
          >
            {isUa ? 'Скинути всі фільтри' : 'Reset all filters'}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCocktails.map((cocktail) => {
            const isFav = favorites.includes(cocktail.id);
            const isSavoy = cocktail.collection === 'savoy' || cocktail.history?.includes('Savoy') || cocktail.historyEn?.includes('Savoy');
            const isDifford = cocktail.collection === 'difford' || cocktail.sourceReference?.includes('Difford');

            return (
              <div
                key={cocktail.id}
                onClick={() => handleOpenModal(cocktail)}
                className="group cursor-pointer rounded-2xl bg-stone-900/80 backdrop-blur-sm border border-stone-800/90 hover:border-amber-500/60 hover:shadow-2xl hover:shadow-amber-500/10 hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden text-stone-100"
              >
                {/* Cocktail Image & Badges */}
                <div className="relative h-48 overflow-hidden bg-stone-950">
                  <img
                    src={cocktail.image}
                    alt={isUa ? cocktail.name : cocktail.nameEn}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
                    <span className="px-2 py-0.5 rounded-md bg-stone-950/80 backdrop-blur text-[11px] font-bold text-amber-400 border border-amber-500/30 uppercase">
                      {cocktail.type}
                    </span>
                    {isSavoy && (
                      <span className="px-2 py-0.5 rounded-md bg-amber-600 text-[10px] font-bold text-white shadow">
                        Savoy 1930
                      </span>
                    )}
                    {isDifford && (
                      <span className="px-2 py-0.5 rounded-md bg-sky-600 text-[10px] font-bold text-white shadow">
                        Difford's
                      </span>
                    )}
                    {(cocktail.isTop10 || cocktail.top10Rank) && (
                      <span className="px-2 py-0.5 rounded-md bg-amber-500 text-[10px] font-black text-stone-950 shadow">
                        TOP 10
                      </span>
                    )}
                    {cocktail.isAuthor && (
                      <span className="px-2 py-0.5 rounded-md bg-rose-600 text-[10px] font-bold text-white shadow">
                        {isUa ? 'Крафт' : 'Craft'}
                      </span>
                    )}
                  </div>

                  {/* Favorite Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFavorite(cocktail.id);
                    }}
                    className="absolute top-3 right-3 p-2 rounded-full bg-stone-900/80 backdrop-blur hover:bg-stone-800 text-stone-300 hover:text-rose-400 transition-colors z-10 cursor-pointer"
                  >
                    <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
                  </button>

                  {/* Hover Open Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-amber-300 font-bold font-['Unbounded'] text-xs">
                    <Eye className="w-4 h-4" />
                    {isUa ? 'Відкрити рецепт' : 'Open Recipe'}
                  </div>

                  {/* ABV Badge at bottom */}
                  <div className="absolute bottom-2.5 right-3 text-xs font-mono font-bold text-stone-200 bg-black/70 backdrop-blur px-2 py-0.5 rounded-md z-10 border border-stone-800">
                    {cocktail.abv}% ABV
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white font-['Unbounded'] group-hover:text-amber-400 transition-colors">
                      {isUa ? cocktail.name : cocktail.nameEn}
                    </h3>
                    <p className="text-xs text-stone-400 line-clamp-2 mt-1 mb-3">
                      {isUa ? cocktail.description || cocktail.emotionalReason : cocktail.descriptionEn || cocktail.emotionalReasonEn}
                    </p>

                    {/* Food pairing snippet */}
                    {cocktail.foodPairing && (
                      <div className="mb-3 p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-300 flex items-center gap-1.5 font-medium">
                        <Utensils className="w-3 h-3 text-amber-400 shrink-0" />
                        <span className="truncate">
                          {isUa ? cocktail.foodPairing : cocktail.foodPairingEn}
                        </span>
                      </div>
                    )}

                    {/* Ingredients summary */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {cocktail.ingredients?.slice(0, 3).map((ing, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] px-2 py-0.5 rounded bg-stone-950 text-stone-300 border border-stone-800 font-medium"
                        >
                          {isUa ? ing.name : ing.nameEn}
                        </span>
                      ))}
                      {cocktail.ingredients && cocktail.ingredients.length > 3 && (
                        <span className="text-[11px] px-1.5 py-0.5 rounded bg-stone-950 text-stone-400 font-semibold border border-stone-800">
                          +{cocktail.ingredients.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Action Buttons */}
                  <div className="pt-3 border-t border-stone-800/80 flex items-center justify-between gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenModal(cocktail);
                      }}
                      className="flex-1 py-2 px-3 rounded-xl bg-amber-500/15 hover:bg-amber-500 text-amber-300 hover:text-stone-950 text-xs font-bold font-['Unbounded'] transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Utensils className="w-3.5 h-3.5" />
                      <span>{isUa ? 'Рецепт & Закуски' : 'Recipe & Food'}</span>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopyRecipe(cocktail);
                      }}
                      title={isUa ? 'Скопіювати рецепт' : 'Copy recipe'}
                      className="p-2 rounded-xl bg-stone-950 border border-stone-800 text-stone-400 hover:text-white hover:border-stone-700 transition-colors cursor-pointer"
                    >
                      {copiedId === cocktail.id ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Share2 className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Unified Recipe & Food Pairing Modal */}
      {activeModalCocktail && (
        <CocktailModal
          cocktail={activeModalCocktail}
          language={language}
          onClose={() => setActiveModalCocktail(null)}
        />
      )}
    </section>
  );
};
