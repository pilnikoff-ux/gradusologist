import React, { useState, useEffect, useMemo } from 'react';
import { Language, CocktailItem, CrazyCocktail, UserProfile } from './types';
import { COCKTAILS_DATABASE } from './data/cocktails';
import { getSommelierProgress } from './utils/sommelierExperience';
import { getCurrentUser } from './utils/userAuth';
import { Navbar } from './components/Navbar';
import { BentoGridHub } from './components/BentoGridHub';
import { InteractiveRoulette } from './components/InteractiveRoulette';
import { PartyModeRoulette } from './components/PartyModeRoulette';
import { EmotionalBar } from './components/EmotionalBar';
import { SurpriseGenerators } from './components/SurpriseGenerators';
import { CocktailCatalog } from './components/CocktailCatalog';
import { Top10Cocktails } from './components/Top10Cocktails';
import { ToastGenerator } from './components/ToastGenerator';
import { DatingPsychology } from './components/DatingPsychology';
import { HangoverGuide } from './components/HangoverGuide';
import { GastronomyFoodPairings } from './components/GastronomyFoodPairings';
import { BACCalculator } from './components/BACCalculator';
import { AlcoholicTest } from './components/AlcoholicTest';
import { FiveFactorsStop } from './components/FiveFactorsStop';
import { AlcoholHistory } from './components/AlcoholHistory';
import { CocktailModal } from './components/CocktailModal';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { MyJournalModal } from './components/MyJournalModal';
import { SommelierCardModal } from './components/SommelierCardModal';
import { GoogleAuthModal } from './components/GoogleAuthModal';
import { PWAInstallPrompt } from './components/PWAInstallPrompt';
import { ChevronUp } from 'lucide-react';

