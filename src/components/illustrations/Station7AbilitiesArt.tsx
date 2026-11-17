import React, { useState } from 'react';
import { Flower2, Star } from 'lucide-react';
import {
  AbilityPairId,
  DecisionSceneId,
  SuperpowerId,
} from '../../data/station7Abilities';

interface OwlImageProps {
  className?: string;
}

export const GardenOwlImage: React.FC<OwlImageProps> = ({ className = '' }) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br from-orange-100 to-emerald-100 text-orange-800 ${className}`}
        aria-label="Bagoly Mester a Képességek Kertjében"
      >
        <Flower2 className="w-12 h-12" aria-hidden="true" />
      </div>
    );
  }

  return (
    <img
      src="/src/assets/images/guide_owl_abilities_garden_clean_1794944744397.jpg"
      alt="Bagoly Mester a virágzó Képességek Kertjében"
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
};

export const GardenStarOwlImage: React.FC<OwlImageProps> = ({
  className = '',
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br from-amber-100 to-orange-100 text-amber-600 ${className}`}
        aria-label="Bagoly Mester nagy aranycsillaggal a kertben"
      >
        <Star className="w-12 h-12 fill-amber-400" aria-hidden="true" />
      </div>
    );
  }

  return (
    <img
      src="/src/assets/images/guide_owl_abilities_star_1794944729744.jpg"
      alt="Bagoly Mester nagy aranycsillaggal a Képességek Kertjében"
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
};

interface PairArtProps {
  pairId: AbilityPairId;
  className?: string;
}

// Game 1: Profession illustrations
export const PairProfessionArt: React.FC<PairArtProps> = ({
  pairId,
  className = 'w-14 h-14',
}) => {
  switch (pairId) {
    case 'tuzolto':
      return (
        <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
          <circle cx="40" cy="40" r="36" fill="#FEE2E2" stroke="#1E293B" strokeWidth="2.2" />
          <path d="M18 48 C18 22, 62 22, 62 48 Z" fill="#FACC15" stroke="#1E293B" strokeWidth="2.2" />
          <rect x="14" y="46" width="52" height="7" rx="3" fill="#EAB308" stroke="#1E293B" strokeWidth="2" />
          <rect x="35" y="26" width="10" height="20" rx="2" fill="#DC2626" stroke="#1E293B" strokeWidth="1.8" />
        </svg>
      );

    case 'oras':
      return (
        <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
          <circle cx="40" cy="40" r="36" fill="#FEF3C7" stroke="#1E293B" strokeWidth="2.2" />
          <rect x="36" y="12" width="8" height="8" rx="2" fill="#B45309" stroke="#1E293B" strokeWidth="1.8" />
          <circle cx="40" cy="44" r="22" fill="#FFFFFF" stroke="#B45309" strokeWidth="3.5" />
          <path d="M40 44 V31 M40 44 L50 48" stroke="#1E293B" strokeWidth="2.8" strokeLinecap="round" />
          <circle cx="40" cy="44" r="2.5" fill="#DC2626" />
        </svg>
      );

    case 'tanito':
      return (
        <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
          <circle cx="40" cy="40" r="36" fill="#DCFCE7" stroke="#1E293B" strokeWidth="2.2" />
          <rect x="16" y="20" width="48" height="30" rx="3" fill="#15803D" stroke="#92400E" strokeWidth="3" />
          <path d="M24 31 H48 M24 39 H40" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M22 54 Q31 49 40 54 Q49 49 58 54 V64 Q49 59 40 64 Q31 59 22 64 Z" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2" />
        </svg>
      );

    case 'festomuvesz':
      return (
        <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
          <circle cx="40" cy="40" r="36" fill="#FCE7F3" stroke="#1E293B" strokeWidth="2.2" />
          <path d="M20 44 C18 26, 56 20, 62 38 C66 50, 48 62, 34 56 C28 54, 22 50, 20 44 Z" fill="#FDE68A" stroke="#1E293B" strokeWidth="2.2" />
          <circle cx="32" cy="34" r="4.5" fill="#EF4444" />
          <circle cx="44" cy="30" r="4.5" fill="#3B82F6" />
          <circle cx="53" cy="38" r="4.5" fill="#10B981" />
          <circle cx="38" cy="48" r="4" fill="#FFFFFF" stroke="#1E293B" strokeWidth="1.5" />
          <path d="M48 58 L64 20" stroke="#92400E" strokeWidth="3.5" strokeLinecap="round" />
        </svg>
      );

    case 'orvos':
      return (
        <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
          <circle cx="40" cy="40" r="36" fill="#E0F2FE" stroke="#1E293B" strokeWidth="2.2" />
          <rect x="20" y="28" width="40" height="30" rx="5" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2.2" />
          <path d="M32 28 V21 H48 V28" fill="none" stroke="#1E293B" strokeWidth="2.4" />
          <rect x="37" y="34" width="6" height="18" rx="1" fill="#EF4444" />
          <rect x="31" y="40" width="18" height="6" rx="1" fill="#EF4444" />
        </svg>
      );

    case 'epitomunkas':
      return (
        <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
          <circle cx="40" cy="40" r="36" fill="#FFEDD5" stroke="#1E293B" strokeWidth="2.2" />
          {/* Hard hat + brick wall */}
          <rect x="18" y="46" width="44" height="16" rx="2" fill="#EA580C" stroke="#1E293B" strokeWidth="2" />
          <line x1="18" y1="54" x2="62" y2="54" stroke="#FEF3C7" strokeWidth="1.8" />
          <line x1="34" y1="46" x2="34" y2="54" stroke="#FEF3C7" strokeWidth="1.8" />
          <line x1="48" y1="54" x2="48" y2="62" stroke="#FEF3C7" strokeWidth="1.8" />
          <path d="M22 38 C22 20, 58 20, 58 38 Z" fill="#FACC15" stroke="#1E293B" strokeWidth="2.2" />
          <rect x="18" y="36" width="44" height="5" rx="2" fill="#EAB308" stroke="#1E293B" strokeWidth="1.8" />
        </svg>
      );
  }
};

