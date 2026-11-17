import React from 'react';
import { ArrowLeft, Compass, RotateCcw, Star } from 'lucide-react';

interface TownHeaderProps {
  totalStars: number;
  maxStars: number;
  isInStation: boolean;
  onGoHome: () => void;
  onRequestReset: () => void;
}

export const TownHeader: React.FC<TownHeaderProps> = ({
  totalStars,
  maxStars,
  isInStation,
  onGoHome,
  onRequestReset,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4 sm:gap-8">
        {/* Zone 1: Single-line brand mark */}
        <button
          type="button"
          onClick={onGoHome}
          className="flex items-center gap-3 text-left min-h-[48px] px-2 -ml-2 rounded-xl hover:bg-slate-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 whitespace-nowrap shrink-0 cursor-pointer"
        >
          <span className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
            <Compass className="w-6 h-6" aria-hidden="true" />
          </span>
          <span className="font-display text-lg sm:text-xl font-bold tracking-tight text-slate-900 truncate max-w-[200px] sm:max-w-none">
            Mesterségek birodalma
          </span>
        </button>

        {/* Zone 2: Star counter (clean unboxed typography with tabular numerals) */}
        <div
          className="flex items-center gap-2 text-sm sm:text-base font-semibold text-slate-700 whitespace-nowrap shrink-0"
          aria-label={`Összegyűjtött csillagok: ${totalStars} a ${maxStars}-ból`}
        >
          <Star
            className={`w-5 h-5 sm:w-6 sm:h-6 ${
              totalStars > 0 ? 'fill-amber-400 text-amber-500' : 'text-slate-300 fill-slate-100'
            }`}
            aria-hidden="true"
          />
          <span className="tabular-nums text-slate-900 font-bold">{totalStars}</span>
          <span className="text-slate-400" aria-hidden="true">/</span>
          <span className="tabular-nums text-slate-600">{maxStars} csillag</span>
        </div>

        {/* Zone 3: Single primary action depending on context */}
        <div className="flex items-center shrink-0">
          {isInStation ? (
            <button
              type="button"
              onClick={onGoHome}
              className="inline-flex items-center gap-2 min-h-[48px] px-4 sm:px-5 py-2.5 rounded-xl bg-slate-900 text-white text-sm sm:text-base font-semibold hover:bg-slate-800 active:scale-[0.99] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" aria-hidden="true" />
              <span>Vissza a városba</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={onRequestReset}
              className="inline-flex items-center gap-2 min-h-[48px] px-4 sm:px-5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-800 text-sm sm:text-base font-semibold hover:bg-slate-100 active:scale-[0.99] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600" aria-hidden="true" />
              <span>Újrakezdés</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
