import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Award,
  BookOpen,
  Check,
  CheckCircle2,
  Delete,
  Eye,
  Grid3X3,
  HelpCircle,
  KeyRound,
  Lightbulb,
  Mail,
  RotateCcw,
  Search,
  Sparkles,
  Star,
  Undo2,
} from 'lucide-react';
import { POSITIVE_FEEDBACK_MESSAGES } from '../../data/stations';
import {
  CIPHER_WORD_BANK_NAMES,
  EncodedCipherLetter,
  encodeWordWithCipherTable,
  generateWordSearchPuzzle,
  GridCoordinate,
  HUNGARIAN_CIPHER_TABLE,
  shuffleArray,
  STATION5_PROFESSIONS,
  Station5ProfessionId,
  Station5ProfessionItem,
  tokenizeHungarianLetters,
  WordSearchPuzzle,
} from '../../data/station5MysteryNames';
import { playStarChime } from '../../utils/sound';
import {
  CipherStarOwlImage,
  PostOfficeOwlImage,
  Station5ProfessionArt,
} from '../illustrations/Station5MysteryArt';

type Station5Stage =
  | 'INTRO'
  | 'ANAGRAM'
  | 'CIPHER'
  | 'WORD_SEARCH'
  | 'COMPLETED';

interface LetterTile {
  id: string;
  letter: string;
  colorClass: string;
}

interface AnagramRound {
  profession: Station5ProfessionItem;
  expectedTokens: string[];
  shuffledTiles: LetterTile[];
}

interface CipherRound {
  profession: Station5ProfessionItem;
  encodedLetters: EncodedCipherLetter[];
}

interface Station5Session {
  anagramRounds: AnagramRound[];
  cipherRounds: CipherRound[];
  wordSearchPuzzle: WordSearchPuzzle;
}

const TILE_PALETTES = [
  'bg-amber-100 border-amber-400 text-amber-950 hover:bg-amber-200',
  'bg-sky-100 border-sky-400 text-sky-950 hover:bg-sky-200',
  'bg-rose-100 border-rose-400 text-rose-950 hover:bg-rose-200',
  'bg-emerald-100 border-emerald-400 text-emerald-950 hover:bg-emerald-200',
  'bg-indigo-100 border-indigo-400 text-indigo-950 hover:bg-indigo-200',
  'bg-orange-100 border-orange-400 text-orange-950 hover:bg-orange-200',
] as const;

const FOUND_WORD_HIGHLIGHTS = [
  'bg-emerald-200 border-emerald-500 text-emerald-950',
  'bg-amber-200 border-amber-500 text-amber-950',
  'bg-sky-200 border-sky-500 text-sky-950',
  'bg-rose-200 border-rose-500 text-rose-950',
  'bg-indigo-200 border-indigo-500 text-indigo-950',
  'bg-teal-200 border-teal-500 text-teal-950',
] as const;

const HUNGARIAN_KEYBOARD_ROWS: string[][] = [
  ['A', 'Á', 'B', 'C', 'CS', 'D', 'DZ', 'DZS', 'E', 'É', 'F', 'G'],
  ['GY', 'H', 'I', 'Í', 'J', 'K', 'L', 'LY', 'M', 'N', 'NY', 'O'],
  ['Ó', 'Ö', 'Ő', 'P', 'Q', 'R', 'S', 'SZ', 'T', 'TY', 'U', 'Ú'],
  ['Ü', 'Ű', 'V', 'W', 'X', 'Y', 'Z', 'ZS'],
];

const PHYSICAL_DIGRAPH_MAP: Record<string, string> = {
  'C+S': 'CS',
  'D+Z': 'DZ',
  'DZ+S': 'DZS',
  'G+Y': 'GY',
  'L+Y': 'LY',
  'N+Y': 'NY',
  'S+Z': 'SZ',
  'T+Y': 'TY',
  'Z+S': 'ZS',
};

function shuffleTokensNotInOrder(tokens: string[]): string[] {
  let candidate = shuffleArray(tokens);
  let attempts = 0;
  while (
    candidate.every((tok, idx) => tok === tokens[idx]) &&
    attempts < 12
  ) {
    candidate = shuffleArray(tokens);
    attempts += 1;
  }
  return candidate;
}

function createStation5Session(): Station5Session {
  const professionByWord = new Map(
    STATION5_PROFESSIONS.map((item) => [item.word, item])
  );

  // Game 1: 6 random professions out of 10
  const anagramRounds: AnagramRound[] = shuffleArray(STATION5_PROFESSIONS)
    .slice(0, 6)
    .map((profession, roundIdx) => {
      const expectedTokens = tokenizeHungarianLetters(profession.word);
      const shuffledLetters = shuffleTokensNotInOrder(expectedTokens);
      const shuffledTiles: LetterTile[] = shuffledLetters.map(
        (letter, tileIdx) => ({
          id: `${profession.id}-${roundIdx}-${tileIdx}`,
          letter,
          colorClass:
            TILE_PALETTES[(roundIdx + tileIdx) % TILE_PALETTES.length],
        })
      );
      return {
        profession,
        expectedTokens,
        shuffledTiles,
      };
    });

  // Game 2: 5 random words out of the 8-item cipher bank
  const cipherRounds: CipherRound[] = shuffleArray(CIPHER_WORD_BANK_NAMES)
    .slice(0, 5)
    .map((word) => {
      const profession = professionByWord.get(word);
      if (!profession) {
        throw new Error(`Hiányzó szakma a feladatbankból: ${word}`);
      }
      return {
        profession,
        encodedLetters: encodeWordWithCipherTable(word),
      };
    });

  const wordSearchPuzzle = generateWordSearchPuzzle();

  return {
    anagramRounds,
    cipherRounds,
    wordSearchPuzzle,
  };
}

function getStraightLineCells(
  start: GridCoordinate,
  end: GridCoordinate
): GridCoordinate[] | null {
  const dRow = end.row - start.row;
  const dCol = end.col - start.col;

  // Must be horizontal or vertical (no diagonals) and at least 2 cells long
  if (dRow !== 0 && dCol !== 0) return null;
  if (dRow === 0 && dCol === 0) return null;

  const stepRow = dRow === 0 ? 0 : dRow > 0 ? 1 : -1;
  const stepCol = dCol === 0 ? 0 : dCol > 0 ? 1 : -1;
  const steps = Math.max(Math.abs(dRow), Math.abs(dCol));

  const cells: GridCoordinate[] = [];
  for (let i = 0; i <= steps; i += 1) {
    cells.push({
      row: start.row + stepRow * i,
      col: start.col + stepCol * i,
    });
  }
  return cells;
}

function cellsMatchWord(
  selected: GridCoordinate[],
  target: GridCoordinate[]
): boolean {
  if (selected.length !== target.length) return false;
  const forward = selected.every(
    (c, idx) => c.row === target[idx].row && c.col === target[idx].col
  );
  if (forward) return true;

  const reversed = selected.every((c, idx) => {
    const rev = target[target.length - 1 - idx];
    return c.row === rev.row && c.col === rev.col;
  });
  return reversed;
}

