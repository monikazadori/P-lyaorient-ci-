import React, { useState } from 'react';
import { MapPin, Star } from 'lucide-react';
import { MapWorkplaceId } from '../../data/station4Workplaces';

interface OwlImageProps {
  className?: string;
}

export const TownMapOwlImage: React.FC<OwlImageProps> = ({ className = '' }) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br from-rose-100 to-amber-100 text-rose-800 ${className}`}
        aria-label="Bagoly Mester várostérképpel"
      >
        <MapPin className="w-12 h-12" aria-hidden="true" />
      </div>
    );
  }

  return (
    <img
      src="/src/assets/images/guide_owl_townmap_1794942665385.jpg"
      alt="Bagoly Mester színes várostérkép mellett"
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
};

export const GoldStarOwlImage: React.FC<OwlImageProps> = ({ className = '' }) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br from-amber-100 to-yellow-100 text-amber-600 ${className}`}
        aria-label="Bagoly Mester aranycsillaggal"
      >
        <Star className="w-12 h-12 fill-amber-400" aria-hidden="true" />
      </div>
    );
  }

  return (
    <img
      src="/src/assets/images/guide_owl_goldstar_1794942665517.jpg"
      alt="Bagoly Mester nagy aranycsillaggal a kezében"
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
};

interface MapBuildingArtProps {
  buildingId: MapWorkplaceId;
  className?: string;
}

