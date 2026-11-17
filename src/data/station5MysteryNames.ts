export type Station5ProfessionId =
  | 'pek'
  | 'orvos'
  | 'postas'
  | 'kertesz'
  | 'szakacs'
  | 'fodrasz'
  | 'tanito'
  | 'fazekas'
  | 'kovacs'
  | 'mehesz';

export interface Station5ProfessionItem {
  id: Station5ProfessionId;
  word: string;
  helperSentence: string;
  funFact: string;
}

export const STATION5_PROFESSIONS: Station5ProfessionItem[] = [
  {
    id: 'pek',
    word: 'PÉK',
    helperSentence: 'Kenyeret és péksüteményeket készít.',
    funFact:
      'A pékek gyakran már hajnalban munkába állnak, hogy reggelre friss, ropogós kenyér és kifli várja az embereket.',
  },
  {
    id: 'orvos',
    word: 'ORVOS',
    helperSentence: 'Betegeket vizsgál és gyógyít.',
    funFact:
      'Az orvos fonendoszkóppal hallgatja meg a szívet és a tüdőt, és segít megelőzni a betegségeket is.',
  },
  {
    id: 'postas',
    word: 'POSTÁS',
    helperSentence: 'Leveleket és küldeményeket kézbesít.',
    funFact:
      'A postás minden időjárásban pontosan kézbesíti a leveleket, képeslapokat és csomagokat a címzetteknek.',
  },
  {
    id: 'kertesz',
    word: 'KERTÉSZ',
    helperSentence: 'Növényeket gondoz.',
    funFact:
      'A kertész tudja, melyik növénynek mennyi fényre és vízre van szüksége ahhoz, hogy egészségesen fejlődjön.',
  },
  {
    id: 'szakacs',
    word: 'SZAKÁCS',
    helperSentence: 'Ételeket készít.',
    funFact:
      'A szakács ügyesen párosítja a fűszereket és a friss alapanyagokat, hogy finom és tápláló ételek készüljenek.',
  },
  {
    id: 'fodrasz',
    word: 'FODRÁSZ',
    helperSentence: 'Hajat vág és frizurát készít.',
    funFact:
      'A fodrász biztos kézzel bánik az ollóval és a fésűvel, és segít kiválasztani a vendéghez illő frizurát.',
  },
  {
    id: 'tanito',
    word: 'TANÍTÓ',
    helperSentence: 'Gyerekeket tanít az iskolában.',
    funFact:
      'A tanító segít elsajátítani az olvasást, az írást, a számolást és az egymással való együttműködést.',
  },
  {
    id: 'fazekas',
    word: 'FAZEKAS',
    helperSentence: 'Agyagból edényeket készít.',
    funFact:
      'A fazekas a forgó korongon formálja meg a puha agyagot, majd kemencében égeti ki az elkészült kancsókat és tálakat.',
  },
  {
    id: 'kovacs',
    word: 'KOVÁCS',
    helperSentence: 'Fémet alakít és munkál meg.',
    funFact:
      'A kovács a tűzben felizzított vasat az üllőn kalapálja formára, így készülnek erős szerszámok és díszes kapuk.',
  },
  {
    id: 'mehesz',
    word: 'MÉHÉSZ',
    helperSentence: 'Méhcsaládokat gondoz.',
    funFact:
      'A méhész gondoskodik a kaptárakban élő méhekről, akik a virágok nektárjából finom mézet készítenek.',
  },
];

// Game 2 uses this exact 8-item bank
export const CIPHER_WORD_BANK_NAMES: string[] = [
  'PÉK',
  'ORVOS',
  'TANÍTÓ',
  'MÉHÉSZ',
  'KOVÁCS',
  'FAZEKAS',
  'KERTÉSZ',
  'POSTÁS',
];

export interface CipherEntry {
  code: number;
  letter: string;
}

