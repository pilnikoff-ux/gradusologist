import React, { useState, useMemo } from 'react';
import { Language, CrazyCocktail, CocktailItem, UserProfile } from '../types';
import { COCKTAILS_DATABASE } from '../data/cocktails';
import { getSommelierProgress } from '../utils/sommelierExperience';
import {
  Sparkles,
  Heart,
  BookOpen,
  Trash2,
  X,
  Copy,
  Check,
  Wine,
  Flame,
  Clock,
  Droplets,
  Share2,
  Eye,
  FolderHeart,
  RotateCcw,
  Sparkle,
  Award,
  Zap,
  ArrowRight,
  ShieldCheck,
  User,
  Download,
  Upload
} from 'lucide-react';
import { playClinkSound } from '../utils/audio';

interface Props {
  language: Language;
  isOpen: boolean;
  onClose: () => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onClearFavorites?: () => void;
  journal: CrazyCocktail[];
  onDeleteFromJournal: (id: string) => void;
  onClearJournal: () => void;
  onOpenCocktailModal: (cocktail: CocktailItem) => void;
  onOpenGeneratorTab?: () => void;
  currentUser?: UserProfile | null;
  onOpenAuthModal?: () => void;
  onOpenSommelierPass?: () => void;
}

export const MyJournalModal: React.FC<Props> = ({
  language,
  isOpen,
  onClose,
  favorites,
  onToggleFavorite,
  onClearFavorites,
  journal,
  onDeleteFromJournal,
  onClearJournal,
  onOpenCocktailModal,
  onOpenGeneratorTab,
  currentUser,
  onOpenAuthModal,
  onOpenSommelierPass
}) => {
  const isUa = language === 'uk';
  const [activeTab, setActiveTab] = useState<'favorites' | 'crazy'>('favorites');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Favorite cocktails list
  const favoriteCocktails = useMemo(() => {
    return COCKTAILS_DATABASE.filter((c) => favorites.includes(c.id));
  }, [favorites]);

  const sommelier = useMemo(() => {
    return getSommelierProgress(favorites.length, favoriteCocktails);
  }, [favorites.length, favoriteCocktails]);

  if (!isOpen) return null;

  const handleCopyRecipe = (c: CocktailItem) => {
    const text = isUa
      ? `🍸 Коктейль: ${c.name} (${c.abv}% ABV)\n${c.description}\n\nІнгредієнти:\n${c.ingredients
          .map((i) => `• ${i.name} — ${i.amount}`)
          .join('\n')}\n\nПриготування:\n${c.instructions.join('\n')}`
      : `🍸 Cocktail: ${c.nameEn || c.name} (${c.abv}% ABV)\n${c.descriptionEn || c.description}\n\nIngredients:\n${c.ingredients
          .map((i) => `• ${i.nameEn || i.name} — ${i.amount}`)
          .join('\n')}\n\nInstructions:\n${(c.instructionsEn || c.instructions).join('\n')}`;

    navigator.clipboard.writeText(text);
    setCopiedId(c.id);
    playClinkSound();
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCopyCrazy = (item: CrazyCocktail) => {
    const danger = Math.min(5, Math.max(1, Number(item.dangerLevel) || 5));
    const ingredientsText = (item.ingredients || []).join('\n');
    const instructionsText = (item.instructions || []).join('\n');
    const text = isUa
      ? `💀 ${item.name} (${'⚡'.repeat(danger)})\n${item.tagline}\n\nІнгредієнти:\n${ingredientsText}\n\nПриготування:\n${instructionsText}\n\nРанковий ефект:\n${item.morningEffect || ''}`
      : `💀 ${item.name} (${'⚡'.repeat(danger)})\n${item.tagline}\n\nIngredients:\n${ingredientsText}\n\nInstructions:\n${instructionsText}\n\nMorning Effect:\n${item.morningEffect || ''}`;
    navigator.clipboard.writeText(text);
    setCopiedId(item.id);
    playClinkSound();
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div
        className="relative w-full max-w-4xl max-h-[90vh] bg-zinc-900 border border-zinc-700/80 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-zinc-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 sm:px-8 py-4 sm:py-5 border-b border-zinc-800 bg-zinc-950/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black font-['Unbounded'] text-white flex items-center gap-2">
                <span>{isUa ? 'Мій Особистий Журнал' : 'My Personal Journal'}</span>
                <span className="text-[10px] bg-amber-500/20 text-amber-400 border border-amber-500/40 px-2 py-0.5 rounded-full font-mono">
                  {favorites.length + journal.length} {isUa ? 'збережено' : 'saved'}
                </span>
              </h2>
              <p className="text-xs text-zinc-400">
                {isUa
                  ? 'Збережені улюблені коктейлі та згенеровані аномальні рецепти'
                  : 'Saved favorite cocktails and generated impossible recipes'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Google Account Profile Button */}
            {currentUser ? (
              <button
                onClick={() => {
                  playClinkSound();
                  onOpenAuthModal?.();
                }}
                className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-emerald-500/40 text-xs text-stone-200 flex items-center gap-2 transition-all cursor-pointer"
                title={isUa ? 'Акаунт Google (натисніть для налаштувань)' : 'Google Account (click for settings)'}
              >
                {currentUser.picture ? (
                  <img
                    src={currentUser.picture}
                    alt={currentUser.name}
                    className="w-5 h-5 rounded-full object-cover border border-emerald-400"
                  />
                ) : (
                  <User className="w-4 h-4 text-emerald-400" />
                )}
                <span className="hidden sm:inline font-bold font-['Unbounded'] text-[11px] max-w-[120px] truncate">
                  {currentUser.name}
                </span>
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              </button>
            ) : (
              <button
                onClick={() => {
                  playClinkSound();
                  onOpenAuthModal?.();
                }}
                className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 hover:border-amber-500/50 text-xs text-stone-300 hover:text-amber-400 flex items-center gap-1.5 transition-all cursor-pointer"
              >
                {/* Small Google icon */}
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span className="hidden sm:inline font-bold font-['Unbounded'] text-[11px]">
                  {isUa ? 'Увійти з Google' : 'Google Sign-In'}
                </span>
              </button>
            )}

            <button
              onClick={() => {
                playClinkSound();
                onClose();
              }}
              className="p-2 rounded-xl bg-zinc-800/80 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center justify-between px-5 sm:px-8 py-3 bg-zinc-900 border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                playClinkSound();
                setActiveTab('favorites');
              }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold font-['Unbounded'] transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'favorites'
                  ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
                  : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
              }`}
            >
              <Heart className={`w-4 h-4 ${activeTab === 'favorites' ? 'fill-black' : 'text-rose-400'}`} />
              <span>{isUa ? 'Улюблені Коктейлі' : 'Favorite Cocktails'}</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono font-black ${activeTab === 'favorites' ? 'bg-black text-amber-400' : 'bg-zinc-700 text-zinc-300'}`}>
                {favorites.length}
              </span>
            </button>

            <button
              onClick={() => {
                playClinkSound();
                setActiveTab('crazy');
              }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold font-['Unbounded'] transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'crazy'
                  ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/25'
                  : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
              }`}
            >
              <BookOpen className="w-4 h-4 text-rose-300" />
              <span>{isUa ? '«Це пиздець» Рецепти' : 'Madness Recipes'}</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono font-black ${activeTab === 'crazy' ? 'bg-black text-rose-400' : 'bg-zinc-700 text-zinc-300'}`}>
                {journal.length}
              </span>
            </button>
          </div>

          {/* Clear Button */}
          {activeTab === 'favorites' && favorites.length > 0 && onClearFavorites && (
            <button
              onClick={onClearFavorites}
              className="text-xs text-zinc-400 hover:text-rose-400 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{isUa ? 'Очистити улюблені' : 'Clear favorites'}</span>
            </button>
          )}

          {activeTab === 'crazy' && journal.length > 0 && (
            <button
              onClick={onClearJournal}
              className="text-xs text-zinc-400 hover:text-rose-400 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{isUa ? 'Очистити журнал' : 'Clear journal'}</span>
            </button>
          )}
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-8 overflow-y-auto flex-1 custom-scrollbar space-y-4">
          {/* TAB 1: FAVORITE COCKTAILS */}
          {activeTab === 'favorites' && (
            <>
              {/* Sommelier Experience Level Banner */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/15 via-zinc-950 to-stone-900 border border-amber-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-black/40 border border-amber-500/30 flex items-center justify-center text-2xl shrink-0">
                    {sommelier.currentLevel.badge}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider font-['Unbounded']">
                        {isUa ? 'Ваш Ранг Сомельє' : 'Sommelier Rank'}
                      </span>
                      <span className="px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 text-[9px] font-mono font-bold">
                        Lvl {sommelier.currentLevel.level}/5
                      </span>
                    </div>
                    <h4 className="text-base font-black text-white font-['Unbounded']">
                      {isUa ? sommelier.currentLevel.titleUa : sommelier.currentLevel.titleEn}
                    </h4>
                    <p className="text-[11px] text-stone-400 line-clamp-1">
                      {sommelier.nextLevel
                        ? (isUa
                            ? `Ще ${sommelier.neededForNext} кокт. до рангу «${sommelier.nextLevel.titleUa}»`
                            : `${sommelier.neededForNext} more to reach ${sommelier.nextLevel.titleEn}`)
                        : (isUa ? 'Досягнуто найвищий статус!' : 'Supreme rank reached!')}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                  <div className="w-28 sm:w-36">
                    <div className="flex justify-between text-[10px] text-stone-400 font-mono mb-1">
                      <span>{favorites.length} favs</span>
                      <span>{sommelier.progressPercent}%</span>
                    </div>
                    <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-amber-500 to-amber-300 rounded-full transition-all"
                        style={{ width: `${sommelier.progressPercent}%` }}
                      />
                    </div>
                  </div>

                  {onOpenSommelierPass && (
                    <button
                      onClick={() => {
                        playClinkSound();
                        onOpenSommelierPass();
                      }}
                      className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold font-['Unbounded'] text-xs transition-all shrink-0 cursor-pointer flex items-center gap-1"
                    >
                      <Award className="w-3.5 h-3.5" />
                      <span>{isUa ? 'Паспорт' : 'Pass'}</span>
                    </button>
                  )}
                </div>
              </div>
              {favoriteCocktails.length === 0 ? (
                <div className="py-16 text-center text-zinc-400 flex flex-col items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-zinc-800/80 border border-zinc-700 flex items-center justify-center mb-4 text-zinc-500">
                    <Heart className="w-8 h-8 stroke-1" />
                  </div>
                  <h3 className="text-lg font-bold text-white font-['Unbounded'] mb-1">
                    {isUa ? 'У вас ще немає збережених коктейлів' : 'No saved cocktails yet'}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto mb-6">
                    {isUa
                      ? 'Натискайте на іконку сердечка ❤️ на будь-якій картці коктейлю в каталозі або рулетці, щоб зберегти їх сюди.'
                      : 'Click the heart icon on any cocktail card to bookmark your favorites here.'}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {favoriteCocktails.map((c) => (
                    <div
                      key={c.id}
                      className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 hover:border-amber-500/50 transition-all flex flex-col justify-between group"
                    >
                      <div className="flex gap-3">
                        <div className="w-20 h-20 rounded-xl overflow-hidden bg-zinc-900 shrink-0 relative">
                          <img
                            src={c.image}
                            alt={isUa ? c.name : c.nameEn}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                          <span className="absolute bottom-1 right-1 bg-black/80 backdrop-blur-xs text-amber-400 text-[9px] font-mono px-1 rounded font-bold">
                            {c.abv}%
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-1">
                            <h4 className="font-bold text-white font-['Unbounded'] text-sm truncate">
                              {isUa ? c.name : c.nameEn}
                            </h4>
                            <button
                              onClick={() => {
                                playClinkSound();
                                onToggleFavorite(c.id);
                              }}
                              className="text-rose-500 hover:scale-110 p-1 transition-transform cursor-pointer"
                              title={isUa ? 'Видалити з улюблених' : 'Remove from favorites'}
                            >
                              <Heart className="w-4 h-4 fill-rose-500" />
                            </button>
                          </div>
                          <p className="text-[11px] text-zinc-400 line-clamp-2 mt-1">
                            {isUa ? c.description : c.descriptionEn}
                          </p>
                          <div className="flex items-center gap-2 mt-2 text-[10px] text-zinc-500 font-mono">
                            <span className="uppercase text-amber-400 font-bold">{c.type}</span>
                            <span>•</span>
                            <span>{c.glass}</span>
                          </div>
                        </div>
                      </div>

                      <div className="pt-3 mt-3 border-t border-zinc-800/80 flex items-center justify-between gap-2">
                        <button
                          onClick={() => {
                            playClinkSound();
                            onOpenCocktailModal(c);
                          }}
                          className="flex-1 py-1.5 px-3 rounded-xl bg-amber-500/10 hover:bg-amber-500 text-amber-400 hover:text-black font-bold text-xs transition-colors flex items-center justify-center gap-1.5 font-['Unbounded'] cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>{isUa ? 'Рецепт' : 'Recipe'}</span>
                        </button>
                        <button
                          onClick={() => handleCopyRecipe(c)}
                          className="p-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                          title={isUa ? 'Скопіювати рецепт' : 'Copy recipe'}
                        >
                          {copiedId === c.id ? (
                            <Check className="w-4 h-4 text-emerald-400" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* TAB 2: CRAZY RECIPES JOURNAL */}
          {activeTab === 'crazy' && (
            <>
              {journal.length === 0 ? (
                <div className="py-16 text-center text-zinc-400 flex flex-col items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-zinc-800/80 border border-zinc-700 flex items-center justify-center mb-4 text-zinc-500">
                    <BookOpen className="w-8 h-8 stroke-1" />
                  </div>
                  <h3 className="text-lg font-bold text-white font-['Unbounded'] mb-1">
                    {isUa ? 'Журнал аномалій порожній' : 'Madness journal is empty'}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto mb-6">
                    {isUa
                      ? 'Згенеруйте божевільний коктейль «Це пиздець» у генераторі та збережіть його до журналу.'
                      : 'Generate an impossible cocktail in the "Total Madness" generator and save it here.'}
                  </p>
                  {onOpenGeneratorTab && (
                    <button
                      onClick={() => {
                        playClinkSound();
                        onClose();
                        onOpenGeneratorTab();
                      }}
                      className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold font-['Unbounded'] text-xs flex items-center gap-2 cursor-pointer shadow-lg shadow-rose-600/20"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>{isUa ? 'Перейти до Генератора' : 'Go to Generator'}</span>
                    </button>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {journal.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 hover:border-rose-500/50 transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h4 className="font-bold text-amber-300 font-['Unbounded'] text-sm">
                            {item.name}
                          </h4>
                          <button
                            onClick={() => {
                              playClinkSound();
                              onDeleteFromJournal(item.id);
                            }}
                            className="p-1 text-zinc-500 hover:text-rose-400 transition-colors cursor-pointer"
                            title={isUa ? 'Видалити' : 'Delete'}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-xs text-zinc-400 italic mb-3">"{item.tagline}"</p>

                        <div className="p-2.5 rounded-xl bg-zinc-900/90 border border-zinc-800/80 mb-3 space-y-1 text-xs text-zinc-300">
                          <span className="text-[10px] font-bold uppercase text-rose-400 tracking-wider block mb-1">
                            {isUa ? 'Інгредієнти:' : 'Ingredients:'}
                          </span>
                          {(item.ingredients || []).slice(0, 3).map((ing, i) => (
                            <div key={i} className="truncate text-[11px] flex items-center gap-1.5">
                              <span className="text-rose-500">•</span>
                              <span>{typeof ing === 'string' ? ing : String(ing)}</span>
                            </div>
                          ))}
                          {(item.ingredients || []).length > 3 && (
                            <div className="text-[10px] text-zinc-500 italic">
                              +{item.ingredients.length - 3} {isUa ? 'ще...' : 'more...'}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between text-[11px]">
                        <span className="text-rose-400 font-bold font-mono">
                          ⚡ {isUa ? 'Рівень' : 'Level'} {item.dangerLevel}/5
                        </span>
                        <button
                          onClick={() => handleCopyCrazy(item)}
                          className="px-3 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-amber-400 font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          {copiedId === item.id ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              <span>{isUa ? 'Скопійовано' : 'Copied'}</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>{isUa ? 'Копіювати' : 'Copy'}</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
