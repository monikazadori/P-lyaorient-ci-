import React, { useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Award,
  Bell,
  CheckCircle2,
  HelpCircle,
  Lightbulb,
  RotateCcw,
  Scale,
  SearchCheck,
  Star,
  ThumbsDown,
  ThumbsUp,
} from 'lucide-react';
import { POSITIVE_FEEDBACK_MESSAGES } from '../../data/stations';
import {
  EXPLAIN_WHY_QUESTIONS,
  FIND_ERROR_PUZZLES,
  TRUTH_STATEMENTS,
} from '../../data/station6TruthTower';
import { playStarChime } from '../../utils/sound';
import {
  BellStarOwlImage,
  BellTowerOwlImage,
  ErrorSceneArt,
} from '../illustrations/Station6TruthTowerArt';

type Station6Stage =
  | 'INTRO'
  | 'TRUTH_CHECK'
  | 'FIND_ERROR'
  | 'EXPLAIN_WHY'
  | 'COMPLETED';

interface Station6TruthTowerGameProps {
  isAlreadyCompleted: boolean;
  onComplete: () => void;
  onGoHome: () => void;
  onGoToNextStation: () => void;
}

export const Station6TruthTowerGame: React.FC<Station6TruthTowerGameProps> = ({
  isAlreadyCompleted,
  onComplete,
  onGoHome,
  onGoToNextStation,
}) => {
  const [stage, setStage] = useState<Station6Stage>('INTRO');
  const [wasAlreadyCompletedOnFinish, setWasAlreadyCompletedOnFinish] =
    useState(isAlreadyCompleted);

  // Trial 1: Igazságvizsgáló (10 statements)
  const [truthIndex, setTruthIndex] = useState(0);
  const [truthChoice, setTruthChoice] = useState<boolean | null>(null);
  const [truthStatus, setTruthStatus] = useState<'IDLE' | 'WRONG' | 'CORRECT'>(
    'IDLE'
  );
  const [completedTruthIds, setCompletedTruthIds] = useState<string[]>([]);

  // Trial 2: Keresd a tévedést! (6 illustrated puzzles)
  const [errorIndex, setErrorIndex] = useState(0);
  const [errorChoice, setErrorChoice] = useState<'A' | 'B' | 'C' | null>(null);
  const [errorStatus, setErrorStatus] = useState<'IDLE' | 'WRONG' | 'CORRECT'>(
    'IDLE'
  );
  const [completedErrorIds, setCompletedErrorIds] = useState<string[]>([]);

  // Trial 3: Indokold meg! (5 situations)
  const [explainIndex, setExplainIndex] = useState(0);
  const [explainChoice, setExplainChoice] = useState<'A' | 'B' | 'C' | null>(
    null
  );
  const [explainStatus, setExplainStatus] = useState<
    'IDLE' | 'WRONG' | 'CORRECT'
  >('IDLE');
  const [completedExplainIds, setCompletedExplainIds] = useState<string[]>([]);

  const stageStepNumber = useMemo(() => {
    switch (stage) {
      case 'INTRO':
        return 0;
      case 'TRUTH_CHECK':
        return 1;
      case 'FIND_ERROR':
        return 2;
      case 'EXPLAIN_WHY':
        return 3;
      case 'COMPLETED':
        return 4;
    }
  }, [stage]);

  const handleRestartStation = () => {
    setStage('INTRO');
    setTruthIndex(0);
    setTruthChoice(null);
    setTruthStatus('IDLE');
    setCompletedTruthIds([]);

    setErrorIndex(0);
    setErrorChoice(null);
    setErrorStatus('IDLE');
    setCompletedErrorIds([]);

    setExplainIndex(0);
    setExplainChoice(null);
    setExplainStatus('IDLE');
    setCompletedExplainIds([]);
  };

  // --- Trial 1 Handlers ---
  const currentTruth = TRUTH_STATEMENTS[truthIndex];

  const handleSelectTruthAnswer = (answer: boolean) => {
    if (!currentTruth || truthStatus !== 'IDLE') return;
    setTruthChoice(answer);

    if (answer === currentTruth.isTrue) {
      setTruthStatus('CORRECT');
      setCompletedTruthIds((prev) =>
        prev.includes(currentTruth.id) ? prev : [...prev, currentTruth.id]
      );
    } else {
      setTruthStatus('WRONG');
    }
  };

  const handleRetryTruth = () => {
    setTruthChoice(null);
    setTruthStatus('IDLE');
  };

  const handleNextTruth = () => {
    if (truthStatus !== 'CORRECT') return;
    if (truthIndex + 1 < TRUTH_STATEMENTS.length) {
      setTruthIndex((prev) => prev + 1);
      setTruthChoice(null);
      setTruthStatus('IDLE');
    } else if (completedTruthIds.length === TRUTH_STATEMENTS.length) {
      setStage('FIND_ERROR');
    }
  };

  // --- Trial 2 Handlers ---
  const currentErrorPuzzle = FIND_ERROR_PUZZLES[errorIndex];

  const handleSelectErrorOption = (letter: 'A' | 'B' | 'C') => {
    if (!currentErrorPuzzle || errorStatus !== 'IDLE') return;
    setErrorChoice(letter);

    if (letter === currentErrorPuzzle.wrongOptionLetter) {
      setErrorStatus('CORRECT');
      setCompletedErrorIds((prev) =>
        prev.includes(currentErrorPuzzle.id)
          ? prev
          : [...prev, currentErrorPuzzle.id]
      );
    } else {
      setErrorStatus('WRONG');
    }
  };

  const handleRetryErrorPuzzle = () => {
    setErrorChoice(null);
    setErrorStatus('IDLE');
  };

  const handleNextErrorPuzzle = () => {
    if (errorStatus !== 'CORRECT') return;
    if (errorIndex + 1 < FIND_ERROR_PUZZLES.length) {
      setErrorIndex((prev) => prev + 1);
      setErrorChoice(null);
      setErrorStatus('IDLE');
    } else if (completedErrorIds.length === FIND_ERROR_PUZZLES.length) {
      setStage('EXPLAIN_WHY');
    }
  };

  // --- Trial 3 Handlers ---
  const currentExplain = EXPLAIN_WHY_QUESTIONS[explainIndex];

  const handleSelectExplainOption = (letter: 'A' | 'B' | 'C') => {
    if (!currentExplain || explainStatus !== 'IDLE') return;
    setExplainChoice(letter);

    if (letter === currentExplain.correctLetter) {
      setExplainStatus('CORRECT');
      setCompletedExplainIds((prev) =>
        prev.includes(currentExplain.id)
          ? prev
          : [...prev, currentExplain.id]
      );
    } else {
      setExplainStatus('WRONG');
    }
  };

  const handleRetryExplain = () => {
    setExplainChoice(null);
    setExplainStatus('IDLE');
  };

  const handleNextExplain = () => {
    if (explainStatus !== 'CORRECT') return;
    if (explainIndex + 1 < EXPLAIN_WHY_QUESTIONS.length) {
      setExplainIndex((prev) => prev + 1);
      setExplainChoice(null);
      setExplainStatus('IDLE');
    } else if (
      completedTruthIds.length === TRUTH_STATEMENTS.length &&
      completedErrorIds.length === FIND_ERROR_PUZZLES.length &&
      completedExplainIds.length === EXPLAIN_WHY_QUESTIONS.length
    ) {
      setWasAlreadyCompletedOnFinish(isAlreadyCompleted);
      setStage('COMPLETED');
      onComplete();
      playStarChime();
    }
  };

  const positiveTag =
    POSITIVE_FEEDBACK_MESSAGES[
      (truthIndex + errorIndex + explainIndex) %
        POSITIVE_FEEDBACK_MESSAGES.length
    ];

  return (
    <div className="space-y-6">
      {/* INTRO SCREEN */}
      {stage === 'INTRO' && (
        <section
          aria-labelledby="station6-intro-title"
          className="rounded-3xl border border-teal-200 bg-white shadow-sm p-6 sm:p-10"
        >
          <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center gap-6 sm:gap-8">
            <div className="w-44 h-44 sm:w-52 sm:h-52 rounded-3xl overflow-hidden border border-teal-200 bg-teal-50 shrink-0 shadow-xs">
              <BellTowerOwlImage className="w-full h-full object-cover" />
            </div>

            <div className="space-y-5 text-center md:text-left">
              <div className="inline-flex items-center gap-2 text-sm font-bold text-teal-800">
                <Bell className="w-4 h-4" aria-hidden="true" />
                <span>Igazmondó Harangtorony · Három próba</span>
              </div>

              <h2
                id="station6-intro-title"
                className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight text-balance"
              >
                Igaz vagy hamis? – Igazmondó Harangtorony
              </h2>

              <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
                „Üdvözöllek az Igazmondó Harangtoronyban! A mesterségek
                világában sok érdekes dolgot hallhatsz, de vajon mind igaz?
                Figyelj, gondolkodj, és segíts kideríteni az igazságot! Három
                próbát kell teljesítened, hogy megszerezd a hatodik
                csillagodat!”
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3.5 justify-center md:justify-start">
                <button
                  type="button"
                  onClick={() => setStage('TRUTH_CHECK')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 min-h-[56px] px-8 py-3.5 rounded-2xl bg-teal-700 text-white font-display font-bold text-lg hover:bg-teal-800 active:scale-[0.99] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700 focus-visible:ring-offset-2 whitespace-nowrap cursor-pointer"
                >
                  <Scale className="w-5 h-5" aria-hidden="true" />
                  <span>Induljon az 1. próba!</span>
                </button>

                <button
                  type="button"
                  onClick={onGoHome}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 min-h-[56px] px-6 py-3.5 rounded-2xl border border-slate-300 bg-white text-slate-800 font-semibold text-base hover:bg-slate-50 transition-colors whitespace-nowrap cursor-pointer"
                >
                  <ArrowLeft className="w-5 h-5" aria-hidden="true" />
                  <span>Vissza a városba</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3-TRIAL STEPPER */}
      {stage !== 'INTRO' && stage !== 'COMPLETED' && (
        <nav
          aria-label="A hatodik állomás három próbája"
          className="rounded-3xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { step: 1, title: '1. Igazságvizsgáló' },
              { step: 2, title: '2. Keresd a tévedést!' },
              { step: 3, title: '3. Indokold meg!' },
            ].map((item) => {
              const isDone = stageStepNumber > item.step;
              const isCurrent = stageStepNumber === item.step;

              return (
                <div
                  key={item.step}
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl border transition-colors ${
                    isDone
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                      : isCurrent
                      ? 'bg-teal-50 border-teal-300 text-slate-900'
                      : 'bg-slate-50 border-slate-200 text-slate-500'
                  }`}
                >
                  <span
                    className={`w-8 h-8 rounded-xl flex items-center justify-center font-display font-bold text-sm shrink-0 ${
                      isDone
                        ? 'bg-emerald-600 text-white'
                        : isCurrent
                        ? 'bg-teal-600 text-white'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {isDone ? (
                      <CheckCircle2 className="w-5 h-5" aria-hidden="true" />
                    ) : (
                      item.step
                    )}
                  </span>
                  <span className="font-display text-sm sm:text-base font-bold leading-tight">
                    {item.title}
                  </span>
                </div>
              );
            })}
          </div>
        </nav>
      )}

      {/* 1. PRÓBA – IGAZSÁGVIZSGÁLÓ */}
      {stage === 'TRUTH_CHECK' && currentTruth && (
        <section
          aria-labelledby="station6-trial1-title"
          className="rounded-3xl border border-slate-200 bg-white shadow-sm p-6 sm:p-8 space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <p className="text-sm font-semibold text-teal-800">
                1. próba · Döntsd el, igaz-e!
              </p>
              <h2
                id="station6-trial1-title"
                className="font-display text-2xl sm:text-3xl font-bold text-slate-900"
              >
                Igazságvizsgáló
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <span className="font-display text-base sm:text-lg font-bold text-slate-700 tabular-nums whitespace-nowrap">
                {truthIndex + 1} / {TRUTH_STATEMENTS.length} állítás
              </span>
              <button
                type="button"
                onClick={onGoHome}
                className="inline-flex items-center gap-1.5 min-h-[44px] px-4 py-2 rounded-xl border border-slate-300 bg-white text-slate-800 text-sm font-semibold hover:bg-slate-50 transition-colors whitespace-nowrap cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                <span>Vissza a városba</span>
              </button>
            </div>
          </div>

          <div className="max-w-2xl mx-auto space-y-6">
            {/* Single Statement Card */}
            <div className="rounded-3xl border-2 border-teal-200 bg-teal-50/60 p-6 sm:p-8 text-center space-y-2">
              <p className="text-sm font-bold text-teal-800">
                Olvasd el figyelmesen az állítást:
              </p>
              <p className="font-display text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 leading-snug text-balance">
                „{currentTruth.statement}”
              </p>
            </div>

            {/* Two Big Colorful Buttons: IGAZ & HAMIS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                type="button"
                disabled={truthStatus !== 'IDLE'}
                onClick={() => handleSelectTruthAnswer(true)}
                className={`min-h-[76px] px-6 py-4 rounded-2xl border-2 font-display text-2xl font-extrabold flex items-center justify-center gap-3 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 whitespace-nowrap ${
                  truthStatus === 'CORRECT' && truthChoice === true
                    ? 'bg-emerald-600 border-emerald-700 text-white shadow-sm'
                    : truthStatus === 'WRONG' && truthChoice === true
                    ? 'bg-amber-100 border-amber-400 text-amber-950'
                    : truthStatus !== 'IDLE'
                    ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed'
                    : 'bg-emerald-50 border-emerald-400 text-emerald-950 hover:bg-emerald-100 active:scale-[0.99] cursor-pointer shadow-xs'
                }`}
              >
                <ThumbsUp className="w-7 h-7 shrink-0" aria-hidden="true" />
                <span>IGAZ</span>
              </button>

              <button
                type="button"
                disabled={truthStatus !== 'IDLE'}
                onClick={() => handleSelectTruthAnswer(false)}
                className={`min-h-[76px] px-6 py-4 rounded-2xl border-2 font-display text-2xl font-extrabold flex items-center justify-center gap-3 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-600 focus-visible:ring-offset-2 whitespace-nowrap ${
                  truthStatus === 'CORRECT' && truthChoice === false
                    ? 'bg-emerald-600 border-emerald-700 text-white shadow-sm'
                    : truthStatus === 'WRONG' && truthChoice === false
                    ? 'bg-amber-100 border-amber-400 text-amber-950'
                    : truthStatus !== 'IDLE'
                    ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed'
                    : 'bg-rose-50 border-rose-400 text-rose-950 hover:bg-rose-100 active:scale-[0.99] cursor-pointer shadow-xs'
                }`}
              >
                <ThumbsDown className="w-7 h-7 shrink-0" aria-hidden="true" />
                <span>HAMIS</span>
              </button>
            </div>

            {/* Wrong Answer: Friendly message + Újrapróbálom (never reveals correct answer) */}
            {truthStatus === 'WRONG' && (
              <div
                role="status"
                aria-live="polite"
                className="rounded-2xl bg-amber-50 border border-amber-300 p-5 text-amber-950 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3">
                  <HelpCircle
                    className="w-6 h-6 text-amber-700 shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <div className="space-y-1">
                    <p className="font-display text-lg font-bold text-amber-950">
                      Ez most nem talált! Gondold át újra!
                    </p>
                    <p className="text-base text-amber-900 leading-relaxed">
                      {currentTruth.retryHint}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleRetryTruth}
                  className="inline-flex items-center justify-center gap-2 min-h-[52px] px-6 py-3 rounded-2xl bg-amber-600 text-white font-display font-bold text-base hover:bg-amber-700 active:scale-[0.99] transition-all whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <RotateCcw className="w-5 h-5" aria-hidden="true" />
                  <span>Újrapróbálom</span>
                </button>
              </div>
            )}

            {/* Correct Answer: Green feedback + explanation + Tovább */}
            {truthStatus === 'CORRECT' && (
              <div
                role="status"
                aria-live="polite"
                className="rounded-2xl bg-emerald-50 border border-emerald-300 p-5 text-emerald-950 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3">
                  <CheckCircle2
                    className="w-6 h-6 text-emerald-700 shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <div className="space-y-1">
                    <p className="font-display text-lg font-bold text-emerald-900">
                      {positiveTag}
                    </p>
                    <p className="text-base text-emerald-900 leading-relaxed">
                      {currentTruth.explanation}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleNextTruth}
                  className="inline-flex items-center justify-center gap-2 min-h-[52px] px-7 py-3 rounded-2xl bg-emerald-700 text-white font-display font-bold text-base sm:text-lg hover:bg-emerald-800 active:scale-[0.99] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>
                    {truthIndex + 1 < TRUTH_STATEMENTS.length
                      ? 'Tovább'
                      : 'Tovább a 2. próbára'}
                  </span>
                  <ArrowRight className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* 2. PRÓBA – KERESD A TÉVEDÉST! */}
      {stage === 'FIND_ERROR' && currentErrorPuzzle && (
        <section
          aria-labelledby="station6-trial2-title"
          className="rounded-3xl border border-slate-200 bg-white shadow-sm p-6 sm:p-8 space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <p className="text-sm font-semibold text-teal-800">
                2. próba · Képes feladvány
              </p>
              <h2
                id="station6-trial2-title"
                className="font-display text-2xl sm:text-3xl font-bold text-slate-900"
              >
                Keresd a tévedést!
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <span className="font-display text-base sm:text-lg font-bold text-slate-700 tabular-nums whitespace-nowrap">
                {errorIndex + 1} / {FIND_ERROR_PUZZLES.length} feladvány
              </span>
              <button
                type="button"
                onClick={onGoHome}
                className="inline-flex items-center gap-1.5 min-h-[44px] px-4 py-2 rounded-xl border border-slate-300 bg-white text-slate-800 text-sm font-semibold hover:bg-slate-50 transition-colors whitespace-nowrap cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                <span>Vissza a városba</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            {/* Illustration Column */}
            <div className="lg:col-span-6 rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-3">
              <ErrorSceneArt
                sceneId={currentErrorPuzzle.id}
                className="w-full h-56 sm:h-64"
              />
              <p className="font-display text-base font-bold text-slate-700 text-center">
                {currentErrorPuzzle.sceneTitle}
              </p>
            </div>

            {/* Question + 3 Options Column */}
            <div className="lg:col-span-6 space-y-5">
              <div>
                <p className="text-sm font-bold text-teal-800">
                  Figyeld meg a képet és a három mondatot!
                </p>
                <h3 className="mt-1 font-display text-2xl font-extrabold text-slate-900">
                  Melyik állítás nem igaz?
                </h3>
              </div>

              <div className="space-y-3.5">
                {currentErrorPuzzle.options.map((opt) => {
                  const isSelected = errorChoice === opt.letter;
                  const isSuccess = errorStatus === 'CORRECT' && isSelected;
                  const isWrongSelected = errorStatus === 'WRONG' && isSelected;

                  return (
                    <button
                      key={opt.letter}
                      type="button"
                      disabled={errorStatus !== 'IDLE'}
                      onClick={() => handleSelectErrorOption(opt.letter)}
                      className={`w-full min-h-[64px] px-5 py-3.5 rounded-2xl border-2 text-left font-display text-lg font-bold flex items-center gap-3.5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2 ${
                        isSuccess
                          ? 'bg-emerald-100 border-emerald-500 text-emerald-950'
                          : isWrongSelected
                          ? 'bg-amber-100 border-amber-400 text-amber-950'
                          : errorStatus !== 'IDLE'
                          ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed'
                          : 'bg-white border-slate-300 text-slate-900 hover:bg-teal-50 hover:border-teal-400 active:scale-[0.99] cursor-pointer'
                      }`}
                    >
                      <span
                        className={`w-10 h-10 rounded-xl flex items-center justify-center text-base font-extrabold shrink-0 ${
                          isSuccess
                            ? 'bg-emerald-600 text-white'
                            : isWrongSelected
                            ? 'bg-amber-600 text-white'
                            : errorStatus !== 'IDLE'
                            ? 'bg-slate-200 text-slate-500'
                            : 'bg-teal-100 text-teal-900'
                        }`}
                      >
                        {opt.letter}
                      </span>
                      <span>{opt.text}</span>
                    </button>
                  );
                })}
              </div>

              {/* Wrong Answer */}
              {errorStatus === 'WRONG' && (
                <div
                  role="status"
                  aria-live="polite"
                  className="rounded-2xl bg-amber-50 border border-amber-300 p-5 text-amber-950 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-3">
                    <HelpCircle
                      className="w-6 h-6 text-amber-700 shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <div className="space-y-1">
                      <p className="font-display text-lg font-bold text-amber-950">
                        Ez az állítás valójában igaz! Keresd a tévedést!
                      </p>
                      <p className="text-base text-amber-900 leading-relaxed">
                        {currentErrorPuzzle.retryHint}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleRetryErrorPuzzle}
                    className="inline-flex items-center justify-center gap-2 min-h-[52px] px-6 py-3 rounded-2xl bg-amber-600 text-white font-display font-bold text-base hover:bg-amber-700 active:scale-[0.99] transition-all whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <RotateCcw className="w-5 h-5" aria-hidden="true" />
                    <span>Újrapróbálom</span>
                  </button>
                </div>
              )}

              {/* Correct Answer */}
              {errorStatus === 'CORRECT' && (
                <div
                  role="status"
                  aria-live="polite"
                  className="rounded-2xl bg-emerald-50 border border-emerald-300 p-5 text-emerald-950 space-y-4"
                >
                  <div className="flex items-start gap-3">
                    <SearchCheck
                      className="w-6 h-6 text-emerald-700 shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <div className="space-y-1">
                      <p className="font-display text-lg font-bold text-emerald-900">
                        {positiveTag}
                      </p>
                      <p className="text-base text-emerald-900 leading-relaxed">
                        {currentErrorPuzzle.explanation}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleNextErrorPuzzle}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 min-h-[52px] px-7 py-3 rounded-2xl bg-emerald-700 text-white font-display font-bold text-base sm:text-lg hover:bg-emerald-800 active:scale-[0.99] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 whitespace-nowrap cursor-pointer"
                  >
                    <span>
                      {errorIndex + 1 < FIND_ERROR_PUZZLES.length
                        ? 'Tovább'
                        : 'Tovább a 3. próbára'}
                    </span>
                    <ArrowRight className="w-5 h-5" aria-hidden="true" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* 3. PRÓBA – INDOKOLD MEG! */}
      {stage === 'EXPLAIN_WHY' && currentExplain && (
        <section
          aria-labelledby="station6-trial3-title"
          className="rounded-3xl border border-slate-200 bg-white shadow-sm p-6 sm:p-8 space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <p className="text-sm font-semibold text-teal-800">
                3. próba · Okos gondolkodás
              </p>
              <h2
                id="station6-trial3-title"
                className="font-display text-2xl sm:text-3xl font-bold text-slate-900"
              >
                Indokold meg!
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <span className="font-display text-base sm:text-lg font-bold text-slate-700 tabular-nums whitespace-nowrap">
                {explainIndex + 1} / {EXPLAIN_WHY_QUESTIONS.length} helyzet
              </span>
              <button
                type="button"
                onClick={onGoHome}
                className="inline-flex items-center gap-1.5 min-h-[44px] px-4 py-2 rounded-xl border border-slate-300 bg-white text-slate-800 text-sm font-semibold hover:bg-slate-50 transition-colors whitespace-nowrap cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                <span>Vissza a városba</span>
              </button>
            </div>
          </div>

          <div className="max-w-2xl mx-auto space-y-6">
            <div className="rounded-3xl border-2 border-teal-200 bg-teal-50/60 p-6 sm:p-7 space-y-2">
              <div className="inline-flex items-center gap-2 text-sm font-bold text-teal-800">
                <Lightbulb className="w-4 h-4" aria-hidden="true" />
                <span>Válaszd ki a legjobb magyarázatot!</span>
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug">
                {currentExplain.question}
              </h3>
            </div>

            <div className="space-y-3.5">
              {currentExplain.options.map((opt) => {
                const isSelected = explainChoice === opt.letter;
                const isSuccess = explainStatus === 'CORRECT' && isSelected;
                const isWrongSelected = explainStatus === 'WRONG' && isSelected;

                return (
                  <button
                    key={opt.letter}
                    type="button"
                    disabled={explainStatus !== 'IDLE'}
                    onClick={() => handleSelectExplainOption(opt.letter)}
                    className={`w-full min-h-[64px] px-5 py-3.5 rounded-2xl border-2 text-left font-display text-lg font-bold flex items-center gap-3.5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2 ${
                      isSuccess
                        ? 'bg-emerald-100 border-emerald-500 text-emerald-950'
                        : isWrongSelected
                        ? 'bg-amber-100 border-amber-400 text-amber-950'
                        : explainStatus !== 'IDLE'
                        ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed'
                        : 'bg-white border-slate-300 text-slate-900 hover:bg-teal-50 hover:border-teal-400 active:scale-[0.99] cursor-pointer'
                    }`}
                  >
                    <span
                      className={`w-10 h-10 rounded-xl flex items-center justify-center text-base font-extrabold shrink-0 ${
                        isSuccess
                          ? 'bg-emerald-600 text-white'
                          : isWrongSelected
                          ? 'bg-amber-600 text-white'
                          : explainStatus !== 'IDLE'
                          ? 'bg-slate-200 text-slate-500'
                          : 'bg-teal-100 text-teal-900'
                      }`}
                    >
                      {opt.letter}
                    </span>
                    <span>{opt.text}</span>
                  </button>
                );
              })}
            </div>

            {/* Wrong Answer */}
            {explainStatus === 'WRONG' && (
              <div
                role="status"
                aria-live="polite"
                className="rounded-2xl bg-amber-50 border border-amber-300 p-5 text-amber-950 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3">
                  <HelpCircle
                    className="w-6 h-6 text-amber-700 shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <div className="space-y-1">
                    <p className="font-display text-lg font-bold text-amber-950">
                      Ez a magyarázat nem pontos. Próbáld meg újra!
                    </p>
                    <p className="text-base text-amber-900 leading-relaxed">
                      {currentExplain.retryHint}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleRetryExplain}
                  className="inline-flex items-center justify-center gap-2 min-h-[52px] px-6 py-3 rounded-2xl bg-amber-600 text-white font-display font-bold text-base hover:bg-amber-700 active:scale-[0.99] transition-all whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <RotateCcw className="w-5 h-5" aria-hidden="true" />
                  <span>Újrapróbálom</span>
                </button>
              </div>
            )}

            {/* Correct Answer */}
            {explainStatus === 'CORRECT' && (
              <div
                role="status"
                aria-live="polite"
                className="rounded-2xl bg-emerald-50 border border-emerald-300 p-5 text-emerald-950 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3">
                  <CheckCircle2
                    className="w-6 h-6 text-emerald-700 shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <div className="space-y-1">
                    <p className="font-display text-lg font-bold text-emerald-900">
                      {positiveTag}
                    </p>
                    <p className="text-base text-emerald-900 leading-relaxed">
                      {currentExplain.explanation}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleNextExplain}
                  className="inline-flex items-center justify-center gap-2 min-h-[52px] px-7 py-3 rounded-2xl bg-emerald-700 text-white font-display font-bold text-base sm:text-lg hover:bg-emerald-800 active:scale-[0.99] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>
                    {explainIndex + 1 < EXPLAIN_WHY_QUESTIONS.length
                      ? 'Tovább'
                      : 'Állomás befejezése'}
                  </span>
                  <ArrowRight className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* COMPLETED SCREEN */}
      {stage === 'COMPLETED' && (
        <section
          aria-labelledby="station6-complete-title"
          className="rounded-3xl border border-amber-300 bg-white shadow-sm p-6 sm:p-10 text-center"
        >
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="flex items-center justify-center gap-5">
              <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-3xl overflow-hidden border border-amber-300 bg-amber-50 shadow-xs">
                <BellStarOwlImage className="w-full h-full object-cover" />
              </div>
              <div className="w-24 h-24 rounded-3xl bg-amber-100 border border-amber-300 flex items-center justify-center shrink-0">
                <Star
                  className="w-14 h-14 fill-amber-400 text-amber-500"
                  aria-hidden="true"
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 text-sm font-bold text-teal-800">
                <Award className="w-5 h-5" aria-hidden="true" />
                <span>Mindhárom próba teljesítve!</span>
              </div>

              <h2
                id="station6-complete-title"
                className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 leading-snug text-balance"
              >
                Gratulálok, kis igazságkereső! Ügyesen megkülönböztetted az igaz
                állításokat a tévedésektől, és bebizonyítottad, hogy figyelmesen
                gondolkodsz!
              </h2>

              <p className="font-display text-lg sm:text-xl font-bold text-amber-800">
                Megszerezted az Igazmondó Harangtorony csillagát!
              </p>

              {wasAlreadyCompletedOnFinish && (
                <p className="text-base text-slate-600">
                  Ezt az állomást már korábban is teljesítetted, így az
                  újrajátszás nem adott újabb csillagot, a gyűjteményedben már
                  szerepel.
                </p>
              )}
            </div>

            <div className="pt-2 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3.5">
              <button
                type="button"
                onClick={handleRestartStation}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 min-h-[52px] px-6 py-3 rounded-2xl border border-slate-300 bg-white text-slate-800 font-display font-bold text-base hover:bg-slate-50 active:scale-[0.99] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2 whitespace-nowrap cursor-pointer"
              >
                <RotateCcw
                  className="w-5 h-5 text-slate-600"
                  aria-hidden="true"
                />
                <span>Újrajátszás</span>
              </button>

              <button
                type="button"
                onClick={onGoHome}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 min-h-[52px] px-6 py-3 rounded-2xl bg-slate-900 text-white font-display font-bold text-base hover:bg-slate-800 active:scale-[0.99] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 whitespace-nowrap cursor-pointer"
              >
                <ArrowLeft className="w-5 h-5" aria-hidden="true" />
                <span>Vissza a városba</span>
              </button>

              <button
                type="button"
                onClick={onGoToNextStation}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 min-h-[52px] px-6 py-3 rounded-2xl bg-teal-700 text-white font-display font-bold text-base hover:bg-teal-800 active:scale-[0.99] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700 focus-visible:ring-offset-2 whitespace-nowrap cursor-pointer"
              >
                <span>Tovább a 7. állomásra – Milyen képesség kell hozzá?</span>
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
