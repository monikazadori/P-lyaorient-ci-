export interface TruthStatementItem {
  id: string;
  statement: string;
  isTrue: boolean;
  explanation: string;
  retryHint: string;
}

export const TRUTH_STATEMENTS: TruthStatementItem[] = [
  {
    id: 'pek_kenyer',
    statement: 'A pék kenyeret és péksüteményeket készít.',
    isTrue: true,
    explanation:
      'Igaz! A pék pékségben dagaszt, keleszt és süt friss kenyeret, kiflit és péksüteményeket.',
    retryHint:
      'Gondold át, mi készül a pékség kemencéjében minden reggel!',
  },
  {
    id: 'tuzolto_kizarolag',
    statement: 'A tűzoltó kizárólag tüzet olt, máskor nem segít.',
    isTrue: false,
    explanation:
      'Hamis! A tűzoltó nemcsak tüzet olt, hanem műszaki mentésben, baleseteknél és más veszélyhelyzetekben is segít.',
    retryHint:
      'Vajon csak tűznél hívják a tűzoltókat, vagy viharkároknál és baleseteknél is segítenek?',
  },
  {
    id: 'konyvtaros_eligazit',
    statement: 'A könyvtáros segít eligazodni a könyvek között.',
    isTrue: true,
    explanation:
      'Igaz! A könyvtáros jól ismeri a polcok rendjét, és szívesen ajánl mesekönyveket vagy ismeretterjesztő könyveket.',
    retryHint:
      'Kitől kérünk tanácsot a könyvtárban, ha egy adott témáról szóló könyvet keresünk?',
  },
  {
    id: 'kovacs_agyagedeny',
    statement: 'A kovács agyagedényeket formáz korongon.',
    isTrue: false,
    explanation:
      'Hamis! A kovács fémet munkál meg üllő és kalapács segítségével, az agyagedényeket a fazekas készíti.',
    retryHint:
      'Figyelj a két régi mesterség különbségére: ki dolgozik vassal, és ki agyaggal?',
  },
  {
    id: 'allatorvos_gyogyit',
    statement: 'Az állatorvos beteg állatok gyógyításával foglalkozik.',
    isTrue: true,
    explanation:
      'Igaz! Az állatorvos megvizsgálja, beoltja és meggyógyítja a háziállatokat és más állatokat.',
    retryHint:
      'Hová visszük a kutyát vagy a cicát, ha megbetegszik?',
  },
  {
    id: 'kertesz_novenyek',
    statement: 'A kertész növényeket gondoz és nevel.',
    isTrue: true,
    explanation:
      'Igaz! A kertész elülteti, öntözi, metszi és gondozza a virágokat, fákat és más növényeket.',
    retryHint:
      'Mi a legfőbb feladata annak, aki kertekkel és parkokkal foglalkozik?',
  },
  {
    id: 'mentoapolo_csak_vezet',
    statement: 'A mentőápoló csak autót vezet, a betegekkel nem foglalkozik.',
    isTrue: false,
    explanation:
      'Hamis! A mentőápoló megvizsgálja a sérülteket és betegeket, elsősegélyt nyújt, és ellátja őket a kórházba érkezésig.',
    retryHint:
      'Mit tesz a mentőcsapat, amikor kiérkezik egy beteghez vagy sérülthöz?',
  },
  {
    id: 'programozo_programok',
    statement: 'A programozó számítógépes programokat is készíthet.',
    isTrue: true,
    explanation:
      'Igaz! A programozó kódok és utasítások segítségével készít játékokat, oktatóprogramokat és alkalmazásokat.',
    retryHint:
      'Ki írja meg azokat a kódokat, amelyek segítségével a számítógépes játékok és programok működnek?',
  },
  {
    id: 'szabo_ruhak',
    statement: 'A szabó ruhák készítésével és javításával is foglalkozhat.',
    isTrue: true,
    explanation:
      'Igaz! A szabó méretet vesz, kiszabja az anyagot, és megvarrja vagy megjavítja a ruhákat.',
    retryHint:
      'Kihez fordulunk, ha új ruhát kell varrni vagy egy kabátot kell megigazítani?',
  },
  {
    id: 'autoszerelo_repulo',
    statement: 'Az autószerelő repülőgépek vezetésével foglalkozik.',
    isTrue: false,
    explanation:
      'Hamis! Az autószerelő a műhelyben autókat vizsgál és javít, a repülőgépet pedig a pilóta vezeti.',
    retryHint:
      'Nézd meg pontosan a szó elejét: autóval vagy repülőgéppel dolgozik az autószerelő?',
  },
];