// Game 1: Ability illustrations
export const PairAbilityArt: React.FC<PairArtProps> = ({
  pairId,
  className = 'w-14 h-14',
}) => {
  switch (pairId) {
    case 'tuzolto':
      // Bátorság (shield with star)
      return (
        <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
          <circle cx="40" cy="40" r="36" fill="#FEF3C7" stroke="#1E293B" strokeWidth="2.2" />
          <path d="M22 22 L40 16 L58 22 V42 C58 56, 40 66, 40 66 C40 66, 22 56, 22 42 Z" fill="#EF4444" stroke="#1E293B" strokeWidth="2.2" strokeLinejoin="round" />
          <path d="M40 28 L43 35 L51 36 L45 41 L47 49 L40 45 L33 49 L35 41 L29 36 L37 35 Z" fill="#FACC15" stroke="#1E293B" strokeWidth="1.4" />
        </svg>
      );

    case 'oras':
      // Pontosság (target bullseye & tiny gear)
      return (
        <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
          <circle cx="40" cy="40" r="36" fill="#E0F2FE" stroke="#1E293B" strokeWidth="2.2" />
          <circle cx="40" cy="40" r="22" fill="#FFFFFF" stroke="#0284C7" strokeWidth="4" />
          <circle cx="40" cy="40" r="13" fill="#FFFFFF" stroke="#EF4444" strokeWidth="4" />
          <circle cx="40" cy="40" r="5" fill="#0284C7" />
        </svg>
      );

    case 'tanito':
      // Türelem (gentle sprouting seedling & hourglass)
      return (
        <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
          <circle cx="40" cy="40" r="36" fill="#DCFCE7" stroke="#1E293B" strokeWidth="2.2" />
          <ellipse cx="40" cy="58" rx="20" ry="6" fill="#92400E" />
          <path d="M40 58 V34" stroke="#16A34A" strokeWidth="4" strokeLinecap="round" />
          <path d="M40 40 C26 38, 24 24, 38 28 C40 30, 40 36, 40 40 Z" fill="#22C55E" stroke="#1E293B" strokeWidth="1.8" />
          <path d="M40 36 C54 34, 56 20, 42 24 C40 26, 40 32, 40 36 Z" fill="#4ADE80" stroke="#1E293B" strokeWidth="1.8" />
        </svg>
      );

    case 'festomuvesz':
      // Kreativitás (glowing idea lightbulb with colorful rays)
      return (
        <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
          <circle cx="40" cy="40" r="36" fill="#FFF1F2" stroke="#1E293B" strokeWidth="2.2" />
          <path d="M28 36 C28 24, 52 24, 52 36 C52 43, 46 47, 46 53 H34 C34 47, 28 43, 28 36 Z" fill="#FACC15" stroke="#1E293B" strokeWidth="2.2" />
          <rect x="34" y="53" width="12" height="7" rx="2" fill="#94A3B8" stroke="#1E293B" strokeWidth="1.8" />
          <path d="M40 14 V19 M19 36 H24 M56 36 H61 M24 21 L28 25 M56 21 L52 25" stroke="#EC4899" strokeWidth="2.8" strokeLinecap="round" />
        </svg>
      );

    case 'orvos':
      // Figyelmesség (magnifying glass & attentive eye/heart)
      return (
        <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
          <circle cx="40" cy="40" r="36" fill="#E0F2FE" stroke="#1E293B" strokeWidth="2.2" />
          <circle cx="35" cy="35" r="16" fill="#FFFFFF" stroke="#0284C7" strokeWidth="3.5" />
          <line x1="47" y1="47" x2="60" y2="60" stroke="#92400E" strokeWidth="6" strokeLinecap="round" />
          <path d="M26 35 Q35 26 44 35 Q35 44 26 35 Z" fill="#BAE6FD" stroke="#1E293B" strokeWidth="1.8" />
          <circle cx="35" cy="35" r="3.5" fill="#1E293B" />
        </svg>
      );

    case 'epitomunkas':
      // Együttműködés (interlocking puzzle pieces)
      return (
        <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
          <circle cx="40" cy="40" r="36" fill="#FEF3C7" stroke="#1E293B" strokeWidth="2.2" />
          <rect x="18" y="26" width="22" height="28" rx="4" fill="#3B82F6" stroke="#1E293B" strokeWidth="2" />
          <rect x="40" y="26" width="22" height="28" rx="4" fill="#10B981" stroke="#1E293B" strokeWidth="2" />
          <circle cx="40" cy="40" r="6" fill="#3B82F6" stroke="#1E293B" strokeWidth="1.8" />
        </svg>
      );
  }
};

