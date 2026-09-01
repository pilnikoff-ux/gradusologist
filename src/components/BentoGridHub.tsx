import React from 'react';
import { Language } from '../types';
import { EMOTIONS_LIST } from '../data/emotions';
import { playClinkSound } from '../utils/audio';
import {
  Sparkles,
  Dices,
  Flame,
  Wine,
  HeartPulse,
  Heart,
  ShieldAlert,
  Gauge,
  Trophy,
  ArrowRight,
  Zap,
  Activity,
  BookOpen
} from 'lucide-react';

interface Props {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onNavigate: (sectionId: string) => void;
  journalCount: number;
  onQuickEmotionPick: (emotionId: string) => void;
  onQuickCrazyGenerate: () => void;
  onQuickSurprise: () => void;
}

export const BentoGridHub: React.FC<Props> = ({
  language,
  onNavigate,
  onQuickEmotionPick,
  onQuickCrazyGenerate,
  onQuickSurprise,
}) => {
  const isUa = language === 'uk';

  return (
    <section className="px-4 sm:px-6 max-w-7xl mx-auto pt-4 pb-2">
      {/* Main Bento Grid Structure (Desktop 12 cols, Tablet/Mobile responsive) */}
      <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-4 auto-rows-min">
        {/* Box 1: Emotional Mood Match (AI Pick) - All Emojis & Emotions */}
        <div className="col-span-1 md:col-span-6 lg:col-span-5 bg-zinc-900 border border-zinc-800 rounded-2xl p-5 flex flex-col justify-between hover:border-zinc-700 transition-all group shadow-sm">
          <div>
            <div className="flex justify-between items-start mb-1">
              <h2 className="text-lg font-bold text-white flex items-center gap-2 font-['Unbounded']">
                <span>{isUa ? 'Емоційний Бар' : 'Mood Match'}</span>
              </h2>
              <span className="text-[10px] bg-zinc-800 text-amber-400 border border-zinc-700 px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                {isUa ? 'ВСІ ЕМОЦІЇ' : 'ALL MOODS'}
              </span>
            </div>
            <p className="text-xs text-zinc-400">
              {isUa ? 'Обери, що ти відчуваєш прямо зараз:' : 'Select how you feel right now:'}
            </p>
          </div>

          {/* Complete Grid of All Emotions & Emojis */}
          <div className="grid grid-cols-4 sm:grid-cols-7 gap-1.5 mt-3.5">
            {EMOTIONS_LIST.map((emo) => (
              <button
                key={emo.id}
                onClick={() => {
                  playClinkSound();
                  onQuickEmotionPick(emo.id);
                  onNavigate('emotions');
                }}
                title={isUa ? `${emo.labelUa} — ${emo.taglineUa}` : `${emo.labelEn} — ${emo.taglineEn}`}
                className="bg-zinc-800/90 hover:bg-amber-500 hover:text-black p-2 rounded-xl transition-all duration-200 flex flex-col items-center justify-center gap-1 cursor-pointer active:scale-95 group/btn border border-zinc-700/60 hover:border-amber-400 hover:shadow-lg hover:shadow-amber-500/20"
              >
                <span className="text-xl group-hover/btn:scale-115 transition-transform">
                  {emo.emoji}
                </span>
                <span className="text-[9px] font-bold text-zinc-300 group-hover/btn:text-black truncate w-full text-center leading-tight">
                  {isUa ? emo.labelUa.split(' ')[0] : emo.labelEn.split(' ')[0]}
                </span>
              </button>
            ))}
          </div>

          <div className="mt-3 pt-2.5 border-t border-zinc-800/80 flex items-center justify-between text-xs">
            <span className="text-[11px] text-zinc-400">
              {isUa ? '14 психо-емоційних станів' : '14 psychological moods'}
            </span>
            <button
              onClick={() => {
                playClinkSound();
                onNavigate('emotions');
              }}
              className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 cursor-pointer text-[11px]"
            >
              <span>{isUa ? 'Нейро-Аналіз' : 'Deep Analysis'}</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Box 2: "CE PIZDEC" (Chaos Generator) */}
        <div className="col-span-1 md:col-span-3 lg:col-span-3 bg-gradient-to-br from-amber-600 via-orange-700 to-red-800 rounded-2xl p-5 flex flex-col justify-between items-center text-center shadow-lg relative overflow-hidden group border border-orange-500/30 hover:border-orange-400 transition-all">
          <div className="absolute top-2 right-2 opacity-15 group-hover:opacity-25 transition-opacity">
            <Flame className="w-20 h-20 text-black" />
          </div>
          <div>
            <span className="text-[9px] bg-black/40 text-amber-200 border border-amber-400/30 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider inline-block mb-1.5">
              🔥 100% UNHINGED
            </span>
            <h3 className="text-xl sm:text-2xl font-black mb-1 italic text-white font-['Unbounded'] tracking-tight">
              "ЦЕ ПИЗДЕЦЬ"
            </h3>
            <p className="text-[11px] text-amber-100 uppercase font-bold tracking-tight opacity-90">
              {isUa ? 'Генератор треш-рецептів' : 'Chaos Cocktail Generator'}
            </p>
          </div>

          <button
            onClick={() => {
              playClinkSound();
              onQuickCrazyGenerate();
              onNavigate('generators');
            }}
            className="bg-black hover:bg-zinc-950 text-amber-400 border border-amber-500/30 hover:border-amber-400 hover:text-white w-full py-2.5 rounded-xl font-bold shadow-xl uppercase text-xs tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 mt-4 font-['Unbounded']"
          >
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>{isUa ? 'Згенерувати Треш' : 'Create Chaos'}</span>
          </button>
        </div>

        {/* Box 3: "МЕНІ ТОЙ ВО, ЦЕЙ ВО..." (Creative Randomizer Card) */}
        <div
          onClick={() => {
            playClinkSound();
            onQuickSurprise();
            onNavigate('generators');
          }}
          className="col-span-1 md:col-span-3 lg:col-span-4 bg-gradient-to-br from-zinc-900 via-zinc-900 to-amber-950/40 hover:to-amber-900/50 rounded-2xl p-5 border border-amber-500/40 hover:border-amber-400 cursor-pointer transition-all duration-300 hover:scale-[1.02] shadow-lg group relative overflow-hidden flex flex-col justify-between"
        >
          <div className="absolute -right-6 -bottom-6 w-28 h-28 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-all pointer-events-none" />
          
          <div>
            <div className="flex items-center justify-between mb-2">
              {/* Custom Icon / Logo Badge */}
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-300 text-black flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.4)] group-hover:rotate-6 transition-transform">
                  <span className="text-xl">🍸</span>
                </div>
                <div className="w-7 h-7 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xs">
                  <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
                </div>
              </div>
              <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider font-mono">
                🎲 SURPRISE ME
              </span>
            </div>

            <h3 className="font-black text-base sm:text-lg tracking-tight text-white group-hover:text-amber-400 font-['Unbounded'] uppercase leading-snug">
              "МЕНІ ТОЙ ВО, ЦЕЙ ВО..."
            </h3>
            <p className="text-[11px] text-zinc-300 mt-1 font-medium leading-relaxed">
              {isUa
                ? '«Не знаю шо хочу, зроби щось смачненьке на свій розсуд!»'
                : '«I don’t know what I want, just make something amazing!»'}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between">
            <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">
              {isUa ? '✨ Розумний Рандомайзер' : '✨ Smart Randomizer'}
            </span>
            <span className="bg-amber-500 group-hover:bg-amber-400 text-black px-3 py-1 rounded-lg text-xs font-black font-['Unbounded'] uppercase tracking-wider transition-colors shadow">
              {isUa ? 'ЗДИВУВАТИ' : 'SPIN'}
            </span>
          </div>
        </div>

        {/* Box 4: The Drunk Roulette Teaser */}
        <div className="col-span-1 md:col-span-6 lg:col-span-4 bg-zinc-900 border border-zinc-800 rounded-2xl p-5 relative overflow-hidden flex flex-col justify-between hover:border-zinc-700 transition-all shadow-sm">
          <div>
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-base font-bold text-white font-['Unbounded'] flex items-center gap-2">
                  <Dices className="w-4 h-4 text-amber-400" />
                  <span>{isUa ? 'Пʼяна Рулетка Долі' : 'The Drunk Roulette'}</span>
                </h2>
                <p className="text-[10px] text-zinc-400 uppercase font-bold tracking-wider mt-0.5">
                  {isUa ? 'Що робити? (17 секторів)' : 'What to do? (17 actions)'}
                </p>
              </div>
              <span className="text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded font-bold">
                17 SECTORS
              </span>
            </div>

            {/* Visual wheel mini simulation */}
            <div className="relative w-24 h-24 mx-auto my-2.5">
              <div className="w-full h-full rounded-full border-4 border-zinc-800 flex items-center justify-center relative overflow-hidden shadow-inner animate-spin-slow">
                <div className="absolute inset-0 bg-[conic-gradient(from_0deg,#F59E0B,#0F0F12,#EF4444,#0F0F12,#10B981,#0F0F12,#8B5CF6,#0F0F12)] opacity-30"></div>
                <div className="w-3 h-3 bg-white rounded-full z-10 shadow-[0_0_10px_white]"></div>
              </div>
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3.5 bg-red-500 clip-triangle shadow-md"></div>
            </div>
          </div>

          <div>
            <button
              onClick={() => {
                playClinkSound();
                onNavigate('roulette');
              }}
              className="w-full bg-white hover:bg-amber-400 text-black font-black py-2 rounded-xl transition-all uppercase text-xs tracking-wider cursor-pointer shadow-md font-['Unbounded'] flex items-center justify-center gap-2"
            >
              <Dices className="w-3.5 h-3.5" />
              <span>{isUa ? 'КРУТИТИ РУЛЕТКУ' : 'SPIN TO DECIDE'}</span>
            </button>
            <div className="mt-1.5 text-center text-zinc-400 text-[10px] italic truncate">
              {isUa ? '«Пити 2 по 50», «Дзвонити колишній»...' : '"Drink shots", "Call ex"...'}
            </div>
          </div>
        </div>

        {/* Box 5: Health & Prevention (Hangover Protocols) */}
        <div className="col-span-1 md:col-span-6 lg:col-span-4 bg-zinc-900 border border-zinc-800 rounded-2xl p-5 flex flex-col justify-between hover:border-zinc-700 transition-all">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-base font-bold text-white font-['Unbounded'] flex items-center gap-2">
              <HeartPulse className="w-4 h-4 text-emerald-400" />
              <span>{isUa ? 'Здоровʼя & Захист' : 'Health & Prevention'}</span>
            </h2>
            <button
              onClick={() => onNavigate('hangover')}
              className="text-[10px] text-zinc-400 hover:text-amber-400 uppercase font-bold cursor-pointer"
            >
              {isUa ? 'Усі ліки →' : 'All meds →'}
            </button>
          </div>

          <div className="space-y-1.5">
            <div
              onClick={() => onNavigate('hangover')}
              className="bg-zinc-800/80 hover:bg-zinc-800 p-2 rounded-xl flex items-center justify-between border-l-4 border-emerald-500 cursor-pointer transition-colors"
            >
              <div>
                <span className="text-[10px] font-black text-emerald-400 uppercase tracking-wider block">
                  {isUa ? 'ДО ВЕЧІРКИ (PRE-PARTY)' : 'PRE-PARTY PROTOCOL'}
                </span>
                <p className="text-[10px] text-zinc-300">
                  {isUa ? 'Жирна їжа, Вітамін B1, Регідрон' : 'Fatty meal & Vitamin B1 + Hydration'}
                </p>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-zinc-500" />
            </div>

            <div
              onClick={() => onNavigate('hangover')}
              className="bg-zinc-800/80 hover:bg-zinc-800 p-2 rounded-xl flex items-center justify-between border-l-4 border-red-500 cursor-pointer transition-colors"
            >
              <div>
                <span className="text-[10px] font-black text-red-400 uppercase tracking-wider block">
                  {isUa ? 'ПОХМІЛЛЯ (РАНОК)' : 'HANGOVER MORNING'}
                </span>
                <p className="text-[10px] text-zinc-300">
                  {isUa ? 'Ентеросгель, Бурштинова к-та' : 'Enterosgel & Succinic acid'}
                </p>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-zinc-500" />
            </div>

            <div
              onClick={() => onNavigate('hangover')}
              className="bg-zinc-800/80 hover:bg-zinc-800 p-2 rounded-xl flex items-center justify-between border-l-4 border-amber-500 cursor-pointer transition-colors"
            >
              <div>
                <span className="text-[10px] font-black text-amber-400 uppercase tracking-wider block">
                  {isUa ? 'СТОП НУДОТА' : 'NO NAUSEA / VOMIT'}
                </span>
                <p className="text-[10px] text-zinc-300">
                  {isUa ? 'Імбирний чай, Ондансетрон' : 'Ginger tea, Ondansetron & Sorbitol'}
                </p>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-zinc-500" />
            </div>
          </div>
        </div>

        {/* Box 6: Top 10 Cocktails Spotlight */}
        <div className="col-span-1 md:col-span-6 lg:col-span-4 bg-zinc-900 border border-zinc-800 rounded-2xl p-5 flex flex-col justify-between hover:border-zinc-700 transition-all">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-base font-bold text-white font-['Unbounded'] flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>{isUa ? 'Топ-10 Коктейлів Світу' : 'Top 10 World Cocktails'}</span>
            </h2>
            <button
              onClick={() => onNavigate('top10')}
              className="text-[10px] text-amber-400 font-bold uppercase tracking-wider hover:underline cursor-pointer"
            >
              {isUa ? 'Всі 10 →' : 'View all →'}
            </button>
          </div>

          <ul className="text-xs space-y-1.5 uppercase tracking-wide">
            <li
              onClick={() => onNavigate('top10')}
              className="flex justify-between items-center border-b border-zinc-800/80 pb-1 cursor-pointer hover:text-amber-300 transition-colors"
            >
              <span className="font-semibold text-stone-200">1. Negroni (Негроні)</span>
              <span className="text-amber-500 text-[10px] font-bold bg-amber-500/10 px-1.5 py-0.2 rounded">
                #1 Classic
              </span>
            </li>
            <li
              onClick={() => onNavigate('top10')}
              className="flex justify-between items-center border-b border-zinc-800/80 pb-1 cursor-pointer hover:text-amber-300 transition-colors"
            >
              <span className="font-semibold text-stone-200">2. Old Fashioned</span>
              <span className="text-amber-500 text-[10px] font-bold bg-amber-500/10 px-1.5 py-0.2 rounded">
                #2 Short
              </span>
            </li>
            <li
              onClick={() => onNavigate('top10')}
              className="flex justify-between items-center border-b border-zinc-800/80 pb-1 cursor-pointer hover:text-amber-300 transition-colors"
            >
              <span className="font-semibold text-stone-200">3. Margarita (Маргарита)</span>
              <span className="text-amber-500 text-[10px] font-bold bg-amber-500/10 px-1.5 py-0.2 rounded">
                #3 Agave
              </span>
            </li>
            <li
              onClick={() => onNavigate('top10')}
              className="flex justify-between items-center border-b border-zinc-800/80 pb-1 cursor-pointer hover:text-amber-300 transition-colors"
            >
              <span className="font-semibold text-stone-200">4. Espresso Martini</span>
              <span className="text-amber-500 text-[10px] font-bold bg-amber-500/10 px-1.5 py-0.2 rounded">
                #4 Coffee
              </span>
            </li>
            <li
              onClick={() => onNavigate('top10')}
              className="flex justify-between items-center cursor-pointer hover:text-amber-300 transition-colors pt-0.5"
            >
              <span className="font-semibold text-stone-200">5. Whiskey Sour</span>
              <span className="text-amber-500 text-[10px] font-bold bg-amber-500/10 px-1.5 py-0.2 rounded">
                #5 Sour
              </span>
            </li>
          </ul>
        </div>

        {/* Box 7: Tests Center (Alcohol Level, Alco-Rank, 5 Factors) */}
        <div className="col-span-1 md:col-span-6 lg:col-span-6 bg-zinc-900 border border-zinc-800 rounded-2xl p-5 overflow-hidden flex flex-col justify-between hover:border-zinc-700 transition-all">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-base font-bold text-white font-['Unbounded'] flex items-center gap-2">
              <Activity className="w-4 h-4 text-amber-400" />
              <span>{isUa ? 'Центр Тестів & Самоконтролю' : 'Tests & Self-Control Center'}</span>
            </h2>
            <span className="text-[10px] text-amber-500 font-bold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
              ANONYMOUS
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <button
              onClick={() => onNavigate('bac')}
              className="bg-zinc-800 hover:bg-zinc-700 p-3 rounded-xl border border-zinc-700 flex flex-col justify-center items-start gap-1 group text-left transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-1.5 w-full justify-between">
                <span className="text-xs font-bold group-hover:text-amber-400 uppercase text-white font-['Unbounded']">
                  {isUa ? 'Калькулятор Проміле' : 'BAC Promille'}
                </span>
                <Gauge className="w-3.5 h-3.5 text-amber-400" />
              </div>
              <span className="text-[10px] text-zinc-400">
                {isUa ? 'Формула Відмарка & Витвереження' : 'Widmark Formula & Sober Timer'}
              </span>
            </button>

            <button
              onClick={() => onNavigate('test')}
              className="bg-zinc-800 hover:bg-zinc-700 p-3 rounded-xl border border-zinc-700 flex flex-col justify-center items-start gap-1 group text-left transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-1.5 w-full justify-between">
                <span className="text-xs font-bold group-hover:text-amber-400 uppercase text-white font-['Unbounded']">
                  {isUa ? 'Тест: Рівень Алкоголіка' : 'Alco-Rank Test'}
                </span>
                <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
              </div>
              <span className="text-[10px] text-zinc-400">
                {isUa ? '10 питань самоаналізу' : '10-Question Self-Check'}
              </span>
            </button>

            <button
              onClick={() => onNavigate('fiveFactors')}
              className="bg-zinc-800 hover:bg-zinc-700 p-3 rounded-xl border border-zinc-700 sm:col-span-2 flex justify-between items-center px-4 py-2.5 group transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <span className="text-base">⚠️</span>
                <div>
                  <span className="text-xs font-bold group-hover:text-amber-400 uppercase text-white font-['Unbounded'] block">
                    {isUa ? '5 Факторів, що тобі вже не наливать' : '5 Factors When to Stop Pouring'}
                  </span>
                  <span className="text-[10px] text-zinc-400">
                    {isUa ? 'Поведінкові та фізіологічні маркери зупинки' : 'Behavioral & physiological cut-offs'}
                  </span>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-amber-400 transition-colors" />
            </button>
          </div>
        </div>

        {/* Box 8: Psychology with Woman Banner */}
        <div
          onClick={() => {
            playClinkSound();
            onNavigate('dating');
          }}
          className="col-span-1 md:col-span-6 lg:col-span-6 bg-zinc-900 hover:bg-zinc-800/90 rounded-2xl flex items-center justify-between p-5 border border-zinc-800 hover:border-zinc-700 cursor-pointer transition-all group shadow-sm"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-2xl shrink-0">
              👠
            </div>
            <div>
              <span className="font-bold uppercase text-xs tracking-wider text-white group-hover:text-amber-400 transition-colors block font-['Unbounded']">
                {isUa ? 'Психологія: Напій на побаченні' : 'Psychology: Drinks on a Date'}
              </span>
              <span className="text-xs text-amber-500 font-semibold block">
                {isUa ? 'Якщо ти з жінкою або з чоловіком' : 'If you are with a woman or a man'}
              </span>
            </div>
          </div>
          <button className="bg-white group-hover:bg-amber-400 text-black text-[11px] font-black px-3.5 py-2 rounded-xl uppercase tracking-wider font-['Unbounded'] shrink-0 transition-colors shadow">
            {isUa ? 'Читати гід' : 'Read Guide'}
          </button>
        </div>
      </div>
    </section>
  );
};
