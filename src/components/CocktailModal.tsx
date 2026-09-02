import React, { useState } from 'react';
import { CocktailItem, Language } from '../types';
import {
  X,
  Droplets,
  Clock,
  Wine,
  Utensils,
  Share2,
  Check,
  Heart,
  Sparkles,
  Flame,
  Award,
  BookOpen
} from 'lucide-react';
import { playClinkSound } from '../utils/audio';

interface Props {
  cocktail: CocktailItem | null;
  language: Language;
  onClose: () => void;
  isFavorite?: boolean;
  onToggleFavorite?: (id: string) => void;
}

export const CocktailModal: React.FC<Props> = ({
  cocktail,
  language,
  onClose,
  isFavorite = false,
  onToggleFavorite
}) => {
  const [copied, setCopied] = useState(false);
  const isUa = language === 'uk';

  if (!cocktail) return null;

  const handleCopyRecipe = () => {
    const text = isUa
      ? `🍸 ${cocktail.name} (${cocktail.type?.toUpperCase()}, ${cocktail.abv}% об.)\n\nІнгредієнти:\n${cocktail.ingredients.map((i) => `• ${i.name}: ${i.amount}`).join('\n')}\n\nПриготування:\n${cocktail.instructions.join('\n')}\n\n🍽️ Гастрономічний пейринг:\n${cocktail.foodPairing || ''}\nЗакуски: ${(cocktail.idealSnacks || []).join(', ')}`
      : `🍸 ${cocktail.nameEn} (${cocktail.type?.toUpperCase()}, ${cocktail.abv}% ABV)\n\nIngredients:\n${cocktail.ingredients.map((i) => `• ${i.nameEn}: ${i.amount}`).join('\n')}\n\nInstructions:\n${cocktail.instructionsEn.join('\n')}\n\n🍽️ Food Pairing:\n${cocktail.foodPairingEn || ''}\nSnacks: ${(cocktail.idealSnacksEn || []).join(', ')}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    playClinkSound();
    setTimeout(() => setCopied(false), 2500);
  };

  const sweetVal = cocktail.flavorProfile?.sweetness ?? cocktail.flavorProfile?.sweet ?? 3;
  const sourVal = cocktail.flavorProfile?.sourness ?? cocktail.flavorProfile?.sour ?? 3;
  const bitterVal = cocktail.flavorProfile?.bitterness ?? cocktail.flavorProfile?.bitter ?? 1;
  const strongVal = cocktail.flavorProfile?.strength ?? cocktail.flavorProfile?.strong ?? 3;
  const freshVal = cocktail.flavorProfile?.refreshingness ?? cocktail.flavorProfile?.refreshing ?? 4;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div
        className="relative w-full max-w-2xl rounded-3xl bg-stone-900 border border-stone-700 p-5 sm:p-8 shadow-2xl shadow-black/90 my-6 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-stone-800/90 hover:bg-stone-700 text-stone-300 transition-colors z-20"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Header Card */}
        <div className="flex flex-col sm:flex-row gap-5 mb-6">
          <div className="w-full sm:w-48 h-48 sm:h-52 rounded-2xl overflow-hidden bg-stone-950 shrink-0 relative shadow-inner">
            <img
              src={cocktail.image}
              alt={isUa ? cocktail.name : cocktail.nameEn}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
            <div className="absolute top-2 left-2 px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md text-[11px] font-bold text-amber-400 font-mono border border-amber-500/30">
              {cocktail.abv}% ABV
            </div>
            {cocktail.top10Rank && (
              <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-lg bg-amber-500 text-stone-950 text-[10px] font-black font-['Unbounded'] shadow-md flex items-center gap-1">
                <Award className="w-3 h-3" />
                TOP #{cocktail.top10Rank}
              </div>
            )}
          </div>

          <div className="flex-1 flex flex-col justify-center">
            <div className="flex flex-wrap gap-2 items-center mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[11px] font-bold uppercase tracking-wider">
                {cocktail.type}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-stone-800 text-stone-300 text-[11px] font-medium">
                {isUa ? (cocktail.glassware || cocktail.glass) : (cocktail.glasswareEn || cocktail.glassEn)}
              </span>
              {(cocktail.calories || cocktail.caloriesApprox) && (
                <span className="text-xs text-stone-500 font-mono">
                  ~{cocktail.calories || cocktail.caloriesApprox} kcal
                </span>
              )}
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-['Unbounded'] tracking-tight">
              {isUa ? cocktail.name : cocktail.nameEn}
            </h3>

            {cocktail.originalName && cocktail.originalName !== cocktail.name && (
              <p className="text-xs text-amber-400/80 font-mono mt-0.5">
                {cocktail.originalName}
              </p>
            )}

            <p className="text-xs sm:text-sm text-stone-300 mt-2 leading-relaxed">
              {isUa
                ? (cocktail.description || cocktail.emotionalReason || cocktail.history)
                : (cocktail.descriptionEn || cocktail.emotionalReasonEn || cocktail.historyEn)}
            </p>
          </div>
        </div>

        {/* Flavor Profile Bars */}
        <div className="p-3.5 rounded-2xl bg-stone-950 border border-stone-800 mb-5">
          <h4 className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            {isUa ? 'Смаковий профіль' : 'Flavor Profile'}
          </h4>
          <div className="grid grid-cols-5 gap-2 text-center text-xs">
            <div>
              <div className="text-[10px] text-stone-400 mb-1">{isUa ? 'Солод' : 'Sweet'}</div>
              <div className="h-1.5 rounded-full bg-stone-800 overflow-hidden">
                <div className="h-full bg-amber-400" style={{ width: `${(sweetVal / 5) * 100}%` }} />
              </div>
            </div>
            <div>
              <div className="text-[10px] text-stone-400 mb-1">{isUa ? 'Кислинка' : 'Sour'}</div>
              <div className="h-1.5 rounded-full bg-stone-800 overflow-hidden">
                <div className="h-full bg-lime-400" style={{ width: `${(sourVal / 5) * 100}%` }} />
              </div>
            </div>
            <div>
              <div className="text-[10px] text-stone-400 mb-1">{isUa ? 'Гіркота' : 'Bitter'}</div>
              <div className="h-1.5 rounded-full bg-stone-800 overflow-hidden">
                <div className="h-full bg-rose-500" style={{ width: `${(bitterVal / 5) * 100}%` }} />
              </div>
            </div>
            <div>
              <div className="text-[10px] text-stone-400 mb-1">{isUa ? 'Міцність' : 'Strength'}</div>
              <div className="h-1.5 rounded-full bg-stone-800 overflow-hidden">
                <div className="h-full bg-red-500" style={{ width: `${(strongVal / 5) * 100}%` }} />
              </div>
            </div>
            <div>
              <div className="text-[10px] text-stone-400 mb-1">{isUa ? 'Свіжість' : 'Fresh'}</div>
              <div className="h-1.5 rounded-full bg-stone-800 overflow-hidden">
                <div className="h-full bg-cyan-400" style={{ width: `${(freshVal / 5) * 100}%` }} />
              </div>
            </div>
          </div>
        </div>

        {/* 🍽️ Food Pairing & Snacks Card */}
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 mb-5">
          <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-2">
            <Utensils className="w-4 h-4 text-amber-400" />
            {isUa ? '🍽️ Рекомендації: З якою їжею та закусками вживати' : '🍽️ Food Pairing & Best Snacks'}
          </h4>

          <p className="text-xs sm:text-sm text-stone-200 leading-relaxed mb-3">
            {isUa
              ? (cocktail.foodPairing || 'Коктейль чудово доповнює благородні сири, легкі брускети, горіхи або м\'ясні делікатеси.')
              : (cocktail.foodPairingEn || 'Pairs beautifully with fine cheeses, crispy bruschetta, nuts, and charcuterie delicacies.')}
          </p>

          {cocktail.idealSnacks && cocktail.idealSnacks.length > 0 && (
            <div>
              <div className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider mb-1.5">
                {isUa ? 'Ідеальні закуски до келиха:' : 'Ideal Finger Food & Snacks:'}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {(isUa ? cocktail.idealSnacks : (cocktail.idealSnacksEn || cocktail.idealSnacks)).map(
                  (snack, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-stone-900 border border-amber-500/30 text-amber-400 text-xs font-medium"
                    >
                      🍢 {snack}
                    </span>
                  )
                )}
              </div>
            </div>
          )}
        </div>

        {/* Ingredients & Instructions 2-Column */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          {/* Ingredients */}
          <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800">
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Droplets className="w-3.5 h-3.5" />
              {isUa ? 'Інгредієнти та пропорції' : 'Ingredients'}
            </h4>
            <ul className="space-y-2 text-xs">
              {cocktail.ingredients.map((ing, idx) => (
                <li
                  key={idx}
                  className="flex justify-between items-center text-stone-300 border-b border-stone-800/60 pb-1.5 last:border-none"
                >
                  <span>{isUa ? ing.name : ing.nameEn}</span>
                  <span className="font-mono font-semibold text-amber-300">{isUa ? ing.amount : (ing.amountEn || ing.amount)}</span>
                </li>
              ))}
              {cocktail.garnish && (
                <li className="pt-2 text-stone-400 italic">
                  🌿 {isUa ? 'Гарніш: ' : 'Garnish: '} {isUa ? cocktail.garnish : (cocktail.garnishEn || cocktail.garnish)}
                </li>
              )}
            </ul>
          </div>

          {/* Instructions */}
          <div className="p-4 rounded-2xl bg-stone-950/70 border border-stone-800">
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {isUa ? 'Покрокове приготування' : 'Step-by-Step Method'}
            </h4>
            <ol className="space-y-2 text-xs text-stone-300 list-decimal list-inside leading-relaxed">
              {(isUa ? cocktail.instructions : cocktail.instructionsEn).map((step, idx) => (
                <li key={idx} className="pl-1">
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* History / Origin Story */}
        {(cocktail.history || cocktail.historyEn) && (
          <div className="p-3.5 rounded-2xl bg-stone-950/50 border border-stone-800/70 mb-5">
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-amber-400 uppercase tracking-wider mb-1">
              <BookOpen className="w-3.5 h-3.5" />
              {isUa ? 'Історична довідка' : 'Historical Origin'}
            </div>
            <p className="text-xs text-stone-400 italic leading-relaxed">
              {isUa ? cocktail.history : cocktail.historyEn}
            </p>
          </div>
        )}

        {/* Modal Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          {onToggleFavorite && (
            <button
              onClick={() => {
                onToggleFavorite(cocktail.id);
                playClinkSound();
              }}
              className={`py-3 px-5 rounded-xl font-bold font-['Unbounded'] text-xs flex items-center justify-center gap-2 transition-all ${
                isFavorite
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 hover:bg-rose-500/30'
                  : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
              }`}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-400 text-rose-400' : ''}`} />
              {isFavorite
                ? (isUa ? 'В обраному' : 'In Favorites')
                : (isUa ? 'Додати в обране' : 'Save to Favorites')}
            </button>
          )}

          <button
            onClick={handleCopyRecipe}
            className="flex-1 py-3 px-5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold font-['Unbounded'] text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-amber-500/20"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-stone-950" />
                {isUa ? 'Рецепт та закуски скопійовано!' : 'Recipe & Food Pairing Copied!'}
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4" />
                {isUa ? 'Скопіювати рецепт з пейрингом' : 'Copy Recipe with Pairings'}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
