import React, { useState } from 'react';
import { ALCOHOLIC_TEST_QUESTIONS, TEST_RESULT_BANDS, TestResultBand } from '../data/alcoholicTest';
import { Language } from '../types';
import { HeartPulse, CheckCircle2, RefreshCw, Award, ArrowRight, ShieldAlert, Sparkles, HelpCircle } from 'lucide-react';
import { playClinkSound, playWinSound } from '../utils/audio';

interface Props {
  language: Language;
}

export const AlcoholicTest: React.FC<Props> = ({ language }) => {
  const isUa = language === 'uk';

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [qId: number]: number }>({});
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQuestion = ALCOHOLIC_TEST_QUESTIONS[currentQuestionIndex];
  const totalQuestions = ALCOHOLIC_TEST_QUESTIONS.length;

  const handleSelectOption = (points: number) => {
    const updated = { ...selectedAnswers, [currentQuestion.id]: points };
    setSelectedAnswers(updated);
    playClinkSound();

    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setIsCompleted(true);
      playWinSound();
    }
  };

  const calculateTotalScore = (): number => {
    let sum = 0;
    for (const key of Object.keys(selectedAnswers)) {
      const val = selectedAnswers[Number(key)];
      if (typeof val === 'number') {
        sum += val;
      }
    }
    return sum;
  };

  const getResultBand = (): TestResultBand => {
    const total = calculateTotalScore();
    const found = TEST_RESULT_BANDS.find((b) => total >= b.minScore && total <= b.maxScore);
    return found || TEST_RESULT_BANDS[0];
  };

  const handleRestart = () => {
    setSelectedAnswers({});
    setCurrentQuestionIndex(0);
    setIsCompleted(false);
  };

  const resultBand = getResultBand();
  const totalScore = calculateTotalScore();

  return (
    <section id="alcoholic-test-section" className="py-12 px-4 sm:px-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-2">
          <HeartPulse className="w-3.5 h-3.5" />
          {isUa ? 'Самодіагностика та Свідомість' : 'Self-Assessment & Awareness'}
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-['Unbounded'] tracking-tight">
          {isUa ? 'Тест: «Який твій Рівень Алкоголіка?»' : 'Alcohol Relationship Self-Test'}
        </h2>
        <p className="mt-2 text-stone-400 text-sm sm:text-base">
          {isUa
            ? 'Чесний психологічний експрес-тест з 10 запитань про твої стосунки з градусом, звичками та контролем.'
            : 'Honest 10-question psychological assessment regarding your drinking habits, control, and tolerance.'}
        </p>
      </div>

      {!isCompleted ? (
        /* Questionnaire Box */
        <div className="rounded-3xl bg-stone-900 border border-stone-800 p-6 sm:p-8 shadow-2xl space-y-6 animate-fadeIn">
          {/* Progress Header */}
          <div className="flex items-center justify-between text-xs text-stone-400 font-mono border-b border-stone-800 pb-3">
            <span>
              {isUa ? `Питання ${currentQuestionIndex + 1} з ${totalQuestions}` : `Question ${currentQuestionIndex + 1} of ${totalQuestions}`}
            </span>
            <span className="font-bold text-amber-400">
              {Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100)}%
            </span>
          </div>

          {/* Question Text */}
          <h3 className="text-lg sm:text-xl font-bold text-white font-['Unbounded'] leading-snug">
            {isUa ? currentQuestion.questionUa : currentQuestion.questionEn}
          </h3>

          {/* Options */}
          <div className="space-y-2.5">
            {currentQuestion.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectOption(opt.points)}
                className="w-full p-4 rounded-2xl bg-stone-950 hover:bg-stone-800/80 border border-stone-800 hover:border-amber-500/50 text-left text-xs sm:text-sm text-stone-200 transition-all flex items-center justify-between group"
              >
                <span>{isUa ? opt.textUa : opt.textEn}</span>
                <ArrowRight className="w-4 h-4 text-stone-600 group-hover:text-amber-400 group-hover:translate-x-1 transition-all shrink-0 ml-2" />
              </button>
            ))}
          </div>

          {/* Bottom helper */}
          <div className="flex justify-between items-center text-[11px] text-stone-500 pt-2">
            <span>{isUa ? 'Відповідай максимально чесно для правдивого результату' : 'Answer honestly for accurate evaluation'}</span>
            {currentQuestionIndex > 0 && (
              <button
                onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}
                className="text-stone-400 hover:text-stone-200 underline"
              >
                {isUa ? '← Назад' : '← Previous'}
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Result Score Card */
        <div className="rounded-3xl bg-stone-900 border-2 border-amber-500/50 p-6 sm:p-9 shadow-2xl space-y-6 animate-fadeIn relative overflow-hidden">
          <div className="text-center border-b border-stone-800 pb-6">
            <div className="text-5xl mb-3">{resultBand.emoji}</div>
            <div className="inline-block px-3 py-1 rounded-full bg-gradient-to-r text-white text-xs font-bold font-['Unbounded'] mb-2 shadow" style={{ backgroundImage: `linear-gradient(to right, #f59e0b, #d97706)` }}>
              {isUa ? `Результат: ${totalScore} балів` : `Score: ${totalScore} points`}
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white font-['Unbounded']">
              {isUa ? resultBand.titleUa : resultBand.titleEn}
            </h3>
            <p className="text-xs sm:text-sm text-amber-300/90 font-medium mt-1">
              {isUa ? resultBand.summaryUa : resultBand.summaryEn}
            </p>
          </div>

          {/* Analysis & Recommendation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800">
              <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider mb-2">
                {isUa ? 'Аналіз твоїх барних звичок:' : 'Habit Analysis:'}
              </div>
              <p className="text-stone-300 leading-relaxed">
                {isUa ? resultBand.detailedAnalysisUa : resultBand.detailedAnalysisEn}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800">
              <div className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider mb-2">
                {isUa ? 'Порада від Градусолога:' : 'Gradusologist Recommendation:'}
              </div>
              <p className="text-stone-300 leading-relaxed">
                {isUa ? resultBand.recommendationUa : resultBand.recommendationEn}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-center pt-2">
            <button
              onClick={handleRestart}
              className="py-3 px-6 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold font-['Unbounded'] text-xs sm:text-sm flex items-center gap-2 transition-all shadow"
            >
              <RefreshCw className="w-4 h-4" />
              {isUa ? 'Пройти тест заново' : 'Retake Test'}
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
