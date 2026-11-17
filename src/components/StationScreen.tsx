import React from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Info,
  Star,
} from 'lucide-react';
import { STATIONS } from '../data/stations';
import { StationDefinition, StationId } from '../types/game';
import { Station1OldCraftsGame } from './games/Station1OldCraftsGame';
import { Station2ToolsGame } from './games/Station2ToolsGame';
import { Station3DetectiveGame } from './games/Station3DetectiveGame';
import { Station4WorkplacesGame } from './games/Station4WorkplacesGame';
import { Station5MysteryNamesGame } from './games/Station5MysteryNamesGame';
import { Station6TruthTowerGame } from './games/Station6TruthTowerGame';
import { Station7AbilitiesGame } from './games/Station7AbilitiesGame';
import { Station8FutureGateGame } from './games/Station8FutureGateGame';
import { StationBuildingArt } from './illustrations/StationBuildingArt';

interface StationScreenProps {
  station: StationDefinition;
  isCompleted: boolean;
  totalStars: number;
  onAwardStar: (stationId: StationId) => void;
  onSelectStation: (stationId: StationId) => void;
  onGoHome: () => void;
}

export const StationScreen: React.FC<StationScreenProps> = ({
  station,
  isCompleted,
  totalStars,
  onAwardStar,
  onSelectStation,
  onGoHome,
}) => {
  const currentIndex = STATIONS.findIndex((s) => s.id === station.id);
  const prevStation = currentIndex > 0 ? STATIONS[currentIndex - 1] : null;
  const nextStation = currentIndex < STATIONS.length - 1 ? STATIONS[currentIndex + 1] : null;

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
      {/* Station Overview Card */}
      <section
        aria-labelledby="station-screen-title"
        className="rounded-3xl border border-slate-200 bg-white shadow-sm p-6 sm:p-8"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-5">
            <div
              className={`w-32 h-28 rounded-2xl ${station.theme.surfaceTint} border ${station.theme.borderTint} flex items-center justify-center p-2 shrink-0`}
            >
              <StationBuildingArt stationId={station.id} className="w-28 h-24" />
            </div>

            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2 text-sm font-semibold text-slate-500">
                <span className="tabular-nums text-slate-800">{station.orderLabel} állomás</span>
                <span aria-hidden="true">·</span>
                <span>{station.buildingName}</span>
                <span aria-hidden="true">·</span>
                <span>{station.districtLabel}</span>
              </div>

              <h1
                id="station-screen-title"
                className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 text-balance"
              >
                {station.title}
              </h1>
            </div>
          </div>

          {/* Explicit Star Status Indicator (Icon + Text, never color alone) */}
          <div
            className={`inline-flex items-center gap-3 px-4 py-3 rounded-2xl border shrink-0 self-start md:self-center ${
              isCompleted
                ? 'bg-amber-50 border-amber-300 text-amber-900'
                : 'bg-slate-50 border-slate-200 text-slate-700'
            }`}
          >
            <Star
              className={`w-7 h-7 shrink-0 ${
                isCompleted
                  ? 'fill-amber-400 text-amber-500'
                  : 'fill-slate-100 text-slate-400'
              }`}
              aria-hidden="true"
            />
            <div className="text-left">
              <p className="text-xs font-medium text-slate-500">Állomás csillaga</p>
              <p className="font-display text-base font-bold whitespace-nowrap">
                {isCompleted ? 'Megszerezve' : 'Még vár rád'}
              </p>
            </div>
          </div>
        </div>

        {/* Clear Hungarian Instruction Box */}
        <div className="mt-6 rounded-2xl bg-slate-50 border border-slate-200 p-4 sm:p-5 flex items-start gap-3.5">
          <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 text-slate-700 flex items-center justify-center shrink-0 mt-0.5">
            <Info className="w-5 h-5" aria-hidden="true" />
          </div>
          <div>
            <h2 className="font-display text-base sm:text-lg font-bold text-slate-900">
              Útmutató a játékhoz
            </h2>
            <p className="mt-1 text-base sm:text-lg text-slate-700 leading-relaxed">
              {station.instruction}
            </p>
          </div>
        </div>
      </section>

      {/* Stations 1-8: Real Interactive Games */}
      {station.id === 1 ? (
        <Station1OldCraftsGame
          isAlreadyCompleted={isCompleted}
          onComplete={() => onAwardStar(1)}
          onGoHome={onGoHome}
        />
      ) : station.id === 2 ? (
        <Station2ToolsGame
          isAlreadyCompleted={isCompleted}
          totalStarsBefore={totalStars}
          onComplete={() => onAwardStar(2)}
          onGoHome={onGoHome}
        />
      ) : station.id === 3 ? (
        <Station3DetectiveGame
          isAlreadyCompleted={isCompleted}
          onComplete={() => onAwardStar(3)}
          onGoHome={onGoHome}
        />
      ) : station.id === 4 ? (
        <Station4WorkplacesGame
          isAlreadyCompleted={isCompleted}
          onComplete={() => onAwardStar(4)}
          onGoHome={onGoHome}
          onGoToNextStation={() => onSelectStation(5)}
        />
      ) : station.id === 5 ? (
        <Station5MysteryNamesGame
          isAlreadyCompleted={isCompleted}
          onComplete={() => onAwardStar(5)}
          onGoHome={onGoHome}
          onGoToNextStation={() => onSelectStation(6)}
        />
      ) : station.id === 6 ? (
        <Station6TruthTowerGame
          isAlreadyCompleted={isCompleted}
          onComplete={() => onAwardStar(6)}
          onGoHome={onGoHome}
          onGoToNextStation={() => onSelectStation(7)}
        />
      ) : station.id === 7 ? (
        <Station7AbilitiesGame
          isAlreadyCompleted={isCompleted}
          onComplete={() => onAwardStar(7)}
          onGoHome={onGoHome}
          onGoToNextStation={() => onSelectStation(8)}
        />
      ) : (
        <Station8FutureGateGame
          isAlreadyCompleted={isCompleted}
          totalStars={totalStars}
          onComplete={() => onAwardStar(8)}
          onGoHome={onGoHome}
        />
      )}

      {/* Bottom Station Step Navigation (Any-order exploration) */}
      <nav
        aria-label="Állomások közötti léptetés"
        className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2"
      >
        {prevStation ? (
          <button
            type="button"
            onClick={() => onSelectStation(prevStation.id)}
            className="inline-flex items-center justify-center sm:justify-start gap-2 min-h-[48px] px-5 py-3 rounded-2xl border border-slate-200 bg-white text-slate-800 font-semibold text-base hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5 text-slate-500 shrink-0" aria-hidden="true" />
            <span className="truncate">
              {prevStation.orderLabel} {prevStation.title}
            </span>
          </button>
        ) : (
          <div className="hidden sm:block" />
        )}

        {nextStation ? (
          <button
            type="button"
            onClick={() => onSelectStation(nextStation.id)}
            className="inline-flex items-center justify-center sm:justify-end gap-2 min-h-[48px] px-5 py-3 rounded-2xl border border-slate-200 bg-white text-slate-800 font-semibold text-base hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <span className="truncate">
              {nextStation.orderLabel} {nextStation.title}
            </span>
            <ArrowRight className="w-5 h-5 text-slate-500 shrink-0" aria-hidden="true" />
          </button>
        ) : (
          <div className="hidden sm:block" />
        )}
      </nav>
    </main>
  );
};
