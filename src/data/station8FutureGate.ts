export type FinalQuizArtId =
  | 'miller'
  | 'mason'
  | 'bakery'
  | 'watchmaker'
  | 'firefighter'
  | 'potter'
  | 'vet'
  | 'skills';

export interface FinalQuizQuestion {
  id: number;
  artId: FinalQuizArtId;
  question: string;
  options: {
    key: string;
    label: string;
    text: string;
  }[];
  correctKey: string;
  explanation: string;
  retryHint: string;
}

export const FINAL_QUIZ_QUESTIONS: FinalQuizQuestion[] = [
  {
    id: 1,
    artId: 'miller',
    question: 'Melyik régi mester őrölte lisztté a gabonát?',
    options: [
      { key: 'A', label: 'A', text: 'Kovács' },
      { key: 'B', label: 'B', text: 'Molnár' },
      { key: 'C', label: 'C', text: 'Fazekas' },
    ],
    correctKey: 'B',
    explanation: 'Így van! A molnár a malomban őrölte meg a búzát, hogy finom liszt legyen belőle.',
    retryHint: 'Gondolj a régi vízimalomra vagy szélmalomra! Melyik mester dolgozott ott a gabonával?',
  },
  {
    id: 2,
    artId: 'mason',
    question: 'Melyik eszközt használja a kőműves?',
    options: [
      { key: 'A', label: 'A', text: 'Kőműveskanál' },
      { key: 'B', label: 'B', text: 'Sztetoszkóp' },
      { key: 'C', label: 'C', text: 'Olló' },
    ],
    correctKey: 'A',
    explanation: 'Ügyes vagy! A kőműveskanállal keni fel a habarcsot a téglák közé.',
    retryHint: 'Melyik szerszám neve árulja el, hogy falazáshoz és téglarakáshoz használják?',
  },
  {
    id: 3,
    artId: 'bakery',
    question: 'Hol dolgozik általában a pék?',
    options: [
      { key: 'A', label: 'A', text: 'Gyógyszertárban' },
      { key: 'B', label: 'B', text: 'Autószerelő műhelyben' },
      { key: 'C', label: 'C', text: 'Pékségben' },
    ],
    correctKey: 'C',
    explanation: 'Pontosan! A pék a pékség kemencéjében süti a friss kenyeret és kiflit.',
    retryHint: 'Honnan száll reggelente a friss kenyér és kalács illata?',
  },
  {
    id: 4,
    artId: 'watchmaker',
    question: 'Melyik képesség különösen fontos egy órás munkájához?',
    options: [
      { key: 'A', label: 'A', text: 'Pontosság' },
      { key: 'B', label: 'B', text: 'Gyors futás' },
      { key: 'C', label: 'C', text: 'Hangos beszéd' },
    ],
    correctKey: 'A',
    explanation: 'Nagyszerű! Az apró fogaskerekek összeillesztéséhez nagy pontosságra és türelemre van szükség.',
    retryHint: 'Egy zsebóra belsejében apró, finom alkatrészek vannak. Mi kell ahhoz, hogy ezek a helyükre kerüljenek?',
  },
  {
    id: 5,
    artId: 'firefighter',
    question: 'Igaz vagy hamis? A tűzoltók tüzet oltanak, és más veszélyhelyzetekben is segítenek.',
    options: [
      { key: 'A', label: 'Igaz', text: 'Igaz' },
      { key: 'B', label: 'Hamis', text: 'Hamis' },
    ],
    correctKey: 'A',
    explanation: 'Igaz bizony! A tűzoltók viharban, baleseteknél és bajba jutott állatok mentésénél is segítenek.',
    retryHint: 'Gondolj arra, kit hívunk akkor is, ha vihar döntött ki egy fát vagy valaki bajba jutott!',
  },
  {
    id: 6,
    artId: 'potter',
    question: 'Melyik foglalkozás készít agyagedényeket?',
    options: [
      { key: 'A', label: 'A', text: 'Takács' },
      { key: 'B', label: 'B', text: 'Fazekas' },
      { key: 'C', label: 'C', text: 'Kádár' },
    ],
    correctKey: 'B',
    explanation: 'Remek válasz! A fazekas korongon formázza az agyagból a kancsókat és tálakat.',
    retryHint: 'A takács sző, a kádár fahordót készít. Melyik mester dolgozik agyaggal?',
  },
  {
    id: 7,
    artId: 'vet',
    question: 'Ki segíthet egy beteg állatnak?',
    options: [
      { key: 'A', label: 'A', text: 'Állatorvos' },
      { key: 'B', label: 'B', text: 'Postás' },
      { key: 'C', label: 'C', text: 'Szabó' },
    ],
    correctKey: 'A',
    explanation: 'Talált! Az állatorvos vizsgálja meg és gyógyítja meg a beteg kiskedvenceket és haszonállatokat.',
    retryHint: 'Ki ért az állatok gyógyításához és ápolásához?',
  },
  {
    id: 8,
    artId: 'skills',
    question: 'Melyik állítás igaz?',
    options: [
      {
        key: 'A',
        label: 'A',
        text: 'Minden munkához pontosan ugyanazok a képességek kellenek.',
      },
      {
        key: 'B',
        label: 'B',
        text: 'A képességeink gyakorlással fejlődhetnek.',
      },
      {
        key: 'C',
        label: 'C',
        text: 'Csak egyetlen foglalkozásban lehetünk ügyesek.',
      },
    ],
    correctKey: 'B',
    explanation: 'Így van! Mindenkiben sokféle tehetség rejtőzik, és szorgalmas gyakorlással egyre ügyesebbek lehetünk.',
    retryHint: 'Emlékezz arra, mit tanultunk a Képességek Kertjében! Tudunk fejlődni tanulással és gyakorlással?',
  },
];

