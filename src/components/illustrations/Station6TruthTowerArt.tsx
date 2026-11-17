import React, { useState } from 'react';
import { Bell, Star } from 'lucide-react';
import { ErrorSceneId } from '../../data/station6TruthTower';

interface OwlImageProps {
  className?: string;
}

export const BellTowerOwlImage: React.FC<OwlImageProps> = ({
  className = '',
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br from-teal-100 to-amber-100 text-teal-800 ${className}`}
        aria-label="Bagoly Mester az Igazmondó Harangtoronynál"
      >
        <Bell className="w-12 h-12" aria-hidden="true" />
      </div>
    );
  }

  return (
    <img
      src="/src/assets/images/guide_owl_belltower_1794944213386.jpg"
      alt="Bagoly Mester a mesés Igazmondó Harangtorony előtt"
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
};

export const BellStarOwlImage: React.FC<OwlImageProps> = ({
  className = '',
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br from-amber-100 to-teal-100 text-amber-600 ${className}`}
        aria-label="Bagoly Mester nagy aranycsillaggal a harangtoronyban"
      >
        <Star className="w-12 h-12 fill-amber-400" aria-hidden="true" />
      </div>
    );
  }

  return (
    <img
      src="/src/assets/images/guide_owl_bell_star_1794944213601.jpg"
      alt="Bagoly Mester nagy aranycsillaggal az Igazmondó Harangtorony erkélyén"
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
};

interface ErrorSceneArtProps {
  sceneId: ErrorSceneId;
  className?: string;
}