interface Station5MysteryNamesGameProps {
  isAlreadyCompleted: boolean;
  onComplete: () => void;
  onGoHome: () => void;
  onGoToNextStation: () => void;
}

export const Station5MysteryNamesGame: React.FC<
  Station5MysteryNamesGameProps
> = ({ isAlreadyCompleted, onComplete, onGoHome, onGoToNextStation }) => {
  const [session, setSession] = useState<Station5Session>(() =>
    createStation5Session()
  );
  const [stage, setStage] = useState<Station5Stage>('INTRO');
  const [wasAlreadyCompletedOnFinish, setWasAlreadyCompletedOnFinish] =
    useState(isAlreadyCompleted);

  // --- Game 1: Betűkavalkád state ---
  const [anagramIndex, setAnagramIndex] = useState(0);
  const [placedTileIds, setPlacedTileIds] = useState<(string | null)[]>(() =>
    Array(session.anagramRounds[0]?.expectedTokens.length ?? 0).fill(null)
  );
  const [anagramHintLevel, setAnagramHintLevel] = useState<0 | 1 | 2>(0);
  const [anagramError, setAnagramError] = useState<string | null>(null);
  const [anagramSolved, setAnagramSolved] = useState(false);
  const [anagramAllDone, setAnagramAllDone] = useState(false);

  // --- Game 2: Titkos üzenetek state ---
  const [cipherIndex, setCipherIndex] = useState(0);
  const [cipherInputs, setCipherInputs] = useState<string[]>(() =>
    Array(session.cipherRounds[0]?.encodedLetters.length ?? 0).fill('')
  );
  const [activeCipherSlot, setActiveCipherSlot] = useState(0);
  const [showCipherTable, setShowCipherTable] = useState(true);
  const [cipherFirstHintUsed, setCipherFirstHintUsed] = useState(false);
  const [cipherError, setCipherError] = useState<string | null>(null);
  const [cipherSolved, setCipherSolved] = useState(false);
  const lastPhysicalTypedRef = useRef<{
    slotIdx: number;
    letter: string;
    timestamp: number;
  } | null>(null);

  // --- Game 3: Szóvadász state ---
  const [foundWordIds, setFoundWordIds] = useState<Station5ProfessionId[]>([]);
  const [selectedStartCell, setSelectedStartCell] =
    useState<GridCoordinate | null>(null);
  const [hintCell, setHintCell] = useState<GridCoordinate | null>(null);
  const [wordSearchFeedback, setWordSearchFeedback] = useState<{
    type: 'success' | 'error' | 'info';
    text: string;
  } | null>(null);

  const stageStepNumber = useMemo(() => {
    switch (stage) {
      case 'INTRO':
        return 0;
      case 'ANAGRAM':
        return 1;
      case 'CIPHER':
        return 2;
      case 'WORD_SEARCH':
        return 3;
      case 'COMPLETED':
        return 4;
    }
  }, [stage]);

  const handleRestartStation = () => {
    const fresh = createStation5Session();
    setSession(fresh);
    setStage('INTRO');

    setAnagramIndex(0);
    setPlacedTileIds(
      Array(fresh.anagramRounds[0]?.expectedTokens.length ?? 0).fill(null)
    );
    setAnagramHintLevel(0);
    setAnagramError(null);
    setAnagramSolved(false);
    setAnagramAllDone(false);

    setCipherIndex(0);
    setCipherInputs(
      Array(fresh.cipherRounds[0]?.encodedLetters.length ?? 0).fill('')
    );
    setActiveCipherSlot(0);
    setShowCipherTable(true);
    setCipherFirstHintUsed(false);
    setCipherError(null);
    setCipherSolved(false);
    lastPhysicalTypedRef.current = null;

    setFoundWordIds([]);
    setSelectedStartCell(null);
    setHintCell(null);
    setWordSearchFeedback(null);
  };

  // --- Game 1 Logic ---
  const currentAnagram = session.anagramRounds[anagramIndex];
  const tileById = useMemo(() => {
    const map = new Map<string, LetterTile>();
    currentAnagram?.shuffledTiles.forEach((tile) => map.set(tile.id, tile));
    return map;
  }, [currentAnagram]);

  const usedTileIds = useMemo(
    () => new Set(placedTileIds.filter((id): id is string => id !== null)),
    [placedTileIds]
  );

  const isAnagramFull =
    placedTileIds.length > 0 && placedTileIds.every((id) => id !== null);

  const handleSelectTile = (tileId: string) => {
    if (anagramSolved || anagramAllDone || usedTileIds.has(tileId)) return;
    const emptyIdx = placedTileIds.findIndex((id) => id === null);
    if (emptyIdx === -1) return;

    setPlacedTileIds((prev) => {
      const next = [...prev];
      next[emptyIdx] = tileId;
      return next;
    });
    setAnagramError(null);
  };

  const handleRemoveSlot = (slotIdx: number) => {
    if (anagramSolved || anagramAllDone || placedTileIds[slotIdx] === null)
      return;
    setPlacedTileIds((prev) => {
      const next = [...prev];
      next[slotIdx] = null;
      return next;
    });
    setAnagramError(null);
  };

  const handleUndoLastTile = () => {
    if (anagramSolved || anagramAllDone) return;
    let lastFilledIdx = -1;
    for (let i = placedTileIds.length - 1; i >= 0; i -= 1) {
      if (placedTileIds[i] !== null) {
        lastFilledIdx = i;
        break;
      }
    }
    if (lastFilledIdx === -1) return;
    setPlacedTileIds((prev) => {
      const next = [...prev];
      next[lastFilledIdx] = null;
      return next;
    });
    setAnagramError(null);
  };

  const handleResetAnagramWord = () => {
    if (!currentAnagram || anagramSolved || anagramAllDone) return;
    setPlacedTileIds(Array(currentAnagram.expectedTokens.length).fill(null));
    setAnagramError(null);
  };

  const handleRequestAnagramHint = () => {
    if (anagramSolved || anagramAllDone) return;
    setAnagramHintLevel((prev) => (prev === 0 ? 1 : 2));
  };

  const handleCheckAnagram = () => {
    if (!currentAnagram || !isAnagramFull || anagramSolved) return;

    const assembledWord = placedTileIds
      .map((id) => (id ? tileById.get(id)?.letter ?? '' : ''))
      .join('');

    if (assembledWord === currentAnagram.profession.word) {
      setAnagramSolved(true);
      setAnagramError(null);
    } else {
      setAnagramError('Még nem sikerült! Nézd meg újra a betűk sorrendjét!');
    }
  };

  const handleNextAnagram = () => {
    if (!anagramSolved) return;
    if (anagramIndex + 1 < session.anagramRounds.length) {
      const nextIdx = anagramIndex + 1;
      setAnagramIndex(nextIdx);
      setPlacedTileIds(
        Array(session.anagramRounds[nextIdx].expectedTokens.length).fill(null)
      );
      setAnagramHintLevel(0);
      setAnagramError(null);
      setAnagramSolved(false);
    } else {
      setAnagramAllDone(true);
    }
  };

  // --- Game 2 Logic ---
  const currentCipher = session.cipherRounds[cipherIndex];
  const isCipherFull =
    cipherInputs.length > 0 && cipherInputs.every((val) => val.trim() !== '');

  const handleInsertCipherLetter = (letter: string, fromPhysical = false) => {
    if (!currentCipher || cipherSolved) return;

    const now = Date.now();
    // Smart physical keyboard digraph support (e.g. C+S -> CS, S+Z -> SZ)
    if (
      fromPhysical &&
      lastPhysicalTypedRef.current &&
      now - lastPhysicalTypedRef.current.timestamp < 1800
    ) {
      const prevIdx = lastPhysicalTypedRef.current.slotIdx;
      const prevChar = cipherInputs[prevIdx];
      const combined = PHYSICAL_DIGRAPH_MAP[`${prevChar}+${letter}`];
      if (combined) {
        setCipherInputs((prev) => {
          const next = [...prev];
          next[prevIdx] = combined;
          return next;
        });
        lastPhysicalTypedRef.current = {
          slotIdx: prevIdx,
          letter: combined,
          timestamp: now,
        };
        const nextEmptyAfter = cipherInputs.findIndex(
          (val, idx) => idx > prevIdx && val === ''
        );
        if (nextEmptyAfter !== -1) {
          setActiveCipherSlot(nextEmptyAfter);
        } else {
          setActiveCipherSlot(
            Math.min(prevIdx + 1, currentCipher.encodedLetters.length - 1)
          );
        }
        setCipherError(null);
        return;
      }
    }

    const targetIdx = activeCipherSlot;
    const nextInputs = [...cipherInputs];
    nextInputs[targetIdx] = letter;
    setCipherInputs(nextInputs);
    setCipherError(null);

    if (fromPhysical) {
      lastPhysicalTypedRef.current = {
        slotIdx: targetIdx,
        letter,
        timestamp: now,
      };
    } else {
      lastPhysicalTypedRef.current = null;
    }

    // Advance to next empty slot after targetIdx, or next sequential slot
    const nextEmpty = nextInputs.findIndex(
      (val, idx) => idx > targetIdx && val === ''
    );
    if (nextEmpty !== -1) {
      setActiveCipherSlot(nextEmpty);
    } else {
      const anyEmpty = nextInputs.findIndex((val) => val === '');
      if (anyEmpty !== -1) {
        setActiveCipherSlot(anyEmpty);
      } else if (targetIdx + 1 < nextInputs.length) {
        setActiveCipherSlot(targetIdx + 1);
      }
    }
  };

  const handleCipherBackspace = () => {
    if (!currentCipher || cipherSolved) return;
    lastPhysicalTypedRef.current = null;

    const nextInputs = [...cipherInputs];
    if (nextInputs[activeCipherSlot] !== '') {
      nextInputs[activeCipherSlot] = '';
      setCipherInputs(nextInputs);
      setCipherError(null);
      return;
    }

    if (activeCipherSlot > 0) {
      const prevIdx = activeCipherSlot - 1;
      nextInputs[prevIdx] = '';
      setCipherInputs(nextInputs);
      setActiveCipherSlot(prevIdx);
      setCipherError(null);
    }
  };

  const handleRevealFirstCipherLetter = () => {
    if (!currentCipher || cipherSolved || cipherFirstHintUsed) return;
    const firstLetter = currentCipher.encodedLetters[0].letter;
    const nextInputs = [...cipherInputs];
    nextInputs[0] = firstLetter;
    setCipherInputs(nextInputs);
    setCipherFirstHintUsed(true);
    setCipherError(null);
    const nextEmpty = nextInputs.findIndex((val) => val === '');
    if (nextEmpty !== -1) {
      setActiveCipherSlot(nextEmpty);
    }
  };

  const handleCheckCipher = () => {
    if (!currentCipher || !isCipherFull || cipherSolved) return;
    const isExact = currentCipher.encodedLetters.every(
      (entry, idx) =>
        cipherInputs[idx].toLocaleUpperCase('hu-HU') === entry.letter
    );

    if (isExact) {
      setCipherSolved(true);
      setCipherError(null);
    } else {
      setCipherError(
        'A titkos üzenet még nem teljesen helyes. Ellenőrizd a kódtáblát!'
      );
    }
  };

  const handleNextCipher = () => {
    if (!cipherSolved) return;
    if (cipherIndex + 1 < session.cipherRounds.length) {
      const nextIdx = cipherIndex + 1;
      setCipherIndex(nextIdx);
      setCipherInputs(
        Array(session.cipherRounds[nextIdx].encodedLetters.length).fill('')
      );
      setActiveCipherSlot(0);
      setCipherFirstHintUsed(false);
      setCipherError(null);
      setCipherSolved(false);
      lastPhysicalTypedRef.current = null;
    } else {
      setStage('WORD_SEARCH');
    }
  };

  // Physical computer keyboard listener for Game 2
  useEffect(() => {
    if (stage !== 'CIPHER' || cipherSolved) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey || event.altKey) return;
      const target = event.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')
      ) {
        return;
      }

      if (event.key === 'Backspace') {
        event.preventDefault();
        handleCipherBackspace();
        return;
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        lastPhysicalTypedRef.current = null;
        setActiveCipherSlot((prev) => Math.max(0, prev - 1));
        return;
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault();
        lastPhysicalTypedRef.current = null;
        setActiveCipherSlot((prev) =>
          Math.min(
            (currentCipher?.encodedLetters.length ?? 1) - 1,
            prev + 1
          )
        );
        return;
      }

      if (event.key === 'Enter') {
        if (isCipherFull) {
          event.preventDefault();
          handleCheckCipher();
        }
        return;
      }

      if (event.key.length === 1) {
        const upperChar = event.key.toLocaleUpperCase('hu-HU');
        if (/^[A-ZÁÉÍÓÖŐÚÜŰ]$/.test(upperChar)) {
          event.preventDefault();
          handleInsertCipherLetter(upperChar, true);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  // --- Game 3 Logic ---
  const foundCellHighlightMap = useMemo(() => {
    const map = new Map<string, string>();
    session.wordSearchPuzzle.placedWords.forEach((item, idx) => {
      if (foundWordIds.includes(item.profession.id)) {
        const colorClass =
          FOUND_WORD_HIGHLIGHTS[idx % FOUND_WORD_HIGHLIGHTS.length];
        item.cells.forEach((cell) => {
          map.set(`${cell.row},${cell.col}`, colorClass);
        });
      }
    });
    return map;
  }, [session.wordSearchPuzzle, foundWordIds]);

  const isWordSearchAllFound =
    foundWordIds.length === session.wordSearchPuzzle.placedWords.length;

  // Clear temporary hint cell after 3.5s
  useEffect(() => {
    if (!hintCell) return;
    const timer = window.setTimeout(() => {
      setHintCell(null);
    }, 3500);
    return () => window.clearTimeout(timer);
  }, [hintCell]);

  const handleGridCellClick = (row: number, col: number) => {
    if (isWordSearchAllFound) return;

    // First click sets start cell
    if (!selectedStartCell) {
      setSelectedStartCell({ row, col });
      setWordSearchFeedback({
        type: 'info',
        text: 'Kiválasztottad az első betűt! Most kattints a szó utolsó betűjére!',
      });
      return;
    }

    // Clicking the same cell again cancels selection
    if (selectedStartCell.row === row && selectedStartCell.col === col) {
      setSelectedStartCell(null);
      setWordSearchFeedback(null);
      return;
    }

    const lineCells = getStraightLineCells(selectedStartCell, { row, col });
    setSelectedStartCell(null);

    if (!lineCells) {
      setWordSearchFeedback({
        type: 'error',
        text: 'Ez még nem egy keresett foglalkozás. Próbáld újra!',
      });
      return;
    }

    const matchedWord = session.wordSearchPuzzle.placedWords.find(
      (item) =>
        !foundWordIds.includes(item.profession.id) &&
        cellsMatchWord(lineCells, item.cells)
    );

    if (matchedWord) {
      setFoundWordIds((prev) => [...prev, matchedWord.profession.id]);
      setHintCell(null);
      const praise =
        POSITIVE_FEEDBACK_MESSAGES[
          foundWordIds.length % POSITIVE_FEEDBACK_MESSAGES.length
        ];
      setWordSearchFeedback({
        type: 'success',
        text: `${praise} Megtaláltad: ${matchedWord.word}!`,
      });
    } else {
      setWordSearchFeedback({
        type: 'error',
        text: 'Ez még nem egy keresett foglalkozás. Próbáld újra!',
      });
    }
  };

  const handleRequestWordSearchHint = () => {
    if (isWordSearchAllFound) return;
    const remaining = session.wordSearchPuzzle.placedWords.find(
      (item) => !foundWordIds.includes(item.profession.id)
    );
    if (!remaining) return;

    setHintCell(remaining.cells[0]);
    setSelectedStartCell(null);
    setWordSearchFeedback({
      type: 'info',
      text: 'Segítség: megvillantottuk az egyik elrejtett foglalkozás kezdőbetűjét a táblán!',
    });
  };

  const handleFinishStation5 = () => {
    if (!isWordSearchAllFound) return;
    setWasAlreadyCompletedOnFinish(isAlreadyCompleted);
    setStage('COMPLETED');
    onComplete();
    playStarChime();
  };

  const positiveTag =
    POSITIVE_FEEDBACK_MESSAGES[
      (anagramIndex + cipherIndex + foundWordIds.length) %
        POSITIVE_FEEDBACK_MESSAGES.length
    ];

  return (
    <div className="space-y-6">
      {/* INTRO SCREEN */}
      {stage === 'INTRO' && (
        <section
          aria-labelledby="station5-intro-title"
          className="rounded-3xl border border-indigo-200 bg-white shadow-sm p-6 sm:p-10"
        >
          <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center gap-6 sm:gap-8">
            <div className="w-44 h-44 sm:w-52 sm:h-52 rounded-3xl overflow-hidden border border-indigo-200 bg-indigo-50 shrink-0 shadow-xs">
              <PostOfficeOwlImage className="w-full h-full object-cover" />
            </div>

            <div className="space-y-5 text-center md:text-left">
              <div className="inline-flex items-center gap-2 text-sm font-bold text-indigo-800">
                <Mail className="w-4 h-4" aria-hidden="true" />
                <span>Rejtélyes Postahivatal · Három próba</span>
              </div>

              <h2
                id="station5-intro-title"
                className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight text-balance"
              >
                Titkos szakmanevek – Bagoly Mester rejtélyei
              </h2>

              <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
                „Kedves kis nyomozó! Nagy baj történt! A Mesterségek
                birodalmában összekeveredtek a foglalkozások nevei. Néhány név
                betűi szétszóródtak, másokat titkos számkódok rejtenek, és
                vannak olyanok is, amelyek egy betűrengetegben bújtak el. Segíts
                megtalálni őket! Három próba vár rád!”
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3.5 justify-center md:justify-start">
                <button
                  type="button"
                  onClick={() => setStage('ANAGRAM')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 min-h-[56px] px-8 py-3.5 rounded-2xl bg-indigo-700 text-white font-display font-bold text-lg hover:bg-indigo-800 active:scale-[0.99] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-700 focus-visible:ring-offset-2 whitespace-nowrap cursor-pointer"
                >
                  <Search className="w-5 h-5" aria-hidden="true" />
                  <span>Kezdődjön a megfejtés!</span>
                </button>

                <button
                  type="button"
                  onClick={onGoHome}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 min-h-[56px] px-6 py-3.5 rounded-2xl border border-slate-300 bg-white text-slate-800 font-semibold text-base hover:bg-slate-50 transition-colors whitespace-nowrap cursor-pointer"
                >
                  <ArrowLeft className="w-5 h-5" aria-hidden="true" />
                  <span>Vissza a városba</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3-GAME STEPPER */}
      {stage !== 'INTRO' && stage !== 'COMPLETED' && (
        <nav
          aria-label="Az ötödik állomás három játéka"
          className="rounded-3xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { step: 1, title: '1. Betűkavalkád' },
              { step: 2, title: '2. Titkos üzenetek' },
              { step: 3, title: '3. Szóvadász' },
            ].map((item) => {
              const isDone = stageStepNumber > item.step;
              const isCurrent = stageStepNumber === item.step;

              return (
                <div
                  key={item.step}
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl border transition-colors ${
                    isDone
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                      : isCurrent
                      ? 'bg-indigo-50 border-indigo-300 text-slate-900'
                      : 'bg-slate-50 border-slate-200 text-slate-500'
                  }`}
                >
                  <span
                    className={`w-8 h-8 rounded-xl flex items-center justify-center font-display font-bold text-sm shrink-0 ${
                      isDone
                        ? 'bg-emerald-600 text-white'
                        : isCurrent
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {isDone ? (
                      <CheckCircle2 className="w-5 h-5" aria-hidden="true" />
                    ) : (
                      item.step
                    )}
                  </span>
                  <span className="font-display text-sm sm:text-base font-bold leading-tight">
                    {item.title}
                  </span>
                </div>
              );
            })}
          </div>
        </nav>
      )}

      {/* GAME 1: BETŰKAVALKÁD */}
      {stage === 'ANAGRAM' && currentAnagram && (
        <section
          aria-labelledby="station5-game1-title"
          className="rounded-3xl border border-slate-200 bg-white shadow-sm p-6 sm:p-8 space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <p className="text-sm font-semibold text-indigo-800">
                1. próba · Betűkavalkád
              </p>
              <h2
                id="station5-game1-title"
                className="font-display text-2xl sm:text-3xl font-bold text-slate-900"
              >
                Rakd össze a szakmát!
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <span className="font-display text-base sm:text-lg font-bold text-slate-700 tabular-nums whitespace-nowrap">
                {anagramIndex + 1}. / {session.anagramRounds.length} szakmanév
              </span>
              <button
                type="button"
                onClick={onGoHome}
                className="inline-flex items-center gap-1.5 min-h-[44px] px-4 py-2 rounded-xl border border-slate-300 bg-white text-slate-800 text-sm font-semibold hover:bg-slate-50 transition-colors whitespace-nowrap cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                <span>Vissza a városba</span>
              </button>
            </div>
          </div>

          {!anagramAllDone ? (
            <div className="space-y-6">
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
                Kattints az alsó színes betűkártyákra a helyes sorrendben, hogy
                kirakd az elrejtett foglalkozás nevét! Ha tévedtél, kattints a
                felső betűre a visszavonáshoz.
              </p>

              {/* Top Solution Row */}
              <div className="rounded-2xl border-2 border-indigo-200 bg-indigo-50/50 p-5 space-y-3">
                <p className="text-sm font-bold text-indigo-900">
                  Megoldási sor ({currentAnagram.expectedTokens.length} magyar
                  betű):
                </p>

                <div className="flex flex-wrap items-center justify-center gap-3">
                  {placedTileIds.map((tileId, slotIdx) => {
                    const placedTile = tileId ? tileById.get(tileId) : null;
                    return (
                      <button
                        key={slotIdx}
                        type="button"
                        disabled={anagramSolved || !placedTile}
                        onClick={() => handleRemoveSlot(slotIdx)}
                        aria-label={
                          placedTile
                            ? `${placedTile.letter} betű eltávolítása a ${slotIdx + 1}. helyről`
                            : `${slotIdx + 1}. üres betűhely`
                        }
                        className={`min-w-[64px] h-[68px] px-3 rounded-2xl border-2 font-display text-2xl sm:text-3xl font-extrabold flex items-center justify-center transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 ${
                          anagramSolved && placedTile
                            ? 'bg-emerald-100 border-emerald-500 text-emerald-950 cursor-default'
                            : placedTile
                            ? `${placedTile.colorClass} cursor-pointer shadow-xs`
                            : 'bg-white border-dashed border-slate-300 text-slate-400 cursor-default'
                        }`}
                      >
                        {placedTile ? placedTile.letter : ''}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Shuffled Letter Cards Pool */}
              {!anagramSolved && (
                <div className="space-y-3">
                  <p className="text-sm font-bold text-slate-700">
                    Összekevert betűkártyák:
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    {currentAnagram.shuffledTiles.map((tile) => {
                      const isUsed = usedTileIds.has(tile.id);
                      return (
                        <button
                          key={tile.id}
                          type="button"
                          disabled={isUsed}
                          onClick={() => handleSelectTile(tile.id)}
                          className={`min-w-[68px] h-[72px] px-4 rounded-2xl border-2 font-display text-2xl sm:text-3xl font-extrabold flex items-center justify-center transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 ${
                            isUsed
                              ? 'bg-slate-100 border-slate-200 text-slate-300 cursor-not-allowed'
                              : `${tile.colorClass} shadow-sm active:scale-[0.97] cursor-pointer`
                          }`}
                        >
                          {tile.letter}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Action Controls */}
              {!anagramSolved && (
                <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
                  <button
                    type="button"
                    disabled={!isAnagramFull}
                    onClick={handleCheckAnagram}
                    className={`inline-flex items-center justify-center gap-2 min-h-[52px] px-7 py-3 rounded-2xl font-display font-bold text-base sm:text-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-700 focus-visible:ring-offset-2 whitespace-nowrap ${
                      isAnagramFull
                        ? 'bg-indigo-700 text-white hover:bg-indigo-800 active:scale-[0.99] cursor-pointer'
                        : 'bg-slate-200 text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    <CheckCircle2 className="w-5 h-5" aria-hidden="true" />
                    <span>Ellenőrzés</span>
                  </button>

                  <button
                    type="button"
                    disabled={usedTileIds.size === 0}
                    onClick={handleUndoLastTile}
                    className="inline-flex items-center justify-center gap-2 min-h-[52px] px-5 py-3 rounded-2xl border border-slate-300 bg-white text-slate-800 font-semibold text-base hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors whitespace-nowrap cursor-pointer"
                  >
                    <Undo2 className="w-5 h-5" aria-hidden="true" />
                    <span>Visszavonás</span>
                  </button>

                  <button
                    type="button"
                    disabled={usedTileIds.size === 0}
                    onClick={handleResetAnagramWord}
                    className="inline-flex items-center justify-center gap-2 min-h-[52px] px-5 py-3 rounded-2xl border border-slate-300 bg-white text-slate-800 font-semibold text-base hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors whitespace-nowrap cursor-pointer"
                  >
                    <RotateCcw className="w-5 h-5" aria-hidden="true" />
                    <span>Újrakezdés</span>
                  </button>

                  <button
                    type="button"
                    disabled={anagramHintLevel >= 2}
                    onClick={handleRequestAnagramHint}
                    className="inline-flex items-center justify-center gap-2 min-h-[52px] px-5 py-3 rounded-2xl border border-amber-400 bg-amber-100 text-slate-900 font-display font-bold text-base hover:bg-amber-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors whitespace-nowrap cursor-pointer"
                  >
                    <Lightbulb className="w-5 h-5" aria-hidden="true" />
                    <span>Segítséget kérek</span>
                  </button>
                </div>
              )}

              {/* Progressive Hint Display */}
              {anagramHintLevel > 0 && !anagramSolved && (
                <div
                  role="status"
                  aria-live="polite"
                  className="rounded-2xl bg-sky-50 border border-sky-200 p-4 text-sky-950 space-y-1.5"
                >
                  <div className="flex items-start gap-2.5">
                    <Lightbulb
                      className="w-5 h-5 text-sky-700 shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <div className="space-y-1">
                      <p className="text-base font-semibold">
                        Segítség: {currentAnagram.profession.helperSentence}
                      </p>
                      {anagramHintLevel >= 2 && (
                        <p className="font-display text-base font-bold text-indigo-900">
                          A szó első betűje:{' '}
                          <span className="inline-block px-2 py-0.5 rounded-lg bg-white border border-indigo-200">
                            {currentAnagram.expectedTokens[0]}
                          </span>
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Error Feedback */}
              {anagramError && !anagramSolved && (
                <div
                  role="status"
                  aria-live="polite"
                  className="rounded-2xl bg-amber-50 border border-amber-300 p-4 text-amber-950 flex items-start gap-3"
                >
                  <HelpCircle
                    className="w-6 h-6 text-amber-700 shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <p className="text-base font-semibold leading-relaxed">
                    {anagramError}
                  </p>
                </div>
              )}

              {/* Solved Feedback Card */}
              {anagramSolved && (
                <div
                  role="status"
                  aria-live="polite"
                  className="rounded-2xl bg-emerald-50 border border-emerald-300 p-5 sm:p-6 text-emerald-950 space-y-4"
                >
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                    <div className="w-24 h-24 rounded-2xl bg-white border border-emerald-200 flex items-center justify-center shrink-0">
                      <Station5ProfessionArt
                        professionId={currentAnagram.profession.id}
                        className="w-20 h-20"
                      />
                    </div>
                    <div className="space-y-1.5 text-center sm:text-left">
                      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                        <CheckCircle2
                          className="w-6 h-6 text-emerald-700 shrink-0"
                          aria-hidden="true"
                        />
                        <p className="font-display text-xl font-extrabold text-emerald-900">
                          {positiveTag} {currentAnagram.profession.word}
                        </p>
                      </div>
                      <p className="text-base text-emerald-900 leading-relaxed">
                        {currentAnagram.profession.funFact}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleNextAnagram}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 min-h-[52px] px-7 py-3 rounded-2xl bg-emerald-700 text-white font-display font-bold text-base sm:text-lg hover:bg-emerald-800 active:scale-[0.99] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 whitespace-nowrap cursor-pointer"
                  >
                    <span>Következő szó</span>
                    <ArrowRight className="w-5 h-5" aria-hidden="true" />
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div
              role="status"
              aria-live="polite"
              className="rounded-2xl bg-emerald-50 border-2 border-emerald-300 p-6 sm:p-8 text-center space-y-5"
            >
              <div className="flex justify-center">
                <div className="w-16 h-16 rounded-2xl bg-emerald-600 text-white flex items-center justify-center">
                  <Sparkles className="w-9 h-9" aria-hidden="true" />
                </div>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-emerald-950">
                Nagyszerű! Megmentetted az összekeveredett szakmaneveket!
              </h3>
              <p className="text-base sm:text-lg text-emerald-900">
                Mind a 6 elrejtett foglalkozás nevét sikeresen kiraktad. Jöhet a
                második próba!
              </p>
              <button
                type="button"
                onClick={() => setStage('CIPHER')}
                className="inline-flex items-center justify-center gap-2 min-h-[56px] px-8 py-3.5 rounded-2xl bg-indigo-700 text-white font-display font-bold text-lg hover:bg-indigo-800 active:scale-[0.99] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-700 focus-visible:ring-offset-2 whitespace-nowrap cursor-pointer"
              >
                <span>Tovább a titkos üzenetekhez</span>
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
          )}
        </section>
      )}

      {/* GAME 2: TITKOS ÜZENETEK */}
      {stage === 'CIPHER' && currentCipher && (
        <section
          aria-labelledby="station5-game2-title"
          className="rounded-3xl border border-slate-200 bg-white shadow-sm p-6 sm:p-8 space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <p className="text-sm font-semibold text-indigo-800">
                2. próba · Titkos üzenetek
              </p>
              <h2
                id="station5-game2-title"
                className="font-display text-2xl sm:text-3xl font-bold text-slate-900"
              >
                Fejtsd meg a számkódot!
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <span className="font-display text-base sm:text-lg font-bold text-slate-700 tabular-nums whitespace-nowrap">
                {cipherIndex + 1}. / {session.cipherRounds.length} titkos üzenet
              </span>
              <button
                type="button"
                onClick={onGoHome}
                className="inline-flex items-center gap-1.5 min-h-[44px] px-4 py-2 rounded-xl border border-slate-300 bg-white text-slate-800 text-sm font-semibold hover:bg-slate-50 transition-colors whitespace-nowrap cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                <span>Vissza a városba</span>
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
              Nézd meg a kódtáblát, és fejtsd meg, melyik magyar betűt jelölik a
              számok! Kattints a képernyő betűire, vagy gépeld be a
              billentyűzettel.
            </p>

            <button
              type="button"
              onClick={() => setShowCipherTable((prev) => !prev)}
              className="inline-flex items-center justify-center gap-2 min-h-[46px] px-4 py-2 rounded-xl border border-indigo-300 bg-indigo-50 text-indigo-900 font-display font-bold text-sm hover:bg-indigo-100 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <BookOpen className="w-4 h-4" aria-hidden="true" />
              <span>
                {showCipherTable ? 'Kódtábla elrejtése' : 'Kódtábla megnyitása'}
              </span>
            </button>
          </div>

          {/* Toggleable 44-letter Hungarian Cipher Table */}
          {showCipherTable && (
            <div className="rounded-2xl border border-amber-200 bg-amber-50/60 p-4 space-y-2.5">
              <div className="flex items-center gap-2 text-sm font-bold text-amber-950">
                <KeyRound className="w-4 h-4" aria-hidden="true" />
                <span>Bagoly Mester titkos kódtáblája (1–44):</span>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-11 gap-1.5">
                {HUNGARIAN_CIPHER_TABLE.map((entry) => (
                  <div
                    key={entry.code}
                    className="rounded-xl border border-amber-200 bg-white px-2 py-1.5 text-center flex items-center justify-center gap-1 text-sm tabular-nums"
                  >
                    <span className="font-bold text-indigo-700">
                      {entry.code}
                    </span>
                    <span className="text-slate-400">=</span>
                    <span className="font-display font-extrabold text-slate-900">
                      {entry.letter}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Cipher Number Codes paired with Answer Slots */}
          <div className="rounded-2xl border-2 border-indigo-200 bg-indigo-50/50 p-5 space-y-4">
            <p className="text-sm font-bold text-indigo-900">
              Titkos számkód és betűhelyek:
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {currentCipher.encodedLetters.map((item, idx) => {
                const value = cipherInputs[idx] ?? '';
                const isActive = !cipherSolved && activeCipherSlot === idx;
                return (
                  <div
                    key={`${item.code}-${idx}`}
                    className="flex flex-col items-center gap-2"
                  >
                    <span className="min-w-[56px] px-3 py-1.5 rounded-xl bg-indigo-700 text-white font-display text-lg font-extrabold text-center tabular-nums shadow-2xs">
                      {item.code}
                    </span>

                    <button
                      type="button"
                      disabled={cipherSolved}
                      onClick={() => {
                        lastPhysicalTypedRef.current = null;
                        if (activeCipherSlot === idx && value !== '') {
                          const next = [...cipherInputs];
                          next[idx] = '';
                          setCipherInputs(next);
                        } else {
                          setActiveCipherSlot(idx);
                        }
                        setCipherError(null);
                      }}
                      aria-label={`${idx + 1}. válaszmező a ${item.code} kódhoz${
                        value ? `, jelenleg: ${value}` : ''
                      }`}
                      className={`min-w-[64px] h-[64px] px-2.5 rounded-2xl border-2 font-display text-2xl font-extrabold flex items-center justify-center transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 ${
                        cipherSolved
                          ? 'bg-emerald-100 border-emerald-500 text-emerald-950 cursor-default'
                          : isActive
                          ? 'bg-white border-indigo-600 ring-2 ring-indigo-300 text-slate-900 cursor-pointer'
                          : value
                          ? 'bg-white border-slate-400 text-slate-900 hover:border-indigo-400 cursor-pointer'
                          : 'bg-white/80 border-dashed border-slate-300 text-slate-400 hover:border-indigo-300 cursor-pointer'
                      }`}
                    >
                      {value}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* On-Screen Hungarian Alphabet Keyboard (with single-tap digraphs) */}
          {!cipherSolved && (
            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-bold text-slate-700">
                  Magyar betűbillentyűzet (a kétjegyű betűk is egy gombnyomással
                  választhatók):
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 sm:p-4 space-y-2">
                {HUNGARIAN_KEYBOARD_ROWS.map((row, rowIdx) => (
                  <div
                    key={rowIdx}
                    className="flex flex-wrap items-center justify-center gap-1.5"
                  >
                    {row.map((letter) => (
                      <button
                        key={letter}
                        type="button"
                        onClick={() => handleInsertCipherLetter(letter, false)}
                        className={`min-w-[44px] h-[46px] px-2.5 rounded-xl border border-slate-300 bg-white font-display font-bold text-base text-slate-900 hover:bg-indigo-50 hover:border-indigo-400 active:scale-[0.96] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 cursor-pointer ${
                          letter.length > 1 ? 'text-indigo-900 bg-indigo-50/50' : ''
                        }`}
                      >
                        {letter}
                      </button>
                    ))}
                  </div>
                ))}

                <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                  <button
                    type="button"
                    disabled={!isCipherFull}
                    onClick={handleCheckCipher}
                    className={`inline-flex items-center justify-center gap-2 min-h-[52px] px-7 py-3 rounded-2xl font-display font-bold text-base sm:text-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-700 focus-visible:ring-offset-2 whitespace-nowrap ${
                      isCipherFull
                        ? 'bg-indigo-700 text-white hover:bg-indigo-800 active:scale-[0.99] cursor-pointer'
                        : 'bg-slate-200 text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    <CheckCircle2 className="w-5 h-5" aria-hidden="true" />
                    <span>Ellenőrzés</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleCipherBackspace}
                    className="inline-flex items-center justify-center gap-2 min-h-[52px] px-5 py-3 rounded-2xl border border-slate-300 bg-white text-slate-800 font-semibold text-base hover:bg-slate-100 transition-colors whitespace-nowrap cursor-pointer"
                  >
                    <Delete className="w-5 h-5" aria-hidden="true" />
                    <span>Törlés</span>
                  </button>

                  <button
                    type="button"
                    disabled={cipherFirstHintUsed}
                    onClick={handleRevealFirstCipherLetter}
                    className="inline-flex items-center justify-center gap-2 min-h-[52px] px-5 py-3 rounded-2xl border border-amber-400 bg-amber-100 text-slate-900 font-display font-bold text-base hover:bg-amber-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors whitespace-nowrap cursor-pointer"
                  >
                    <Eye className="w-5 h-5" aria-hidden="true" />
                    <span>Mutasd az első betűt!</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Error Feedback */}
          {cipherError && !cipherSolved && (
            <div
              role="status"
              aria-live="polite"
              className="rounded-2xl bg-amber-50 border border-amber-300 p-4 text-amber-950 flex items-start gap-3"
            >
              <HelpCircle
                className="w-6 h-6 text-amber-700 shrink-0 mt-0.5"
                aria-hidden="true"
              />
              <p className="text-base font-semibold leading-relaxed">
                {cipherError}
              </p>
            </div>
          )}

          {/* Solved Cipher Card */}
          {cipherSolved && (
            <div
              role="status"
              aria-live="polite"
              className="rounded-2xl bg-emerald-50 border border-emerald-300 p-5 sm:p-6 text-emerald-950 space-y-4"
            >
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                <div className="w-24 h-24 rounded-2xl bg-white border border-emerald-200 flex items-center justify-center shrink-0">
                  <Station5ProfessionArt
                    professionId={currentCipher.profession.id}
                    className="w-20 h-20"
                  />
                </div>
                <div className="space-y-1.5 text-center sm:text-left">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <CheckCircle2
                      className="w-6 h-6 text-emerald-700 shrink-0"
                      aria-hidden="true"
                    />
                    <p className="font-display text-xl font-extrabold text-emerald-900">
                      {positiveTag} Megfejtés: {currentCipher.profession.word}
                    </p>
                  </div>
                  <p className="text-base text-emerald-900 leading-relaxed">
                    {currentCipher.profession.funFact}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleNextCipher}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 min-h-[52px] px-7 py-3 rounded-2xl bg-emerald-700 text-white font-display font-bold text-base sm:text-lg hover:bg-emerald-800 active:scale-[0.99] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 whitespace-nowrap cursor-pointer"
              >
                <span>
                  {cipherIndex + 1 < session.cipherRounds.length
                    ? 'Következő titkos üzenet'
                    : 'Tovább a szóvadászhoz'}
                </span>
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
          )}
        </section>
      )}

      {/* GAME 3: SZÓVADÁSZ (12x12 WORD SEARCH) */}
      {stage === 'WORD_SEARCH' && (
        <section
          aria-labelledby="station5-game3-title"
          className="rounded-3xl border border-slate-200 bg-white shadow-sm p-6 sm:p-8 space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <p className="text-sm font-semibold text-indigo-800">
                3. próba · Szóvadász
              </p>
              <h2
                id="station5-game3-title"
                className="font-display text-2xl sm:text-3xl font-bold text-slate-900"
              >
                Keresd meg az elrejtett mesterségeket!
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <span className="font-display text-base sm:text-lg font-bold text-slate-700 tabular-nums whitespace-nowrap">
                Megtalált szakmák: {foundWordIds.length}/
                {session.wordSearchPuzzle.placedWords.length}
              </span>
              <button
                type="button"
                onClick={onGoHome}
                className="inline-flex items-center gap-1.5 min-h-[44px] px-4 py-2 rounded-xl border border-slate-300 bg-white text-slate-800 text-sm font-semibold hover:bg-slate-50 transition-colors whitespace-nowrap cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                <span>Vissza a városba</span>
              </button>
            </div>
          </div>

          <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
            Keresd meg a jobb oldali listában szereplő 6 foglalkozást a
            betűrácsban (vízszintesen vagy függőlegesen)! Kattints a szó{' '}
            <strong>első</strong>, majd az <strong>utolsó</strong> betűjére a
            kijelöléshez.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            {/* Left: 12x12 Interactive Letter Grid */}
            <div className="lg:col-span-8 flex justify-center">
              <div
                role="grid"
                aria-label="12×12-es szókereső betűrács"
                className="w-full max-w-[580px] rounded-2xl border-2 border-indigo-200 bg-indigo-50/40 p-2 sm:p-3"
              >
                <div className="grid grid-cols-12 gap-1 sm:gap-1.5">
                  {session.wordSearchPuzzle.grid.map((rowArr, rIdx) =>
                    rowArr.map((letter, cIdx) => {
                      const key = `${rIdx},${cIdx}`;
                      const isStart =
                        selectedStartCell?.row === rIdx &&
                        selectedStartCell?.col === cIdx;
                      const isHint =
                        hintCell?.row === rIdx && hintCell?.col === cIdx;
                      const foundColor = foundCellHighlightMap.get(key);

                      return (
                        <button
                          key={key}
                          type="button"
                          disabled={isWordSearchAllFound}
                          onClick={() => handleGridCellClick(rIdx, cIdx)}
                          aria-label={`${rIdx + 1}. sor, ${cIdx + 1}. oszlop: ${letter}`}
                          className={`aspect-square w-full min-h-[30px] sm:min-h-[40px] rounded-lg sm:rounded-xl border font-display text-sm sm:text-lg md:text-xl font-extrabold flex items-center justify-center transition-all select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-700 ${
                            isStart
                              ? 'bg-indigo-700 border-indigo-900 text-white scale-105 shadow-sm cursor-pointer'
                              : isHint
                              ? 'bg-amber-300 border-amber-600 text-slate-950 ring-2 ring-amber-400 cursor-pointer'
                              : foundColor
                              ? `${foundColor} cursor-pointer`
                              : 'bg-white border-slate-200 text-slate-900 hover:bg-indigo-50 hover:border-indigo-300 cursor-pointer'
                          }`}
                        >
                          {letter}
                        </button>
                      );
                    })
                  )}
                </div>
              </div>
            </div>

            {/* Right: Word List + Hint + Status */}
            <div className="lg:col-span-4 space-y-5">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5 space-y-3.5">
                <div className="flex items-center gap-2">
                  <Grid3X3
                    className="w-5 h-5 text-indigo-700"
                    aria-hidden="true"
                  />
                  <h3 className="font-display text-lg font-bold text-slate-900">
                    Keresett szakmák
                  </h3>
                </div>

                <ul className="space-y-2.5">
                  {session.wordSearchPuzzle.placedWords.map((item, idx) => {
                    const isFound = foundWordIds.includes(item.profession.id);
                    const badgeColor =
                      FOUND_WORD_HIGHLIGHTS[idx % FOUND_WORD_HIGHLIGHTS.length];

                    return (
                      <li
                        key={item.profession.id}
                        className={`rounded-xl border px-3.5 py-2.5 flex items-center justify-between gap-2 transition-colors ${
                          isFound
                            ? `${badgeColor}`
                            : 'bg-white border-slate-200 text-slate-900'
                        }`}
                      >
                        <span
                          className={`font-display text-base sm:text-lg font-bold ${
                            isFound ? 'line-through' : ''
                          }`}
                        >
                          {item.word}
                        </span>
                        {isFound && (
                          <Check
                            className="w-5 h-5 shrink-0"
                            aria-label="Megtalálva"
                          />
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>

              {!isWordSearchAllFound && (
                <button
                  type="button"
                  onClick={handleRequestWordSearchHint}
                  className="w-full inline-flex items-center justify-center gap-2 min-h-[52px] px-5 py-3 rounded-2xl border border-amber-400 bg-amber-100 text-slate-900 font-display font-bold text-base hover:bg-amber-200 active:scale-[0.99] transition-all whitespace-nowrap cursor-pointer"
                >
                  <Lightbulb className="w-5 h-5" aria-hidden="true" />
                  <span>Segítséget kérek</span>
                </button>
              )}

              {wordSearchFeedback && !isWordSearchAllFound && (
                <div
                  role="status"
                  aria-live="polite"
                  className={`rounded-2xl border p-4 flex items-start gap-3 ${
                    wordSearchFeedback.type === 'success'
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                      : wordSearchFeedback.type === 'error'
                      ? 'bg-amber-50 border-amber-300 text-amber-950'
                      : 'bg-sky-50 border-sky-200 text-sky-950'
                  }`}
                >
                  {wordSearchFeedback.type === 'success' ? (
                    <CheckCircle2
                      className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                  ) : wordSearchFeedback.type === 'error' ? (
                    <HelpCircle
                      className="w-5 h-5 text-amber-700 shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                  ) : (
                    <Lightbulb
                      className="w-5 h-5 text-sky-700 shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                  )}
                  <p className="text-sm sm:text-base font-semibold leading-relaxed">
                    {wordSearchFeedback.text}
                  </p>
                </div>
              )}

              {isWordSearchAllFound && (
                <div
                  role="status"
                  aria-live="polite"
                  className="rounded-2xl bg-emerald-50 border-2 border-emerald-300 p-5 text-emerald-950 space-y-4"
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle2
                      className="w-6 h-6 text-emerald-700 shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <p className="font-display text-lg font-extrabold text-emerald-950 leading-snug">
                      Fantasztikus! A betűrengeteg összes mesterségét
                      megtaláltad!
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleFinishStation5}
                    className="w-full inline-flex items-center justify-center gap-2 min-h-[54px] px-6 py-3 rounded-2xl bg-emerald-700 text-white font-display font-bold text-base sm:text-lg hover:bg-emerald-800 active:scale-[0.99] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 whitespace-nowrap cursor-pointer"
                  >
                    <span>Állomás befejezése</span>
                    <ArrowRight className="w-5 h-5" aria-hidden="true" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* COMPLETED SCREEN */}
      {stage === 'COMPLETED' && (
        <section
          aria-labelledby="station5-complete-title"
          className="rounded-3xl border border-amber-300 bg-white shadow-sm p-6 sm:p-10 text-center"
        >
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="flex items-center justify-center gap-5">
              <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-3xl overflow-hidden border border-amber-300 bg-amber-50 shadow-xs">
                <CipherStarOwlImage className="w-full h-full object-cover" />
              </div>
              <div className="w-24 h-24 rounded-3xl bg-amber-100 border border-amber-300 flex items-center justify-center shrink-0">
                <Star
                  className="w-14 h-14 fill-amber-400 text-amber-500"
                  aria-hidden="true"
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 text-sm font-bold text-indigo-800">
                <Award className="w-5 h-5" aria-hidden="true" />
                <span>Mindhárom kódfejtő próba teljesítve!</span>
              </div>

              <h2
                id="station5-complete-title"
                className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 leading-snug text-balance"
              >
                Gratulálok, kis kódfejtő! Megmentetted a Mesterségek
                birodalmának elveszett szakmaneveit! Ügyesen rendezted a
                betűket, megfejtetted a titkos üzeneteket, és megtaláltad a
                betűrengetegben elrejtett foglalkozásokat!
              </h2>

              <p className="font-display text-lg sm:text-xl font-bold text-amber-800">
                Megszerezted a Titkos szakmanevek állomás csillagát!
              </p>

              {wasAlreadyCompletedOnFinish && (
                <p className="text-base text-slate-600">
                  Ezt az állomást már korábban is teljesítetted, így az
                  újrajátszás nem adott újabb csillagot, a gyűjteményedben már
                  szerepel.
                </p>
              )}
            </div>

            <div className="pt-2 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3.5">
              <button
                type="button"
                onClick={handleRestartStation}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 min-h-[52px] px-6 py-3 rounded-2xl border border-slate-300 bg-white text-slate-800 font-display font-bold text-base hover:bg-slate-50 active:scale-[0.99] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2 whitespace-nowrap cursor-pointer"
              >
                <RotateCcw
                  className="w-5 h-5 text-slate-600"
                  aria-hidden="true"
                />
                <span>Újrajátszás</span>
              </button>

              <button
                type="button"
                onClick={onGoHome}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 min-h-[52px] px-6 py-3 rounded-2xl bg-slate-900 text-white font-display font-bold text-base hover:bg-slate-800 active:scale-[0.99] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 whitespace-nowrap cursor-pointer"
              >
                <ArrowLeft className="w-5 h-5" aria-hidden="true" />
                <span>Vissza a városba</span>
              </button>

              <button
                type="button"
                onClick={onGoToNextStation}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 min-h-[52px] px-6 py-3 rounded-2xl bg-indigo-700 text-white font-display font-bold text-base hover:bg-indigo-800 active:scale-[0.99] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-700 focus-visible:ring-offset-2 whitespace-nowrap cursor-pointer"
              >
                <span>Tovább a 6. állomásra – Igaz vagy hamis?</span>
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
