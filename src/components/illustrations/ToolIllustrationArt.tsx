import React from 'react';
import { SituationId, ToolId } from '../../data/station2Tools';

interface ToolIllustrationArtProps {
  toolId: ToolId;
  className?: string;
}

export const ToolIllustrationArt: React.FC<ToolIllustrationArtProps> = ({
  toolId,
  className = 'w-16 h-16',
}) => {
  switch (toolId) {
    case 'sztetoszkop':
      return (
        <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
          <circle cx="50" cy="50" r="42" fill="#E0F2FE" />
          <path
            d="M32 22 V42 C32 56, 60 56, 60 42 V22"
            fill="none"
            stroke="#1E293B"
            strokeWidth="4.5"
            strokeLinecap="round"
          />
          <circle cx="32" cy="21" r="4" fill="#0284C7" stroke="#1E293B" strokeWidth="2" />
          <circle cx="60" cy="21" r="4" fill="#0284C7" stroke="#1E293B" strokeWidth="2" />
          <path
            d="M46 53 V68 C46 80, 72 80, 72 66 V58"
            fill="none"
            stroke="#0284C7"
            strokeWidth="4.5"
            strokeLinecap="round"
          />
          <circle cx="72" cy="55" r="9" fill="#94A3B8" stroke="#1E293B" strokeWidth="2.8" />
          <circle cx="72" cy="55" r="4" fill="#E2E8F0" />
        </svg>
      );

    case 'fozoedeny':
      return (
        <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
          <circle cx="50" cy="50" r="42" fill="#FEF3C7" />
          {/* Steam */}
          <path d="M40 28 C37 22, 43 18, 40 13 M52 26 C49 20, 55 16, 52 11 M64 28 C61 22, 67 18, 64 13" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          {/* Handles */}
          <path d="M18 46 H26 M74 46 H82" stroke="#1E293B" strokeWidth="4.5" strokeLinecap="round" />
          {/* Pot body */}
          <path d="M25 42 H75 V70 C75 76, 68 80, 50 80 C32 80, 25 76, 25 70 Z" fill="#DC2626" stroke="#1E293B" strokeWidth="2.8" />
          {/* Lid */}
          <path d="M23 42 C25 32, 75 32, 77 42 Z" fill="#CBD5E1" stroke="#1E293B" strokeWidth="2.5" />
          <circle cx="50" cy="31" r="4" fill="#F59E0B" stroke="#1E293B" strokeWidth="2" />
        </svg>
      );

    case 'komuveskanal':
      return (
        <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
          <circle cx="50" cy="50" r="42" fill="#FFEDD5" />
          {/* Blade */}
          <path
            d="M22 68 L48 34 L72 52 L34 78 Z"
            fill="#94A3B8"
            stroke="#1E293B"
            strokeWidth="2.8"
            strokeLinejoin="round"
          />
          <path d="M58 42 L66 34" stroke="#475569" strokeWidth="4" strokeLinecap="round" />
          {/* Wooden handle */}
          <path
            d="M65 35 L78 22 C82 18, 87 23, 83 27 L70 40 Z"
            fill="#B45309"
            stroke="#1E293B"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
        </svg>
      );

    case 'tuzolototomlo':
      return (
        <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
          <circle cx="50" cy="50" r="42" fill="#FEE2E2" />
          {/* Coiled red hose */}
          <circle cx="46" cy="54" r="24" fill="none" stroke="#DC2626" strokeWidth="9" />
          <circle cx="46" cy="54" r="24" fill="none" stroke="#1E293B" strokeWidth="2.2" />
          <circle cx="46" cy="54" r="14" fill="none" stroke="#EF4444" strokeWidth="7" />
          <circle cx="46" cy="54" r="14" fill="none" stroke="#1E293B" strokeWidth="2" />
          {/* Brass nozzle */}
          <path d="M56 32 L76 22 L81 30 L62 40 Z" fill="#F59E0B" stroke="#1E293B" strokeWidth="2.2" strokeLinejoin="round" />
          {/* Water drops */}
          <path d="M84 20 Q90 16 88 23 M86 28 Q93 27 89 32" stroke="#0EA5E9" strokeWidth="2.8" strokeLinecap="round" fill="none" />
        </svg>
      );

    case 'ontozokanna':
      return (
        <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
          <circle cx="50" cy="50" r="42" fill="#DCFCE7" />
          {/* Handle */}
          <path d="M38 40 C30 22, 62 22, 58 44" fill="none" stroke="#1E293B" strokeWidth="4" strokeLinecap="round" />
          {/* Spout */}
          <path d="M62 58 L82 38 L86 43 L66 66 Z" fill="#16A34A" stroke="#1E293B" strokeWidth="2.4" strokeLinejoin="round" />
          <ellipse cx="85" cy="40" rx="4" ry="7" transform="rotate(-40 85 40)" fill="#FACC15" stroke="#1E293B" strokeWidth="2" />
          {/* Body */}
          <rect x="28" y="42" width="38" height="34" rx="8" fill="#22C55E" stroke="#1E293B" strokeWidth="2.8" />
          <ellipse cx="47" cy="42" rx="14" ry="4" fill="#15803D" stroke="#1E293B" strokeWidth="2" />
        </svg>
      );

    case 'tabla':
      return (
        <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
          <circle cx="50" cy="50" r="42" fill="#E0E7FF" />
          {/* Frame */}
          <rect x="18" y="24" width="64" height="46" rx="4" fill="#B45309" stroke="#1E293B" strokeWidth="2.8" />
          {/* Green chalkboard */}
          <rect x="23" y="29" width="54" height="36" rx="2" fill="#14532D" stroke="#1E293B" strokeWidth="2" />
          {/* Chalk math & letter */}
          <path d="M31 40 H43 M37 34 V46 M48 40 H58" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M31 55 H66" stroke="#FDE047" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="4 4" />
          {/* Chalk ledge */}
          <rect x="20" y="70" width="60" height="5" rx="2" fill="#92400E" stroke="#1E293B" strokeWidth="2" />
          <rect x="54" y="66" width="10" height="4" rx="1" fill="#FFFFFF" stroke="#1E293B" strokeWidth="1.5" />
        </svg>
      );

    case 'ollo_es_fesu':
      return (
        <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
          <circle cx="50" cy="50" r="42" fill="#FCE7F3" />
          {/* Comb on right */}
          <rect x="58" y="22" width="16" height="54" rx="3" fill="#F59E0B" stroke="#1E293B" strokeWidth="2.4" />
          <path d="M58 29 H67 M58 36 H67 M58 43 H67 M58 50 H67 M58 57 H67 M58 64 H67 M58 71 H67" stroke="#1E293B" strokeWidth="2" />
          {/* Scissors on left */}
          <path d="M28 22 L46 58 M48 22 L30 58" stroke="#94A3B8" strokeWidth="5" strokeLinecap="round" />
          <path d="M28 22 L46 58 M48 22 L30 58" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
          <circle cx="27" cy="68" r="8" fill="none" stroke="#DB2777" strokeWidth="4.5" />
          <circle cx="27" cy="68" r="8" fill="none" stroke="#1E293B" strokeWidth="1.8" />
          <circle cx="47" cy="68" r="8" fill="none" stroke="#DB2777" strokeWidth="4.5" />
          <circle cx="47" cy="68" r="8" fill="none" stroke="#1E293B" strokeWidth="1.8" />
        </svg>
      );

    case 'festohenger':
      return (
        <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
          <circle cx="50" cy="50" r="42" fill="#EDE9FE" />
          {/* Roller cylinder */}
          <rect x="22" y="24" width="46" height="20" rx="6" fill="#0EA5E9" stroke="#1E293B" strokeWidth="2.8" />
          <rect x="22" y="24" width="46" height="7" rx="3" fill="#38BDF8" />
          {/* Wire frame */}
          <path d="M68 34 H76 V48 L50 54 V62" fill="none" stroke="#475569" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
          {/* Handle */}
          <rect x="44" y="60" width="12" height="24" rx="5" fill="#F59E0B" stroke="#1E293B" strokeWidth="2.5" />
        </svg>
      );

    case 'homero':
      return (
        <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
          <circle cx="50" cy="50" r="42" fill="#E0F2FE" />
          <rect x="42" y="16" width="16" height="58" rx="8" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2.8" />
          <circle cx="50" cy="72" r="12" fill="#EF4444" stroke="#1E293B" strokeWidth="2.8" />
          <rect x="47" y="34" width="6" height="34" rx="3" fill="#EF4444" />
          <path d="M52 28 H56 M52 36 H56 M52 44 H56 M52 52 H56" stroke="#1E293B" strokeWidth="2" />
        </svg>
      );

    case 'vernyomasmero':
      return (
        <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
          <circle cx="50" cy="50" r="42" fill="#DBEAFE" />
          {/* Arm cuff */}
          <rect x="20" y="32" width="32" height="40" rx="5" fill="#1D4ED8" stroke="#1E293B" strokeWidth="2.8" />
          <path d="M24 42 H48 M24 62 H48" stroke="#93C5FD" strokeWidth="2.5" />
          {/* Gauge dial */}
          <circle cx="68" cy="36" r="15" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2.8" />
          <path d="M68 36 L75 28" stroke="#DC2626" strokeWidth="3" strokeLinecap="round" />
          <circle cx="68" cy="36" r="2.5" fill="#1E293B" />
          {/* Squeeze bulb & tube */}
          <path d="M52 60 Q68 62 68 51" fill="none" stroke="#1E293B" strokeWidth="3" />
          <ellipse cx="74" cy="70" rx="8" ry="11" fill="#334155" stroke="#1E293B" strokeWidth="2.4" />
        </svg>
      );

    case 'metszoollo':
      return (
        <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
          <circle cx="50" cy="50" r="42" fill="#DCFCE7" />
          <path d="M44 48 C34 34, 42 20, 56 22 L52 48 Z" fill="#94A3B8" stroke="#1E293B" strokeWidth="2.5" />
          <path d="M54 48 C64 34, 58 22, 46 24 L48 48 Z" fill="#CBD5E1" stroke="#1E293B" strokeWidth="2.5" />
          <path d="M46 50 L30 78 M54 50 L70 78" stroke="#16A34A" strokeWidth="9" strokeLinecap="round" />
          <path d="M46 50 L30 78 M54 50 L70 78" stroke="#1E293B" strokeWidth="2.2" strokeLinecap="round" />
          <circle cx="50" cy="49" r="4" fill="#F59E0B" stroke="#1E293B" strokeWidth="2" />
        </svg>
      );

    case 'gereblye':
      return (
        <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
          <circle cx="50" cy="50" r="42" fill="#FEF3C7" />
          {/* Wooden handle */}
          <path d="M24 78 L64 36" stroke="#B45309" strokeWidth="6" strokeLinecap="round" />
          <path d="M24 78 L64 36" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
          {/* Rake head */}
          <path d="M48 22 L78 52" stroke="#475569" strokeWidth="5" strokeLinecap="round" />
          <path d="M51 25 L43 33 M58 32 L50 40 M65 39 L57 47 M72 46 L64 54 M77 51 L69 59" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );

    case 'fesu':
      return (
        <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
          <circle cx="50" cy="50" r="42" fill="#FCE7F3" />
          <rect x="20" y="34" width="60" height="14" rx="5" fill="#EC4899" stroke="#1E293B" strokeWidth="2.5" />
          <path
            d="M25 48 V68 M31 48 V68 M37 48 V68 M43 48 V68 M49 48 V68 M55 48 V68 M61 48 V68 M67 48 V68 M73 48 V68"
            stroke="#1E293B"
            strokeWidth="2.8"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'hajvago_ollo':
      return (
        <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
          <circle cx="50" cy="50" r="42" fill="#FCE7F3" />
          <path d="M30 22 L56 60 M64 22 L38 60" stroke="#94A3B8" strokeWidth="6" strokeLinecap="round" />
          <path d="M30 22 L56 60 M64 22 L38 60" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
          <circle cx="34" cy="70" r="9" fill="none" stroke="#E11D48" strokeWidth="5" />
          <circle cx="34" cy="70" r="9" fill="none" stroke="#1E293B" strokeWidth="1.8" />
          <circle cx="60" cy="70" r="9" fill="none" stroke="#E11D48" strokeWidth="5" />
          <circle cx="60" cy="70" r="9" fill="none" stroke="#1E293B" strokeWidth="1.8" />
        </svg>
      );

    case 'hajszarito':
      return (
        <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
          <circle cx="50" cy="50" r="42" fill="#FCE7F3" />
          <path d="M24 34 H58 C68 34, 72 52, 58 54 H24 Z" fill="#EC4899" stroke="#1E293B" strokeWidth="2.8" strokeLinejoin="round" />
          <rect x="44" y="54" width="12" height="24" rx="4" fill="#334155" stroke="#1E293B" strokeWidth="2.5" />
          <path d="M74 40 H84 M74 46 H86 M74 52 H82" stroke="#38BDF8" strokeWidth="2.8" strokeLinecap="round" />
        </svg>
      );

    case 'fakanal':
      return (
        <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
          <circle cx="50" cy="50" r="42" fill="#FEF3C7" />
          <path d="M24 76 L58 42" stroke="#D97706" strokeWidth="7" strokeLinecap="round" />
          <path d="M24 76 L58 42" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
          <ellipse cx="66" cy="34" rx="14" ry="18" transform="rotate(45 66 34)" fill="#F59E0B" stroke="#1E293B" strokeWidth="2.8" />
        </svg>
      );

    case 'serpenyo':
      return (
        <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
          <circle cx="50" cy="50" r="42" fill="#FEF3C7" />
          <path d="M58 56 L84 74" stroke="#1E293B" strokeWidth="7" strokeLinecap="round" />
          <circle cx="44" cy="46" r="24" fill="#334155" stroke="#1E293B" strokeWidth="3" />
          <circle cx="44" cy="46" r="18" fill="#64748B" />
          {/* Sunny egg inside */}
          <circle cx="44" cy="46" r="9" fill="#FFFFFF" />
          <circle cx="45" cy="45" r="4.5" fill="#FACC15" />
        </svg>
      );

    case 'habvero':
      return (
        <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
          <circle cx="50" cy="50" r="42" fill="#FEF3C7" />
          <rect x="44" y="56" width="12" height="24" rx="5" fill="#EF4444" stroke="#1E293B" strokeWidth="2.5" />
          <path d="M47 56 C32 34, 34 20, 50 20 C66 20, 68 34, 53 56" fill="none" stroke="#475569" strokeWidth="2.5" />
          <path d="M49 56 C40 34, 42 20, 50 20 C58 20, 60 34, 51 56" fill="none" stroke="#475569" strokeWidth="2.5" />
          <line x1="50" y1="20" x2="50" y2="56" stroke="#475569" strokeWidth="2.5" />
        </svg>
      );

    case 'vedosisak':
      return (
        <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
          <circle cx="50" cy="50" r="42" fill="#FEE2E2" />
          <path d="M24 60 C24 30, 76 30, 76 60 Z" fill="#FACC15" stroke="#1E293B" strokeWidth="2.8" strokeLinejoin="round" />
          <rect x="18" y="58" width="64" height="8" rx="4" fill="#EAB308" stroke="#1E293B" strokeWidth="2.5" />
          <rect x="44" y="34" width="12" height="24" rx="2" fill="#DC2626" stroke="#1E293B" strokeWidth="2" />
        </svg>
      );

    case 'tuzoltokeszulek':
      return (
        <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
          <circle cx="50" cy="50" r="42" fill="#FEE2E2" />
          <rect x="35" y="34" width="28" height="46" rx="8" fill="#DC2626" stroke="#1E293B" strokeWidth="2.8" />
          <rect x="41" y="48" width="16" height="16" rx="2" fill="#FEF08A" stroke="#1E293B" strokeWidth="1.8" />
          <path d="M44 34 V26 H58 M42 26 L36 22" stroke="#1E293B" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          <path d="M63 32 C76 34, 76 52, 70 64" fill="none" stroke="#1E293B" strokeWidth="4" strokeLinecap="round" />
        </svg>
      );

    case 'vizmertek':
      return (
        <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
          <circle cx="50" cy="50" r="42" fill="#FFEDD5" />
          <rect x="16" y="40" width="68" height="20" rx="4" fill="#FACC15" stroke="#1E293B" strokeWidth="2.8" />
          <rect x="41" y="44" width="18" height="12" rx="3" fill="#BBF7D0" stroke="#1E293B" strokeWidth="2" />
          <circle cx="50" cy="50" r="3.5" fill="#16A34A" />
        </svg>
      );

    case 'simito':
      return (
        <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
          <circle cx="50" cy="50" r="42" fill="#FFEDD5" />
          <rect x="20" y="58" width="60" height="12" rx="2" fill="#94A3B8" stroke="#1E293B" strokeWidth="2.8" />
          <path d="M36 58 V42 H64 V58" fill="none" stroke="#1E293B" strokeWidth="4" strokeLinejoin="round" />
          <rect x="34" y="34" width="32" height="10" rx="4" fill="#D97706" stroke="#1E293B" strokeWidth="2.5" />
        </svg>
      );

    case 'ecset':
      return (
        <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
          <circle cx="50" cy="50" r="42" fill="#EDE9FE" />
          {/* Wooden handle */}
          <path d="M44 52 H56 L54 82 C54 84, 46 84, 46 82 Z" fill="#D97706" stroke="#1E293B" strokeWidth="2.5" />
          {/* Metal ferrule */}
          <rect x="38" y="42" width="24" height="12" rx="2" fill="#CBD5E1" stroke="#1E293B" strokeWidth="2.5" />
          {/* Bristles with paint tip */}
          <rect x="36" y="20" width="28" height="22" rx="3" fill="#FEF3C7" stroke="#1E293B" strokeWidth="2.5" />
          <path d="M36 20 H64 V30 Q57 34 50 29 Q43 34 36 30 Z" fill="#0EA5E9" />
        </svg>
      );

    case 'festekesvodor':
      return (
        <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
          <circle cx="50" cy="50" r="42" fill="#EDE9FE" />
          <path d="M28 42 C28 20, 72 20, 72 42" fill="none" stroke="#475569" strokeWidth="3.5" />
          <path d="M28 40 H72 L66 78 H34 Z" fill="#E2E8F0" stroke="#1E293B" strokeWidth="2.8" strokeLinejoin="round" />
          <path d="M28 40 H72 V50 Q62 58 55 48 Q46 57 38 48 Q32 54 28 50 Z" fill="#8B5CF6" stroke="#1E293B" strokeWidth="2" />
        </svg>
      );

    case 'furesz':
      return (
        <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
          <circle cx="50" cy="50" r="42" fill="#FEF3C7" />
          {/* Saw blade */}
          <path
            d="M18 54 L64 28 L72 44 L22 64 L26 58 L30 60 L34 54 L38 56 L42 50 L46 52 L50 46 L54 48 L58 42 L62 44 Z"
            fill="#CBD5E1"
            stroke="#1E293B"
            strokeWidth="2.4"
            strokeLinejoin="round"
          />
          {/* Wooden handle */}
          <path d="M64 26 L78 22 C84 26, 86 42, 74 48 L64 42 Z" fill="#B45309" stroke="#1E293B" strokeWidth="2.5" strokeLinejoin="round" />
          <circle cx="74" cy="34" r="4" fill="#FEF3C7" stroke="#1E293B" strokeWidth="2" />
        </svg>
      );

    case 'gyalu':
      return (
        <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
          <circle cx="50" cy="50" r="42" fill="#FEF3C7" />
          {/* Wooden plane body */}
          <rect x="20" y="52" width="60" height="20" rx="4" fill="#D97706" stroke="#1E293B" strokeWidth="2.8" />
          {/* Handle horn */}
          <path d="M64 52 C64 36, 76 36, 74 52" fill="#B45309" stroke="#1E293B" strokeWidth="2.5" />
          {/* Front knob */}
          <circle cx="30" cy="46" r="6" fill="#92400E" stroke="#1E293B" strokeWidth="2.5" />
          {/* Chisel blade */}
          <path d="M44 52 L54 30 L60 32 L50 52 Z" fill="#94A3B8" stroke="#1E293B" strokeWidth="2.4" />
        </svg>
      );

    case 'csiszolopapir':
      return (
        <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
          <circle cx="50" cy="50" r="42" fill="#FEF3C7" />
          <path d="M26 30 L74 26 L70 72 L22 76 Z" fill="#B45309" stroke="#1E293B" strokeWidth="2.8" strokeLinejoin="round" />
          <circle cx="38" cy="42" r="2" fill="#FEF3C7" />
          <circle cx="52" cy="38" r="2" fill="#FEF3C7" />
          <circle cx="60" cy="52" r="2" fill="#FEF3C7" />
          <circle cx="42" cy="58" r="2" fill="#FEF3C7" />
          <circle cx="54" cy="64" r="2" fill="#FEF3C7" />
          <circle cx="34" cy="66" r="2" fill="#FEF3C7" />
        </svg>
      );

    case 'sodrofa':
      return (
        <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
          <circle cx="50" cy="50" r="42" fill="#FEF3C7" />
          <rect x="26" y="42" width="48" height="16" rx="4" transform="rotate(-25 50 50)" fill="#D97706" stroke="#1E293B" strokeWidth="2.8" />
          <circle cx="24" cy="62" r="5" fill="#92400E" stroke="#1E293B" strokeWidth="2.2" />
          <circle cx="76" cy="38" r="5" fill="#92400E" stroke="#1E293B" strokeWidth="2.2" />
        </svg>
      );

    case 'peklapat':
      return (
        <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
          <circle cx="50" cy="50" r="42" fill="#FEF3C7" />
          <path d="M22 78 L50 50" stroke="#92400E" strokeWidth="6" strokeLinecap="round" />
          <rect x="44" y="22" width="30" height="34" rx="6" transform="rotate(45 59 39)" fill="#D97706" stroke="#1E293B" strokeWidth="2.8" />
        </svg>
      );

    case 'dagasztogep':
      return (
        <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
          <circle cx="50" cy="50" r="42" fill="#FEF3C7" />
          {/* Stand base & arm */}
          <path d="M26 76 H74 V68 H64 V32 C64 24, 30 24, 28 36 H50 V46 H60 V68 H26 Z" fill="#DC2626" stroke="#1E293B" strokeWidth="2.6" strokeLinejoin="round" />
          {/* Mixing bowl */}
          <path d="M26 50 H54 L50 68 H30 Z" fill="#CBD5E1" stroke="#1E293B" strokeWidth="2.5" strokeLinejoin="round" />
          {/* Dough hook */}
          <path d="M40 42 V54 C40 58, 44 58, 44 54" fill="none" stroke="#334155" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );

    case 'csavarkulcs':
      return (
        <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
          <circle cx="50" cy="50" r="42" fill="#E0F2FE" />
          <path
            d="M32 76 L62 46 C66 48, 74 46, 78 40 C80 36, 80 30, 76 26 L70 32 L64 26 L70 20 C64 18, 58 20, 54 24 C50 28, 50 35, 52 39 L22 69 C19 72, 29 79, 32 76 Z"
            fill="#94A3B8"
            stroke="#1E293B"
            strokeWidth="2.8"
            strokeLinejoin="round"
          />
        </svg>
      );

    case 'varrogep':
      return (
        <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
          <circle cx="50" cy="50" r="42" fill="#EDE9FE" />
          {/* Base & arm */}
          <path d="M22 72 H78 V62 H66 V36 C66 28, 30 28, 30 42 V48 H38 V40 H54 V62 H22 Z" fill="#0EA5E9" stroke="#1E293B" strokeWidth="2.6" strokeLinejoin="round" />
          {/* Needle */}
          <line x1="34" y1="48" x2="34" y2="60" stroke="#1E293B" strokeWidth="2.5" />
          {/* Thread spool */}
          <rect x="48" y="22" width="10" height="8" rx="1" fill="#F43F5E" stroke="#1E293B" strokeWidth="2" />
          <circle cx="70" cy="46" r="6" fill="#E2E8F0" stroke="#1E293B" strokeWidth="2" />
        </svg>
      );

    case 'meroszalag':
      return (
        <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
          <circle cx="50" cy="50" r="42" fill="#FEF9C3" />
          <circle cx="46" cy="48" r="22" fill="#FACC15" stroke="#1E293B" strokeWidth="2.8" />
          <circle cx="46" cy="48" r="9" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2.4" />
          <path d="M46 70 H80 V58 H62" fill="#FACC15" stroke="#1E293B" strokeWidth="2.6" strokeLinejoin="round" />
          <path d="M54 70 V65 M62 70 V65 M70 70 V65" stroke="#1E293B" strokeWidth="2" />
        </svg>
      );

    case 'gombostuparna':
      return (
        <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
          <circle cx="50" cy="50" r="42" fill="#FCE7F3" />
          {/* Pins */}
          <line x1="36" y1="30" x2="42" y2="52" stroke="#475569" strokeWidth="2.5" />
          <circle cx="35" cy="28" r="4" fill="#3B82F6" stroke="#1E293B" strokeWidth="1.8" />
          <line x1="50" y1="24" x2="50" y2="50" stroke="#475569" strokeWidth="2.5" />
          <circle cx="50" cy="22" r="4" fill="#FACC15" stroke="#1E293B" strokeWidth="1.8" />
          <line x1="64" y1="30" x2="58" y2="52" stroke="#475569" strokeWidth="2.5" />
          <circle cx="65" cy="28" r="4" fill="#22C55E" stroke="#1E293B" strokeWidth="1.8" />
          {/* Red cushion */}
          <ellipse cx="50" cy="60" rx="24" ry="15" fill="#EF4444" stroke="#1E293B" strokeWidth="2.8" />
          <path d="M32 70 H68" stroke="#92400E" strokeWidth="5" strokeLinecap="round" />
        </svg>
      );
  }
};

interface SituationIllustrationArtProps {
  situationId: SituationId;
  className?: string;
}

export const SituationIllustrationArt: React.FC<SituationIllustrationArtProps> = ({
  situationId,
  className = 'w-full h-44',
}) => {
  switch (situationId) {
    case 'szek':
      // Broken wooden chair leg
      return (
        <svg viewBox="0 0 180 120" className={className} aria-hidden="true">
          <rect width="180" height="120" rx="16" fill="#FEF3C7" />
          <ellipse cx="90" cy="102" rx="56" ry="8" fill="#FDE68A" />
          {/* Chair back & seat */}
          <rect x="64" y="22" width="8" height="44" rx="2" fill="#B45309" stroke="#1E293B" strokeWidth="2.5" />
          <rect x="108" y="22" width="8" height="44" rx="2" fill="#B45309" stroke="#1E293B" strokeWidth="2.5" />
          <rect x="64" y="26" width="52" height="12" rx="2" fill="#D97706" stroke="#1E293B" strokeWidth="2.5" />
          <rect x="58" y="62" width="64" height="10" rx="3" fill="#D97706" stroke="#1E293B" strokeWidth="2.5" />
          {/* Intact legs */}
          <rect x="64" y="72" width="8" height="28" fill="#92400E" stroke="#1E293B" strokeWidth="2.5" />
          <rect x="108" y="72" width="8" height="28" fill="#92400E" stroke="#1E293B" strokeWidth="2.5" />
          {/* Broken leg on ground */}
          <path d="M74 72 L78 82 L72 86" fill="#92400E" stroke="#1E293B" strokeWidth="2.5" />
          <rect x="82" y="94" width="22" height="7" rx="2" transform="rotate(-12 93 97)" fill="#92400E" stroke="#1E293B" strokeWidth="2" />
        </svg>
      );

    case 'vizcsap':
      // Dripping water faucet
      return (
        <svg viewBox="0 0 180 120" className={className} aria-hidden="true">
          <rect width="180" height="120" rx="16" fill="#E0F2FE" />
          <rect x="26" y="78" width="128" height="24" rx="6" fill="#BAE6FD" stroke="#1E293B" strokeWidth="2.5" />
          {/* Faucet */}
          <path d="M40 48 H94 C106 48, 110 54, 110 64 H96 V58 H40 Z" fill="#94A3B8" stroke="#1E293B" strokeWidth="2.5" strokeLinejoin="round" />
          <rect x="58" y="34" width="16" height="8" rx="2" fill="#0284C7" stroke="#1E293B" strokeWidth="2" />
          <rect x="64" y="42" width="4" height="6" fill="#475569" />
          {/* Water droplets */}
          <path d="M103 70 C98 78, 108 78, 103 70 Z" fill="#0EA5E9" stroke="#1E293B" strokeWidth="1.8" />
          <ellipse cx="103" cy="88" rx="14" ry="4" fill="#38BDF8" />
        </svg>
      );

    case 'hajvagas':
      // Haircut salon chair & mirror
      return (
        <svg viewBox="0 0 180 120" className={className} aria-hidden="true">
          <rect width="180" height="120" rx="16" fill="#FCE7F3" />
          {/* Mirror */}
          <rect x="46" y="16" width="88" height="58" rx="12" fill="#E0F2FE" stroke="#1E293B" strokeWidth="2.8" />
          {/* Smiling head with messy hair */}
          <circle cx="90" cy="48" r="16" fill="#FDE68A" stroke="#1E293B" strokeWidth="2.4" />
          <path d="M72 44 C72 24, 108 24, 108 44 C102 36, 78 36, 72 44 Z" fill="#78350F" stroke="#1E293B" strokeWidth="2" />
          <circle cx="84" cy="48" r="2" fill="#1E293B" />
          <circle cx="96" cy="48" r="2" fill="#1E293B" />
          <path d="M85 55 Q90 59 95 55" fill="none" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
          {/* Salon cape */}
          <path d="M68 74 C72 60, 108 60, 112 74 Z" fill="#EC4899" stroke="#1E293B" strokeWidth="2.4" />
          <rect x="34" y="80" width="112" height="22" rx="6" fill="#FBCFE8" stroke="#1E293B" strokeWidth="2.4" />
        </svg>
      );

    case 'szaraz_virag':
      // Drooping dry flowers in garden bed
      return (
        <svg viewBox="0 0 180 120" className={className} aria-hidden="true">
          <rect width="180" height="120" rx="16" fill="#FEF9C3" />
          {/* Bright sun */}
          <circle cx="146" cy="26" r="14" fill="#FACC15" stroke="#1E293B" strokeWidth="2" />
          {/* Dry soil */}
          <rect x="20" y="84" width="140" height="22" rx="8" fill="#D97706" stroke="#1E293B" strokeWidth="2.4" />
          {/* Drooping flowers */}
          <path d="M58 84 Q56 50 72 56" fill="none" stroke="#65A30D" strokeWidth="3.5" strokeLinecap="round" />
          <circle cx="74" cy="58" r="8" fill="#FB7185" stroke="#1E293B" strokeWidth="2" />
          <path d="M112 84 Q114 48 98 54" fill="none" stroke="#65A30D" strokeWidth="3.5" strokeLinecap="round" />
          <circle cx="96" cy="56" r="8" fill="#F59E0B" stroke="#1E293B" strokeWidth="2" />
        </svg>
      );

    case 'festes':
      // Room wall to be repainted
      return (
        <svg viewBox="0 0 180 120" className={className} aria-hidden="true">
          <rect width="180" height="120" rx="16" fill="#EDE9FE" />
          <rect x="28" y="20" width="124" height="72" rx="4" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2.5" />
          {/* Half painted bright sky blue strip */}
          <rect x="28" y="20" width="54" height="72" rx="2" fill="#38BDF8" stroke="#1E293B" strokeWidth="2" />
          {/* Floor */}
          <rect x="20" y="92" width="140" height="14" rx="4" fill="#D97706" stroke="#1E293B" strokeWidth="2.2" />
        </svg>
      );

    case 'orvosi_vizsgalat':
      // Medical checkup clinic room
      return (
        <svg viewBox="0 0 180 120" className={className} aria-hidden="true">
          <rect width="180" height="120" rx="16" fill="#E0F2FE" />
          {/* Red Cross emblem */}
          <circle cx="90" cy="48" r="24" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2.6" />
          <rect x="85" y="34" width="10" height="28" rx="2" fill="#EF4444" />
          <rect x="76" y="43" width="28" height="10" rx="2" fill="#EF4444" />
          {/* Exam table */}
          <rect x="34" y="82" width="112" height="14" rx="5" fill="#0284C7" stroke="#1E293B" strokeWidth="2.4" />
          <rect x="44" y="96" width="8" height="12" fill="#334155" />
          <rect x="128" y="96" width="8" height="12" fill="#334155" />
        </svg>
      );

    case 'kenyersutes':
      // Bakery loaves and oven
      return (
        <svg viewBox="0 0 180 120" className={className} aria-hidden="true">
          <rect width="180" height="120" rx="16" fill="#FFEDD5" />
          {/* Bakery oven arch */}
          <path d="M44 92 V46 C44 20, 136 20, 136 46 V92 Z" fill="#D97706" stroke="#1E293B" strokeWidth="2.8" />
          <path d="M64 92 V56 C64 38, 116 38, 116 56 V92 Z" fill="#7C2D12" stroke="#1E293B" strokeWidth="2.4" />
          {/* Golden loaves */}
          <ellipse cx="76" cy="84" rx="18" ry="10" fill="#F59E0B" stroke="#1E293B" strokeWidth="2.2" />
          <ellipse cx="106" cy="84" rx="18" ry="10" fill="#FBBF24" stroke="#1E293B" strokeWidth="2.2" />
        </svg>
      );

    case 'teglafal':
      // Brick wall under construction
      return (
        <svg viewBox="0 0 180 120" className={className} aria-hidden="true">
          <rect width="180" height="120" rx="16" fill="#FFEDD5" />
          {/* Bricks */}
          <rect x="32" y="76" width="38" height="18" rx="2" fill="#DC2626" stroke="#1E293B" strokeWidth="2.2" />
          <rect x="70" y="76" width="38" height="18" rx="2" fill="#EF4444" stroke="#1E293B" strokeWidth="2.2" />
          <rect x="108" y="76" width="38" height="18" rx="2" fill="#DC2626" stroke="#1E293B" strokeWidth="2.2" />
          <rect x="46" y="58" width="38" height="18" rx="2" fill="#EF4444" stroke="#1E293B" strokeWidth="2.2" />
          <rect x="84" y="58" width="38" height="18" rx="2" fill="#DC2626" stroke="#1E293B" strokeWidth="2.2" />
          <rect x="64" y="40" width="38" height="18" rx="2" fill="#F87171" stroke="#1E293B" strokeWidth="2.2" />
        </svg>
      );

    case 'ruha_varras':
      // Dress pattern & colorful cloth
      return (
        <svg viewBox="0 0 180 120" className={className} aria-hidden="true">
          <rect width="180" height="120" rx="16" fill="#EDE9FE" />
          {/* Dress silhouette */}
          <path
            d="M72 24 H108 L114 48 L104 52 L118 96 H62 L76 52 L66 48 Z"
            fill="#EC4899"
            stroke="#1E293B"
            strokeWidth="2.8"
            strokeLinejoin="round"
          />
          <circle cx="90" cy="40" r="3" fill="#FFFFFF" />
          <circle cx="90" cy="52" r="3" fill="#FFFFFF" />
        </svg>
      );

    case 'levelek':
      // Fallen autumn leaves on garden lawn
      return (
        <svg viewBox="0 0 180 120" className={className} aria-hidden="true">
          <rect width="180" height="120" rx="16" fill="#DCFCE7" />
          <rect x="20" y="76" width="140" height="28" rx="8" fill="#4ADE80" stroke="#1E293B" strokeWidth="2.2" />
          {/* Fallen leaves */}
          <ellipse cx="52" cy="86" rx="10" ry="6" transform="rotate(-20 52 86)" fill="#F97316" stroke="#1E293B" strokeWidth="2" />
          <ellipse cx="86" cy="92" rx="11" ry="6" transform="rotate(15 86 92)" fill="#EAB308" stroke="#1E293B" strokeWidth="2" />
          <ellipse cx="122" cy="86" rx="10" ry="6" transform="rotate(-10 122 86)" fill="#EF4444" stroke="#1E293B" strokeWidth="2" />
          <ellipse cx="102" cy="44" rx="8" ry="5" transform="rotate(35 102 44)" fill="#F97316" stroke="#1E293B" strokeWidth="1.8" />
          <ellipse cx="64" cy="50" rx="8" ry="5" transform="rotate(-30 64 50)" fill="#EAB308" stroke="#1E293B" strokeWidth="1.8" />
        </svg>
      );
  }
};