export function App() {
  // Theme (dark / light)
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('gradusolog_theme');
    return saved === 'light' ? 'light' : 'dark';
  });

  // Global search modal state
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // My Journal Modal state
  const [isJournalOpen, setIsJournalOpen] = useState(false);

  // Language
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('gradusolog_lang');
    return saved === 'en' ? 'en' : 'uk';
  });

  const isUa = language === 'uk';

  // Apply theme to documentElement and document.body
  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
      document.body.classList.remove('dark');
      document.body.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
      document.body.classList.remove('light');
      document.body.classList.add('dark');
    }
    localStorage.setItem('gradusolog_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Keyboard shortcut Ctrl+K or Cmd+K for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Navigation tab
  const [activeTab, setActiveTab] = useState<string>('bento');

  // Modal Cocktail for direct viewing anywhere in the app
  const [modalCocktail, setModalCocktail] = useState<CocktailItem | null>(null);

  // Favorites
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('gradusolog_favs');
      return saved ? JSON.parse(saved) : ['negroni', 'old_fashioned'];
    } catch {
      return ['negroni'];
    }
  });

  // Crazy recipes Journal
  const [journal, setJournal] = useState<CrazyCocktail[]>(() => {
    try {
      const saved = localStorage.getItem('gradusolog_journal');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Scroll top state
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Modals for Sommelier Passport, Google Auth & PWA Install
  const [isSommelierPassOpen, setIsSommelierPassOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isPWAOpen, setIsPWAOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => getCurrentUser());

  // Favorite cocktail entities for sommelier ranking calculation
  const favoriteCocktails = useMemo(() => {
    return COCKTAILS_DATABASE.filter((c) => favorites.includes(c.id));
  }, [favorites]);

  const sommelierProgress = useMemo(() => {
    return getSommelierProgress(favorites.length, favoriteCocktails);
  }, [favorites.length, favoriteCocktails]);

  // Sync language to localStorage
  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('gradusolog_lang', lang);
  };

  // Toggle favorite
  const handleToggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const updated = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      localStorage.setItem('gradusolog_favs', JSON.stringify(updated));
      return updated;
    });
  };

  // Journal handlers
  const handleSaveToJournal = (item: CrazyCocktail) => {
    setJournal((prev) => {
      const updated = [item, ...prev.filter((j) => j.id !== item.id)];
      localStorage.setItem('gradusolog_journal', JSON.stringify(updated));
      return updated;
    });
  };

  const handleDeleteFromJournal = (id: string) => {
    setJournal((prev) => {
      const updated = prev.filter((j) => j.id !== id);
      localStorage.setItem('gradusolog_journal', JSON.stringify(updated));
      return updated;
    });
  };

  const handleClearJournal = () => {
    setJournal([]);
    localStorage.removeItem('gradusolog_journal');
  };

  // Smooth navigation handler with multi-id fallback
  const handleNavigate = (sectionId: string) => {
    setActiveTab(sectionId);
    if (sectionId === 'bento' || sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const targetIds = [
      `${sectionId}-section`,
      sectionId,
      sectionId === 'party-roulette' ? 'party-roulette-section' : '',
      sectionId === 'pairings' ? 'food-pairings-section' : '',
      sectionId === 'bac' ? 'bac-calculator-section' : '',
      sectionId === 'test' ? 'alcoholic-test-section' : '',
      sectionId === 'fiveFactors' ? 'five-factors-section' : '',
      sectionId === 'dating' ? 'dating-psychology-section' : '',
    ].filter(Boolean);

    for (const tid of targetIds) {
      const el = document.getElementById(tid);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        break;
      }
    }
  };

  // Browser back button handler to close modals instead of jumping to top
  useEffect(() => {
    const handlePopState = () => {
      if (modalCocktail) {
        setModalCocktail(null);
      } else if (isJournalOpen) {
        setIsJournalOpen(false);
      } else if (isSearchOpen) {
        setIsSearchOpen(false);
      } else if (isSommelierPassOpen) {
        setIsSommelierPassOpen(false);
      } else if (isAuthOpen) {
        setIsAuthOpen(false);
      } else if (isPWAOpen) {
        setIsPWAOpen(false);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [modalCocktail, isJournalOpen, isSearchOpen, isSommelierPassOpen, isAuthOpen, isPWAOpen]);

  const openCocktailModal = (cocktail: CocktailItem) => {
    window.history.pushState({ modal: 'cocktail', id: cocktail.id }, '');
    setModalCocktail(cocktail);
  };

  const openJournalModal = () => {
    window.history.pushState({ modal: 'journal' }, '');
    setIsJournalOpen(true);
  };

  const openSearchModal = () => {
    window.history.pushState({ modal: 'search' }, '');
    setIsSearchOpen(true);
  };

  // Scroll listener for back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0F0F12] text-zinc-100 font-['Plus_Jakarta_Sans'] selection:bg-amber-500 selection:text-black">
      {/* Top Sticky Header */}
      <Navbar
        language={language}
        onLanguageChange={handleLanguageChange}
        activeTab={activeTab}
        onSelectTab={handleNavigate}
        journalCount={journal.length + favorites.length}
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenSearch={openSearchModal}
        onOpenJournal={openJournalModal}
        sommelierRank={sommelierProgress.currentLevel}
        onOpenSommelierPass={() => setIsSommelierPassOpen(true)}
        onOpenPWA={() => setIsPWAOpen(true)}
        currentUser={currentUser}
        onOpenAuthModal={() => setIsAuthOpen(true)}
      />

      {/* Main Container */}
      <main className="space-y-12 pb-24">
        {/* Interactive Bento Grid Master Hub */}
        <BentoGridHub
          language={language}
          onLanguageChange={handleLanguageChange}
          onNavigate={handleNavigate}
          journalCount={journal.length + favorites.length}
          onQuickEmotionPick={(emotion) => {
            const btn = document.getElementById(`emotion-btn-${emotion}`);
            if (btn) btn.click();
          }}
          onQuickCrazyGenerate={() => {
            const btn = document.getElementById('crazy-generator-btn');
            if (btn) btn.click();
          }}
          onQuickSurprise={() => {
            const btn = document.getElementById('surprise-generator-btn');
            if (btn) btn.click();
          }}
          onOpenJournal={openJournalModal}
          onOpenPartyRoulette={() => handleNavigate('party-roulette')}
          onOpenSommelierPass={() => setIsSommelierPassOpen(true)}
          onOpenPWA={() => setIsPWAOpen(true)}
          sommelierRank={sommelierProgress.currentLevel}
        />

        {/* 1. Interactive Roulette with 17 options */}
        <InteractiveRoulette language={language} />

        {/* 1.5. "У МЕНЕ ПАТІ!" Interactive Party Roulette with Custom Booze & Snacks */}
        <div id="party-roulette-section">
          <PartyModeRoulette language={language} />
        </div>

        {/* 2. Neuro-Mixology Emotional Bar */}
        <EmotionalBar
          language={language}
          onOpenCocktailModal={openCocktailModal}
        />

        {/* 3. Surprise Generators ("Мене той во" & "Це пиздець" with journal) */}
        <SurpriseGenerators
          language={language}
          onOpenCocktailModal={openCocktailModal}
          journal={journal}
          onSaveToJournal={handleSaveToJournal}
          onDeleteFromJournal={handleDeleteFromJournal}
          onClearJournal={handleClearJournal}
          onOpenFullJournal={openJournalModal}
        />

        {/* 4. Full Cocktail Catalog & Recipes */}
        <CocktailCatalog
          language={language}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
          onOpenCocktailModal={openCocktailModal}
          onOpenSommelierPass={() => setIsSommelierPassOpen(true)}
          sommelierRank={sommelierProgress.currentLevel}
        />

        {/* 5. Top 10 World Cocktails */}
        <Top10Cocktails
          language={language}
          onOpenCocktailModal={openCocktailModal}
        />

        {/* 6. Toast Generator (By occasion & author) */}
        <ToastGenerator language={language} />

        {/* 7. Dating Psychology ("З Жінкою") */}
        <DatingPsychology language={language} />

        {/* 8. Hangover Protocols & Safe Medicines Guide */}
        <HangoverGuide language={language} />

        {/* 9. Gastronomy & Food Pairings */}
        <GastronomyFoodPairings language={language} />

        {/* 10. BAC Promille Calculator & Sober Countdown */}
        <BACCalculator language={language} />

        {/* 11. 10-Question Alcoholic Self-Test */}
        <AlcoholicTest language={language} />

        {/* 12. 5 Factors When to Stop ("5 факторів, що тобі вже не наливать") */}
        <FiveFactorsStop language={language} />

        {/* 13. Alcohol History Encyclopedia */}
        <AlcoholHistory language={language} />
      </main>

      {/* Global Cocktail Recipe & Food Pairing Modal */}
      {modalCocktail && (
        <CocktailModal
          cocktail={modalCocktail}
          language={language}
          onClose={() => setModalCocktail(null)}
          isFavorite={favorites.includes(modalCocktail.id)}
          onToggleFavorite={handleToggleFavorite}
        />
      )}

      {/* Omnisearch Global Modal */}
      <GlobalSearchModal
        language={language}
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectCocktail={(c) => {
          setModalCocktail(c);
        }}
        onNavigateSection={(secId) => {
          handleNavigate(secId);
        }}
      />

      {/* My Journal & Favorites Modal */}
      <MyJournalModal
        language={language}
        isOpen={isJournalOpen}
        onClose={() => setIsJournalOpen(false)}
        favorites={favorites}
        onToggleFavorite={handleToggleFavorite}
        onClearFavorites={() => {
          setFavorites([]);
          localStorage.removeItem('gradusolog_favs');
        }}
        journal={journal}
        onDeleteFromJournal={handleDeleteFromJournal}
        onClearJournal={handleClearJournal}
        onOpenCocktailModal={(c) => {
          setModalCocktail(c);
        }}
        onOpenGeneratorTab={() => {
          handleNavigate('generators');
        }}
        currentUser={currentUser}
        onOpenAuthModal={() => setIsAuthOpen(true)}
        onOpenSommelierPass={() => setIsSommelierPassOpen(true)}
      />

      {/* Sommelier Experience Card & Level Modal */}
      <SommelierCardModal
        language={language}
        isOpen={isSommelierPassOpen}
        onClose={() => setIsSommelierPassOpen(false)}
        favoritesCount={favorites.length}
        favoriteCocktails={favoriteCocktails}
        onOpenCatalog={() => {
          setIsSommelierPassOpen(false);
          handleNavigate('catalog');
        }}
      />

      {/* Google Authentication Modal */}
      <GoogleAuthModal
        language={language}
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        currentUser={currentUser}
        onUserChange={(user) => setCurrentUser(user)}
      />

      {/* PWA Mobile Installation Prompt Modal */}
      <PWAInstallPrompt
        language={language}
        isOpen={isPWAOpen}
        onClose={() => setIsPWAOpen(false)}
      />

      {/* Back to Top Floating Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3.5 rounded-2xl bg-amber-500 text-black font-black shadow-[0_0_20px_rgba(245,158,11,0.4)] hover:bg-amber-400 hover:scale-110 active:scale-95 transition-all z-40 cursor-pointer"
          title={isUa ? 'Вгору' : 'Scroll to top'}
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}

      {/* Bento Grid Footer */}
      <footer className="border-t border-zinc-800/90 bg-[#0F0F12] py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-zinc-400 font-bold uppercase tracking-widest">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500 flex items-center justify-center text-black font-black font-['Unbounded'] text-base shadow-[0_0_15px_rgba(245,158,11,0.3)]">
              G
            </div>
            <div>
              <div className="font-black text-white font-['Unbounded'] text-sm tracking-tight">GRADUSOLOGIST</div>
              <div className="text-[10px] text-zinc-400 lowercase font-medium">
                {isUa ? 'інтерактивний міксологічний гід' : 'interactive mixology hub'}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-[11px] text-zinc-400">
            <span onClick={() => handleNavigate('history')} className="hover:text-amber-400 cursor-pointer transition-colors">
              {isUa ? 'Історія Напоїв' : 'History of Spirits'}
            </span>
            <span onClick={() => handleNavigate('catalog')} className="hover:text-amber-400 cursor-pointer transition-colors">
              {isUa ? 'Рецепти Коктейлів' : 'Cocktail Recipes'}
            </span>
            <span onClick={() => handleNavigate('toasts')} className="hover:text-amber-400 cursor-pointer transition-colors">
              {isUa ? 'Генератор Тостів' : 'Toast Generator'}
            </span>
          </div>

          <div className="text-center md:text-right space-y-1">
            <div className="text-amber-400 text-[11px]">
              🔞 {isUa ? 'Пийте свідомо • 18+' : 'Drink Responsibly • 18+'}
            </div>
            <div className="text-zinc-500 text-[10px]">
              Gradusologist © 2026
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
export default App;

