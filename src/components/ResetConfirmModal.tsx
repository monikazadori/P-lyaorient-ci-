import React, { useEffect } from 'react';
import { RotateCcw, X } from 'lucide-react';

interface ResetConfirmModalProps {
  isOpen: boolean;
  totalStars: number;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ResetConfirmModal: React.FC<ResetConfirmModalProps> = ({
  isOpen,
  totalStars,
  onConfirm,
  onCancel,
}) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCancel();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onCancel]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="reset-modal-title"
    >
      <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
            <RotateCcw className="w-6 h-6" aria-hidden="true" />
          </div>
          <button
            type="button"
            onClick={onCancel}
            aria-label="Bezárás"
            className="w-12 h-12 -mr-2 -mt-2 rounded-xl flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" aria-hidden="true" />
          </button>
        </div>

        <h2
          id="reset-modal-title"
          className="mt-4 font-display text-2xl font-bold text-slate-900 text-balance"
        >
          Újrakezded a kalandot?
        </h2>

        <p className="mt-2 text-base text-slate-600 leading-relaxed">
          {totalStars > 0
            ? `Jelenleg ${totalStars} csillagod van. Ha újrakezded a játékot, minden eddig összegyűjtött csillag törlődik, és újra tiszta lappal indulhatsz.`
            : 'Még nincs összegyűjtött csillagod. Biztosan alaphelyzetbe állítod a játékot?'}
        </p>

        <div className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="min-h-[48px] px-5 py-3 rounded-xl border border-slate-300 bg-white text-slate-800 font-semibold text-base hover:bg-slate-50 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Mégsem
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="min-h-[48px] px-5 py-3 rounded-xl bg-amber-600 text-white font-semibold text-base hover:bg-amber-700 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Igen, újrakezdem
          </button>
        </div>
      </div>
    </div>
  );
};
