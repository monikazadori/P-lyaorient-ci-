import React, { useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Award,
  CheckCircle2,
  Eye,
  HelpCircle,
  MessageCircle,
  RotateCcw,
  Search,
  Star,
} from 'lucide-react';
import { POSITIVE_FEEDBACK_MESSAGES } from '../../data/stations';
import {
  MYSTERY_POOL,
  MysteryItem,
  shuffleItems,
  SPEECH_BUBBLE_POOL,
  SpeechBubbleItem,
  WORKPLACE_MYSTERY_POOL,
  WorkplaceMystery,
} from '../../data/station3Detective';
import { playStarChime } from '../../utils/sound';
import {
  DetectiveOwlImage,
  MysteryProfessionArt,
  WorkplaceSceneArt,
} from '../illustrations/DetectiveArtwork';

type DetectiveStage = 'INTRO' | 'CLUES' | 'SPEECH' | 'WORKPLACE' | 'COMPLETED';

interface MysteryRound {
  item: MysteryItem;
  fixedOptions: string[];
}

interface SpeechRound {
  item: SpeechBubbleItem;
  options: string[];
}

interface WorkplaceRound {
  item: WorkplaceMystery;
  workplaceOptions: string[];
  professionOptions: string[];
}

interface Station3Session {
  mysteryRounds: MysteryRound[];
  speechRounds: SpeechRound[];
  workplaceRounds: WorkplaceRound[];
}

function createStation3Session(): Station3Session {
  const mysteryRounds: MysteryRound[] = shuffleItems(MYSTERY_POOL)
    .slice(0, 6)
    .map((item) => ({
      item,
      fixedOptions: shuffleItems([item.profession, ...item.distractors]),
    }));

  const speechRounds: SpeechRound[] = shuffleItems(SPEECH_BUBBLE_POOL)
    .slice(0, 5)
    .map((item) => ({
      item,
      options: shuffleItems([item.correctProfession, ...item.distractors]),
    }));

  const workplaceRounds: WorkplaceRound[] = shuffleItems(WORKPLACE_MYSTERY_POOL)
    .slice(0, 5)
    .map((item) => ({
      item,
      workplaceOptions: shuffleItems([item.workplaceName, ...item.workplaceDistractors]),
      professionOptions: shuffleItems([item.professionName, ...item.professionDistractors]),
    }));

  return {
    mysteryRounds,
    speechRounds,
    workplaceRounds,
  };
}

interface Station3DetectiveGameProps {
  isAlreadyCompleted: boolean;
  onComplete: () => void;
  onGoHome: () => void;
}

const OPTION_LETTERS = ['A', 'B', 'C', 'D'] as const;

