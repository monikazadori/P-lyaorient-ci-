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
  ODD_ONE_OUT_POOL,
  OddOneOutQuestion,
  shuffleList,
  SITUATION_CHALLENGES_POOL,
  SituationChallenge,
  TOOL_HUNT_PAIRS,
  ToolHuntPair,
  ToolId,
  TOOLS_BY_ID,
} from '../../data/station2Tools';
import { POSITIVE_FEEDBACK_MESSAGES } from '../../data/stations';
import { playStarChime } from '../../utils/sound';
import { GuideOwlImage } from '../illustrations/StorybookArtwork';
import {
  SituationIllustrationArt,
  ToolIllustrationArt,
} from '../illustrations/ToolIllustrationArt';

type Station2Stage = 'TOOL_HUNT' | 'ODD_ONE_OUT' | 'SITUATIONS' | 'COMPLETED';

interface OddRound {
  item: OddOneOutQuestion;
  shuffledTools: ToolId[];
}

interface SituationRound {
  item: SituationChallenge;
  shuffledProfessions: string[];
  shuffledTools: ToolId[];
}

interface Station2Session {
  huntProfessions: ToolHuntPair[];
  huntTools: ToolHuntPair[];
  oddRounds: OddRound[];
  situationRounds: SituationRound[];
}

function createStation2Session(): Station2Session {
  const huntProfessions = shuffleList(TOOL_HUNT_PAIRS);
  let huntTools = shuffleList(TOOL_HUNT_PAIRS);
  if (huntTools.every((t, idx) => t.id === huntProfessions[idx].id)) {
    huntTools = [...huntTools.slice(1), huntTools[0]];
  }

  const oddRounds: OddRound[] = shuffleList(ODD_ONE_OUT_POOL)
    .slice(0, 5)
    .map((item) => ({
      item,
      shuffledTools: shuffleList(item.tools),
    }));

  const situationRounds: SituationRound[] = shuffleList(SITUATION_CHALLENGES_POOL)
    .slice(0, 5)
    .map((item) => ({
      item,
      shuffledProfessions: shuffleList(item.professionOptions),
      shuffledTools: shuffleList(item.toolOptions),
    }));

  return {
    huntProfessions,
    huntTools,
    oddRounds,
    situationRounds,
  };
}

interface Station2ToolsGameProps {
  isAlreadyCompleted: boolean;
  totalStarsBefore: number;
  onComplete: () => void;
  onGoHome: () => void;
}

const OPTION_LETTERS = ['A', 'B', 'C', 'D'] as const;