// Clear, kid-friendly SVG illustrations showing ONLY the true workplace & worker (never depicting the false statement!)
export const ErrorSceneArt: React.FC<ErrorSceneArtProps> = ({
  sceneId,
  className = 'w-full h-56',
}) => {
  switch (sceneId) {
    case 'pekseg':
      return (
        <svg viewBox="0 0 320 200" className={className} aria-hidden="true">
          <rect width="320" height="200" rx="16" fill="#FEF3C7" />
          {/* Warm bakery shelves & oven */}
          <rect x="20" y="24" width="120" height="152" rx="10" fill="#FFFBEB" stroke="#1E293B" strokeWidth="2.5" />
          <path d="M40 176 V112 C40 80, 120 80, 120 112 V176 Z" fill="#C2410C" stroke="#1E293B" strokeWidth="2.5" />
          <path d="M54 176 V120 C54 98, 106 98, 106 120 V176 Z" fill="#451A03" />
          <ellipse cx="80" cy="160" rx="18" ry="8" fill="#F59E0B" />
          {/* Bread shelf */}
          <line x1="34" y1="54" x2="126" y2="54" stroke="#92400E" strokeWidth="4" strokeLinecap="round" />
          <ellipse cx="56" cy="46" rx="12" ry="7" fill="#D97706" stroke="#1E293B" strokeWidth="2" />
          <ellipse cx="86" cy="46" rx="12" ry="7" fill="#F59E0B" stroke="#1E293B" strokeWidth="2" />
          <ellipse cx="112" cy="46" rx="10" ry="6" fill="#B45309" stroke="#1E293B" strokeWidth="2" />

          {/* Friendly baker with chef hat holding fresh bread */}
          <path d="M180 176 C182 132, 268 132, 270 176 Z" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2.5" />
          <circle cx="225" cy="96" r="24" fill="#FDE68A" stroke="#1E293B" strokeWidth="2.5" />
          <circle cx="217" cy="94" r="2.6" fill="#1E293B" />
          <circle cx="233" cy="94" r="2.6" fill="#1E293B" />
          <path d="M217 104 Q225 110 233 104" fill="none" stroke="#1E293B" strokeWidth="2.4" strokeLinecap="round" />
          {/* Baker hat */}
          <path d="M198 76 C188 56, 208 42, 225 48 C242 42, 262 56, 252 76 Z" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2.5" />
          <rect x="202" y="72" width="46" height="10" rx="2" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2.4" />
          {/* Loaf of bread in hands */}
          <ellipse cx="225" cy="146" rx="34" ry="15" fill="#D97706" stroke="#1E293B" strokeWidth="2.5" />
          <path d="M206 138 L214 148 M222 136 L230 146 M238 138 L245 147" stroke="#FEF3C7" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    case 'orvosi_rendelo':
      return (
        <svg viewBox="0 0 320 200" className={className} aria-hidden="true">
          <rect width="320" height="200" rx="16" fill="#E0F2FE" />
          {/* Clinic wall & medical cross frame */}
          <rect x="24" y="24" width="110" height="82" rx="10" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2.5" />
          <circle cx="79" cy="65" r="24" fill="#FEE2E2" stroke="#EF4444" strokeWidth="2.4" />
          <rect x="74" y="50" width="10" height="30" rx="2" fill="#EF4444" />
          <rect x="64" y="60" width="30" height="10" rx="2" fill="#EF4444" />
          {/* Examination table */}
          <rect x="24" y="138" width="120" height="18" rx="5" fill="#38BDF8" stroke="#1E293B" strokeWidth="2.5" />
          <rect x="34" y="156" width="10" height="24" fill="#475569" />
          <rect x="124" y="156" width="10" height="24" fill="#475569" />

          {/* Doctor in white coat with stethoscope */}
          <path d="M180 180 C184 128, 276 128, 280 180 Z" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2.5" />
          <circle cx="230" cy="88" r="24" fill="#FDE68A" stroke="#1E293B" strokeWidth="2.5" />
          <path d="M206 84 C208 56, 252 56, 254 84 C244 74, 216 74, 206 84 Z" fill="#475569" stroke="#1E293B" strokeWidth="2.2" />
          <circle cx="222" cy="88" r="2.6" fill="#1E293B" />
          <circle cx="238" cy="88" r="2.6" fill="#1E293B" />
          <path d="M222 98 Q230 104 238 98" fill="none" stroke="#1E293B" strokeWidth="2.4" strokeLinecap="round" />
          {/* Stethoscope */}
          <path d="M214 122 C206 144, 254 144, 246 122" fill="none" stroke="#0284C7" strokeWidth="4.5" strokeLinecap="round" />
          <circle cx="230" cy="144" r="7" fill="#94A3B8" stroke="#1E293B" strokeWidth="2" />
        </svg>
      );

    case 'viraguzlet':
      return (
        <svg viewBox="0 0 320 200" className={className} aria-hidden="true">
          <rect width="320" height="200" rx="16" fill="#FCE7F3" />
          {/* Flower shop shelf with buckets of flowers */}
          <rect x="22" y="132" width="130" height="46" rx="8" fill="#D97706" stroke="#1E293B" strokeWidth="2.5" />
          <rect x="34" y="102" width="28" height="30" rx="4" fill="#38BDF8" stroke="#1E293B" strokeWidth="2.2" />
          <rect x="74" y="102" width="28" height="30" rx="4" fill="#4ADE80" stroke="#1E293B" strokeWidth="2.2" />
          <rect x="114" y="102" width="28" height="30" rx="4" fill="#FACC15" stroke="#1E293B" strokeWidth="2.2" />
          {/* Blossoms in buckets */}
          <circle cx="48" cy="88" r="11" fill="#EC4899" stroke="#1E293B" strokeWidth="2" />
          <circle cx="88" cy="86" r="11" fill="#F43F5E" stroke="#1E293B" strokeWidth="2" />
          <circle cx="128" cy="88" r="11" fill="#8B5CF6" stroke="#1E293B" strokeWidth="2" />

          {/* Florist with apron holding a big bouquet */}
          <path d="M188 180 C192 130, 276 130, 280 180 Z" fill="#16A34A" stroke="#1E293B" strokeWidth="2.5" />
          <circle cx="234" cy="84" r="24" fill="#FDE68A" stroke="#1E293B" strokeWidth="2.5" />
          <path d="M210 82 C210 52, 258 52, 258 82 C248 70, 220 70, 210 82 Z" fill="#92400E" stroke="#1E293B" strokeWidth="2.2" />
          <circle cx="226" cy="84" r="2.6" fill="#1E293B" />
          <circle cx="242" cy="84" r="2.6" fill="#1E293B" />
          <path d="M226 94 Q234 100 242 94" fill="none" stroke="#1E293B" strokeWidth="2.4" strokeLinecap="round" />
          {/* Bouquet held in front */}
          <path d="M216 132 L234 166 L252 132 Z" fill="#FDE68A" stroke="#1E293B" strokeWidth="2.2" />
          <circle cx="224" cy="122" r="10" fill="#EC4899" stroke="#1E293B" strokeWidth="2" />
          <circle cx="244" cy="122" r="10" fill="#FACC15" stroke="#1E293B" strokeWidth="2" />
          <circle cx="234" cy="112" r="10" fill="#FB7185" stroke="#1E293B" strokeWidth="2" />
        </svg>
      );

    case 'autoszerelo_muhely':
      return (
        <svg viewBox="0 0 320 200" className={className} aria-hidden="true">
          <rect width="320" height="200" rx="16" fill="#E2E8F0" />
          {/* Workshop wall with tool board */}
          <rect x="20" y="22" width="110" height="72" rx="8" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2.5" />
          <path d="M40 74 L68 44" stroke="#0284C7" strokeWidth="7" strokeLinecap="round" />
          <circle cx="68" cy="44" r="8" fill="#38BDF8" stroke="#1E293B" strokeWidth="2" />
          <path d="M94 74 V42" stroke="#64748B" strokeWidth="6" strokeLinecap="round" />
          <rect x="84" y="38" width="20" height="10" rx="2" fill="#EF4444" stroke="#1E293B" strokeWidth="2" />

          {/* Car on workshop floor with open hood */}
          <path d="M126 164 V134 L154 108 H234 L264 134 V164 Z" fill="#38BDF8" stroke="#1E293B" strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M126 134 L94 114" stroke="#0284C7" strokeWidth="6" strokeLinecap="round" />
          <circle cx="162" cy="164" r="17" fill="#1E293B" stroke="#FFFFFF" strokeWidth="3" />
          <circle cx="162" cy="164" r="7" fill="#CBD5E1" />
          <circle cx="234" cy="164" r="17" fill="#1E293B" stroke="#FFFFFF" strokeWidth="3" />
          <circle cx="234" cy="164" r="7" fill="#CBD5E1" />

          {/* Mechanic in blue overalls holding wrench */}
          <path d="M44 178 C46 134, 102 134, 104 178 Z" fill="#1D4ED8" stroke="#1E293B" strokeWidth="2.4" />
          <circle cx="74" cy="106" r="18" fill="#FDE68A" stroke="#1E293B" strokeWidth="2.4" />
          <path d="M56 102 C58 84, 90 84, 94 102 Z" fill="#1E40AF" stroke="#1E293B" strokeWidth="2" />
          <circle cx="68" cy="106" r="2.2" fill="#1E293B" />
          <circle cx="80" cy="106" r="2.2" fill="#1E293B" />
        </svg>
      );

    case 'konyvtar':
      return (
        <svg viewBox="0 0 320 200" className={className} aria-hidden="true">
          <rect width="320" height="200" rx="16" fill="#EEF2FF" />
          {/* Tall wooden bookshelves filled with colorful books */}
          <rect x="20" y="20" width="146" height="160" rx="8" fill="#B45309" stroke="#1E293B" strokeWidth="2.5" />
          <rect x="30" y="32" width="126" height="40" rx="3" fill="#FEF3C7" />
          <rect x="30" y="82" width="126" height="40" rx="3" fill="#FEF3C7" />
          <rect x="30" y="132" width="126" height="38" rx="3" fill="#FEF3C7" />
          {/* Books */}
          <rect x="36" y="38" width="14" height="34" fill="#EF4444" stroke="#1E293B" strokeWidth="1.6" />
          <rect x="52" y="42" width="14" height="30" fill="#3B82F6" stroke="#1E293B" strokeWidth="1.6" />
          <rect x="68" y="36" width="14" height="36" fill="#10B981" stroke="#1E293B" strokeWidth="1.6" />
          <rect x="84" y="40" width="14" height="32" fill="#F59E0B" stroke="#1E293B" strokeWidth="1.6" />
          <rect x="104" y="88" width="14" height="34" fill="#8B5CF6" stroke="#1E293B" strokeWidth="1.6" />
          <rect x="120" y="90" width="14" height="32" fill="#EC4899" stroke="#1E293B" strokeWidth="1.6" />
          <rect x="42" y="136" width="16" height="34" fill="#0D9488" stroke="#1E293B" strokeWidth="1.6" />
          <rect x="60" y="140" width="14" height="30" fill="#F97316" stroke="#1E293B" strokeWidth="1.6" />

          {/* Librarian holding books */}
          <path d="M192 180 C196 132, 276 132, 280 180 Z" fill="#4F46E5" stroke="#1E293B" strokeWidth="2.5" />
          <circle cx="236" cy="86" r="24" fill="#FDE68A" stroke="#1E293B" strokeWidth="2.5" />
          <circle cx="227" cy="86" r="6" fill="none" stroke="#1E293B" strokeWidth="2.2" />
          <circle cx="245" cy="86" r="6" fill="none" stroke="#1E293B" strokeWidth="2.2" />
          <line x1="233" y1="86" x2="239" y2="86" stroke="#1E293B" strokeWidth="2.2" />
          <path d="M228 98 Q236 104 244 98" fill="none" stroke="#1E293B" strokeWidth="2.2" strokeLinecap="round" />
          {/* Stack of books held */}
          <rect x="208" y="140" width="56" height="14" rx="3" fill="#EF4444" stroke="#1E293B" strokeWidth="2" />
          <rect x="212" y="126" width="48" height="14" rx="3" fill="#FACC15" stroke="#1E293B" strokeWidth="2" />
        </svg>
      );

    case 'kert':
      return (
        <svg viewBox="0 0 320 200" className={className} aria-hidden="true">
          <rect width="320" height="200" rx="16" fill="#DCFCE7" />
          {/* Sunny sky & garden soil */}
          <rect width="320" height="120" rx="16" fill="#E0F2FE" />
          <circle cx="48" cy="44" r="20" fill="#FACC15" />
          <rect x="0" y="120" width="320" height="80" fill="#86EFAC" />
          <rect x="20" y="146" width="140" height="32" rx="10" fill="#92400E" stroke="#1E293B" strokeWidth="2.2" />
          {/* Blooming garden flowers */}
          <line x1="50" y1="150" x2="50" y2="112" stroke="#16A34A" strokeWidth="4" />
          <circle cx="50" cy="106" r="12" fill="#EC4899" stroke="#1E293B" strokeWidth="2" />
          <circle cx="50" cy="106" r="5" fill="#FACC15" />
          <line x1="95" y1="150" x2="95" y2="118" stroke="#16A34A" strokeWidth="4" />
          <circle cx="95" cy="112" r="12" fill="#F97316" stroke="#1E293B" strokeWidth="2" />
          <circle cx="95" cy="112" r="5" fill="#FEF08A" />
          <line x1="138" y1="150" x2="138" y2="114" stroke="#16A34A" strokeWidth="4" />
          <circle cx="138" cy="108" r="11" fill="#8B5CF6" stroke="#1E293B" strokeWidth="2" />
          <circle cx="138" cy="108" r="4.5" fill="#FEF08A" />

          {/* Gardener with straw hat and watering can */}
          <path d="M196 184 C200 134, 276 134, 280 184 Z" fill="#16A34A" stroke="#1E293B" strokeWidth="2.5" />
          <circle cx="238" cy="88" r="22" fill="#FDE68A" stroke="#1E293B" strokeWidth="2.4" />
          <ellipse cx="238" cy="72" rx="34" ry="8" fill="#FBBF24" stroke="#1E293B" strokeWidth="2.2" />
          <path d="M218 70 C220 50, 256 50, 258 70 Z" fill="#F59E0B" stroke="#1E293B" strokeWidth="2.2" />
          <circle cx="230" cy="88" r="2.4" fill="#1E293B" />
          <circle cx="246" cy="88" r="2.4" fill="#1E293B" />
          <path d="M230 97 Q238 103 246 97" fill="none" stroke="#1E293B" strokeWidth="2.2" strokeLinecap="round" />
          {/* Watering can */}
          <rect x="172" y="132" width="32" height="24" rx="4" fill="#0EA5E9" stroke="#1E293B" strokeWidth="2.2" />
          <path d="M172 142 L152 128 L156 122 L176 134 Z" fill="#0284C7" stroke="#1E293B" strokeWidth="2" />
        </svg>
      );
  }
};