export const Station3DetectiveGame: React.FC<Station3DetectiveGameProps> = ({
  isAlreadyCompleted,
  onComplete,
  onGoHome,
}) => {
  const [session, setSession] = useState<Station3Session>(() => createStation3Session());
  const [stage, setStage] = useState<DetectiveStage>('INTRO');
  const [wasAlreadyCompletedOnFinish, setWasAlreadyCompletedOnFinish] = useState(
    isAlreadyCompleted
  );

  // Game 1: Három titkos nyom state
  const [mysteryIndex, setMysteryIndex] = useState(0);
  const [revealedCluesCount, setRevealedCluesCount] = useState(1);
  const [wrongMysteryGuesses, setWrongMysteryGuesses] = useState<string[]>([]);
  const [hadWrongGuessInMystery, setHadWrongGuessInMystery] = useState(false);
  const [mysterySolved, setMysterySolved] = useState(false);
  const [lastEarnedPoints, setLastEarnedPoints] = useState<number>(0);
  const [detectivePoints, setDetectivePoints] = useState(0);
  const [solvedMysteriesCount, setSolvedMysteriesCount] = useState(0);
  const [mysteryHint, setMysteryHint] = useState<string | null>(null);

  // Game 2: Ki mondhatta? state
  const [speechIndex, setSpeechIndex] = useState(0);
  const [wrongSpeechGuesses, setWrongSpeechGuesses] = useState<string[]>([]);
  const [speechSolved, setSpeechSolved] = useState(false);
  const [speechHint, setSpeechHint] = useState<string | null>(null);

  // Game 3: Rejtélyes munkahelyek state
  const [workplaceIndex, setWorkplaceIndex] = useState(0);
  const [workplaceStep, setWorkplaceStep] = useState<'PLACE' | 'PERSON'>('PLACE');
  const [wrongPlaces, setWrongPlaces] = useState<string[]>([]);
  const [placeSolved, setPlaceSolved] = useState(false);
  const [placeHint, setPlaceHint] = useState<string | null>(null);
  const [wrongPersons, setWrongPersons] = useState<string[]>([]);
  const [personSolved, setPersonSolved] = useState(false);
  const [personHint, setPersonHint] = useState<string | null>(null);

  const stageStepNumber = useMemo(() => {
    switch (stage) {
      case 'INTRO':
        return 0;
      case 'CLUES':
        return 1;
      case 'SPEECH':
        return 2;
      case 'WORKPLACE':
        return 3;
      case 'COMPLETED':
        return 4;
    }
  }, [stage]);

  const handleRestartStation = () => {
    setSession(createStation3Session());
    setStage('INTRO');
    setMysteryIndex(0);
    setRevealedCluesCount(1);
    setWrongMysteryGuesses([]);
    setHadWrongGuessInMystery(false);
    setMysterySolved(false);
    setLastEarnedPoints(0);
    setDetectivePoints(0);
    setSolvedMysteriesCount(0);
    setMysteryHint(null);
    setSpeechIndex(0);
    setWrongSpeechGuesses([]);
    setSpeechSolved(false);
    setSpeechHint(null);
    setWorkplaceIndex(0);
    setWorkplaceStep('PLACE');
    setWrongPlaces([]);
    setPlaceSolved(false);
    setPlaceHint(null);
    setWrongPersons([]);
    setPersonSolved(false);
    setPersonHint(null);
  };

  // --- Game 1 Handlers ---
  const currentMystery = session.mysteryRounds[mysteryIndex];

  const handleRevealNextClue = () => {
    if (mysterySolved || revealedCluesCount >= 3) return;
    setRevealedCluesCount((prev) => Math.min(3, prev + 1));
    setMysteryHint(null);
  };

  const handleGuessMystery = (professionName: string) => {
    if (mysterySolved) return;

    if (professionName === currentMystery.item.profession) {
      const points = hadWrongGuessInMystery ? 0 : 4 - revealedCluesCount;
      setLastEarnedPoints(points);
      setDetectivePoints((prev) => prev + points);
      setSolvedMysteriesCount((prev) => prev + 1);
      setMysterySolved(true);
      setMysteryHint(null);
    } else {
      setHadWrongGuessInMystery(true);
      if (!wrongMysteryGuesses.includes(professionName)) {
        setWrongMysteryGuesses((prev) => [...prev, professionName]);
      }
      setMysteryHint(
        revealedCluesCount < 3
          ? 'Ez most még nem talált! Kérhetsz egy következő nyomot, vagy próbálj egy másik szakmát!'
          : 'Ez még nem a helyes megoldás, de semmi baj! Olvasd át újra mindhárom nyomot, és próbáld meg újra!'
      );
    }
  };

  const handleNextMystery = () => {
    if (!mysterySolved) return;
    if (mysteryIndex + 1 < session.mysteryRounds.length) {
      setMysteryIndex((prev) => prev + 1);
      setRevealedCluesCount(1);
      setWrongMysteryGuesses([]);
      setHadWrongGuessInMystery(false);
      setMysterySolved(false);
      setLastEarnedPoints(0);
      setMysteryHint(null);
    } else {
      setStage('SPEECH');
    }
  };

  // --- Game 2 Handlers ---
  const currentSpeech = session.speechRounds[speechIndex];

  const handleGuessSpeech = (professionName: string) => {
    if (speechSolved) return;

    if (professionName === currentSpeech.item.correctProfession) {
      setSpeechSolved(true);
      setSpeechHint(null);
    } else {
      if (!wrongSpeechGuesses.includes(professionName)) {
        setWrongSpeechGuesses((prev) => [...prev, professionName]);
      }
      setSpeechHint(
        'Majdnem! Olvasd el még egyszer a beszédbuborékban lévő mondatot, és próbálkozz újra!'
      );
    }
  };

  const handleNextSpeech = () => {
    if (!speechSolved) return;
    if (speechIndex + 1 < session.speechRounds.length) {
      setSpeechIndex((prev) => prev + 1);
      setWrongSpeechGuesses([]);
      setSpeechSolved(false);
      setSpeechHint(null);
    } else {
      setStage('WORKPLACE');
    }
  };

  // --- Game 3 Handlers ---
  const currentWorkplace = session.workplaceRounds[workplaceIndex];

  const handleGuessPlace = (placeName: string) => {
    if (placeSolved) return;

    if (placeName === currentWorkplace.item.workplaceName) {
      setPlaceSolved(true);
      setPlaceHint(null);
    } else {
      if (!wrongPlaces.includes(placeName)) {
        setWrongPlaces((prev) => [...prev, placeName]);
      }
      setPlaceHint(
        'Nézd meg alaposan a képen látható tárgyakat, és próbálj egy másik munkahelyet választani!'
      );
    }
  };

  const handleProceedToPerson = () => {
    if (!placeSolved) return;
    setWorkplaceStep('PERSON');
  };

  const handleGuessPerson = (personName: string) => {
    if (personSolved) return;

    if (personName === currentWorkplace.item.professionName) {
      setPersonSolved(true);
      setPersonHint(null);
    } else {
      if (!wrongPersons.includes(personName)) {
        setWrongPersons((prev) => [...prev, personName]);
      }
      setPersonHint(
        'Még nem egészen! Gondold végig, ki végzi itt a munkát ezekkel az eszközökkel, és próbáld újra!'
      );
    }
  };

  const handleNextWorkplace = () => {
    if (!personSolved) return;
    if (workplaceIndex + 1 < session.workplaceRounds.length) {
      setWorkplaceIndex((prev) => prev + 1);
      setWorkplaceStep('PLACE');
      setWrongPlaces([]);
      setPlaceSolved(false);
      setPlaceHint(null);
      setWrongPersons([]);
      setPersonSolved(false);
      setPersonHint(null);
    } else {
      setWasAlreadyCompletedOnFinish(isAlreadyCompleted);
      setStage('COMPLETED');
      onComplete();
      playStarChime();
    }
  };

  const positiveTag =
    POSITIVE_FEEDBACK_MESSAGES[
      (mysteryIndex + speechIndex + workplaceIndex) % POSITIVE_FEEDBACK_MESSAGES.length
    ];

  return (
    <div className="space-y-6">
      {/* INTRO SCREEN */}
      {stage === 'INTRO' && (
        <section
          aria-labelledby="detective-intro-title"
          className="rounded-3xl border border-emerald-200 bg-white shadow-sm p-6 sm:p-10"
        >
          <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center gap-6 sm:gap-8">
            <div className="w-44 h-44 sm:w-52 sm:h-52 rounded-3xl overflow-hidden border border-emerald-200 bg-emerald-50 shrink-0 shadow-xs">
              <DetectiveOwlImage className="w-full h-full object-cover" />
            </div>

            <div className="space-y-5 text-center md:text-left">
              <div className="inline-flex items-center gap-2 text-sm font-bold text-emerald-800">
                <Search className="w-4 h-4" aria-hidden="true" />
                <span>Detektív Iroda · Három nyomozás</span>
              </div>

              <h2
                id="detective-intro-title"
                className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight text-balance"
              >
                Foglalkozásdetektívek – A titkos szakmák nyomában
              </h2>

              <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
                „Üdvözöllek, kis detektív! A Mesterségek birodalmában különös rejtélyek várnak
                rád. Nyomokat kell gyűjtened, titkos üzeneteket megfejtened és munkahelyeket
                felismerned. Ha mindhárom nyomozást sikeresen teljesíted, megszerzed a következő
                csillagodat!”
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3.5 justify-center md:justify-start">
                <button
                  type="button"
                  onClick={() => setStage('CLUES')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 min-h-[56px] px-8 py-3.5 rounded-2xl bg-emerald-700 text-white font-display font-bold text-lg hover:bg-emerald-800 active:scale-[0.99] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 whitespace-nowrap cursor-pointer"
                >
                  <Search className="w-5 h-5" aria-hidden="true" />
                  <span>Induljon a nyomozás!</span>
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

      {/* 3-GAME STEPPER (shown during Games 1, 2, 3) */}
      {stage !== 'INTRO' && stage !== 'COMPLETED' && (
        <nav
          aria-label="A harmadik állomás három nyomozása"
          className="rounded-3xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { step: 1, title: '1. Három titkos nyom' },
              { step: 2, title: '2. Ki mondhatta?' },
              { step: 3, title: '3. Rejtélyes munkahelyek' },
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
      )}

      {/* GAME 1: HÁROM TITKOS NYOM */}
      {stage === 'CLUES' && currentMystery && (
        <section
          aria-labelledby="detective-game1-title"
          className="rounded-3xl border border-slate-200 bg-white shadow-sm p-6 sm:p-8 space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <p className="text-sm font-semibold text-emerald-800">
                1. játék · Következtetés
              </p>
              <h2
                id="detective-game1-title"
                className="font-display text-2xl sm:text-3xl font-bold text-slate-900"
              >
                Három titkos nyom
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <div className="text-sm sm:text-base font-bold text-slate-700 tabular-nums">
                <span>Detektívpontok: {detectivePoints}</span>
                <span className="mx-2 text-slate-300" aria-hidden="true">
                  ·
                </span>
                <span>
                  Megoldva: {solvedMysteriesCount} / {session.mysteryRounds.length}
                </span>
              </div>
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

          <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
            Olvasd el az első nyomot! Ha már kitaláltad a foglalkozást, válassz a négy gomb közül.
            Ha még nem vagy biztos benne, kérj egy következő nyomot!
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            {/* Left column: Clues revealed progressively (never covered by buttons) */}
            <div className="lg:col-span-6 space-y-3.5">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-lg font-bold text-slate-900">
                  {mysteryIndex + 1}. rejtély nyomai
                </h3>
                <span className="text-sm font-semibold text-slate-500 tabular-nums">
                  {revealedCluesCount} / 3 nyom felfedve
                </span>
              </div>

              <div className="space-y-3">
                {currentMystery.item.clues
                  .slice(0, revealedCluesCount)
                  .map((clueText, idx) => (
                    <div
                      key={idx}
                      className="rounded-2xl border border-amber-200 bg-amber-50/70 p-4 flex items-start gap-3"
                    >
                      <span className="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 font-display font-bold text-sm flex items-center justify-center shrink-0">
                        {idx + 1}.
                      </span>
                      <div>
                        <p className="text-xs font-bold text-amber-900">
                          {idx + 1}. nyom ({3 - idx} pont érhető el)
                        </p>
                        <p className="mt-0.5 text-base sm:text-lg font-semibold text-slate-900 leading-snug">
                          {clueText}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>

              {!mysterySolved && revealedCluesCount < 3 && (
                <button
                  type="button"
                  onClick={handleRevealNextClue}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 min-h-[52px] px-6 py-3 rounded-2xl border border-amber-400 bg-amber-100 text-slate-900 font-display font-bold text-base hover:bg-amber-200 active:scale-[0.99] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 whitespace-nowrap cursor-pointer"
                >
                  <Eye className="w-5 h-5" aria-hidden="true" />
                  <span>Következő nyom</span>
                </button>
              )}
            </div>

            {/* Right column: 4 stable answer buttons + feedback */}
            <div className="lg:col-span-6 space-y-5">
              <h3 className="font-display text-lg font-bold text-slate-900">
                Melyik foglalkozásra gondoltunk?
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {currentMystery.fixedOptions.map((optionName, idx) => {
                  const isCorrectOption = optionName === currentMystery.item.profession;
                  const isTriedWrong = wrongMysteryGuesses.includes(optionName);
                  const showAsSuccess = mysterySolved && isCorrectOption;

                  return (
                    <button
                      key={optionName}
                      type="button"
                      disabled={mysterySolved || isTriedWrong}
                      onClick={() => handleGuessMystery(optionName)}
                      className={`min-h-[60px] px-5 py-3.5 rounded-2xl border text-left font-display text-lg font-bold flex items-center gap-3 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 ${
                        showAsSuccess
                          ? 'bg-emerald-100 border-emerald-500 text-emerald-950'
                          : isTriedWrong
                          ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed'
                          : 'bg-white border-slate-300 text-slate-900 hover:bg-emerald-50 hover:border-emerald-400 active:scale-[0.99] cursor-pointer'
                      }`}
                    >
                      <span
                        className={`w-9 h-9 rounded-xl flex items-center justify-center text-base font-extrabold shrink-0 ${
                          showAsSuccess
                            ? 'bg-emerald-600 text-white'
                            : isTriedWrong
                            ? 'bg-slate-200 text-slate-500'
                            : 'bg-emerald-100 text-emerald-900'
                        }`}
                      >
                        {OPTION_LETTERS[idx]}
                      </span>
                      <span>{optionName}</span>
                    </button>
                  );
                })}
              </div>

              {mysteryHint && !mysterySolved && (
                <div
                  role="status"
                  aria-live="polite"
                  className="rounded-2xl bg-amber-50 border border-amber-300 p-4 text-amber-950 flex items-start gap-3"
                >
                  <HelpCircle
                    className="w-6 h-6 text-amber-700 shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <p className="text-base font-semibold leading-relaxed">{mysteryHint}</p>
                </div>
              )}

              {mysterySolved && (
                <div
                  role="status"
                  aria-live="polite"
                  className="rounded-2xl bg-emerald-50 border border-emerald-300 p-5 text-emerald-950 space-y-4"
                >
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                    <div className="w-24 h-24 rounded-2xl bg-white border border-emerald-200 flex items-center justify-center shrink-0">
                      <MysteryProfessionArt
                        mysteryId={currentMystery.item.id}
                        className="w-20 h-20"
                      />
                    </div>
                    <div className="space-y-1.5 text-center sm:text-left">
                      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                        <CheckCircle2
                          className="w-6 h-6 text-emerald-700 shrink-0"
                          aria-hidden="true"
                        />
                        <p className="font-display text-lg font-bold text-emerald-900">
                          {currentMystery.item.profession} · +{lastEarnedPoints} detektívpont
                        </p>
                      </div>
                      <p className="text-base text-emerald-900 leading-relaxed">
                        {currentMystery.item.funFact}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleNextMystery}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 min-h-[52px] px-7 py-3 rounded-2xl bg-emerald-700 text-white font-display font-bold text-base sm:text-lg hover:bg-emerald-800 active:scale-[0.99] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 whitespace-nowrap cursor-pointer"
                  >
                    <span>
                      {mysteryIndex + 1 < session.mysteryRounds.length
                        ? 'Következő rejtély'
                        : 'Tovább a 2. játékhoz'}
                    </span>
                    <ArrowRight className="w-5 h-5" aria-hidden="true" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* GAME 2: KI MONDHATTA? */}
      {stage === 'SPEECH' && currentSpeech && (
        <section
          aria-labelledby="detective-game2-title"
          className="rounded-3xl border border-slate-200 bg-white shadow-sm p-6 sm:p-8 space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <p className="text-sm font-semibold text-emerald-800">
                2. játék · Titkos mondatok
              </p>
              <h2
                id="detective-game2-title"
                className="font-display text-2xl sm:text-3xl font-bold text-slate-900"
              >
                Ki mondhatta?
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <span className="font-display text-base sm:text-lg font-bold text-slate-700 tabular-nums whitespace-nowrap">
                {speechIndex + 1}. / {session.speechRounds.length} mondat
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

          <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
            Olvasd el figyelmesen a beszédbuborékban lévő mondatot! Ki mondhatta ezt munka közben?
          </p>

          <div className="max-w-2xl mx-auto space-y-6">
            {/* Large Speech Bubble */}
            <div className="relative rounded-3xl border-2 border-emerald-300 bg-emerald-50/70 p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                  <MessageCircle className="w-6 h-6" aria-hidden="true" />
                </div>
                <p className="font-display text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                  {currentSpeech.item.quote}
                </p>
              </div>
            </div>

            {/* 4 Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {currentSpeech.options.map((optionName, idx) => {
                const isCorrect = optionName === currentSpeech.item.correctProfession;
                const isTriedWrong = wrongSpeechGuesses.includes(optionName);
                const showAsSuccess = speechSolved && isCorrect;

                return (
                  <button
                    key={optionName}
                    type="button"
                    disabled={speechSolved || isTriedWrong}
                    onClick={() => handleGuessSpeech(optionName)}
                    className={`min-h-[60px] px-5 py-3.5 rounded-2xl border text-left font-display text-lg font-bold flex items-center gap-3 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 ${
                      showAsSuccess
                        ? 'bg-emerald-100 border-emerald-500 text-emerald-950'
                        : isTriedWrong
                        ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed'
                        : 'bg-white border-slate-300 text-slate-900 hover:bg-emerald-50 hover:border-emerald-400 active:scale-[0.99] cursor-pointer'
                    }`}
                  >
                    <span
                      className={`w-9 h-9 rounded-xl flex items-center justify-center text-base font-extrabold shrink-0 ${
                        showAsSuccess
                          ? 'bg-emerald-600 text-white'
                          : isTriedWrong
                          ? 'bg-slate-200 text-slate-500'
                          : 'bg-emerald-100 text-emerald-900'
                      }`}
                    >
                      {OPTION_LETTERS[idx]}
                    </span>
                    <span>{optionName}</span>
                  </button>
                );
              })}
            </div>

            {speechHint && !speechSolved && (
              <div
                role="status"
                aria-live="polite"
                className="rounded-2xl bg-amber-50 border border-amber-300 p-4 text-amber-950 flex items-start gap-3"
              >
                <HelpCircle
                  className="w-6 h-6 text-amber-700 shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <p className="text-base font-semibold leading-relaxed">{speechHint}</p>
              </div>
            )}

            {speechSolved && (
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
                      {currentSpeech.item.explanation}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleNextSpeech}
                  className="inline-flex items-center justify-center gap-2 min-h-[52px] px-7 py-3 rounded-2xl bg-emerald-700 text-white font-display font-bold text-base sm:text-lg hover:bg-emerald-800 active:scale-[0.99] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>Tovább</span>
                  <ArrowRight className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* GAME 3: REJTÉLYES MUNKAHELYEK */}
      {stage === 'WORKPLACE' && currentWorkplace && (
        <section
          aria-labelledby="detective-game3-title"
          className="rounded-3xl border border-slate-200 bg-white shadow-sm p-6 sm:p-8 space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <p className="text-sm font-semibold text-emerald-800">
                3. játék · Képes nyomozás
              </p>
              <h2
                id="detective-game3-title"
                className="font-display text-2xl sm:text-3xl font-bold text-slate-900"
              >
                Rejtélyes munkahelyek
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <span className="font-display text-base sm:text-lg font-bold text-slate-700 tabular-nums whitespace-nowrap">
                {workplaceIndex + 1}. / {session.workplaceRounds.length} helyszín
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

          <p className="font-display text-xl sm:text-2xl font-bold text-slate-900">
            Hol járunk, és ki dolgozhat itt?
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            {/* Workplace Illustration (NO text labels inside image) */}
            <div className="lg:col-span-6 rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-3">
              <WorkplaceSceneArt
                workplaceId={currentWorkplace.item.id}
                className="w-full h-56 sm:h-64"
              />
              <p className="text-sm font-medium text-slate-600 text-center">
                {placeSolved
                  ? currentWorkplace.item.hintObjectsText
                  : 'Figyeld meg alaposan a képet! Milyen tárgyakat ismersz fel?'}
              </p>
            </div>

            {/* Step 1: Melyik munkahelyet látod? -> Step 2: Melyik szakember dolgozik itt? */}
            <div className="lg:col-span-6 space-y-5">
              {workplaceStep === 'PLACE' && (
                <div className="space-y-5">
                  <div>
                    <p className="text-sm font-bold text-emerald-800">
                      1. kérdés a 2-ből
                    </p>
                    <h3 className="mt-1 font-display text-xl sm:text-2xl font-bold text-slate-900">
                      Melyik munkahelyet látod?
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {currentWorkplace.workplaceOptions.map((placeName, idx) => {
                      const isCorrect =
                        placeName === currentWorkplace.item.workplaceName;
                      const isTriedWrong = wrongPlaces.includes(placeName);
                      const showAsSuccess = placeSolved && isCorrect;

                      return (
                        <button
                          key={placeName}
                          type="button"
                          disabled={placeSolved || isTriedWrong}
                          onClick={() => handleGuessPlace(placeName)}
                          className={`min-h-[60px] px-5 py-3.5 rounded-2xl border text-left font-display text-lg font-bold flex items-center gap-3 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 ${
                            showAsSuccess
                              ? 'bg-emerald-100 border-emerald-500 text-emerald-950'
                              : isTriedWrong
                              ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed'
                              : 'bg-white border-slate-300 text-slate-900 hover:bg-emerald-50 hover:border-emerald-400 active:scale-[0.99] cursor-pointer'
                          }`}
                        >
                          <span
                            className={`w-9 h-9 rounded-xl flex items-center justify-center text-base font-extrabold shrink-0 ${
                              showAsSuccess
                                ? 'bg-emerald-600 text-white'
                                : isTriedWrong
                                ? 'bg-slate-200 text-slate-500'
                                : 'bg-emerald-100 text-emerald-900'
                            }`}
                          >
                            {OPTION_LETTERS[idx]}
                          </span>
                          <span>{placeName}</span>
                        </button>
                      );
                    })}
                  </div>

                  {placeHint && !placeSolved && (
                    <div
                      role="status"
                      aria-live="polite"
                      className="rounded-2xl bg-amber-50 border border-amber-300 p-4 text-amber-950 flex items-start gap-3"
                    >
                      <HelpCircle
                        className="w-6 h-6 text-amber-700 shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <p className="text-base font-semibold leading-relaxed">
                        {placeHint}
                      </p>
                    </div>
                  )}

                  {placeSolved && (
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
                            {positiveTag} Ez valóban a {currentWorkplace.item.workplaceName}!
                          </p>
                          <p className="text-base text-emerald-900 leading-relaxed">
                            {currentWorkplace.item.hintObjectsText} Ezek mind segítenek felismerni ezt a munkahelyet.
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={handleProceedToPerson}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 min-h-[52px] px-7 py-3 rounded-2xl bg-emerald-700 text-white font-display font-bold text-base sm:text-lg hover:bg-emerald-800 active:scale-[0.99] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 whitespace-nowrap cursor-pointer"
                      >
                        <span>Tovább</span>
                        <ArrowRight className="w-5 h-5" aria-hidden="true" />
                      </button>
                    </div>
                  )}
                </div>
              )}

              {workplaceStep === 'PERSON' && (
                <div className="space-y-5">
                  <div>
                    <p className="text-sm font-bold text-emerald-800">
                      2. kérdés a 2-ből · Munkahely: {currentWorkplace.item.workplaceName}
                    </p>
                    <h3 className="mt-1 font-display text-xl sm:text-2xl font-bold text-slate-900">
                      Melyik szakember dolgozik itt?
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {currentWorkplace.professionOptions.map((personName, idx) => {
                      const isCorrect =
                        personName === currentWorkplace.item.professionName;
                      const isTriedWrong = wrongPersons.includes(personName);
                      const showAsSuccess = personSolved && isCorrect;

                      return (
                        <button
                          key={personName}
                          type="button"
                          disabled={personSolved || isTriedWrong}
                          onClick={() => handleGuessPerson(personName)}
                          className={`min-h-[60px] px-5 py-3.5 rounded-2xl border text-left font-display text-lg font-bold flex items-center gap-3 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 ${
                            showAsSuccess
                              ? 'bg-emerald-100 border-emerald-500 text-emerald-950'
                              : isTriedWrong
                              ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed'
                              : 'bg-white border-slate-300 text-slate-900 hover:bg-emerald-50 hover:border-emerald-400 active:scale-[0.99] cursor-pointer'
                          }`}
                        >
                          <span
                            className={`w-9 h-9 rounded-xl flex items-center justify-center text-base font-extrabold shrink-0 ${
                              showAsSuccess
                                ? 'bg-emerald-600 text-white'
                                : isTriedWrong
                                ? 'bg-slate-200 text-slate-500'
                                : 'bg-emerald-100 text-emerald-900'
                            }`}
                          >
                            {OPTION_LETTERS[idx]}
                          </span>
                          <span>{personName}</span>
                        </button>
                      );
                    })}
                  </div>

                  {personHint && !personSolved && (
                    <div
                      role="status"
                      aria-live="polite"
                      className="rounded-2xl bg-amber-50 border border-amber-300 p-4 text-amber-950 flex items-start gap-3"
                    >
                      <HelpCircle
                        className="w-6 h-6 text-amber-700 shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <p className="text-base font-semibold leading-relaxed">
                        {personHint}
                      </p>
                    </div>
                  )}

                  {personSolved && (
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
                            {currentWorkplace.item.explanation}
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={handleNextWorkplace}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 min-h-[52px] px-7 py-3 rounded-2xl bg-emerald-700 text-white font-display font-bold text-base sm:text-lg hover:bg-emerald-800 active:scale-[0.99] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 whitespace-nowrap cursor-pointer"
                      >
                        <span>Tovább</span>
                        <ArrowRight className="w-5 h-5" aria-hidden="true" />
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* COMPLETED SCREEN */}
      {stage === 'COMPLETED' && (
        <section
          aria-labelledby="station3-complete-title"
          className="rounded-3xl border border-amber-300 bg-white shadow-sm p-6 sm:p-10 text-center"
        >
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="flex items-center justify-center gap-5">
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl overflow-hidden border border-emerald-200 bg-emerald-50">
                <DetectiveOwlImage className="w-full h-full object-cover" />
              </div>
              <div className="w-24 h-24 rounded-3xl bg-amber-100 border border-amber-300 flex items-center justify-center">
                <Star
                  className="w-14 h-14 fill-amber-400 text-amber-500"
                  aria-hidden="true"
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 text-sm font-bold text-emerald-800">
                <Award className="w-5 h-5" aria-hidden="true" />
                <span>Összesített detektívpontok: {detectivePoints} / 18</span>
              </div>

              <h2
                id="station3-complete-title"
                className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 leading-snug text-balance"
              >
                Gratulálok, kis detektív! Minden rejtélyt megfejtettél! Igazi foglalkozásdetektív
                lettél!
              </h2>

              <p className="font-display text-lg sm:text-xl font-bold text-amber-800">
                Megszerezted a Foglalkozásdetektívek csillagát!
              </p>

              {wasAlreadyCompletedOnFinish && (
                <p className="text-base text-slate-600">
                  Ezt az állomást már korábban is teljesítetted, így az újrajátszás nem adott
                  újabb csillagot, a gyűjteményedben már szerepel.
                </p>
              )}
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <button
                type="button"
                onClick={handleRestartStation}
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
