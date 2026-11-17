import React, { useState } from 'react';
import { Compass, Sparkles } from 'lucide-react';

interface ArtworkProps {
  className?: string;
}

export const TownBackdropImage: React.FC<ArtworkProps> = ({ className = '' }) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`bg-gradient-to-br from-sky-100 via-emerald-50 to-amber-100 ${className}`}
        aria-hidden="true"
      />
    );
  }

  return (
    <img
      src="/src/assets/images/town_meadow_backdrop_1794939150341.jpg"
      alt="Mesterségek birodalma napsütötte városvölgy látképe"
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
};

export const GuideOwlImage: React.FC<ArtworkProps> = ({ className = '' }) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br from-amber-100 to-sky-100 text-amber-800 ${className}`}
        aria-label="Bölcs Bagoly Mester"
      >
        <div className="flex flex-col items-center gap-1">
          <Compass className="w-8 h-8" aria-hidden="true" />
          <Sparkles className="w-4 h-4" aria-hidden="true" />
        </div>
      </div>
    );
  }

  return (
    <img
      src="/src/assets/images/guide_owl_artisan_1794939150698.jpg"
      alt="Bölcs Bagoly Mester, a Mesterségek birodalma kedves vezetője"
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
};
