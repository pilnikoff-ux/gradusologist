import React, { useState } from 'react';
import { COCKTAILS_DATABASE } from '../data/cocktails';
import { CrazyCocktail, Language, Cocktail } from '../types';
import { generateProceduralCrazyCocktail } from '../data/crazyRecipes';
import { Sparkles, Skull, Flame, Shuffle, BookOpen, Trash2, Check, Copy, AlertTriangle, Wine, RefreshCw } from 'lucide-react';
import { playClinkSound, playMadnessSound } from '../utils/audio';

interface Props {
  language: Language;
  onOpenCocktailModal?: (c: Cocktail) => void;
  journal: CrazyCocktail[];
  onSaveToJournal: (item: CrazyCocktail) => void;
  onDeleteFromJournal: (id: string) => void;
  onClearJournal: () => void;
  onOpenFullJournal?: () => void;
}

export const SurpriseGenerators: React.FC<Props> = ({
  language,
  onOpenCocktailModal,
  journal,
  onSaveToJournal,
  onDeleteFromJournal,
  onClearJournal,
  onOpenFullJournal
}) => {
  const isUa = language === 'uk';

  // Surprise standard state
  const [surpriseCocktail, setSurpriseCocktail] = useState<Cocktail | null>(null);
  const [isShakingSurprise, setIsShakingSurprise] = useState(false);

  // Crazy "Це пиздець" state
  const [crazyCocktail, setCrazyCocktail] = useState<CrazyCocktail | null>(null);
  const [isLoadingCrazy, setIsLoadingCrazy] = useState(false);
  const [crazyError, setCrazyError] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showJournalTab, setShowJournalTab] = useState(false);

  // 1. "Мене той во, цей во" Generator
  const handleRandomSurprise = () => {
    if (isShakingSurprise) return;
    setIsShakingSurprise(true);
    playClinkSound();

    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * COCKTAILS_DATABASE.length);
      setSurpriseCocktail(COCKTAILS_DATABASE[randomIndex]);
      setIsShakingSurprise(false);
      playClinkSound();
    }, 700);
  };

  // 2. "Це пиздець" Generator
  const handleGenerateCrazy = async () => {
    if (isLoadingCrazy) return;
    setIsLoadingCrazy(true);
    setCrazyError(null);
    playMadnessSound();

    try {
      const res = await fetch('/api/gemini/crazy-cocktail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ language })
      });

      if (!res.ok) {
        throw new Error('API request failed');
      }

      const resData = await res.json();
      const rawCocktail = resData?.cocktail || resData;

      if (!rawCocktail || !rawCocktail.name) {
        throw new Error('Invalid response structure');
      }

      const normalizedCocktail: CrazyCocktail = {
        id: rawCocktail.id || `crazy_${Date.now()}`,
        name: rawCocktail.name,
        tagline: rawCocktail.tagline || rawCocktail.subtitle || (isUa ? 'Експериментальний напій' : 'Experimental drink'),
        dangerLevel: Math.min(5, Math.max(1, Number(rawCocktail.dangerLevel) || 5)),
        ingredients: Array.isArray(rawCocktail.ingredients)
          ? rawCocktail.ingredients.map((ing: any) =>
              typeof ing === 'string'
                ? ing
                : `${ing.name || ''} — ${ing.amount || ''} ${ing.note ? `(${ing.note})` : ''}`.trim()
            )
          : isUa
          ? ['Секретний дистилят — 50 мл', 'Крафтовий тонік — 100 мл']
          : ['Secret spirit — 50 ml', 'Craft tonic — 100 ml'],
        instructions: Array.isArray(rawCocktail.instructions)
          ? rawCocktail.instructions.map((inst: any) => String(inst))
          : isUa
          ? ['Змішати з льодом і подати негайно.']
          : ['Mix with ice and serve immediately.'],
        morningEffect: rawCocktail.morningEffect || rawCocktail.morningAfterEffect || (isUa ? 'Перезавантаження дня.' : 'Day reset.'),
        createdAt: rawCocktail.createdAt || new Date().toISOString()
      };

      setCrazyCocktail(normalizedCocktail);
    } catch {
      // Endless procedural generator fallback
      const fallback: CrazyCocktail = generateProceduralCrazyCocktail(language);
      setCrazyCocktail(fallback);
    } finally {
      setIsLoadingCrazy(false);
    }
  };

  const handleCopyCrazy = (item: CrazyCocktail) => {
    const danger = Math.min(5, Math.max(1, Number(item.dangerLevel) || 5));
    const ingredientsText = (item.ingredients || []).join('\n');
    const instructionsText = (item.instructions || []).join('\n');
    const text = isUa
      ? `💀 ${item.name} (${'⚡'.repeat(danger)})\n${item.tagline}\n\nІнгредієнти:\n${ingredientsText}\n\nПриготування:\n${instructionsText}\n\nРанковий ефект:\n${item.morningEffect || ''}`
      : `💀 ${item.name} (${'⚡'.repeat(danger)})\n${item.tagline}\n\nIngredients:\n${ingredientsText}\n\nPreparation:\n${instructionsText}\n\nMorning Effect:\n${item.morningEffect || ''}`;
    navigator.clipboard.writeText(text);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="generators-section" className="py-12 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-xs font-semibold uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          {isUa ? 'Швидкі Генератори Настрою' : 'Quick Mood Generators'}
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-['Unbounded'] tracking-tight">
          {isUa ? 'Генератори Коктейлів Градусолога' : 'Gradusologist Cocktail Generators'}
        </h2>
        <p className="mt-2 text-stone-400 text-sm sm:text-base">
          {isUa
            ? 'Від швидкого рандомного вибору для невизначених до генерації божевільних неіснуючих рецептів з власним журналом.'
            : 'From quick random picks for the indecisive to generating impossible crazy recipes with your personal journal.'}
        </p>
      </div>

      {/* Two Main Hero Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {/* Button 1: "Мені той во, цей во" */}
        <div className="rounded-3xl bg-gradient-to-b from-stone-900 via-stone-900 to-stone-950 border-2 border-amber-500/40 p-6 sm:p-8 flex flex-col justify-between shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none group-hover:scale-110 transition-transform">
            <Shuffle className="w-32 h-32 text-amber-400" />
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
                <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300">
                  <Wine className="w-4 h-4" />
                </div>
                <span>{isUa ? 'Розумний Рандомайзер' : 'Smart Randomizer'}</span>
              </div>
              <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider font-mono">
                {isUa ? '🍸 100% СМАЧНО' : '🍸 100% DELICIOUS'}
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white font-['Unbounded'] mb-2">
              {isUa ? '«Мені той во, цей во»' : '"Surprise Me (The Usual)"'}
            </h3>
            <p className="text-xs sm:text-sm text-stone-400 mb-6">
              {isUa
                ? '«Не знаю шо хочу, зроби щось смачненьке на свій смак!» Натисни і отримай перевірений шедевр з рецептом, пропорціями та закусками.'
                : 'When you stand at the bar paralyzed by indecision. Click and let fate pick a verified craft classic!'}
            </p>
          </div>

          <button
            id="surprise-generator-btn"
            onClick={handleRandomSurprise}
            disabled={isShakingSurprise}
            className={`w-full py-4 px-6 rounded-2xl font-['Unbounded'] font-bold text-sm sm:text-base flex items-center justify-center gap-3 transition-all shadow-lg cursor-pointer ${
              isShakingSurprise
                ? 'bg-amber-600 text-stone-950 animate-bounce'
                : 'bg-gradient-to-r from-amber-500 to-yellow-500 hover:brightness-110 text-stone-950 shadow-amber-500/20 active:scale-95'
            }`}
          >
            <Shuffle className={`w-5 h-5 ${isShakingSurprise ? 'animate-spin' : ''}`} />
            {isShakingSurprise
              ? isUa ? 'Шейкер гуркоче...' : 'Shaking shaker...'
              : isUa ? 'Крутанути «Мені той во, цей во»' : 'Roll "Surprise Me"'}
          </button>
        </div>

        {/* Button 2: "Це пиздець" */}
        <div className="keep-dark rounded-3xl bg-gradient-to-b from-stone-900 via-stone-900 to-stone-950 border-2 border-rose-600/50 p-6 sm:p-8 flex flex-col justify-between shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none group-hover:scale-110 transition-transform">
            <Skull className="w-32 h-32 text-rose-500" />
          </div>

          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-rose-400 uppercase tracking-wider mb-2">
              <Flame className="w-4 h-4" />
              {isUa ? 'Генератор неіснуючих рецептів' : 'Impossible Cocktails Generator'}
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white font-['Unbounded'] mb-2">
              {isUa ? '«Це пиздець»' : '"Total Madness"'}
            </h3>
            <p className="text-xs sm:text-sm text-stone-400 mb-6">
              {isUa
                ? 'Генератор екстремальних, саркастичних та неіснуючих у природі коктейлів за допомогою ШІ. Рецепти, що запам\'ятаються навічно!'
                : 'AI-powered generator of unhinged, impossible, and hilarious mock/hard recipes. Save legendary disasters to your journal!'}
            </p>
          </div>

          <div className="flex gap-2">
            <button
              id="crazy-generator-btn"
              onClick={handleGenerateCrazy}
              disabled={isLoadingCrazy}
              className={`flex-1 py-4 px-6 rounded-2xl font-['Unbounded'] font-bold text-sm sm:text-base flex items-center justify-center gap-3 transition-all shadow-lg cursor-pointer ${
                isLoadingCrazy
                  ? 'bg-rose-900 text-rose-200 cursor-wait'
                  : 'bg-gradient-to-r from-rose-600 via-red-600 to-amber-600 hover:brightness-110 text-white shadow-rose-600/25 active:scale-95'
              }`}
            >
              <Skull className={`w-5 h-5 ${isLoadingCrazy ? 'animate-spin' : ''}`} />
              {isLoadingCrazy
                ? isUa ? 'ШІ змішує аномалію...' : 'AI brewing anomaly...'
                : isUa ? 'Згенерувати «Це пиздець»' : 'Brew "Total Madness"'}
            </button>
            <button
              onClick={() => {
                playClinkSound();
                if (onOpenFullJournal) {
                  onOpenFullJournal();
                } else {
                  setShowJournalTab(!showJournalTab);
                }
              }}
              className="px-4 py-4 rounded-2xl bg-stone-950 border border-stone-800 text-stone-300 hover:text-amber-400 hover:border-amber-500/50 flex items-center gap-2 text-xs font-bold font-['Unbounded'] transition-colors cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">{isUa ? 'Журнал' : 'Journal'}</span>
              <span className="px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono text-[10px]">
                {journal.length}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Surprise Cocktail Reveal Card */}
      {surpriseCocktail && (
        <div className="mb-10 p-6 rounded-3xl bg-stone-900 border border-amber-500/50 shadow-2xl animate-fadeIn flex flex-col md:flex-row gap-6 items-center">
          <div className="w-full md:w-48 h-40 rounded-2xl overflow-hidden bg-stone-950 shrink-0">
            <img
              src={surpriseCocktail.image}
              alt={isUa ? surpriseCocktail.name : surpriseCocktail.nameEn}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase">
                {surpriseCocktail.type}
              </span>
              <span className="text-xs text-stone-400 font-mono">{surpriseCocktail.abv}% ABV</span>
            </div>
            <h4 className="text-2xl font-black text-white font-['Unbounded']">
              {isUa ? surpriseCocktail.name : surpriseCocktail.nameEn}
            </h4>
            <p className="text-xs sm:text-sm text-stone-300 mt-1 mb-3">
              {isUa ? surpriseCocktail.description : surpriseCocktail.descriptionEn}
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => onOpenCocktailModal && onOpenCocktailModal(surpriseCocktail)}
                className="py-2 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold font-['Unbounded'] transition-colors"
              >
                {isUa ? 'Відкрити повний рецепт' : 'Open Full Recipe'}
              </button>
              <button
                onClick={handleRandomSurprise}
                className="py-2 px-4 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold transition-colors flex items-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                {isUa ? 'Інший варіант' : 'Another pick'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Crazy Cocktail Reveal Card */}
      {crazyCocktail && (
        <div className="mb-10 p-6 sm:p-8 rounded-3xl bg-stone-950 border-2 border-rose-500 shadow-2xl shadow-rose-900/30 animate-fadeIn relative overflow-hidden">
          {/* Top banner */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4 border-b border-stone-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-rose-600 text-white">
                <Skull className="w-4 h-4" />
              </span>
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">
                {isUa ? 'Неіснуючий Аномальний Рецепт' : 'Impossible Anomaly Recipe'}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-xs text-stone-400 mr-1">{isUa ? 'Рівень загрози:' : 'Threat Level:'}</span>
              {Array.from({ length: Math.min(5, Math.max(1, Number(crazyCocktail.dangerLevel) || 5)) }).map((_, i) => (
                <Flame key={i} className="w-4 h-4 text-rose-500 fill-rose-500 animate-pulse" />
              ))}
            </div>
          </div>

          <h4 className="text-2xl sm:text-3xl font-black text-white font-['Unbounded'] mb-1">
            {crazyCocktail.name}
          </h4>
          <p className="text-xs sm:text-sm text-amber-300 italic mb-6">
            "{crazyCocktail.tagline}"
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Crazy Ingredients */}
            <div className="p-4 rounded-2xl bg-stone-900/80 border border-stone-800">
              <h5 className="text-xs font-bold text-rose-400 uppercase tracking-wider mb-2">
                {isUa ? 'Інгредієнти:' : 'Ingredients:'}
              </h5>
              <ul className="space-y-1.5 text-xs text-stone-300">
                {(crazyCocktail.ingredients || []).map((ing, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-rose-500">•</span>
                    <span>{typeof ing === 'string' ? ing : String(ing)}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Crazy Instructions */}
            <div className="p-4 rounded-2xl bg-stone-900/80 border border-stone-800">
              <h5 className="text-xs font-bold text-rose-400 uppercase tracking-wider mb-2">
                {isUa ? 'Приготування:' : 'Method:'}
              </h5>
              <ol className="space-y-1.5 text-xs text-stone-300 list-decimal list-inside leading-relaxed">
                {(crazyCocktail.instructions || []).map((inst, idx) => (
                  <li key={idx}>{typeof inst === 'string' ? inst : String(inst)}</li>
                ))}
              </ol>
            </div>
          </div>

          {/* Morning Effect */}
          <div className="p-4 rounded-2xl bg-rose-950/30 border border-rose-800/50 mb-6">
            <div className="flex items-center gap-2 text-xs font-bold text-rose-300 uppercase tracking-wider mb-1">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              {isUa ? 'Ранковий ефект після вживання:' : 'Morning-after effect:'}
            </div>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              {crazyCocktail.morningEffect}
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => onSaveToJournal(crazyCocktail)}
              className="py-2.5 px-5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold font-['Unbounded'] flex items-center gap-2 transition-all shadow-lg"
            >
              <BookOpen className="w-4 h-4" />
              {isUa ? 'Занести в Журнал' : 'Save to Journal'}
            </button>
            <button
              onClick={() => handleCopyCrazy(crazyCocktail)}
              className="py-2.5 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-800 text-stone-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              {copiedId === crazyCocktail.id ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  {isUa ? 'Скопійовано!' : 'Copied!'}
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  {isUa ? 'Скопіювати рецепт' : 'Copy'}
                </>
              )}
            </button>
            <button
              onClick={handleGenerateCrazy}
              className="py-2.5 px-4 rounded-xl bg-rose-950/60 hover:bg-rose-900 border border-rose-800/60 text-rose-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              {isUa ? 'Ще одну дичину!' : 'Brew another one!'}
            </button>
          </div>
        </div>
      )}

      {/* Journal Modal / Section */}
      {showJournalTab && (
        <div className="p-6 sm:p-8 rounded-3xl bg-stone-900 border border-stone-800 shadow-2xl mb-8 animate-fadeIn">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-stone-800">
            <div className="flex items-center gap-3">
              <BookOpen className="w-6 h-6 text-amber-400" />
              <div>
                <h4 className="text-xl font-bold text-white font-['Unbounded']">
                  {isUa ? 'Журнал Аномальних Рецептів («Це пиздець»)' : 'Journal of Impossible Cocktails'}
                </h4>
                <p className="text-xs text-stone-400">
                  {isUa ? `Збережено ${journal.length} екстремальних авторських рецептів` : `Saved ${journal.length} extreme recipes`}
                </p>
              </div>
            </div>
            {journal.length > 0 && (
              <button
                onClick={onClearJournal}
                className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 border border-rose-900/60 px-3 py-1.5 rounded-lg hover:bg-rose-950/40 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                {isUa ? 'Очистити все' : 'Clear all'}
              </button>
            )}
          </div>

          {journal.length === 0 ? (
            <div className="py-12 text-center text-stone-500 text-xs sm:text-sm">
              <Skull className="w-10 h-10 mx-auto mb-2 opacity-30" />
              {isUa
                ? 'Журнал поки порожній. Згенеруй «Це пиздець» і натисни «Занести в Журнал»!'
                : 'Journal is empty. Generate a "Total Madness" recipe and click "Save to Journal"!'}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {journal.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl bg-stone-950 border border-stone-800 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <h5 className="font-bold text-amber-300 text-sm font-['Unbounded']">
                        {item.name}
                      </h5>
                      <button
                        onClick={() => onDeleteFromJournal(item.id)}
                        className="p-1 text-stone-500 hover:text-rose-400 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-xs text-stone-400 italic mb-2">"{item.tagline}"</p>
                    <div className="text-[11px] text-stone-300 space-y-1 mb-3">
                      {(item.ingredients || []).slice(0, 3).map((ing, i) => (
                        <div key={i} className="truncate">• {typeof ing === 'string' ? ing : String(ing)}</div>
                      ))}
                    </div>
                  </div>
                  <div className="pt-2 border-t border-stone-800 flex justify-between items-center text-[11px]">
                    <span className="text-rose-400 font-bold">⚡ {isUa ? 'Рівень' : 'Level'} {item.dangerLevel}/5</span>
                    <button
                      onClick={() => handleCopyCrazy(item)}
                      className="text-amber-400 hover:underline flex items-center gap-1"
                    >
                      <Copy className="w-3 h-3" />
                      {isUa ? 'Скопіювати' : 'Copy'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
};
