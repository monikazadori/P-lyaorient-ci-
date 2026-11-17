import React, { useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Compass,
  HelpCircle,
  MapPin,
  MessageCircle,
  RotateCcw,
  Star,
  Users,
} from 'lucide-react';
import { POSITIVE_FEEDBACK_MESSAGES } from '../../data/stations';
import {
  CITIZEN_PROBLEMS_POOL,
  CitizenProblemItem,
  MAP_WORKPLACES,
  MapWorkplaceId,
  MapWorkplaceItem,
  shuffleCollection,
  WORKFLOW_SEQUENCES_POOL,
  WorkflowSequenceItem,
  WorkflowStepItem,
} from '../../data/station4Workplaces';
import { playStarChime } from '../../utils/sound';
import {
  GoldStarOwlImage,
  MapBuildingArt,
  TownMapOwlImage,
  WorkerAvatarArt,
} from '../illustrations/Station4MapAndWorkerArt';
import {
  CitizenCharacterArt,
  WorkflowStepArt,
} from '../illustrations/Station4WorkflowAndCitizenArt';

type Station4Stage =
  | 'INTRO'
  | 'MAP_FINDER'
  | 'WORKFLOW_ORDER'
  | 'CITIZEN_HELP'
  | 'COMPLETED';

interface WorkflowRound {
  item: WorkflowSequenceItem;
  shuffledSteps: WorkflowStepItem[];
}

interface CitizenRound {
  item: CitizenProblemItem;
  professionOptions: string[];
  serviceOptions: string[];
}

interface Station4Session {
  workerQueue: MapWorkplaceItem[];
  workflowRounds: WorkflowRound[];
  citizenRounds: CitizenRound[];
}

function shuffleStepsNotInOrder(
  steps: readonly WorkflowStepItem[]
): WorkflowStepItem[] {
  let candidate = shuffleCollection(steps);
  let attempts = 0;
  while (
    candidate.every((step, idx) => step.stepKey === steps[idx].stepKey) &&
    attempts < 10
  ) {
    candidate = shuffleCollection(steps);
    attempts += 1;
  }
  return candidate;
}

function createStation4Session(): Station4Session {
  const workerQueue = shuffleCollection(MAP_WORKPLACES);

  const workflowRounds: WorkflowRound[] = shuffleCollection(
    WORKFLOW_SEQUENCES_POOL
  )
    .slice(0, 5)
    .map((item) => ({
      item,
      shuffledSteps: shuffleStepsNotInOrder(item.steps),
    }));

  const citizenRounds: CitizenRound[] = shuffleCollection(CITIZEN_PROBLEMS_POOL)
    .slice(0, 6)
    .map((item) => ({
      item,
      professionOptions: shuffleCollection([
        item.correctProfession,
        ...item.professionDistractors,
      ]),
      serviceOptions: shuffleCollection([
        item.correctServiceOrPlace,
        ...item.serviceOrPlaceDistractors,
      ]),
    }));

  return {
    workerQueue,
    workflowRounds,
    citizenRounds,
  };
}

interface Station4WorkplacesGameProps {
  isAlreadyCompleted: boolean;
  onComplete: () => void;
  onGoHome: () => void;
  onGoToNextStation: () => void;
}

const SLOT_TITLES = [
  '1. Először',
  '2. Ezután',
  '3. Majd',
  '4. Végül',
] as const;

const OPTION_LETTERS = ['A', 'B', 'C', 'D'] as const;

// Deterministic layout on the town map grid (distinct from shuffled workerQueue)
const MAP_BUILDING_ORDER: MapWorkplaceId[] = [
  'iskola',
  'korhaz',
  'pekseg',
  'tuzoltosag',
  'posta',
  'etterem',
  'autoszerelo_muhely',
  'viraguzlet',
];

