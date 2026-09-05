import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import {
  PartyPopper,
  Sparkles,
  Wine,
  Apple,
  Users,
  RotateCw,
  CheckCircle2,
  Flame,
  Plus,
  X,
  Volume2,
  Trophy,
  Coffee,
  HelpCircle,
  GlassWater
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { playTickSound, playWinSound, playClinkSound } from '../utils/audio';

interface Props {
  language: Language;
}

export interface PartyChallenge {
  id: string;
  title: string;
  action: string;
  intensity: 'low' | 'medium' | 'high';
  icon: string;
}

const DEFAULT_ALCOHOLS = [
  'Єгермейстер',
  'Горілка',
  'Віскі',
  'Джин',
  'Пиво',
  'Вино',
  'Текіла',
  'Ром'
];

const DEFAULT_SNACKS = [
  'Солоні огірочки',
  'Лимон з сіллю',
  'Сирна нарізка',
  'Чіпси',
  'Бутерброди зі шпротами',
  'Оливки',
  'Чорний шоколад'
];

const DEFAULT_SOFT_DRINKS = [
  'Бабусин компот',
  'Тонік',
  'Кола',
  'Яблучний сік',
  'Огірковий розсіл',
  'Мінералка з газом'
];

export const PartyModeRoulette: React.FC<Props> = ({ language }) => {
  const isUa = language === 'uk';

  // Setup state
  const [alcoholOptions, setAlcoholOptions] = useState<string[]>(DEFAULT_ALCOHOLS);
  const [alcohols, setAlcohols] = useState<string[]>(['Єгермейстер', 'Горілка', 'Пиво']);

  const [snackOptions, setSnackOptions] = useState<string[]>(DEFAULT_SNACKS);
  const [snacks, setSnacks] = useState<string[]>(['Солоні огірочки', 'Лимон з сіллю', 'Чіпси']);

  const [softOptions, setSoftOptions] = useState<string[]>(DEFAULT_SOFT_DRINKS);
  const [softDrinks, setSoftDrinks] = useState<string[]>(['Бабусин компот', 'Тонік', 'Кола']);

  const [peopleCount, setPeopleCount] = useState<number>(4);
  const [guestNamesInput, setGuestNamesInput] = useState<string>('Саня, Юля, Макс, Аліна');
  const [partyVibe, setPartyVibe] = useState<'light' | 'party' | 'hardcore'>('party');

  // Input fields for adding custom items
  const [customAlc, setCustomAlc] = useState('');
  const [customSnack, setCustomSnack] = useState('');
  const [customSoft, setCustomSoft] = useState('');

  // Game state
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [challenges, setChallenges] = useState<PartyChallenge[]>([]);
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState<number>(0);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState<number>(0);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [completedCount, setCompletedCount] = useState<number>(0);
  const [roundNumber, setRoundNumber] = useState<number>(1);

  // Derived guests list
  const guests = guestNamesInput
    .split(/[,;\n]+/)
    .map((s) => s.trim())
    .filter(Boolean);
  const activeGuestNames =
    guests.length > 0
      ? guests
      : Array.from({ length: peopleCount }, (_, i) => `${isUa ? 'Гравець' : 'Player'} ${i + 1}`);

  // Handlers for toggling chips
  const toggleChip = (
    item: string,
    list: string[],
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    playClinkSound();
    if (list.includes(item)) {
      if (list.length > 1) {
        setter(list.filter((i) => i !== item));
      }
    } else {
      setter([...list, item]);
    }
  };

  // Add custom alcohol
  const handleAddAlcohol = () => {
    const trimmed = customAlc.trim();
    if (!trimmed) return;
    playClinkSound();
    const items = trimmed
      .split(/[,;\n]+/)
      .map((s) => s.trim())
      .filter(Boolean);

    setAlcoholOptions((prev) => {
      const next = [...prev];
      items.forEach((item) => {
        if (!next.includes(item)) next.push(item);
      });
      return next;
    });

    setAlcohols((prev) => {
      const next = [...prev];
      items.forEach((item) => {
        if (!next.includes(item)) next.push(item);
      });
      return next;
    });

    setCustomAlc('');
  };

  const handleRemoveCustomAlcohol = (itemToRemove: string, e: React.MouseEvent) => {
    e.stopPropagation();
    playClinkSound();
    setAlcoholOptions((prev) => prev.filter((i) => i !== itemToRemove));
    setAlcohols((prev) => prev.filter((i) => i !== itemToRemove));
  };

  // Add custom snack
  const handleAddSnack = () => {
    const trimmed = customSnack.trim();
    if (!trimmed) return;
    playClinkSound();
    const items = trimmed
      .split(/[,;\n]+/)
      .map((s) => s.trim())
      .filter(Boolean);

    setSnackOptions((prev) => {
      const next = [...prev];
      items.forEach((item) => {
        if (!next.includes(item)) next.push(item);
      });
      return next;
    });

    setSnacks((prev) => {
      const next = [...prev];
      items.forEach((item) => {
        if (!next.includes(item)) next.push(item);
      });
      return next;
    });

    setCustomSnack('');
  };

  const handleRemoveCustomSnack = (itemToRemove: string, e: React.MouseEvent) => {
    e.stopPropagation();
    playClinkSound();
    setSnackOptions((prev) => prev.filter((i) => i !== itemToRemove));
    setSnacks((prev) => prev.filter((i) => i !== itemToRemove));
  };

  // Add custom soft drink
  const handleAddSoftDrink = () => {
    const trimmed = customSoft.trim();
    if (!trimmed) return;
    playClinkSound();
    const items = trimmed
      .split(/[,;\n]+/)
      .map((s) => s.trim())
      .filter(Boolean);

    setSoftOptions((prev) => {
      const next = [...prev];
      items.forEach((item) => {
        if (!next.includes(item)) next.push(item);
      });
      return next;
    });

    setSoftDrinks((prev) => {
      const next = [...prev];
      items.forEach((item) => {
        if (!next.includes(item)) next.push(item);
      });
      return next;
    });

    setCustomSoft('');
  };

  const handleRemoveCustomSoftDrink = (itemToRemove: string, e: React.MouseEvent) => {
    e.stopPropagation();
    playClinkSound();
    setSoftOptions((prev) => prev.filter((i) => i !== itemToRemove));
    setSoftDrinks((prev) => prev.filter((i) => i !== itemToRemove));
  };

  // Generate challenges using Gemini endpoint with offline fallback
  const handleStartGame = async () => {
    setIsLoading(true);
    playClinkSound();

    try {
      const res = await fetch('/api/gemini/party-roulette', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          alcohols,
          snacks,
          softDrinks,
          peopleCount,
          guestNames: activeGuestNames,
          partyVibe,
          language
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.challenges && Array.isArray(data.challenges) && data.challenges.length > 0) {
          setChallenges(data.challenges);
          setCurrentChallengeIndex(0);
          setCurrentPlayerIndex(0);
          setCompletedCount(0);
          setRoundNumber(1);
          setIsPlaying(true);
          playWinSound();
          setIsLoading(false);
          return;
        }
      }
    } catch (err) {
      console.warn('Party roulette generation error:', err);
    }

    // Fallback generated locally
    const fallbackList: PartyChallenge[] = [
      {
        id: 'c1',
        title: isUa ? '🎯 Пряме влучання' : '🎯 Direct Shot',
        action: isUa
          ? `Випий 40 мл [${alcohols[0] || 'алкоголю'}] і закуси [${snacks[0] || 'закускою'}] без допомоги рук!`
          : `Take 40 ml of [${alcohols[0] || 'drinks'}] and eat [${snacks[0] || 'snack'}] with no hands!`,
        intensity: 'medium',
        icon: '🎯'
      },
      {
        id: 'c2',
        title: isUa ? '😭 Тобі не пощастило!' : '😭 Unlucky Sip',
        action: isUa
          ? `Тобі не повезло: всі піднімають алкоголь, а ти пʼєш повний келих [${softDrinks[0] || 'безалкогольного'}] залпом і кажеш душевний тост!`
          : `Unlucky: everyone raises alcohol, while you must down a full glass of [${softDrinks[0] || 'soft drink'}] in one gulp!`,
        intensity: 'low',
        icon: '🧃'
      },
      {
        id: 'c3',
        title: isUa ? '🧪 Пекельний алхімік' : '🧪 Mad Alchemist',
        action: isUa
          ? `Змішай 30 мл [${alcohols[1] || alcohols[0]}] з 50 мл [${softDrinks[1] || softDrinks[0]}], випий за здоровʼя сусіда праворуч!`
          : `Mix 30 ml of [${alcohols[1] || alcohols[0]}] with 50 ml of [${softDrinks[1] || softDrinks[0]}], drink to your right neighbor!`,
        intensity: 'high',
        icon: '🧪'
      },
      {
        id: 'c4',
        title: isUa ? '👑 Королівський указ' : '👑 Royal Decree',
        action: isUa
          ? `Признач будь-якого гравця, який мусить випити [${alcohols[0]}] та закусити [${snacks[1] || snacks[0]}].`
          : `Pick any guest to drink [${alcohols[0]}] paired with [${snacks[1] || snacks[0]}].`,
        intensity: 'medium',
        icon: '👑'
      },
      {
        id: 'c5',
        title: isUa ? '🍋 Лимонна дуель' : '🍋 Snack Challenge',
        action: isUa
          ? `Зʼїж шматочок [${snacks[0]}] із абсолютно камʼяним обличчям. Якщо посміхнешся — пʼєш штрафний шот!`
          : `Eat [${snacks[0]}] with a straight poker face. Smile = drink a penalty shot!`,
        intensity: 'medium',
        icon: '🍋'
      }
    ];

    setChallenges(fallbackList);
    setCurrentChallengeIndex(0);
    setCurrentPlayerIndex(0);
    setCompletedCount(0);
    setRoundNumber(1);
    setIsPlaying(true);
    setIsLoading(false);
    playWinSound();
  };

  // Spin roulette to pick next challenge
  const handleSpinRoulette = () => {
    if (isSpinning || challenges.length === 0) return;
    setIsSpinning(true);

    let ticks = 0;
    const maxTicks = 14;
    const interval = setInterval(() => {
      playTickSound(450 + ticks * 25);
      setCurrentChallengeIndex((prev) => (prev + 1) % challenges.length);
      ticks++;

      if (ticks >= maxTicks) {
        clearInterval(interval);
        // Random final index
        const finalIdx = Math.floor(Math.random() * challenges.length);
        setCurrentChallengeIndex(finalIdx);
        // Advance player turn
        setCurrentPlayerIndex((prev) => (prev + 1) % activeGuestNames.length);
        setIsSpinning(false);
        playWinSound();
      }
    }, 90);
  };

  const handleCompleteChallenge = () => {
    setCompletedCount((prev) => prev + 1);
    playClinkSound();
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 }
    });
    // Move to next
    handleSpinRoulette();
  };

  const handleSkipOrPenalty = () => {
    playTickSound(200);
    handleSpinRoulette();
  };

  const currentChallenge = challenges[currentChallengeIndex] || null;
  const currentGuest = activeGuestNames[currentPlayerIndex] || activeGuestNames[0];

  return (
    <section id="party-roulette-section" className="scroll-mt-24 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full max-w-full overflow-hidden">
      <div className="relative rounded-3xl bg-stone-900 border border-amber-500/30 p-4 sm:p-8 md:p-10 shadow-2xl shadow-black/80 overflow-hidden w-full">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Section Header */}
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 sm:mb-8">
          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-amber-500/15 border border-amber-500/40 flex items-center justify-center text-amber-400 text-xl sm:text-2xl shadow-inner shrink-0">
              🎉
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                <span className="text-[10px] sm:text-[11px] font-bold text-amber-400 uppercase tracking-wider font-['Unbounded']">
                  {isUa ? 'Фірмова застільна розвага' : 'Custom Party Game'}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[9px] font-bold uppercase font-['Unbounded']">
                  {isUa ? 'Хіт компаній' : 'Crowd Favorite'}
                </span>
              </div>
              <h2 className="text-xl sm:text-3xl font-black text-stone-100 font-['Unbounded'] mt-0.5 truncate">
                {isUa ? '«У мене паті» • Пʼяна Рулетка' : '«Party Mode» • Drunk Roulette'}
              </h2>
              <p className="text-xs sm:text-sm text-stone-400 mt-1 max-w-xl">
                {isUa
                  ? 'Введи свій алкоголь, закуски та безалкогольні напої — рулетка згенерує унікальні виклики!'
                  : 'Enter your bottles, snacks, mixers & headcount — mixology AI generates a customized game!'}
              </p>
            </div>
          </div>

          {isPlaying && (
            <button
              onClick={() => setIsPlaying(false)}
              className="px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-stone-950 hover:bg-stone-800 text-stone-300 border border-stone-800 font-bold font-['Unbounded'] text-xs flex items-center gap-2 transition-all cursor-pointer shrink-0"
            >
              <RotateCw className="w-4 h-4 text-amber-400" />
              <span>{isUa ? 'Налаштувати заново' : 'Edit Ingredients'}</span>
            </button>
          )}
        </div>

        {!isPlaying ? (
          /* =================== SETUP SCREEN =================== */
          <div className="relative z-10 space-y-4 sm:space-y-6 w-full min-w-0">
            {/* 1. Alcohol Bottles */}
            <div className="p-4 sm:p-5 rounded-2xl bg-stone-950/80 border border-stone-800 min-w-0">
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-bold text-stone-200 uppercase tracking-wider font-['Unbounded'] flex items-center gap-2">
                  <Wine className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{isUa ? '1. Який у вас є алкоголь?' : '1. Available Alcohol Bottles'}</span>
                </label>
                <span className="text-[11px] text-stone-500 font-mono">
                  {alcohols.length} {isUa ? 'вибрано' : 'selected'}
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3">
                {alcoholOptions.map((item) => {
                  const active = alcohols.includes(item);
                  const isCustom = !DEFAULT_ALCOHOLS.includes(item);
                  return (
                    <div
                      key={item}
                      onClick={() => toggleChip(item, alcohols, setAlcohols)}
                      className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer select-none flex items-center gap-1.5 ${
                        active
                          ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20'
                          : 'bg-stone-900 text-stone-400 hover:text-stone-200 border border-stone-800'
                      }`}
                    >
                      <span>{active ? '✓ ' : ''}{item}</span>
                      {isCustom && (
                        <button
                          type="button"
                          onClick={(e) => handleRemoveCustomAlcohol(item, e)}
                          className="w-4 h-4 rounded-full flex items-center justify-center hover:bg-black/20 text-current transition-colors ml-0.5"
                          title={isUa ? 'Видалити цей алкоголь' : 'Delete this item'}
                        >
                          <X className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Add custom alcohol */}
              <div className="flex gap-2 min-w-0 w-full">
                <input
                  type="text"
                  value={customAlc}
                  onChange={(e) => setCustomAlc(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddAlcohol();
                    }
                  }}
                  placeholder={isUa ? 'Додати алкоголь (напр. Коньяк, Самбука)...' : 'Add custom alcohol...'}
                  className="min-w-0 flex-1 px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-stone-200 text-xs focus:outline-none focus:border-amber-500 transition-colors"
                />
                <button
                  type="button"
                  onClick={handleAddAlcohol}
                  disabled={!customAlc.trim()}
                  className="px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 disabled:hover:bg-amber-500 text-stone-950 text-xs font-bold font-['Unbounded'] cursor-pointer flex items-center gap-1 sm:gap-1.5 transition-all shadow-md active:scale-95 shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>{isUa ? 'Додати' : 'Add'}</span>
                </button>
              </div>
            </div>

            {/* 2. Snacks */}
            <div className="p-4 sm:p-5 rounded-2xl bg-stone-950/80 border border-stone-800 min-w-0">
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-bold text-stone-200 uppercase tracking-wider font-['Unbounded'] flex items-center gap-2">
                  <Apple className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{isUa ? '2. Які є закуски на столі?' : '2. Available Snacks'}</span>
                </label>
                <span className="text-[11px] text-stone-500 font-mono">
                  {snacks.length} {isUa ? 'вибрано' : 'selected'}
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3">
                {snackOptions.map((item) => {
                  const active = snacks.includes(item);
                  const isCustom = !DEFAULT_SNACKS.includes(item);
                  return (
                    <div
                      key={item}
                      onClick={() => toggleChip(item, snacks, setSnacks)}
                      className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer select-none flex items-center gap-1.5 ${
                        active
                          ? 'bg-emerald-500 text-stone-950 shadow-md shadow-emerald-500/20'
                          : 'bg-stone-900 text-stone-400 hover:text-stone-200 border border-stone-800'
                      }`}
                    >
                      <span>{active ? '✓ ' : ''}{item}</span>
                      {isCustom && (
                        <button
                          type="button"
                          onClick={(e) => handleRemoveCustomSnack(item, e)}
                          className="w-4 h-4 rounded-full flex items-center justify-center hover:bg-black/20 text-current transition-colors ml-0.5"
                          title={isUa ? 'Видалити цю закуску' : 'Delete this snack'}
                        >
                          <X className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="flex gap-2 min-w-0 w-full">
                <input
                  type="text"
                  value={customSnack}
                  onChange={(e) => setCustomSnack(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddSnack();
                    }
                  }}
                  placeholder={isUa ? 'Додати закуску (напр. Сало, Піца)...' : 'Add custom snack...'}
                  className="min-w-0 flex-1 px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-stone-200 text-xs focus:outline-none focus:border-emerald-500 transition-colors"
                />
                <button
                  type="button"
                  onClick={handleAddSnack}
                  disabled={!customSnack.trim()}
                  className="px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 disabled:hover:bg-emerald-500 text-stone-950 text-xs font-bold font-['Unbounded'] cursor-pointer flex items-center gap-1 sm:gap-1.5 transition-all shadow-md active:scale-95 shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>{isUa ? 'Додати' : 'Add'}</span>
                </button>
              </div>
            </div>

            {/* 3. Non-Alcoholic / Soft Drinks */}
            <div className="p-4 sm:p-5 rounded-2xl bg-stone-950/80 border border-stone-800 min-w-0">
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-bold text-stone-200 uppercase tracking-wider font-['Unbounded'] flex items-center gap-2">
                  <GlassWater className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>{isUa ? '3. Які є безалкогольні напої?' : '3. Soft Drinks & Mixers'}</span>
                </label>
                <span className="text-[11px] text-stone-500 font-mono">
                  {softDrinks.length} {isUa ? 'вибрано' : 'selected'}
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3">
                {softOptions.map((item) => {
                  const active = softDrinks.includes(item);
                  const isCustom = !DEFAULT_SOFT_DRINKS.includes(item);
                  return (
                    <div
                      key={item}
                      onClick={() => toggleChip(item, softDrinks, setSoftDrinks)}
                      className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer select-none flex items-center gap-1.5 ${
                        active
                          ? 'bg-sky-500 text-stone-950 shadow-md shadow-sky-500/20'
                          : 'bg-stone-900 text-stone-400 hover:text-stone-200 border border-stone-800'
                      }`}
                    >
                      <span>{active ? '✓ ' : ''}{item}</span>
                      {isCustom && (
                        <button
                          type="button"
                          onClick={(e) => handleRemoveCustomSoftDrink(item, e)}
                          className="w-4 h-4 rounded-full flex items-center justify-center hover:bg-black/20 text-current transition-colors ml-0.5"
                          title={isUa ? 'Видалити цей напій' : 'Delete this mixer'}
                        >
                          <X className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="flex gap-2 min-w-0 w-full">
                <input
                  type="text"
                  value={customSoft}
                  onChange={(e) => setCustomSoft(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddSoftDrink();
                    }
                  }}
                  placeholder={isUa ? 'Додати напій (напр. Молоко, Енергетик)...' : 'Add mixer...'}
                  className="min-w-0 flex-1 px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-stone-200 text-xs focus:outline-none focus:border-sky-500 transition-colors"
                />
                <button
                  type="button"
                  onClick={handleAddSoftDrink}
                  disabled={!customSoft.trim()}
                  className="px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 disabled:opacity-50 disabled:hover:bg-sky-500 text-stone-950 text-xs font-bold font-['Unbounded'] cursor-pointer flex items-center gap-1 sm:gap-1.5 transition-all shadow-md active:scale-95 shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>{isUa ? 'Додати' : 'Add'}</span>
                </button>
              </div>
            </div>

            {/* 4. Company: People Count & Guest Names & Vibe */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 min-w-0">
              {/* People Counter */}
              <div className="p-4 sm:p-5 rounded-2xl bg-stone-950/80 border border-stone-800 min-w-0">
                <label className="block text-xs font-bold text-stone-200 uppercase tracking-wider font-['Unbounded'] mb-2">
                  <Users className="w-4 h-4 inline-block mr-1 text-amber-400 shrink-0" />
                  {isUa ? 'Кількість людей' : 'Number of Guests'}
                </label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setPeopleCount((p) => Math.max(2, p - 1))}
                    className="w-10 h-10 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-200 font-bold border border-stone-800 text-lg cursor-pointer"
                  >
                    -
                  </button>
                  <span className="flex-1 text-center font-mono font-black text-xl text-amber-400">
                    {peopleCount} {isUa ? 'чол.' : 'ppl'}
                  </span>
                  <button
                    onClick={() => setPeopleCount((p) => Math.min(20, p + 1))}
                    className="w-10 h-10 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-200 font-bold border border-stone-800 text-lg cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Guest Names Input */}
              <div className="p-4 sm:p-5 rounded-2xl bg-stone-950/80 border border-stone-800 md:col-span-2 min-w-0">
                <label className="block text-xs font-bold text-stone-200 uppercase tracking-wider font-['Unbounded'] mb-2">
                  {isUa ? 'Імена гостей (через кому)' : 'Guest Names (comma separated)'}
                </label>
                <input
                  type="text"
                  value={guestNamesInput}
                  onChange={(e) => setGuestNamesInput(e.target.value)}
                  placeholder="Саня, Юля, Макс, Аліна"
                  className="w-full min-w-0 px-3.5 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-stone-200 text-xs focus:outline-none focus:border-amber-500"
                />
                <p className="text-[11px] text-stone-500 mt-1">
                  {isUa
                    ? 'Рулетка звертатиметься до кожного персонально!'
                    : 'The roulette will call everyone by their real name!'}
                </p>
              </div>
            </div>

            {/* 5. Vibe Selector */}
            <div className="p-4 sm:p-5 rounded-2xl bg-stone-950/80 border border-stone-800 min-w-0">
              <label className="block text-xs font-bold text-stone-200 uppercase tracking-wider font-['Unbounded'] mb-3">
                <Flame className="w-4 h-4 inline-block mr-1 text-rose-400 shrink-0" />
                {isUa ? 'Градус вечірки' : 'Party Intensity'}
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
                <button
                  onClick={() => setPartyVibe('light')}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    partyVibe === 'light'
                      ? 'bg-emerald-500/15 border-emerald-500/60 text-emerald-300'
                      : 'bg-stone-900/50 border-stone-800 text-stone-400'
                  }`}
                >
                  <span className="font-bold text-xs font-['Unbounded'] block">🟢 {isUa ? 'Лайт (Чіл)' : 'Light Chill'}</span>
                  <span className="text-[11px] text-stone-400">{isUa ? 'Більше тостів та розмов' : 'Toasts & laughs'}</span>
                </button>

                <button
                  onClick={() => setPartyVibe('party')}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    partyVibe === 'party'
                      ? 'bg-amber-500/15 border-amber-500/60 text-amber-300'
                      : 'bg-stone-900/50 border-stone-800 text-stone-400'
                  }`}
                >
                  <span className="font-bold text-xs font-['Unbounded'] block">🟡 {isUa ? 'Двіж (Класика)' : 'Classic Party'}</span>
                  <span className="text-[11px] text-stone-400">{isUa ? 'Шоти, дуелі та виклики' : 'Shots & duels'}</span>
                </button>

                <button
                  onClick={() => setPartyVibe('hardcore')}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    partyVibe === 'hardcore'
                      ? 'bg-rose-500/15 border-rose-500/60 text-rose-300'
                      : 'bg-stone-900/50 border-stone-800 text-stone-400'
                  }`}
                >
                  <span className="font-bold text-xs font-['Unbounded'] block">🔴 {isUa ? 'Хардкор (Це пиздець)' : 'Hardcore Madness'}</span>
                  <span className="text-[11px] text-stone-400">{isUa ? 'Пекельні мікси та рознос' : 'Wild mixes & dares'}</span>
                </button>
              </div>
            </div>

            {/* Launch Button */}
            <button
              onClick={handleStartGame}
              disabled={isLoading}
              className="w-full py-3.5 sm:py-4 px-4 sm:px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 hover:from-amber-400 hover:to-orange-400 text-stone-950 font-black font-['Unbounded'] text-xs sm:text-base flex items-center justify-center gap-2 sm:gap-3 transition-all shadow-xl shadow-amber-500/25 cursor-pointer text-center"
            >
              <PartyPopper className="w-5 h-5 shrink-0" />
              <span>
                {isLoading
                  ? (isUa ? 'Генеруємо пʼяну рулетку...' : 'Crafting Drunk Roulette...')
                  : (isUa ? '🎉 Запустити пʼяну рулетку під наше паті!' : '🎉 Launch Drunk Roulette!')}
              </span>
            </button>
          </div>
        ) : (
          /* =================== PLAYING SCREEN =================== */
          <div className="relative z-10 space-y-4 sm:space-y-6 w-full min-w-0">
            {/* Active Turn Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3.5 sm:p-4 rounded-2xl bg-stone-950/90 border border-stone-800 min-w-0">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-amber-500/15 border border-amber-500/40 flex items-center justify-center text-amber-400 text-base sm:text-lg font-bold font-mono shrink-0">
                  #{currentPlayerIndex + 1}
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider font-['Unbounded']">
                    {isUa ? 'Зараз черга крутити' : 'Current Turn'}
                  </span>
                  <h3 className="text-base sm:text-xl font-black text-white font-['Unbounded'] truncate">
                    🎯 {currentGuest}
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-auto shrink-0">
                <div className="text-right">
                  <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider font-mono">
                    {isUa ? 'Виконано завдань' : 'Completed'}
                  </span>
                  <div className="text-sm font-black text-emerald-400 font-mono">
                    {completedCount} ✓
                  </div>
                </div>
                <div className="w-px h-8 bg-stone-800" />
                <div className="text-right">
                  <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider font-mono">
                    {isUa ? 'Раунд' : 'Round'}
                  </span>
                  <div className="text-sm font-black text-amber-400 font-mono">
                    {roundNumber}
                  </div>
                </div>
              </div>
            </div>

            {/* Giant Roulette Turn Card */}
            <div
              className={`relative rounded-3xl p-5 sm:p-10 border transition-all duration-300 overflow-hidden w-full ${
                isSpinning
                  ? 'bg-stone-950 border-amber-500/60 scale-[0.99] blur-[0.5px]'
                  : 'bg-gradient-to-br from-stone-900 via-stone-950 to-stone-900 border-amber-500/40 shadow-2xl shadow-amber-500/10'
              }`}
            >
              {currentChallenge && (
                <div className="text-center max-w-xl mx-auto min-w-0">
                  <div className="inline-block text-4xl sm:text-6xl mb-3 sm:mb-4 animate-bounce">
                    {currentChallenge.icon}
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 border border-white/10 text-xs font-bold font-['Unbounded'] text-amber-300 uppercase mb-3">
                    {currentChallenge.title}
                  </div>

                  <p className="text-base sm:text-2xl font-bold text-stone-100 leading-relaxed font-['Plus_Jakarta_Sans'] mb-6 sm:mb-8 break-words">
                    {currentChallenge.action}
                  </p>

                  {/* Actions during challenge */}
                  <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 justify-center w-full">
                    <button
                      onClick={handleCompleteChallenge}
                      disabled={isSpinning}
                      className="w-full sm:w-auto py-3 px-5 sm:py-3.5 sm:px-6 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-black font-['Unbounded'] text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/20 cursor-pointer"
                    >
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>{isUa ? 'Виконано! (+10 очок)' : 'Completed! (+10 pts)'}</span>
                    </button>

                    <button
                      onClick={handleSkipOrPenalty}
                      disabled={isSpinning}
                      className="w-full sm:w-auto py-3 px-4 sm:py-3.5 sm:px-5 rounded-2xl bg-stone-950 hover:bg-rose-950/40 text-rose-300 border border-stone-800 hover:border-rose-800 font-bold font-['Unbounded'] text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      <Flame className="w-4 h-4 shrink-0" />
                      <span>{isUa ? 'Пас / Штрафний шот' : 'Pass / Penalty Shot'}</span>
                    </button>

                    <button
                      onClick={handleSpinRoulette}
                      disabled={isSpinning}
                      className="w-full sm:w-auto py-3 px-5 sm:py-3.5 sm:px-6 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black font-['Unbounded'] text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-amber-500/20 cursor-pointer"
                    >
                      <RotateCw className={`w-4 h-4 shrink-0 ${isSpinning ? 'animate-spin' : ''}`} />
                      <span>{isUa ? 'Крутити далі 🎲' : 'Spin Again 🎲'}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Party Ingredients Bar */}
            <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center justify-between gap-2.5 sm:gap-3 p-3.5 sm:p-4 rounded-2xl bg-stone-950/60 border border-stone-800 text-xs text-stone-400 break-words w-full">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-amber-400 shrink-0">🍾 Алкоголь:</span>
                <span className="text-stone-300">{alcohols.slice(0, 4).join(', ')}</span>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-emerald-400 shrink-0">🥒 Закуски:</span>
                <span className="text-stone-300">{snacks.slice(0, 3).join(', ')}</span>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-sky-400 shrink-0">🍓 Безалкогольне:</span>
                <span className="text-stone-300">{softDrinks.slice(0, 3).join(', ')}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
