import React, { useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Award,
  CheckCircle2,
  Flower2,
  HeartHandshake,
  HelpCircle,
  Lightbulb,
  RotateCcw,
  Sparkles,
  Star,
} from 'lucide-react';
import { POSITIVE_FEEDBACK_MESSAGES } from '../../data/stations';
import {
  ABILITY_PAIRS,
  AbilityPairId,
  AbilityPairItem,
  DECISION_SITUATIONS,
  shuffleList,
  SuperpowerId,
  SUPERPOWERS_BANK,
} from '../../data/station7Abilities';
import { playStarChime } from '../../utils/sound';
import {
  DecisionSceneArt,
  GardenOwlImage,
  GardenStarOwlImage,
  PairAbilityArt,
  PairProfessionArt,
  SuperpowerArt,
} from '../illustrations/Station7AbilitiesArt';

type Station7Stage =
  | 'INTRO'
  | 'PAIRING'
  | 'DECISION'
  | 'SUPERPOWERS'
  | 'COMPLETED';

interface PairingSession {
  shuffledProfessions: AbilityPairItem[];
  shuffledAbilities: AbilityPairItem[];
}

function createPairingSession(): PairingSession {
  const shuffledProfessions = shuffleList(ABILITY_PAIRS);
  let shuffledAbilities = shuffleList(ABILITY_PAIRS);

  // Ensure abilities column isn't identically aligned row-by-row
  let attempts = 0;
  while (
    shuffledAbilities.some(
      (item, idx) => item.id === shuffledProfessions[idx].id
    ) &&
    attempts < 12
  ) {
    shuffledAbilities = shuffleList(ABILITY_PAIRS);
    attempts += 1;
  }

  return {
    shuffledProfessions,
    shuffledAbilities,
  };
}

interface Station7AbilitiesGameProps {
  isAlreadyCompleted: boolean;
  onComplete: () => void;
  onGoHome: () => void;
  onGoToNextStation: () => void;
}