export type ErrorSceneId =
  | 'pekseg'
  | 'orvosi_rendelo'
  | 'viraguzlet'
  | 'autoszerelo_muhely'
  | 'konyvtar'
  | 'kert';

export interface ErrorOption {
  letter: 'A' | 'B' | 'C';
  text: string;
}

export interface FindErrorPuzzleItem {
  id: ErrorSceneId;
  sceneTitle: string;
  options: [ErrorOption, ErrorOption, ErrorOption];
  wrongOptionLetter: 'A' | 'B' | 'C';
  explanation: string;
  retryHint: string;
}

export const FIND_ERROR_PUZZLES: FindErrorPuzzleItem[] = [
  {
    id: 'pekseg',
    sceneTitle: 'Pékség – Pék kenyérrel',
    options: [
      { letter: 'A', text: 'A pék kenyeret süt.' },
      { letter: 'B', text: 'A pék tésztát készíthet.' },
      { letter: 'C', text: 'A pék patkót kovácsol.' },
    ],
    wrongOptionLetter: 'C',
    explanation:
      'Helyes! A C állítás nem igaz, mert patkót a kovács kovácsol, a pék pedig kenyeret és tésztát készít.',
    retryHint:
      'Figyeld meg a képet! Melyik tevékenység nem a pékségbe, hanem a kovácsműhelybe illik?',
  },
  {
    id: 'orvosi_rendelo',
    sceneTitle: 'Orvosi rendelő – Orvos sztetoszkóppal',
    options: [
      { letter: 'A', text: 'Az orvos betegeket vizsgál.' },
      { letter: 'B', text: 'Az orvos betegségek felismerésében segít.' },
      { letter: 'C', text: 'Az orvos minden nap házakat épít.' },
    ],
    wrongOptionLetter: 'C',
    explanation:
      'Nagyszerű! A C állítás a tévedés, hiszen házakat a kőműves és az építész épít, az orvos pedig gyógyít.',
    retryHint:
      'Keresd azt a mondatot, amely egy teljesen másik szakma munkájáról szól!',
  },
  {
    id: 'viraguzlet',
    sceneTitle: 'Virágüzlet – Virágkötő csokorral',
    options: [
      { letter: 'A', text: 'A virágkötő csokrokat készít.' },
      { letter: 'B', text: 'A virágkötő autómotort javít.' },
      { letter: 'C', text: 'A virágkötő virágokkal dolgozik.' },
    ],
    wrongOptionLetter: 'B',
    explanation:
      'Pontosan! A B állítás nem igaz: az autómotort az autószerelő javítja, a virágkötő pedig virágokból köt csokrot.',
    retryHint:
      'Nézd meg a virágüzlet képét! Melyik állítás szól autóról és motorról?',
  },
  {
    id: 'autoszerelo_muhely',
    sceneTitle: 'Autószerelő műhely',
    options: [
      { letter: 'A', text: 'Az autószerelő autókat javít.' },
      { letter: 'B', text: 'Az autószerelő szerszámokat használ.' },
      { letter: 'C', text: 'Az autószerelő kenyeret süt a műhelyben.' },
    ],
    wrongOptionLetter: 'C',
    explanation:
      'Ügyes vagy! A C állítás hibás, mert a műhelyben szerszámokkal autókat javítanak, kenyeret a pékségben sütnek.',
    retryHint:
      'Melyik tevékenység tartozik inkább a pék munkájához, nem az autószerelőhöz?',
  },
  {
    id: 'konyvtar',
    sceneTitle: 'Könyvtár – Könyvtáros könyvekkel',
    options: [
      { letter: 'A', text: 'A könyvtáros segít könyvet keresni.' },
      { letter: 'B', text: 'A könyvtáros könyveket rendszerez.' },
      { letter: 'C', text: 'A könyvtáros tüzet olt a tűzoltóautóval.' },
    ],
    wrongOptionLetter: 'C',
    explanation:
      'Telitalálat! A C állítás nem igaz, mert tüzet a tűzoltó olt, a könyvtáros a könyvek között segít eligazodni.',
    retryHint:
      'Melyik mondatban szerepel egy egészen más, vészhelyzetben segítő jármű és feladat?',
  },
  {
    id: 'kert',
    sceneTitle: 'Kert – Kertész növényekkel',
    options: [
      { letter: 'A', text: 'A kertész növényeket gondoz.' },
      { letter: 'B', text: 'A kertész repülőgépet vezet a kertben.' },
      { letter: 'C', text: 'A kertész ültethet virágokat.' },
    ],
    wrongOptionLetter: 'B',
    explanation:
      'Remek megfigyelés! A B állítás képtelenség: a repülőgépet a pilóta vezeti a levegőben, a kertész pedig növényeket ültet és gondoz.',
    retryHint:
      'Nézd át mindhárom mondatot! Melyik nem történhet meg egy kertész munkája során?',
  },
];

