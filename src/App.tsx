import { useCallback, useEffect, useState } from 'react';
import { ResetConfirmModal } from './components/ResetConfirmModal';
import { StationScreen } from './components/StationScreen';
import { TownHeader } from './components/TownHeader';
import { TownMap } from './components/TownMap';
import { getStationById, STATIONS } from './data/stations';
import { useStarProgress } from './hooks/useStarProgress';
import { StationId } from './types/game';

function parseStationFromHash(): StationId | null {
  if (typeof window === 'undefined') {
    return null;
  }
  const hash = window.location.hash.replace(/^#/, '');
  const match = hash.match(/^allomas-([1-8])$/);
  if (match) {
    return Number(match[1]) as StationId;
  }
  const bySlug = STATIONS.find((s) => s.slug === hash);
  return bySlug ? bySlug.id : null;
}

export default function App() {
  const [activeStationId, setActiveStationId] = useState<StationId | null>(() =>
    parseStationFromHash()
  );
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  const {
    completedStationIds,
    totalStars,
    maxStars,
    isCompleted,
    awardStar,
    resetAllStars,
  } = useStarProgress();

  useEffect(() => {
    const handleHashChange = () => {
      setActiveStationId(parseStationFromHash());
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSelectStation = useCallback((stationId: StationId) => {
    setActiveStationId(stationId);
    const nextHash = `#allomas-${stationId}`;
    if (window.location.hash !== nextHash) {
      window.location.hash = nextHash;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleGoHome = useCallback(() => {
    setActiveStationId(null);
    if (window.location.hash && window.location.hash !== '#varos') {
      window.location.hash = '#varos';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleConfirmReset = useCallback(() => {
    resetAllStars();
    setIsResetModalOpen(false);
  }, [resetAllStars]);

  const activeStation = activeStationId ? getStationById(activeStationId) : undefined;

  return (
    <div className="min-h-screen flex flex-col bg-[#F6F8F4] text-slate-900">
      <TownHeader
        totalStars={totalStars}
        maxStars={maxStars}
        isInStation={Boolean(activeStation)}
        onGoHome={handleGoHome}
        onRequestReset={() => setIsResetModalOpen(true)}
      />

      <div className="flex-1">
        {activeStation ? (
          <StationScreen
            key={activeStation.id}
            station={activeStation}
            isCompleted={isCompleted(activeStation.id)}
            totalStars={totalStars}
            onAwardStar={awardStar}
            onSelectStation={handleSelectStation}
            onGoHome={handleGoHome}
          />
        ) : (
          <TownMap
            completedStationIds={completedStationIds}
            onSelectStation={handleSelectStation}
          />
        )}
      </div>

      <footer className="mt-12 border-t border-slate-200 bg-white/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-slate-500">
          <p>Mesterségek birodalma · Pályaorientációs kaland 3. osztályosoknak</p>
          <p className="text-slate-500">Bejelentkezés és személyes adatok nélkül működik</p>
        </div>
      </footer>

      <ResetConfirmModal
        isOpen={isResetModalOpen}
        totalStars={totalStars}
        onConfirm={handleConfirmReset}
        onCancel={() => setIsResetModalOpen(false)}
      />
    </div>
  );
}