export const Station7AbilitiesGame: React.FC<Station7AbilitiesGameProps> = ({
  isAlreadyCompleted,
  onComplete,
  onGoHome,
  onGoToNextStation,
}) => {
  const [stage, setStage] = useState<Station7Stage>('INTRO');
  const [wasAlreadyCompletedOnFinish, setWasAlreadyCompletedOnFinish] =
    useState(isAlreadyCompleted);

  // Game 1: Képességpárosító state
  const [pairingSession, setPairingSession] = useState<PairingSession>(() =>
    createPairingSession()
  );
  const [selectedProfessionId, setSelectedProfessionId] =
    useState<AbilityPairId | null>(null);
  const [pairedIds, setPairedIds] = useState<AbilityPairId[]>([]);
  const [pairingFeedback, setPairingFeedback] = useState<{
    type: 'success' | 'error' | 'info';
    title: string;
    text: string;
  } | null>(null);

  // Game 2: Mit tennél a helyében? state
  const [decisionIndex, setDecisionIndex] = useState(0);
  const [decisionChoice, setDecisionChoice] = useState<'A' | 'B' | 'C' | null>(
    null
  );
  const [decisionStatus, setDecisionStatus] = useState<
    'IDLE' | 'WRONG' | 'CORRECT'
  >('IDLE');
  const [completedDecisionIds, setCompletedDecisionIds] = useState<string[]>(
    []
  );

  // Game 3: Az én szuperképességeim state
  const [selectedSuperpowerIds, setSelectedSuperpowerIds] = useState<
    SuperpowerId[]
  >([]);
  const [showSuperpowerCard, setShowSuperpowerCard] = useState(false);
  const [superpowerLimitNotice, setSuperpowerLimitNotice] = useState<
    string | null
  >(null);

  const stageStepNumber = useMemo(() => {
    switch (stage) {
      case 'INTRO':
        return 0;
      case 'PAIRING':
        return 1;
      case 'DECISION':
        return 2;
      case 'SUPERPOWERS':
        return 3;
      case 'COMPLETED':
        return 4;
    }
  }, [stage]);

  const handleRestartStation = () => {
    setStage('INTRO');
    setPairingSession(createPairingSession());
    setSelectedProfessionId(null);
    setPairedIds([]);
    setPairingFeedback(null);

    setDecisionIndex(0);
    setDecisionChoice(null);
    setDecisionStatus('IDLE');
    setCompletedDecisionIds([]);

    setSelectedSuperpowerIds([]);
    setShowSuperpowerCard(false);
    setSuperpowerLimitNotice(null);
  };

  // --- Game 1 Handlers ---
  const isAllPaired = pairedIds.length === ABILITY_PAIRS.length;

  const handleSelectProfession = (id: AbilityPairId) => {
    if (pairedIds.includes(id)) return;
    setSelectedProfessionId(id);
    setPairingFeedback(null);
  };

  const handleSelectAbility = (abilityId: AbilityPairId) => {
    if (pairedIds.includes(abilityId)) return;

    if (!selectedProfessionId) {
      setPairingFeedback({
        type: 'info',
        title: 'Válassz előbb foglalkozást!',
        text: 'Először kattints egy foglalkozásra a bal oldalon, majd válaszd ki a hozzá illő képességet a jobb oldalon!',
      });
      return;
    }

    if (selectedProfessionId === abilityId) {
      const matched = ABILITY_PAIRS.find((item) => item.id === abilityId)!;
      setPairedIds((prev) => [...prev, abilityId]);
      setSelectedProfessionId(null);
      const praise =
        POSITIVE_FEEDBACK_MESSAGES[
          pairedIds.length % POSITIVE_FEEDBACK_MESSAGES.length
        ];
      setPairingFeedback({
        type: 'success',
        title: `${praise} ${matched.professionTitle} – ${matched.abilityTitle}`,
        text: matched.explanation,
      });
    } else {
      setPairingFeedback({
        type: 'error',
        title: 'Próbáld meg újra!',
        text: 'Ez a képesség is hasznos lehet sok munkában, de ehhez a foglalkozáshoz most egy másik kiemelt erősséget keresünk.',
      });
    }
  };

  // --- Game 2 Handlers ---
  const currentDecision = DECISION_SITUATIONS[decisionIndex];

  const handleSelectDecisionOption = (letter: 'A' | 'B' | 'C') => {
    if (!currentDecision || decisionStatus !== 'IDLE') return;
    setDecisionChoice(letter);

    if (letter === currentDecision.correctLetter) {
      setDecisionStatus('CORRECT');
      setCompletedDecisionIds((prev) =>
        prev.includes(currentDecision.id)
          ? prev
          : [...prev, currentDecision.id]
      );
    } else {
      setDecisionStatus('WRONG');
    }
  };

  const handleRetryDecision = () => {
    setDecisionChoice(null);
    setDecisionStatus('IDLE');
  };

  const handleNextDecision = () => {
    if (decisionStatus !== 'CORRECT') return;
    if (decisionIndex + 1 < DECISION_SITUATIONS.length) {
      setDecisionIndex((prev) => prev + 1);
      setDecisionChoice(null);
      setDecisionStatus('IDLE');
    } else if (completedDecisionIds.length === DECISION_SITUATIONS.length) {
      setStage('SUPERPOWERS');
    }
  };

  // --- Game 3 Handlers ---
  const handleToggleSuperpower = (id: SuperpowerId) => {
    if (showSuperpowerCard) return;

    if (selectedSuperpowerIds.includes(id)) {
      setSelectedSuperpowerIds((prev) => prev.filter((item) => item !== id));
      setSuperpowerLimitNotice(null);
      return;
    }

    if (selectedSuperpowerIds.length >= 3) {
      setSuperpowerLimitNotice(
        'Már 3 szuperképességet kiválasztottál! Ha cserélni szeretnél, kattints előbb az egyik kijelölt kártyára.'
      );
      return;
    }

    setSelectedSuperpowerIds((prev) => [...prev, id]);
    setSuperpowerLimitNotice(null);
  };

  const chosenSuperpowers = useMemo(
    () =>
      SUPERPOWERS_BANK.filter((item) =>
        selectedSuperpowerIds.includes(item.id)
      ),
    [selectedSuperpowerIds]
  );

  const combinedExampleProfessions = useMemo(() => {
    const unique = new Set<string>();
    chosenSuperpowers.forEach((sp) => {
      sp.exampleProfessions.slice(0, 2).forEach((prof) => unique.add(prof));
    });
    return Array.from(unique);
  }, [chosenSuperpowers]);

  const handleFinishStation7 = () => {
    if (selectedSuperpowerIds.length !== 3 || !showSuperpowerCard) return;
    setWasAlreadyCompletedOnFinish(isAlreadyCompleted);
    setStage('COMPLETED');
    onComplete();
    playStarChime();
  };

  const positiveTag =
    POSITIVE_FEEDBACK_MESSAGES[
      (pairedIds.length + decisionIndex) % POSITIVE_FEEDBACK_MESSAGES.length
    ];

  return (
    <div className="space-y-6">
      {/* INTRO SCREEN */}
      {stage === 'INTRO' && (
        <section
          aria-labelledby="station7-intro-title"
          className="rounded-3xl border border-orange-200 bg-white shadow-sm p-6 sm:p-10"
        >
          <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center gap-6 sm:gap-8">
            <div className="w-44 h-44 sm:w-52 sm:h-52 rounded-3xl overflow-hidden border border-orange-200 bg-orange-50 shrink-0 shadow-xs">
              <GardenOwlImage className="w-full h-full object-cover" />
            </div>

            <div className="space-y-5 text-center md:text-left">
              <div className="inline-flex items-center gap-2 text-sm font-bold text-orange-800">
                <Flower2 className="w-4 h-4" aria-hidden="true" />
                <span>Képességek Kertje · Három játék</span>
              </div>

              <h2
                id="station7-intro-title"
                className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight text-balance"
              >
                Milyen képesség kell hozzá? – Képességek Kertje
              </h2>

              <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
                „Üdvözöllek a Képességek Kertjében! Itt minden virág egy különleges
                erősséget jelképez. Nézzük meg, milyen képességek segítik a
                különböző szakembereket, hogyan döntenél nehéz helyzetekben, és
                fedezd fel a saját szuperképességeidet is!”
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3.5 justify-center md:justify-start">
                <button
                  type="button"
                  onClick={() => setStage('PAIRING')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 min-h-[56px] px-8 py-3.5 rounded-2xl bg-orange-600 text-white font-display font-bold text-lg hover:bg-orange-700 active:scale-[0.99] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-600 focus-visible:ring-offset-2 whitespace-nowrap cursor-pointer"
                >
                  <Sparkles className="w-5 h-5" aria-hidden="true" />
                  <span>Induljon az 1. játék!</span>
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
          aria-label="A hetedik állomás három játéka"
          className="rounded-3xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { step: 1, title: '1. Képességpárosító' },
              { step: 2, title: '2. Mit tennél a helyében?' },
              { step: 3, title: '3. Az én szuperképességeim' },
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
                      ? 'bg-orange-50 border-orange-300 text-slate-900'
                      : 'bg-slate-50 border-slate-200 text-slate-500'
                  }`}
                >
                  <span
                    className={`w-8 h-8 rounded-xl flex items-center justify-center font-display font-bold text-sm shrink-0 ${
                      isDone
                        ? 'bg-emerald-600 text-white'
                        : isCurrent
                        ? 'bg-orange-600 text-white'
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

      {/* 1. JÁTÉK – KÉPESSÉGPÁROSÍTÓ */}
      {stage === 'PAIRING' && (
        <section
          aria-labelledby="station7-game1-title"
          className="rounded-3xl border border-slate-200 bg-white shadow-sm p-6 sm:p-8 space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <p className="text-sm font-semibold text-orange-800">
                1. játék · Képességpárosító
              </p>
              <h2
                id="station7-game1-title"
                className="font-display text-2xl sm:text-3xl font-bold text-slate-900"
              >
                Párosítsd a foglalkozást a képességgel!
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <span className="font-display text-base sm:text-lg font-bold text-slate-700 tabular-nums whitespace-nowrap">
                Megtalált párok: {pairedIds.length} / {ABILITY_PAIRS.length}
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

          <div className="rounded-2xl bg-orange-50/70 border border-orange-200 p-4 sm:p-5 space-y-1.5">
            <p className="font-display text-base sm:text-lg font-bold text-slate-900">
              „Minden mesterséghez szükség van különleges képességekre! Találd
              meg az összetartozó párokat!”
            </p>
            <p className="text-sm sm:text-base text-slate-700">
              Egy munkához többféle erősség is hasznos lehet. Kattints először
              egy foglalkozásra a bal oldalon, majd válaszd ki hozzá az egyik
              legfontosabb képességet a jobb oldalon!
            </p>
          </div>

          {/* Pairing Feedback Banner */}
          {pairingFeedback && (
            <div
              role="status"
              aria-live="polite"
              className={`rounded-2xl border p-4 sm:p-5 flex items-start gap-3 ${
                pairingFeedback.type === 'success'
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                  : pairingFeedback.type === 'error'
                  ? 'bg-amber-50 border-amber-300 text-amber-950'
                  : 'bg-sky-50 border-sky-200 text-sky-950'
              }`}
            >
              {pairingFeedback.type === 'success' ? (
                <CheckCircle2
                  className="w-6 h-6 text-emerald-700 shrink-0 mt-0.5"
                  aria-hidden="true"
                />
              ) : pairingFeedback.type === 'error' ? (
                <HelpCircle
                  className="w-6 h-6 text-amber-700 shrink-0 mt-0.5"
                  aria-hidden="true"
                />
              ) : (
                <Lightbulb
                  className="w-6 h-6 text-sky-700 shrink-0 mt-0.5"
                  aria-hidden="true"
                />
              )}
              <div className="space-y-1">
                <p className="font-display text-lg font-bold">
                  {pairingFeedback.title}
                </p>
                <p className="text-base leading-relaxed">
                  {pairingFeedback.text}
                </p>
              </div>
            </div>
          )}

          {/* Two Columns: Professions (Left) & Abilities (Right) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="font-display text-lg font-bold text-slate-900">
                1. Foglalkozások
              </h3>
              <div className="space-y-3">
                {pairingSession.shuffledProfessions.map((item) => {
                  const isPaired = pairedIds.includes(item.id);
                  const isSelected = selectedProfessionId === item.id;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      disabled={isPaired}
                      onClick={() => handleSelectProfession(item.id)}
                      className={`w-full min-h-[76px] p-3.5 rounded-2xl border-2 text-left flex items-center gap-3.5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-600 focus-visible:ring-offset-2 ${
                        isPaired
                          ? 'bg-emerald-50 border-emerald-500 text-emerald-950 cursor-default'
                          : isSelected
                          ? 'bg-orange-100 border-orange-600 ring-2 ring-orange-300 text-slate-950 cursor-pointer shadow-sm'
                          : 'bg-white border-slate-300 text-slate-900 hover:bg-orange-50 hover:border-orange-400 cursor-pointer'
                      }`}
                    >
                      <PairProfessionArt
                        pairId={item.id}
                        className="w-14 h-14 shrink-0"
                      />
                      <span className="flex-1 font-display text-base sm:text-lg font-bold leading-snug">
                        {item.professionTitle}
                      </span>
                      {isPaired && (
                        <CheckCircle2
                          className="w-6 h-6 text-emerald-700 shrink-0"
                          aria-label="Párosítva"
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-display text-lg font-bold text-slate-900">
                2. Kiemelt képességek
              </h3>
              <div className="space-y-3">
                {pairingSession.shuffledAbilities.map((item) => {
                  const isPaired = pairedIds.includes(item.id);

                  return (
                    <button
                      key={item.id}
                      type="button"
                      disabled={isPaired}
                      onClick={() => handleSelectAbility(item.id)}
                      className={`w-full min-h-[76px] p-3.5 rounded-2xl border-2 text-left flex items-center gap-3.5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-600 focus-visible:ring-offset-2 ${
                        isPaired
                          ? 'bg-emerald-50 border-emerald-500 text-emerald-950 cursor-default'
                          : selectedProfessionId
                          ? 'bg-white border-orange-300 text-slate-900 hover:bg-orange-50 hover:border-orange-500 active:scale-[0.99] cursor-pointer shadow-xs'
                          : 'bg-white border-slate-300 text-slate-900 hover:bg-slate-50 cursor-pointer'
                      }`}
                    >
                      <PairAbilityArt
                        pairId={item.id}
                        className="w-14 h-14 shrink-0"
                      />
                      <span className="flex-1 font-display text-base sm:text-lg font-bold leading-snug">
                        {item.abilityTitle}
                      </span>
                      {isPaired && (
                        <CheckCircle2
                          className="w-6 h-6 text-emerald-700 shrink-0"
                          aria-label="Párosítva"
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* All 6 Paired -> Next Game CTA */}
          {isAllPaired && (
            <div
              role="status"
              aria-live="polite"
              className="rounded-2xl bg-emerald-50 border-2 border-emerald-300 p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-3">
                <CheckCircle2
                  className="w-7 h-7 text-emerald-700 shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <div className="space-y-1">
                  <p className="font-display text-xl font-extrabold text-emerald-950">
                    Remek! Mind a hat párt megtaláltad!
                  </p>
                  <p className="text-base text-emerald-900">
                    Látod, mennyiféle képesség segíti a szakemberek mindennapi
                    munkáját! Jöhet a második játék!
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setStage('DECISION')}
                className="inline-flex items-center justify-center gap-2 min-h-[54px] px-7 py-3 rounded-2xl bg-emerald-700 text-white font-display font-bold text-base sm:text-lg hover:bg-emerald-800 active:scale-[0.99] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>Tovább a 2. játékra</span>
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
          )}
        </section>
      )}

      {/* 2. JÁTÉK – MIT TENNÉL A HELYÉBEN? */}
      {stage === 'DECISION' && currentDecision && (
        <section
          aria-labelledby="station7-game2-title"
          className="rounded-3xl border border-slate-200 bg-white shadow-sm p-6 sm:p-8 space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <p className="text-sm font-semibold text-orange-800">
                2. játék · Döntési helyzetek
              </p>
              <h2
                id="station7-game2-title"
                className="font-display text-2xl sm:text-3xl font-bold text-slate-900"
              >
                Mit tennél a helyében?
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <span className="font-display text-base sm:text-lg font-bold text-slate-700 tabular-nums whitespace-nowrap">
                {decisionIndex + 1} / {DECISION_SITUATIONS.length} helyzet
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
            <div className="lg:col-span-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <DecisionSceneArt
                sceneId={currentDecision.id}
                className="w-full h-52 sm:h-60"
              />
            </div>

            <div className="lg:col-span-7 space-y-5">
              <div className="space-y-1">
                <p className="text-sm font-bold text-orange-800">
                  Válaszd ki a legsegítőkészebb és legokosabb megoldást!
                </p>
                <h3 className="font-display text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug">
                  {currentDecision.situation}
                </h3>
              </div>

              <div className="space-y-3.5">
                {currentDecision.options.map((opt) => {
                  const isSelected = decisionChoice === opt.letter;
                  const isSuccess = decisionStatus === 'CORRECT' && isSelected;
                  const isWrong = decisionStatus === 'WRONG' && isSelected;

                  return (
                    <button
                      key={opt.letter}
                      type="button"
                      disabled={decisionStatus !== 'IDLE'}
                      onClick={() => handleSelectDecisionOption(opt.letter)}
                      className={`w-full min-h-[64px] px-5 py-3.5 rounded-2xl border-2 text-left font-display text-lg font-bold flex items-center gap-3.5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-600 focus-visible:ring-offset-2 ${
                        isSuccess
                          ? 'bg-emerald-100 border-emerald-500 text-emerald-950'
                          : isWrong
                          ? 'bg-amber-100 border-amber-400 text-amber-950'
                          : decisionStatus !== 'IDLE'
                          ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed'
                          : 'bg-white border-slate-300 text-slate-900 hover:bg-orange-50 hover:border-orange-400 active:scale-[0.99] cursor-pointer'
                      }`}
                    >
                      <span
                        className={`w-10 h-10 rounded-xl flex items-center justify-center text-base font-extrabold shrink-0 ${
                          isSuccess
                            ? 'bg-emerald-600 text-white'
                            : isWrong
                            ? 'bg-amber-600 text-white'
                            : decisionStatus !== 'IDLE'
                            ? 'bg-slate-200 text-slate-500'
                            : 'bg-orange-100 text-orange-900'
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
              {decisionStatus === 'WRONG' && (
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
                        Ez most nem a legjobb választás! Gondold át újra!
                      </p>
                      <p className="text-base text-amber-900 leading-relaxed">
                        {currentDecision.retryHint}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleRetryDecision}
                    className="inline-flex items-center justify-center gap-2 min-h-[52px] px-6 py-3 rounded-2xl bg-amber-600 text-white font-display font-bold text-base hover:bg-amber-700 active:scale-[0.99] transition-all whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <RotateCcw className="w-5 h-5" aria-hidden="true" />
                    <span>Újrapróbálom</span>
                  </button>
                </div>
              )}

              {/* Correct Answer with Highlighted Ability Name */}
              {decisionStatus === 'CORRECT' && (
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
                    <div className="space-y-1.5">
                      <p className="font-display text-lg font-extrabold text-emerald-900">
                        {positiveTag} · Fontos képesség:{' '}
                        {currentDecision.highlightedAbility}
                      </p>
                      <p className="text-base text-emerald-900 leading-relaxed">
                        {currentDecision.positiveExplanation}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleNextDecision}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 min-h-[52px] px-7 py-3 rounded-2xl bg-emerald-700 text-white font-display font-bold text-base sm:text-lg hover:bg-emerald-800 active:scale-[0.99] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 whitespace-nowrap cursor-pointer"
                  >
                    <span>
                      {decisionIndex + 1 < DECISION_SITUATIONS.length
                        ? 'Tovább'
                        : 'Tovább a 3. játékra'}
                    </span>
                    <ArrowRight className="w-5 h-5" aria-hidden="true" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* 3. JÁTÉK – AZ ÉN SZUPERKÉPESSÉGEIM */}
      {stage === 'SUPERPOWERS' && (
        <section
          aria-labelledby="station7-game3-title"
          className="rounded-3xl border border-slate-200 bg-white shadow-sm p-6 sm:p-8 space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <p className="text-sm font-semibold text-orange-800">
                3. játék · Önismeret és erősségek
              </p>
              <h2
                id="station7-game3-title"
                className="font-display text-2xl sm:text-3xl font-bold text-slate-900"
              >
                Az én szuperképességeim
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <span className="font-display text-base sm:text-lg font-bold text-slate-700 tabular-nums whitespace-nowrap">
                Kiválasztva: {selectedSuperpowerIds.length} / 3 erősség
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

          {!showSuperpowerCard ? (
            <div className="space-y-6">
              {/* Bagoly Mester Prompt */}
              <div className="rounded-2xl border-2 border-orange-200 bg-orange-50/70 p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-4">
                <div className="w-20 h-20 rounded-2xl overflow-hidden border border-orange-200 bg-white shrink-0">
                  <GardenOwlImage className="w-full h-full object-cover" />
                </div>
                <div className="space-y-1 text-center sm:text-left">
                  <p className="font-display text-lg sm:text-xl font-extrabold text-slate-900">
                    „Most te következel! Mindenkinek vannak különleges
                    képességei. Gondold végig, miben vagy ügyes!”
                  </p>
                  <p className="text-sm sm:text-base text-slate-700">
                    Válassz ki pontosan <strong>3 kártyát</strong> az alábbiak
                    közül! Bármikor módosíthatod a választásodat egy újabb
                    kattintással.
                  </p>
                </div>
              </div>

              {/* 8 Selectable Superpower Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {SUPERPOWERS_BANK.map((item) => {
                  const isSelected = selectedSuperpowerIds.includes(item.id);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleToggleSuperpower(item.id)}
                      aria-pressed={isSelected}
                      className={`min-h-[152px] p-4 rounded-2xl border-2 flex flex-col items-center justify-center text-center gap-3 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-600 focus-visible:ring-offset-2 cursor-pointer ${
                        isSelected
                          ? 'bg-orange-100 border-orange-600 ring-2 ring-orange-300 text-slate-950 shadow-sm scale-[1.01]'
                          : 'bg-white border-slate-300 text-slate-900 hover:bg-orange-50/70 hover:border-orange-400'
                      }`}
                    >
                      <SuperpowerArt
                        superpowerId={item.id}
                        className="w-16 h-16 shrink-0"
                      />
                      <span className="font-display text-base sm:text-lg font-bold leading-snug">
                        {item.label}
                      </span>
                      {isSelected && (
                        <span className="inline-flex items-center gap-1 text-xs font-extrabold text-orange-800">
                          <CheckCircle2
                            className="w-4 h-4"
                            aria-hidden="true"
                          />
                          <span>Kiválasztva</span>
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {superpowerLimitNotice && (
                <div
                  role="status"
                  aria-live="polite"
                  className="rounded-2xl bg-sky-50 border border-sky-200 p-4 text-sky-950 flex items-start gap-3"
                >
                  <Lightbulb
                    className="w-5 h-5 text-sky-700 shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <p className="text-base font-semibold">
                    {superpowerLimitNotice}
                  </p>
                </div>
              )}

              <div className="flex justify-center pt-1">
                <button
                  type="button"
                  disabled={selectedSuperpowerIds.length !== 3}
                  onClick={() => setShowSuperpowerCard(true)}
                  className={`inline-flex items-center justify-center gap-2 min-h-[56px] px-8 py-3.5 rounded-2xl font-display font-bold text-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-600 focus-visible:ring-offset-2 whitespace-nowrap ${
                    selectedSuperpowerIds.length === 3
                      ? 'bg-orange-600 text-white hover:bg-orange-700 active:scale-[0.99] cursor-pointer shadow-sm'
                      : 'bg-slate-200 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  <Sparkles className="w-5 h-5" aria-hidden="true" />
                  <span>Szuperképesség-kártyám elkészítése</span>
                </button>
              </div>
            </div>
          ) : (
            /* Personalized "Szuperképesség-kártya" */
            <div className="max-w-3xl mx-auto rounded-3xl border-2 border-amber-300 bg-gradient-to-b from-amber-50/80 via-white to-orange-50/70 p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="text-center space-y-2">
                <div className="inline-flex items-center gap-2 text-sm font-bold text-orange-800">
                  <HeartHandshake className="w-5 h-5" aria-hidden="true" />
                  <span>Személyes erősség-gyűjtemény</span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900">
                  Az én Szuperképesség-kártyám
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {chosenSuperpowers.map((sp) => (
                  <div
                    key={sp.id}
                    className="rounded-2xl border border-orange-200 bg-white p-4 text-center flex flex-col items-center gap-2.5 shadow-2xs"
                  >
                    <SuperpowerArt
                      superpowerId={sp.id}
                      className="w-16 h-16 shrink-0"
                    />
                    <p className="font-display text-base font-extrabold text-slate-900">
                      {sp.shortTitle}
                    </p>
                    <p className="text-sm text-slate-600 leading-snug">
                      {sp.encouragementNote}
                    </p>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl border border-emerald-200 bg-emerald-50/80 p-5 space-y-3 text-center sm:text-left">
                <p className="font-display text-lg font-extrabold text-emerald-950">
                  Nagyszerű! Ezek az erősségek sokféle foglalkozásban hasznosak
                  lehetnek. És még rengeteg új képességet tanulhatsz!
                </p>
                <p className="text-base text-emerald-900 leading-relaxed">
                  Például többek között ilyen munkákban is kamatoztathatod őket:{' '}
                  <strong>{combinedExampleProfessions.join(', ')}</strong> – de
                  bármilyen más szakmában is sikeres lehetsz, ami érdekel téged!
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-1">
                <button
                  type="button"
                  onClick={() => setShowSuperpowerCard(false)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 min-h-[52px] px-6 py-3 rounded-2xl border border-slate-300 bg-white text-slate-800 font-display font-bold text-base hover:bg-slate-50 transition-colors whitespace-nowrap cursor-pointer"
                >
                  <RotateCcw className="w-5 h-5" aria-hidden="true" />
                  <span>Választás módosítása</span>
                </button>

                <button
                  type="button"
                  onClick={handleFinishStation7}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 min-h-[54px] px-8 py-3 rounded-2xl bg-emerald-700 text-white font-display font-bold text-lg hover:bg-emerald-800 active:scale-[0.99] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 whitespace-nowrap cursor-pointer"
                >
                  <span>Állomás befejezése</span>
                  <ArrowRight className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          )}
        </section>
      )}

      {/* COMPLETED SCREEN */}
      {stage === 'COMPLETED' && (
        <section
          aria-labelledby="station7-complete-title"
          className="rounded-3xl border border-amber-300 bg-white shadow-sm p-6 sm:p-10 text-center"
        >
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="flex items-center justify-center gap-5">
              <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-3xl overflow-hidden border border-amber-300 bg-amber-50 shadow-xs">
                <GardenStarOwlImage className="w-full h-full object-cover" />
              </div>
              <div className="w-24 h-24 rounded-3xl bg-amber-100 border border-amber-300 flex items-center justify-center shrink-0">
                <Star
                  className="w-14 h-14 fill-amber-400 text-amber-500"
                  aria-hidden="true"
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 text-sm font-bold text-orange-800">
                <Award className="w-5 h-5" aria-hidden="true" />
                <span>Mindhárom játék teljesítve!</span>
              </div>

              <h2
                id="station7-complete-title"
                className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 leading-snug text-balance"
              >
                Gratulálok, kis felfedező! Megismerted a mesterségekhez
                szükséges képességeket, ügyesen döntöttél, és felfedezted a saját
                szuperképességeidet! Ne feledd: mindenki tehetséges valamiben, és
                gyakorlással egyre ügyesebb lehet!
              </h2>

              <p className="font-display text-lg sm:text-xl font-bold text-amber-800">
                Megszerezted a Milyen képesség kell hozzá? állomás csillagát!
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
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 min-h-[52px] px-6 py-3 rounded-2xl bg-orange-600 text-white font-display font-bold text-base hover:bg-orange-700 active:scale-[0.99] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-600 focus-visible:ring-offset-2 whitespace-nowrap cursor-pointer"
              >
                <span>Tovább a 8. állomásra</span>
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
