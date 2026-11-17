import React, { useState } from 'react';
import { Mail, Star } from 'lucide-react';
import { Station5ProfessionId } from '../../data/station5MysteryNames';

interface OwlImageProps {
  className?: string;
}

export const PostOfficeOwlImage: React.FC<OwlImageProps> = ({
  className = '',
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br from-indigo-100 to-amber-100 text-indigo-800 ${className}`}
        aria-label="Bagoly Mester a Rejtélyes Postahivatalban"
      >
        <Mail className="w-12 h-12" aria-hidden="true" />
      </div>
    );
  }

  return (
    <img
      src="/src/assets/images/guide_owl_postoffice_1794943509931.jpg"
      alt="Bagoly Mester a régi postahivatalban titkos levelekkel, pecsétekkel és nagyítóval"
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
};

export const CipherStarOwlImage: React.FC<OwlImageProps> = ({
  className = '',
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br from-amber-100 to-indigo-100 text-amber-600 ${className}`}
        aria-label="Bagoly Mester nagy aranycsillaggal és megfejtett levéllel"
      >
        <Star className="w-12 h-12 fill-amber-400" aria-hidden="true" />
      </div>
    );
  }

  return (
    <img
      src="/src/assets/images/guide_owl_cipher_star_1794943510080.jpg"
      alt="Bagoly Mester nagy aranycsillaggal és megfejtett titkos levéllel"
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
};

interface Station5ProfessionArtProps {
  professionId: Station5ProfessionId;
  className?: string;
}