// Exact 44-letter Hungarian alphabet cipher table specified by prompt
export const HUNGARIAN_CIPHER_TABLE: CipherEntry[] = [
  { code: 1, letter: 'A' },
  { code: 2, letter: 'Á' },
  { code: 3, letter: 'B' },
  { code: 4, letter: 'C' },
  { code: 5, letter: 'CS' },
  { code: 6, letter: 'D' },
  { code: 7, letter: 'DZ' },
  { code: 8, letter: 'DZS' },
  { code: 9, letter: 'E' },
  { code: 10, letter: 'É' },
  { code: 11, letter: 'F' },
  { code: 12, letter: 'G' },
  { code: 13, letter: 'GY' },
  { code: 14, letter: 'H' },
  { code: 15, letter: 'I' },
  { code: 16, letter: 'Í' },
  { code: 17, letter: 'J' },
  { code: 18, letter: 'K' },
  { code: 19, letter: 'L' },
  { code: 20, letter: 'LY' },
  { code: 21, letter: 'M' },
  { code: 22, letter: 'N' },
  { code: 23, letter: 'NY' },
  { code: 24, letter: 'O' },
  { code: 25, letter: 'Ó' },
  { code: 26, letter: 'Ö' },
  { code: 27, letter: 'Ő' },
  { code: 28, letter: 'P' },
  { code: 29, letter: 'Q' },
  { code: 30, letter: 'R' },
  { code: 31, letter: 'S' },
  { code: 32, letter: 'SZ' },
  { code: 33, letter: 'T' },
  { code: 34, letter: 'TY' },
  { code: 35, letter: 'U' },
  { code: 36, letter: 'Ú' },
  { code: 37, letter: 'Ü' },
  { code: 38, letter: 'Ű' },
  { code: 39, letter: 'V' },
  { code: 40, letter: 'W' },
  { code: 41, letter: 'X' },
  { code: 42, letter: 'Y' },
  { code: 43, letter: 'Z' },
  { code: 44, letter: 'ZS' },
];

const LETTER_TO_CODE_MAP = new Map<string, number>(
  HUNGARIAN_CIPHER_TABLE.map((entry) => [entry.letter, entry.code])
);

const MULTIGRAPHS_BY_LENGTH = [
  ['DZS'],
  ['CS', 'DZ', 'GY', 'LY', 'NY', 'SZ', 'TY', 'ZS'],
] as const;

/**
 * Splits a Hungarian word into proper Hungarian alphabet letters
 * (keeping digraphs/trigraphs like SZ, CS, GY, NY, DZS as single tokens).
 */
export function tokenizeHungarianLetters(word: string): string[] {
  const upper = word.trim().toLocaleUpperCase('hu-HU');
  const tokens: string[] = [];
  let i = 0;

  while (i < upper.length) {
    const tri = upper.slice(i, i + 3);
    if ((MULTIGRAPHS_BY_LENGTH[0] as readonly string[]).includes(tri)) {
      tokens.push(tri);
      i += 3;
      continue;
    }
    const di = upper.slice(i, i + 2);
    if ((MULTIGRAPHS_BY_LENGTH[1] as readonly string[]).includes(di)) {
      tokens.push(di);
      i += 2;
      continue;
    }
    tokens.push(upper[i]);
    i += 1;
  }

  return tokens;
}

export interface EncodedCipherLetter {
  letter: string;
  code: number;
}

/**
 * Programmatically converts a Hungarian profession word into exact numeric codes
 * using HUNGARIAN_CIPHER_TABLE.
 */
export function encodeWordWithCipherTable(word: string): EncodedCipherLetter[] {
  const tokens = tokenizeHungarianLetters(word);
  return tokens.map((letter) => {
    const code = LETTER_TO_CODE_MAP.get(letter);
    if (code === undefined) {
      throw new Error(`Ismeretlen magyar betű a kódtáblában: ${letter}`);
    }
    return { letter, code };
  });
}

