import React, { useState, useMemo } from 'react';
import { Language } from '../types';
import { Gauge, Plus, Trash2, ShieldAlert, Car, AlertTriangle, Clock, RefreshCw, CheckCircle2 } from 'lucide-react';
import { playClinkSound } from '../utils/audio';

interface Props {
  language: Language;
}

interface ConsumedDrink {
  id: string;
  name: string;
  nameEn: string;
  volumeMl: number;
  abv: number;
}

export const BACCalculator: React.FC<Props> = ({ language }) => {
  const isUa = language === 'uk';

  // User parameters
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [weightKg, setWeightKg] = useState<number>(75);
  const [stomachState, setStomachState] = useState<'empty' | 'medium' | 'full'>('medium');
  const [hoursElapsed, setHoursElapsed] = useState<number>(2);

  // Drinks consumed
  const [drinks, setDrinks] = useState<ConsumedDrink[]>([
    { id: '1', name: 'Пиво світле', nameEn: 'Lager Beer', volumeMl: 500, abv: 5 },
    { id: '2', name: 'Коктейль Негроні', nameEn: 'Negroni Cocktail', volumeMl: 100, abv: 24 }
  ]);

  const presetDrinkOptions = [
    { name: 'Пиво світле (0.5 л)', nameEn: 'Lager Beer (500 ml)', volumeMl: 500, abv: 5 },
    { name: 'Келих вина (150 мл)', nameEn: 'Wine Glass (150 ml)', volumeMl: 150, abv: 12 },
    { name: 'Шот горілки / віскі (50 мл)', nameEn: 'Vodka/Whisky Shot (50 ml)', volumeMl: 50, abv: 40 },
    { name: 'Коктейль Лонг-Айленд (250 мл)', nameEn: 'Long Island (250 ml)', volumeMl: 250, abv: 22 },
    { name: 'Коктейль Апероль (180 мл)', nameEn: 'Aperol Spritz (180 ml)', volumeMl: 180, abv: 11 },
    { name: 'Шот Текіли (40 мл)', nameEn: 'Tequila Shot (40 ml)', volumeMl: 40, abv: 38 }
  ];

  const handleAddPreset = (p: typeof presetDrinkOptions[0]) => {
    setDrinks((prev) => [
      ...prev,
      {
        id: Math.random().toString(),
        name: p.name,
        nameEn: p.nameEn,
        volumeMl: p.volumeMl,
        abv: p.abv
      }
    ]);
    playClinkSound();
  };

  const handleRemoveDrink = (id: string) => {
    setDrinks((prev) => prev.filter((d) => d.id !== id));
  };

  // Widmark formula calculation:
  // Total alcohol in grams = sum(volumeMl * (abv / 100) * 0.8)
  // r (Widmark factor) = 0.68 for male, 0.55 for female
  // Absorption rate based on stomach fullness: empty: 0.9, medium: 0.75, full: 0.6
  // Elimination rate = ~0.15 promille per hour
  const { bacPromille, timeToSoberHours, drivingStatus, dangerColor } = useMemo(() => {
    const totalAlcoholGrams = drinks.reduce((acc, d) => {
      return acc + d.volumeMl * (d.abv / 100) * 0.8;
    }, 0);

    const r = gender === 'male' ? 0.68 : 0.55;
    const stomachFactor = stomachState === 'empty' ? 1.0 : stomachState === 'medium' ? 0.85 : 0.75;
    const bodyWeightGrams = weightKg * 1000;

    const rawMaxBac = (totalAlcoholGrams * stomachFactor) / (bodyWeightGrams * r) * 1000;
    const eliminationPerHour = 0.15; // standard ~0.15‰ per hour

    const currentBac = Math.max(0, rawMaxBac - hoursElapsed * eliminationPerHour);
    const timeToZero = currentBac > 0 ? (currentBac / eliminationPerHour) : 0;

    let status = 'safe';
    let color = 'text-emerald-400';

    if (currentBac === 0) {
      status = isUa ? 'Повна тверезість (0.00 ‰)' : 'Completely Sober (0.00 ‰)';
      color = 'text-emerald-400';
    } else if (currentBac <= 0.2) {
      status = isUa ? 'Допустима норма в Україні (≤0.20 ‰)' : 'Within Ukraine legal limit (≤0.20 ‰)';
      color = 'text-teal-400';
    } else if (currentBac <= 0.5) {
      status = isUa ? 'Легке сп\'яніння (керувати заборонено!)' : 'Mild impairment (Driving Forbidden!)';
      color = 'text-yellow-400';
    } else if (currentBac <= 1.5) {
      status = isUa ? 'Середній ступінь сп\'яніння' : 'Moderate intoxication';
      color = 'text-amber-500';
    } else if (currentBac <= 2.5) {
      status = isUa ? 'Сильне сп\'яніння (ризик інтоксикації)' : 'Heavy intoxication';
      color = 'text-rose-500';
    } else {
      status = isUa ? 'Критичний ступінь (небезпека для життя)' : 'Critical intoxication level';
      color = 'text-red-600';
    }

    return {
      bacPromille: Math.round(currentBac * 100) / 100,
      timeToSoberHours: Math.round(timeToZero * 10) / 10,
      drivingStatus: status,
      dangerColor: color
    };
  }, [drinks, gender, weightKg, stomachState, hoursElapsed, isUa]);

  return (
    <section id="bac-calculator-section" className="py-12 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-2">
          <Gauge className="w-3.5 h-3.5" />
          {isUa ? 'Калькулятор Проміле' : 'Blood Alcohol BAC Calculator'}
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-['Unbounded'] tracking-tight">
          {isUa ? 'Градусомір: Тест Рівня Алкоголю в Крові' : 'Alcohol Promille & Sober Countdown'}
        </h2>
        <p className="mt-2 text-stone-400 text-sm sm:text-base">
          {isUa
            ? 'Точний розрахунок за формулою Відмарка: скільки проміле у крові, чи можна за кермо і коли настане повне витвереження.'
            : 'Widmark scientific formula calculator: estimated BAC in ‰, driving law compliance, and hours until complete sobriety.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Config Controls */}
        <div className="lg:col-span-7 rounded-3xl bg-stone-900 border border-stone-800 p-6 sm:p-8 space-y-6 shadow-2xl">
          {/* User Parameters */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Gender */}
            <div>
              <label className="block text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">
                {isUa ? 'Стать:' : 'Gender:'}
              </label>
              <div className="flex rounded-xl bg-stone-950 p-1 border border-stone-800">
                <button
                  onClick={() => setGender('male')}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    gender === 'male' ? 'bg-cyan-500 text-stone-950 font-bold' : 'text-stone-400'
                  }`}
                >
                  {isUa ? 'Чоловік' : 'Male'}
                </button>
                <button
                  onClick={() => setGender('female')}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    gender === 'female' ? 'bg-rose-500 text-white font-bold' : 'text-stone-400'
                  }`}
                >
                  {isUa ? 'Жінка' : 'Female'}
                </button>
              </div>
            </div>

            {/* Weight */}
            <div>
              <label className="block text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">
                {isUa ? `Вага: ${weightKg} кг` : `Weight: ${weightKg} kg`}
              </label>
              <input
                type="range"
                min={45}
                max={140}
                value={weightKg}
                onChange={(e) => setWeightKg(Number(e.target.value))}
                className="w-full accent-cyan-500 cursor-pointer"
              />
            </div>

            {/* Hours Elapsed */}
            <div>
              <label className="block text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">
                {isUa ? `Пройшло: ${hoursElapsed} год.` : `Elapsed: ${hoursElapsed} hrs`}
              </label>
              <input
                type="range"
                min={0}
                max={12}
                step={0.5}
                value={hoursElapsed}
                onChange={(e) => setHoursElapsed(Number(e.target.value))}
                className="w-full accent-cyan-500 cursor-pointer"
              />
            </div>
          </div>

          {/* Stomach state */}
          <div>
            <label className="block text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">
              {isUa ? 'Закуска / Стан шлунка:' : 'Stomach meal state:'}
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setStomachState('empty')}
                className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                  stomachState === 'empty'
                    ? 'bg-rose-500 text-white border-rose-400 font-bold'
                    : 'bg-stone-950 text-stone-400 border-stone-800'
                }`}
              >
                {isUa ? 'Натщесерце' : 'Empty'}
              </button>
              <button
                onClick={() => setStomachState('medium')}
                className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                  stomachState === 'medium'
                    ? 'bg-amber-500 text-stone-950 border-amber-400 font-bold'
                    : 'bg-stone-950 text-stone-400 border-stone-800'
                }`}
              >
                {isUa ? 'Легкий снек' : 'Light snack'}
              </button>
              <button
                onClick={() => setStomachState('full')}
                className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                  stomachState === 'full'
                    ? 'bg-emerald-500 text-stone-950 border-emerald-400 font-bold'
                    : 'bg-stone-950 text-stone-400 border-stone-800'
                }`}
              >
                {isUa ? 'Ситна їжа' : 'Full meal'}
              </button>
            </div>
          </div>

          {/* Quick Preset Add Buttons */}
          <div>
            <label className="block text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">
              {isUa ? 'Додати випитий напій:' : 'Add drink to calculator:'}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {presetDrinkOptions.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAddPreset(p)}
                  className="p-2.5 rounded-xl bg-stone-950 hover:bg-stone-800 border border-stone-800 hover:border-cyan-500/50 text-left text-xs text-stone-300 transition-colors flex items-center justify-between"
                >
                  <span className="truncate">{isUa ? p.name : p.nameEn}</span>
                  <Plus className="w-3.5 h-3.5 text-cyan-400 shrink-0 ml-1" />
                </button>
              ))}
            </div>
          </div>

          {/* Active Drinks Table */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                {isUa ? 'Випито напоїв:' : 'Logged drinks:'}
              </span>
              {drinks.length > 0 && (
                <button
                  onClick={() => setDrinks([])}
                  className="text-xs text-rose-400 hover:underline"
                >
                  {isUa ? 'Очистити все' : 'Clear all'}
                </button>
              )}
            </div>
            {drinks.length === 0 ? (
              <div className="py-4 text-center text-xs text-stone-500 bg-stone-950 rounded-xl border border-stone-800">
                {isUa ? 'Список порожній. Додай напій вище!' : 'No drinks logged yet. Add one above!'}
              </div>
            ) : (
              <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                {drinks.map((d) => (
                  <div
                    key={d.id}
                    className="px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 flex items-center justify-between text-xs"
                  >
                    <span className="text-stone-200">{isUa ? d.name : d.nameEn}</span>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-cyan-400">
                        {d.volumeMl} {isUa ? 'мл' : 'ml'} ({d.abv}%)
                      </span>
                      <button
                        onClick={() => handleRemoveDrink(d.id)}
                        className="text-stone-500 hover:text-rose-400"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Output Gauge Card */}
        <div className="lg:col-span-5 rounded-3xl bg-gradient-to-b from-stone-900 via-stone-900 to-stone-950 border-2 border-cyan-500/40 p-6 sm:p-8 space-y-6 shadow-2xl text-center relative overflow-hidden">
          <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
            {isUa ? 'Поточна Концентрація у Крові' : 'Estimated Blood Alcohol Level'}
          </div>

          {/* Big Number Gauge */}
          <div className="py-4">
            <div className={`text-6xl sm:text-7xl font-black font-['Unbounded'] ${dangerColor} transition-colors`}>
              {bacPromille.toFixed(2)}
              <span className="text-2xl sm:text-3xl ml-1 text-stone-400 font-normal">‰</span>
            </div>
            <div className={`text-xs sm:text-sm font-bold mt-2 ${dangerColor}`}>
              {drivingStatus}
            </div>
          </div>

          {/* Legal / Driving Advice */}
          <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 text-left space-y-3">
            <div className="flex items-start gap-2.5">
              <Car className={`w-5 h-5 shrink-0 mt-0.5 ${bacPromille <= 0.2 ? 'text-emerald-400' : 'text-rose-500'}`} />
              <div>
                <div className="text-xs font-bold text-white uppercase tracking-wider">
                  {isUa ? 'Закон та Керування авто:' : 'Driving Law:'}
                </div>
                <p className="text-xs text-stone-300 mt-0.5 leading-relaxed">
                  {bacPromille <= 0.2
                    ? isUa
                      ? 'В межах норми (в Україні норма до 0.20 ‰). Але Градусолог радить викликати таксі для 100% безпеки!'
                      : 'Within the Ukraine 0.20 ‰ limit, but a taxi is always safer!'
                    : isUa
                    ? 'КАТЕГОРИЧНО ЗАБОРОНЕНО СІДАТИ ЗА КЕРМО! Штраф від 17 000 грн та позбавлення прав на 1 рік.'
                    : 'DRIVING STRICTLY PROHIBITED! Immediate severe legal penalties and accident risk.'}
                </p>
              </div>
            </div>

            {/* Sober countdown */}
            <div className="flex items-start gap-2.5 pt-3 border-t border-stone-800/80">
              <Clock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold text-white uppercase tracking-wider">
                  {isUa ? 'Час до повного витвереження:' : 'Time until complete sobriety:'}
                </div>
                <div className="text-sm font-bold text-amber-300 font-mono mt-0.5">
                  {timeToSoberHours > 0
                    ? isUa ? `Приблизно ~${timeToSoberHours} год.` : `Approximately ~${timeToSoberHours} hours`
                    : isUa ? 'Організм уже тверезий!' : 'Completely sober now!'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
