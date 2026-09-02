import React from 'react';
import { Language } from '../types';
import { Wine, Dices, Brain, Sparkles, MessageSquareQuote, Heart, Trophy, HeartPulse, Utensils, Gauge, ShieldAlert, BookOpen, Flame, Search, Sun, Moon } from 'lucide-react';
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
  onOpenJournal
}) => {
  const isUa = language === 'uk';

  const navItems = [
    { id: 'roulette', labelUa: 'Рулетка (17 дій)', labelEn: 'Roulette (17)', icon: Dices },
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
    <header className="sticky top-0 z-50 bg-[#0F0F12]/95 backdrop-blur-md border-b border-zinc-800 shadow-2xl">
      {/* Top Action Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16 border-b border-zinc-800/60">
          {/* Brand Logo */}
          <div
            onClick={() => handleNavClick('roulette')}
            className="flex items-center gap-2.5 cursor-pointer group select-none shrink-0"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 bg-amber-500 rounded-lg sm:rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.3)] group-hover:scale-105 transition-transform shrink-0">
              <span className="text-lg sm:text-xl font-black text-black font-['Unbounded']">G</span>
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-base sm:text-lg font-black font-['Unbounded'] tracking-tight text-white group-hover:text-amber-400 transition-colors">
                  GRADUSOLOGIST
                </span>
                <span className="text-[9px] px-1.5 py-0.2 rounded bg-zinc-800 text-amber-400 font-bold font-mono border border-zinc-700">
                  HUB
                </span>
              </div>
              <p className="text-[9px] text-zinc-400 font-bold uppercase tracking-widest hidden md:block">
                {isUa ? 'Інтерактивний Алкогольний Гід & Рулетка' : 'Interactive Mixology Hub'}
              </p>
            </div>
          </div>

          {/* Right Top Controls */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            {/* Global Search Button */}
            <button
              onClick={() => {
                playClinkSound();
                onOpenSearch();
              }}
              className="px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/80 text-zinc-200 hover:text-amber-400 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm group"
              title={isUa ? 'Загальний пошук (Ctrl+K)' : 'Global search'}
            >
              <Search className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline text-[11px] font-['Unbounded'] font-bold">
                {isUa ? 'Пошук' : 'Search'}
              </span>
            </button>

            {/* Light / Dark Theme Switcher */}
            <button
              onClick={() => {
                playClinkSound();
                onToggleTheme();
              }}
              className="p-2 sm:px-2.5 sm:py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/80 text-amber-400 hover:text-amber-300 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
              title={isUa ? (theme === 'dark' ? 'Увімкнути світлу тему' : 'Увімкнути темну тему') : (theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme')}
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-4 h-4 text-amber-400 animate-spin-slow" />
                  <span className="hidden lg:inline text-[11px] text-zinc-300 font-mono">{isUa ? 'Світла' : 'Light'}</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-amber-400" />
                  <span className="hidden lg:inline text-[11px] text-zinc-700 font-mono">{isUa ? 'Темна' : 'Dark'}</span>
                </>
              )}
            </button>

            {/* My Journal Button */}
            <button
              onClick={() => {
                playClinkSound();
                onOpenJournal();
              }}
              className="bg-amber-500 hover:bg-amber-400 text-black px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl font-black text-xs flex items-center gap-1.5 shadow-[0_0_15px_rgba(245,158,11,0.3)] transition-all cursor-pointer font-['Unbounded']"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden md:inline">{isUa ? 'МІЙ ЖУРНАЛ' : 'MY JOURNAL'}</span>
              {journalCount > 0 && (
                <span className="bg-black text-amber-400 px-1.5 py-0.2 rounded-full text-[10px] font-mono font-black">
                  {journalCount}
                </span>
              )}
            </button>

            {/* Quick SOS Hangover button */}
            <button
              onClick={() => handleNavClick('hangover')}
              className="px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500 text-rose-300 hover:text-white border border-rose-500/30 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <HeartPulse className="w-3.5 h-3.5 text-rose-400" />
              <span className="hidden xl:inline font-['Unbounded'] text-[11px]">
                {isUa ? 'SOS Похмілля' : 'SOS Hangover'}
              </span>
            </button>

            {/* Language Switcher */}
            <div className="flex rounded-xl bg-zinc-900 p-0.5 border border-zinc-800">
              <button
                onClick={() => onLanguageChange('uk')}
                className={`px-2 py-1 rounded-lg text-xs font-bold font-mono transition-colors cursor-pointer ${
                  language === 'uk'
                    ? 'bg-amber-500 text-black font-black'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                UA
              </button>
              <button
                onClick={() => onLanguageChange('en')}
                className={`px-2 py-1 rounded-lg text-xs font-bold font-mono transition-colors cursor-pointer ${
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

        {/* Static Navigation Bar with All 13 Sections Fully Displayed */}
        <nav className="flex flex-wrap items-center gap-1 sm:gap-1.5 py-2 overflow-x-auto scrollbar-none text-xs">
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

