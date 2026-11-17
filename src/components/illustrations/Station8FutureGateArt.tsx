import React, { useState } from 'react';
import { Sparkles, Star } from 'lucide-react';
import { DreamProfessionId, FinalQuizArtId } from '../../data/station8FutureGate';

interface OwlImageProps {
  className?: string;
}

export const GoldenGateOwlImage: React.FC<OwlImageProps> = ({ className = '' }) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-amber-100 via-yellow-50 to-sky-100 text-amber-800 ${className}`}
        aria-label="Bagoly Mester a Jövő Aranykapujánál"
      >
        <Star className="w-12 h-12 fill-amber-400 text-amber-500" aria-hidden="true" />
      </div>
    );
  }

  return (
    <img
      src="/src/assets/images/guide_owl_golden_gate_1794945288596.jpg"
      alt="Bagoly Mester a nyolc csillagos Jövő Aranykapuja előtt"
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
};

export const OpenGateOwlImage: React.FC<OwlImageProps> = ({ className = '' }) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-amber-100 via-amber-50 to-emerald-100 text-amber-800 ${className}`}
        aria-label="Bagoly Mester a kitárult Jövő Kapuja előtt"
      >
        <Sparkles className="w-12 h-12 text-amber-600" aria-hidden="true" />
      </div>
    );
  }

  return (
    <img
      src="/src/assets/images/guide_owl_gate_open_1794945288695.jpg"
      alt="Bagoly Mester a kitárult aranykapuban, a nyolcadik aranycsillaggal"
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
};

