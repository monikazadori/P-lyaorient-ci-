import React from 'react';
import { Award, CheckCircle2, ChevronRight, MapPin, Star } from 'lucide-react';
import { STATIONS } from '../data/stations';
import { StationId } from '../types/game';
import { StationBuildingArt } from './illustrations/StationBuildingArt';
import { GuideOwlImage, TownBackdropImage } from './illustrations/StorybookArtwork';

interface TownMapProps {
  completedStationIds: StationId[];
  onSelectStation: (stationId: StationId) => void;
}

export const TownMap: React.FC<TownMapProps> = ({
  completedStationIds,
  onSelectStation,
}) => {
  const totalStars = completedStationIds.length;
  const maxStars = STATIONS.length;
  const isAllCompleted = totalStars === maxStars;

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
      {/* Hero Town Welcome Banner */}
      <section
        aria-labelledby="town-hero-title"
        className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          {/* Left: Illustrated Town Welcome */}
          <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-amber-800">
                <MapPin className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>Pályaorientációs kaland</span>
                <span aria-hidden="true">·</span>
                <span>8 játékos állomás</span>
              </div>

              <h1
                id="town-hero-title"
                className="font-display text-3xl sm:text-4xl lg:text-[2.65rem] font-extrabold text-slate-900 leading-[1.15] text-balance"
              >
                Üdvözöllek a Mesterségek birodalmában!
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                Járd be a város nyolc különleges épületét tetszőleges sorrendben! Minden
                állomáson izgalmas feladatok várnak a régi és mai szakmákról. Ha sikeresen
                teljesítesz egy állomást, egy aranycsillagot kapsz jutalmul.
              </p>
            </div>

            {/* Guide Mascot Callout + Star Progress Track */}
            <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-5 border-t border-slate-100">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border border-slate-200 bg-amber-50 shrink-0">
                  <GuideOwlImage className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="font-display text-base sm:text-lg font-bold text-slate-900">
                    Bagoly Mester tanácsa
                  </p>
                  <p className="text-sm sm:text-base text-slate-600">
                    Kattints vagy érints meg bármelyik épületet az induláshoz!
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Scenic Valley Illustration + Contrast Overlay */}
          <div className="lg:col-span-5 relative min-h-[220px] sm:min-h-[260px] lg:min-h-full bg-emerald-50">
            <TownBackdropImage className="w-full h-full object-cover lg:absolute lg:inset-0" />
            <div
              className="absolute inset-0 bg-gradient-to-t from-slate-900/75 via-slate-900/20 to-transparent"
              aria-hidden="true"
            />
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 text-white">
              <p className="text-xs sm:text-sm font-medium text-amber-200">
                Városi Csillaggyűjtő
              </p>
              <div className="mt-1.5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-1.5" aria-hidden="true">
                  {STATIONS.map((station) => {
                    const earned = completedStationIds.includes(station.id);
                    return (
                      <Star
                        key={station.id}
                        className={`w-6 h-6 transition-transform duration-200 ${
                          earned
                            ? 'fill-amber-400 text-amber-300 scale-105'
                            : 'fill-white/20 text-white/60'
                        }`}
                      />
                    );
                  })}
                </div>
                <span className="font-display text-lg font-bold tabular-nums whitespace-nowrap">
                  {totalStars} / {maxStars}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Full Completion Celebration Banner */}
      {isAllCompleted && (
        <section
          aria-live="polite"
          className="rounded-2xl bg-amber-50 border border-amber-300 p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0">
              <Award className="w-7 h-7" aria-hidden="true" />
            </div>
            <div>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-900">
                Gratulálok! Minden állomást teljesítettél!
              </h2>
              <p className="text-base text-slate-700">
                Mind a {maxStars} aranycsillagot megszerezted a Mesterségek birodalmában.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Interactive 8-Building Town Map */}
      <section aria-labelledby="town-buildings-heading" className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <h2
              id="town-buildings-heading"
              className="font-display text-2xl sm:text-3xl font-bold text-slate-900"
            >
              A város állomásai
            </h2>
            <p className="mt-1 text-base text-slate-600">
              Válassz ki egy épületet, és indulhat a felfedezés!
            </p>
          </div>
          <p className="text-sm font-medium text-slate-500 tabular-nums">
            Teljesítve: {totalStars} / {maxStars} állomás
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {STATIONS.map((station) => {
            const isDone = completedStationIds.includes(station.id);

            return (
              <button
                key={station.id}
                type="button"
                onClick={() => onSelectStation(station.id)}
                className={`town-card-hover group text-left rounded-3xl border bg-white p-5 sm:p-6 flex flex-col justify-between gap-4 shadow-sm hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 cursor-pointer ${
                  isDone ? 'border-amber-300' : 'border-slate-200 hover:border-slate-300'
                } ${station.theme.ringColor}`}
                aria-label={`${station.orderLabel} ${station.title} – ${
                  isDone ? 'Teljesítve, csillag megszerezve' : 'Felfedezésre vár'
                }`}
              >
                {/* Top Metadata + Star Status */}
                <div className="w-full space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 text-sm font-semibold text-slate-500 truncate">
                      <span className="tabular-nums text-slate-800">{station.orderLabel}</span>
                      <span aria-hidden="true">·</span>
                      <span className="truncate">{station.districtLabel}</span>
                    </div>

                    <div
                      className={`flex items-center gap-1 text-xs font-bold shrink-0 ${
                        isDone ? 'text-amber-700' : 'text-slate-400'
                      }`}
                    >
                      <Star
                        className={`w-5 h-5 ${
                          isDone
                            ? 'fill-amber-400 text-amber-500'
                            : 'fill-slate-100 text-slate-300'
                        }`}
                        aria-hidden="true"
                      />
                    </div>
                  </div>

                  {/* Building Illustration */}
                  <div
                    className={`w-full rounded-2xl ${station.theme.surfaceTint} border ${station.theme.borderTint} py-4 px-3 flex flex-col items-center justify-center`}
                  >
                    <StationBuildingArt
                      stationId={station.id}
                      className="w-32 h-24 sm:w-36 sm:h-28 transition-transform duration-200 group-hover:scale-105"
                    />
                    <span className="mt-1.5 text-xs font-semibold text-slate-600">
                      {station.buildingName}
                    </span>
                  </div>

                  {/* Title & Short Teaser */}
                  <div className="space-y-1.5">
                    <h3 className="font-display text-xl font-bold text-slate-900 leading-snug text-balance group-hover:text-slate-950">
                      {station.title}
                    </h3>
                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                      {station.shortDescription}
                    </p>
                  </div>
                </div>

                {/* Bottom Interactive Affordance Bar */}
                <div className="w-full pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  {isDone ? (
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700">
                      <CheckCircle2 className="w-4 h-4 shrink-0" aria-hidden="true" />
                      <span>Csillag megszerezve</span>
                    </span>
                  ) : (
                    <span className="text-sm font-medium text-slate-500">
                      Felfedezésre vár
                    </span>
                  )}

                  <span
                    className={`inline-flex items-center gap-1 text-sm font-bold ${station.theme.accentText} whitespace-nowrap shrink-0`}
                  >
                    <span>Belépés</span>
                    <ChevronRight
                      className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </section>
    </main>
  );
};
