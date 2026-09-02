import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Language, CocktailItem } from '../types';
import { COCKTAILS_DATABASE } from '../data/cocktails';
import { MEDICINES_GUIDE } from '../data/hangoverMedicine';
import { TOASTS_DATABASE } from '../data/toasts';
import { FOOD_PAIRINGS_DATABASE } from '../data/foodPairings';
import { ALCOHOL_HISTORY_DATABASE } from '../data/alcoholHistory';
import { smartTextMatch, convertKeyboardLayout } from '../utils/searchHelper';
import { Search, Wine, HeartPulse, MessageSquareQuote, Utensils, BookOpen, X, Sparkles, ArrowRight, CornerDownLeft, Sparkle } from 'lucide-react';
import { playClinkSound } from '../utils/audio';

interface Props {
  language: Language;
  isOpen: boolean;
  onClose: () => void;
  onSelectCocktail: (cocktail: CocktailItem) => void;
  onNavigateSection: (sectionId: string) => void;
}

export const GlobalSearchModal: React.FC<Props> = ({
  language,
  isOpen,
  onClose,
  onSelectCocktail,
  onNavigateSection
}) => {
  const isUa = language === 'uk';
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Keyboard escape & shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Converted layout string for hints
  const convertedLayout = useMemo(() => {
    if (!query.trim()) return '';
    const conv = convertKeyboardLayout(query.trim());
    return conv !== query.trim().toLowerCase() ? conv : '';
  }, [query]);

  // Search calculations
  const searchResults = useMemo(() => {
    const q = query.trim();
    if (!q) return null;

    // 1. Cocktails search
    const cocktails = COCKTAILS_DATABASE.filter((c) => {
      return (
        smartTextMatch(c.name, q) ||
        smartTextMatch(c.nameEn, q) ||
        smartTextMatch(c.description, q) ||
        smartTextMatch(c.descriptionEn, q) ||
        smartTextMatch(c.baseSpirit, q) ||
        smartTextMatch(c.foodPairing, q) ||
        smartTextMatch(c.foodPairingEn, q) ||
        c.ingredients?.some(i => smartTextMatch(i.name, q) || smartTextMatch(i.nameEn, q))
      );
    }).slice(0, 8);

    // 2. Medicines / Hangover Search
    const medicines = MEDICINES_GUIDE.filter((m) => {
      return (
        smartTextMatch(m.name, q) ||
        smartTextMatch(m.nameEn, q) ||
        smartTextMatch(m.purpose, q) ||
        smartTextMatch(m.purposeEn, q) ||
        smartTextMatch(m.usageAdvice, q) ||
        smartTextMatch(m.usageAdviceEn, q)
      );
    }).slice(0, 5);

    // 3. Toasts Search
    const toasts = TOASTS_DATABASE.filter((t) => {
      return (
        smartTextMatch(t.title, q) ||
        smartTextMatch(t.titleEn, q) ||
        smartTextMatch(t.text, q) ||
        smartTextMatch(t.textEn, q) ||
        smartTextMatch(t.occasion, q)
      );
    }).slice(0, 4);

    // 4. Food Pairings
    const foods = FOOD_PAIRINGS_DATABASE.filter((f) => {
      return (
        smartTextMatch(f.category, q) ||
        smartTextMatch(f.categoryEn, q) ||
        smartTextMatch(f.sommelierRule, q) ||
        smartTextMatch(f.sommelierRuleEn, q) ||
        f.bestDishes?.some(d => smartTextMatch(d, q)) ||
        f.bestDishesEn?.some(d => smartTextMatch(d, q))
      );
    }).slice(0, 4);

    // 5. Spirits History
    const histories = ALCOHOL_HISTORY_DATABASE.filter((h) => {
      return (
        smartTextMatch(h.name, q) ||
        smartTextMatch(h.nameEn, q) ||
        smartTextMatch(h.shortTagline, q) ||
        smartTextMatch(h.shortTaglineEn, q) ||
        smartTextMatch(h.originCountry, q) ||
        smartTextMatch(h.originCountryEn, q)
      );
    }).slice(0, 4);

    const totalCount = cocktails.length + medicines.length + toasts.length + foods.length + histories.length;

    return {
      cocktails,
      medicines,
      toasts,
      foods,
      histories,
      totalCount
    };
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-3 sm:p-6 sm:pt-20 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-3xl rounded-2xl bg-zinc-900 border border-zinc-700 shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Search Header */}
        <div className="p-4 border-b border-zinc-800 flex items-center gap-3 bg-zinc-950/80">
          <Search className="w-5 h-5 text-amber-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              isUa
                ? 'Загальний пошук: коктейлі, інгредієнти, ліки, тости, їжа, напої...'
                : 'Search anything: cocktails, ingredients, meds, toasts, food...'
            }
            className="w-full bg-transparent text-white placeholder-zinc-500 text-sm sm:text-base focus:outline-none"
          />
          {convertedLayout && (
            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded-lg whitespace-nowrap">
              <span>🔄</span> {convertedLayout}
            </span>
          )}
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-zinc-400 hover:text-white p-1 text-xs cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer text-xs"
          >
            ESC
          </button>
        </div>

        {/* Quick Suggested Tags if empty */}
        {!query.trim() && (
          <div className="p-6 text-sm text-zinc-400">
            <p className="text-xs uppercase font-bold text-zinc-400 tracking-wider mb-3">
              {isUa ? '⚡ Швидкий пошук за запитами:' : '⚡ Popular searches:'}
            </p>
            <div className="flex flex-wrap gap-2">
              {(isUa
                ? [
                    'Негроні',
                    'Aperol',
                    'Джин',
                    'Текіла',
                    'Безалкогольний',
                    'Регідрон',
                    'Закуски до віскі',
                    'Тост на весілля',
                    'Бурштин'
                  ]
                : [
                    'Negroni',
                    'Aperol',
                    'Gin',
                    'Tequila',
                    'Non-alcoholic',
                    'Rehydron',
                    'Whisky snacks',
                    'Wedding toast',
                    'Amber'
                  ]
              ).map((tag) => (
                <button
                  key={tag}
                  onClick={() => setQuery(tag)}
                  className="px-3 py-1.5 rounded-xl bg-zinc-800/80 hover:bg-amber-500 hover:text-black border border-zinc-700/80 text-zinc-300 text-xs font-semibold transition-all cursor-pointer"
                >
                  {tag}
                </button>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-zinc-800/60 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-zinc-400">
              <div className="flex items-center gap-2">
                <Wine className="w-4 h-4 text-amber-400" />
                <span>{isUa ? '100+ Коктейлів' : '100+ Cocktails'}</span>
              </div>
              <div className="flex items-center gap-2">
                <HeartPulse className="w-4 h-4 text-rose-400" />
                <span>{isUa ? 'Аптечка & Антипохмілля' : 'Hangover Meds'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Utensils className="w-4 h-4 text-emerald-400" />
                <span>{isUa ? 'Гастрономічний пейринг' : 'Food Pairings'}</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquareQuote className="w-4 h-4 text-blue-400" />
                <span>{isUa ? 'Генератор тостів' : 'Toast Database'}</span>
              </div>
            </div>
          </div>
        )}

        {/* Results Container */}
        {searchResults && (
          <div className="overflow-y-auto p-4 space-y-6 flex-1 scrollbar-thin">
            {searchResults.totalCount === 0 ? (
              <div className="py-12 text-center text-zinc-500">
                <p className="text-sm font-medium">
                  {isUa ? `За запитом «${query}» нічого не знайдено` : `No results found for "${query}"`}
                </p>
                <p className="text-xs text-zinc-400 mt-1">
                  {isUa ? 'Спробуйте інше слово або назву інгредієнта' : 'Try searching for another ingredient or drink'}
                </p>
              </div>
            ) : (
              <>
                {/* Cocktails Results */}
                {searchResults.cocktails.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-2.5">
                      <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                        <Wine className="w-3.5 h-3.5" />
                        {isUa ? 'Коктейлі та рецепти' : 'Cocktails'} ({searchResults.cocktails.length})
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {searchResults.cocktails.map((cocktail) => (
                        <div
                          key={cocktail.id}
                          onClick={() => {
                            playClinkSound();
                            onSelectCocktail(cocktail);
                            onClose();
                          }}
                          className="p-3 rounded-xl bg-zinc-800/80 hover:bg-zinc-800 border border-zinc-700/80 hover:border-amber-500/60 transition-all cursor-pointer flex items-center gap-3 group"
                        >
                          <img
                            src={cocktail.image}
                            alt={isUa ? cocktail.name : cocktail.nameEn}
                            className="w-12 h-12 rounded-lg object-cover bg-zinc-950 shrink-0"
                          />
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-1">
                              <h4 className="text-sm font-bold text-white group-hover:text-amber-400 truncate">
                                {isUa ? cocktail.name : cocktail.nameEn}
                              </h4>
                              <span className="text-[10px] font-mono text-amber-400 bg-black/40 px-1.5 py-0.5 rounded">
                                {cocktail.abv}%
                              </span>
                            </div>
                            <p className="text-[11px] text-zinc-400 truncate mt-0.5">
                              {cocktail.ingredients?.map(i => isUa ? i.name : i.nameEn).join(', ')}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Hangover & Medicines Results */}
                {searchResults.medicines.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-2.5">
                      <span className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                        <HeartPulse className="w-3.5 h-3.5" />
                        {isUa ? 'Ліки та аптечка похмілля' : 'Medicines & Relief'} ({searchResults.medicines.length})
                      </span>
                    </div>
                    <div className="space-y-2">
                      {searchResults.medicines.map((med, idx) => (
                        <div
                          key={idx}
                          onClick={() => {
                            playClinkSound();
                            onNavigateSection('hangover');
                            onClose();
                          }}
                          className="p-3 rounded-xl bg-zinc-800/60 hover:bg-zinc-800 border border-zinc-700/60 hover:border-rose-500/50 transition-all cursor-pointer flex items-center justify-between gap-3"
                        >
                          <div>
                            <span className="text-xs font-bold text-white block">
                              {isUa ? med.name : med.nameEn}
                            </span>
                            <span className="text-[11px] text-zinc-400">
                              {isUa ? med.purpose : med.purposeEn}
                            </span>
                          </div>
                          <span className="text-[10px] uppercase font-bold text-rose-400 bg-rose-500/10 px-2 py-1 rounded-md shrink-0">
                            {isUa ? 'В Аптечку →' : 'View Guide →'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Food Pairings */}
                {searchResults.foods.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-2.5">
                      <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                        <Utensils className="w-3.5 h-3.5" />
                        {isUa ? 'Закуски та Гастрономія' : 'Food Pairings'} ({searchResults.foods.length})
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {searchResults.foods.map((food) => (
                        <div
                          key={food.id}
                          onClick={() => {
                            playClinkSound();
                            onNavigateSection('pairings');
                            onClose();
                          }}
                          className="p-3 rounded-xl bg-zinc-800/60 hover:bg-zinc-800 border border-zinc-700/60 hover:border-emerald-500/50 transition-all cursor-pointer"
                        >
                          <span className="text-xs font-bold text-white block">
                            {isUa ? food.category : food.categoryEn}
                          </span>
                          <span className="text-[11px] text-zinc-400 line-clamp-1 mt-0.5">
                            {isUa ? food.bestDishes.join(', ') : food.bestDishesEn.join(', ')}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Toasts */}
                {searchResults.toasts.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-2.5">
                      <span className="text-xs font-bold text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
                        <MessageSquareQuote className="w-3.5 h-3.5" />
                        {isUa ? 'Тости' : 'Toasts'} ({searchResults.toasts.length})
                      </span>
                    </div>
                    <div className="space-y-2">
                      {searchResults.toasts.map((toast) => (
                        <div
                          key={toast.id}
                          onClick={() => {
                            playClinkSound();
                            onNavigateSection('toasts');
                            onClose();
                          }}
                          className="p-3 rounded-xl bg-zinc-800/60 hover:bg-zinc-800 border border-zinc-700/60 hover:border-blue-500/50 transition-all cursor-pointer"
                        >
                          <div className="flex justify-between items-center text-xs font-bold text-white mb-1">
                            <span>{isUa ? toast.title : toast.titleEn || toast.title}</span>
                            <span className="text-[10px] text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded">
                              {toast.occasion}
                            </span>
                          </div>
                          <p className="text-[11px] text-zinc-300 italic line-clamp-2">
                            "{isUa ? toast.text : toast.textEn || toast.text}"
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Alcohol History */}
                {searchResults.histories.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-2.5">
                      <span className="text-xs font-bold text-yellow-400 uppercase tracking-wider flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5" />
                        {isUa ? 'Історія та Культура напоїв' : 'Spirits & History'} ({searchResults.histories.length})
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {searchResults.histories.map((hist) => (
                        <div
                          key={hist.id}
                          onClick={() => {
                            playClinkSound();
                            onNavigateSection('history');
                            onClose();
                          }}
                          className="p-3 rounded-xl bg-zinc-800/60 hover:bg-zinc-800 border border-zinc-700/60 hover:border-yellow-500/50 transition-all cursor-pointer"
                        >
                          <span className="text-xs font-bold text-white block">
                            {isUa ? hist.name : hist.nameEn} ({hist.abvRange})
                          </span>
                          <span className="text-[11px] text-zinc-400 line-clamp-1">
                            {isUa ? hist.shortTagline : hist.shortTaglineEn}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* Modal Footer */}
        <div className="p-3 bg-zinc-950/90 border-t border-zinc-800 flex items-center justify-between text-[11px] text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="bg-zinc-800 text-zinc-300 px-1.5 py-0.5 rounded font-mono text-[10px]">Enter</span>
            <span>{isUa ? 'Перейти до рецепту' : 'Open result'}</span>
          </div>
          <span>Gradusologist Omnisearch</span>
        </div>
      </div>
    </div>
  );
};