export type DreamProfessionId =
  | 'tanito'
  | 'orvos'
  | 'allatorvos'
  | 'tuzolto'
  | 'rendor'
  | 'pek'
  | 'szakacs'
  | 'kertesz'
  | 'programozo'
  | 'festomuvesz'
  | 'autoszerelo'
  | 'pilota';

export interface DreamProfessionOption {
  id: DreamProfessionId;
  title: string;
  accentBg: string;
  accentBorder: string;
}

export const DREAM_PROFESSIONS: DreamProfessionOption[] = [
  { id: 'tanito', title: 'Tanító', accentBg: 'bg-sky-50', accentBorder: 'border-sky-200' },
  { id: 'orvos', title: 'Orvos', accentBg: 'bg-rose-50', accentBorder: 'border-rose-200' },
  { id: 'allatorvos', title: 'Állatorvos', accentBg: 'bg-emerald-50', accentBorder: 'border-emerald-200' },
  { id: 'tuzolto', title: 'Tűzoltó', accentBg: 'bg-orange-50', accentBorder: 'border-orange-200' },
  { id: 'rendor', title: 'Rendőr', accentBg: 'bg-indigo-50', accentBorder: 'border-indigo-200' },
  { id: 'pek', title: 'Pék', accentBg: 'bg-amber-50', accentBorder: 'border-amber-200' },
  { id: 'szakacs', title: 'Szakács', accentBg: 'bg-yellow-50', accentBorder: 'border-yellow-200' },
  { id: 'kertesz', title: 'Kertész', accentBg: 'bg-lime-50', accentBorder: 'border-lime-200' },
  { id: 'programozo', title: 'Programozó', accentBg: 'bg-violet-50', accentBorder: 'border-violet-200' },
  { id: 'festomuvesz', title: 'Festőművész', accentBg: 'bg-pink-50', accentBorder: 'border-pink-200' },
  { id: 'autoszerelo', title: 'Autószerelő', accentBg: 'bg-slate-100', accentBorder: 'border-slate-300' },
  { id: 'pilota', title: 'Pilóta', accentBg: 'bg-cyan-50', accentBorder: 'border-cyan-200' },
];

export const DREAM_REASONS: string[] = [
  'Szeretek másoknak segíteni.',
  'Szeretek alkotni és készíteni valamit.',
  'Érdekelnek az állatok és a természet.',
  'Szeretem a gépeket és a technikát.',
  'Szeretek új dolgokat felfedezni.',
  'Szeretek emberekkel foglalkozni.',
  'Egyszerűen érdekesnek találom.',
];
