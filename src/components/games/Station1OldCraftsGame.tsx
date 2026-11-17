import React, { useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Award,
  CheckCircle2,
  HelpCircle,
  RotateCcw,
  Star,
} from 'lucide-react';
import {
  CraftQuizQuestion,
  OLD_CRAFTS,
  OldCraftId,
  OldCraftItem,
  QUIZ_QUESTIONS_POOL,
  shuffleArray,
} from '../../data/station1OldCrafts';
import { POSITIVE_FEEDBACK_MESSAGES } from '../../data/stations';
import { playStarChime } from '../../utils/sound';
import { CraftArtImage, CraftProductArt } from '../illustrations/CraftProductArt';
import { GuideOwlImage } from '../illustrations/StorybookArtwork';

type GameStage = 'RECOGNIZE' | 'MATCHING' | 'QUIZ' | 'COMPLETED';

interface RecognizeRound {
  craft: OldCraftItem;
  options: OldCraftItem[];
}

interface QuizRound {
  question: CraftQuizQuestion;
  shuffledOptions: string[];
}

interface SessionData {
  recognizeRounds: RecognizeRound[];
  matchingCrafts: OldCraftItem[];
  matchingProducts: OldCraftItem[];
  quizRounds: QuizRound[];
}

function createFreshSession(): SessionData {
  const recognizeCrafts = shuffleArray(OLD_CRAFTS);
  const recognizeRounds: RecognizeRound[] = recognizeCrafts.map((craft) => {
    const distractors = shuffleArray(OLD_CRAFTS.filter((c) => c.id !== craft.id)).slice(0, 3);
    const options = shuffleArray([craft, ...distractors]);
    return { craft, options };
  });

  const matchingCrafts = shuffleArray(OLD_CRAFTS);
  let matchingProducts = shuffleArray(OLD_CRAFTS);
  // Ensure the columns aren't trivially identical row-by-row
  if (matchingProducts.every((p, idx) => p.id === matchingCrafts[idx].id)) {
    matchingProducts = [...matchingProducts.slice(1), matchingProducts[0]];
  }

  const selectedQuestions = shuffleArray(QUIZ_QUESTIONS_POOL).slice(0, 5);
  const quizRounds: QuizRound[] = selectedQuestions.map((question) => ({
    question,
    shuffledOptions: shuffleArray(question.options),
  }));

  return {
    recognizeRounds,
    matchingCrafts,
    matchingProducts,
    quizRounds,
  };
}

interface Station1OldCraftsGameProps {
  isAlreadyCompleted: boolean;
  onComplete: () => void;
  onGoHome: () => void;
}

const OPTION_LETTERS = ['A', 'B', 'C', 'D'] as const;