export const Station5ProfessionArt: React.FC<Station5ProfessionArtProps> = ({
  professionId,
  className = 'w-20 h-20',
}) => {
  switch (professionId) {
    case 'pek':
      return (
        <svg viewBox="0 0 96 96" className={className} aria-hidden="true">
          <circle cx="48" cy="48" r="44" fill="#FEF3C7" stroke="#1E293B" strokeWidth="2.4" />
          {/* Baker hat */}
          <path d="M28 40 C20 26, 36 16, 48 22 C60 16, 76 26, 68 40 Z" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2.4" />
          <rect x="30" y="38" width="36" height="9" rx="2" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2.4" />
          {/* Golden bread loaf */}
          <ellipse cx="48" cy="65" rx="24" ry="12" fill="#D97706" stroke="#1E293B" strokeWidth="2.4" />
          <path d="M36 59 L42 66 M47 57 L53 65 M58 59 L63 65" stroke="#FEF3C7" strokeWidth="2.4" strokeLinecap="round" />
        </svg>
      );

    case 'orvos':
      return (
        <svg viewBox="0 0 96 96" className={className} aria-hidden="true">
          <circle cx="48" cy="48" r="44" fill="#E0F2FE" stroke="#1E293B" strokeWidth="2.4" />
          {/* Medical bag */}
          <rect x="22" y="34" width="52" height="38" rx="6" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2.4" />
          <path d="M36 34 V24 H60 V34" fill="none" stroke="#1E293B" strokeWidth="2.6" />
          <circle cx="48" cy="53" r="13" fill="#FEE2E2" />
          <rect x="45" y="44" width="6" height="18" rx="1" fill="#EF4444" />
          <rect x="39" y="50" width="18" height="6" rx="1" fill="#EF4444" />
        </svg>
      );

    case 'postas':
      return (
        <svg viewBox="0 0 96 96" className={className} aria-hidden="true">
          <circle cx="48" cy="48" r="44" fill="#DCFCE7" stroke="#1E293B" strokeWidth="2.4" />
          {/* Sealed envelope & post horn / stamp */}
          <rect x="18" y="32" width="60" height="38" rx="5" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2.4" />
          <path d="M18 34 L48 54 L78 34" fill="none" stroke="#16A34A" strokeWidth="2.6" strokeLinejoin="round" />
          <circle cx="48" cy="54" r="7" fill="#DC2626" stroke="#1E293B" strokeWidth="2" />
          <rect x="60" y="38" width="11" height="11" rx="1.5" fill="#FACC15" stroke="#1E293B" strokeWidth="1.6" />
        </svg>
      );

    case 'kertesz':
      return (
        <svg viewBox="0 0 96 96" className={className} aria-hidden="true">
          <circle cx="48" cy="48" r="44" fill="#DCFCE7" stroke="#1E293B" strokeWidth="2.4" />
          {/* Watering can + sprouting flower */}
          <rect x="20" y="42" width="30" height="24" rx="4" fill="#16A34A" stroke="#1E293B" strokeWidth="2.4" />
          <path d="M50 56 L68 40 L72 44 L54 62 Z" fill="#22C55E" stroke="#1E293B" strokeWidth="2" />
          <path d="M18 42 C12 42, 12 58, 20 58" fill="none" stroke="#1E293B" strokeWidth="2.6" />
          <line x1="68" y1="74" x2="68" y2="54" stroke="#15803D" strokeWidth="3.5" />
          <circle cx="68" cy="50" r="6" fill="#EC4899" stroke="#1E293B" strokeWidth="2" />
          <circle cx="68" cy="50" r="2.5" fill="#FACC15" />
        </svg>
      );

    case 'szakacs':
      return (
        <svg viewBox="0 0 96 96" className={className} aria-hidden="true">
          <circle cx="48" cy="48" r="44" fill="#FFE4E6" stroke="#1E293B" strokeWidth="2.4" />
          {/* Cooking pot with steam and wooden spoon */}
          <rect x="24" y="44" width="48" height="28" rx="5" fill="#E11D48" stroke="#1E293B" strokeWidth="2.4" />
          <path d="M18 48 H24 M72 48 H78" stroke="#1E293B" strokeWidth="3.2" strokeLinecap="round" />
          <path d="M22 44 C26 34, 70 34, 74 44 Z" fill="#CBD5E1" stroke="#1E293B" strokeWidth="2.2" />
          <circle cx="48" cy="33" r="4" fill="#64748B" stroke="#1E293B" strokeWidth="2" />
          <path d="M36 26 Q34 20 38 16 M48 24 Q46 18 50 14 M60 26 Q58 20 62 16" fill="none" stroke="#94A3B8" strokeWidth="2.4" strokeLinecap="round" />
        </svg>
      );

    case 'fodrasz':
      return (
        <svg viewBox="0 0 96 96" className={className} aria-hidden="true">
          <circle cx="48" cy="48" r="44" fill="#FCE7F3" stroke="#1E293B" strokeWidth="2.4" />
          {/* Scissors and comb */}
          <path d="M26 24 L54 58 M58 24 L30 58" stroke="#64748B" strokeWidth="5" strokeLinecap="round" />
          <circle cx="29" cy="66" r="8" fill="none" stroke="#DB2777" strokeWidth="4.5" />
          <circle cx="53" cy="66" r="8" fill="none" stroke="#DB2777" strokeWidth="4.5" />
          <rect x="64" y="24" width="12" height="44" rx="2.5" fill="#F59E0B" stroke="#1E293B" strokeWidth="2" />
          <path d="M64 31 H70 M64 38 H70 M64 45 H70 M64 52 H70 M64 59 H70" stroke="#1E293B" strokeWidth="2" />
        </svg>
      );

    case 'tanito':
      return (
        <svg viewBox="0 0 96 96" className={className} aria-hidden="true">
          <circle cx="48" cy="48" r="44" fill="#EEF2FF" stroke="#1E293B" strokeWidth="2.4" />
          {/* Chalkboard & book */}
          <rect x="18" y="22" width="60" height="36" rx="4" fill="#15803D" stroke="#92400E" strokeWidth="3.5" />
          <path d="M28 36 H56 M28 45 H46" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
          {/* Open book */}
          <path d="M24 62 Q36 56 48 62 Q60 56 72 62 V78 Q60 72 48 78 Q36 72 24 78 Z" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2.2" />
        </svg>
      );

    case 'fazekas':
      return (
        <svg viewBox="0 0 96 96" className={className} aria-hidden="true">
          <circle cx="48" cy="48" r="44" fill="#FFEDD5" stroke="#1E293B" strokeWidth="2.4" />
          {/* Terracotta vase on potter's wheel */}
          <ellipse cx="48" cy="72" rx="24" ry="6" fill="#64748B" stroke="#1E293B" strokeWidth="2.2" />
          <path d="M38 26 H58 L54 34 C66 42, 66 64, 56 68 H40 C30 64, 30 42, 42 34 Z" fill="#C2410C" stroke="#1E293B" strokeWidth="2.4" />
          <path d="M36 50 Q48 56 60 50" fill="none" stroke="#FDE68A" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    case 'kovacs':
      return (
        <svg viewBox="0 0 96 96" className={className} aria-hidden="true">
          <circle cx="48" cy="48" r="44" fill="#E2E8F0" stroke="#1E293B" strokeWidth="2.4" />
          {/* Anvil and hammer */}
          <path d="M20 48 H76 L64 58 H60 V68 H68 V74 H28 V68 H36 V58 H28 Z" fill="#334155" stroke="#1E293B" strokeWidth="2.4" strokeLinejoin="round" />
          <path d="M38 42 L58 22" stroke="#92400E" strokeWidth="5" strokeLinecap="round" />
          <rect x="50" y="16" width="18" height="12" rx="2" transform="rotate(45 59 22)" fill="#64748B" stroke="#1E293B" strokeWidth="2.2" />
        </svg>
      );

    case 'mehesz':
      return (
        <svg viewBox="0 0 96 96" className={className} aria-hidden="true">
          <circle cx="48" cy="48" r="44" fill="#FEF9C3" stroke="#1E293B" strokeWidth="2.4" />
          {/* Beehive & friendly bee */}
          <path d="M32 72 C24 72, 24 56, 30 50 C28 40, 36 30, 48 30 C60 30, 68 40, 66 50 C72 56, 72 72, 64 72 Z" fill="#F59E0B" stroke="#1E293B" strokeWidth="2.4" />
          <path d="M30 48 H66 M28 60 H68" stroke="#B45309" strokeWidth="2.4" />
          <circle cx="48" cy="64" r="5" fill="#451A03" />
          {/* Little bee */}
          <ellipse cx="70" cy="28" rx="8" ry="5.5" fill="#FACC15" stroke="#1E293B" strokeWidth="2" />
          <line x1="68" y1="23" x2="68" y2="33" stroke="#1E293B" strokeWidth="2.2" />
          <ellipse cx="68" cy="21" rx="4" ry="3" fill="#E0F2FE" stroke="#1E293B" strokeWidth="1.4" />
        </svg>
      );
  }
};
