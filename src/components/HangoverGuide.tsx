import React, { useState } from 'react';
import { HANGOVER_PROTOCOLS, MEDICINES_GUIDE } from '../data/hangoverMedicine';
import { Language, MedicineInfo } from '../types';
import { ShieldCheck, AlertTriangle, Skull, Pill, Droplet, HeartPulse, CheckCircle2, Clock, Info } from 'lucide-react';
import { playClinkSound } from '../utils/audio';

interface Props {
  language: Language;
}

export const HangoverGuide: React.FC<Props> = ({ language }) => {
  const isUa = language === 'uk';
  const [activeStage, setActiveStage] = useState<'before' | 'during' | 'morning'>('morning');
  const [activeFilter, setActiveFilter] = useState<'all' | 'recommended' | 'dangerous'>('all');

  const currentProtocol = HANGOVER_PROTOCOLS.find((p) => p.stage === activeStage) || HANGOVER_PROTOCOLS[0];

  const filteredMedicines = MEDICINES_GUIDE.filter((med) => {
    if (activeFilter === 'recommended') return med.status === 'recommended';
    if (activeFilter === 'dangerous') return med.status === 'dangerous' || med.status === 'caution';
    return true;
  });

  return (
    <section id="hangover-section" className="py-12 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
          <HeartPulse className="w-3.5 h-3.5" />
          {isUa ? 'Медичний Захист та Детокс' : 'Detox & Hangover Medicine'}
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-['Unbounded'] tracking-tight">
          {isUa ? 'Профілактика, Ліки від Похмілля та Протинудотний Протокол' : 'Hangover Protocols & Safe Medication Guide'}
        </h2>
        <p className="mt-2 text-stone-400 text-sm sm:text-base">
          {isUa
            ? 'Науковий підхід до безпеки: що робити до і після вечірки, які ліки рятують, а які смертельно небезпечні з алкоголем.'
            : 'Evidence-based alcohol pharmacology: pre-party defense, nausea remedies, and lethal medication warnings.'}
        </p>
      </div>

      {/* 3 Stage Protocol Toggles */}
      <div className="flex flex-wrap gap-3 justify-center mb-8">
        {HANGOVER_PROTOCOLS.map((p) => {
          const isSelected = p.stage === activeStage;
          return (
            <button
              key={p.stage}
              onClick={() => {
                setActiveStage(p.stage as 'before' | 'during' | 'morning');
                playClinkSound();
              }}
              className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold font-['Unbounded'] transition-all duration-300 border flex items-center gap-2.5 ${
                isSelected
                  ? 'bg-emerald-500 text-stone-950 border-emerald-400 shadow-lg shadow-emerald-500/20 scale-105'
                  : 'bg-stone-900 text-stone-400 border-stone-800 hover:border-stone-700'
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>{isUa ? p.title.split('(')[0] : p.titleEn.split('(')[0]}</span>
            </button>
          );
        })}
      </div>

      {/* Active Stage Protocol Card */}
      <div className="rounded-3xl bg-stone-900 border border-stone-800 p-6 sm:p-8 shadow-2xl mb-12">
        <div className="border-b border-stone-800 pb-4 mb-6">
          <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">
            {isUa ? 'Покроковий алгоритм дій:' : 'Action Checklist:'}
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white font-['Unbounded']">
            {isUa ? currentProtocol.title : currentProtocol.titleEn}
          </h3>
          <p className="text-xs text-stone-400 mt-1">
            {isUa ? currentProtocol.tagline : currentProtocol.taglineEn}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentProtocol.actionChecklist.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-stone-950/80 border border-stone-800 hover:border-emerald-500/40 transition-colors"
            >
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white font-['Unbounded'] mb-1">
                    {isUa ? item.task : item.taskEn}
                  </h4>
                  <p className="text-xs text-stone-300 leading-relaxed">
                    {isUa ? item.details : item.detailsEn}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Safe vs Dangerous Medicines Guide */}
      <div className="rounded-3xl bg-stone-900 border border-stone-800 p-6 sm:p-8 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-stone-800 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
              <Pill className="w-4 h-4" />
              {isUa ? 'Фармакологічний довідник' : 'Pharmacology Guide'}
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white font-['Unbounded']">
              {isUa ? 'Які Ліки Пити, а Що Категорично Заборонено' : 'Hangover Medicines: Life Savers vs Deadly Traps'}
            </h3>
          </div>

          {/* Filter Pills */}
          <div className="flex gap-2">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold ${
                activeFilter === 'all'
                  ? 'bg-amber-500 text-stone-950 font-bold'
                  : 'bg-stone-950 text-stone-400 border border-stone-800'
              }`}
            >
              {isUa ? 'Всі препарати' : 'All'}
            </button>
            <button
              onClick={() => setActiveFilter('recommended')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold ${
                activeFilter === 'recommended'
                  ? 'bg-emerald-500 text-stone-950 font-bold'
                  : 'bg-stone-950 text-stone-400 border border-stone-800'
              }`}
            >
              {isUa ? 'Безпечні / Рекомендовані' : 'Safe & Recommended'}
            </button>
            <button
              onClick={() => setActiveFilter('dangerous')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold ${
                activeFilter === 'dangerous'
                  ? 'bg-rose-600 text-white font-bold'
                  : 'bg-stone-950 text-stone-400 border border-stone-800'
              }`}
            >
              {isUa ? 'Небезпечні / Заборонено' : 'Dangerous!'}
            </button>
          </div>
        </div>

        {/* Medicines List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMedicines.map((med, idx) => {
            const isDangerous = med.status === 'dangerous';
            const isCaution = med.status === 'caution';
            const isRecommended = med.status === 'recommended';

            return (
              <div
                key={idx}
                className={`p-5 rounded-2xl border flex flex-col justify-between ${
                  isDangerous
                    ? 'bg-rose-950/20 border-rose-600/70 shadow-lg shadow-rose-950/30'
                    : isCaution
                    ? 'bg-amber-950/20 border-amber-500/50'
                    : 'bg-stone-950 border-stone-800'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider ${
                        isDangerous
                          ? 'bg-rose-600 text-white animate-pulse'
                          : isCaution
                          ? 'bg-amber-500 text-stone-950 font-bold'
                          : 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30'
                      }`}
                    >
                      {isDangerous
                        ? isUa ? '⛔ НЕБЕЗПЕЧНО / УНИКАТИ' : '⛔ LETHAL WITH ALCOHOL'
                        : isCaution
                        ? isUa ? '⚠️ З ОБЕРЕЖНІСТЮ' : '⚠️ CAUTION'
                        : isUa ? '✔ РЕКОМЕНДОВАНО' : '✔ RECOMMENDED'}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-white font-['Unbounded'] mb-2">
                    {isUa ? med.name : med.nameEn}
                  </h4>

                  <div className="text-xs text-stone-300 space-y-2 mb-3">
                    <div>
                      <span className="text-stone-400 font-semibold">{isUa ? 'Призначення: ' : 'Purpose: '}</span>
                      <span>{isUa ? med.purpose : med.purposeEn}</span>
                    </div>
                    <div>
                      <span className="text-stone-400 font-semibold">{isUa ? 'Як діє: ' : 'Mechanism: '}</span>
                      <span>{isUa ? med.howItWorks : med.howItWorksEn}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-stone-800/80">
                  {med.warning && (
                    <div className="p-2 rounded-lg bg-rose-950/60 border border-rose-800 text-[11px] text-rose-200 font-medium mb-2">
                      ⚠️ {isUa ? med.warning : med.warningEn}
                    </div>
                  )}
                  <div className="text-[11px] text-stone-400">
                    <span className="font-semibold text-amber-300">{isUa ? 'Як вживати: ' : 'Dosage: '}</span>
                    <span>{isUa ? med.usageAdvice : med.usageAdviceEn}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
