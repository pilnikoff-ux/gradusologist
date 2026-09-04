import React from 'react';
import { Language, CocktailItem } from '../types';
import { getSommelierProgress, SOMMELIER_LEVELS } from '../utils/sommelierExperience';
import {
  Sparkles,
  X,
  Award,
  Flame,
  CheckCircle2,
  Lock,
  Compass,
  Zap,
  ArrowRight,
  Share2,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { playWinSound, playClinkSound } from '../utils/audio';

interface Props {
  language: Language;
  isOpen: boolean;
  onClose: () => void;
  favoritesCount: number;
  favoriteCocktails: CocktailItem[];
  onOpenCatalog: () => void;
}

export const SommelierCardModal: React.FC<Props> = ({
  language,
  isOpen,
  onClose,
  favoritesCount,
  favoriteCocktails,
  onOpenCatalog
}) => {
  const isUa = language === 'uk';
  const [copied, setCopied] = React.useState(false);

  if (!isOpen) return null;

  const progress = getSommelierProgress(favoritesCount, favoriteCocktails);
  const current = progress.currentLevel;
  const next = progress.nextLevel;

  const handleTriggerConfetti = () => {
    playWinSound();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleShareStatus = () => {
    const text = isUa
      ? `🍸 Мій статус у Градусолозі: ${current.badge} ${current.titleUa} (Рівень ${current.level})!\nУ моїй колекції ${favoritesCount} збережених коктейлів. Середній градус: ${progress.averageAbv}%. Спробуй свій рівень у Градусолозі!`
      : `🍸 My Gradusologist Mixology Rank: ${current.badge} ${current.titleEn} (Level ${current.level})!\nI have curated ${favoritesCount} top cocktails. Check your cocktail level!`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    playClinkSound();
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl rounded-3xl bg-stone-900 border border-stone-800 p-5 sm:p-8 shadow-2xl shadow-black/80 my-6 max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-stone-950/80 hover:bg-stone-800 text-stone-400 hover:text-white border border-stone-800 transition-colors z-20 cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-amber-400 tracking-wider uppercase font-['Unbounded'] block">
              {isUa ? 'Система досвіду та рангів' : 'Mixology Experience & Pass'}
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-stone-100 font-['Unbounded']">
              {isUa ? 'Паспорт Сомельє' : 'Sommelier Member Pass'}
            </h2>
          </div>
        </div>

        {/* Hero Holographic Member Pass Card */}
        <div
          className={`relative rounded-3xl p-6 sm:p-7 bg-gradient-to-br ${current.bgGradient} border ${current.cardBorder} shadow-xl mb-6 overflow-hidden`}
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-center text-4xl shadow-inner">
                {current.badge}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-black/50 border border-white/10 text-[10px] font-bold font-['Unbounded'] text-amber-300 uppercase">
                    Рівень {current.level} / 5
                  </span>
                  <span className="text-xs text-stone-400 font-mono">
                    {favoritesCount} {isUa ? 'в обраному' : 'favorites'}
                  </span>
                </div>
                <h3 className="text-2xl font-black text-white font-['Unbounded'] mt-1">
                  {isUa ? current.titleUa : current.titleEn}
                </h3>
                <p className="text-xs sm:text-sm text-stone-300 mt-0.5 max-w-md">
                  {isUa ? current.taglineUa : current.taglineEn}
                </p>
              </div>
            </div>

            <button
              onClick={handleTriggerConfetti}
              className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold font-['Unbounded'] text-xs flex items-center gap-1.5 transition-all shadow-md cursor-pointer shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5" />
              {isUa ? 'Салют' : 'Celebrate'}
            </button>
          </div>

          {/* Description */}
          <p className="relative z-10 text-xs text-stone-300/90 leading-relaxed bg-black/30 p-3.5 rounded-2xl border border-white/5 mb-5">
            {isUa ? current.descriptionUa : current.descriptionEn}
          </p>

          {/* Progress bar to next rank */}
          <div className="relative z-10 bg-black/40 rounded-2xl p-4 border border-white/10">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-bold text-stone-300 font-['Unbounded'] flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                {next
                  ? (isUa ? `Прогрес до рангу «${next.titleUa}»` : `Progress to ${next.titleEn}`)
                  : (isUa ? 'Максимальний ранг досягнуто!' : 'Max rank reached!')}
              </span>
              <span className="font-mono text-amber-400 font-bold">
                {next ? `${progress.progressPercent}%` : '100%'}
              </span>
            </div>

            <div className="w-full h-3 bg-stone-950 rounded-full overflow-hidden p-0.5 border border-white/10">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-amber-300 rounded-full transition-all duration-700 ease-out"
                style={{ width: `${progress.progressPercent}%` }}
              />
            </div>

            {next && (
              <p className="text-[11px] text-stone-400 mt-2 flex items-center justify-between">
                <span>
                  {isUa
                    ? `Залишилось додати ще ${progress.neededForNext} коктейль(ів) до обраного`
                    : `Add ${progress.neededForNext} more favorite(s) to level up`}
                </span>
                <span className="font-mono text-stone-400">
                  {favoritesCount} / {next.minFavorites}
                </span>
              </p>
            )}
          </div>
        </div>

        {/* Flavor & Taste Stats */}
        {favoritesCount > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
            <div className="p-3.5 rounded-2xl bg-stone-950/80 border border-stone-800">
              <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block mb-1 font-['Unbounded']">
                {isUa ? 'Сер. міцність улюблених' : 'Avg. Favs ABV'}
              </span>
              <div className="text-lg font-black text-amber-400 font-mono flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-amber-500" />
                {progress.averageAbv}% ABV
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-stone-950/80 border border-stone-800">
              <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block mb-1 font-['Unbounded']">
                {isUa ? 'Улюблена основа' : 'Top Spirit Base'}
              </span>
              <div className="text-lg font-black text-stone-200 font-mono flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-sky-400" />
                {progress.topSpirit}
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-stone-950/80 border border-stone-800">
              <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block mb-1 font-['Unbounded']">
                {isUa ? 'Смаковий акцент' : 'Palate Profile'}
              </span>
              <div className="text-sm font-bold text-emerald-400 line-clamp-1 mt-1">
                {progress.topFlavorNote}
              </div>
            </div>
          </div>
        )}

        {/* All Available Ranks Roadmap */}
        <div className="mb-6">
          <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-3 font-['Unbounded'] flex items-center gap-2">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            {isUa ? 'Шкала міксологічних рангів' : 'Mixology Ranks Hierarchy'}
          </h4>

          <div className="space-y-2.5">
            {SOMMELIER_LEVELS.map((lvl) => {
              const isCurrent = lvl.id === current.id;
              const isUnlocked = favoritesCount >= lvl.minFavorites;

              return (
                <div
                  key={lvl.id}
                  className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                    isCurrent
                      ? 'bg-amber-500/10 border-amber-500/40 shadow-md shadow-amber-500/5'
                      : isUnlocked
                      ? 'bg-stone-950/70 border-stone-800/80 text-stone-300'
                      : 'bg-stone-950/30 border-stone-800/40 opacity-60 text-stone-500'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-stone-900 border border-stone-800 flex items-center justify-center text-xl shrink-0">
                      {lvl.badge}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs sm:text-sm font-['Unbounded'] text-stone-100">
                          {isUa ? lvl.titleUa : lvl.titleEn}
                        </span>
                        {isCurrent && (
                          <span className="px-2 py-0.5 rounded-md bg-amber-500 text-stone-950 text-[10px] font-black uppercase font-['Unbounded']">
                            {isUa ? 'Ваш ранг' : 'Current'}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-stone-400 line-clamp-1">
                        {isUa ? lvl.taglineUa : lvl.taglineEn}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[11px] font-mono font-medium text-stone-400">
                      {lvl.minFavorites}+ {isUa ? 'кокт.' : 'drinks'}
                    </span>
                    {isUnlocked ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Lock className="w-4 h-4 text-stone-600" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2 border-t border-stone-800">
          <button
            onClick={handleShareStatus}
            className="flex-1 py-3 px-4 rounded-xl bg-stone-950 hover:bg-stone-800 text-stone-200 border border-stone-800 font-bold font-['Unbounded'] text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span>{isUa ? 'Скопійовано!' : 'Copied!'}</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4 text-amber-400" />
                <span>{isUa ? 'Поділитись рангом' : 'Share Rank'}</span>
              </>
            )}
          </button>

          <button
            onClick={() => {
              onClose();
              onOpenCatalog();
            }}
            className="flex-1 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold font-['Unbounded'] text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-amber-500/20 cursor-pointer"
          >
            <span>{isUa ? 'Перейти до каталогу за новим рангом' : 'Browse Catalog to Level Up'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
