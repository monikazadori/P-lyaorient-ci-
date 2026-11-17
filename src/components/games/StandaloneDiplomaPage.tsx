import React, { useEffect, useMemo, useState } from 'react';
import { AlertCircle, Printer, X } from 'lucide-react';
import { DiplomaCard } from './DiplomaCard';

interface StandaloneDiplomaParams {
  studentName: string;
  chosenProfession: string;
  starCount: number;
}

function readStandaloneParams(): StandaloneDiplomaParams {
  if (typeof window === 'undefined') {
    return { studentName: '', chosenProfession: '', starCount: 8 };
  }
  const params = new URLSearchParams(window.location.search);
  const studentName = params.get('nev') ?? '';
  const chosenProfession = params.get('mesterseg') ?? '';
  const rawStars = Number(params.get('csillag'));
  const starCount =
    Number.isFinite(rawStars) && rawStars >= 1 && rawStars <= 8
      ? Math.round(rawStars)
      : 8;

  return {
    studentName,
    chosenProfession,
    starCount,
  };
}

export const StandaloneDiplomaPage: React.FC = () => {
  const { studentName, chosenProfession, starCount } = useMemo(
    () => readStandaloneParams(),
    []
  );
  const [printError, setPrintError] = useState(false);

  useEffect(() => {
    document.title = 'Oklevél – A Mesterségek birodalmának felfedezője';
  }, []);

  const handlePrint = () => {
    setPrintError(false);
    if (typeof window === 'undefined' || typeof window.print !== 'function') {
      setPrintError(true);
      return;
    }
    try {
      window.print();
    } catch {
      setPrintError(true);
    }
  };

  const handleCloseWindow = () => {
    window.close();
  };

  return (
    <div className="min-h-screen bg-[#F6F8F4] text-slate-900 py-6 px-4 sm:px-6 lg:px-8 print:p-0 print:bg-white">
      <div className="print-diploma-shell max-w-5xl mx-auto space-y-5 print:space-y-0">
        {/* Non-printing action bar for printing / saving as PDF */}
        <div className="no-print rounded-2xl border border-amber-200 bg-white shadow-xs p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="font-display text-lg sm:text-xl font-extrabold text-slate-900">
              Nyomtatható felfedezői oklevél
            </h1>
            <p className="text-sm text-slate-600">
              A nyomtatási ablakban kinyomtathatod fekvő A4-es lapra, vagy
              elmentheted PDF-ként.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center justify-center gap-2 min-h-[48px] px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-base hover:bg-emerald-700 transition-colors whitespace-nowrap cursor-pointer"
            >
              <Printer className="w-5 h-5 shrink-0" aria-hidden="true" />
              <span>Nyomtatás / Mentés PDF-ként</span>
            </button>

            <button
              type="button"
              onClick={handleCloseWindow}
              className="inline-flex items-center justify-center gap-2 min-h-[48px] px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-800 font-semibold text-base hover:bg-slate-50 transition-colors whitespace-nowrap cursor-pointer"
            >
              <X className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>Bezárás</span>
            </button>
          </div>
        </div>

        {printError && (
          <div
            role="alert"
            className="no-print rounded-2xl border-2 border-orange-300 bg-orange-50 p-4 flex items-start gap-3 text-orange-950"
          >
            <AlertCircle className="w-5 h-5 text-orange-700 shrink-0 mt-0.5" aria-hidden="true" />
            <p className="text-sm sm:text-base font-medium">
              A nyomtatási ablak nem indult el automatikusan. Nyisd meg a
              böngésző menüjéből a Nyomtatás funkciót (Ctrl+P vagy Cmd+P), és
              válaszd a fekvő (Landscape) A4-es elrendezést!
            </p>
          </div>
        )}

        <DiplomaCard
          studentName={studentName}
          chosenProfessionLabel={chosenProfession}
          starCount={starCount}
        />
      </div>
    </div>
  );
};
