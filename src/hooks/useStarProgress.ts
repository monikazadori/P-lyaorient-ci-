import { useCallback, useEffect, useState } from 'react';
import { STATIONS } from '../data/stations';
import { StationId } from '../types/game';

const STORAGE_KEY = 'mestersegek_birodalma_stars_v1';

const VALID_IDS = new Set<number>(STATIONS.map((s) => s.id));

function loadStoredStars(): StationId[] {
  if (typeof window === 'undefined') {
    return [];
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }
    const uniqueValid = new Set<StationId>();
    for (const item of parsed) {
      if (typeof item === 'number' && VALID_IDS.has(item)) {
        uniqueValid.add(item as StationId);
      }
    }
    return Array.from(uniqueValid).sort((a, b) => a - b);
  } catch {
    return [];
  }
}

export function useStarProgress() {
  const [completedStationIds, setCompletedStationIds] = useState<StationId[]>(() => loadStoredStars());

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(completedStationIds));
    } catch {
      // Ignore storage quota or private browsing errors gracefully
    }
  }, [completedStationIds]);

  const isCompleted = useCallback(
    (stationId: StationId) => completedStationIds.includes(stationId),
    [completedStationIds]
  );

  const awardStar = useCallback((stationId: StationId) => {
    setCompletedStationIds((prev) => {
      if (prev.includes(stationId)) {
        return prev;
      }
      return [...prev, stationId].sort((a, b) => a - b);
    });
  }, []);

  const revokeStar = useCallback((stationId: StationId) => {
    setCompletedStationIds((prev) => prev.filter((id) => id !== stationId));
  }, []);

  const resetAllStars = useCallback(() => {
    setCompletedStationIds([]);
  }, []);

  return {
    completedStationIds,
    totalStars: completedStationIds.length,
    maxStars: STATIONS.length,
    isAllCompleted: completedStationIds.length === STATIONS.length,
    isCompleted,
    awardStar,
    revokeStar,
    resetAllStars,
  };
}
