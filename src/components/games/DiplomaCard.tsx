import React from 'react';
import { Award, Star } from 'lucide-react';
import { OpenGateOwlImage } from '../illustrations/Station8FutureGateArt';

interface DiplomaCardProps {
  studentName: string;
  chosenProfessionLabel?: string;
  starCount: number;
  showOnScreen?: boolean;
  diplomaRef?: React.RefObject<HTMLDivElement | null>;
}

export const DiplomaCard: React.FC<DiplomaCardProps> = ({
  studentName,
  chosenProfessionLabel,
  starCount,
  showOnScreen = true,
  diplomaRef,
}) => {
  return (
    <div
      id="printable-diploma"
      ref={diplomaRef}
      className={`${
        showOnScreen ? 'flex' : 'hidden print:flex'
      } flex-col justify-between w-full rounded-3xl border-[6px] border-amber-500 bg-[#FFFDF6] p-4 sm:p-6 print:p-4 shadow-md print:shadow-none`}
    >
      <div className="flex-1 flex flex-col justify-between rounded-2xl border-2 border-amber-300 bg-white/90 px-6 py-6 sm:px-10 sm:py-8 print:px-8 print:py-5">
        {/* Top Stars & Ribbon Header */}
        <div className="text-center space-y-3 print:space-y-2">
          <div
            className="flex items-center justify-center gap-2 sm:gap-3"
            aria-label="Nyolc aranycsillag"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
              <Star
                key={num}
                className="w-6 h-6 sm:w-8 sm:h-8 print:w-7 print:h-7 fill-amber-400 text-amber-500"
                aria-hidden="true"
              />
            ))}
          </div>

          <p className="font-display text-xs sm:text-sm font-bold uppercase tracking-[0.22em] text-amber-700">
            Oklevél
          </p>

          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl print:text-3xl font-extrabold tracking-wide text-slate-900 text-balance">
            A MESTERSÉGEK BIRODALMÁNAK FELFEDEZŐJE
          </h2>
        </div>

        {/* Center Body with Bagoly Mester */}
        <div className="my-6 print:my-3 grid grid-cols-1 md:grid-cols-12 print:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-4 print:col-span-4 flex justify-center">
            <div className="w-36 h-36 sm:w-44 sm:h-44 print:w-40 print:h-40 rounded-3xl overflow-hidden border-4 border-amber-300 bg-amber-50 shadow-xs">
              <OpenGateOwlImage className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="md:col-span-8 print:col-span-8 text-center md:text-left print:text-left space-y-4 print:space-y-3">
            <p className="text-lg sm:text-xl lg:text-2xl print:text-xl text-slate-800 leading-relaxed font-medium">
              Ez az oklevél igazolja, hogy{' '}
              <span className="inline-block px-2 font-display font-extrabold text-amber-900 border-b-2 border-amber-400">
                {studentName.trim() || '____________________'}
              </span>{' '}
              sikeresen bejárta a Mesterségek birodalmának nyolc állomását,
              sokféle foglalkozást megismert, és bátorsággal, kitartással
              teljesítette a próbákat.
            </p>

            {chosenProfessionLabel && (
              <p className="text-base sm:text-lg print:text-base text-emerald-900 font-semibold">
                Választott álommesterség: {chosenProfessionLabel}
              </p>
            )}
          </div>
        </div>

        {/* Bottom Seal & Program Footer */}
        <div className="pt-4 print:pt-3 border-t border-amber-200 flex flex-col sm:flex-row print:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 text-amber-900 font-display font-bold text-base sm:text-lg">
            <Award className="w-6 h-6 text-amber-600 shrink-0" aria-hidden="true" />
            <span>Mesterségek birodalma – Pályaorientációs kaland</span>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-300 bg-amber-50 text-amber-900 font-display font-bold text-sm tabular-nums">
            <Star className="w-4 h-4 fill-amber-400 text-amber-500" aria-hidden="true" />
            <span>Bagoly Mester pecsétjével · {starCount} / 8 csillag</span>
          </div>
        </div>
      </div>
    </div>
  );
};