export function shuffleArray<T>(items: readonly T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// --- Game 3: 12x12 Hungarian Word Search Generator ---
export const WORD_SEARCH_GRID_SIZE = 12;

export interface GridCoordinate {
  row: number;
  col: number;
}

export interface PlacedWordSearchItem {
  profession: Station5ProfessionItem;
  word: string;
  chars: string[];
  cells: GridCoordinate[];
}

export interface WordSearchPuzzle {
  grid: string[][];
  placedWords: PlacedWordSearchItem[];
}

const HUNGARIAN_FILL_CHARS = [
  'A',
  'Á',
  'B',
  'C',
  'D',
  'E',
  'É',
  'F',
  'G',
  'H',
  'I',
  'Í',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'Ó',
  'Ö',
  'Ő',
  'P',
  'R',
  'S',
  'T',
  'U',
  'Ú',
  'Ü',
  'Ű',
  'V',
  'Z',
];

type DirectionVector = { dRow: number; dCol: number };

// Horizontal & vertical only (no diagonals), including forward & reverse
const DIRECTIONS: DirectionVector[] = [
  { dRow: 0, dCol: 1 }, // left -> right
  { dRow: 1, dCol: 0 }, // top -> bottom
  { dRow: 0, dCol: -1 }, // right -> left
  { dRow: -1, dCol: 0 }, // bottom -> top
];

function countWordOccurrencesInGrid(grid: string[][], word: string): number {
  const size = grid.length;
  const len = word.length;
  let count = 0;

  for (let r = 0; r < size; r += 1) {
    for (let c = 0; c < size; c += 1) {
      for (const dir of DIRECTIONS) {
        const endR = r + dir.dRow * (len - 1);
        const endC = c + dir.dCol * (len - 1);
        if (endR < 0 || endR >= size || endC < 0 || endC >= size) continue;

        let match = true;
        for (let k = 0; k < len; k += 1) {
          if (grid[r + dir.dRow * k][c + dir.dCol * k] !== word[k]) {
            match = false;
            break;
          }
        }
        if (match) count += 1;
      }
    }
  }
  return count;
}

function tryBuildWordSearchPuzzle(
  selectedProfessions: Station5ProfessionItem[]
): WordSearchPuzzle | null {
  const size = WORD_SEARCH_GRID_SIZE;
  const grid: (string | null)[][] = Array.from({ length: size }, () =>
    Array<string | null>(size).fill(null)
  );
  const placedWords: PlacedWordSearchItem[] = [];

  // Place longer words first for reliable fitting
  const ordered = [...selectedProfessions].sort(
    (a, b) => b.word.length - a.word.length
  );

  // Ensure at least a mix of horizontal & vertical orientations
  for (let idx = 0; idx < ordered.length; idx += 1) {
    const profession = ordered[idx];
    const chars = Array.from(profession.word);
    const len = chars.length;

    // Weight forward directions higher for 3rd graders, with 1-2 reverse allowed
    const preferredDirs =
      idx % 3 === 2
        ? shuffleArray(DIRECTIONS)
        : shuffleArray([DIRECTIONS[0], DIRECTIONS[1]]);

    const candidatePlacements: {
      cells: GridCoordinate[];
      overlapScore: number;
    }[] = [];

    for (const dir of preferredDirs) {
      for (let r = 0; r < size; r += 1) {
        for (let c = 0; c < size; c += 1) {
          const endR = r + dir.dRow * (len - 1);
          const endC = c + dir.dCol * (len - 1);
          if (endR < 0 || endR >= size || endC < 0 || endC >= size) continue;

          let fits = true;
          let overlapScore = 0;
          const cells: GridCoordinate[] = [];

          for (let k = 0; k < len; k += 1) {
            const nr = r + dir.dRow * k;
            const nc = c + dir.dCol * k;
            const existing = grid[nr][nc];
            if (existing !== null && existing !== chars[k]) {
              fits = false;
              break;
            }
            if (existing === chars[k]) {
              overlapScore += 1;
            }
            cells.push({ row: nr, col: nc });
          }

          if (fits) {
            candidatePlacements.push({ cells, overlapScore });
          }
        }
      }
    }

    if (candidatePlacements.length === 0) {
      return null;
    }

    // Prefer slight crossings when available, otherwise random valid placement
    const crossingCandidates = candidatePlacements.filter(
      (p) => p.overlapScore > 0
    );
    const pool =
      crossingCandidates.length > 0 && Math.random() < 0.55
        ? crossingCandidates
        : candidatePlacements;
    const chosen = pool[Math.floor(Math.random() * pool.length)];

    chosen.cells.forEach((cell, k) => {
      grid[cell.row][cell.col] = chars[k];
    });

    placedWords.push({
      profession,
      word: profession.word,
      chars,
      cells: chosen.cells,
    });
  }

  // Fill empty cells with random Hungarian letters
  const filledGrid: string[][] = grid.map((row) =>
    row.map((cell) => {
      if (cell !== null) return cell;
      return HUNGARIAN_FILL_CHARS[
        Math.floor(Math.random() * HUNGARIAN_FILL_CHARS.length)
      ];
    })
  );

  // Strict verification: every hidden word must appear EXACTLY once in the final grid
  for (const item of placedWords) {
    if (countWordOccurrencesInGrid(filledGrid, item.word) !== 1) {
      return null;
    }
  }

  // Return placedWords in original display order
  const byId = new Map(placedWords.map((p) => [p.profession.id, p]));
  const finalOrderedWords = selectedProfessions.map((p) => byId.get(p.id)!);

  return {
    grid: filledGrid,
    placedWords: finalOrderedWords,
  };
}

const DEFAULT_FALLBACK_WORD_IDS: Station5ProfessionId[] = [
  'orvos',
  'postas',
  'kertesz',
  'kovacs',
  'tanito',
  'mehesz',
];

function buildDeterministicFallbackPuzzle(): WordSearchPuzzle {
  const byId = new Map(STATION5_PROFESSIONS.map((p) => [p.id, p]));
  const professions = DEFAULT_FALLBACK_WORD_IDS.map((id) => byId.get(id)!);

  const layoutSpecs: {
    id: Station5ProfessionId;
    startRow: number;
    startCol: number;
    dRow: number;
    dCol: number;
  }[] = [
    { id: 'orvos', startRow: 1, startCol: 1, dRow: 0, dCol: 1 },
    { id: 'postas', startRow: 3, startCol: 4, dRow: 0, dCol: 1 },
    { id: 'kertesz', startRow: 5, startCol: 2, dRow: 0, dCol: 1 },
    { id: 'kovacs', startRow: 1, startCol: 10, dRow: 1, dCol: 0 },
    { id: 'tanito', startRow: 7, startCol: 0, dRow: 0, dCol: 1 },
    { id: 'mehesz', startRow: 9, startCol: 5, dRow: 0, dCol: 1 },
  ];

  // Safe fixed filler pattern avoiding accidental words
  const safeFillerRow = ['B', 'U', 'G', 'J', 'L', 'D', 'Ü', 'F', 'H', 'C', 'N', 'Ő'];
  const grid: string[][] = Array.from({ length: WORD_SEARCH_GRID_SIZE }, (_, r) =>
    Array.from({ length: WORD_SEARCH_GRID_SIZE }, (__, c) => {
      return safeFillerRow[(r * 5 + c) % safeFillerRow.length];
    })
  );

  const placedWords: PlacedWordSearchItem[] = layoutSpecs.map((spec) => {
    const profession = professions.find((p) => p.id === spec.id)!;
    const chars = Array.from(profession.word);
    const cells: GridCoordinate[] = chars.map((ch, k) => {
      const row = spec.startRow + spec.dRow * k;
      const col = spec.startCol + spec.dCol * k;
      grid[row][col] = ch;
      return { row, col };
    });
    return {
      profession,
      word: profession.word,
      chars,
      cells,
    };
  });

  return { grid, placedWords };
}

export function generateWordSearchPuzzle(): WordSearchPuzzle {
  const selectedProfessions = shuffleArray(STATION5_PROFESSIONS).slice(0, 6);

  for (let attempt = 0; attempt < 40; attempt += 1) {
    const puzzle = tryBuildWordSearchPuzzle(selectedProfessions);
    if (puzzle) {
      return puzzle;
    }
  }

  return buildDeterministicFallbackPuzzle();
}
