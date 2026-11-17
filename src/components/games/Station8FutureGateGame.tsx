import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Award,
  Check,
  CheckCircle2,
  ExternalLink,
  Eye,
  KeyRound,
  Printer,
  RotateCcw,
  Sparkles,
  Star,
} from 'lucide-react';
import { POSITIVE_FEEDBACK_MESSAGES } from '../../data/stations';
import {
  DREAM_PROFESSIONS,
  DREAM_REASONS,
  DreamProfessionId,
  FINAL_QUIZ_QUESTIONS,
} from '../../data/station8FutureGate';
import { playStarChime } from '../../utils/sound';
import { DiplomaCard } from './DiplomaCard';
import {
  AnimatedGoldenGateIllustration,
  DreamProfessionArt,
  FinalQuizArt,
  GoldenGateOwlImage,
  OpenGateOwlImage,
} from '../illustrations/Station8FutureGateArt';

type Station8Stage =
  | 'INTRO'
  | 'QUIZ'
  | 'DREAM_JOB'
  | 'GATE_OPENING'
  | 'COMPLETED';

interface Station8FutureGateGameProps {
  isAlreadyCompleted: boolean;
  totalStars: number;
  onComplete: () => void;
  onGoHome: () => void;
}

export const Station8FutureGateGame: React.FC<Station8FutureGateGameProps> = ({
  isAlreadyCompleted,
  totalStars,
  onComplete,
  onGoHome,
}) => {
  const [stage, setStage] = useState<Station8Stage>('INTRO');

  // Game 1 state: 8 review questions
  const [quizIndex, setQuizIndex] = useState(0);
  const [wrongKeysForCurrent, setWrongKeysForCurrent] = useState<string[]>([]);
  const [currentSolved, setCurrentSolved] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  // Game 2 state: Dream job & reasons
  const [selectedDreamId, setSelectedDreamId] = useState<DreamProfessionId | 'custom' | null>(
    null
  );
  const [customProfession, setCustomProfession] = useState('');
  const [selectedReasons, setSelectedReasons] = useState<string[]>([]);

  // Game 3 state: Opening the Golden Gate
  const [gateOpened, setGateOpened] = useState(false);
  const [awardedInSession, setAwardedInSession] = useState(false);

  // Completion & Diploma state
  const [studentName, setStudentName] = useState('');
  const [showDiploma, setShowDiploma] = useState(true);
  const [printNotice, setPrintNotice] = useState<'none' | 'iframe-blocked' | 'unavailable'>('none');
  const [popupBlocked, setPopupBlocked] = useState(false);
  const diplomaRef = useRef<HTMLDivElement | null>(null);
  const printTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (printTimerRef.current !== null) {
        window.clearTimeout(printTimerRef.current);
      }
    };
  }, []);

  const currentQuestion = FINAL_QUIZ_QUESTIONS[quizIndex];

  const chosenProfessionLabel = useMemo(() => {
    if (!selectedDreamId) return '';
    if (selectedDreamId === 'custom') {
      return customProfession.trim();
    }
    return (
      DREAM_PROFESSIONS.find((item) => item.id === selectedDreamId)?.title ?? ''
    );
  }, [selectedDreamId, customProfession]);

  const isDreamValid = chosenProfessionLabel.length > 0;

  const handleSelectQuizOption = (optionKey: string) => {
    if (currentSolved) return;
    if (optionKey === currentQuestion.correctKey) {
      setCurrentSolved(true);
    } else if (!wrongKeysForCurrent.includes(optionKey)) {
      setWrongKeysForCurrent((prev) => [...prev, optionKey]);
    }
  };

  const handleNextQuestion = () => {
    if (quizIndex < FINAL_QUIZ_QUESTIONS.length - 1) {
      setQuizIndex((prev) => prev + 1);
      setWrongKeysForCurrent([]);
      setCurrentSolved(false);
    } else {
      setQuizFinished(true);
    }
  };

  const handleToggleReason = (reason: string) => {
    setSelectedReasons((prev) =>
      prev.includes(reason)
        ? prev.filter((item) => item !== reason)
        : [...prev, reason]
    );
  };

  const handleOpenGate = () => {
    if (gateOpened) return;
    setGateOpened(true);
    playStarChime();
    if (!awardedInSession) {
      setAwardedInSession(true);
      onComplete();
    }
  };

  const handleReplayStation8 = () => {
    setStage('INTRO');
    setQuizIndex(0);
    setWrongKeysForCurrent([]);
    setCurrentSolved(false);
    setQuizFinished(false);
    setSelectedDreamId(null);
    setCustomProfession('');
    setSelectedReasons([]);
    setGateOpened(false);
    setAwardedInSession(false);
    setShowDiploma(true);
  };

  const handleToggleDiploma = () => {
    setShowDiploma((prev) => {
      const next = !prev;
      if (next) {
        setTimeout(() => {
          diplomaRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 60);
      }
      return next;
    });
  };

  const standaloneDiplomaUrl = useMemo(() => {
    if (typeof window === 'undefined') {
      return '?oklevel-nyomtatas=1';
    }
    const params = new URLSearchParams();
    params.set('oklevel-nyomtatas', '1');
    if (studentName.trim()) {
      params.set('nev', studentName.trim());
    }
    if (chosenProfessionLabel) {
      params.set('mesterseg', chosenProfessionLabel);
    }
    params.set('csillag', String(totalStars > 0 ? totalStars : 8));
    return `${window.location.origin}${window.location.pathname}?${params.toString()}`;
  }, [studentName, chosenProfessionLabel, totalStars]);

  const handleOpenStandaloneDiploma = () => {
    setPopupBlocked(false);
    if (typeof window === 'undefined') {
      setPopupBlocked(true);
      return;
    }
    try {
      const opened = window.open(standaloneDiplomaUrl, '_blank');
      if (!opened || opened.closed || typeof opened.closed === 'undefined') {
        setPopupBlocked(true);
        return;
      }
      try {
        opened.opener = null;
      } catch {
        // Ignore read-only opener restrictions
      }
    } catch {
      setPopupBlocked(true);
    }
  };

  const handlePrintDiploma = () => {
    setPrintNotice('none');

    if (typeof window === 'undefined' || typeof window.print !== 'function') {
      setPrintNotice('unavailable');
      return;
    }

    if (printTimerRef.current !== null) {
      window.clearTimeout(printTimerRef.current);
      printTimerRef.current = null;
    }

    let beforePrintFired = false;
    const handleBeforePrint = () => {
      beforePrintFired = true;
    };
    window.addEventListener('beforeprint', handleBeforePrint, { once: true });

    let isInIframe = false;
    try {
      isInIframe = window.self !== window.top;
    } catch {
      isInIframe = true;
    }

    let threwError = false;
    try {
      window.print();
    } catch {
      threwError = true;
    }

    printTimerRef.current = window.setTimeout(() => {
      window.removeEventListener('beforeprint', handleBeforePrint);
      printTimerRef.current = null;

      if (!beforePrintFired) {
        setShowDiploma(true);
        if (isInIframe) {
          setPrintNotice('iframe-blocked');
        } else if (threwError) {
          setPrintNotice('unavailable');
        }
      }
    }, 350);
  };

  const positivePraise =
    POSITIVE_FEEDBACK_MESSAGES[quizIndex % POSITIVE_FEEDBACK_MESSAGES.length];

  if (stage === 'INTRO') {
    return (
      <section
        aria-label="8. állomás bevezető"
        className="rounded-3xl border border-amber-200 bg-white shadow-sm p-6 sm:p-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 flex flex-col items-center gap-4">
            <div className="w-full max-w-sm rounded-3xl overflow-hidden border-2 border-amber-200 bg-amber-50 shadow-xs">
              <GoldenGateOwlImage className="w-full h-auto object-cover" />
            </div>
            <div
              className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-2xl bg-amber-50 border border-amber-200"
              aria-label="Nyolc aranycsillag a Jövő Kapuja fölött"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                <Star
                  key={num}
                  className="w-5 h-5 fill-amber-400 text-amber-500"
                  aria-hidden="true"
                />
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <p className="text-sm font-bold uppercase tracking-wider text-amber-700">
                08. állomás · A Jövő Kapuja
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 text-balance">
                Álmaim mestersége
              </h2>
            </div>

            <div className="rounded-2xl bg-amber-50/90 border border-amber-200 p-5 sm:p-6">
              <p className="text-sm font-bold text-amber-900 mb-2">
                Bagoly Mester köszöntője:
              </p>
              <p className="text-base sm:text-lg text-slate-800 leading-relaxed">
                „Üdvözöllek, kis felfedező! Hosszú utat tettél meg a Mesterségek
                birodalmában. Sok foglalkozást megismertél, rejtvényeket oldottál
                meg, és felfedezted a saját erősségeidet. Most három utolsó próba
                vár rád. Ha teljesíted őket, megnyílik előtted a Jövő Kapuja!”
              </p>
            </div>

            {isAlreadyCompleted && (
              <div className="rounded-2xl bg-emerald-50 border border-emerald-200 px-4 py-3 text-sm sm:text-base font-medium text-emerald-900 flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" aria-hidden="true" />
                <span>
                  Ezt az állomást már korábban teljesítetted, de bármikor újra
                  végigjátszhatod, és kinyomtathatod az okleveledet!
                </span>
              </div>
            )}

            <div className="flex flex-col sm:flex-row flex-wrap gap-3 pt-1">
              <button
                type="button"
                onClick={() => setStage('QUIZ')}
                className="inline-flex items-center justify-center gap-2 min-h-[52px] px-6 py-3 rounded-2xl bg-amber-600 text-white font-bold text-base sm:text-lg hover:bg-amber-700 active:scale-[0.99] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 focus-visible:ring-offset-2 whitespace-nowrap cursor-pointer"
              >
                <Sparkles className="w-5 h-5 shrink-0" aria-hidden="true" />
                <span>Induljon az 1. próba!</span>
              </button>

              <button
                type="button"
                onClick={onGoHome}
                className="inline-flex items-center justify-center gap-2 min-h-[52px] px-5 py-3 rounded-2xl border border-slate-300 bg-white text-slate-800 font-semibold text-base hover:bg-slate-50 active:scale-[0.99] transition-all whitespace-nowrap cursor-pointer"
              >
                <ArrowLeft className="w-5 h-5 shrink-0" aria-hidden="true" />
                <span>Vissza a városba</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (stage === 'QUIZ') {
    return (
      <section
        aria-label="1. játék – A mesterségek nagy próbája"
        className="rounded-3xl border border-slate-200 bg-white shadow-sm p-6 sm:p-8 space-y-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <p className="text-sm font-bold text-amber-700">1 / 3. próba</p>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900">
              A mesterségek nagy próbája
            </h2>
          </div>

          <div className="text-sm font-bold text-slate-700 bg-slate-100 px-4 py-2 rounded-xl tabular-nums self-start sm:self-center">
            {quizFinished ? '8 / 8 kérdés megoldva' : `${quizIndex + 1} / 8. kérdés`}
          </div>
        </div>

        {/* Step dots */}
        <div className="grid grid-cols-8 gap-1.5" aria-hidden="true">
          {FINAL_QUIZ_QUESTIONS.map((item, idx) => {
            const done = quizFinished || idx < quizIndex || (idx === quizIndex && currentSolved);
            const active = !quizFinished && idx === quizIndex && !currentSolved;
            return (
              <div
                key={item.id}
                className={`h-2.5 rounded-full transition-colors ${
                  done
                    ? 'bg-emerald-500'
                    : active
                      ? 'bg-amber-500'
                      : 'bg-slate-200'
                }`}
              />
            );
          })}
        </div>

        {quizFinished ? (
          <div className="rounded-3xl bg-emerald-50 border border-emerald-200 p-6 sm:p-8 text-center space-y-5">
            <div className="w-16 h-16 rounded-2xl bg-white border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 className="w-9 h-9" aria-hidden="true" />
            </div>

            <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-emerald-950 text-balance">
              Nagyszerű! Sikeresen teljesítetted a mesterségek nagy próbáját!
            </h3>

            <p className="text-base sm:text-lg text-emerald-900 max-w-xl mx-auto leading-relaxed">
              Minden kérdésre megtaláltad a helyes választ! Most következik a
              második próba, ahol a saját álmaidról gondolkodhatsz.
            </p>

            <div className="pt-2 flex justify-center">
              <button
                type="button"
                onClick={() => setStage('DREAM_JOB')}
                className="inline-flex items-center justify-center gap-2 min-h-[52px] px-7 py-3 rounded-2xl bg-amber-600 text-white font-bold text-base sm:text-lg hover:bg-amber-700 active:scale-[0.99] transition-all whitespace-nowrap cursor-pointer"
              >
                <span>Tovább a 2. próbához</span>
                <ArrowRight className="w-5 h-5 shrink-0" aria-hidden="true" />
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="rounded-2xl bg-slate-50 border border-slate-200 p-5 sm:p-6 flex flex-col sm:flex-row items-center gap-5">
              <FinalQuizArt
                artId={currentQuestion.artId}
                className="w-20 h-20 shrink-0"
              />
              <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900 text-center sm:text-left leading-snug">
                {currentQuestion.question}
              </h3>
            </div>

            <div
              className={`grid gap-3.5 ${
                currentQuestion.options.length === 2
                  ? 'grid-cols-1 sm:grid-cols-2'
                  : 'grid-cols-1'
              }`}
            >
              {currentQuestion.options.map((option) => {
                const isWrong = wrongKeysForCurrent.includes(option.key);
                const isCorrectSelected =
                  currentSolved && option.key === currentQuestion.correctKey;

                return (
                  <button
                    key={option.key}
                    type="button"
                    disabled={currentSolved}
                    onClick={() => handleSelectQuizOption(option.key)}
                    className={`w-full min-h-[58px] px-5 py-3.5 rounded-2xl border-2 text-left flex items-center justify-between gap-4 transition-all cursor-pointer disabled:cursor-default ${
                      isCorrectSelected
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-950'
                        : isWrong
                          ? 'bg-orange-50 border-orange-300 text-orange-900'
                          : 'bg-white border-slate-200 text-slate-900 hover:border-amber-400 hover:bg-amber-50/40'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <span
                        className={`inline-flex items-center justify-center min-w-[36px] h-9 px-2.5 rounded-xl font-display font-bold text-base shrink-0 ${
                          isCorrectSelected
                            ? 'bg-emerald-600 text-white'
                            : isWrong
                              ? 'bg-orange-200 text-orange-900'
                              : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {option.label}
                      </span>
                      <span className="text-base sm:text-lg font-semibold leading-snug">
                        {option.text}
                      </span>
                    </div>

                    {isCorrectSelected && (
                      <CheckCircle2
                        className="w-6 h-6 text-emerald-600 shrink-0"
                        aria-hidden="true"
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {!currentSolved && wrongKeysForCurrent.length > 0 && (
              <div
                role="status"
                className="rounded-2xl bg-orange-50 border border-orange-200 p-4 text-orange-900 text-base font-medium"
              >
                <span className="font-bold">Próbáld újra! </span>
                {currentQuestion.retryHint}
              </div>
            )}

            {currentSolved && (
              <div
                role="status"
                className="rounded-2xl bg-emerald-50 border border-emerald-200 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <p className="font-display text-lg font-extrabold text-emerald-900">
                    {positivePraise}
                  </p>
                  <p className="text-base text-emerald-900 leading-relaxed">
                    {currentQuestion.explanation}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleNextQuestion}
                  className="inline-flex items-center justify-center gap-2 min-h-[52px] px-6 py-3 rounded-2xl bg-emerald-600 text-white font-bold text-base hover:bg-emerald-700 active:scale-[0.99] transition-all whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>
                    {quizIndex < FINAL_QUIZ_QUESTIONS.length - 1
                      ? 'Következő kérdés'
                      : 'Próba befejezése'}
                  </span>
                  <ArrowRight className="w-5 h-5 shrink-0" aria-hidden="true" />
                </button>
              </div>
            )}
          </div>
        )}
      </section>
    );
  }

  if (stage === 'DREAM_JOB') {
    return (
      <section
        aria-label="2. játék – Ha nagy leszek"
        className="rounded-3xl border border-slate-200 bg-white shadow-sm p-6 sm:p-8 space-y-7"
      >
        <div className="border-b border-slate-100 pb-4 space-y-2">
          <p className="text-sm font-bold text-amber-700">2 / 3. próba</p>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900">
            Ha nagy leszek…
          </h2>
          <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
            „Ha felnősz, milyen foglalkozást próbálnál ki szívesen? Válaszd ki
            azt, amelyik most a legjobban érdekel!”
          </p>
        </div>

        {/* 12 Profession Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5">
          {DREAM_PROFESSIONS.map((prof) => {
            const isSelected = selectedDreamId === prof.id;
            return (
              <button
                key={prof.id}
                type="button"
                onClick={() => setSelectedDreamId(prof.id)}
                aria-pressed={isSelected}
                className={`rounded-2xl border-2 p-4 flex flex-col items-center justify-center gap-2.5 text-center min-h-[126px] transition-all cursor-pointer ${
                  isSelected
                    ? 'border-amber-500 bg-amber-50 ring-2 ring-amber-200 shadow-xs'
                    : `${prof.accentBorder} ${prof.accentBg} hover:border-amber-400`
                }`}
              >
                <DreamProfessionArt id={prof.id} className="w-14 h-14" />
                <span className="font-display text-base font-bold text-slate-900">
                  {prof.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* 13th Option: Custom profession */}
        <div
          className={`rounded-2xl border-2 p-4 sm:p-5 transition-all ${
            selectedDreamId === 'custom'
              ? 'border-amber-500 bg-amber-50'
              : 'border-slate-200 bg-slate-50'
          }`}
        >
          <button
            type="button"
            onClick={() => setSelectedDreamId('custom')}
            aria-pressed={selectedDreamId === 'custom'}
            className="w-full flex items-center justify-between gap-3 text-left cursor-pointer min-h-[44px]"
          >
            <div className="flex items-center gap-3">
              <span
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${
                  selectedDreamId === 'custom'
                    ? 'border-amber-600 bg-amber-600 text-white'
                    : 'border-slate-400 bg-white'
                }`}
              >
                {selectedDreamId === 'custom' && (
                  <Check className="w-4 h-4" aria-hidden="true" />
                )}
              </span>
              <span className="font-display text-base sm:text-lg font-bold text-slate-900">
                Más foglalkozást választanék.
              </span>
            </div>
          </button>

          {selectedDreamId === 'custom' && (
            <div className="mt-4 pl-0 sm:pl-9">
              <label
                htmlFor="custom-profession-input"
                className="block text-sm font-semibold text-slate-700 mb-1.5"
              >
                Írd be, melyik foglalkozást próbálnád ki szívesen:
              </label>
              <input
                id="custom-profession-input"
                type="text"
                value={customProfession}
                onChange={(e) => setCustomProfession(e.target.value)}
                placeholder="Pl. űrhajós, zenész, építész, könyvtáros…"
                maxLength={50}
                className="w-full max-w-md min-h-[48px] px-4 py-2.5 rounded-xl border border-amber-300 bg-white text-slate-900 text-base font-medium focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          )}
        </div>

        {/* Multi-select reasons */}
        <div className="space-y-3.5 pt-2">
          <h3 className="font-display text-xl font-bold text-slate-900">
            Miért érdekel ez a foglalkozás?
          </h3>
          <p className="text-sm sm:text-base text-slate-600">
            Több választ is bejelölhetsz!
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {DREAM_REASONS.map((reason) => {
              const checked = selectedReasons.includes(reason);
              return (
                <button
                  key={reason}
                  type="button"
                  onClick={() => handleToggleReason(reason)}
                  aria-pressed={checked}
                  className={`min-h-[52px] px-4 py-3 rounded-2xl border-2 text-left flex items-center gap-3 transition-all cursor-pointer ${
                    checked
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-950'
                      : 'border-slate-200 bg-white text-slate-800 hover:border-slate-300'
                  }`}
                >
                  <span
                    className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center shrink-0 ${
                      checked
                        ? 'border-emerald-600 bg-emerald-600 text-white'
                        : 'border-slate-300 bg-white'
                    }`}
                  >
                    {checked && <Check className="w-4 h-4" aria-hidden="true" />}
                  </span>
                  <span className="text-base font-medium leading-snug">
                    {reason}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Personalized Future Card */}
        <div className="rounded-3xl border-2 border-amber-300 bg-gradient-to-br from-amber-50 via-yellow-50/70 to-emerald-50 p-6 space-y-3">
          <div className="flex items-center gap-2.5 text-amber-900">
            <Sparkles className="w-5 h-5 text-amber-600 shrink-0" aria-hidden="true" />
            <h3 className="font-display text-lg sm:text-xl font-extrabold">
              Személyes jövőkártya
            </h3>
          </div>

          {isDreamValid ? (
            <div className="space-y-3">
              <p className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed">
                „Ha nagy leszek, szívesen kipróbálnám ezt a foglalkozást:{' '}
                <span className="text-amber-800 underline decoration-amber-400 decoration-2 underline-offset-4">
                  {chosenProfessionLabel}
                </span>
                .”
              </p>

              {selectedReasons.length > 0 && (
                <div className="rounded-2xl bg-white/85 border border-amber-200 p-4">
                  <p className="text-sm font-bold text-slate-700 mb-2">
                    Ezért tetszik nekem:
                  </p>
                  <ul className="space-y-1 text-sm sm:text-base text-slate-800">
                    {selectedReasons.map((reason) => (
                      <li key={reason} className="flex items-start gap-2">
                        <Check
                          className="w-4 h-4 text-emerald-600 shrink-0 mt-1"
                          aria-hidden="true"
                        />
                        <span>{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <p className="text-base text-slate-700 font-medium leading-relaxed">
                „Az álmaid változhatnak, és még sok érdekes foglalkozást
                megismerhetsz!”
              </p>
            </div>
          ) : (
            <p className="text-base text-slate-700 leading-relaxed">
              {selectedDreamId === 'custom'
                ? 'Írd be feljebb a választott foglalkozás nevét, hogy elkészüljön a személyes jövőkártyád!'
                : 'Válassz egy foglalkozást a fenti kártyák közül, hogy megjelenjen a személyes jövőkártyád!'}
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
          <button
            type="button"
            onClick={() => setStage('QUIZ')}
            className="inline-flex items-center justify-center gap-2 min-h-[48px] px-5 py-3 rounded-2xl border border-slate-300 bg-white text-slate-800 font-semibold text-base hover:bg-slate-50 transition-colors whitespace-nowrap cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5 shrink-0" aria-hidden="true" />
            <span>Vissza az 1. próbához</span>
          </button>

          <button
            type="button"
            disabled={!isDreamValid}
            onClick={() => setStage('GATE_OPENING')}
            className="inline-flex items-center justify-center gap-2 min-h-[52px] px-7 py-3 rounded-2xl bg-amber-600 text-white font-bold text-base sm:text-lg hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.99] transition-all whitespace-nowrap cursor-pointer"
          >
            <span>Tovább a Jövő Kapujához</span>
            <ArrowRight className="w-5 h-5 shrink-0" aria-hidden="true" />
          </button>
        </div>
      </section>
    );
  }

  if (stage === 'GATE_OPENING') {
    return (
      <section
        aria-label="3. játék – A Jövő Kapuja megnyílik"
        className="rounded-3xl border border-amber-200 bg-white shadow-sm p-6 sm:p-10 space-y-6"
      >
        <div className="text-center space-y-2">
          <p className="text-sm font-bold text-amber-700">3 / 3. próba</p>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900">
            A Jövő Kapuja megnyílik
          </h2>
        </div>

        <AnimatedGoldenGateIllustration isOpen={gateOpened} />

        {!gateOpened ? (
          <div className="max-w-xl mx-auto text-center space-y-5">
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
              Minden próbán ügyesen túljutottál! Kattints a gombra, hogy Bagoly
              Mester segítségével kitárd a Jövő Aranykapuját és megszerezd a
              nyolcadik aranycsillagot!
            </p>

            <button
              type="button"
              onClick={handleOpenGate}
              className="inline-flex items-center justify-center gap-2.5 min-h-[56px] px-8 py-3.5 rounded-2xl bg-amber-600 text-white font-bold text-lg hover:bg-amber-700 active:scale-[0.99] transition-all shadow-sm whitespace-nowrap cursor-pointer"
            >
              <KeyRound className="w-5 h-5 shrink-0" aria-hidden="true" />
              <span>Nyisd ki a Jövő Kapuját!</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center rounded-3xl bg-amber-50 border border-amber-200 p-5 sm:p-7">
            <div className="lg:col-span-4 flex justify-center">
              <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-3xl overflow-hidden border-2 border-amber-300 bg-white shadow-xs">
                <OpenGateOwlImage className="w-full h-full object-cover" />
              </div>
            </div>

            <div className="lg:col-span-8 space-y-5">
              <div className="inline-flex items-center gap-2 text-amber-900 font-bold text-base">
                <Star className="w-5 h-5 fill-amber-400 text-amber-500" aria-hidden="true" />
                <span>Megszerezted a 8. aranycsillagot!</span>
              </div>

              <p className="text-base sm:text-lg text-slate-800 leading-relaxed font-medium">
                „Gratulálok, kis felfedező! Bejártad a Mesterségek birodalmának
                mind a nyolc állomását! Megismertél régi és mai foglalkozásokat,
                ügyesen oldottad meg a feladatokat, és felfedezted a saját
                különleges képességeidet. Ne feledd: kitartással, tanulással és
                gyakorlással sok mindenre képes lehetsz!”
              </p>

              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => setStage('COMPLETED')}
                  className="inline-flex items-center justify-center gap-2 min-h-[52px] px-7 py-3 rounded-2xl bg-emerald-600 text-white font-bold text-base sm:text-lg hover:bg-emerald-700 active:scale-[0.99] transition-all whitespace-nowrap cursor-pointer"
                >
                  <Award className="w-5 h-5 shrink-0" aria-hidden="true" />
                  <span>Tovább az oklevélhez</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    );
  }

  // COMPLETED STAGE + PRINTABLE A4 LANDSCAPE DIPLOMA
  return (
    <div className="space-y-6 print:space-y-0">
      <section
        aria-label="Küldetés teljesítve"
        className="no-print rounded-3xl border border-amber-200 bg-white shadow-sm p-6 sm:p-10 space-y-7"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-4 flex justify-center">
            <div className="w-52 h-52 sm:w-60 sm:h-60 rounded-3xl overflow-hidden border-2 border-amber-300 bg-amber-50 shadow-xs">
              <OpenGateOwlImage className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="lg:col-span-8 space-y-5 text-center lg:text-left">
            <div className="space-y-2">
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-amber-900">
                KÜLDETÉS TELJESÍTVE!
              </h2>

              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 font-display text-lg font-extrabold tabular-nums">
                <Star className="w-6 h-6 fill-amber-400 text-amber-500" aria-hidden="true" />
                <span>{totalStars} / 8 aranycsillag</span>
              </div>
            </div>

            <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
              Ügyesen teljesítetted a Jövő Kapuja próbáit! Ha szeretnéd, írd be a
              neved az alábbi mezőbe, majd tekintsd meg vagy nyomtasd ki a
              felfedezői okleveledet.
            </p>

            <div className="max-w-md mx-auto lg:mx-0 text-left">
              <label
                htmlFor="diploma-student-name"
                className="block text-sm font-bold text-slate-700 mb-1.5"
              >
                Név az oklevélre (nem kötelező):
              </label>
              <input
                id="diploma-student-name"
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="Pl. Kovács Anna"
                maxLength={45}
                className="w-full min-h-[48px] px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-base font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-1">
              <button
                type="button"
                onClick={handleToggleDiploma}
                className="inline-flex items-center justify-center gap-2 min-h-[50px] px-5 py-3 rounded-2xl bg-amber-600 text-white font-bold text-base hover:bg-amber-700 transition-colors whitespace-nowrap cursor-pointer"
              >
                <Eye className="w-5 h-5 shrink-0" aria-hidden="true" />
                <span>
                  {showDiploma ? 'Oklevél elrejtése' : 'Oklevél megtekintése'}
                </span>
              </button>

              <button
                type="button"
                onClick={handlePrintDiploma}
                className="inline-flex items-center justify-center gap-2 min-h-[50px] px-5 py-3 rounded-2xl bg-emerald-600 text-white font-bold text-base hover:bg-emerald-700 transition-colors whitespace-nowrap cursor-pointer"
              >
                <Printer className="w-5 h-5 shrink-0" aria-hidden="true" />
                <span>Oklevél nyomtatása</span>
              </button>

              <button
                type="button"
                onClick={handleOpenStandaloneDiploma}
                className="inline-flex items-center justify-center gap-2 min-h-[50px] px-5 py-3 rounded-2xl bg-amber-700 text-white font-bold text-base hover:bg-amber-800 transition-colors whitespace-nowrap cursor-pointer"
              >
                <ExternalLink className="w-5 h-5 shrink-0" aria-hidden="true" />
                <span>Oklevél megnyitása külön ablakban</span>
              </button>

              <button
                type="button"
                onClick={onGoHome}
                className="inline-flex items-center justify-center gap-2 min-h-[50px] px-5 py-3 rounded-2xl border border-slate-300 bg-white text-slate-800 font-semibold text-base hover:bg-slate-50 transition-colors whitespace-nowrap cursor-pointer"
              >
                <ArrowLeft className="w-5 h-5 shrink-0" aria-hidden="true" />
                <span>Vissza a városba</span>
              </button>

              <button
                type="button"
                onClick={handleReplayStation8}
                className="inline-flex items-center justify-center gap-2 min-h-[50px] px-5 py-3 rounded-2xl border border-amber-300 bg-amber-50 text-amber-900 font-semibold text-base hover:bg-amber-100 transition-colors whitespace-nowrap cursor-pointer"
              >
                <RotateCcw className="w-5 h-5 shrink-0" aria-hidden="true" />
                <span>Kaland újrajátszása</span>
              </button>
            </div>

            {printNotice !== 'none' && (
              <div
                role="status"
                className="rounded-2xl border-2 border-amber-300 bg-amber-50 p-4 sm:p-5 text-left space-y-3"
              >
                <div className="flex items-start gap-3">
                  <AlertCircle
                    className="w-6 h-6 text-amber-700 shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <div className="space-y-1.5">
                    <p className="font-display text-base sm:text-lg font-bold text-amber-950">
                      {printNotice === 'iframe-blocked'
                        ? 'A beágyazott előnézet blokkolja a nyomtatási ablakot'
                        : 'A nyomtatás ebben az ablakban nem indítható el'}
                    </p>
                    <p className="text-sm sm:text-base text-amber-900 leading-relaxed">
                      {printNotice === 'iframe-blocked'
                        ? 'A Google AI Studio beágyazott előnézeti ablaka biztonsági okokból nem engedélyezi a közvetlen nyomtatást. Nyisd meg az okleveledet külön ablakban az alábbi gombbal, ott azonnal nyomtatható és menthető PDF-ként!'
                        : 'Ezen az eszközön vagy böngészőben a közvetlen nyomtatás nem indult el. Nyisd meg az oklevelet külön ablakban, vagy használd a böngésző menüjében a Nyomtatás (Ctrl+P / Cmd+P) lehetőséget.'}
                    </p>
                  </div>
                </div>

                <div className="pl-0 sm:pl-9">
                  <button
                    type="button"
                    onClick={handleOpenStandaloneDiploma}
                    className="inline-flex items-center justify-center gap-2 min-h-[46px] px-5 py-2.5 rounded-xl bg-amber-700 text-white font-bold text-sm sm:text-base hover:bg-amber-800 transition-colors whitespace-nowrap cursor-pointer"
                  >
                    <ExternalLink className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>Oklevél megnyitása külön ablakban</span>
                  </button>
                </div>
              </div>
            )}

            {popupBlocked && (
              <div
                role="alert"
                className="rounded-2xl border-2 border-orange-300 bg-orange-50 p-4 sm:p-5 text-left space-y-3"
              >
                <div className="flex items-start gap-3">
                  <AlertCircle
                    className="w-6 h-6 text-orange-700 shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <div className="space-y-1.5">
                    <p className="font-display text-base sm:text-lg font-bold text-orange-950">
                      A böngésző blokkolta az új ablak megnyitását
                    </p>
                    <p className="text-sm sm:text-base text-orange-900 leading-relaxed">
                      Engedélyezd a felugró ablakokat ehhez az oldalhoz a böngésző
                      címsorában, vagy nyisd meg az oklevelet közvetlenül az alábbi
                      hivatkozással (kattints rá, vagy jobb gombbal válaszd a
                      „Megnyitás új lapon” lehetőséget):
                    </p>
                  </div>
                </div>

                <div className="pl-0 sm:pl-9">
                  <a
                    href={standaloneDiplomaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2 rounded-xl border border-orange-400 bg-white text-orange-900 font-bold text-sm sm:text-base hover:bg-orange-100 transition-colors whitespace-nowrap"
                  >
                    <ExternalLink className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>Közvetlen hivatkozás az oklevélhez</span>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Printable A4 Landscape Diploma */}
      <DiplomaCard
        studentName={studentName}
        chosenProfessionLabel={chosenProfessionLabel}
        starCount={totalStars > 0 ? totalStars : 8}
        showOnScreen={showDiploma}
        diplomaRef={diplomaRef}
      />
    </div>
  );
};