interface DecisionSceneArtProps {
  sceneId: DecisionSceneId;
  className?: string;
}

// Game 2: 5 crisp situation illustrations
export const DecisionSceneArt: React.FC<DecisionSceneArtProps> = ({
  sceneId,
  className = 'w-full h-52 sm:h-60',
}) => {
  switch (sceneId) {
    case 'orvos_gyermek':
      return (
        <svg viewBox="0 0 320 200" className={className} aria-hidden="true">
          <rect width="320" height="200" rx="16" fill="#E0F2FE" />
          {/* Friendly doctor kneeling/smiling */}
          <path d="M62 182 C66 126, 146 126, 150 182 Z" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2.4" />
          <circle cx="106" cy="88" r="24" fill="#FDE68A" stroke="#1E293B" strokeWidth="2.4" />
          <path d="M84 82 C86 58, 126 58, 128 82 C118 72, 94 72, 84 82 Z" fill="#78350F" stroke="#1E293B" strokeWidth="2" />
          <circle cx="98" cy="88" r="2.5" fill="#1E293B" />
          <circle cx="114" cy="88" r="2.5" fill="#1E293B" />
          <path d="M98 98 Q106 105 114 98" fill="none" stroke="#1E293B" strokeWidth="2.2" strokeLinecap="round" />
          {/* Stethoscope */}
          <path d="M92 122 C86 144, 126 144, 120 122" fill="none" stroke="#0284C7" strokeWidth="4" />

          {/* Hesitant little child */}
          <path d="M196 182 C200 142, 256 142, 260 182 Z" fill="#FB7185" stroke="#1E293B" strokeWidth="2.4" />
          <circle cx="228" cy="112" r="20" fill="#FDE68A" stroke="#1E293B" strokeWidth="2.4" />
          <path d="M208 110 C210 88, 246 88, 248 110 C238 100, 218 100, 208 110 Z" fill="#92400E" stroke="#1E293B" strokeWidth="2" />
          <circle cx="221" cy="112" r="2.2" fill="#1E293B" />
          <circle cx="235" cy="112" r="2.2" fill="#1E293B" />
          <path d="M222 122 Q228 119 234 122" fill="none" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'epitomunkas_veszely':
      return (
        <svg viewBox="0 0 320 200" className={className} aria-hidden="true">
          <rect width="320" height="200" rx="16" fill="#FFEDD5" />
          {/* Construction worker with hard hat noticing warning triangle */}
          <path d="M68 182 C72 130, 148 130, 152 182 Z" fill="#F97316" stroke="#1E293B" strokeWidth="2.4" />
          <circle cx="110" cy="92" r="22" fill="#FDE68A" stroke="#1E293B" strokeWidth="2.4" />
          <path d="M84 84 C86 60, 134 60, 136 84 Z" fill="#FACC15" stroke="#1E293B" strokeWidth="2.2" />
          <rect x="80" y="82" width="60" height="6" rx="2" fill="#EAB308" stroke="#1E293B" strokeWidth="1.8" />
          <circle cx="102" cy="94" r="2.4" fill="#1E293B" />
          <circle cx="118" cy="94" r="2.4" fill="#1E293B" />
          <circle cx="110" cy="103" r="3" fill="#1E293B" />

          {/* Safety warning sign & stacked crates */}
          <rect x="190" y="132" width="90" height="48" rx="6" fill="#D97706" stroke="#1E293B" strokeWidth="2.4" />
          <path d="M235 46 L272 110 H198 Z" fill="#FEF08A" stroke="#DC2626" strokeWidth="5" strokeLinejoin="round" />
          <line x1="235" y1="68" x2="235" y2="90" stroke="#1E293B" strokeWidth="5" strokeLinecap="round" />
          <circle cx="235" cy="100" r="3.2" fill="#1E293B" />
        </svg>
      );

    case 'tanito_segit':
      return (
        <svg viewBox="0 0 320 200" className={className} aria-hidden="true">
          <rect width="320" height="200" rx="16" fill="#DCFCE7" />
          {/* Classroom chalkboard */}
          <rect x="28" y="20" width="264" height="72" rx="8" fill="#15803D" stroke="#92400E" strokeWidth="4" />
          <path d="M54 44 H140 M54 62 H112" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" />
          {/* Teacher & student at desk */}
          <path d="M74 182 C78 134, 146 134, 150 182 Z" fill="#4F46E5" stroke="#1E293B" strokeWidth="2.4" />
          <circle cx="112" cy="106" r="20" fill="#FDE68A" stroke="#1E293B" strokeWidth="2.4" />
          <circle cx="105" cy="106" r="2.2" fill="#1E293B" />
          <circle cx="119" cy="106" r="2.2" fill="#1E293B" />
          <path d="M106 115 Q112 120 118 115" fill="none" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />

          {/* Student with notebook & question mark */}
          <path d="M188 182 C192 142, 248 142, 252 182 Z" fill="#0EA5E9" stroke="#1E293B" strokeWidth="2.4" />
          <circle cx="220" cy="116" r="18" fill="#FDE68A" stroke="#1E293B" strokeWidth="2.4" />
          <circle cx="214" cy="116" r="2" fill="#1E293B" />
          <circle cx="226" cy="116" r="2" fill="#1E293B" />
          <rect x="176" y="160" width="88" height="22" rx="4" fill="#F59E0B" stroke="#1E293B" strokeWidth="2.2" />
        </svg>
      );

    case 'kertesz_hervadas':
      return (
        <svg viewBox="0 0 320 200" className={className} aria-hidden="true">
          <rect width="320" height="200" rx="16" fill="#ECFDF5" />
          {/* Drooping flower in pot + gardener with watering can */}
          <path d="M196 132 H260 L252 178 H204 Z" fill="#C2410C" stroke="#1E293B" strokeWidth="2.4" />
          <path d="M228 132 C228 96, 256 82, 266 96" fill="none" stroke="#65A30D" strokeWidth="4.5" strokeLinecap="round" />
          <circle cx="268" cy="102" r="10" fill="#F43F5E" stroke="#1E293B" strokeWidth="2" />

          <path d="M56 182 C60 132, 134 132, 138 182 Z" fill="#16A34A" stroke="#1E293B" strokeWidth="2.4" />
          <circle cx="97" cy="92" r="22" fill="#FDE68A" stroke="#1E293B" strokeWidth="2.4" />
          <ellipse cx="97" cy="76" rx="30" ry="7" fill="#FACC15" stroke="#1E293B" strokeWidth="2" />
          <circle cx="90" cy="92" r="2.2" fill="#1E293B" />
          <circle cx="104" cy="92" r="2.2" fill="#1E293B" />
          {/* Watering can */}
          <rect x="132" y="120" width="32" height="24" rx="4" fill="#0EA5E9" stroke="#1E293B" strokeWidth="2.2" />
          <path d="M164 132 L182 118 L186 122 L166 138 Z" fill="#0284C7" stroke="#1E293B" strokeWidth="2" />
        </svg>
      );

    case 'szakacs_ujraproba':
      return (
        <svg viewBox="0 0 320 200" className={className} aria-hidden="true">
          <rect width="320" height="200" rx="16" fill="#FFE4E6" />
          {/* Kitchen counter & steaming pot */}
          <rect x="30" y="142" width="260" height="40" rx="6" fill="#D97706" stroke="#1E293B" strokeWidth="2.4" />
          <rect x="186" y="106" width="64" height="36" rx="5" fill="#E11D48" stroke="#1E293B" strokeWidth="2.4" />
          <path d="M204 94 Q202 84 206 78 M224 94 Q222 84 226 78" fill="none" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" />

          {/* Determined chef thinking & tasting */}
          <path d="M68 142 C72 106, 138 106, 142 142 Z" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2.4" />
          <circle cx="105" cy="76" r="21" fill="#FDE68A" stroke="#1E293B" strokeWidth="2.4" />
          <path d="M80 60 C72 42, 90 30, 105 35 C120 30, 138 42, 130 60 Z" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2.4" />
          <rect x="84" y="56" width="42" height="8" rx="2" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2.2" />
          <circle cx="98" cy="76" r="2.2" fill="#1E293B" />
          <circle cx="112" cy="76" r="2.2" fill="#1E293B" />
          <path d="M99 86 Q105 89 111 86" fill="none" stroke="#1E293B" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      );
  }
};

interface SuperpowerArtProps {
  superpowerId: SuperpowerId;
  className?: string;
}

// Game 3: 8 colorful child-friendly strength icons
export const SuperpowerArt: React.FC<SuperpowerArtProps> = ({
  superpowerId,
  className = 'w-14 h-14',
}) => {
  switch (superpowerId) {
    case 'segitokesz':
      return (
        <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
          <circle cx="40" cy="40" r="36" fill="#FFE4E6" stroke="#1E293B" strokeWidth="2.2" />
          <path d="M40 58 C24 46, 18 36, 18 28 C18 21, 24 16, 31 16 C36 16, 39 19, 40 22 C41 19, 44 16, 49 16 C56 16, 62 21, 62 28 C62 36, 56 46, 40 58 Z" fill="#F43F5E" stroke="#1E293B" strokeWidth="2.2" />
        </svg>
      );

    case 'alkoto':
      return (
        <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
          <circle cx="40" cy="40" r="36" fill="#FCE7F3" stroke="#1E293B" strokeWidth="2.2" />
          <path d="M22 52 L50 24 L58 32 L30 60 H22 Z" fill="#EC4899" stroke="#1E293B" strokeWidth="2.2" strokeLinejoin="round" />
          <circle cx="56" cy="24" r="5" fill="#FACC15" stroke="#1E293B" strokeWidth="1.8" />
        </svg>
      );

    case 'rejtveny':
      return (
        <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
          <circle cx="40" cy="40" r="36" fill="#E0F2FE" stroke="#1E293B" strokeWidth="2.2" />
          <rect x="20" y="22" width="18" height="18" rx="3" fill="#0284C7" stroke="#1E293B" strokeWidth="2" />
          <rect x="42" y="22" width="18" height="18" rx="3" fill="#FACC15" stroke="#1E293B" strokeWidth="2" />
          <rect x="20" y="44" width="18" height="18" rx="3" fill="#22C55E" stroke="#1E293B" strokeWidth="2" />
          <rect x="42" y="44" width="18" height="18" rx="3" fill="#F97316" stroke="#1E293B" strokeWidth="2" />
        </svg>
      );

    case 'csapat':
      return (
        <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
          <circle cx="40" cy="40" r="36" fill="#FEF3C7" stroke="#1E293B" strokeWidth="2.2" />
          <circle cx="28" cy="30" r="8" fill="#F59E0B" stroke="#1E293B" strokeWidth="2" />
          <circle cx="52" cy="30" r="8" fill="#3B82F6" stroke="#1E293B" strokeWidth="2" />
          <path d="M16 58 C18 44, 38 44, 40 58 Z" fill="#F59E0B" stroke="#1E293B" strokeWidth="2" />
          <path d="M40 58 C42 44, 62 44, 64 58 Z" fill="#3B82F6" stroke="#1E293B" strokeWidth="2" />
        </svg>
      );

    case 'turelmes':
      return (
        <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
          <circle cx="40" cy="40" r="36" fill="#DCFCE7" stroke="#1E293B" strokeWidth="2.2" />
          <path d="M40 60 V32" stroke="#16A34A" strokeWidth="4.5" strokeLinecap="round" />
          <circle cx="40" cy="26" r="10" fill="#FACC15" stroke="#1E293B" strokeWidth="2" />
          <circle cx="29" cy="26" r="5" fill="#FB7185" />
          <circle cx="51" cy="26" r="5" fill="#FB7185" />
          <circle cx="40" cy="15" r="5" fill="#FB7185" />
        </svg>
      );

    case 'mozgas':
      return (
        <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
          <circle cx="40" cy="40" r="36" fill="#FFEDD5" stroke="#1E293B" strokeWidth="2.2" />
          <circle cx="44" cy="22" r="7" fill="#EA580C" stroke="#1E293B" strokeWidth="2" />
          <path d="M30 40 L44 32 L54 44 M44 32 L36 52 L24 60 M36 52 L48 62" fill="none" stroke="#EA580C" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case 'figyelmes':
      return (
        <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
          <circle cx="40" cy="40" r="36" fill="#EEF2FF" stroke="#1E293B" strokeWidth="2.2" />
          <circle cx="36" cy="36" r="15" fill="#FFFFFF" stroke="#4F46E5" strokeWidth="3.5" />
          <line x1="47" y1="47" x2="60" y2="60" stroke="#92400E" strokeWidth="6" strokeLinecap="round" />
          <circle cx="36" cy="36" r="5" fill="#4F46E5" />
        </svg>
      );

    case 'tanulas':
      return (
        <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
          <circle cx="40" cy="40" r="36" fill="#FEF9C3" stroke="#1E293B" strokeWidth="2.2" />
          <path d="M18 32 Q29 26 40 32 Q51 26 62 32 V56 Q51 50 40 56 Q29 50 18 56 Z" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2.2" />
          <path d="M40 14 L43 20 L49 21 L44 25 L46 31 L40 28 L34 31 L36 25 L31 21 L37 20 Z" fill="#FACC15" stroke="#1E293B" strokeWidth="1.4" />
        </svg>
      );
  }
};
