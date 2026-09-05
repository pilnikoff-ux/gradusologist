import React from 'react';
import { Language, UserProfile } from '../types';
import {
  Wine,
  Dices,
  Brain,
  Sparkles,
  MessageSquareQuote,
  Heart,
  Trophy,
  HeartPulse,
  Utensils,
  Gauge,
  ShieldAlert,
  BookOpen,
  Flame,
  Search,
  Sun,
  Moon,
  Smartphone,
  Award,
  PartyPopper,
  User,
  ShieldCheck
} from 'lucide-react';
import { playClinkSound } from '../utils/audio';

interface Props {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  activeTab: string;
  onSelectTab: (tab: string) => void;
  journalCount: number;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onOpenSearch: () => void;
  onOpenJournal: () => void;
  sommelierRank?: { badge: string; titleUa: string; titleEn: string; level: number };
  onOpenSommelierPass?: () => void;
  onOpenPWA?: () => void;
  currentUser?: UserProfile | null;
  onOpenAuthModal?: () => void;
}

export const Navbar: React.FC<Props> = ({
  language,
  onLanguageChange,
  activeTab,
  onSelectTab,
  journalCount,
  theme,
  onToggleTheme,
  onOpenSearch,
  onOpenJournal,
  sommelierRank,
  onOpenSommelierPass,
  onOpenPWA,
  currentUser,
  onOpenAuthModal
}) => {
  const isUa = language === 'uk';

  const navItems = [
    { id: 'roulette', labelUa: 'Рулетка (17 дій)', labelEn: 'Roulette (17)', icon: Dices },
    { id: 'party-roulette', labelUa: '🎉 У мене паті', labelEn: '🎉 Party Roulette', icon: PartyPopper },
    { id: 'catalog', labelUa: 'Рецепти коктейлів', labelEn: 'Cocktails', icon: Wine },
    { id: 'emotions', labelUa: 'За Емоціями', labelEn: 'Mood Bar', icon: Brain },
    { id: 'generators', labelUa: 'Генератори трешу', labelEn: 'Generators', icon: Sparkles, badge: journalCount > 0 ? journalCount : undefined },
    { id: 'toasts', labelUa: 'Тости', labelEn: 'Toasts', icon: MessageSquareQuote },
    { id: 'dating', labelUa: 'Побачення (Він/Вона)', labelEn: 'Dating', icon: Heart },
    { id: 'top10', labelUa: 'Топ-10 Світу', labelEn: 'Top 10', icon: Trophy },
    { id: 'hangover', labelUa: 'Похмілля & Ліки', labelEn: 'Hangover', icon: HeartPulse },
    { id: 'pairings', labelUa: 'Закуски & Їжа', labelEn: 'Food Pairings', icon: Utensils },
    { id: 'bac', labelUa: 'Проміле (BAC)', labelEn: 'BAC Calc', icon: Gauge },
    { id: 'test', labelUa: 'Тест', labelEn: 'Self-Test', icon: ShieldAlert },
    { id: 'fiveFactors', labelUa: '5 СТОП', labelEn: '5 Stop', icon: Flame },
    { id: 'history', labelUa: 'Історія', labelEn: 'History', icon: BookOpen }
  ];

  const handleNavClick = (id: string) => {
    onSelectTab(id);
    playClinkSound();

    const el = document.getElementById(`${id}-section`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0F0F12]/95 backdrop-blur-md border-b border-zinc-800 shadow-2xl w-full max-w-full overflow-hidden">
      {/* Top Action Bar */}
      <div className="max-w-7xl mx-auto px-2 sm:px-6 w-full">
        <div className="flex items-center justify-between h-14 sm:h-16 border-b border-zinc-800/60 gap-1.5">
          {/* Brand Logo */}
          <div
            onClick={() => handleNavClick('roulette')}
            className="flex items-center gap-1.5 sm:gap-2.5 cursor-pointer group select-none shrink-0 min-w-0"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 bg-amber-500 rounded-lg sm:rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.3)] group-hover:scale-105 transition-transform shrink-0">
              <span className="text-base sm:text-xl font-black text-black font-['Unbounded']">G</span>
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-1 sm:gap-1.5">
                <span className="text-xs xs:text-sm sm:text-base md:text-lg font-black font-['Unbounded'] tracking-tight text-white group-hover:text-amber-400 transition-colors truncate">
                  GRADUSOLOGIST
                </span>
                <span className="text-[8px] sm:text-[9px] px-1 sm:px-1.5 py-0.2 rounded bg-zinc-800 text-amber-400 font-bold font-mono border border-zinc-700 shrink-0">
                  HUB
                </span>
              </div>
              <p className="text-[9px] text-zinc-400 font-bold uppercase tracking-widest hidden md:block">
                {isUa ? 'Інтерактивний Алкогольний Гід & Рулетка' : 'Interactive Mixology Hub'}
              </p>
            </div>
          </div>

          {/* Right Top Controls */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            {/* Sommelier Rank Badge */}
            {sommelierRank && (
              <button
                onClick={() => {
                  playClinkSound();
                  onOpenSommelierPass?.();
                }}
                className="px-1.5 sm:px-2.5 py-1 sm:py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-300 text-xs font-bold transition-all flex items-center gap-1 cursor-pointer shadow-sm group shrink-0"
                title={isUa ? `Ранг сомельє: ${sommelierRank.titleUa} (Клікніть для паспорта)` : `Sommelier Rank: ${sommelierRank.titleEn}`}
              >
                <span className="text-sm group-hover:scale-110 transition-transform">{sommelierRank.badge}</span>
                <span className="hidden md:inline font-['Unbounded'] text-[11px] font-bold text-amber-200">
                  {isUa ? sommelierRank.titleUa : sommelierRank.titleEn}
                </span>
                <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-black/40 text-amber-400 border border-amber-500/30">
                  L{sommelierRank.level}
                </span>
              </button>
            )}

            {/* PWA Install Button */}
            {onOpenPWA && (
              <button
                onClick={() => {
                  playClinkSound();
                  onOpenPWA();
                }}
                className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-300 text-xs font-bold transition-all flex items-center gap-1 cursor-pointer shadow-sm group shrink-0"
                title={isUa ? 'Встановити додаток на телефон (PWA)' : 'Install as app on phone (PWA)'}
              >
                <Smartphone className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform" />
                <span className="hidden lg:inline text-[11px] font-['Unbounded'] font-bold">
                  {isUa ? 'Додаток' : 'App'}
                </span>
              </button>
            )}

            {/* Global Search Button */}
            <button
              onClick={() => {
                playClinkSound();
                onOpenSearch();
              }}
              className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/80 text-zinc-200 hover:text-amber-400 text-xs font-bold transition-all flex items-center gap-1 cursor-pointer shadow-sm group shrink-0"
              title={isUa ? 'Загальний пошук (Ctrl+K)' : 'Global search'}
            >
              <Search className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
              <span className="hidden md:inline text-[11px] font-['Unbounded'] font-bold">
                {isUa ? 'Пошук' : 'Search'}
              </span>
            </button>

            {/* Google User or Sign In */}
            {onOpenAuthModal && (
              <button
                onClick={() => {
                  playClinkSound();
                  onOpenAuthModal();
                }}
                className="p-1 sm:px-2 sm:py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 hover:border-amber-500/50 text-zinc-200 hover:text-amber-300 text-xs font-bold transition-all flex items-center gap-1 cursor-pointer shadow-sm shrink-0"
                title={currentUser ? (isUa ? `Профіль: ${currentUser.name}` : `Profile: ${currentUser.name}`) : (isUa ? 'Увійти через Google' : 'Sign in with Google')}
              >
                {currentUser?.picture ? (
                  <img
                    src={currentUser.picture}
                    alt={currentUser.name}
                    className="w-5 h-5 rounded-full object-cover border border-emerald-400"
                  />
                ) : (
                  <User className="w-3.5 h-3.5 text-amber-400" />
                )}
                <span className="hidden xl:inline text-[11px] font-['Unbounded'] font-bold max-w-[100px] truncate">
                  {currentUser ? currentUser.name.split(' ')[0] : (isUa ? 'Вхід' : 'Login')}
                </span>
              </button>
            )}

            {/* Light / Dark Theme Switcher */}
            <button
              onClick={() => {
                playClinkSound();
                onToggleTheme();
              }}
              className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/80 text-amber-400 hover:text-amber-300 text-xs font-bold transition-all flex items-center gap-1 cursor-pointer shadow-sm shrink-0"
              title={isUa ? (theme === 'dark' ? 'Увімкнути світлу тему' : 'Увімкнути темну тему') : (theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme')}
            >
              {theme === 'dark' ? (
                <Sun className="w-3.5 h-3.5 text-amber-400 animate-spin-slow" />
              ) : (
                <Moon className="w-3.5 h-3.5 text-amber-400" />
              )}
            </button>

            {/* My Journal Button */}
            <button
              onClick={() => {
                playClinkSound();
                onOpenJournal();
              }}
              className="bg-amber-500 hover:bg-amber-400 text-black px-2 sm:px-3 py-1 sm:py-1.5 rounded-xl font-black text-xs flex items-center gap-1 shadow-[0_0_15px_rgba(245,158,11,0.3)] transition-all cursor-pointer font-['Unbounded'] shrink-0"
              title={isUa ? 'Мій журнал та улюблені' : 'My Journal & Favorites'}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{isUa ? 'ЖУРНАЛ' : 'JOURNAL'}</span>
              {journalCount > 0 && (
                <span className="bg-black text-amber-400 px-1.5 py-0.2 rounded-full text-[10px] font-mono font-black">
                  {journalCount}
                </span>
              )}
            </button>

            {/* Quick SOS Hangover button (hidden on mobile, visible on lg) */}
            <button
              onClick={() => handleNavClick('hangover')}
              className="hidden lg:flex px-2.5 sm:px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500 text-rose-300 hover:text-white border border-rose-500/30 text-xs font-bold transition-all items-center gap-1.5 cursor-pointer shrink-0"
            >
              <HeartPulse className="w-3.5 h-3.5 text-rose-400" />
              <span className="font-['Unbounded'] text-[11px]">
                {isUa ? 'SOS Похмілля' : 'SOS Hangover'}
              </span>
            </button>

            {/* Language Switcher */}
            <div className="flex rounded-xl bg-zinc-900 p-0.5 border border-zinc-800 shrink-0">
              <button
                onClick={() => onLanguageChange('uk')}
                className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-lg text-[10px] sm:text-xs font-bold font-mono transition-colors cursor-pointer ${
                  language === 'uk'
                    ? 'bg-amber-500 text-black font-black'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                UA
              </button>
              <button
                onClick={() => onLanguageChange('en')}
                className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-lg text-[10px] sm:text-xs font-bold font-mono transition-colors cursor-pointer ${
                  language === 'en'
                    ? 'bg-amber-500 text-black font-black'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                EN
              </button>
            </div>
          </div>
        </div>

        {/* Swipeable Single-Row Navigation Strip with All 13 Sections */}
        <nav className="flex flex-nowrap items-center gap-1.5 py-2 overflow-x-auto scrollbar-none w-full max-w-full touch-pan-x select-none px-0.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isSelected = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer border ${
                  isSelected
                    ? 'bg-amber-500 text-black font-black border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.3)]'
                    : 'bg-zinc-900/90 text-zinc-300 border-zinc-800/90 hover:border-zinc-700 hover:text-white hover:bg-zinc-800'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-black' : 'text-amber-400'}`} />
                <span>{isUa ? item.labelUa : item.labelEn}</span>
                {item.badge && (
                  <span className="w-4 h-4 rounded-full bg-amber-500 text-black text-[9px] font-black flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

