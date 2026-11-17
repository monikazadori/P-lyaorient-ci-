import React from 'react';
import { CitizenProblemId } from '../../data/station4Workplaces';

interface WorkflowStepArtProps {
  stepKey: string;
  className?: string;
}

// Crisp, recognizable SVG illustrations for each of the 32 workflow phases (ZERO numbers!)
export const WorkflowStepArt: React.FC<WorkflowStepArtProps> = ({
  stepKey,
  className = 'w-16 h-16',
}) => {
  switch (stepKey) {
    // 1. Pék – Kenyérsütés
    case 'pek_1': // Hozzávalók előkészítése (flour bag, egg, bowl)
      return (
        <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
          <circle cx="40" cy="40" r="36" fill="#FEF3C7" />
          <rect x="16" y="26" width="22" height="32" rx="4" fill="#D6B588" stroke="#1E293B" strokeWidth="2.2" />
          <path d="M18 26 Q27 18 36 26 Z" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2" />
          <ellipse cx="52" cy="48" rx="14" ry="10" fill="#FDE68A" stroke="#1E293B" strokeWidth="2.2" />
          <circle cx="48" cy="34" r="6" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2" />
        </svg>
      );
    case 'pek_2': // Tészta dagasztása (hands kneading dough)
      return (
        <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
          <circle cx="40" cy="40" r="36" fill="#FEF3C7" />
          <rect x="14" y="54" width="52" height="8" rx="3" fill="#B45309" stroke="#1E293B" strokeWidth="2" />
          <ellipse cx="40" cy="46" rx="20" ry="10" fill="#FDE68A" stroke="#1E293B" strokeWidth="2.2" />
          <path d="M24 28 C28 36, 36 38, 36 42 M56 28 C52 36, 44 38, 44 42" stroke="#F59E0B" strokeWidth="6" strokeLinecap="round" fill="none" />
        </svg>
      );
    case 'pek_3': // Tészta kelesztése (rising dough in bowl with towel)
      return (
        <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
          <circle cx="40" cy="40" r="36" fill="#FEF3C7" />
          <path d="M18 42 H62 C60 62, 20 62, 18 42 Z" fill="#38BDF8" stroke="#1E293B" strokeWidth="2.2" />
          <path d="M20 42 C20 22, 60 22, 60 42 Z" fill="#FEF08A" stroke="#1E293B" strokeWidth="2.2" />
          <path d="M30 18 L34 12 M40 16 V10 M50 18 L46 12" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );
    case 'pek_4': // Kenyér megsütése (oven with golden loaf)
      return (
        <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
          <circle cx="40" cy="40" r="36" fill="#FFEDD5" />
          <path d="M18 62 V34 C18 16, 62 16, 62 34 V62 Z" fill="#C2410C" stroke="#1E293B" strokeWidth="2.2" />
          <path d="M26 62 V40 C26 28, 54 28, 54 40 V62 Z" fill="#451A03" />
          <ellipse cx="40" cy="54" rx="14" ry="7" fill="#F59E0B" stroke="#1E293B" strokeWidth="2" />
        </svg>
      );

    // 2. Fodrász – Hajvágás
    case 'fodrasz_1': // Vendég kívánságának megbeszélése (speech bubble + mirror)
      return (
        <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
          <circle cx="40" cy="40" r="36" fill="#FCE7F3" />
          <circle cx="30" cy="46" r="12" fill="#FDE68A" stroke="#1E293B" strokeWidth="2.2" />
          <rect x="42" y="20" width="24" height="18" rx="6" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2.2" />
          <path d="M47 29 H61" stroke="#EC4899" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
    case 'fodrasz_2': // Haj előkészítése (spray bottle & comb)
      return (
        <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
          <circle cx="40" cy="40" r="36" fill="#FCE7F3" />
          <rect x="22" y="34" width="16" height="28" rx="4" fill="#38BDF8" stroke="#1E293B" strokeWidth="2.2" />
          <path d="M26 34 V26 H38" fill="none" stroke="#1E293B" strokeWidth="2.4" />
          <rect x="46" y="22" width="12" height="38" rx="2" fill="#F59E0B" stroke="#1E293B" strokeWidth="2.2" />
          <path d="M46 28 H52 M46 34 H52 M46 40 H52 M46 46 H52 M46 52 H52" stroke="#1E293B" strokeWidth="1.8" />
        </svg>
      );
    case 'fodrasz_3': // Hajvágás (scissors snipping hair strand)
      return (
        <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
          <circle cx="40" cy="40" r="36" fill="#FCE7F3" />
          <path d="M24 22 L44 50 M48 22 L28 50" stroke="#94A3B8" strokeWidth="4.5" strokeLinecap="round" />
          <circle cx="27" cy="57" r="6" fill="none" stroke="#DB2777" strokeWidth="4" />
          <circle cx="45" cy="57" r="6" fill="none" stroke="#DB2777" strokeWidth="4" />
          <path d="M54 24 C62 32, 54 44, 60 52" fill="none" stroke="#78350F" strokeWidth="4" strokeLinecap="round" />
        </svg>
      );
    case 'fodrasz_4': // Frizura ellenőrzése (happy face in mirror)
      return (
        <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
          <circle cx="40" cy="40" r="36" fill="#FCE7F3" />
          <rect x="22" y="16" width="36" height="48" rx="8" fill="#E0F2FE" stroke="#1E293B" strokeWidth="2.4" />
          <circle cx="40" cy="40" r="12" fill="#FDE68A" stroke="#1E293B" strokeWidth="2" />
          <path d="M34 44 Q40 49 46 44" fill="none" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
          <path d="M62 22 L65 26 L70 18" fill="none" stroke="#16A34A" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );

    // 3. Kertész – Virágültetés
    case 'kertesz_1': // Ültetési hely előkészítése (rake smoothing soil)
      return (
        <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
          <circle cx="40" cy="40" r="36" fill="#DCFCE7" />
          <rect x="14" y="54" width="52" height="10" rx="4" fill="#92400E" stroke="#1E293B" strokeWidth="2" />
          <path d="M24 46 L52 22 M44 20 L58 34" stroke="#475569" strokeWidth="4" strokeLinecap="round" />
        </svg>
      );
    case 'kertesz_2': // Ültetőgödör készítése (trowel & hole)
      return (
        <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
          <circle cx="40" cy="40" r="36" fill="#DCFCE7" />
          <path d="M14 54 H28 Q40 66 52 54 H66 V64 H14 Z" fill="#92400E" stroke="#1E293B" strokeWidth="2" />
          <path d="M36 44 L48 26 L56 32 L44 48 Z" fill="#94A3B8" stroke="#1E293B" strokeWidth="2" />
          <path d="M52 29 L60 20" stroke="#B45309" strokeWidth="4" strokeLinecap="round" />
        </svg>
      );
    case 'kertesz_3': // Virág elültetése (flower placed in soil)
      return (
        <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
          <circle cx="40" cy="40" r="36" fill="#DCFCE7" />
          <rect x="16" y="54" width="48" height="10" rx="4" fill="#92400E" stroke="#1E293B" strokeWidth="2" />
          <line x1="40" y1="54" x2="40" y2="30" stroke="#16A34A" strokeWidth="4" />
          <circle cx="40" cy="24" r="9" fill="#EC4899" stroke="#1E293B" strokeWidth="2" />
          <circle cx="40" cy="24" r="4" fill="#FACC15" />
        </svg>
      );
    case 'kertesz_4': // Virág megöntözése (watering can drops)
      return (
        <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
          <circle cx="40" cy="40" r="36" fill="#DCFCE7" />
          <rect x="18" y="30" width="24" height="20" rx="4" fill="#22C55E" stroke="#1E293B" strokeWidth="2.2" />
          <path d="M42 42 L58 30 L62 34 L46 48 Z" fill="#16A34A" stroke="#1E293B" strokeWidth="2" />
          <path d="M62 40 V48 M56 44 V54 M66 44 V54" stroke="#0EA5E9" strokeWidth="2.8" strokeLinecap="round" />
        </svg>
      );

    // 4. Postás – Levelek kézbesítése
    case 'postas_1': // Levelek átvétele (sack of letters)
      return (
        <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
          <circle cx="40" cy="40" r="36" fill="#FEF9C3" />
          <rect x="20" y="34" width="40" height="28" rx="6" fill="#16A34A" stroke="#1E293B" strokeWidth="2.2" />
          <rect x="26" y="20" width="28" height="18" rx="2" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2" />
          <path d="M26 21 L40 30 L54 21" fill="none" stroke="#1E293B" strokeWidth="2" />
        </svg>
      );
    case 'postas_2': // Levelek rendezése (sorted stacks)
      return (
        <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
          <circle cx="40" cy="40" r="36" fill="#FEF9C3" />
          <rect x="16" y="28" width="20" height="28" rx="2" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2" />
          <rect x="42" y="24" width="22" height="32" rx="2" fill="#BAE6FD" stroke="#1E293B" strokeWidth="2" />
          <path d="M20 36 H32 M20 44 H32 M46 34 H60 M46 42 H60" stroke="#475569" strokeWidth="2" />
        </svg>
      );
    case 'postas_3': // Kézbesítési útvonal megtervezése (map route)
      return (
        <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
          <circle cx="40" cy="40" r="36" fill="#FEF9C3" />
          <rect x="18" y="20" width="44" height="40" rx="4" fill="#ECFDF5" stroke="#1E293B" strokeWidth="2.2" />
          <path d="M26 50 Q38 28 54 32" fill="none" stroke="#DC2626" strokeWidth="3" strokeDasharray="4 4" strokeLinecap="round" />
          <circle cx="26" cy="50" r="4" fill="#16A34A" />
          <circle cx="54" cy="32" r="4" fill="#DC2626" />
        </svg>
      );
    case 'postas_4': // Levelek kézbesítése (mailbox with envelope)
      return (
        <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
          <circle cx="40" cy="40" r="36" fill="#FEF9C3" />
          <rect x="24" y="26" width="32" height="26" rx="4" fill="#DC2626" stroke="#1E293B" strokeWidth="2.2" />
          <rect x="38" y="52" width="4" height="14" fill="#475569" />
          <rect x="30" y="34" width="20" height="12" rx="2" fill="#FFFFFF" stroke="#1E293B" strokeWidth="1.8" />
        </svg>
      );

    // 5. Szakács – Levesfőzés
    case 'szakacs_1': // Hozzávalók előkészítése (carrot, tomato, onion)
      return (
        <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
          <circle cx="40" cy="40" r="36" fill="#FFEDD5" />
          <path d="M22 52 L34 26 L40 32 Z" fill="#F97316" stroke="#1E293B" strokeWidth="2" />
          <circle cx="52" cy="44" r="11" fill="#EF4444" stroke="#1E293B" strokeWidth="2.2" />
          <path d="M52 33 L49 28 M52 33 L56 28" stroke="#16A34A" strokeWidth="2.4" strokeLinecap="round" />
        </svg>
      );
    case 'szakacs_2': // Zöldségek feldarabolása (cutting board & slices)
      return (
        <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
          <circle cx="40" cy="40" r="36" fill="#FFEDD5" />
          <rect x="16" y="34" width="48" height="24" rx="5" fill="#D97706" stroke="#1E293B" strokeWidth="2.2" />
          <circle cx="30" cy="46" r="5" fill="#F97316" stroke="#1E293B" strokeWidth="1.6" />
          <circle cx="42" cy="46" r="5" fill="#F97316" stroke="#1E293B" strokeWidth="1.6" />
          <circle cx="54" cy="46" r="5" fill="#4ADE80" stroke="#1E293B" strokeWidth="1.6" />
        </svg>
      );
    case 'szakacs_3': // Leves megfőzése (steaming pot)
      return (
        <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
          <circle cx="40" cy="40" r="36" fill="#FFEDD5" />
          <rect x="20" y="34" width="40" height="26" rx="4" fill="#DC2626" stroke="#1E293B" strokeWidth="2.2" />
          <path d="M30 26 Q28 20 32 16 M42 26 Q40 20 44 16 M52 26 Q50 20 54 16" stroke="#94A3B8" strokeWidth="2.4" strokeLinecap="round" fill="none" />
        </svg>
      );
    case 'szakacs_4': // Elkészült étel tálalása (soup bowl & spoon)
      return (
        <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
          <circle cx="40" cy="40" r="36" fill="#FFEDD5" />
          <path d="M18 40 H62 C60 60, 20 60, 18 40 Z" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2.2" />
          <ellipse cx="40" cy="40" rx="20" ry="5" fill="#FACC15" stroke="#1E293B" strokeWidth="1.8" />
          <path d="M52 24 L42 38" stroke="#94A3B8" strokeWidth="4" strokeLinecap="round" />
        </svg>
      );

    // 6. Virágkötő – Csokorkészítés
    case 'virag_1': // Virágok kiválasztása (assorted flowers)
      return (
        <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
          <circle cx="40" cy="40" r="36" fill="#FFF1F2" />
          <circle cx="26" cy="34" r="9" fill="#EC4899" stroke="#1E293B" strokeWidth="2" />
          <circle cx="52" cy="30" r="9" fill="#FACC15" stroke="#1E293B" strokeWidth="2" />
          <circle cx="40" cy="52" r="9" fill="#8B5CF6" stroke="#1E293B" strokeWidth="2" />
        </svg>
      );
    case 'virag_2': // Virágok előkészítése (trimming stems)
      return (
        <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
          <circle cx="40" cy="40" r="36" fill="#FFF1F2" />
          <line x1="34" y1="26" x2="34" y2="60" stroke="#16A34A" strokeWidth="4" />
          <circle cx="34" cy="24" r="8" fill="#FB7185" stroke="#1E293B" strokeWidth="2" />
          <path d="M44 46 L60 36 M44 38 L60 48" stroke="#475569" strokeWidth="3.5" strokeLinecap="round" />
        </svg>
      );
    case 'virag_3': // Csokor összeállítása (tied bouquet)
      return (
        <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
          <circle cx="40" cy="40" r="36" fill="#FFF1F2" />
          <path d="M32 38 L40 60 L48 38 Z" fill="#22C55E" stroke="#1E293B" strokeWidth="2" />
          <circle cx="32" cy="28" r="8" fill="#EC4899" stroke="#1E293B" strokeWidth="2" />
          <circle cx="48" cy="28" r="8" fill="#FACC15" stroke="#1E293B" strokeWidth="2" />
          <circle cx="40" cy="22" r="8" fill="#EF4444" stroke="#1E293B" strokeWidth="2" />
        </svg>
      );
    case 'virag_4': // Csokor becsomagolása (wrapped paper cone & bow)
      return (
        <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
          <circle cx="40" cy="40" r="36" fill="#FFF1F2" />
          <path d="M24 34 L40 64 L56 34 Z" fill="#FDE68A" stroke="#1E293B" strokeWidth="2.2" />
          <circle cx="34" cy="26" r="7" fill="#EC4899" stroke="#1E293B" strokeWidth="1.8" />
          <circle cx="46" cy="26" r="7" fill="#F59E0B" stroke="#1E293B" strokeWidth="1.8" />
          <path d="M32 48 L40 44 L32 40 Z M48 48 L40 44 L48 40 Z" fill="#E11D48" stroke="#1E293B" strokeWidth="1.5" />
        </svg>
      );

    // 7. Asztalos – Egyszerű fapolc készítése
    case 'asztalos_1': // Méretek megtervezése (ruler & pencil)
      return (
        <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
          <circle cx="40" cy="40" r="36" fill="#FEF3C7" />
          <rect x="18" y="34" width="44" height="14" rx="2" fill="#FACC15" stroke="#1E293B" strokeWidth="2.2" />
          <path d="M26 34 V40 M34 34 V40 M42 34 V40 M50 34 V40" stroke="#1E293B" strokeWidth="2" />
          <path d="M26 22 L54 22" stroke="#0284C7" strokeWidth="5" strokeLinecap="round" />
        </svg>
      );
    case 'asztalos_2': // Faanyag méretre vágása (saw & board)
      return (
        <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
          <circle cx="40" cy="40" r="36" fill="#FEF3C7" />
          <rect x="16" y="46" width="48" height="12" rx="2" fill="#D97706" stroke="#1E293B" strokeWidth="2.2" />
          <path d="M24 22 L52 44 L44 48 L18 30 Z" fill="#CBD5E1" stroke="#1E293B" strokeWidth="2" />
        </svg>
      );
    case 'asztalos_3': // Felületek csiszolása (sandpaper smoothing wood)
      return (
        <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
          <circle cx="40" cy="40" r="36" fill="#FEF3C7" />
          <rect x="16" y="46" width="48" height="12" rx="2" fill="#F59E0B" stroke="#1E293B" strokeWidth="2.2" />
          <rect x="28" y="28" width="24" height="16" rx="3" fill="#92400E" stroke="#1E293B" strokeWidth="2" />
        </svg>
      );
    case 'asztalos_4': // Polc összeállítása (finished wooden shelf)
      return (
        <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
          <circle cx="40" cy="40" r="36" fill="#FEF3C7" />
          <rect x="18" y="24" width="44" height="32" rx="2" fill="none" stroke="#92400E" strokeWidth="5" />
          <line x1="18" y1="40" x2="62" y2="40" stroke="#B45309" strokeWidth="5" />
        </svg>
      );

    // 8. Kerékpárszerelő – Defektjavítás
    case 'kerekpar_1': // Hiba megkeresése (magnifier on flat tire)
      return (
        <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
          <circle cx="40" cy="40" r="36" fill="#E0F2FE" />
          <circle cx="36" cy="42" r="16" fill="none" stroke="#334155" strokeWidth="6" />
          <circle cx="52" cy="28" r="9" fill="#BAE6FD" stroke="#1E293B" strokeWidth="2.2" />
          <line x1="58" y1="34" x2="66" y2="42" stroke="#78350F" strokeWidth="4" strokeLinecap="round" />
        </svg>
      );
    case 'kerekpar_2': // Kerék szétszerelése (wrench & detached wheel)
      return (
        <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
          <circle cx="40" cy="40" r="36" fill="#E0F2FE" />
          <circle cx="30" cy="44" r="14" fill="none" stroke="#334155" strokeWidth="5" />
          <path d="M46 48 L60 26" stroke="#64748B" strokeWidth="6" strokeLinecap="round" />
        </svg>
      );
    case 'kerekpar_3': // Sérült belső javítása/cseréje (patch on inner tube)
      return (
        <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
          <circle cx="40" cy="40" r="36" fill="#E0F2FE" />
          <circle cx="40" cy="40" r="18" fill="none" stroke="#1E293B" strokeWidth="8" />
          <rect x="33" y="18" width="14" height="9" rx="2" fill="#EF4444" stroke="#FFFFFF" strokeWidth="1.5" />
        </svg>
      );
    case 'kerekpar_4': // Kerék összeszerelése és ellenőrzése (pump & checkmark)
      return (
        <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
          <circle cx="40" cy="40" r="36" fill="#DCFCE7" />
          <circle cx="36" cy="44" r="16" fill="none" stroke="#334155" strokeWidth="5" />
          <path d="M52 32 L58 38 L68 24" fill="none" stroke="#16A34A" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
          <circle cx="40" cy="40" r="34" fill="#F1F5F9" />
        </svg>
      );
  }
};

interface CitizenCharacterArtProps {
  problemId: CitizenProblemId;
  className?: string;
}

export const CitizenCharacterArt: React.FC<CitizenCharacterArtProps> = ({
  problemId,
  className = 'w-28 h-28',
}) => {
  const paletteByProblem: Record<
    CitizenProblemId,
    { bg: string; shirt: string; hair: string; prop: 'letter' | 'glasses' | 'hair' | 'car' | 'flower' | 'book' | 'bread' | 'tap' | 'bike' | 'dog' }
  > = {
    level_feladas: { bg: '#DCFCE7', shirt: '#16A34A', hair: '#78350F', prop: 'letter' },
    szemuveg_javitas: { bg: '#E0F2FE', shirt: '#0284C7', hair: '#475569', prop: 'glasses' },
    uj_frizura: { bg: '#FCE7F3', shirt: '#EC4899', hair: '#B45309', prop: 'hair' },
    auto_fek: { bg: '#E2E8F0', shirt: '#2563EB', hair: '#1E293B', prop: 'car' },
    viragcsokor: { bg: '#FFF1F2', shirt: '#F43F5E', hair: '#D97706', prop: 'flower' },
    mesekonyv: { bg: '#EEF2FF', shirt: '#4F46E5', hair: '#7C2D12', prop: 'book' },
    kenyer_vasarlas: { bg: '#FEF3C7', shirt: '#D97706', hair: '#92400E', prop: 'bread' },
    vizcsap_hiba: { bg: '#E0F2FE', shirt: '#0D9488', hair: '#334155', prop: 'tap' },
    kerekpar_fek: { bg: '#FFEDD5', shirt: '#EA580C', hair: '#78350F', prop: 'bike' },
    kutya_vizsgalat: { bg: '#ECFDF5', shirt: '#059669', hair: '#B45309', prop: 'dog' },
  };

  const cfg = paletteByProblem[problemId];

  return (
    <svg viewBox="0 0 110 110" className={className} aria-hidden="true">
      <circle cx="55" cy="55" r="50" fill={cfg.bg} stroke="#1E293B" strokeWidth="2.5" />
      {/* Citizen shoulders */}
      <path d="M24 94 C26 72, 84 72, 86 94 Z" fill={cfg.shirt} stroke="#1E293B" strokeWidth="2.4" />
      {/* Head */}
      <circle cx="55" cy="48" r="19" fill="#FDE68A" stroke="#1E293B" strokeWidth="2.4" />
      {/* Hair */}
      <path d="M36 46 C36 24, 74 24, 74 46 C66 36, 44 36, 36 46 Z" fill={cfg.hair} stroke="#1E293B" strokeWidth="2.2" />
      {/* Eyes & smile */}
      <circle cx="48" cy="48" r="2.2" fill="#1E293B" />
      <circle cx="62" cy="48" r="2.2" fill="#1E293B" />
      <path d="M49 56 Q55 60 61 56" fill="none" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />

      {/* Prop badge in corner */}
      {cfg.prop === 'letter' && (
        <g transform="translate(66,64)">
          <rect width="30" height="22" rx="3" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2.2" />
          <path d="M0 2 L15 12 L30 2" fill="none" stroke="#16A34A" strokeWidth="2.2" />
        </g>
      )}
      {cfg.prop === 'glasses' && (
        <g transform="translate(36,43)">
          <circle cx="11" cy="5" r="6" fill="none" stroke="#1E293B" strokeWidth="2.4" />
          <circle cx="27" cy="5" r="6" fill="none" stroke="#1E293B" strokeWidth="2.4" />
          <line x1="17" y1="5" x2="21" y2="5" stroke="#1E293B" strokeWidth="2.4" />
          <path d="M28 0 L34 -6" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      )}
      {cfg.prop === 'hair' && (
        <g transform="translate(72,62)">
          <circle cx="12" cy="12" r="14" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2" />
          <path d="M6 6 L18 18 M18 6 L6 18" stroke="#EC4899" strokeWidth="2.5" />
        </g>
      )}
      {cfg.prop === 'car' && (
        <g transform="translate(62,68)">
          <path d="M2 16 V10 L8 4 H24 L30 10 V16 Z" fill="#38BDF8" stroke="#1E293B" strokeWidth="2" />
          <circle cx="9" cy="17" r="4" fill="#334155" />
          <circle cx="23" cy="17" r="4" fill="#334155" />
        </g>
      )}
      {cfg.prop === 'flower' && (
        <g transform="translate(72,62)">
          <circle cx="12" cy="12" r="9" fill="#EC4899" stroke="#1E293B" strokeWidth="2" />
          <circle cx="12" cy="12" r="4" fill="#FACC15" />
        </g>
      )}
      {cfg.prop === 'book' && (
        <g transform="translate(64,66)">
          <rect width="28" height="22" rx="3" fill="#F59E0B" stroke="#1E293B" strokeWidth="2" />
          <line x1="8" y1="0" x2="8" y2="22" stroke="#FEF3C7" strokeWidth="2" />
        </g>
      )}
      {cfg.prop === 'bread' && (
        <g transform="translate(62,70)">
          <ellipse cx="16" cy="10" rx="15" ry="9" fill="#D97706" stroke="#1E293B" strokeWidth="2" />
        </g>
      )}
      {cfg.prop === 'tap' && (
        <g transform="translate(64,66)">
          <path d="M2 8 H20 V16" fill="none" stroke="#64748B" strokeWidth="5" strokeLinecap="round" />
          <circle cx="20" cy="24" r="3.5" fill="#0EA5E9" />
        </g>
      )}
      {cfg.prop === 'bike' && (
        <g transform="translate(60,68)">
          <circle cx="8" cy="14" r="7" fill="none" stroke="#1E293B" strokeWidth="2.5" />
          <circle cx="26" cy="14" r="7" fill="none" stroke="#1E293B" strokeWidth="2.5" />
          <path d="M8 14 L16 6 H24 L26 14" fill="none" stroke="#EF4444" strokeWidth="2.5" />
        </g>
      )}
      {cfg.prop === 'dog' && (
        <g transform="translate(66,64)">
          <circle cx="14" cy="14" r="11" fill="#F59E0B" stroke="#1E293B" strokeWidth="2" />
          <ellipse cx="4" cy="14" rx="3" ry="6" fill="#92400E" />
          <ellipse cx="24" cy="14" rx="3" ry="6" fill="#92400E" />
          <circle cx="11" cy="12" r="1.5" fill="#1E293B" />
          <circle cx="17" cy="12" r="1.5" fill="#1E293B" />
          <ellipse cx="14" cy="16" rx="2.5" ry="1.8" fill="#1E293B" />
        </g>
      )}
    </svg>
  );
};
