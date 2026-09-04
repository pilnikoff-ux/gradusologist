import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import {
  Smartphone,
  Download,
  Share,
  PlusSquare,
  CheckCircle2,
  X,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  WifiOff
} from 'lucide-react';
import { playWinSound, playClinkSound } from '../utils/audio';

interface Props {
  language: Language;
  isOpen: boolean;
  onClose: () => void;
}

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export const PWAInstallPrompt: React.FC<Props> = ({ language, isOpen, onClose }) => {
  const isUa = language === 'uk';
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [installSuccess, setInstallSuccess] = useState(false);

  useEffect(() => {
    // Detect if already running in standalone mode (PWA installed)
    const isRunningStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true;
    setIsStandalone(isRunningStandalone);

    // Detect iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIos(isIosDevice);

    // Listen for beforeinstallprompt event (Android / Chrome)
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Listen for appinstalled
    const handleAppInstalled = () => {
      setInstallSuccess(true);
      setDeferredPrompt(null);
      setIsStandalone(true);
      playWinSound();
    };
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  if (!isOpen) return null;

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      playClinkSound();
      await deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === 'accepted') {
        setInstallSuccess(true);
        playWinSound();
      }
      setDeferredPrompt(null);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl rounded-3xl bg-stone-900 border border-stone-800 p-5 sm:p-7 shadow-2xl shadow-black/80 my-6 max-h-[92vh] overflow-y-auto"
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

        {/* Header with App Icon */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center overflow-hidden p-2 shrink-0">
            <img src="/icon.svg" alt="Градусолог" className="w-full h-full object-contain" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider font-['Unbounded'] block">
              PWA • Progressive Web App
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-stone-100 font-['Unbounded']">
              {isUa ? 'Встановити Градусолог' : 'Install Gradusologist'}
            </h2>
          </div>
        </div>

        {isStandalone || installSuccess ? (
          <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center mb-6">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
            <h3 className="text-lg font-black text-stone-100 font-['Unbounded'] mb-1">
              {isUa ? 'Додаток вже встановлено!' : 'App Already Installed!'}
            </h3>
            <p className="text-xs text-stone-300">
              {isUa
                ? 'Ви можете запускати Градусолог прямо з головного екрана телефона як автономний додаток без адресного рядка.'
                : 'Gradusologist is ready to launch directly from your home screen with zero clutter.'}
            </p>
          </div>
        ) : (
          <>
            {/* Why Install Banner */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-6">
              <div className="p-3 rounded-xl bg-stone-950/80 border border-stone-800">
                <Zap className="w-4 h-4 text-amber-400 mb-1.5" />
                <h4 className="text-[11px] font-bold text-stone-200 font-['Unbounded'] mb-0.5">
                  {isUa ? 'Миттєвий запуск' : 'Instant Launch'}
                </h4>
                <p className="text-[10px] text-stone-400">
                  {isUa ? 'В 1 дотик з екрана' : '1-tap from Home'}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-stone-950/80 border border-stone-800">
                <WifiOff className="w-4 h-4 text-sky-400 mb-1.5" />
                <h4 className="text-[11px] font-bold text-stone-200 font-['Unbounded'] mb-0.5">
                  {isUa ? 'Працює офлайн' : 'Offline Mode'}
                </h4>
                <p className="text-[10px] text-stone-400">
                  {isUa ? 'Каталог і журнал' : 'Saved recipes & BAC'}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-stone-950/80 border border-stone-800">
                <Smartphone className="w-4 h-4 text-emerald-400 mb-1.5" />
                <h4 className="text-[11px] font-bold text-stone-200 font-['Unbounded'] mb-0.5">
                  {isUa ? 'На весь екран' : 'Fullscreen'}
                </h4>
                <p className="text-[10px] text-stone-400">
                  {isUa ? 'Без рамок браузера' : 'Pure native feel'}
                </p>
              </div>
            </div>

            {/* Direct 1-Click Install for Android/Chrome if available */}
            {deferredPrompt && (
              <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-amber-500/20 to-orange-500/10 border border-amber-500/40">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h4 className="text-sm font-bold text-stone-100 font-['Unbounded']">
                      {isUa ? 'Швидке встановлення в 1 клік' : '1-Click Fast Install'}
                    </h4>
                    <p className="text-xs text-stone-300 mt-0.5">
                      {isUa
                        ? 'Ваш браузер готовий встановити додаток автоматично.'
                        : 'Your browser is ready to install Gradusologist.'}
                    </p>
                  </div>
                  <button
                    onClick={handleInstallClick}
                    className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black font-['Unbounded'] text-xs flex items-center gap-2 transition-all shadow-lg shadow-amber-500/20 shrink-0 cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>{isUa ? 'Встановити' : 'Install'}</span>
                  </button>
                </div>
              </div>
            )}

            {/* Step-by-Step Instructions */}
            <div className="space-y-4 mb-6">
              <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider font-['Unbounded'] flex items-center gap-2">
                <Smartphone className="w-3.5 h-3.5 text-amber-400" />
                {isIos
                  ? (isUa ? 'Інструкція для iPhone (Safari)' : 'iPhone (Safari) Instructions')
                  : (isUa ? 'Як встановити на будь-який телефон' : 'How to Install on Mobile')}
              </h3>

              {/* iOS Step 1 */}
              <div className="p-3.5 rounded-2xl bg-stone-950/80 border border-stone-800 flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center font-bold text-amber-400 font-mono text-sm shrink-0">
                  1
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 font-bold text-xs sm:text-sm text-stone-200">
                    <span>{isUa ? 'Відкрийте в Safari та натисніть' : 'In Safari, tap'}</span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-stone-800 text-stone-200 text-xs border border-stone-700">
                      <Share className="w-3.5 h-3.5 text-sky-400" />
                      {isUa ? '«Поділитися»' : '«Share»'}
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-400 mt-1">
                    {isUa
                      ? 'Кнопка з іконкою прямокутника зі стрілкою вгору в нижній або верхній панелі браузера Safari.'
                      : 'The share square button with an arrow pointing up at the bottom bar of Safari.'}
                  </p>
                </div>
              </div>

              {/* iOS Step 2 */}
              <div className="p-3.5 rounded-2xl bg-stone-950/80 border border-stone-800 flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center font-bold text-amber-400 font-mono text-sm shrink-0">
                  2
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 font-bold text-xs sm:text-sm text-stone-200">
                    <span>{isUa ? 'Прокрутіть меню та виберіть' : 'Scroll and select'}</span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-stone-800 text-stone-200 text-xs border border-stone-700">
                      <PlusSquare className="w-3.5 h-3.5 text-amber-400" />
                      {isUa ? '«На початковий екран»' : '«Add to Home Screen»'}
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-400 mt-1">
                    {isUa
                      ? 'Це створить повноцінну іконку додатку «Градусолог» поруч з вашими іншими додатками.'
                      : 'This saves Gradusologist as an independent app icon directly onto your iOS home screen.'}
                  </p>
                </div>
              </div>

              {/* iOS Step 3 */}
              <div className="p-3.5 rounded-2xl bg-stone-950/80 border border-stone-800 flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center font-bold text-amber-400 font-mono text-sm shrink-0">
                  3
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 font-bold text-xs sm:text-sm text-stone-200">
                    <span>{isUa ? 'Натисніть у правому кутку' : 'Tap in top right corner'}</span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-500 text-stone-950 text-xs font-bold font-['Unbounded']">
                      {isUa ? '«Додати»' : '«Add»'}
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-400 mt-1">
                    {isUa
                      ? 'Готово! Додаток відкриватиметься на повний екран без панелей пошуку, зберігаючи ваш журнал та обране.'
                      : 'All set! Launch it fullscreen with instant offline caching and persistent favorites.'}
                  </p>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Footer */}
        <div className="flex justify-end pt-3 border-t border-stone-800">
          <button
            onClick={onClose}
            className="py-2.5 px-5 rounded-xl bg-stone-950 hover:bg-stone-800 text-stone-300 font-bold font-['Unbounded'] text-xs border border-stone-800 transition-colors cursor-pointer"
          >
            {isUa ? 'Зрозуміло' : 'Got it'}
          </button>
        </div>
      </div>
    </div>
  );
};
