import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { MysteryId, WorkplaceId } from '../../data/station3Detective';

interface ArtworkProps {
  className?: string;
}

export const DetectiveOwlImage: React.FC<ArtworkProps> = ({ className = '' }) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br from-emerald-100 to-amber-100 text-emerald-800 ${className}`}
        aria-label="Detektív Bagoly Mester"
      >
        <Search className="w-10 h-10" aria-hidden="true" />
      </div>
    );
  }

  return (
    <img
      src="/src/assets/images/guide_owl_detective_1794941897661.jpg"
      alt="Bagoly Mester detektívkalapban és nagyítóval"
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
};

interface MysteryProfessionArtProps {
  mysteryId: MysteryId;
  className?: string;
}

export const MysteryProfessionArt: React.FC<MysteryProfessionArtProps> = ({
  mysteryId,
  className = 'w-24 h-24',
}) => {
  switch (mysteryId) {
    case 'allatorvos':
      return (
        <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
          <circle cx="50" cy="50" r="44" fill="#DCFCE7" />
          {/* Cute puppy + stethoscope */}
          <ellipse cx="44" cy="64" rx="18" ry="15" fill="#F59E0B" stroke="#1E293B" strokeWidth="2.5" />
          <circle cx="44" cy="42" r="14" fill="#FBBF24" stroke="#1E293B" strokeWidth="2.5" />
          <ellipse cx="31" cy="43" rx="5" ry="9" fill="#B45309" stroke="#1E293B" strokeWidth="2" />
          <ellipse cx="57" cy="43" rx="5" ry="9" fill="#B45309" stroke="#1E293B" strokeWidth="2" />
          <circle cx="39" cy="40" r="2" fill="#1E293B" />
          <circle cx="49" cy="40" r="2" fill="#1E293B" />
          <ellipse cx="44" cy="46" rx="3.5" ry="2.5" fill="#1E293B" />
          {/* Red cross badge */}
          <circle cx="72" cy="30" r="12" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2.2" />
          <rect x="69.5" y="23" width="5" height="14" rx="1" fill="#EF4444" />
          <rect x="65" y="27.5" width="14" height="5" rx="1" fill="#EF4444" />
        </svg>
      );

    case 'pek':
      return (
        <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
          <circle cx="50" cy="50" r="44" fill="#FEF3C7" />
          {/* Baker hat */}
          <path d="M32 34 C24 22, 38 14, 50 18 C62 14, 76 22, 68 34 Z" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2.5" />
          <rect x="34" y="34" width="32" height="10" rx="2" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2.5" />
          {/* Bread loaf & croissant */}
          <ellipse cx="50" cy="68" rx="24" ry="13" fill="#D97706" stroke="#1E293B" strokeWidth="2.6" />
          <path d="M38 62 L44 72 M49 60 L54 72 M60 62 L64 70" stroke="#FEF3C7" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    case 'pilota':
      return (
        <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
          <circle cx="50" cy="50" r="44" fill="#E0F2FE" />
          {/* Clouds */}
          <circle cx="28" cy="70" r="9" fill="#FFFFFF" />
          <circle cx="38" cy="68" r="11" fill="#FFFFFF" />
          <circle cx="48" cy="71" r="8" fill="#FFFFFF" />
          {/* Airplane */}
          <path d="M18 48 L46 42 L62 24 L70 26 L58 44 L80 42 L86 34 L90 36 L85 48 L60 54 L66 72 L58 72 L46 54 L22 54 Z" fill="#0284C7" stroke="#1E293B" strokeWidth="2.4" strokeLinejoin="round" />
        </svg>
      );

    case 'regesz':
      return (
        <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
          <circle cx="50" cy="50" r="44" fill="#FFEDD5" />
          {/* Amphora / ancient pot */}
          <path d="M40 28 H60 L56 38 C68 44, 68 68, 56 76 H44 C32 68, 32 44, 44 38 Z" fill="#C2410C" stroke="#1E293B" strokeWidth="2.5" />
          {/* Excavation brush */}
          <path d="M24 72 L40 56" stroke="#92400E" strokeWidth="5" strokeLinecap="round" />
          <rect x="38" y="48" width="12" height="10" rx="2" transform="rotate(45 44 53)" fill="#FACC15" stroke="#1E293B" strokeWidth="2" />
          {/* Magnifier */}
          <circle cx="70" cy="36" r="11" fill="#BAE6FD" stroke="#1E293B" strokeWidth="2.5" />
          <line x1="78" y1="44" x2="86" y2="52" stroke="#78350F" strokeWidth="4" strokeLinecap="round" />
        </svg>
      );

    case 'mehesz':
      return (
        <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
          <circle cx="50" cy="50" r="44" fill="#FEF9C3" />
          {/* Beehive */}
          <ellipse cx="50" cy="70" rx="22" ry="9" fill="#D97706" stroke="#1E293B" strokeWidth="2.4" />
          <ellipse cx="50" cy="58" rx="20" ry="8" fill="#F59E0B" stroke="#1E293B" strokeWidth="2.4" />
          <ellipse cx="50" cy="46" rx="16" ry="7" fill="#FBBF24" stroke="#1E293B" strokeWidth="2.4" />
          <ellipse cx="50" cy="36" rx="10" ry="6" fill="#FDE047" stroke="#1E293B" strokeWidth="2.4" />
          <circle cx="50" cy="70" r="5" fill="#78350F" />
          {/* Cute bee */}
          <ellipse cx="74" cy="28" rx="8" ry="6" fill="#FACC15" stroke="#1E293B" strokeWidth="2" />
          <line x1="72" y1="23" x2="72" y2="33" stroke="#1E293B" strokeWidth="2" />
          <ellipse cx="72" cy="20" rx="4" ry="3" fill="#E0F2FE" stroke="#1E293B" strokeWidth="1.5" />
        </svg>
      );

    case 'csillagasz':
      return (
        <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
          <circle cx="50" cy="50" r="44" fill="#1E1B4B" />
          {/* Stars & Saturn */}
          <circle cx="26" cy="28" r="2.5" fill="#FDE047" />
          <circle cx="72" cy="26" r="3" fill="#FDE047" />
          <circle cx="74" cy="44" r="7" fill="#F59E0B" />
          <ellipse cx="74" cy="44" rx="13" ry="3.5" transform="rotate(-20 74 44)" fill="none" stroke="#FDE68A" strokeWidth="2" />
          {/* Telescope */}
          <path d="M22 52 L60 32 L64 42 L26 60 Z" fill="#38BDF8" stroke="#FFFFFF" strokeWidth="2" strokeLinejoin="round" />
          <path d="M44 52 L34 80 M44 52 L56 80" stroke="#CBD5E1" strokeWidth="3.5" strokeLinecap="round" />
        </svg>
      );

    case 'konyvtaros':
      return (
        <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
          <circle cx="50" cy="50" r="44" fill="#E0E7FF" />
          {/* Stacked colorful books */}
          <rect x="24" y="62" width="52" height="14" rx="3" fill="#059669" stroke="#1E293B" strokeWidth="2.4" />
          <rect x="28" y="47" width="46" height="14" rx="3" fill="#DC2626" stroke="#1E293B" strokeWidth="2.4" />
          <rect x="22" y="32" width="50" height="14" rx="3" fill="#2563EB" stroke="#1E293B" strokeWidth="2.4" />
          <line x1="34" y1="32" x2="34" y2="46" stroke="#FEF08A" strokeWidth="3" />
          <line x1="38" y1="47" x2="38" y2="61" stroke="#FEF08A" strokeWidth="3" />
          <line x1="34" y1="62" x2="34" y2="76" stroke="#FEF08A" strokeWidth="3" />
        </svg>
      );

    case 'mentoapolo':
      return (
        <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
          <circle cx="50" cy="50" r="44" fill="#FEE2E2" />
          {/* Ambulance */}
          <rect x="18" y="38" width="46" height="30" rx="4" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2.5" />
          <path d="M64 46 H78 L84 56 V68 H64 Z" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2.5" strokeLinejoin="round" />
          <rect x="68" y="50" width="10" height="8" rx="1" fill="#BAE6FD" stroke="#1E293B" strokeWidth="1.8" />
          {/* Red Cross */}
          <rect x="37" y="45" width="6" height="16" rx="1" fill="#EF4444" />
          <rect x="32" y="50" width="16" height="6" rx="1" fill="#EF4444" />
          {/* Siren */}
          <rect x="44" y="32" width="10" height="6" rx="2" fill="#3B82F6" stroke="#1E293B" strokeWidth="2" />
          {/* Wheels */}
          <circle cx="32" cy="70" r="8" fill="#334155" stroke="#1E293B" strokeWidth="2" />
          <circle cx="72" cy="70" r="8" fill="#334155" stroke="#1E293B" strokeWidth="2" />
        </svg>
      );

    case 'kertesz':
      return (
        <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
          <circle cx="50" cy="50" r="44" fill="#DCFCE7" />
          {/* Flowerpot & blooming flower */}
          <path d="M36 58 H64 L60 80 H40 Z" fill="#EA580C" stroke="#1E293B" strokeWidth="2.5" strokeLinejoin="round" />
          <rect x="33" y="52" width="34" height="7" rx="2" fill="#F97316" stroke="#1E293B" strokeWidth="2.4" />
          <line x1="50" y1="52" x2="50" y2="32" stroke="#16A34A" strokeWidth="4" />
          <ellipse cx="42" cy="43" rx="6" ry="3.5" transform="rotate(-25 42 43)" fill="#22C55E" stroke="#1E293B" strokeWidth="1.8" />
          <circle cx="50" cy="24" r="6" fill="#EC4899" stroke="#1E293B" strokeWidth="1.8" />
          <circle cx="42" cy="30" r="6" fill="#EC4899" stroke="#1E293B" strokeWidth="1.8" />
          <circle cx="58" cy="30" r="6" fill="#EC4899" stroke="#1E293B" strokeWidth="1.8" />
          <circle cx="50" cy="30" r="5" fill="#FACC15" stroke="#1E293B" strokeWidth="1.8" />
        </svg>
      );

    case 'fotos':
      return (
        <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
          <circle cx="50" cy="50" r="44" fill="#F3E8FF" />
          {/* Camera */}
          <rect x="20" y="34" width="60" height="40" rx="8" fill="#334155" stroke="#1E293B" strokeWidth="2.6" />
          <rect x="38" y="26" width="24" height="8" rx="3" fill="#475569" stroke="#1E293B" strokeWidth="2.4" />
          <circle cx="50" cy="54" r="13" fill="#38BDF8" stroke="#FFFFFF" strokeWidth="3.5" />
          <circle cx="50" cy="54" r="6" fill="#0284C7" />
          <circle cx="70" cy="42" r="3" fill="#FACC15" />
        </svg>
      );

    case 'programozo':
      return (
        <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
          <circle cx="50" cy="50" r="44" fill="#E0F2FE" />
          {/* Laptop */}
          <rect x="22" y="26" width="56" height="38" rx="4" fill="#1E293B" stroke="#0F172A" strokeWidth="2.5" />
          <rect x="27" y="31" width="46" height="28" rx="2" fill="#0F172A" />
          {/* Code lines */}
          <path d="M32 39 H48 M36 45 H58 M32 51 H44" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" />
          <path d="M52 39 H64 M48 51 H62" stroke="#34D399" strokeWidth="3" strokeLinecap="round" />
          {/* Keyboard base */}
          <path d="M16 64 H84 L78 76 H22 Z" fill="#94A3B8" stroke="#1E293B" strokeWidth="2.4" strokeLinejoin="round" />
        </svg>
      );

    case 'fazekas':
      return (
        <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
          <circle cx="50" cy="50" r="44" fill="#FFEDD5" />
          {/* Clay jug on potter's wheel */}
          <ellipse cx="50" cy="70" rx="26" ry="7" fill="#94A3B8" stroke="#1E293B" strokeWidth="2.4" />
          <rect x="46" y="75" width="8" height="10" fill="#475569" />
          <path d="M38 26 H62 L57 36 C68 44, 68 62, 58 68 H42 C32 62, 32 44, 43 36 Z" fill="#EA580C" stroke="#1E293B" strokeWidth="2.6" strokeLinejoin="round" />
          <path d="M36 52 Q43 48 50 52 Q57 56 64 52" fill="none" stroke="#FEF3C7" strokeWidth="2.5" />
        </svg>
      );
  }
};

interface WorkplaceSceneArtProps {
  workplaceId: WorkplaceId;
  className?: string;
}

export const WorkplaceSceneArt: React.FC<WorkplaceSceneArtProps> = ({
  workplaceId,
  className = 'w-full h-56',
}) => {
  switch (workplaceId) {
    case 'pekseg':
      // Objects: kemence (brick oven), kenyerek (bread loaves), dagasztóasztal (dough table + rolling pin) — NO TEXT
      return (
        <svg viewBox="0 0 320 200" className={className} aria-hidden="true">
          <rect width="320" height="200" rx="18" fill="#FFF7ED" />
          {/* Floor */}
          <rect x="0" y="158" width="320" height="42" fill="#FDE68A" />
          {/* Brick Oven on left */}
          <path d="M24 158 V76 C24 38, 128 38, 128 76 V158 Z" fill="#C2410C" stroke="#1E293B" strokeWidth="3" />
          <path d="M46 158 V92 C46 66, 106 66, 106 92 V158 Z" fill="#451A03" stroke="#1E293B" strokeWidth="2.5" />
          {/* Warm glow & flames inside oven */}
          <path d="M58 148 Q68 122 76 142 Q84 118 94 148 Z" fill="#F97316" />
          <path d="M64 148 Q74 130 88 148 Z" fill="#FACC15" />
          {/* Shelf with Bread Loaves on top right */}
          <rect x="160" y="66" width="136" height="8" rx="3" fill="#B45309" stroke="#1E293B" strokeWidth="2.5" />
          <ellipse cx="190" cy="56" rx="22" ry="11" fill="#D97706" stroke="#1E293B" strokeWidth="2.4" />
          <ellipse cx="240" cy="56" rx="22" ry="11" fill="#F59E0B" stroke="#1E293B" strokeWidth="2.4" />
          <path d="M180 52 L185 60 M190 50 L195 60 M232 52 L237 60 M242 50 L247 60" stroke="#FEF3C7" strokeWidth="2" strokeLinecap="round" />
          {/* Wooden Dough Table (dagasztóasztal) on bottom right */}
          <rect x="148" y="114" width="152" height="12" rx="4" fill="#D97706" stroke="#1E293B" strokeWidth="2.6" />
          <rect x="158" y="126" width="10" height="36" fill="#92400E" stroke="#1E293B" strokeWidth="2.2" />
          <rect x="280" y="126" width="10" height="36" fill="#92400E" stroke="#1E293B" strokeWidth="2.2" />
          {/* Dough & rolling pin & loaf on table */}
          <ellipse cx="194" cy="108" rx="22" ry="9" fill="#FEF3C7" stroke="#1E293B" strokeWidth="2.2" />
          <rect x="228" y="104" width="38" height="9" rx="4" fill="#B45309" stroke="#1E293B" strokeWidth="2" />
          <ellipse cx="278" cy="106" rx="16" ry="9" fill="#D97706" stroke="#1E293B" strokeWidth="2.2" />
        </svg>
      );

    case 'gyogyszertar':
      // Objects: gyógyszeres dobozok (medicine boxes/bottles), polcok (shelves), gyógyszertári pult (counter) — NO TEXT
      return (
        <svg viewBox="0 0 320 200" className={className} aria-hidden="true">
          <rect width="320" height="200" rx="18" fill="#F0FDF4" />
          <rect x="0" y="160" width="320" height="40" fill="#DCFCE7" />
          {/* Wall shelves */}
          <rect x="28" y="32" width="264" height="72" rx="6" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2.8" />
          <line x1="28" y1="68" x2="292" y2="68" stroke="#1E293B" strokeWidth="2.5" />
          {/* Medicine boxes & bottles on top shelf */}
          <rect x="44" y="42" width="24" height="24" rx="3" fill="#38BDF8" stroke="#1E293B" strokeWidth="2" />
          <rect x="74" y="44" width="28" height="22" rx="3" fill="#4ADE80" stroke="#1E293B" strokeWidth="2" />
          <rect x="112" y="40" width="18" height="26" rx="4" fill="#F59E0B" stroke="#1E293B" strokeWidth="2" />
          <rect x="115" y="35" width="12" height="5" fill="#1E293B" />
          <rect x="144" y="44" width="30" height="22" rx="3" fill="#FB7185" stroke="#1E293B" strokeWidth="2" />
          {/* Cross symbol emblem on wall (no text) */}
          <circle cx="236" cy="50" r="14" fill="#DCFCE7" stroke="#16A34A" strokeWidth="2" />
          <rect x="233" y="41" width="6" height="18" rx="1" fill="#16A34A" />
          <rect x="227" y="47" width="18" height="6" rx="1" fill="#16A34A" />
          {/* Bottles & boxes on lower shelf */}
          <rect x="46" y="76" width="26" height="24" rx="3" fill="#A78BFA" stroke="#1E293B" strokeWidth="2" />
          <rect x="82" y="78" width="20" height="22" rx="4" fill="#38BDF8" stroke="#1E293B" strokeWidth="2" />
          <rect x="116" y="76" width="32" height="24" rx="3" fill="#FDE047" stroke="#1E293B" strokeWidth="2" />
          <rect x="160" y="76" width="26" height="24" rx="3" fill="#4ADE80" stroke="#1E293B" strokeWidth="2" />
          {/* Pharmacy Counter */}
          <rect x="34" y="122" width="252" height="44" rx="6" fill="#0D9488" stroke="#1E293B" strokeWidth="2.8" />
          <rect x="28" y="116" width="264" height="10" rx="4" fill="#CCFBF1" stroke="#1E293B" strokeWidth="2.5" />
          {/* Medicine box & mortar on counter */}
          <rect x="82" y="100" width="26" height="16" rx="2" fill="#38BDF8" stroke="#1E293B" strokeWidth="2" />
          <ellipse cx="95" cy="108" rx="4" ry="2" fill="#FFFFFF" />
          <path d="M210 100 H236 L232 116 H214 Z" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2.2" />
        </svg>
      );

    case 'autoszerelo_muhely':
      // Objects: autóemelő (car lift), szerszámok (tools on board), kerék (spare wheels) — NO TEXT
      return (
        <svg viewBox="0 0 320 200" className={className} aria-hidden="true">
          <rect width="320" height="200" rx="18" fill="#F1F5F9" />
          <rect x="0" y="160" width="320" height="40" fill="#CBD5E1" />
          {/* Car lift pillars */}
          <rect x="44" y="42" width="14" height="122" rx="3" fill="#DC2626" stroke="#1E293B" strokeWidth="2.6" />
          <rect x="174" y="42" width="14" height="122" rx="3" fill="#DC2626" stroke="#1E293B" strokeWidth="2.6" />
          <rect x="44" y="106" width="144" height="8" fill="#475569" stroke="#1E293B" strokeWidth="2" />
          {/* Raised car on lift */}
          <path d="M56 106 V86 L74 68 H146 L166 86 V106 Z" fill="#0284C7" stroke="#1E293B" strokeWidth="2.6" strokeLinejoin="round" />
          <path d="M78 84 L90 72 H138 L150 84 Z" fill="#BAE6FD" stroke="#1E293B" strokeWidth="2" />
          <circle cx="82" cy="106" r="13" fill="#334155" stroke="#1E293B" strokeWidth="2.4" />
          <circle cx="82" cy="106" r="5" fill="#CBD5E1" />
          <circle cx="146" cy="106" r="13" fill="#334155" stroke="#1E293B" strokeWidth="2.4" />
          <circle cx="146" cy="106" r="5" fill="#CBD5E1" />
          {/* Tool pegboard on right */}
          <rect x="214" y="34" width="84" height="68" rx="6" fill="#FEF3C7" stroke="#1E293B" strokeWidth="2.6" />
          {/* Wrench, hammer, screwdriver */}
          <path d="M234 46 V86" stroke="#64748B" strokeWidth="6" strokeLinecap="round" />
          <circle cx="234" cy="46" r="6" fill="#64748B" stroke="#1E293B" strokeWidth="2" />
          <path d="M258 50 V86" stroke="#92400E" strokeWidth="5" strokeLinecap="round" />
          <rect x="249" y="44" width="18" height="9" rx="2" fill="#475569" stroke="#1E293B" strokeWidth="2" />
          <path d="M280 56 V86" stroke="#475569" strokeWidth="3.5" />
          <rect x="275" y="42" width="10" height="14" rx="3" fill="#EF4444" stroke="#1E293B" strokeWidth="2" />
          {/* Spare Tire / Wheel on floor */}
          <circle cx="256" cy="144" r="24" fill="#1E293B" stroke="#0F172A" strokeWidth="2.5" />
          <circle cx="256" cy="144" r="11" fill="#CBD5E1" stroke="#1E293B" strokeWidth="2" />
        </svg>
      );

    case 'fodraszszalon':
      // Objects: tükör (large mirror), fodrászszék (salon chair), hajszárító (hairdryer + scissors) — NO TEXT
      return (
        <svg viewBox="0 0 320 200" className={className} aria-hidden="true">
          <rect width="320" height="200" rx="18" fill="#FDF2F8" />
          <rect x="0" y="160" width="320" height="40" fill="#FBCFE8" />
          {/* Large Framed Mirror */}
          <rect x="44" y="24" width="110" height="96" rx="12" fill="#E0F2FE" stroke="#1E293B" strokeWidth="3" />
          <path d="M62 42 L84 64 M72 36 L98 62" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" opacity="0.7" />
          {/* Vanity shelf below mirror */}
          <rect x="34" y="124" width="130" height="10" rx="4" fill="#F472B6" stroke="#1E293B" strokeWidth="2.4" />
          {/* Hairdryer on shelf */}
          <path d="M52 104 H76 C84 104, 86 116, 76 116 H52 Z" fill="#EC4899" stroke="#1E293B" strokeWidth="2.2" />
          <rect x="64" y="116" width="8" height="10" fill="#334155" />
          {/* Comb & Spray bottle */}
          <rect x="108" y="100" width="14" height="24" rx="4" fill="#38BDF8" stroke="#1E293B" strokeWidth="2" />
          <rect x="132" y="106" width="22" height="16" rx="2" fill="#FACC15" stroke="#1E293B" strokeWidth="2" />
          {/* Swivel Salon Chair (fodrászszék) on right */}
          <rect x="206" y="72" width="66" height="46" rx="12" fill="#DB2777" stroke="#1E293B" strokeWidth="2.8" />
          <rect x="198" y="114" width="82" height="16" rx="6" fill="#EC4899" stroke="#1E293B" strokeWidth="2.6" />
          <rect x="234" y="130" width="10" height="28" fill="#64748B" stroke="#1E293B" strokeWidth="2" />
          <rect x="210" y="156" width="58" height="8" rx="4" fill="#475569" stroke="#1E293B" strokeWidth="2" />
        </svg>
      );

    case 'allatorvosi_rendelo':
      // Objects: vizsgálóasztal (exam table), állathordozó (pet carrier), sztetoszkóp (stethoscope) — NO TEXT
      return (
        <svg viewBox="0 0 320 200" className={className} aria-hidden="true">
          <rect width="320" height="200" rx="18" fill="#ECFDF5" />
          <rect x="0" y="158" width="320" height="42" fill="#D1FAE5" />
          {/* Exam Table */}
          <rect x="36" y="106" width="150" height="14" rx="4" fill="#38BDF8" stroke="#1E293B" strokeWidth="2.6" />
          <rect x="52" y="120" width="10" height="42" fill="#64748B" stroke="#1E293B" strokeWidth="2" />
          <rect x="160" y="120" width="10" height="42" fill="#64748B" stroke="#1E293B" strokeWidth="2" />
          {/* Cute cat sitting on exam table */}
          <ellipse cx="96" cy="92" rx="16" ry="14" fill="#F97316" stroke="#1E293B" strokeWidth="2.4" />
          <circle cx="96" cy="70" r="12" fill="#FB923C" stroke="#1E293B" strokeWidth="2.4" />
          <path d="M86 62 L84 52 L93 58 Z M106 62 L108 52 L99 58 Z" fill="#F97316" stroke="#1E293B" strokeWidth="2" />
          <circle cx="92" cy="69" r="2" fill="#1E293B" />
          <circle cx="100" cy="69" r="2" fill="#1E293B" />
          {/* Stethoscope on table */}
          <path d="M138 74 V88 C138 98, 158 98, 158 88 V74" fill="none" stroke="#1E293B" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M148 96 V104 H168" fill="none" stroke="#0284C7" strokeWidth="3.5" strokeLinecap="round" />
          <circle cx="170" cy="102" r="5" fill="#94A3B8" stroke="#1E293B" strokeWidth="2" />
          {/* Pet Carrier (állathordozó) on right */}
          <rect x="206" y="104" width="84" height="58" rx="10" fill="#F59E0B" stroke="#1E293B" strokeWidth="2.8" />
          <rect x="234" y="96" width="28" height="8" rx="3" fill="#475569" stroke="#1E293B" strokeWidth="2" />
          <rect x="216" y="114" width="44" height="38" rx="4" fill="#E2E8F0" stroke="#1E293B" strokeWidth="2.2" />
          <path d="M226 114 V152 M238 114 V152 M250 114 V152 M216 128 H260 M216 140 H260" stroke="#475569" strokeWidth="2" />
          {/* Wall Cross Emblem */}
          <circle cx="248" cy="48" r="18" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2.4" />
          <rect x="244" y="38" width="8" height="20" rx="1.5" fill="#EF4444" />
          <rect x="238" y="44" width="20" height="8" rx="1.5" fill="#EF4444" />
        </svg>
      );

    case 'viraguzlet':
      // Objects: virágcsokrok (bouquets), vázák (vases), szalagok (colorful ribbons) — NO TEXT
      return (
        <svg viewBox="0 0 320 200" className={className} aria-hidden="true">
          <rect width="320" height="200" rx="18" fill="#FFF1F2" />
          <rect x="0" y="158" width="320" height="42" fill="#FFE4E6" />
          {/* Counter / Flower Stand */}
          <rect x="30" y="118" width="260" height="46" rx="6" fill="#D97706" stroke="#1E293B" strokeWidth="2.8" />
          <rect x="24" y="112" width="272" height="10" rx="4" fill="#FDE68A" stroke="#1E293B" strokeWidth="2.4" />
          {/* Vase 1 with colorful bouquet */}
          <path d="M56 76 H84 L90 112 H50 Z" fill="#38BDF8" stroke="#1E293B" strokeWidth="2.4" />
          <circle cx="60" cy="60" r="10" fill="#EC4899" stroke="#1E293B" strokeWidth="2" />
          <circle cx="78" cy="56" r="10" fill="#FACC15" stroke="#1E293B" strokeWidth="2" />
          <circle cx="70" cy="70" r="10" fill="#FB7185" stroke="#1E293B" strokeWidth="2" />
          {/* Vase 2 with bouquet + bow ribbon */}
          <path d="M144 74 H176 L180 112 H140 Z" fill="#A78BFA" stroke="#1E293B" strokeWidth="2.4" />
          <circle cx="148" cy="54" r="10" fill="#EF4444" stroke="#1E293B" strokeWidth="2" />
          <circle cx="164" cy="48" r="10" fill="#F472B6" stroke="#1E293B" strokeWidth="2" />
          <circle cx="174" cy="62" r="10" fill="#F59E0B" stroke="#1E293B" strokeWidth="2" />
          {/* Ribbon bow on Vase 2 */}
          <path d="M150 92 L160 88 L150 84 Z M170 92 L160 88 L170 84 Z" fill="#F43F5E" stroke="#1E293B" strokeWidth="1.8" />
          {/* Ribbon spools on shelf / counter */}
          <rect x="218" y="88" width="24" height="24" rx="4" fill="#EC4899" stroke="#1E293B" strokeWidth="2.2" />
          <path d="M242 96 Q256 100 250 112" fill="none" stroke="#EC4899" strokeWidth="4" strokeLinecap="round" />
          <rect x="256" y="92" width="22" height="20" rx="4" fill="#FACC15" stroke="#1E293B" strokeWidth="2.2" />
          <path d="M278 100 Q290 104 284 112" fill="none" stroke="#FACC15" strokeWidth="4" strokeLinecap="round" />
        </svg>
      );

    case 'konyvtar':
      // Objects: könyvespolcok (bookshelves), olvasóasztal (reading desk), kölcsönzőpult (checkout desk) — NO TEXT
      return (
        <svg viewBox="0 0 320 200" className={className} aria-hidden="true">
          <rect width="320" height="200" rx="18" fill="#EEF2FF" />
          <rect x="0" y="160" width="320" height="40" fill="#E0E7FF" />
          {/* Tall Bookshelves */}
          <rect x="24" y="24" width="132" height="136" rx="4" fill="#92400E" stroke="#1E293B" strokeWidth="2.8" />
          <rect x="32" y="32" width="116" height="34" fill="#FEF3C7" />
          <rect x="32" y="74" width="116" height="34" fill="#FEF3C7" />
          <rect x="32" y="116" width="116" height="34" fill="#FEF3C7" />
          {/* Books on shelf 1 */}
          <rect x="36" y="38" width="12" height="28" fill="#DC2626" stroke="#1E293B" strokeWidth="1.6" />
          <rect x="49" y="42" width="11" height="24" fill="#2563EB" stroke="#1E293B" strokeWidth="1.6" />
          <rect x="61" y="36" width="14" height="30" fill="#16A34A" stroke="#1E293B" strokeWidth="1.6" />
          <rect x="76" y="40" width="12" height="26" fill="#F59E0B" stroke="#1E293B" strokeWidth="1.6" />
          <rect x="94" y="38" width="13" height="28" fill="#7C3AED" stroke="#1E293B" strokeWidth="1.6" />
          <rect x="108" y="42" width="12" height="24" fill="#0EA5E9" stroke="#1E293B" strokeWidth="1.6" />
          {/* Books on shelf 2 */}
          <rect x="36" y="80" width="14" height="28" fill="#0EA5E9" stroke="#1E293B" strokeWidth="1.6" />
          <rect x="51" y="82" width="12" height="26" fill="#EC4899" stroke="#1E293B" strokeWidth="1.6" />
          <rect x="64" y="78" width="12" height="30" fill="#F59E0B" stroke="#1E293B" strokeWidth="1.6" />
          <rect x="82" y="82" width="14" height="26" fill="#16A34A" stroke="#1E293B" strokeWidth="1.6" />
          <rect x="97" y="78" width="12" height="30" fill="#DC2626" stroke="#1E293B" strokeWidth="1.6" />
          {/* Reading Desk & Lamp (olvasóasztal) + Circulation Counter */}
          <rect x="176" y="114" width="120" height="46" rx="5" fill="#B45309" stroke="#1E293B" strokeWidth="2.8" />
          <rect x="170" y="108" width="132" height="10" rx="3" fill="#F59E0B" stroke="#1E293B" strokeWidth="2.4" />
          {/* Open book & lamp on desk */}
          <path d="M190 100 Q204 94 214 100 Q224 94 238 100 V108 H190 Z" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2" />
          <path d="M268 108 V86 H258" fill="none" stroke="#1E293B" strokeWidth="3" />
          <path d="M248 86 L258 72 L268 86 Z" fill="#10B981" stroke="#1E293B" strokeWidth="2" />
        </svg>
      );

    case 'fazekasmuhely':
      // Objects: fazekaskorong (potter's wheel), agyagedények (clay pots), kemence (kiln) — NO TEXT
      return (
        <svg viewBox="0 0 320 200" className={className} aria-hidden="true">
          <rect width="320" height="200" rx="18" fill="#FFF7ED" />
          <rect x="0" y="158" width="320" height="42" fill="#FFEDD5" />
          {/* Kiln (égetőkemence) on left */}
          <rect x="26" y="60" width="76" height="98" rx="10" fill="#9A3412" stroke="#1E293B" strokeWidth="2.8" />
          <rect x="44" y="88" width="40" height="44" rx="6" fill="#451A03" stroke="#1E293B" strokeWidth="2.4" />
          <circle cx="64" cy="110" r="10" fill="#F97316" />
          {/* Shelves with finished clay pots */}
          <rect x="122" y="54" width="174" height="8" rx="3" fill="#B45309" stroke="#1E293B" strokeWidth="2.4" />
          <path d="M140 30 H156 L152 38 C160 42, 160 52, 152 54 H144 C136 52, 136 42, 144 38 Z" fill="#EA580C" stroke="#1E293B" strokeWidth="2" />
          <path d="M188 32 H210 L206 54 H192 Z" fill="#D97706" stroke="#1E293B" strokeWidth="2" />
          <circle cx="250" cy="42" r="12" fill="#0EA5E9" stroke="#1E293B" strokeWidth="2" />
          {/* Potter's Wheel (fazekaskorong) */}
          <rect x="150" y="130" width="84" height="12" rx="4" fill="#78350F" stroke="#1E293B" strokeWidth="2.4" />
          <rect x="164" y="142" width="10" height="20" fill="#78350F" stroke="#1E293B" strokeWidth="2" />
          <rect x="210" y="142" width="10" height="20" fill="#78350F" stroke="#1E293B" strokeWidth="2" />
          <ellipse cx="192" cy="126" rx="32" ry="7" fill="#94A3B8" stroke="#1E293B" strokeWidth="2.4" />
          {/* Fresh clay vase being shaped */}
          <path d="M178 88 H206 L201 98 C212 104, 212 120, 200 124 H184 C172 120, 172 104, 183 98 Z" fill="#C2410C" stroke="#1E293B" strokeWidth="2.4" />
        </svg>
      );
  }
};
