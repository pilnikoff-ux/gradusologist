import React, { useState } from 'react';
import { DATING_PSYCHOLOGY_DATABASE } from '../data/datingPsychology';
import { DatingAdviceItem, Language } from '../types';
import { Heart, Sparkles, AlertOctagon, CheckCircle, Lightbulb, UserCheck, ShieldAlert, Users, User, ArrowRight } from 'lucide-react';
import { playClinkSound } from '../utils/audio';

interface Props {
  language: Language;
}

export const DatingPsychology: React.FC<Props> = ({ language }) => {
  const isUa = language === 'uk';
  const [selectedGender, setSelectedGender] = useState<'woman' | 'man'>('woman');

  const filteredItems = DATING_PSYCHOLOGY_DATABASE.filter(
    (item) => item.targetGender === selectedGender || (!item.targetGender && selectedGender === 'woman')
  );

  const [activeTabId, setActiveTabId] = useState<string>(filteredItems[0]?.id || 'woman_first_date');

  const currentItem =
    filteredItems.find((i) => i.id === activeTabId) ||
    filteredItems[0] ||
    DATING_PSYCHOLOGY_DATABASE[0];

  const handleGenderChange = (gender: 'woman' | 'man') => {
    setSelectedGender(gender);
    playClinkSound();
    const items = DATING_PSYCHOLOGY_DATABASE.filter((i) => i.targetGender === gender);
    if (items.length > 0) {
      setActiveTabId(items[0].id);
    }
  };

  return (
    <section id="dating-psychology-section" className="py-12 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold uppercase tracking-wider mb-2">
          <Heart className="w-3.5 h-3.5" />
          {isUa ? 'Етикет та Психологія Побачень' : 'Bar Dating Psychology'}
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-['Unbounded'] tracking-tight">
          {isUa ? 'Психологія: Як Обрати Напій на Побаченні' : 'Dating Psychology: Choosing Drinks on a Date'}
        </h2>
        <p className="mt-2 text-stone-400 text-sm sm:text-base">
          {isUa
            ? 'Як справити бездоганне враження, створити невимушену атмосферу і не припуститися фатальних барних помилок — як з жінкою, так і з чоловіком.'
            : 'How to make a refined impression, build effortless intimacy, and avoid rookie mistakes at the bar with both women and men.'}
        </p>
      </div>

      {/* Main Gender Switcher */}
      <div className="flex justify-center mb-6">
        <div className="inline-flex p-1.5 rounded-2xl bg-stone-900 border border-stone-800 shadow-xl">
          <button
            onClick={() => handleGenderChange('woman')}
            className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-bold font-['Unbounded'] flex items-center gap-2 transition-all duration-300 ${
              selectedGender === 'woman'
                ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg shadow-rose-500/30'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <span className="text-base">👩</span>
            <span>{isUa ? 'Якщо ти з жінкою' : 'If you are with a woman'}</span>
          </button>
          <button
            onClick={() => handleGenderChange('man')}
            className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-bold font-['Unbounded'] flex items-center gap-2 transition-all duration-300 ${
              selectedGender === 'man'
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 shadow-lg shadow-amber-500/30'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <span className="text-base">👨</span>
            <span>{isUa ? 'Якщо ти з чоловіком' : 'If you are with a man'}</span>
          </button>
        </div>
      </div>

      {/* Scenario Sub-Tabs */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {filteredItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setActiveTabId(item.id);
              playClinkSound();
            }}
            className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-300 border ${
              activeTabId === item.id
                ? selectedGender === 'woman'
                  ? 'bg-rose-500 text-white border-rose-400 font-bold shadow-lg shadow-rose-500/25'
                  : 'bg-amber-500 text-stone-950 border-amber-400 font-bold shadow-lg shadow-amber-500/25'
                : 'bg-stone-900 text-stone-400 border-stone-800 hover:border-stone-700'
            }`}
          >
            {isUa ? item.title.split(':')[0] : item.titleEn.split(':')[0]}
          </button>
        ))}
      </div>

      {/* Main Content Board */}
      <div className="rounded-3xl bg-stone-900 border border-stone-800 p-6 sm:p-8 shadow-2xl space-y-6">
        {/* Title & Tagline */}
        <div className="border-b border-stone-800 pb-4">
          <h3 className="text-xl sm:text-2xl font-black text-white font-['Unbounded'] mb-2">
            {isUa ? currentItem.title : currentItem.titleEn}
          </h3>
          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
            {isUa ? currentItem.description : currentItem.descriptionEn}
          </p>
        </div>

        {/* Recommended Drinks 2-col (For Her/Him vs For You) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Column 1 */}
          <div className="p-5 rounded-2xl bg-stone-950 border border-rose-900/40">
            <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Heart className="w-4 h-4" />
              {selectedGender === 'woman'
                ? (isUa ? 'Рекомендовано запропонувати їй:' : 'Top picks to recommend for her:')
                : (isUa ? 'Рекомендовані вишукані напої для неї/нього:' : 'Top refined picks for date:')}
            </h4>
            <div className="space-y-3">
              {currentItem.recommendedDrinksForHer.map((drink, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-stone-900/90 border border-stone-800">
                  <div className="font-bold text-white text-xs sm:text-sm font-['Unbounded'] text-rose-200">
                    {drink.name}
                  </div>
                  <p className="text-xs text-stone-300 mt-1 leading-relaxed">
                    {isUa ? drink.why : drink.whyEn}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2 */}
          {currentItem.recommendedDrinksForYou.length > 0 ? (
            <div className="p-5 rounded-2xl bg-stone-950 border border-amber-900/40">
              <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <UserCheck className="w-4 h-4" />
                {selectedGender === 'woman'
                  ? (isUa ? 'Ідеальний вибір для тебе (чоловіка):' : 'Best balanced choice for you:')
                  : (isUa ? 'Що обрати чоловікові (для себе):' : 'Best balanced choice for him:')}
              </h4>
              <div className="space-y-3">
                {currentItem.recommendedDrinksForYou.map((drink, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-stone-900/90 border border-stone-800">
                    <div className="font-bold text-white text-xs sm:text-sm font-['Unbounded'] text-amber-200">
                      {drink.name}
                    </div>
                    <p className="text-xs text-stone-300 mt-1 leading-relaxed">
                      {isUa ? drink.why : drink.whyEn}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-5 rounded-2xl bg-stone-950 border border-stone-800 flex flex-col justify-center">
              <div className="text-amber-400 font-bold text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                {isUa ? 'Головний психологічний інсайт' : 'Core Psychological Insight'}
              </div>
              <p className="text-xs text-stone-300 leading-relaxed">
                {isUa
                  ? (currentItem.psychologicalTip || 'Коктейль людини — це дзеркало її поточного внутрішнього ритму та відкритості. Звертай увагу на смаки, щоб природно налаштувати хвилю спілкування.')
                  : (currentItem.psychologicalTipEn || 'A person\'s cocktail choice mirrors their emotional tempo and openness. Observe flavor preferences to seamlessly tune into their wavelength.')}
              </p>
            </div>
          )}
        </div>

        {/* Rules & Fatal Mistakes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Rules */}
          <div className="p-4 rounded-2xl bg-stone-950/60 border border-stone-800">
            <h5 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5" />
              {isUa ? 'Золоті правила етикету:' : 'Golden Etiquette Rules:'}
            </h5>
            <ul className="space-y-2 text-xs text-stone-300">
              {(isUa ? currentItem.rules : currentItem.rulesEn).map((rule, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✔</span>
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* What to avoid */}
          <div className="p-4 rounded-2xl bg-stone-950/60 border border-stone-800">
            <h5 className="text-xs font-bold text-rose-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5" />
              {isUa ? 'Чого категорично уникати:' : 'Fatal Mistakes to Avoid:'}
            </h5>
            <ul className="space-y-2 text-xs text-stone-300">
              {(isUa ? currentItem.whatToAvoid : currentItem.whatToAvoidEn).map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">✖</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Psychological Secret Tip */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 to-rose-500/10 border border-amber-500/30 flex items-start gap-3">
          <Lightbulb className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <div className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-1">
              {isUa ? 'Психологічний секрет для успіху:' : 'Psychological Master Tip:'}
            </div>
            <p className="text-xs text-stone-200 leading-relaxed">
              {isUa ? currentItem.psychologicalTip : currentItem.psychologicalTipEn}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