export const FinalQuizArt: React.FC<{ artId: FinalQuizArtId; className?: string }> = ({
  artId,
  className = 'w-20 h-20',
}) => {
  switch (artId) {
    case 'miller':
      return (
        <svg viewBox="0 0 80 80" className={className} fill="none" aria-hidden="true">
          <rect x="8" y="8" width="64" height="64" rx="18" fill="#FEF3C7" />
          <path d="M28 60L33 28H47L52 60H28Z" fill="#D97706" stroke="#78350F" strokeWidth="2.5" />
          <path d="M31 28C31 21 49 21 49 28H31Z" fill="#92400E" />
          <path d="M40 28L22 14M40 28L58 14M40 28L22 42M40 28L58 42" stroke="#92400E" strokeWidth="3.5" strokeLinecap="round" />
          <circle cx="40" cy="28" r="4" fill="#FDE68A" stroke="#78350F" strokeWidth="2" />
          <rect x="36" y="45" width="8" height="15" rx="4" fill="#FEF3C7" stroke="#78350F" strokeWidth="2" />
        </svg>
      );
    case 'mason':
      return (
        <svg viewBox="0 0 80 80" className={className} fill="none" aria-hidden="true">
          <rect x="8" y="8" width="64" height="64" rx="18" fill="#FFEDD5" />
          <rect x="16" y="46" width="22" height="12" rx="2" fill="#EA580C" stroke="#7C2D12" strokeWidth="2" />
          <rect x="40" y="46" width="22" height="12" rx="2" fill="#F97316" stroke="#7C2D12" strokeWidth="2" />
          <rect x="28" y="34" width="22" height="12" rx="2" fill="#FB923C" stroke="#7C2D12" strokeWidth="2" />
          <path d="M22 25L41 25L35 16L22 25Z" fill="#94A3B8" stroke="#334155" strokeWidth="2" strokeLinejoin="round" />
          <path d="M41 25H54" stroke="#78350F" strokeWidth="4" strokeLinecap="round" />
        </svg>
      );
    case 'bakery':
      return (
        <svg viewBox="0 0 80 80" className={className} fill="none" aria-hidden="true">
          <rect x="8" y="8" width="64" height="64" rx="18" fill="#FEF9C3" />
          <ellipse cx="40" cy="48" rx="22" ry="13" fill="#D97706" stroke="#78350F" strokeWidth="2.5" />
          <path d="M26 45C31 41 34 41 37 44M41 43C45 39 49 40 53 44" stroke="#FEF3C7" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M28 29C28 24 31 23 31 19M40 27C40 22 43 21 43 17M51 29C51 24 54 23 54 19" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );
    case 'watchmaker':
      return (
        <svg viewBox="0 0 80 80" className={className} fill="none" aria-hidden="true">
          <rect x="8" y="8" width="64" height="64" rx="18" fill="#E0E7FF" />
          <rect x="35" y="14" width="10" height="7" rx="2" fill="#F59E0B" stroke="#78350F" strokeWidth="2" />
          <circle cx="40" cy="43" r="20" fill="#FFFBEB" stroke="#D97706" strokeWidth="4" />
          <path d="M40 43V30M40 43L50 47" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
          <circle cx="40" cy="43" r="3" fill="#D97706" />
        </svg>
      );
    case 'firefighter':
      return (
        <svg viewBox="0 0 80 80" className={className} fill="none" aria-hidden="true">
          <rect x="8" y="8" width="64" height="64" rx="18" fill="#FEE2E2" />
          <path d="M20 46C20 31 29 22 40 22C51 22 60 31 60 46H20Z" fill="#DC2626" stroke="#7F1D1D" strokeWidth="2.5" />
          <path d="M15 46H65L62 53H18L15 46Z" fill="#B91C1C" stroke="#7F1D1D" strokeWidth="2.5" strokeLinejoin="round" />
          <rect x="35" y="29" width="10" height="12" rx="3" fill="#FDE047" stroke="#78350F" strokeWidth="2" />
        </svg>
      );
    case 'potter':
      return (
        <svg viewBox="0 0 80 80" className={className} fill="none" aria-hidden="true">
          <rect x="8" y="8" width="64" height="64" rx="18" fill="#F5EFE6" />
          <path d="M31 21H49L46 28C54 33 56 49 48 59H32C24 49 26 33 34 28L31 21Z" fill="#C2410C" stroke="#7C2D12" strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M49 32C58 32 58 46 50 47" stroke="#7C2D12" strokeWidth="3" strokeLinecap="round" />
          <path d="M29 42H51" stroke="#FDBA74" strokeWidth="2.5" />
        </svg>
      );
    case 'vet':
      return (
        <svg viewBox="0 0 80 80" className={className} fill="none" aria-hidden="true">
          <rect x="8" y="8" width="64" height="64" rx="18" fill="#DCFCE7" />
          <circle cx="28" cy="30" r="5" fill="#16A34A" />
          <circle cx="40" cy="24" r="5" fill="#16A34A" />
          <circle cx="52" cy="30" r="5" fill="#16A34A" />
          <path d="M40 37C31 37 25 45 27 53C29 59 35 60 40 58C45 60 51 59 53 53C55 45 49 37 40 37Z" fill="#16A34A" />
          <path d="M40 43V53M35 48H45" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
    case 'skills':
      return (
        <svg viewBox="0 0 80 80" className={className} fill="none" aria-hidden="true">
          <rect x="8" y="8" width="64" height="64" rx="18" fill="#FEF3C7" />
          <path
            d="M40 16L46.5 30.2L62 32.1L50.5 42.9L53.6 58.3L40 50.8L26.4 58.3L29.5 42.9L18 32.1L33.5 30.2L40 16Z"
            fill="#FBBF24"
            stroke="#B45309"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <circle cx="40" cy="40" r="6" fill="#FFFBEB" />
        </svg>
      );
  }
};

export const DreamProfessionArt: React.FC<{ id: DreamProfessionId; className?: string }> = ({
  id,
  className = 'w-14 h-14',
}) => {
  switch (id) {
    case 'tanito':
      return (
        <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden="true">
          <rect x="8" y="12" width="48" height="32" rx="5" fill="#0F766E" stroke="#134E4A" strokeWidth="2.5" />
          <path d="M16 24H38M16 32H30" stroke="#FDE68A" strokeWidth="3" strokeLinecap="round" />
          <path d="M18 48H46" stroke="#92400E" strokeWidth="4" strokeLinecap="round" />
          <path d="M45 20L52 13L54 15L47 22Z" fill="#F59E0B" />
        </svg>
      );
    case 'orvos':
      return (
        <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden="true">
          <rect x="12" y="18" width="40" height="34" rx="7" fill="#FFFFFF" stroke="#E11D48" strokeWidth="2.5" />
          <path d="M24 18V13H40V18" stroke="#E11D48" strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M32 26V44M23 35H41" stroke="#E11D48" strokeWidth="5" strokeLinecap="round" />
        </svg>
      );
    case 'allatorvos':
      return (
        <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden="true">
          <circle cx="21" cy="23" r="4.5" fill="#059669" />
          <circle cx="32" cy="18" r="4.5" fill="#059669" />
          <circle cx="43" cy="23" r="4.5" fill="#059669" />
          <path d="M32 29C24 29 19 36 21 43C23 49 28 50 32 48C36 50 41 49 43 43C45 36 40 29 32 29Z" fill="#059669" />
          <path d="M32 34V43M27.5 38.5H36.5" stroke="#FFFFFF" strokeWidth="2.8" strokeLinecap="round" />
        </svg>
      );
    case 'tuzolto':
      return (
        <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden="true">
          <path d="M15 39C15 26 23 18 32 18C41 18 49 26 49 39H15Z" fill="#EA580C" stroke="#9A3412" strokeWidth="2.5" />
          <path d="M11 39H53L50 45H14L11 39Z" fill="#C2410C" stroke="#9A3412" strokeWidth="2.5" />
          <rect x="28" y="24" width="8" height="10" rx="2.5" fill="#FDE047" />
        </svg>
      );
    case 'rendor':
      return (
        <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden="true">
          <path d="M32 12L49 19V33C49 43 41 50 32 53C23 50 15 43 15 33V19L32 12Z" fill="#3730A3" stroke="#1E1B4B" strokeWidth="2.5" />
          <path d="M32 22L35 29L42 30L37 35L38 42L32 38.5L26 42L27 35L22 30L29 29L32 22Z" fill="#FACC15" />
        </svg>
      );
    case 'pek':
      return (
        <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden="true">
          <path d="M19 30C15 29 14 21 20 19C22 13 31 12 36 16C43 13 50 20 46 28C49 31 46 35 43 35H21C18 35 16 32 19 30Z" fill="#FFFFFF" stroke="#B45309" strokeWidth="2.5" />
          <ellipse cx="32" cy="46" rx="16" ry="8" fill="#D97706" stroke="#78350F" strokeWidth="2.5" />
        </svg>
      );
    case 'szakacs':
      return (
        <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden="true">
          <rect x="15" y="32" width="34" height="18" rx="4" fill="#64748B" stroke="#334155" strokeWidth="2.5" />
          <path d="M12 35H15M49 35H52" stroke="#334155" strokeWidth="3" strokeLinecap="round" />
          <path d="M23 25C23 21 26 20 26 16M32 24C32 20 35 19 35 15M41 25C41 21 44 20 44 16" stroke="#EA580C" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );
    case 'kertesz':
      return (
        <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden="true">
          <path d="M32 50V26" stroke="#15803D" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M32 38C22 38 18 31 20 25C26 25 32 30 32 38Z" fill="#4ADE80" stroke="#15803D" strokeWidth="2" />
          <path d="M32 34C42 34 46 27 44 21C38 21 32 26 32 34Z" fill="#22C55E" stroke="#15803D" strokeWidth="2" />
          <circle cx="32" cy="20" r="6" fill="#FACC15" stroke="#CA8A04" strokeWidth="2" />
          <rect x="22" y="49" width="20" height="5" rx="2.5" fill="#B45309" />
        </svg>
      );
    case 'programozo':
      return (
        <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden="true">
          <rect x="12" y="15" width="40" height="28" rx="4" fill="#1E1B4B" stroke="#6D28D9" strokeWidth="2.5" />
          <path d="M23 25L18 29L23 33M41 25L46 29L41 33M34 23L30 35" stroke="#A78BFA" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M9 48H55" stroke="#6D28D9" strokeWidth="4" strokeLinecap="round" />
        </svg>
      );
    case 'festomuvesz':
      return (
        <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden="true">
          <path d="M32 14C20 14 13 23 13 33C13 43 21 50 31 50C35 50 37 47 36 44C35 41 38 39 42 39C48 39 52 34 52 28C52 19 43 14 32 14Z" fill="#FDE68A" stroke="#92400E" strokeWidth="2.5" />
          <circle cx="24" cy="27" r="3.5" fill="#EF4444" />
          <circle cx="33" cy="23" r="3.5" fill="#3B82F6" />
          <circle cx="42" cy="27" r="3.5" fill="#10B981" />
          <circle cx="23" cy="37" r="3.5" fill="#A855F7" />
        </svg>
      );
    case 'autoszerelo':
      return (
        <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden="true">
          <path d="M44 14C39 14 35 18 35 23C35 24 35.3 25 35.6 26L18 43.6C16.4 45.2 16.4 47.8 18 49.4C19.6 51 22.2 51 23.8 49.4L41.4 31.8C42.4 32.1 43.4 32.4 44.5 32.4C49.5 32.4 53.5 28.4 53.5 23.4C53.5 21.8 53 20.3 52.2 19L46.5 24.7L42.3 20.5L48 14.8C46.8 14.3 45.4 14 44 14Z" fill="#94A3B8" stroke="#334155" strokeWidth="2.5" strokeLinejoin="round" />
        </svg>
      );
    case 'pilota':
      return (
        <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden="true">
          <path d="M12 36L52 20L42 46L31 38L23 44L25 35L12 36Z" fill="#0284C7" stroke="#075985" strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M25 35L52 20" stroke="#BAE6FD" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
  }
};

export const AnimatedGoldenGateIllustration: React.FC<{
  isOpen: boolean;
}> = ({ isOpen }) => {
  return (
    <div className="relative w-full max-w-md mx-auto rounded-3xl border border-amber-200 bg-gradient-to-b from-sky-100 via-amber-50 to-emerald-50 p-5 sm:p-6 overflow-hidden shadow-xs">
      {/* 8 Crown Stars above the gate */}
      <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-4" aria-hidden="true">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => {
          const lit = num < 8 || isOpen;
          return (
            <Star
              key={num}
              className={`w-6 h-6 sm:w-7 sm:h-7 transition-all duration-500 motion-reduce:transition-none ${
                lit
                  ? 'fill-amber-400 text-amber-500 scale-105'
                  : 'fill-amber-100 text-amber-300'
              }`}
            />
          );
        })}
      </div>

      {/* Arch + Doors */}
      <div className="relative mx-auto w-64 sm:w-72 h-52 rounded-t-[999px] border-[6px] border-amber-500 bg-gradient-to-b from-amber-200 via-yellow-100 to-sky-100 overflow-hidden shadow-inner flex items-center justify-center">
        {/* Bright future path behind the doors */}
        <div
          className={`flex flex-col items-center justify-center text-center px-4 transition-opacity duration-700 motion-reduce:transition-none ${
            isOpen ? 'opacity-100' : 'opacity-20'
          }`}
        >
          <div className="w-16 h-16 rounded-full bg-amber-400/30 border-2 border-amber-400 flex items-center justify-center mb-2">
            <Star className="w-10 h-10 fill-amber-400 text-amber-600" aria-hidden="true" />
          </div>
          <span className="font-display text-sm font-extrabold text-amber-900">
            8. Aranycsillag
          </span>
        </div>

        {/* Left Golden Gate Door */}
        <div
          className={`absolute inset-y-0 left-0 w-1/2 bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 border-r-2 border-amber-700/40 transition-transform duration-700 ease-out motion-reduce:transition-none flex items-center justify-end pr-3 ${
            isOpen ? '-translate-x-[88%]' : 'translate-x-0'
          }`}
        >
          <div className="w-3.5 h-3.5 rounded-full bg-amber-100 border-2 border-amber-800" />
        </div>

        {/* Right Golden Gate Door */}
        <div
          className={`absolute inset-y-0 right-0 w-1/2 bg-gradient-to-bl from-amber-400 via-amber-500 to-amber-600 border-l-2 border-amber-700/40 transition-transform duration-700 ease-out motion-reduce:transition-none flex items-center justify-start pl-3 ${
            isOpen ? 'translate-x-[88%]' : 'translate-x-0'
          }`}
        >
          <div className="w-3.5 h-3.5 rounded-full bg-amber-100 border-2 border-amber-800" />
        </div>
      </div>

      {/* Stone Path Base */}
      <div className="mx-auto w-72 sm:w-80 h-3 rounded-full bg-amber-300/70 mt-0.5" />
    </div>
  );
};