export const Station4WorkplacesGame: React.FC<Station4WorkplacesGameProps> = ({
  isAlreadyCompleted,
  onComplete,
  onGoHome,
  onGoToNextStation,
}) => {
  const [session, setSession] = useState<Station4Session>(() =>
    createStation4Session()
  );
  const [stage, setStage] = useState<Station4Stage>('INTRO');
  const [wasAlreadyCompletedOnFinish, setWasAlreadyCompletedOnFinish] =
    useState(isAlreadyCompleted);

  // Game 1: Munkahelykereső state
  const [placedBuildingIds, setPlacedBuildingIds] = useState<MapWorkplaceId[]>(
    []
  );
  const [workerQueueIndex, setWorkerQueueIndex] = useState(0);
  const [mapFeedback, setMapFeedback] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  // Game 2: Egy nap a munkahelyen state
  const [workflowIndex, setWorkflowIndex] = useState(0);
  const [workflowSlots, setWorkflowSlots] = useState<
    (WorkflowStepItem | null)[]
  >([null, null, null, null]);
  const [workflowError, setWorkflowError] = useState<string | null>(null);
  const [workflowSolved, setWorkflowSolved] = useState(false);

  // Game 3: Segítségre van szükség! state
  const [citizenIndex, setCitizenIndex] = useState(0);
  const [citizenStep, setCitizenStep] = useState<'PROFESSION' | 'SERVICE'>(
    'PROFESSION'
  );
  const [wrongProfessions, setWrongProfessions] = useState<string[]>([]);
  const [professionSolved, setProfessionSolved] = useState(false);
  const [professionHint, setProfessionHint] = useState<string | null>(null);
  const [wrongServices, setWrongServices] = useState<string[]>([]);
  const [serviceSolved, setServiceSolved] = useState(false);
  const [serviceHint, setServiceHint] = useState<string | null>(null);
  const [solvedCitizensCount, setSolvedCitizensCount] = useState(0);

  const stageStepNumber = useMemo(() => {
    switch (stage) {
      case 'INTRO':
        return 0;
      case 'MAP_FINDER':
        return 1;
      case 'WORKFLOW_ORDER':
        return 2;
      case 'CITIZEN_HELP':
        return 3;
      case 'COMPLETED':
        return 4;
    }
  }, [stage]);

  const mapWorkplacesById = useMemo(() => {
    const map = new Map<MapWorkplaceId, MapWorkplaceItem>();
    MAP_WORKPLACES.forEach((item) => map.set(item.id, item));
    return map;
  }, []);

  const handleRestartStation = () => {
    setSession(createStation4Session());
    setStage('INTRO');
    setPlacedBuildingIds([]);
    setWorkerQueueIndex(0);
    setMapFeedback(null);
    setWorkflowIndex(0);
    setWorkflowSlots([null, null, null, null]);
    setWorkflowError(null);
    setWorkflowSolved(false);
    setCitizenIndex(0);
    setCitizenStep('PROFESSION');
    setWrongProfessions([]);
    setProfessionSolved(false);
    setProfessionHint(null);
    setWrongServices([]);
    setServiceSolved(false);
    setServiceHint(null);
    setSolvedCitizensCount(0);
  };

  // --- Game 1 Handlers ---
  const isMapGameComplete = placedBuildingIds.length === MAP_WORKPLACES.length;
  const currentWorker = !isMapGameComplete
    ? session.workerQueue[workerQueueIndex]
    : null;

  const handleSelectBuilding = (buildingId: MapWorkplaceId) => {
    if (isMapGameComplete || !currentWorker) return;
    if (placedBuildingIds.includes(buildingId)) return;

    if (buildingId === currentWorker.id) {
      const nextPlaced = [...placedBuildingIds, buildingId];
      setPlacedBuildingIds(nextPlaced);
      setMapFeedback({
        type: 'success',
        text: currentWorker.successMessage,
      });
      if (nextPlaced.length < session.workerQueue.length) {
        setWorkerQueueIndex((prev) => prev + 1);
      }
    } else {
      setMapFeedback({
        type: 'error',
        text: 'Ez nem az ő munkahelye. Nézd meg újra az épületeket!',
      });
    }
  };

  // --- Game 2 Handlers ---
  const currentWorkflow = session.workflowRounds[workflowIndex];

  const availableSteps = useMemo(() => {
    if (!currentWorkflow) return [];
    const placedKeys = new Set(
      workflowSlots
        .filter((s): s is WorkflowStepItem => s !== null)
        .map((s) => s.stepKey)
    );
    return currentWorkflow.shuffledSteps.filter(
      (step) => !placedKeys.has(step.stepKey)
    );
  }, [currentWorkflow, workflowSlots]);

  const allSlotsFilled = workflowSlots.every((slot) => slot !== null);

  const handlePlaceStep = (step: WorkflowStepItem) => {
    if (workflowSolved) return;
    const firstEmptyIdx = workflowSlots.findIndex((s) => s === null);
    if (firstEmptyIdx === -1) return;

    setWorkflowSlots((prev) => {
      const next = [...prev];
      next[firstEmptyIdx] = step;
      return next;
    });
    setWorkflowError(null);
  };

  const handleRemoveSlotStep = (slotIdx: number) => {
    if (workflowSolved || workflowSlots[slotIdx] === null) return;
    setWorkflowSlots((prev) => {
      const next = [...prev];
      next[slotIdx] = null;
      return next;
    });
    setWorkflowError(null);
  };

  const handleResetSlots = () => {
    if (workflowSolved) return;
    setWorkflowSlots([null, null, null, null]);
    setWorkflowError(null);
  };

  const handleCheckWorkflow = () => {
    if (!currentWorkflow || !allSlotsFilled || workflowSolved) return;

    const isExactMatch = currentWorkflow.item.steps.every(
      (expectedStep, idx) => workflowSlots[idx]?.stepKey === expectedStep.stepKey
    );

    if (isExactMatch) {
      setWorkflowSolved(true);
      setWorkflowError(null);
    } else {
      setWorkflowError(
        'Majdnem jó! Nézd meg figyelmesen, mi történik először és mi csak utána. Kattints egy elhelyezett kártyára a kivételhez, vagy állítsd vissza őket!'
      );
    }
  };

  const handleNextWorkflow = () => {
    if (!workflowSolved) return;
    if (workflowIndex + 1 < session.workflowRounds.length) {
      setWorkflowIndex((prev) => prev + 1);
      setWorkflowSlots([null, null, null, null]);
      setWorkflowError(null);
      setWorkflowSolved(false);
    } else {
      setStage('CITIZEN_HELP');
    }
  };

  // --- Game 3 Handlers ---
  const currentCitizen = session.citizenRounds[citizenIndex];

  const handleGuessProfession = (professionName: string) => {
    if (!currentCitizen || professionSolved) return;

    if (professionName === currentCitizen.item.correctProfession) {
      setProfessionSolved(true);
      setProfessionHint(null);
    } else {
      if (!wrongProfessions.includes(professionName)) {
        setWrongProfessions((prev) => [...prev, professionName]);
      }
      setProfessionHint(
        'Gondold át még egyszer, ki ért ehhez a problémához a legjobban, és próbáld újra!'
      );
    }
  };

  const handleProceedToServiceStep = () => {
    if (!professionSolved) return;
    setCitizenStep('SERVICE');
  };

  const handleGuessService = (serviceName: string) => {
    if (!currentCitizen || serviceSolved) return;

    if (serviceName === currentCitizen.item.correctServiceOrPlace) {
      setServiceSolved(true);
      setServiceHint(null);
      setSolvedCitizensCount((prev) => prev + 1);
    } else {
      if (!wrongServices.includes(serviceName)) {
        setWrongServices((prev) => [...prev, serviceName]);
      }
      setServiceHint(
        'Még nem ez az igazi helyszín vagy szolgáltatás. Nézd meg újra a lehetőségeket!'
      );
    }
  };

  const handleNextCitizen = () => {
    if (!serviceSolved) return;
    if (citizenIndex + 1 < session.citizenRounds.length) {
      setCitizenIndex((prev) => prev + 1);
      setCitizenStep('PROFESSION');
      setWrongProfessions([]);
      setProfessionSolved(false);
      setProfessionHint(null);
      setWrongServices([]);
      setServiceSolved(false);
      setServiceHint(null);
    } else {
      setWasAlreadyCompletedOnFinish(isAlreadyCompleted);
      setStage('COMPLETED');
      onComplete();
      playStarChime();
    }
  };

  const positiveTag =
    POSITIVE_FEEDBACK_MESSAGES[
      (placedBuildingIds.length + workflowIndex + citizenIndex) %
        POSITIVE_FEEDBACK_MESSAGES.length
    ];

  return (
    <div className="space-y-6">
      {/* INTRO SCREEN */}
      {stage === 'INTRO' && (
        <section
          aria-labelledby="station4-intro-title"
          className="rounded-3xl border border-rose-200 bg-white shadow-sm p-6 sm:p-10"
        >
          <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center gap-6 sm:gap-8">
            <div className="w-44 h-44 sm:w-52 sm:h-52 rounded-3xl overflow-hidden border border-rose-200 bg-rose-50 shrink-0 shadow-xs">
              <TownMapOwlImage className="w-full h-full object-cover" />
            </div>

            <div className="space-y-5 text-center md:text-left">
              <div className="inline-flex items-center gap-2 text-sm font-bold text-rose-800">
                <MapPin className="w-4 h-4" aria-hidden="true" />
                <span>Városi Munkahelyek Háza · Három feladat</span>
              </div>

              <h2
                id="station4-intro-title"
                className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight text-balance"
              >
                Ki hol dolgozik? – A város munkába indul!
              </h2>

              <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
                „Üdvözöllek a városi téren! Itt minden reggel nyüzsög az élet. A
                szakemberek elindulnak a munkahelyükre, a boltok kinyitnak, és a
                város lakói segítségért fordulnak hozzájuk. Segíts elhelyezni a
                szakembereket, állítsd sorrendbe a munkanap lépéseit, és
                támogasd a városlakókat!”
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3.5 justify-center md:justify-start">
                <button
                  type="button"
                  onClick={() => setStage('MAP_FINDER')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 min-h-[56px] px-8 py-3.5 rounded-2xl bg-rose-700 text-white font-display font-bold text-lg hover:bg-rose-800 active:scale-[0.99] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-700 focus-visible:ring-offset-2 whitespace-nowrap cursor-pointer"
                >
                  <Compass className="w-5 h-5" aria-hidden="true" />
                  <span>Induljon a városi kaland!</span>
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

      {/* 3-GAME STEPPER */}
      {stage !== 'INTRO' && stage !== 'COMPLETED' && (
        <nav
          aria-label="A negyedik állomás három játéka"
          className="rounded-3xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { step: 1, title: '1. Munkahelykereső' },
              { step: 2, title: '2. Egy nap a munkahelyen' },
              { step: 3, title: '3. Segítségre van szükség!' },
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
                      ? 'bg-rose-50 border-rose-300 text-slate-900'
                      : 'bg-slate-50 border-slate-200 text-slate-500'
                  }`}
                >
                  <span
                    className={`w-8 h-8 rounded-xl flex items-center justify-center font-display font-bold text-sm shrink-0 ${
                      isDone
                        ? 'bg-emerald-600 text-white'
                        : isCurrent
                        ? 'bg-rose-600 text-white'
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

      {/* GAME 1: MUNKAHELYKERESŐ */}
      {stage === 'MAP_FINDER' && (
        <section
          aria-labelledby="station4-game1-title"
          className="rounded-3xl border border-slate-200 bg-white shadow-sm p-6 sm:p-8 space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <p className="text-sm font-semibold text-rose-800">
                1. játék · Várostérkép
              </p>
              <h2
                id="station4-game1-title"
                className="font-display text-2xl sm:text-3xl font-bold text-slate-900"
              >
                Munkahelykereső
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <span className="font-display text-base sm:text-lg font-bold text-slate-700 tabular-nums whitespace-nowrap">
                Elhelyezve: {placedBuildingIds.length} / {MAP_WORKPLACES.length}{' '}
                szakember
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

          {/* Active Worker Prompt OR Completion Banner */}
          {!isMapGameComplete && currentWorker ? (
            <div className="rounded-2xl border-2 border-rose-200 bg-rose-50/70 p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-4">
              <div className="w-20 h-20 rounded-2xl bg-white border border-rose-200 flex items-center justify-center shrink-0 shadow-xs">
                <WorkerAvatarArt
                  workplaceId={currentWorker.id}
                  className="w-16 h-16"
                />
              </div>
              <div className="text-center sm:text-left space-y-1">
                <p className="text-sm font-bold text-rose-800">
                  Soron következő szakember · {currentWorker.workerTitle}
                </p>
                <p className="font-display text-xl sm:text-2xl font-extrabold text-slate-900">
                  {currentWorker.workerPrompt}
                </p>
                <p className="text-sm sm:text-base text-slate-600">
                  Kattints vagy koppints arra az épületre a térképen, ahol ő
                  dolgozik!
                </p>
              </div>
            </div>
          ) : (
            <div
              role="status"
              aria-live="polite"
              className="rounded-2xl border-2 border-emerald-300 bg-emerald-50 p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-3">
                <CheckCircle2
                  className="w-7 h-7 text-emerald-700 shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <div className="space-y-1">
                  <p className="font-display text-xl font-extrabold text-emerald-950">
                    Ügyes vagy! Minden szakember megtalálta a munkahelyét!
                  </p>
                  <p className="text-base text-emerald-900">
                    Mind a 8 szakember biztonságban megérkezett a munkahelyére.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setStage('WORKFLOW_ORDER')}
                className="inline-flex items-center justify-center gap-2 min-h-[52px] px-7 py-3 rounded-2xl bg-emerald-700 text-white font-display font-bold text-base sm:text-lg hover:bg-emerald-800 active:scale-[0.99] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>Tovább a 2. játékra</span>
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
          )}

          {/* Feedback Message */}
          {mapFeedback && !isMapGameComplete && (
            <div
              role="status"
              aria-live="polite"
              className={`rounded-2xl border p-4 flex items-start gap-3 ${
                mapFeedback.type === 'success'
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                  : 'bg-amber-50 border-amber-300 text-amber-950'
              }`}
            >
              {mapFeedback.type === 'success' ? (
                <CheckCircle2
                  className="w-6 h-6 text-emerald-700 shrink-0 mt-0.5"
                  aria-hidden="true"
                />
              ) : (
                <HelpCircle
                  className="w-6 h-6 text-amber-700 shrink-0 mt-0.5"
                  aria-hidden="true"
                />
              )}
              <p className="text-base font-semibold leading-relaxed">
                {mapFeedback.text}
              </p>
            </div>
          )}

          {/* Interactive Town Map with 8 Clickable Buildings + Decorative Roads/Trees/Flowers */}
          <div className="relative overflow-hidden rounded-3xl border-2 border-emerald-200 bg-gradient-to-b from-sky-50 via-emerald-50 to-emerald-100/80 p-4 sm:p-6">
            {/* Decorative Background Town Roads, Trees, Flowers (non-interactive) */}
            <svg
              viewBox="0 0 1000 560"
              preserveAspectRatio="none"
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 w-full h-full opacity-75"
            >
              {/* Main Cross Roads */}
              <path
                d="M0 275 H1000"
                stroke="#E2E8F0"
                strokeWidth="44"
                strokeLinecap="round"
              />
              <path
                d="M0 275 H1000"
                stroke="#CBD5E1"
                strokeWidth="4"
                strokeDasharray="16 14"
              />
              <path
                d="M500 0 V560"
                stroke="#E2E8F0"
                strokeWidth="40"
                strokeLinecap="round"
              />
              <path
                d="M500 0 V560"
                stroke="#CBD5E1"
                strokeWidth="4"
                strokeDasharray="16 14"
              />

              {/* Park trees & bushes */}
              <circle cx="48" cy="48" r="22" fill="#86EFAC" />
              <circle cx="955" cy="52" r="24" fill="#86EFAC" />
              <circle cx="52" cy="512" r="24" fill="#86EFAC" />
              <circle cx="948" cy="508" r="22" fill="#86EFAC" />
              <circle cx="255" cy="275" r="10" fill="#FDE047" />
              <circle cx="745" cy="275" r="10" fill="#F472B6" />
              <circle cx="500" cy="140" r="9" fill="#FB7185" />
              <circle cx="500" cy="420" r="9" fill="#FACC15" />
            </svg>

            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {MAP_BUILDING_ORDER.map((buildingId) => {
                const workplace = mapWorkplacesById.get(buildingId);
                if (!workplace) return null;

                const isPlaced = placedBuildingIds.includes(buildingId);

                return (
                  <button
                    key={buildingId}
                    type="button"
                    disabled={isPlaced || isMapGameComplete}
                    onClick={() => handleSelectBuilding(buildingId)}
                    aria-label={`${workplace.buildingName}${
                      isPlaced ? ` – ${workplace.workerTitle} elhelyezve` : ''
                    }`}
                    className={`group relative rounded-2xl border-2 p-4 text-left flex flex-col justify-between gap-3 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-600 focus-visible:ring-offset-2 ${
                      isPlaced
                        ? 'bg-emerald-50/95 border-emerald-500 shadow-sm cursor-default'
                        : 'bg-white/95 border-slate-200 shadow-xs hover:border-rose-400 hover:shadow-md hover:-translate-y-0.5 active:scale-[0.99] cursor-pointer'
                    }`}
                  >
                    {/* Top row: building art + placed checkmark */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="w-28 h-24 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center p-1 shrink-0">
                        <MapBuildingArt
                          buildingId={buildingId}
                          className="w-24 h-20"
                        />
                      </div>

                      {isPlaced && (
                        <div className="flex flex-col items-end gap-1.5">
                          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-emerald-600 text-white shadow-xs">
                            <CheckCircle2
                              className="w-5 h-5"
                              aria-hidden="true"
                            />
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Building label & pinned worker card when placed */}
                    <div className="space-y-2">
                      <p className="font-display text-lg font-extrabold text-slate-900 leading-snug">
                        {workplace.buildingName}
                      </p>

                      {isPlaced ? (
                        <div className="rounded-xl bg-white border border-emerald-300 px-2.5 py-2 flex items-center gap-2.5 shadow-2xs">
                          <WorkerAvatarArt
                            workplaceId={buildingId}
                            className="w-9 h-9 shrink-0"
                          />
                          <div className="min-w-0">
                            <p className="text-xs font-semibold text-emerald-800">
                              Megérkezett:
                            </p>
                            <p className="font-display text-sm font-bold text-slate-900 truncate">
                              {workplace.workerTitle}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <p className="text-xs font-semibold text-slate-500 group-hover:text-rose-700 transition-colors">
                          Kattints ide a választáshoz
                        </p>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* GAME 2: EGY NAP A MUNKAHELYEN */}
      {stage === 'WORKFLOW_ORDER' && currentWorkflow && (
        <section
          aria-labelledby="station4-game2-title"
          className="rounded-3xl border border-slate-200 bg-white shadow-sm p-6 sm:p-8 space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <p className="text-sm font-semibold text-rose-800">
                2. játék · Munkafolyamat sorrendbe állítása
              </p>
              <h2
                id="station4-game2-title"
                className="font-display text-2xl sm:text-3xl font-bold text-slate-900"
              >
                Egy nap a munkahelyen
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <span className="font-display text-base sm:text-lg font-bold text-slate-700 tabular-nums whitespace-nowrap">
                {workflowIndex + 1}. / {session.workflowRounds.length}{' '}
                munkafolyamat
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

          <div className="rounded-2xl bg-rose-50/70 border border-rose-200 p-4 sm:p-5 space-y-1">
            <p className="text-sm font-bold text-rose-800">
              {currentWorkflow.item.profession}
            </p>
            <h3 className="font-display text-xl sm:text-2xl font-extrabold text-slate-900">
              {currentWorkflow.item.taskTitle} – Tedd időrendbe a 4 lépést!
            </h3>
            <p className="text-base text-slate-700">
              Kattints az alábbi kártyákra abban a sorrendben, ahogyan a munka
              történik! Ha módosítani szeretnél, kattints egy kitöltött helyre.
            </p>
          </div>

          {/* 4 Ordered Target Slots */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h4 className="font-display text-lg font-bold text-slate-900">
                A munkafolyamat sorrendje:
              </h4>

              {!workflowSolved && workflowSlots.some((s) => s !== null) && (
                <button
                  type="button"
                  onClick={handleResetSlots}
                  className="inline-flex items-center gap-1.5 min-h-[42px] px-4 py-2 rounded-xl border border-slate-300 bg-white text-slate-800 text-sm font-semibold hover:bg-slate-50 transition-colors whitespace-nowrap cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" aria-hidden="true" />
                  <span>Kártyák visszaállítása</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              {SLOT_TITLES.map((slotTitle, idx) => {
                const placedStep = workflowSlots[idx];
                const isSlotCorrect =
                  workflowSolved &&
                  placedStep?.stepKey ===
                    currentWorkflow.item.steps[idx].stepKey;

                return (
                  <button
                    key={slotTitle}
                    type="button"
                    disabled={workflowSolved || placedStep === null}
                    onClick={() => handleRemoveSlotStep(idx)}
                    className={`min-h-[156px] rounded-2xl border-2 p-4 flex flex-col items-center justify-between text-center gap-3 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-600 focus-visible:ring-offset-2 ${
                      isSlotCorrect
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-950 cursor-default'
                        : placedStep
                        ? 'bg-white border-rose-400 text-slate-900 hover:bg-rose-50/50 cursor-pointer shadow-xs'
                        : 'bg-slate-50 border-dashed border-slate-300 text-slate-500 cursor-default'
                    }`}
                  >
                    <span
                      className={`px-3 py-1 rounded-xl font-display text-sm font-extrabold ${
                        isSlotCorrect
                          ? 'bg-emerald-600 text-white'
                          : placedStep
                          ? 'bg-rose-600 text-white'
                          : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {slotTitle}
                    </span>

                    {placedStep ? (
                      <>
                        <WorkflowStepArt
                          stepKey={placedStep.stepKey}
                          className="w-16 h-16 shrink-0"
                        />
                        <p className="font-display text-base font-bold leading-snug text-slate-900">
                          {placedStep.label}
                        </p>
                      </>
                    ) : (
                      <p className="text-sm font-medium text-slate-500 my-auto">
                        Válassz kártyát alulról!
                      </p>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Available Shuffled Step Cards Pool */}
          {!workflowSolved && (
            <div className="space-y-3">
              <h4 className="font-display text-lg font-bold text-slate-900">
                Választható lépések:
              </h4>

              {availableSteps.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                  {availableSteps.map((step) => (
                    <button
                      key={step.stepKey}
                      type="button"
                      onClick={() => handlePlaceStep(step)}
                      className="min-h-[140px] rounded-2xl border-2 border-slate-300 bg-white p-4 flex flex-col items-center justify-center text-center gap-3 hover:border-rose-400 hover:bg-rose-50/60 active:scale-[0.99] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-600 focus-visible:ring-offset-2 cursor-pointer shadow-xs"
                    >
                      <WorkflowStepArt
                        stepKey={step.stepKey}
                        className="w-16 h-16 shrink-0"
                      />
                      <span className="font-display text-base font-bold text-slate-900 leading-snug">
                        {step.label}
                      </span>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-base font-semibold text-slate-700">
                    Minden kártyát elhelyeztél! Kattints az ellenőrzésre!
                  </p>
                  <button
                    type="button"
                    onClick={handleCheckWorkflow}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 min-h-[52px] px-8 py-3 rounded-2xl bg-rose-700 text-white font-display font-bold text-lg hover:bg-rose-800 active:scale-[0.99] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-700 focus-visible:ring-offset-2 whitespace-nowrap cursor-pointer"
                  >
                    <CheckCircle2 className="w-5 h-5" aria-hidden="true" />
                    <span>Ellenőrzés</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Error Feedback */}
          {workflowError && !workflowSolved && (
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
                {workflowError}
              </p>
            </div>
          )}

          {/* Solved Explanation + Next Button */}
          {workflowSolved && (
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
                    {positiveTag} Helyes sorrend!
                  </p>
                  <p className="text-base text-emerald-900 leading-relaxed">
                    {currentWorkflow.item.whyOrderMatters}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleNextWorkflow}
                className="inline-flex items-center justify-center gap-2 min-h-[52px] px-7 py-3 rounded-2xl bg-emerald-700 text-white font-display font-bold text-base sm:text-lg hover:bg-emerald-800 active:scale-[0.99] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>
                  {workflowIndex + 1 < session.workflowRounds.length
                    ? 'Tovább'
                    : 'Tovább a 3. játékra'}
                </span>
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
          )}
        </section>
      )}

      {/* GAME 3: SEGÍTSÉGRE VAN SZÜKSÉG! */}
      {stage === 'CITIZEN_HELP' && currentCitizen && (
        <section
          aria-labelledby="station4-game3-title"
          className="rounded-3xl border border-slate-200 bg-white shadow-sm p-6 sm:p-8 space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <p className="text-sm font-semibold text-rose-800">
                3. játék · Városi segítségnyújtás
              </p>
              <h2
                id="station4-game3-title"
                className="font-display text-2xl sm:text-3xl font-bold text-slate-900"
              >
                Segítségre van szükség!
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <span className="font-display text-base sm:text-lg font-bold text-slate-700 tabular-nums whitespace-nowrap">
                Megoldott helyzetek: {solvedCitizensCount} /{' '}
                {session.citizenRounds.length}
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

          {/* Citizen Character + Speech Bubble */}
          <div className="rounded-3xl border-2 border-rose-200 bg-rose-50/70 p-5 sm:p-6 flex flex-col sm:flex-row items-center gap-5">
            <div className="w-28 h-28 rounded-3xl bg-white border border-rose-200 flex items-center justify-center shrink-0 shadow-xs">
              <CitizenCharacterArt
                problemId={currentCitizen.item.id}
                className="w-24 h-24"
              />
            </div>

            <div className="flex-1 space-y-2 text-center sm:text-left">
              <div className="inline-flex items-center gap-2 text-sm font-bold text-rose-800">
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                <span>
                  {citizenIndex + 1}. városlakó kérése (
                  {citizenIndex + 1} / {session.citizenRounds.length})
                </span>
              </div>
              <p className="font-display text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug">
                {currentCitizen.item.speech}
              </p>
            </div>
          </div>

          {/* Step 1: Choose Profession */}
          {citizenStep === 'PROFESSION' && (
            <div className="space-y-5">
              <div>
                <p className="text-sm font-bold text-rose-800">
                  1. lépés a 2-ből
                </p>
                <h3 className="mt-1 font-display text-xl sm:text-2xl font-bold text-slate-900">
                  Ki tud segíteni ebben a helyzetben?
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {currentCitizen.professionOptions.map((optionName, idx) => {
                  const isCorrect =
                    optionName === currentCitizen.item.correctProfession;
                  const isTriedWrong = wrongProfessions.includes(optionName);
                  const showAsSuccess = professionSolved && isCorrect;

                  return (
                    <button
                      key={optionName}
                      type="button"
                      disabled={professionSolved || isTriedWrong}
                      onClick={() => handleGuessProfession(optionName)}
                      className={`min-h-[60px] px-5 py-3.5 rounded-2xl border text-left font-display text-lg font-bold flex items-center gap-3 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-600 focus-visible:ring-offset-2 ${
                        showAsSuccess
                          ? 'bg-emerald-100 border-emerald-500 text-emerald-950'
                          : isTriedWrong
                          ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed'
                          : 'bg-white border-slate-300 text-slate-900 hover:bg-rose-50 hover:border-rose-400 active:scale-[0.99] cursor-pointer'
                      }`}
                    >
                      <span
                        className={`w-9 h-9 rounded-xl flex items-center justify-center text-base font-extrabold shrink-0 ${
                          showAsSuccess
                            ? 'bg-emerald-600 text-white'
                            : isTriedWrong
                            ? 'bg-slate-200 text-slate-500'
                            : 'bg-rose-100 text-rose-900'
                        }`}
                      >
                        {OPTION_LETTERS[idx]}
                      </span>
                      <span>{optionName}</span>
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
                  className="rounded-2xl bg-emerald-50 border border-emerald-300 p-5 text-emerald-950 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle2
                      className="w-6 h-6 text-emerald-700 shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <div className="space-y-1">
                      <p className="font-display text-lg font-bold text-emerald-900">
                        {positiveTag} Segítő szakember:{' '}
                        {currentCitizen.item.correctProfession}
                      </p>
                      <p className="text-base text-emerald-900 leading-relaxed">
                        {currentCitizen.item.professionExplanation}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleProceedToServiceStep}
                    className="inline-flex items-center justify-center gap-2 min-h-[52px] px-7 py-3 rounded-2xl bg-emerald-700 text-white font-display font-bold text-base sm:text-lg hover:bg-emerald-800 active:scale-[0.99] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <span>Tovább</span>
                    <ArrowRight className="w-5 h-5" aria-hidden="true" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Step 2: Choose Place or Service (rendered ONLY after Step 1 solved) */}
          {citizenStep === 'SERVICE' && (
            <div className="space-y-5">
              <div>
                <p className="text-sm font-bold text-rose-800">
                  2. lépés a 2-ből · Szakember:{' '}
                  {currentCitizen.item.correctProfession}
                </p>
                <h3 className="mt-1 font-display text-xl sm:text-2xl font-bold text-slate-900">
                  Hová kell fordulni vagy milyen szolgáltatást kell igénybe venni?
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {currentCitizen.serviceOptions.map((optionName, idx) => {
                  const isCorrect =
                    optionName === currentCitizen.item.correctServiceOrPlace;
                  const isTriedWrong = wrongServices.includes(optionName);
                  const showAsSuccess = serviceSolved && isCorrect;

                  return (
                    <button
                      key={optionName}
                      type="button"
                      disabled={serviceSolved || isTriedWrong}
                      onClick={() => handleGuessService(optionName)}
                      className={`min-h-[60px] px-5 py-3.5 rounded-2xl border text-left font-display text-lg font-bold flex items-center gap-3 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-600 focus-visible:ring-offset-2 ${
                        showAsSuccess
                          ? 'bg-emerald-100 border-emerald-500 text-emerald-950'
                          : isTriedWrong
                          ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed'
                          : 'bg-white border-slate-300 text-slate-900 hover:bg-rose-50 hover:border-rose-400 active:scale-[0.99] cursor-pointer'
                      }`}
                    >
                      <span
                        className={`w-9 h-9 rounded-xl flex items-center justify-center text-base font-extrabold shrink-0 ${
                          showAsSuccess
                            ? 'bg-emerald-600 text-white'
                            : isTriedWrong
                            ? 'bg-slate-200 text-slate-500'
                            : 'bg-rose-100 text-rose-900'
                        }`}
                      >
                        {OPTION_LETTERS[idx]}
                      </span>
                      <span>{optionName}</span>
                    </button>
                  );
                })}
              </div>

              {serviceHint && !serviceSolved && (
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
                    {serviceHint}
                  </p>
                </div>
              )}

              {serviceSolved && (
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
                    <div className="space-y-1.5">
                      <p className="font-display text-lg font-bold text-emerald-900">
                        „Köszönöm a segítséget! Most már tudom, hová forduljak!”
                      </p>
                      <p className="text-base text-emerald-900 leading-relaxed">
                        {currentCitizen.item.serviceExplanation}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleNextCitizen}
                    className="inline-flex items-center justify-center gap-2 min-h-[52px] px-7 py-3 rounded-2xl bg-emerald-700 text-white font-display font-bold text-base sm:text-lg hover:bg-emerald-800 active:scale-[0.99] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <span>
                      {citizenIndex + 1 < session.citizenRounds.length
                        ? 'Tovább'
                        : 'Csillag átvétele'}
                    </span>
                    <ArrowRight className="w-5 h-5" aria-hidden="true" />
                  </button>
                </div>
              )}
            </div>
          )}
        </section>
      )}

      {/* COMPLETED SCREEN */}
      {stage === 'COMPLETED' && (
        <section
          aria-labelledby="station4-complete-title"
          className="rounded-3xl border border-amber-300 bg-white shadow-sm p-6 sm:p-10 text-center"
        >
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="flex items-center justify-center gap-5">
              <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-3xl overflow-hidden border border-amber-300 bg-amber-50 shadow-xs">
                <GoldStarOwlImage className="w-full h-full object-cover" />
              </div>
              <div className="w-24 h-24 rounded-3xl bg-amber-100 border border-amber-300 flex items-center justify-center shrink-0">
                <Star
                  className="w-14 h-14 fill-amber-400 text-amber-500"
                  aria-hidden="true"
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 text-sm font-bold text-rose-800">
                <Users className="w-5 h-5" aria-hidden="true" />
                <span>Minden városi feladat teljesítve!</span>
              </div>

              <h2
                id="station4-complete-title"
                className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 leading-snug text-balance"
              >
                Gratulálok! A város minden lakójának segítettél! Megismerted a
                munkahelyeket, és ügyesen megoldottad a feladatokat. Igazi városi
                segítő lettél!
              </h2>

              <p className="font-display text-lg sm:text-xl font-bold text-amber-800">
                Megszerezted a Ki hol dolgozik? állomás csillagát!
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
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 min-h-[52px] px-6 py-3 rounded-2xl bg-rose-700 text-white font-display font-bold text-base hover:bg-rose-800 active:scale-[0.99] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-700 focus-visible:ring-offset-2 whitespace-nowrap cursor-pointer"
              >
                <span>Tovább az 5. állomásra</span>
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
