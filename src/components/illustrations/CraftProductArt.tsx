import React, { useState } from 'react';
import { Hammer } from 'lucide-react';
import { OldCraftId } from '../../data/station1OldCrafts';

interface CraftArtImageProps {
  src: string;
  alt: string;
  className?: string;
}

export const CraftArtImage: React.FC<CraftArtImageProps> = ({
  src,
  alt,
  className = 'w-full h-full object-cover',
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-amber-50 to-orange-100 text-amber-800 p-6 ${className}`}
        role="img"
        aria-label={alt}
      >
        <Hammer className="w-12 h-12 mb-2" aria-hidden="true" />
        <span className="text-sm font-semibold text-center">{alt}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
};

interface CraftProductArtProps {
  craftId: OldCraftId;
  className?: string;
}

export const CraftProductArt: React.FC<CraftProductArtProps> = ({
  craftId,
  className = 'w-20 h-20',
}) => {
  switch (craftId) {
    case 'kovacs':
      // Patkó (Horseshoe)
      return (
        <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
          <circle cx="50" cy="52" r="40" fill="#FEF3C7" />
          <path
            d="M32 24 C20 40, 22 68, 36 78 C43 83, 57 83, 64 78 C78 68, 80 40, 68 24 L59 30 C67 42, 66 60, 57 67 C53 70, 47 70, 43 67 C34 60, 33 42, 41 30 Z"
            fill="#64748B"
            stroke="#1E293B"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          {/* Nail holes */}
          <circle cx="31" cy="40" r="2.5" fill="#1E293B" />
          <circle cx="31" cy="54" r="2.5" fill="#1E293B" />
          <circle cx="37" cy="67" r="2.5" fill="#1E293B" />
          <circle cx="69" cy="40" r="2.5" fill="#1E293B" />
          <circle cx="69" cy="54" r="2.5" fill="#1E293B" />
          <circle cx="63" cy="67" r="2.5" fill="#1E293B" />
          {/* Little shine */}
          <path d="M25 22 L28 17 M19 28 L14 26" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    case 'fazekas':
      // Agyagedény (Decorated clay pitcher)
      return (
        <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
          <circle cx="50" cy="52" r="40" fill="#FFEDD5" />
          {/* Handle */}
          <path
            d="M62 36 C78 36, 78 62, 64 64"
            fill="none"
            stroke="#C2410C"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <path
            d="M62 36 C78 36, 78 62, 64 64"
            fill="none"
            stroke="#1E293B"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Jug body */}
          <path
            d="M38 24 H62 L58 34 C70 43, 72 68, 60 80 H40 C28 68, 30 43, 42 34 Z"
            fill="#EA580C"
            stroke="#1E293B"
            strokeWidth="2.8"
            strokeLinejoin="round"
          />
          {/* Rim */}
          <ellipse cx="50" cy="24" rx="13" ry="4" fill="#FDBA74" stroke="#1E293B" strokeWidth="2.5" />
          {/* Folk decorative wave */}
          <path
            d="M35 55 Q42 49 50 55 Q58 61 65 55"
            fill="none"
            stroke="#FEF3C7"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle cx="43" cy="65" r="2.2" fill="#FEF3C7" />
          <circle cx="50" cy="65" r="2.2" fill="#FEF3C7" />
          <circle cx="57" cy="65" r="2.2" fill="#FEF3C7" />
        </svg>
      );

    case 'molnar':
      // Liszt (Flour sack & golden wheat)
      return (
        <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
          <circle cx="50" cy="52" r="40" fill="#E0F2FE" />
          {/* Burlap Sack */}
          <path
            d="M34 32 L38 22 H62 L66 32 C74 44, 74 72, 66 80 H34 C26 72, 26 44, 34 32 Z"
            fill="#D6B588"
            stroke="#1E293B"
            strokeWidth="2.8"
            strokeLinejoin="round"
          />
          {/* White flour mound inside top */}
          <path d="M36 32 Q50 18 64 32 Z" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2.2" />
          {/* Rope tie */}
          <path d="M35 35 H65" stroke="#92400E" strokeWidth="4" strokeLinecap="round" />
          {/* Small flour bowl/pile in front */}
          <ellipse cx="68" cy="78" rx="14" ry="7" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2" />
          {/* Golden wheat stalk */}
          <path d="M24 78 Q22 52 28 36" fill="none" stroke="#CA8A04" strokeWidth="2.5" strokeLinecap="round" />
          <ellipse cx="22" cy="48" rx="3" ry="5" transform="rotate(-25 22 48)" fill="#FACC15" stroke="#1E293B" strokeWidth="1.5" />
          <ellipse cx="29" cy="43" rx="3" ry="5" transform="rotate(20 29 43)" fill="#FACC15" stroke="#1E293B" strokeWidth="1.5" />
          <ellipse cx="26" cy="36" rx="3" ry="5" fill="#FACC15" stroke="#1E293B" strokeWidth="1.5" />
        </svg>
      );

    case 'takacs':
      // Szövet (Woven colorful fabric roll)
      return (
        <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
          <circle cx="50" cy="52" r="40" fill="#E0E7FF" />
          {/* Unrolled cloth drape */}
          <path
            d="M24 62 H74 L80 80 H20 Z"
            fill="#EF4444"
            stroke="#1E293B"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          {/* Stripes on cloth */}
          <path d="M23 68 H76" stroke="#FDE047" strokeWidth="3" />
          <path d="M22 74 H78" stroke="#38BDF8" strokeWidth="3" />
          {/* Fabric cylinder roll */}
          <rect
            x="24"
            y="34"
            width="50"
            height="30"
            rx="10"
            fill="#DC2626"
            stroke="#1E293B"
            strokeWidth="2.8"
          />
          {/* Pattern stripes on roll */}
          <path d="M38 35 V63 M48 35 V63 M58 35 V63" stroke="#FEF08A" strokeWidth="3.5" />
          {/* End spiral of roll */}
          <ellipse cx="28" cy="49" rx="7" ry="14" fill="#FEE2E2" stroke="#1E293B" strokeWidth="2.5" />
          <path d="M28 43 C31 43, 31 55, 28 55 C25 55, 25 46, 28 46" fill="none" stroke="#1E293B" strokeWidth="2" />
        </svg>
      );

    case 'kadar':
      // Fahordó (Wooden oak barrel)
      return (
        <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
          <circle cx="50" cy="52" r="40" fill="#ECFDF5" />
          {/* Barrel body */}
          <path
            d="M32 22 H68 C78 40, 78 64, 68 82 H32 C22 64, 22 40, 32 22 Z"
            fill="#C88A4B"
            stroke="#1E293B"
            strokeWidth="2.8"
            strokeLinejoin="round"
          />
          {/* Wood stave vertical curves */}
          <path d="M41 23 C36 42, 36 62, 41 81" fill="none" stroke="#78350F" strokeWidth="2" />
          <path d="M50 22 V82" fill="none" stroke="#78350F" strokeWidth="2" />
          <path d="M59 23 C64 42, 64 62, 59 81" fill="none" stroke="#78350F" strokeWidth="2" />
          {/* Top rim ellipse */}
          <ellipse cx="50" cy="22" rx="18" ry="5" fill="#FDE68A" stroke="#1E293B" strokeWidth="2.5" />
          {/* Iron hoops */}
          <path d="M27 36 Q50 40 73 36" fill="none" stroke="#475569" strokeWidth="5" strokeLinecap="round" />
          <path d="M27 68 Q50 72 73 68" fill="none" stroke="#475569" strokeWidth="5" strokeLinecap="round" />
        </svg>
      );
  }
};