export interface ExplainWhyOption {
  letter: 'A' | 'B' | 'C';
  text: string;
}

export interface ExplainWhyQuestion {
  id: string;
  question: string;
  options: [ExplainWhyOption, ExplainWhyOption, ExplainWhyOption];
  correctLetter: 'A' | 'B' | 'C';
  explanation: string;
  retryHint: string;
}

export const EXPLAIN_WHY_QUESTIONS: ExplainWhyQuestion[] = [
  {
    id: 'orvos_figyelem',
    question:
      'Miért fontos, hogy az orvos figyelmesen meghallgassa a beteget?',
    options: [
      { letter: 'A', text: 'Mert így könnyebben megértheti a panaszait.' },
      { letter: 'B', text: 'Mert így gyorsabban telik az idő.' },
      { letter: 'C', text: 'Mert minden beteg ugyanazt mondja.' },
    ],
    correctLetter: 'A',
    explanation:
      'Pontosan! Ha a beteg elmondja, hol fáj vagy mit érez, az orvos könnyebben megtalálja a baj okát és a megfelelő gyógymódot.',
    retryHint:
      'Gondold végig, mi segíti az orvost abban, hogy kiderítse, mi a beteg baja!',
  },
  {
    id: 'pek_merleg',
    question: 'Miért kell a péknek pontosan kimérnie a hozzávalókat?',
    options: [
      { letter: 'A', text: 'Mert a mérleg szépen mutat a konyhában.' },
      {
        letter: 'B',
        text: 'Mert az arányok befolyásolják a tészta minőségét.',
      },
      { letter: 'C', text: 'Mert különben nem tudja bekapcsolni a sütőt.' },
    ],
    correctLetter: 'B',
    explanation:
      'Így van! Ha pontosan kimérjük a lisztet, a vizet és az élesztőt, a tészta jól megkel, és finom, puha lesz a kenyér.',
    retryHint:
      'Mi történik a kenyértésztával, ha túl sok vagy túl kevés víz kerül bele?',
  },
  {
    id: 'tuzolto_csapat',
    question: 'Miért fontos az együttműködés a tűzoltók munkájában?',
    options: [
      {
        letter: 'A',
        text: 'Mert a csapatmunka segíti a gyors és biztonságos mentést.',
      },
      { letter: 'B', text: 'Mert így mindenki ugyanazt a sisakot viselheti.' },
      { letter: 'C', text: 'Mert akkor senkinek sem kell figyelnie.' },
    ],
    correctLetter: 'A',
    explanation:
      'Nagyszerű válasz! Veszélyhelyzetben minden másodperc számít, ezért a tűzoltók egymást segítve, összehangoltan dolgoznak.',
    retryHint:
      'Milyen előnye van annak, ha többen, összehangoltan dolgoznak egy mentésnél?',
  },
  {
    id: 'konyvtaros_rend',
    question:
      'Miért kell a könyvtárosnak ismernie a könyvek elrendezését?',
    options: [
      {
        letter: 'A',
        text: 'Mert így könnyebben megtalálja és megmutatja a keresett könyveket.',
      },
      {
        letter: 'B',
        text: 'Mert így minden könyvet egyszerre el tud olvasni.',
      },
      { letter: 'C', text: 'Mert a könyvek maguktól helyet cserélnek.' },
    ],
    correctLetter: 'A',
    explanation:
      'Telitalálat! A sok száz vagy ezer könyv között a rendszerezés segít, hogy az olvasók gyorsan megkapják a kívánt könyvet.',
    retryHint:
      'Miért jó az olvasónak, ha a könyvtáros pontosan tudja, melyik polcon van egy mesekönyv?',
  },
  {
    id: 'kertesz_turelem',
    question: 'Miért fontos a kertész számára a türelem?',
    options: [
      {
        letter: 'A',
        text: 'Mert a növények fejlődéséhez idő és gondoskodás kell.',
      },
      { letter: 'B', text: 'Mert minden növény egyetlen perc alatt megnő.' },
      { letter: 'C', text: 'Mert a növényeket soha nem kell figyelni.' },
    ],
    correctLetter: 'A',
    explanation:
      'Remekül gondolkodsz! Az elültetett magok és palánták csak hetek vagy hónapok alatt, rendszeres öntözéssel és gondozással nőnek meg.',
    retryHint:
      'Mennyi idő alatt nő ki egy elültetett virág vagy fa a földből?',
  },
];