export const MapBuildingArt: React.FC<MapBuildingArtProps> = ({
  buildingId,
  className = 'w-28 h-24',
}) => {
  switch (buildingId) {
    case 'iskola':
      return (
        <svg viewBox="0 0 140 110" className={className} aria-hidden="true">
          <ellipse cx="70" cy="100" rx="56" ry="7" fill="#D1FAE5" />
          {/* Bell tower */}
          <rect x="56" y="14" width="28" height="26" rx="3" fill="#FEF3C7" stroke="#1E293B" strokeWidth="2.4" />
          <path d="M52 16 L70 4 L88 16 Z" fill="#DC2626" stroke="#1E293B" strokeWidth="2.4" strokeLinejoin="round" />
          <circle cx="70" cy="26" r="6" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2" />
          <path d="M70 26 V22 M70 26 L73 27" stroke="#1E293B" strokeWidth="1.8" strokeLinecap="round" />
          {/* School building */}
          <rect x="22" y="44" width="96" height="54" rx="4" fill="#FFFBEB" stroke="#1E293B" strokeWidth="2.5" />
          <path d="M16 46 L70 28 L124 46 Z" fill="#EA580C" stroke="#1E293B" strokeWidth="2.5" strokeLinejoin="round" />
          {/* Double Door & Windows */}
          <rect x="57" y="64" width="26" height="34" rx="2" fill="#92400E" stroke="#1E293B" strokeWidth="2.4" />
          <rect x="30" y="56" width="16" height="18" rx="2" fill="#BAE6FD" stroke="#1E293B" strokeWidth="2" />
          <rect x="94" y="56" width="16" height="18" rx="2" fill="#BAE6FD" stroke="#1E293B" strokeWidth="2" />
        </svg>
      );

    case 'korhaz':
      return (
        <svg viewBox="0 0 140 110" className={className} aria-hidden="true">
          <ellipse cx="70" cy="100" rx="56" ry="7" fill="#E0F2FE" />
          {/* Main white hospital */}
          <rect x="26" y="30" width="88" height="68" rx="5" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2.5" />
          <rect x="22" y="24" width="96" height="8" rx="3" fill="#0284C7" stroke="#1E293B" strokeWidth="2.4" />
          {/* Big Red Cross */}
          <circle cx="70" cy="48" r="14" fill="#FEE2E2" stroke="#EF4444" strokeWidth="2" />
          <rect x="67" y="39" width="6" height="18" rx="1" fill="#EF4444" />
          <rect x="61" y="45" width="18" height="6" rx="1" fill="#EF4444" />
          {/* Entrance */}
          <rect x="56" y="70" width="28" height="28" rx="3" fill="#BAE6FD" stroke="#1E293B" strokeWidth="2.4" />
          <line x1="70" y1="70" x2="70" y2="98" stroke="#1E293B" strokeWidth="2" />
          {/* Windows */}
          <rect x="34" y="42" width="14" height="14" rx="2" fill="#BAE6FD" stroke="#1E293B" strokeWidth="2" />
          <rect x="92" y="42" width="14" height="14" rx="2" fill="#BAE6FD" stroke="#1E293B" strokeWidth="2" />
          <rect x="34" y="66" width="14" height="14" rx="2" fill="#BAE6FD" stroke="#1E293B" strokeWidth="2" />
          <rect x="92" y="66" width="14" height="14" rx="2" fill="#BAE6FD" stroke="#1E293B" strokeWidth="2" />
        </svg>
      );

    case 'pekseg':
      return (
        <svg viewBox="0 0 140 110" className={className} aria-hidden="true">
          <ellipse cx="70" cy="100" rx="56" ry="7" fill="#FEF3C7" />
          <rect x="92" y="18" width="12" height="24" rx="2" fill="#B45309" stroke="#1E293B" strokeWidth="2.2" />
          <rect x="26" y="46" width="88" height="52" rx="4" fill="#FFF7ED" stroke="#1E293B" strokeWidth="2.5" />
          <path d="M18 48 L70 18 L122 48 Z" fill="#D97706" stroke="#1E293B" strokeWidth="2.5" strokeLinejoin="round" />
          {/* Bread loaf signboard */}
          <ellipse cx="70" cy="36" rx="13" ry="7" fill="#FBBF24" stroke="#1E293B" strokeWidth="2" />
          {/* Awning & display window */}
          <path d="M30 60 H62 L60 68 H28 Z" fill="#F59E0B" stroke="#1E293B" strokeWidth="2" />
          <rect x="32" y="68" width="26" height="18" rx="2" fill="#FEF3C7" stroke="#1E293B" strokeWidth="2" />
          <ellipse cx="45" cy="79" rx="8" ry="4" fill="#D97706" />
          {/* Door */}
          <rect x="74" y="62" width="26" height="36" rx="3" fill="#92400E" stroke="#1E293B" strokeWidth="2.4" />
        </svg>
      );

    case 'tuzoltosag':
      return (
        <svg viewBox="0 0 140 110" className={className} aria-hidden="true">
          <ellipse cx="70" cy="100" rx="56" ry="7" fill="#FEE2E2" />
          {/* Tower */}
          <rect x="86" y="18" width="24" height="80" rx="3" fill="#DC2626" stroke="#1E293B" strokeWidth="2.5" />
          <path d="M82 20 L98 8 L114 20 Z" fill="#991B1B" stroke="#1E293B" strokeWidth="2.4" strokeLinejoin="round" />
          <rect x="92" y="28" width="12" height="12" rx="2" fill="#FEF08A" stroke="#1E293B" strokeWidth="2" />
          {/* Main Garage */}
          <rect x="22" y="42" width="66" height="56" rx="4" fill="#EF4444" stroke="#1E293B" strokeWidth="2.5" />
          <rect x="18" y="36" width="74" height="8" rx="3" fill="#991B1B" stroke="#1E293B" strokeWidth="2.2" />
          {/* Garage Door */}
          <rect x="32" y="56" width="46" height="42" rx="3" fill="#F8FAFC" stroke="#1E293B" strokeWidth="2.4" />
          <path d="M32 66 H78 M32 76 H78 M32 86 H78" stroke="#CBD5E1" strokeWidth="2" />
        </svg>
      );

    case 'posta':
      return (
        <svg viewBox="0 0 140 110" className={className} aria-hidden="true">
          <ellipse cx="70" cy="100" rx="56" ry="7" fill="#FEF9C3" />
          <rect x="26" y="44" width="88" height="54" rx="4" fill="#FEFCE8" stroke="#1E293B" strokeWidth="2.5" />
          <path d="M18 46 L70 16 L122 46 Z" fill="#16A34A" stroke="#1E293B" strokeWidth="2.5" strokeLinejoin="round" />
          {/* Envelope badge */}
          <rect x="57" y="28" width="26" height="16" rx="2" fill="#FACC15" stroke="#1E293B" strokeWidth="2" />
          <path d="M57 29 L70 38 L83 29" fill="none" stroke="#1E293B" strokeWidth="2" />
          {/* Door */}
          <rect x="56" y="62" width="26" height="36" rx="3" fill="#15803D" stroke="#1E293B" strokeWidth="2.4" />
          {/* Windows */}
          <rect x="33" y="58" width="14" height="16" rx="2" fill="#BAE6FD" stroke="#1E293B" strokeWidth="2" />
          <rect x="91" y="58" width="14" height="16" rx="2" fill="#BAE6FD" stroke="#1E293B" strokeWidth="2" />
          {/* Red postbox */}
          <rect x="108" y="68" width="14" height="18" rx="3" fill="#DC2626" stroke="#1E293B" strokeWidth="2" />
          <rect x="113" y="86" width="4" height="12" fill="#475569" />
        </svg>
      );

    case 'etterem':
      return (
        <svg viewBox="0 0 140 110" className={className} aria-hidden="true">
          <ellipse cx="70" cy="100" rx="56" ry="7" fill="#FFEDD5" />
          <rect x="24" y="44" width="92" height="54" rx="4" fill="#FFF7ED" stroke="#1E293B" strokeWidth="2.5" />
          <path d="M18 46 L70 18 L122 46 Z" fill="#E11D48" stroke="#1E293B" strokeWidth="2.5" strokeLinejoin="round" />
          {/* Chef cloche / fork-spoon emblem */}
          <circle cx="70" cy="34" r="10" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2" />
          <path d="M66 39 V29 M74 39 V29" stroke="#E11D48" strokeWidth="2.2" strokeLinecap="round" />
          {/* Striped Bistro Awning */}
          <path d="M26 56 H114 L118 66 H22 Z" fill="#FB7185" stroke="#1E293B" strokeWidth="2.2" />
          {/* Door & big windows */}
          <rect x="57" y="68" width="26" height="30" rx="2" fill="#9F1239" stroke="#1E293B" strokeWidth="2.4" />
          <rect x="30" y="70" width="18" height="18" rx="2" fill="#FDE68A" stroke="#1E293B" strokeWidth="2" />
          <rect x="92" y="70" width="18" height="18" rx="2" fill="#FDE68A" stroke="#1E293B" strokeWidth="2" />
        </svg>
      );

    case 'autoszerelo_muhely':
      return (
        <svg viewBox="0 0 140 110" className={className} aria-hidden="true">
          <ellipse cx="70" cy="100" rx="56" ry="7" fill="#E2E8F0" />
          <rect x="22" y="42" width="96" height="56" rx="4" fill="#F1F5F9" stroke="#1E293B" strokeWidth="2.5" />
          <rect x="18" y="34" width="104" height="10" rx="3" fill="#0284C7" stroke="#1E293B" strokeWidth="2.4" />
          {/* Wrench badge */}
          <circle cx="70" cy="24" r="12" fill="#FACC15" stroke="#1E293B" strokeWidth="2.2" />
          <path d="M65 29 L75 19" stroke="#1E293B" strokeWidth="3.5" strokeLinecap="round" />
          {/* Open Garage Bay with tiny car */}
          <rect x="36" y="54" width="68" height="44" rx="3" fill="#334155" stroke="#1E293B" strokeWidth="2.4" />
          <path d="M48 88 V78 L58 68 H82 L92 78 V88 Z" fill="#38BDF8" stroke="#FFFFFF" strokeWidth="2" strokeLinejoin="round" />
          <circle cx="58" cy="88" r="6" fill="#0F172A" stroke="#FFFFFF" strokeWidth="1.5" />
          <circle cx="82" cy="88" r="6" fill="#0F172A" stroke="#FFFFFF" strokeWidth="1.5" />
        </svg>
      );

    case 'viraguzlet':
      return (
        <svg viewBox="0 0 140 110" className={className} aria-hidden="true">
          <ellipse cx="70" cy="100" rx="56" ry="7" fill="#FCE7F3" />
          <rect x="26" y="44" width="88" height="54" rx="4" fill="#FDF2F8" stroke="#1E293B" strokeWidth="2.5" />
          <path d="M18 46 L70 16 L122 46 Z" fill="#EC4899" stroke="#1E293B" strokeWidth="2.5" strokeLinejoin="round" />
          {/* Flower badge */}
          <circle cx="70" cy="34" r="8" fill="#FACC15" stroke="#1E293B" strokeWidth="2" />
          <circle cx="64" cy="30" r="4" fill="#FFFFFF" />
          <circle cx="76" cy="30" r="4" fill="#FFFFFF" />
          {/* Awning & flower window boxes */}
          <path d="M28 56 H112 L116 64 H24 Z" fill="#4ADE80" stroke="#1E293B" strokeWidth="2" />
          <rect x="57" y="66" width="26" height="32" rx="2" fill="#BE185D" stroke="#1E293B" strokeWidth="2.4" />
          <rect x="30" y="68" width="18" height="16" rx="2" fill="#BAE6FD" stroke="#1E293B" strokeWidth="2" />
          <rect x="92" y="68" width="18" height="16" rx="2" fill="#BAE6FD" stroke="#1E293B" strokeWidth="2" />
          {/* Flower pots out front */}
          <circle cx="38" cy="88" r="5" fill="#F43F5E" />
          <circle cx="102" cy="88" r="5" fill="#FACC15" />
        </svg>
      );
  }
};

