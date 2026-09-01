import React, { useState } from 'react';
import { FIVE_FACTORS_STOP_DATABASE } from '../data/fiveFactorsStop';
import { Language, FiveFactorsStopItem } from '../types';
import { ShieldAlert, AlertTriangle, Sparkles, Volume2, UserX, Lightbulb } from 'lucide-react';
import { playClinkSound } from '../utils/audio';

interface Props {
  language: Language;
}

export const FiveFactorsStop: React.FC<Props> = ({ language }) => {
  const isUa = language === 'uk';
  const [activeFactorId, setActiveFactorId] = useState<string>(FIVE_FACTORS_STOP_DATABASE[0].id);

  const activeFactor = FIVE_FACTORS_STOP_DATABASE.find((f) => f.id === activeFactorId) || FIVE_FACTORS_STOP_DATABASE[0];

  return (
    <section id="five-factors-section" className="py-12 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold uppercase tracking-wider mb-2">
          <ShieldAlert className="w-3.5 h-3.5" />
          {isUa ? 'Кодекс Безпеки Бару' : 'Bar Safety Protocol'}
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-['Unbounded'] tracking-tight">
          {isUa ? '5 Факторів, Що Тобі Вже Не Наливать' : '5 Signs You Have Had Enough (Mandatory Cut-Off)'}
        </h2>
        <p className="mt-2 text-stone-400 text-sm sm:text-base">
          {isUa
            ? 'Як вчасно помітити, що межа пройдена, врятувати друга від сорому та вчасно викликати таксі.'
            : 'How to recognize the critical intoxication thresholds, protect friends from embarrassment, and call an Uber in time.'}
        </p>
      </div>

      {/* 5 Factors Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-8">
        {FIVE_FACTORS_STOP_DATABASE.map((item) => {
          const isSelected = item.id === activeFactorId;
          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveFactorId(item.id);
                playClinkSound();
              }}
              className={`p-4 rounded-2xl border transition-all text-left flex flex-col justify-between ${
                isSelected
                  ? 'bg-rose-500/15 border-rose-500 text-white shadow-lg shadow-rose-950/40 scale-[1.02]'
                  : 'bg-stone-900/80 border-stone-800 hover:border-stone-700 text-stone-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="w-7 h-7 rounded-xl bg-stone-950 border border-stone-800 flex items-center justify-center font-bold text-xs text-rose-400 font-mono">
                    #{item.factorNumber}
                  </span>
                  <span className="text-[10px] font-bold uppercase text-rose-400">
                    {isUa ? item.dangerBadge.split(':')[0] : item.dangerBadgeEn.split(':')[0]}
                  </span>
                </div>
                <div className="text-xs font-bold font-['Unbounded'] leading-snug">
                  {isUa ? item.title.split(':')[1] || item.title : item.titleEn.split(':')[1] || item.titleEn}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Factor Detail Board */}
      <div className="rounded-3xl bg-stone-900 border-2 border-rose-500/40 p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-800 pb-4">
          <div>
            <span className="text-xs font-bold text-rose-400 uppercase tracking-wider font-mono">
              {isUa ? activeFactor.dangerBadge : activeFactor.dangerBadgeEn}
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white font-['Unbounded'] mt-1">
              {isUa ? activeFactor.title : activeFactor.titleEn}
            </h3>
          </div>
        </div>

        {/* Behavior & Science */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 rounded-2xl bg-stone-950 border border-stone-800 space-y-2">
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              {isUa ? 'Поведінковий тригер (Що відбувається):' : 'Behavioral Trigger:'}
            </h4>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              {isUa ? activeFactor.behaviorTrigger : activeFactor.behaviorTriggerEn}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-stone-950 border border-stone-800 space-y-2">
            <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4 text-cyan-400" />
              {isUa ? 'Нейрофізіологія (Чому це відбувається):' : 'Neurobiology (Root Cause):'}
            </h4>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              {isUa ? activeFactor.scientificExplanation : activeFactor.scientificExplanationEn}
            </p>
          </div>
        </div>

        {/* Bartender / Friend Action & Quote */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-800/40">
            <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">
              {isUa ? 'Дія для бармена чи друга:' : 'Action for Bartender or Friend:'}
            </div>
            <p className="text-xs sm:text-sm text-stone-200">
              {isUa ? activeFactor.bartenderAction : activeFactor.bartenderActionEn}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-stone-950/80 border border-stone-800 flex items-center">
            <p className="text-xs sm:text-sm text-amber-300 italic">
              📢 {isUa ? activeFactor.humorousQuote : activeFactor.humorousQuoteEn}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