export const Station2ToolsGame: React.FC<Station2ToolsGameProps> = ({
  isAlreadyCompleted,
  totalStarsBefore,
  onComplete,
  onGoHome,
}) => {
  const [session, setSession] = useState<Station2Session>(() => createStation2Session());
  const [stage, setStage] = useState<Station2Stage>('TOOL_HUNT');

  // Snapshot completion context so we never state "második csillag" inaccurately
  const [completionMessage, setCompletionMessage] = useState<string>(
    'Gratulálok! Igazi szerszámszakértő lettél! Megszerezted az állomás csillagát!'
  );
  const [wasAlreadyCompletedOnFinish, setWasAlreadyCompletedOnFinish] = useState<boolean>(
    isAlreadyCompleted
  );

  // Game 1: Szerszámvadászat state
  const [selectedProfessionId, setSelectedProfessionId] = useState<string | null>(null);
  const [matchedPairIds, setMatchedPairIds] = useState<string[]>([]);
  const [huntFeedback, setHuntFeedback] = useState<{
    type: 'success' | 'retry' | 'info';
    text: string;
  } | null>(null);

  // Game 2: Keresd a kakukktojást! state
  const [oddIndex, setOddIndex] = useState(0);
  const [oddWrongToolIds, setOddWrongToolIds] = useState<ToolId[]>([]);
  const [oddSolved, setOddSolved] = useState(false);
  const [oddRetryHint, setOddRetryHint] = useState<string | null>(null);

  // Game 3: Szakmai kihívások state
  const [situationIndex, setSituationIndex] = useState(0);
  const [situationStep, setSituationStep] = useState<'PROFESSION' | 'TOOL'>('PROFESSION');
  const [wrongProfessions, setWrongProfessions] = useState<string[]>([]);
  const [professionSolved, setProfessionSolved] = useState(false);
  const [professionHint, setProfessionHint] = useState<string | null>(null);
  const [wrongTools, setWrongTools] = useState<ToolId[]>([]);
  const [toolSolved, setToolSolved] = useState(false);
  const [toolHint, setToolHint] = useState<string | null>(null);

  const stageStepNumber = useMemo(() => {
    switch (stage) {
      case 'TOOL_HUNT':
        return 1;
      case 'ODD_ONE_OUT':
        return 2;
      case 'SITUATIONS':
        return 3;
      case 'COMPLETED':
        return 4;
    }
  }, [stage]);

  const handleRestartStation = () => {
    setSession(createStation2Session());
    setStage('TOOL_HUNT');
    setSelectedProfessionId(null);
    setMatchedPairIds([]);
    setHuntFeedback(null);
    setOddIndex(0);
    setOddWrongToolIds([]);
    setOddSolved(false);
    setOddRetryHint(null);
    setSituationIndex(0);
    setSituationStep('PROFESSION');
    setWrongProfessions([]);
    setProfessionSolved(false);
    setProfessionHint(null);
    setWrongTools([]);
    setToolSolved(false);
    setToolHint(null);
  };

  // --- Game 1 Handlers ---
  const handleSelectProfession = (pairId: string) => {
    if (matchedPairIds.includes(pairId)) return;
    setSelectedProfessionId(pairId);
    setHuntFeedback(null);
  };

  const handleSelectTool = (toolPair: ToolHuntPair) => {
    if (matchedPairIds.includes(toolPair.id)) return;

    if (!selectedProfessionId) {
      setHuntFeedback({
        type: 'info',
        text: 'Először válassz ki egy foglalkozást a bal oldalon!',
      });
      return;
    }

    if (selectedProfessionId === toolPair.id) {
      const nextCount = matchedPairIds.length + 1;
      const praise =
        POSITIVE_FEEDBACK_MESSAGES[nextCount % POSITIVE_FEEDBACK_MESSAGES.length];
      setMatchedPairIds((prev) => [...prev, toolPair.id]);
      setSelectedProfessionId(null);
      setHuntFeedback({
        type: 'success',
        text: `${praise} ${toolPair.praiseNote}`,
      });
    } else {
      setSelectedProfessionId(null);
      setHuntFeedback({
        type: 'retry',
        text: 'Ez most nem sikerült. Próbáld meg újra!',
      });
    }
  };

  // --- Game 2 Handlers ---
  const currentOddRound = session.oddRounds[oddIndex];

  const handleSelectOddTool = (chosenToolId: ToolId) => {
    if (oddSolved) return;

    if (chosenToolId === currentOddRound.item.oddToolId) {
      setOddSolved(true);
      setOddRetryHint(null);
    } else {
      if (!oddWrongToolIds.includes(chosenToolId)) {
        setOddWrongToolIds((prev) => [...prev, chosenToolId]);
      }
      setOddRetryHint(
        'Ez az eszköz valóban szükséges ehhez a foglalkozáshoz! Keresd azt az egyet, amelyik nem illik ide, és próbáld meg újra!'
      );
    }
  };

  const handleNextOddRound = () => {
    if (!oddSolved) return;
    if (oddIndex + 1 < session.oddRounds.length) {
      setOddIndex((prev) => prev + 1);
      setOddWrongToolIds([]);
      setOddSolved(false);
      setOddRetryHint(null);
    } else {
      setStage('SITUATIONS');
    }
  };

  // --- Game 3 Handlers ---
  const currentSituationRound = session.situationRounds[situationIndex];

  const handleSelectSituationProfession = (chosenProfession: string) => {
    if (professionSolved) return;

    if (chosenProfession === currentSituationRound.item.correctProfession) {
      setProfessionSolved(true);
      setProfessionHint(null);
    } else {
      if (!wrongProfessions.includes(chosenProfession)) {
        setWrongProfessions((prev) => [...prev, chosenProfession]);
      }
      setProfessionHint(
        'Ez most nem sikerült. Gondold át, melyik szakember ért ehhez a munkához, és próbáld meg újra!'
      );
    }
  };

  const handleProceedToToolStep = () => {
    if (!professionSolved) return;
    setSituationStep('TOOL');
  };

  const handleSelectSituationTool = (chosenToolId: ToolId) => {
    if (toolSolved) return;

    if (chosenToolId === currentSituationRound.item.correctToolId) {
      setToolSolved(true);
      setToolHint(null);
    } else {
      if (!wrongTools.includes(chosenToolId)) {
        setWrongTools((prev) => [...prev, chosenToolId]);
      }
      setToolHint(
        'Ez most nem sikerült. Nézd meg jól a képeket, melyik szerszámmal tudja megoldani a helyzetet, és próbáld újra!'
      );
    }
  };

  const handleNextSituation = () => {
    if (!toolSolved) return;
    if (situationIndex + 1 < session.situationRounds.length) {
      setSituationIndex((prev) => prev + 1);
      setSituationStep('PROFESSION');
      setWrongProfessions([]);
      setProfessionSolved(false);
      setProfessionHint(null);
      setWrongTools([]);
      setToolSolved(false);
      setToolHint(null);
    } else {
      const alreadyDone = isAlreadyCompleted;
      setWasAlreadyCompletedOnFinish(alreadyDone);

      if (!alreadyDone && totalStarsBefore === 1) {
        setCompletionMessage(
          'Gratulálok! Igazi szerszámszakértő lettél! Megszerezted a második csillagodat!'
        );
      } else {
        setCompletionMessage(
          'Gratulálok! Igazi szerszámszakértő lettél! Megszerezted az állomás csillagát!'
        );
      }

      setStage('COMPLETED');
      onComplete();
      playStarChime();
    }
  };

  const positiveTag =
    POSITIVE_FEEDBACK_MESSAGES[
      (oddIndex + situationIndex) % POSITIVE_FEEDBACK_MESSAGES.length
    ];

  return (
    <div className="space-y-6">
      {/* Bagoly Mester Intro Box */}
      {stage !== 'COMPLETED' && (
        <section
          aria-label="Bagoly Mester köszöntője"
          className="rounded-3xl border border-sky-200 bg-sky-50/70 p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5"
        >
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border border-sky-200 bg-white shrink-0">
            <GuideOwlImage className="w-full h-full object-cover" />
          </div>
          <div className="space-y-1">
            <p className="font-display text-base sm:text-lg font-bold text-slate-900">
              Bagoly Mester üzenete
            </p>
            <p className="text-base text-slate-700 leading-relaxed">
              „Üdvözöllek a Szerszámos Házikóban! Itt különböző mesterségek eszközeivel
              ismerkedhetsz meg. Figyelj jól, mert néhány szerszám nagyon hasonlít egymásra!
              Három próbát kell teljesítened, hogy megszerezd a következő csillagodat!”
            </p>
          </div>
        </section>
      )}

      {/* 3-Game Progress Bar */}
      <nav
        aria-label="A második állomás három játéka"
        className="rounded-3xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm"
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { step: 1, title: '1. Szerszámvadászat' },
            { step: 2, title: '2. Keresd a kakukktojást!' },
            { step: 3, title: '3. Szakmai kihívások' },
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
                    ? 'bg-sky-50 border-sky-300 text-slate-900'
                    : 'bg-slate-50 border-slate-200 text-slate-500'
                }`}
              >
                <span
                  className={`w-8 h-8 rounded-xl flex items-center justify-center font-display font-bold text-sm shrink-0 ${
                    isDone
                      ? 'bg-emerald-600 text-white'
                      : isCurrent
                      ? 'bg-sky-600 text-white'
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

      {/* GAME 1: SZERSZÁMVADÁSZAT */}
      {stage === 'TOOL_HUNT' && (
        <section
          aria-labelledby="game1-title"
          className="rounded-3xl border border-slate-200 bg-white shadow-sm p-6 sm:p-8 space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <p className="text-sm font-semibold text-sky-800">
                1. játék · Eszközpárosító
              </p>
              <h2
                id="game1-title"
                className="font-display text-2xl sm:text-3xl font-bold text-slate-900"
              >
                Szerszámvadászat
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <span className="font-display text-base sm:text-lg font-bold text-slate-700 tabular-nums whitespace-nowrap">
                Teljesített feladatok: {matchedPairIds.length} / {TOOL_HUNT_PAIRS.length}
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
            Válassz ki először egy foglalkozást a bal oldalon, majd kattints vagy érints rá a
            hozzá tartozó munkaeszköz képére a jobb oldalon!
          </p>

          {huntFeedback && (
            <div
              role="status"
              aria-live="polite"
              className={`rounded-2xl border p-4 flex items-center gap-3 ${
                huntFeedback.type === 'success'
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                  : huntFeedback.type === 'retry'
                  ? 'bg-amber-50 border-amber-300 text-amber-950'
                  : 'bg-sky-50 border-sky-200 text-sky-950'
              }`}
            >
              {huntFeedback.type === 'success' ? (
                <CheckCircle2 className="w-6 h-6 text-emerald-700 shrink-0" aria-hidden="true" />
              ) : (
                <HelpCircle className="w-6 h-6 text-amber-700 shrink-0" aria-hidden="true" />
              )}
              <p className="text-base font-semibold">{huntFeedback.text}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* Left column: 8 professions */}
            <div className="space-y-3">
              <h3 className="font-display text-lg font-bold text-slate-800">
                Foglalkozások
              </h3>
              <div className="space-y-3">
                {session.huntProfessions.map((pair) => {
                  const isMatched = matchedPairIds.includes(pair.id);
                  const isSelected = selectedProfessionId === pair.id;
                  const toolName = TOOLS_BY_ID[pair.toolId].name;

                  return (
                    <button
                      key={pair.id}
                      type="button"
                      disabled={isMatched}
                      onClick={() => handleSelectProfession(pair.id)}
                      className={`w-full min-h-[76px] px-5 py-4 rounded-2xl border text-left flex items-center justify-between gap-3 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 ${
                        isMatched
                          ? 'bg-emerald-50 border-emerald-400 text-emerald-950 cursor-default'
                          : isSelected
                          ? 'bg-sky-100 border-sky-500 text-slate-950 shadow-sm cursor-pointer'
                          : 'bg-white border-slate-300 text-slate-900 hover:bg-sky-50/70 hover:border-sky-400 cursor-pointer'
                      }`}
                    >
                      <div>
                        <span className="font-display text-xl font-bold block">
                          {pair.profession}
                        </span>
                        {isMatched && (
                          <span className="text-sm font-semibold text-emerald-800">
                            Eszköze: {toolName.toLowerCase()}
                          </span>
                        )}
                      </div>

                      {isMatched ? (
                        <span className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-800 whitespace-nowrap shrink-0">
                          <CheckCircle2 className="w-5 h-5" aria-hidden="true" />
                          <span>Párosítva</span>
                        </span>
                      ) : isSelected ? (
                        <span className="text-sm font-bold text-sky-900 whitespace-nowrap shrink-0">
                          Kiválasztva
                        </span>
                      ) : null}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right column: 8 tool illustrations */}
            <div className="space-y-3">
              <h3 className="font-display text-lg font-bold text-slate-800">
                Munkaeszközök képei
              </h3>
              <div className="space-y-3">
                {session.huntTools.map((pair) => {
                  const isMatched = matchedPairIds.includes(pair.id);
                  const toolName = TOOLS_BY_ID[pair.toolId].name;

                  return (
                    <button
                      key={pair.id}
                      type="button"
                      disabled={isMatched}
                      onClick={() => handleSelectTool(pair)}
                      className={`w-full min-h-[76px] px-4 py-2.5 rounded-2xl border text-left flex items-center justify-between gap-4 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 ${
                        isMatched
                          ? 'bg-emerald-50 border-emerald-400 text-emerald-950 cursor-default'
                          : selectedProfessionId
                          ? 'bg-white border-sky-300 text-slate-900 hover:bg-sky-50 hover:border-sky-500 cursor-pointer'
                          : 'bg-white border-slate-300 text-slate-900 hover:bg-slate-50 cursor-pointer'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0">
                          <ToolIllustrationArt toolId={pair.toolId} className="w-14 h-14" />
                        </div>
                        <span className="font-display text-lg sm:text-xl font-bold">
                          {toolName}
                        </span>
                      </div>

                      {isMatched && (
                        <span className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-800 whitespace-nowrap shrink-0">
                          <CheckCircle2 className="w-5 h-5" aria-hidden="true" />
                          <span>{pair.profession}</span>
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {matchedPairIds.length === TOOL_HUNT_PAIRS.length && (
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <p className="font-display text-lg font-bold text-emerald-800">
                Mind a nyolc szerszámot sikeresen megtaláltad!
              </p>
              <button
                type="button"
                onClick={() => setStage('ODD_ONE_OUT')}
                className="inline-flex items-center justify-center gap-2 min-h-[52px] px-7 py-3 rounded-2xl bg-emerald-700 text-white font-display font-bold text-base sm:text-lg hover:bg-emerald-800 active:scale-[0.99] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 whitespace-nowrap cursor-pointer"
              >
                <span>Tovább</span>
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
          )}
        </section>
      )}

      {/* GAME 2: KERESD A KAKUKKTOJÁST! */}
      {stage === 'ODD_ONE_OUT' && currentOddRound && (
        <section
          aria-labelledby="game2-title"
          className="rounded-3xl border border-slate-200 bg-white shadow-sm p-6 sm:p-8 space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <p className="text-sm font-semibold text-sky-800">
                2. játék · Kakukktojás-kereső
              </p>
              <h2
                id="game2-title"
                className="font-display text-2xl sm:text-3xl font-bold text-slate-900"
              >
                Keresd a kakukktojást!
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <span className="font-display text-base sm:text-lg font-bold text-slate-700 tabular-nums whitespace-nowrap">
                {oddIndex + 1}. / {session.oddRounds.length} feladat · Teljesítve:{' '}
                {oddIndex + (oddSolved ? 1 : 0)}
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
            Nézd meg a megadott foglalkozást és a négy eszközt! Három eszköz ehhez a munkához
            tartozik, egy viszont nem. Kattints a kakukktojásra!
          </p>

          <div className="rounded-2xl bg-sky-50 border border-sky-200 p-4 sm:p-5 text-center">
            <p className="text-sm font-semibold text-sky-800">Foglalkozás</p>
            <p className="mt-1 font-display text-2xl sm:text-3xl font-extrabold text-slate-900">
              {currentOddRound.item.profession}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {currentOddRound.shuffledTools.map((toolId, idx) => {
              const tool = TOOLS_BY_ID[toolId];
              const isOddCorrect = toolId === currentOddRound.item.oddToolId;
              const isTriedWrong = oddWrongToolIds.includes(toolId);
              const showAsSuccess = oddSolved && isOddCorrect;

              return (
                <button
                  key={toolId}
                  type="button"
                  disabled={oddSolved || isTriedWrong}
                  onClick={() => handleSelectOddTool(toolId)}
                  className={`min-h-[168px] p-4 rounded-2xl border flex flex-col items-center justify-center gap-3 text-center transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 ${
                    showAsSuccess
                      ? 'bg-emerald-100 border-emerald-500 text-emerald-950'
                      : isTriedWrong
                      ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed'
                      : 'bg-white border-slate-300 text-slate-900 hover:bg-sky-50 hover:border-sky-400 active:scale-[0.99] cursor-pointer'
                  }`}
                >
                  <div className="w-full flex items-center justify-between">
                    <span
                      className={`w-8 h-8 rounded-lg flex items-center justify-center font-display font-bold text-sm ${
                        showAsSuccess
                          ? 'bg-emerald-600 text-white'
                          : isTriedWrong
                          ? 'bg-slate-200 text-slate-500'
                          : 'bg-sky-100 text-sky-900'
                      }`}
                    >
                      {OPTION_LETTERS[idx]}
                    </span>
                    {showAsSuccess && (
                      <CheckCircle2 className="w-6 h-6 text-emerald-700" aria-hidden="true" />
                    )}
                  </div>

                  <ToolIllustrationArt toolId={toolId} className="w-20 h-20" />

                  <span className="font-display text-lg font-bold leading-snug">
                    {tool.name}
                  </span>
                </button>
              );
            })}
          </div>

          {oddRetryHint && !oddSolved && (
            <div
              role="status"
              aria-live="polite"
              className="rounded-2xl bg-amber-50 border border-amber-300 p-4 text-amber-950 flex items-start gap-3"
            >
              <HelpCircle className="w-6 h-6 text-amber-700 shrink-0 mt-0.5" aria-hidden="true" />
              <p className="text-base font-semibold leading-relaxed">{oddRetryHint}</p>
            </div>
          )}

          {oddSolved && (
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
                    {currentOddRound.item.explanation}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleNextOddRound}
                className="inline-flex items-center justify-center gap-2 min-h-[52px] px-7 py-3 rounded-2xl bg-emerald-700 text-white font-display font-bold text-base sm:text-lg hover:bg-emerald-800 active:scale-[0.99] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>Tovább</span>
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
          )}
        </section>
      )}

      {/* GAME 3: SZAKMAI KIHÍVÁSOK */}
      {stage === 'SITUATIONS' && currentSituationRound && (
        <section
          aria-labelledby="game3-title"
          className="rounded-3xl border border-slate-200 bg-white shadow-sm p-6 sm:p-8 space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <p className="text-sm font-semibold text-sky-800">
                3. játék · Hétköznapi helyzetek
              </p>
              <h2
                id="game3-title"
                className="font-display text-2xl sm:text-3xl font-bold text-slate-900"
              >
                Szakmai kihívások
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <span className="font-display text-base sm:text-lg font-bold text-slate-700 tabular-nums whitespace-nowrap">
                {situationIndex + 1}. / {session.situationRounds.length} helyzet · Teljesítve:{' '}
                {situationIndex + (toolSolved ? 1 : 0)}
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
            Olvasd el a mindennapi helyzetet és nézd meg a képet! Először válaszd ki, ki tud
            segíteni, utána pedig azt is, melyik szerszámra lesz szüksége.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            {/* Situation Scene Card */}
            <div className="lg:col-span-5 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5 space-y-4">
              <SituationIllustrationArt
                situationId={currentSituationRound.item.id}
                className="w-full h-44 sm:h-48"
              />
              <div className="space-y-1 text-center">
                <p className="text-xs font-semibold text-slate-500">
                  {situationIndex + 1}. helyzet
                </p>
                <p className="font-display text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                  {currentSituationRound.item.situationText}
                </p>
              </div>
            </div>

            {/* Sub-question 1 OR Sub-question 2 (separate steps!) */}
            <div className="lg:col-span-7 space-y-5">
              {situationStep === 'PROFESSION' && (
                <div className="space-y-5">
                  <div>
                    <p className="text-sm font-bold text-sky-800">
                      1. kérdés a 2-ből
                    </p>
                    <h3 className="mt-1 font-display text-xl sm:text-2xl font-bold text-slate-900">
                      Melyik szakember tudna segíteni?
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {currentSituationRound.shuffledProfessions.map((profName, idx) => {
                      const isCorrect =
                        profName === currentSituationRound.item.correctProfession;
                      const isTriedWrong = wrongProfessions.includes(profName);
                      const showAsSuccess = professionSolved && isCorrect;

                      return (
                        <button
                          key={profName}
                          type="button"
                          disabled={professionSolved || isTriedWrong}
                          onClick={() => handleSelectSituationProfession(profName)}
                          className={`min-h-[60px] px-5 py-3.5 rounded-2xl border text-left font-display text-lg font-bold flex items-center gap-3 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 ${
                            showAsSuccess
                              ? 'bg-emerald-100 border-emerald-500 text-emerald-950'
                              : isTriedWrong
                              ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed'
                              : 'bg-white border-slate-300 text-slate-900 hover:bg-sky-50 hover:border-sky-400 active:scale-[0.99] cursor-pointer'
                          }`}
                        >
                          <span
                            className={`w-9 h-9 rounded-xl flex items-center justify-center text-base font-extrabold shrink-0 ${
                              showAsSuccess
                                ? 'bg-emerald-600 text-white'
                                : isTriedWrong
                                ? 'bg-slate-200 text-slate-500'
                                : 'bg-sky-100 text-sky-900'
                            }`}
                          >
                            {OPTION_LETTERS[idx]}
                          </span>
                          <span>{profName}</span>
                        </button>
                      );
                    })}
                  </div>

                  {professionHint && !professionSolved && (
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
                        {professionHint}
                      </p>
                    </div>
                  )}

                  {professionSolved && (
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
                            {currentSituationRound.item.professionExplanation}
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={handleProceedToToolStep}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 min-h-[52px] px-7 py-3 rounded-2xl bg-emerald-700 text-white font-display font-bold text-base sm:text-lg hover:bg-emerald-800 active:scale-[0.99] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 whitespace-nowrap cursor-pointer"
                      >
                        <span>Tovább</span>
                        <ArrowRight className="w-5 h-5" aria-hidden="true" />
                      </button>
                    </div>
                  )}
                </div>
              )}

              {situationStep === 'TOOL' && (
                <div className="space-y-5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <p className="text-sm font-bold text-sky-800">
                        2. kérdés a 2-ből · Segítő: {currentSituationRound.item.correctProfession}
                      </p>
                      <h3 className="mt-1 font-display text-xl sm:text-2xl font-bold text-slate-900">
                        Melyik eszközre lehet szüksége?
                      </h3>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {currentSituationRound.shuffledTools.map((toolId, idx) => {
                      const tool = TOOLS_BY_ID[toolId];
                      const isCorrect =
                        toolId === currentSituationRound.item.correctToolId;
                      const isTriedWrong = wrongTools.includes(toolId);
                      const showAsSuccess = toolSolved && isCorrect;

                      return (
                        <button
                          key={toolId}
                          type="button"
                          disabled={toolSolved || isTriedWrong}
                          onClick={() => handleSelectSituationTool(toolId)}
                          className={`min-h-[84px] px-4 py-3 rounded-2xl border text-left font-display text-lg font-bold flex items-center gap-3.5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 ${
                            showAsSuccess
                              ? 'bg-emerald-100 border-emerald-500 text-emerald-950'
                              : isTriedWrong
                              ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed'
                              : 'bg-white border-slate-300 text-slate-900 hover:bg-sky-50 hover:border-sky-400 active:scale-[0.99] cursor-pointer'
                          }`}
                        >
                          <span
                            className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-extrabold shrink-0 ${
                              showAsSuccess
                                ? 'bg-emerald-600 text-white'
                                : isTriedWrong
                                ? 'bg-slate-200 text-slate-500'
                                : 'bg-sky-100 text-sky-900'
                            }`}
                          >
                            {OPTION_LETTERS[idx]}
                          </span>
                          <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0">
                            <ToolIllustrationArt toolId={toolId} className="w-11 h-11" />
                          </div>
                          <span>{tool.name}</span>
                        </button>
                      );
                    })}
                  </div>

                  {toolHint && !toolSolved && (
                    <div
                      role="status"
                      aria-live="polite"
                      className="rounded-2xl bg-amber-50 border border-amber-300 p-4 text-amber-950 flex items-start gap-3"
                    >
                      <HelpCircle
                        className="w-6 h-6 text-amber-700 shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <p className="text-base font-semibold leading-relaxed">{toolHint}</p>
                    </div>
                  )}

                  {toolSolved && (
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
                            {currentSituationRound.item.toolExplanation}
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={handleNextSituation}
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
          aria-labelledby="station2-complete-title"
          className="rounded-3xl border border-amber-300 bg-white shadow-sm p-6 sm:p-10 text-center"
        >
          <div className="max-w-xl mx-auto space-y-6">
            <div className="flex items-center justify-center gap-4">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl overflow-hidden border border-slate-200 bg-sky-50">
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
                <span>Mind a három próba sikeresen teljesítve!</span>
              </div>

              <h2
                id="station2-complete-title"
                className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 leading-snug text-balance"
              >
                {completionMessage}
              </h2>

              {wasAlreadyCompletedOnFinish && (
                <p className="text-base text-slate-600">
                  Ezt az állomást már korábban is teljesítetted, így az újrajátszás nem adott
                  újabb csillagot, a meglévő csillagod azonban megmaradt.
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
