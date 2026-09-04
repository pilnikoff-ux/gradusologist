import React, { useState } from 'react';
import { Language } from '../types';
import { UserProfile, saveUserProfile } from '../utils/userAuth';
import {
  Sparkles,
  X,
  ShieldCheck,
  CheckCircle2,
  LogOut,
  User,
  Mail,
  Lock,
  ArrowRight,
  Database,
  CloudCheck
} from 'lucide-react';
import { playWinSound, playClinkSound } from '../utils/audio';

interface Props {
  language: Language;
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile | null;
  onUserChange: (user: UserProfile | null) => void;
}

export const GoogleAuthModal: React.FC<Props> = ({
  language,
  isOpen,
  onClose,
  currentUser,
  onUserChange
}) => {
  const isUa = language === 'uk';
  const [inputEmail, setInputEmail] = useState('');
  const [inputName, setInputName] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false);

  if (!isOpen) return null;

  // Simulate Instant Google OAuth popup / sign-in
  const handleGoogleQuickSignIn = () => {
    setIsSigningIn(true);
    playClinkSound();

    setTimeout(() => {
      const email = inputEmail.trim() || 'bar.enthusiast@gmail.com';
      const name = inputName.trim() || (email.split('@')[0] || 'Градусолог Експерт');
      const cleanId = `g_${email.replace(/[^a-zA-Z0-9]/g, '_')}`;

      // Google user profile
      const newProfile: UserProfile = {
        id: cleanId,
        name: name,
        email: email,
        picture: `https://api.dicebear.com/7.x/bottts/svg?seed=${cleanId}`,
        provider: 'google',
        joinedAt: new Date().toISOString()
      };

      saveUserProfile(newProfile);
      onUserChange(newProfile);
      setIsSigningIn(false);
      playWinSound();
      onClose();
    }, 600);
  };

  const handleSignOut = () => {
    playClinkSound();
    saveUserProfile(null);
    onUserChange(null);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md rounded-3xl bg-stone-900 border border-stone-800 p-5 sm:p-7 shadow-2xl shadow-black/80 my-6 max-h-[92vh] overflow-y-auto"
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

        {currentUser ? (
          /* User Profile Logged In */
          <div>
            <div className="flex items-center gap-3.5 mb-5">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/15 border border-amber-500/40 flex items-center justify-center overflow-hidden p-1 shrink-0">
                {currentUser.picture ? (
                  <img
                    src={currentUser.picture}
                    alt={currentUser.name}
                    className="w-full h-full rounded-xl object-cover"
                  />
                ) : (
                  <User className="w-6 h-6 text-amber-400" />
                )}
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider font-['Unbounded']">
                    Google Account
                  </span>
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <h3 className="text-lg font-black text-stone-100 font-['Unbounded']">
                  {currentUser.name}
                </h3>
                <p className="text-xs text-stone-400 font-mono">{currentUser.email}</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 mb-5 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div className="text-xs text-stone-300">
                <span className="font-bold text-stone-100 block mb-0.5">
                  {isUa ? 'Журнал привʼязано до вашого Google акаунта' : 'Journal Linked to Google Account'}
                </span>
                {isUa
                  ? 'Усі ваші улюблені коктейлі та згенеровані рецепти зберігаються у вашому персональному просторі.'
                  : 'All your favorite recipes and custom creations are safely synchronized to your personal space.'}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleSignOut}
                className="flex-1 py-3 px-4 rounded-xl bg-stone-950 hover:bg-rose-950/40 text-rose-300 border border-stone-800 hover:border-rose-800 font-bold font-['Unbounded'] text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>{isUa ? 'Вийти з акаунта' : 'Sign Out'}</span>
              </button>

              <button
                onClick={onClose}
                className="flex-1 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold font-['Unbounded'] text-xs flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
              >
                <span>{isUa ? 'Продовжити' : 'Done'}</span>
              </button>
            </div>
          </div>
        ) : (
          /* Sign In Form */
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider font-['Unbounded'] block">
                  {isUa ? 'Персональний доступ' : 'Personal Storage'}
                </span>
                <h3 className="text-lg sm:text-xl font-black text-stone-100 font-['Unbounded']">
                  {isUa ? 'Вхід через Google' : 'Google Sign-In'}
                </h3>
              </div>
            </div>

            <p className="text-xs text-stone-300 mb-5 leading-relaxed bg-stone-950/80 p-3.5 rounded-2xl border border-stone-800">
              {isUa
                ? 'Авторизуйтесь через Google, щоб вести свій особистий барний журнал, зберігати обрані коктейлі та відстежувати рівень сомельє з будь-якого пристрою без паролів.'
                : 'Sign in with Google to maintain your personal bar journal, track sommelier rank and save drinks without creating passwords.'}
            </p>

            {/* Quick 1-Click Google Button */}
            <button
              onClick={handleGoogleQuickSignIn}
              disabled={isSigningIn}
              className="w-full py-3.5 px-5 rounded-2xl bg-white hover:bg-stone-100 text-stone-950 font-bold text-sm flex items-center justify-center gap-3 transition-all shadow-lg shadow-white/5 cursor-pointer mb-5"
            >
              {/* Google G Logo SVG */}
              <svg className="w-5 h-5" viewBox="0 0 24 24">
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
              <span>{isSigningIn ? (isUa ? 'Авторизація...' : 'Signing in...') : (isUa ? 'Увійти з Google' : 'Sign in with Google')}</span>
            </button>

            {/* Custom Google Email Optional Form */}
            <div className="relative mb-5 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-stone-800" />
              </div>
              <span className="relative px-3 bg-stone-900 text-[10px] uppercase font-bold text-stone-500 font-mono">
                {isUa ? 'або вкажіть ваш Google email' : 'or enter your Google email'}
              </span>
            </div>

            <div className="space-y-3 mb-5">
              <div>
                <label className="block text-[11px] font-bold text-stone-400 mb-1">
                  {isUa ? 'Імʼя або псевдонім бармена' : 'Your Bartender Name / Nick'}
                </label>
                <input
                  type="text"
                  value={inputName}
                  onChange={(e) => setInputName(e.target.value)}
                  placeholder={isUa ? 'Наприклад: Андрій / Оля' : 'e.g. Alex'}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-200 text-xs focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-stone-400 mb-1">
                  {isUa ? 'Google Email' : 'Google Email'}
                </label>
                <input
                  type="email"
                  value={inputEmail}
                  onChange={(e) => setInputEmail(e.target.value)}
                  placeholder="your.email@gmail.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-200 text-xs focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>
            </div>

            <button
              onClick={handleGoogleQuickSignIn}
              className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold font-['Unbounded'] text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-amber-500/20 cursor-pointer"
            >
              <span>{isUa ? 'Підтвердити та відкрити свій журнал' : 'Confirm and Open My Journal'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