interface WorkerAvatarArtProps {
  workplaceId: MapWorkplaceId;
  className?: string;
}

export const WorkerAvatarArt: React.FC<WorkerAvatarArtProps> = ({
  workplaceId,
  className = 'w-14 h-14',
}) => {
  switch (workplaceId) {
    case 'iskola':
      // Tanító (book & apple)
      return (
        <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
          <circle cx="40" cy="40" r="36" fill="#FFEDD5" stroke="#1E293B" strokeWidth="2.2" />
          <path d="M20 34 Q30 28 40 34 Q50 28 60 34 V56 Q50 50 40 56 Q30 50 20 56 Z" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2.2" />
          <circle cx="56" cy="24" r="8" fill="#EF4444" stroke="#1E293B" strokeWidth="2" />
          <path d="M56 16 Q59 11 63 13" fill="none" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    case 'korhaz':
      // Orvos (stethoscope & medical bag)
      return (
        <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
          <circle cx="40" cy="40" r="36" fill="#E0F2FE" stroke="#1E293B" strokeWidth="2.2" />
          <rect x="20" y="28" width="40" height="30" rx="5" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2.2" />
          <path d="M32 28 V21 H48 V28" fill="none" stroke="#1E293B" strokeWidth="2.4" />
          <rect x="37" y="34" width="6" height="18" rx="1" fill="#EF4444" />
          <rect x="31" y="40" width="18" height="6" rx="1" fill="#EF4444" />
        </svg>
      );

    case 'pekseg':
      // Pék (chef hat & croissant/bread)
      return (
        <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
          <circle cx="40" cy="40" r="36" fill="#FEF3C7" stroke="#1E293B" strokeWidth="2.2" />
          <path d="M24 34 C18 22, 30 14, 40 18 C50 14, 62 22, 56 34 Z" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2.2" />
          <rect x="26" y="34" width="28" height="8" rx="2" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2.2" />
          <ellipse cx="40" cy="56" rx="18" ry="9" fill="#D97706" stroke="#1E293B" strokeWidth="2.2" />
        </svg>
      );

    case 'tuzoltosag':
      // Tűzoltó (yellow fire helmet)
      return (
        <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
          <circle cx="40" cy="40" r="36" fill="#FEE2E2" stroke="#1E293B" strokeWidth="2.2" />
          <path d="M18 48 C18 24, 62 24, 62 48 Z" fill="#FACC15" stroke="#1E293B" strokeWidth="2.4" />
          <rect x="14" y="46" width="52" height="7" rx="3" fill="#EAB308" stroke="#1E293B" strokeWidth="2.2" />
          <rect x="35" y="27" width="10" height="19" rx="2" fill="#DC2626" stroke="#1E293B" strokeWidth="1.8" />
        </svg>
      );

    case 'posta':
      // Postás (letter & postman cap)
      return (
        <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
          <circle cx="40" cy="40" r="36" fill="#DCFCE7" stroke="#1E293B" strokeWidth="2.2" />
          <rect x="18" y="28" width="44" height="28" rx="4" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2.2" />
          <path d="M18 29 L40 44 L62 29" fill="none" stroke="#16A34A" strokeWidth="2.5" />
          <circle cx="54" cy="24" r="7" fill="#FACC15" stroke="#1E293B" strokeWidth="2" />
        </svg>
      );

    case 'etterem':
      // Szakács (pot & ladle)
      return (
        <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
          <circle cx="40" cy="40" r="36" fill="#FFE4E6" stroke="#1E293B" strokeWidth="2.2" />
          <rect x="22" y="34" width="36" height="24" rx="4" fill="#DC2626" stroke="#1E293B" strokeWidth="2.2" />
          <path d="M20 34 C22 25, 58 25, 60 34 Z" fill="#CBD5E1" stroke="#1E293B" strokeWidth="2" />
          <path d="M16 38 H22 M58 38 H64" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );

    case 'autoszerelo_muhely':
      // Autószerelő (wrench & wheel)
      return (
        <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
          <circle cx="40" cy="40" r="36" fill="#E2E8F0" stroke="#1E293B" strokeWidth="2.2" />
          <circle cx="34" cy="46" r="14" fill="#334155" stroke="#1E293B" strokeWidth="2.2" />
          <circle cx="34" cy="46" r="6" fill="#CBD5E1" />
          <path d="M40 44 L58 24" stroke="#0284C7" strokeWidth="6" strokeLinecap="round" />
          <circle cx="58" cy="24" r="6" fill="#38BDF8" stroke="#1E293B" strokeWidth="2" />
        </svg>
      );

    case 'viraguzlet':
      // Virágkötő (colorful bouquet)
      return (
        <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
          <circle cx="40" cy="40" r="36" fill="#FCE7F3" stroke="#1E293B" strokeWidth="2.2" />
          <path d="M28 40 L40 62 L52 40 Z" fill="#4ADE80" stroke="#1E293B" strokeWidth="2" />
          <circle cx="32" cy="30" r="8" fill="#EC4899" stroke="#1E293B" strokeWidth="2" />
          <circle cx="48" cy="30" r="8" fill="#FACC15" stroke="#1E293B" strokeWidth="2" />
          <circle cx="40" cy="22" r="8" fill="#FB7185" stroke="#1E293B" strokeWidth="2" />
        </svg>
      );
  }
};