export const Station1OldCraftsGame: React.FC<Station1OldCraftsGameProps> = ({
  isAlreadyCompleted,
  onComplete,
  onGoHome,
}) => {
  const [session, setSession] = useState<SessionData>(() => createFreshSession());
  const [stage, setStage] = useState<GameStage>('RECOGNIZE');
  const [wasCompletedBeforeSession, setWasCompletedBeforeSession] = useState<boolean>(
    isAlreadyCompleted
  );

  // Part A state
  const [recognizeIndex, setRecognizeIndex] = useState(0);
  const [recognizeWrongIds, setRecognizeWrongIds] = useState<OldCraftId[]>([]);
  const [recognizeCorrect, setRecognizeCorrect] = useState(false);
  const [recognizeHint, setRecognizeHint] = useState<string | null>(null);

  // Part B state
  const [selectedCraftId, setSelectedCraftId] = useState<OldCraftId | null>(null);
  const [matchedIds, setMatchedIds] = useState<OldCraftId[]>([]);
  const [matchingFeedback, setMatchingFeedback] = useState<{
    type: 'success' | 'retry' | 'info';
    text: string;
  } | null>(null);

  // Part C state
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizWrongOptions, setQuizWrongOptions] = useState<string[]>([]);
  const [quizCorrect, setQuizCorrect] = useState(false);
  const [quizRetryText, setQuizRetryText] = useState<string | null>(null);

  const stageStepNumber = useMemo(() => {
    switch (stage) {
      case 'RECOGNIZE':
        return 1;
      case 'MATCHING':
        return 2;
      case 'QUIZ':
        return 3;
      case 'COMPLETED':
        return 4;
    }
  }, [stage]);

  const handleRestartGame = () => {
    setSession(createFreshSession());
    setStage('RECOGNIZE');
    setWasCompletedBeforeSession(isAlreadyCompleted);
    setRecognizeIndex(0);
    setRecognizeWrongIds([]);
    setRecognizeCorrect(false);
    setRecognizeHint(null);
    setSelectedCraftId(null);
    setMatchedIds([]);
    setMatchingFeedback(null);
    setQuizIndex(0);
    setQuizWrongOptions([]);
    setQuizCorrect(false);
    setQuizRetryText(null);
  };

  // --- Part A handlers ---
  const currentRecognizeRound = session.recognizeRounds[recognizeIndex];

  const handleSelectRecognizeOption = (chosenId: OldCraftId) => {
    if (recognizeCorrect) return;

    if (chosenId === currentRecognizeRound.craft.id) {
      setRecognizeCorrect(true);
      setRecognizeHint(null);
    } else {
      if (!recognizeWrongIds.includes(chosenId)) {
        setRecognizeWrongIds((prev) => [...prev, chosenId]);
      }
      setRecognizeHint(
        'Még nem egészen! Figyeld meg a képen látható munkát és szerszámokat, majd próbáld újra!'
      );
    }
  };

  const handleNextRecognize = () => {
    if (recognizeIndex + 1 < session.recognizeRounds.length) {
      setRecognizeIndex((prev) => prev + 1);
      setRecognizeWrongIds([]);
      setRecognizeCorrect(false);
      setRecognizeHint(null);
    } else {
      setStage('MATCHING');
    }
  };

  // --- Part B handlers ---
  const handleSelectCraftForMatch = (craftId: OldCraftId) => {
    if (matchedIds.includes(craftId)) return;
    setSelectedCraftId(craftId);
    setMatchingFeedback(null);
  };

  const handleSelectProductForMatch = (productCraftId: OldCraftId) => {
    if (matchedIds.includes(productCraftId)) return;

    if (!selectedCraftId) {
      setMatchingFeedback({
        type: 'info',
        text: 'Először válassz ki egy mesterséget a bal oldali oszlopból!',
      });
      return;
    }

    if (selectedCraftId === productCraftId) {
      const matchedItem = OLD_CRAFTS.find((c) => c.id === productCraftId);
      setMatchedIds((prev) => [...prev, productCraftId]);
      setSelectedCraftId(null);
      setMatchingFeedback({
        type: 'success',
        text: matchedItem
          ? `Ügyes párosítás! ${matchedItem.pairExplanation}`
          : 'Remek párosítás!',
      });
    } else {
      setSelectedCraftId(null);
      setMatchingFeedback({
        type: 'retry',
        text: 'Ez a termék egy másik mester munkája. Válassz újra és próbáld meg még egyszer!',
      });
    }
  };

  const handleProceedToQuiz = () => {
    if (matchedIds.length === OLD_CRAFTS.length) {
      setStage('QUIZ');
    }
  };

  // --- Part C handlers ---
  const currentQuizRound = session.quizRounds[quizIndex];

  const handleSelectQuizOption = (optionText: string) => {
    if (quizCorrect) return;

    if (optionText === currentQuizRound.question.correctAnswer) {
      setQuizCorrect(true);
      setQuizRetryText(null);
    } else {
      if (!quizWrongOptions.includes(optionText)) {
        setQuizWrongOptions((prev) => [...prev, optionText]);
      }
      setQuizRetryText(
        'Ez most még nem talált, de semmi baj! Olvasd el figyelmesen a kérdést, és próbáld újra!'
      );
    }
  };

  const handleNextQuiz = () => {
    if (quizIndex + 1 < session.quizRounds.length) {
      setQuizIndex((prev) => prev + 1);
      setQuizWrongOptions([]);
      setQuizCorrect(false);
      setQuizRetryText(null);
    } else {
      setStage('COMPLETED');
      onComplete();
      playStarChime();
    }
  };

  const positiveTag =
    POSITIVE_FEEDBACK_MESSAGES[
      (recognizeIndex + quizIndex) % POSITIVE_FEEDBACK_MESSAGES.length
    ];

  return (
    <div className="space-y-6">
      {/* 3-Part Progress Indicator */}
      <nav
        aria-label="Az állomás három feladata"
        className="rounded-3xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm"
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { step: 1, title: '1. Ismerd fel a mestert!' },
            { step: 2, title: '2. Mit készített a mester?' },
            { step: 3, title: '3. Mesterségek titkai' },
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
                    ? 'bg-amber-50 border-amber-300 text-slate-900'
                    : 'bg-slate-50 border-slate-200 text-slate-500'
                }`}
              >
                <span
                  className={`w-8 h-8 rounded-xl flex items-center justify-center font-display font-bold text-sm shrink-0 ${
                    isDone
                      ? 'bg-emerald-600 text-white'
                      : isCurrent
                      ? 'bg-amber-500 text-slate-950'
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

      {/* PART A: ISMERD FEL A MESTERT! */}
      {stage === 'RECOGNIZE' && currentRecognizeRound && (
        <section
          aria-labelledby="part-a-title"
          className="rounded-3xl border border-slate-200 bg-white shadow-sm p-6 sm:p-8 space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
            <div>
              <p className="text-sm font-semibold text-amber-800">
                1. feladat · Képfelismerés
              </p>
              <h2
                id="part-a-title"
                className="font-display text-2xl sm:text-3xl font-bold text-slate-900"
              >
                Ismerd fel a mestert!
              </h2>
            </div>
            <p className="font-display text-lg font-bold text-slate-700 tabular-nums whitespace-nowrap">
              {recognizeIndex + 1} / {session.recognizeRounds.length} mester
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            {/* Illustration */}
            <div className="lg:col-span-6">
              <div className="aspect-[4/3] w-full rounded-2xl overflow-hidden border border-slate-200 bg-amber-50">
                <CraftArtImage
                  src={currentRecognizeRound.craft.imagePath}
                  alt={currentRecognizeRound.craft.imageAlt}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Question & 4 Large Buttons */}
            <div className="lg:col-span-6 space-y-5">
              <p className="font-display text-xl sm:text-2xl font-bold text-slate-900">
                Melyik mesterséget látod a képen?
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {currentRecognizeRound.options.map((option, idx) => {
                  const isCorrectOption = option.id === currentRecognizeRound.craft.id;
                  const isTriedWrong = recognizeWrongIds.includes(option.id);
                  const showAsSuccess = recognizeCorrect && isCorrectOption;

                  return (
                    <button
                      key={option.id}
                      type="button"
                      disabled={recognizeCorrect || isTriedWrong}
                      onClick={() => handleSelectRecognizeOption(option.id)}
                      className={`min-h-[60px] px-5 py-3.5 rounded-2xl border text-left font-display text-lg sm:text-xl font-bold flex items-center gap-3 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 ${
                        showAsSuccess
                          ? 'bg-emerald-100 border-emerald-500 text-emerald-950'
                          : isTriedWrong
                          ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed'
                          : 'bg-white border-slate-300 text-slate-900 hover:bg-amber-50 hover:border-amber-400 active:scale-[0.99] cursor-pointer'
                      }`}
                    >
                      <span
                        className={`w-9 h-9 rounded-xl flex items-center justify-center text-base font-extrabold shrink-0 ${
                          showAsSuccess
                            ? 'bg-emerald-600 text-white'
                            : isTriedWrong
                            ? 'bg-slate-200 text-slate-500'
                            : 'bg-amber-100 text-amber-900'
                        }`}
                      >
                        {OPTION_LETTERS[idx]}
                      </span>
                      <span>{option.name}</span>
                    </button>
                  );
                })}
              </div>

              {/* Feedback Area */}
              {recognizeHint && !recognizeCorrect && (
                <div
                  role="status"
                  aria-live="polite"
                  className="rounded-2xl bg-amber-50 border border-amber-300 p-4 text-amber-950 flex items-start gap-3"
                >
                  <HelpCircle className="w-6 h-6 text-amber-700 shrink-0 mt-0.5" aria-hidden="true" />
                  <p className="text-base font-semibold leading-relaxed">{recognizeHint}</p>
                </div>
              )}

              {recognizeCorrect && (
                <div
                  role="status"
                  aria-live="polite"
                  className="rounded-2xl bg-emerald-50 border border-emerald-300 p-4 sm:p-5 text-emerald-950 space-y-4"
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
                        {currentRecognizeRound.craft.explanation}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleNextRecognize}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 min-h-[52px] px-6 py-3 rounded-2xl bg-emerald-700 text-white font-display font-bold text-base sm:text-lg hover:bg-emerald-800 active:scale-[0.99] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 whitespace-nowrap cursor-pointer"
                  >
                    <span>
                      {recognizeIndex + 1 < session.recognizeRounds.length
                        ? 'Következő mester'
                        : 'Tovább a 2. feladatra'}
                    </span>
                    <ArrowRight className="w-5 h-5" aria-hidden="true" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* PART B: MIT KÉSZÍTETT A MESTER? */}
      {stage === 'MATCHING' && (
        <section
          aria-labelledby="part-b-title"
          className="rounded-3xl border border-slate-200 bg-white shadow-sm p-6 sm:p-8 space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
            <div>
              <p className="text-sm font-semibold text-amber-800">
                2. feladat · Képes párosító
              </p>
              <h2
                id="part-b-title"
                className="font-display text-2xl sm:text-3xl font-bold text-slate-900"
              >
                Mit készített a mester?
              </h2>
            </div>
            <p className="font-display text-lg font-bold text-slate-700 tabular-nums whitespace-nowrap">
              {matchedIds.length} / {OLD_CRAFTS.length} pár kész
            </p>
          </div>

          <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
            Először válassz ki egy mesterséget a bal oldalon, majd kattints vagy érints rá a
            hozzá tartozó termék képére a jobb oldalon!
          </p>

          {/* Feedback banner */}
          {matchingFeedback && (
            <div
              role="status"
              aria-live="polite"
              className={`rounded-2xl border p-4 flex items-center gap-3 ${
                matchingFeedback.type === 'success'
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                  : matchingFeedback.type === 'retry'
                  ? 'bg-amber-50 border-amber-300 text-amber-950'
                  : 'bg-sky-50 border-sky-200 text-sky-950'
              }`}
            >
              {matchingFeedback.type === 'success' ? (
                <CheckCircle2 className="w-6 h-6 text-emerald-700 shrink-0" aria-hidden="true" />
              ) : (
                <HelpCircle className="w-6 h-6 text-amber-700 shrink-0" aria-hidden="true" />
              )}
              <p className="text-base font-semibold">{matchingFeedback.text}</p>
            </div>
          )}

          {/* Two Columns: Crafts (left) and Product Pictures (right) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* Left Column: Craft Names */}
            <div className="space-y-3">
              <h3 className="font-display text-lg font-bold text-slate-800 pb-1">
                Mesterségek
              </h3>
              <div className="space-y-3">
                {session.matchingCrafts.map((craft) => {
                  const isMatched = matchedIds.includes(craft.id);
                  const isSelected = selectedCraftId === craft.id;

                  return (
                    <button
                      key={craft.id}
                      type="button"
                      disabled={isMatched}
                      onClick={() => handleSelectCraftForMatch(craft.id)}
                      className={`w-full min-h-[76px] px-5 py-4 rounded-2xl border text-left flex items-center justify-between gap-3 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 ${
                        isMatched
                          ? 'bg-emerald-50 border-emerald-400 text-emerald-950 cursor-default'
                          : isSelected
                          ? 'bg-amber-100 border-amber-500 text-slate-950 shadow-sm cursor-pointer'
                          : 'bg-white border-slate-300 text-slate-900 hover:bg-amber-50/70 hover:border-amber-400 cursor-pointer'
                      }`}
                    >
                      <div>
                        <span className="font-display text-xl font-bold block">
                          {craft.name}
                        </span>
                        {isMatched && (
                          <span className="text-sm font-semibold text-emerald-800">
                            Párja: {craft.productName}
                          </span>
                        )}
                      </div>

                      {isMatched ? (
                        <span className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-800 whitespace-nowrap shrink-0">
                          <CheckCircle2 className="w-5 h-5" aria-hidden="true" />
                          <span>Kész</span>
                        </span>
                      ) : isSelected ? (
                        <span className="text-sm font-bold text-amber-900 whitespace-nowrap shrink-0">
                          Kiválasztva
                        </span>
                      ) : null}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Product Images */}
            <div className="space-y-3">
              <h3 className="font-display text-lg font-bold text-slate-800 pb-1">
                Készített termékek képei
              </h3>
              <div className="space-y-3">
                {session.matchingProducts.map((productItem) => {
                  const isMatched = matchedIds.includes(productItem.id);

                  return (
                    <button
                      key={productItem.id}
                      type="button"
                      disabled={isMatched}
                      onClick={() => handleSelectProductForMatch(productItem.id)}
                      className={`w-full min-h-[76px] px-4 py-2.5 rounded-2xl border text-left flex items-center justify-between gap-4 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 ${
                        isMatched
                          ? 'bg-emerald-50 border-emerald-400 text-emerald-950 cursor-default'
                          : selectedCraftId
                          ? 'bg-white border-sky-300 text-slate-900 hover:bg-sky-50 hover:border-sky-500 cursor-pointer'
                          : 'bg-white border-slate-300 text-slate-900 hover:bg-slate-50 cursor-pointer'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0">
                          <CraftProductArt
                            craftId={productItem.id}
                            className="w-14 h-14"
                          />
                        </div>
                        <span className="font-display text-xl font-bold">
                          {productItem.productArticleName}
                        </span>
                      </div>

                      {isMatched && (
                        <span className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-800 whitespace-nowrap shrink-0">
                          <CheckCircle2 className="w-5 h-5" aria-hidden="true" />
                          <span>{productItem.name}</span>
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Complete Part B Button */}
          {matchedIds.length === OLD_CRAFTS.length && (
            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-slate-100">
              <p className="font-display text-lg font-bold text-emerald-800">
                Mind az öt mesterséget sikeresen összepárosítottad!
              </p>
              <button
                type="button"
                onClick={handleProceedToQuiz}
                className="inline-flex items-center justify-center gap-2 min-h-[52px] px-6 py-3 rounded-2xl bg-emerald-700 text-white font-display font-bold text-base sm:text-lg hover:bg-emerald-800 active:scale-[0.99] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 whitespace-nowrap cursor-pointer"
              >
                <span>Tovább a 3. feladatra</span>
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
          )}
        </section>
      )}

      {/* PART C: MESTERSÉGEK TITKAI */}
      {stage === 'QUIZ' && currentQuizRound && (
        <section
          aria-labelledby="part-c-title"
          className="rounded-3xl border border-slate-200 bg-white shadow-sm p-6 sm:p-8 space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
            <div>
              <p className="text-sm font-semibold text-amber-800">
                3. feladat · Tudáspróba
              </p>
              <h2
                id="part-c-title"
                className="font-display text-2xl sm:text-3xl font-bold text-slate-900"
              >
                Mesterségek titkai
              </h2>
            </div>
            <p className="font-display text-lg font-bold text-slate-700 tabular-nums whitespace-nowrap">
              {quizIndex + 1} / {session.quizRounds.length} kérdés
            </p>
          </div>

          <div className="max-w-2xl mx-auto space-y-6 py-2">
            <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900 leading-snug text-balance">
              {currentQuizRound.question.question}
            </h3>

            <div className="space-y-3.5">
              {currentQuizRound.shuffledOptions.map((optionText, idx) => {
                const isCorrectOption =
                  optionText === currentQuizRound.question.correctAnswer;
                const isTriedWrong = quizWrongOptions.includes(optionText);
                const showAsSuccess = quizCorrect && isCorrectOption;

                return (
                  <button
                    key={optionText}
                    type="button"
                    disabled={quizCorrect || isTriedWrong}
                    onClick={() => handleSelectQuizOption(optionText)}
                    className={`w-full min-h-[60px] px-5 py-4 rounded-2xl border text-left font-display text-lg sm:text-xl font-bold flex items-center gap-4 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 ${
                      showAsSuccess
                        ? 'bg-emerald-100 border-emerald-500 text-emerald-950'
                        : isTriedWrong
                        ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed'
                        : 'bg-white border-slate-300 text-slate-900 hover:bg-amber-50 hover:border-amber-400 active:scale-[0.99] cursor-pointer'
                    }`}
                  >
                    <span
                      className={`w-9 h-9 rounded-xl flex items-center justify-center text-base font-extrabold shrink-0 ${
                        showAsSuccess
                          ? 'bg-emerald-600 text-white'
                          : isTriedWrong
                          ? 'bg-slate-200 text-slate-500'
                          : 'bg-amber-100 text-amber-900'
                      }`}
                    >
                      {OPTION_LETTERS[idx]}
                    </span>
                    <span>{optionText}</span>
                  </button>
                );
              })}
            </div>

            {/* Retry hint */}
            {quizRetryText && !quizCorrect && (
              <div
                role="status"
                aria-live="polite"
                className="rounded-2xl bg-amber-50 border border-amber-300 p-4 text-amber-950 flex items-start gap-3"
              >
                <HelpCircle className="w-6 h-6 text-amber-700 shrink-0 mt-0.5" aria-hidden="true" />
                <p className="text-base font-semibold leading-relaxed">{quizRetryText}</p>
              </div>
            )}

            {/* Correct answer feedback */}
            {quizCorrect && (
              <div
                role="status"
                aria-live="polite"
                className="rounded-2xl bg-emerald-50 border border-emerald-300 p-5 text-emerald-950 space-y-4"
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
                      {currentQuizRound.question.explanation}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleNextQuiz}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 min-h-[52px] px-6 py-3 rounded-2xl bg-emerald-700 text-white font-display font-bold text-base sm:text-lg hover:bg-emerald-800 active:scale-[0.99] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 whitespace-nowrap cursor-pointer"
                >
                  <span>
                    {quizIndex + 1 < session.quizRounds.length
                      ? 'Következő kérdés'
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
          aria-labelledby="station1-complete-title"
          className="rounded-3xl border border-amber-300 bg-white shadow-sm p-6 sm:p-10 text-center"
        >
          <div className="max-w-xl mx-auto space-y-6">
            <div className="flex items-center justify-center gap-4">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl overflow-hidden border border-slate-200 bg-amber-50">
                <GuideOwlImage className="w-full h-full object-cover" />
              </div>
              <div className="w-20 h-20 rounded-3xl bg-amber-100 border border-amber-300 flex items-center justify-center">
                <Star
                  className="w-12 h-12 fill-amber-400 text-amber-500"
                  aria-hidden="true"
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 text-sm font-bold text-emerald-800">
                <Award className="w-5 h-5" aria-hidden="true" />
                <span>Mind a három feladat sikeresen teljesítve!</span>
              </div>

              <h2
                id="station1-complete-title"
                className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 leading-snug text-balance"
              >
                Gratulálok! Megismerted a régi mesterségeket! Megszerezted az első csillagodat!
              </h2>

              {wasCompletedBeforeSession && (
                <p className="text-base text-slate-600">
                  Ezt az állomást már korábban is sikeresen teljesítetted, így a csillagod továbbra
                  is megvan a gyűjteményedben.
                </p>
              )}
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <button
                type="button"
                onClick={handleRestartGame}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 min-h-[52px] px-6 py-3 rounded-2xl border border-slate-300 bg-white text-slate-800 font-display font-bold text-base hover:bg-slate-50 active:scale-[0.99] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2 whitespace-nowrap cursor-pointer"
              >
                <RotateCcw className="w-5 h-5 text-slate-600" aria-hidden="true" />
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
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
