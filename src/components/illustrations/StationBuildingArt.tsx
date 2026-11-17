import React from 'react';
import { StationId } from '../../types/game';

interface StationBuildingArtProps {
  stationId: StationId;
  className?: string;
}

export const StationBuildingArt: React.FC<StationBuildingArtProps> = ({
  stationId,
  className = 'w-28 h-24',
}) => {
  switch (stationId) {
    case 1:
      // 1. Múltidéző Műhely (Időutazás – Régi mesterségek): Old timber workshop + waterwheel
      return (
        <svg viewBox="0 0 140 110" className={className} aria-hidden="true">
          {/* Ground */}
          <ellipse cx="70" cy="100" rx="58" ry="7" fill="#D9E7C8" />
          {/* Chimney */}
          <rect x="92" y="18" width="14" height="28" rx="2" fill="#9A5B47" stroke="#3B2F2F" strokeWidth="2.5" />
          <path d="M97 13 C95 7, 103 6, 101 2" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          {/* Cottage body */}
          <rect x="26" y="48" width="76" height="50" rx="4" fill="#FFF4DE" stroke="#3B2F2F" strokeWidth="2.5" />
          {/* Timber beams */}
          <path d="M26 68 H102 M52 48 V98 M76 48 V98" stroke="#8B5E3C" strokeWidth="3" />
          {/* Roof */}
          <path d="M16 52 L64 16 L112 52 Z" fill="#D96B43" stroke="#3B2F2F" strokeWidth="2.5" strokeLinejoin="round" />
          {/* Anvil emblem in gable */}
          <path d="M56 38 H72 L70 43 H58 Z" fill="#334155" />
          {/* Arched Wooden Door */}
          <path d="M56 98 V74 C56 68, 72 68, 72 74 V98 Z" fill="#7C4A2D" stroke="#3B2F2F" strokeWidth="2.5" />
          <circle cx="68" cy="85" r="2" fill="#FBBF24" />
          {/* Waterwheel on right */}
          <circle cx="109" cy="78" r="18" fill="#B47B48" stroke="#3B2F2F" strokeWidth="2.5" />
          <circle cx="109" cy="78" r="6" fill="#FDE68A" stroke="#3B2F2F" strokeWidth="2" />
          <path d="M109 60 V96 M91 78 H127 M96 65 L122 91 M122 65 L96 91" stroke="#3B2F2F" strokeWidth="2" />
          {/* Window */}
          <rect x="33" y="56" width="13" height="14" rx="2" fill="#BAE6FD" stroke="#3B2F2F" strokeWidth="2" />
        </svg>
      );

    case 2:
      // 2. Szerszámos Házikó (Kinek a szerszáma?): Craft workshop with wrench crest
      return (
        <svg viewBox="0 0 140 110" className={className} aria-hidden="true">
          <ellipse cx="70" cy="100" rx="58" ry="7" fill="#D5E7F0" />
          {/* Shed body */}
          <rect x="26" y="46" width="88" height="52" rx="5" fill="#F8FAFC" stroke="#1E293B" strokeWidth="2.5" />
          {/* Roof */}
          <path d="M18 48 L70 14 L122 48 Z" fill="#0284C7" stroke="#1E293B" strokeWidth="2.5" strokeLinejoin="round" />
          {/* Roof trim */}
          <path d="M24 48 H116" stroke="#BAE6FD" strokeWidth="3" />
          {/* Circular Wrench Sign */}
          <circle cx="70" cy="34" r="10" fill="#FEF3C7" stroke="#1E293B" strokeWidth="2" />
          <path d="M66 38 L74 30 M72 28 L76 32" stroke="#0369A1" strokeWidth="2.5" strokeLinecap="round" />
          {/* Workshop Double Door */}
          <rect x="54" y="62" width="32" height="36" rx="3" fill="#F59E0B" stroke="#1E293B" strokeWidth="2.5" />
          <line x1="70" y1="62" x2="70" y2="98" stroke="#1E293B" strokeWidth="2" />
          {/* Windows */}
          <rect x="33" y="58" width="14" height="16" rx="2" fill="#BAE6FD" stroke="#1E293B" strokeWidth="2" />
          <rect x="93" y="58" width="14" height="16" rx="2" fill="#BAE6FD" stroke="#1E293B" strokeWidth="2" />
          {/* Side Tool Crate */}
          <rect x="14" y="80" width="16" height="18" rx="2" fill="#B45309" stroke="#1E293B" strokeWidth="2" />
          <path d="M14 86 H30" stroke="#FDE68A" strokeWidth="2" />
        </svg>
      );

    case 3:
      // 3. Detektív Torony (Foglalkozásdetektívek): Lookout tower with magnifying glass
      return (
        <svg viewBox="0 0 140 110" className={className} aria-hidden="true">
          <ellipse cx="70" cy="100" rx="54" ry="7" fill="#D1FAE5" />
          {/* Side Wing */}
          <rect x="24" y="62" width="34" height="36" rx="3" fill="#ECFDF5" stroke="#1E293B" strokeWidth="2.5" />
          <path d="M19 63 L41 44 L59 63 Z" fill="#059669" stroke="#1E293B" strokeWidth="2.5" strokeLinejoin="round" />
          {/* Main Tower */}
          <rect x="52" y="34" width="44" height="64" rx="4" fill="#FEFCE8" stroke="#1E293B" strokeWidth="2.5" />
          {/* Tower Spire Roof */}
          <path d="M46 36 L74 10 L102 36 Z" fill="#047857" stroke="#1E293B" strokeWidth="2.5" strokeLinejoin="round" />
          <circle cx="74" cy="8" r="3" fill="#FBBF24" stroke="#1E293B" strokeWidth="1.5" />
          {/* Magnifying Glass Crest */}
          <circle cx="74" cy="52" r="10" fill="#BAE6FD" stroke="#1E293B" strokeWidth="2.5" />
          <line x1="81" y1="59" x2="88" y2="66" stroke="#78350F" strokeWidth="3.5" strokeLinecap="round" />
          {/* Door */}
          <path d="M64 98 V76 C64 70, 84 70, 84 76 V98 Z" fill="#0F766E" stroke="#1E293B" strokeWidth="2.5" />
          {/* Side Window */}
          <rect x="33" y="72" width="12" height="13" rx="2" fill="#BAE6FD" stroke="#1E293B" strokeWidth="2" />
        </svg>
      );

    case 4:
      // 4. Városi Munkahelyek Háza (Ki hol dolgozik?): Town square hall with clock & awnings
      return (
        <svg viewBox="0 0 140 110" className={className} aria-hidden="true">
          <ellipse cx="70" cy="100" rx="58" ry="7" fill="#FFE4E6" />
          {/* Main Hall */}
          <rect x="24" y="44" width="92" height="54" rx="4" fill="#FFF7ED" stroke="#1E293B" strokeWidth="2.5" />
          {/* Roof */}
          <path d="M18 46 L70 16 L122 46 Z" fill="#E11D48" stroke="#1E293B" strokeWidth="2.5" strokeLinejoin="round" />
          {/* Clock in Pediment */}
          <circle cx="70" cy="33" r="9" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2" />
          <path d="M70 33 V28 M70 33 L74 35" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
          {/* Striped Awnings */}
          <path d="M27 64 H51 L48 72 H24 Z" fill="#FB7185" stroke="#1E293B" strokeWidth="2" />
          <path d="M89 64 H113 L116 72 H92 Z" fill="#FB7185" stroke="#1E293B" strokeWidth="2" />
          {/* Center Entrance */}
          <rect x="57" y="64" width="26" height="34" rx="3" fill="#9F1239" stroke="#1E293B" strokeWidth="2.5" />
          <circle cx="78" cy="82" r="2" fill="#FDE68A" />
          {/* Windows */}
          <rect x="31" y="50" width="15" height="12" rx="2" fill="#BAE6FD" stroke="#1E293B" strokeWidth="2" />
          <rect x="94" y="50" width="15" height="12" rx="2" fill="#BAE6FD" stroke="#1E293B" strokeWidth="2" />
        </svg>
      );

    case 5:
      // 5. Rejtélyes Postahivatal (Titkos szakmanevek): Post office with envelope emblem & mailbox
      return (
        <svg viewBox="0 0 140 110" className={className} aria-hidden="true">
          <ellipse cx="70" cy="100" rx="58" ry="7" fill="#E0E7FF" />
          {/* Post Office Body */}
          <rect x="28" y="46" width="80" height="52" rx="4" fill="#EEF2FF" stroke="#1E293B" strokeWidth="2.5" />
          {/* Roof */}
          <path d="M20 48 L68 18 L116 48 Z" fill="#4F46E5" stroke="#1E293B" strokeWidth="2.5" strokeLinejoin="round" />
          {/* Envelope Emblem */}
          <rect x="56" y="28" width="24" height="15" rx="2" fill="#FEF3C7" stroke="#1E293B" strokeWidth="2" />
          <path d="M56 29 L68 37 L80 29" fill="none" stroke="#1E293B" strokeWidth="2" />
          {/* Door */}
          <rect x="56" y="62" width="24" height="36" rx="3" fill="#6366F1" stroke="#1E293B" strokeWidth="2.5" />
          <rect x="61" y="68" width="14" height="12" rx="1" fill="#E0F2FE" stroke="#1E293B" strokeWidth="1.5" />
          {/* Windows */}
          <rect x="34" y="60" width="14" height="16" rx="2" fill="#BAE6FD" stroke="#1E293B" strokeWidth="2" />
          <rect x="88" y="60" width="14" height="16" rx="2" fill="#BAE6FD" stroke="#1E293B" strokeWidth="2" />
          {/* Mailbox on right */}
          <rect x="114" y="78" width="4" height="20" fill="#475569" />
          <rect x="108" y="68" width="16" height="12" rx="4" fill="#EF4444" stroke="#1E293B" strokeWidth="2" />
          <path d="M111 72 H121" stroke="#FEF08A" strokeWidth="2" />
        </svg>
      );

    case 6:
      // 6. Igazmondó Harangtorony (Igaz vagy hamis?): Bell tower pavilion with golden bell
      return (
        <svg viewBox="0 0 140 110" className={className} aria-hidden="true">
          <ellipse cx="70" cy="100" rx="54" ry="7" fill="#CCFBF1" />
          {/* Lower Stone Base */}
          <rect x="38" y="54" width="64" height="44" rx="4" fill="#F0FDFA" stroke="#1E293B" strokeWidth="2.5" />
          {/* Belfry Arch Level */}
          <rect x="46" y="28" width="48" height="28" rx="3" fill="#CCFBF1" stroke="#1E293B" strokeWidth="2.5" />
          {/* Dome Roof */}
          <path d="M40 30 C40 12, 100 12, 100 30 Z" fill="#0D9488" stroke="#1E293B" strokeWidth="2.5" />
          <line x1="70" y1="15" x2="70" y2="7" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="70" cy="6" r="2.5" fill="#FBBF24" stroke="#1E293B" strokeWidth="1.5" />
          {/* Golden Bell inside Belfry */}
          <path d="M62 48 H78 L75 34 C74 31, 66 31, 65 34 Z" fill="#FBBF24" stroke="#1E293B" strokeWidth="2" />
          <circle cx="70" cy="50" r="2.5" fill="#92400E" />
          {/* Door */}
          <path d="M58 98 V72 C58 66, 82 66, 82 72 V98 Z" fill="#115E59" stroke="#1E293B" strokeWidth="2.5" />
          {/* Side lanterns/windows */}
          <circle cx="48" cy="74" r="5" fill="#BAE6FD" stroke="#1E293B" strokeWidth="2" />
          <circle cx="92" cy="74" r="5" fill="#BAE6FD" stroke="#1E293B" strokeWidth="2" />
        </svg>
      );

    case 7:
      // 7. Képességek Akadémiája (Milyen képesség kell hozzá?): Schoolhouse with columns & book
      return (
        <svg viewBox="0 0 140 110" className={className} aria-hidden="true">
          <ellipse cx="70" cy="100" rx="58" ry="7" fill="#FFEDD5" />
          {/* Main Building */}
          <rect x="24" y="46" width="92" height="52" rx="3" fill="#FFFBEB" stroke="#1E293B" strokeWidth="2.5" />
          {/* Pediment Roof */}
          <path d="M16 48 L70 16 L124 48 Z" fill="#EA580C" stroke="#1E293B" strokeWidth="2.5" strokeLinejoin="round" />
          {/* Open Book Emblem */}
          <path d="M58 36 Q64 32 70 36 Q76 32 82 36 V43 Q76 39 70 43 Q64 39 58 43 Z" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2" />
          {/* Columns */}
          <rect x="34" y="54" width="8" height="44" fill="#FED7AA" stroke="#1E293B" strokeWidth="2" />
          <rect x="98" y="54" width="8" height="44" fill="#FED7AA" stroke="#1E293B" strokeWidth="2" />
          {/* Double Door */}
          <rect x="57" y="64" width="26" height="34" rx="2" fill="#C2410C" stroke="#1E293B" strokeWidth="2.5" />
          <line x1="70" y1="64" x2="70" y2="98" stroke="#1E293B" strokeWidth="2" />
          {/* High Windows */}
          <rect x="46" y="54" width="9" height="16" rx="1.5" fill="#BAE6FD" stroke="#1E293B" strokeWidth="1.5" />
          <rect x="85" y="54" width="9" height="16" rx="1.5" fill="#BAE6FD" stroke="#1E293B" strokeWidth="1.5" />
        </svg>
      );

    case 8:
      // 8. Álmodozók Kilátója (Ha nagy leszek…): Starry observatory with telescope & pennant
      return (
        <svg viewBox="0 0 140 110" className={className} aria-hidden="true">
          <ellipse cx="70" cy="100" rx="56" ry="7" fill="#EDE9FE" />
          {/* Flagpole & Pennant */}
          <line x1="70" y1="22" x2="70" y2="6" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M70 7 L86 12 L70 17 Z" fill="#F59E0B" stroke="#1E293B" strokeWidth="1.5" strokeLinejoin="round" />
          {/* Observatory Dome */}
          <path d="M36 50 C36 22, 104 22, 104 50 Z" fill="#7C3AED" stroke="#1E293B" strokeWidth="2.5" />
          {/* Telescope */}
          <path d="M84 32 L112 20 L115 26 L88 38 Z" fill="#FDE68A" stroke="#1E293B" strokeWidth="2" />
          {/* Main Round Base */}
          <rect x="30" y="50" width="80" height="48" rx="4" fill="#F5F3FF" stroke="#1E293B" strokeWidth="2.5" />
          {/* Star Crest */}
          <path
            d="M70 57 L72.5 62.5 L78.5 63.2 L74 67.3 L75.2 73.2 L70 70.2 L64.8 73.2 L66 67.3 L61.5 63.2 L67.5 62.5 Z"
            fill="#FBBF24"
            stroke="#1E293B"
            strokeWidth="1.5"
          />
          {/* Door */}
          <path d="M58 98 V78 C58 73, 82 73, 82 78 V98 Z" fill="#5B21B6" stroke="#1E293B" strokeWidth="2.5" />
          {/* Porthole Windows */}
          <circle cx="44" cy="70" r="6" fill="#BAE6FD" stroke="#1E293B" strokeWidth="2" />
          <circle cx="96" cy="70" r="6" fill="#BAE6FD" stroke="#1E293B" strokeWidth="2" />
        </svg>
      );
  }
};
