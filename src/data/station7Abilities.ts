export type AbilityPairId =
  | 'tuzolto'
  | 'oras'
  | 'tanito'
  | 'festomuvesz'
  | 'orvos'
  | 'epitomunkas';

export interface AbilityPairItem {
  id: AbilityPairId;
  professionTitle: string;
  abilityTitle: string;
  explanation: string;
}

export const ABILITY_PAIRS: AbilityPairItem[] = [
  {
    id: 'tuzolto',
    professionTitle: 'Tűzoltó',
    abilityTitle: 'Bátorság',
    explanation:
      'A tűzoltónak sok bátorságra van szüksége a mentéshez, miközben a csapatmunka és a gyors figyelem is segíti a munkáját.',
  },
  {
    id: 'oras',
    professionTitle: 'Órás',
    abilityTitle: 'Pontosság',
    explanation:
      'Az órás apró fogaskerekekkel és rugókkal dolgozik, ezért a pontosság és a nyugodt türelem elengedhetetlen számára.',
  },
  {
    id: 'tanito',
    professionTitle: 'Tanító',
    abilityTitle: 'Türelem',
    explanation:
      'A tanító türelmesen segíti a diákokat az új ismeretek megértésében, emellett kedvességre és kreativitásra is szüksége van.',
  },
  {
    id: 'festomuvesz',
    professionTitle: 'Festőművész',
    abilityTitle: 'Kreativitás',
    explanation:
      'A festőművész kreativitással álmodja meg a képeit és színkombinációit, de a figyelmes megfigyelés is sokat segít neki.',
  },
  {
    id: 'orvos',
    professionTitle: 'Orvos',
    abilityTitle: 'Figyelmesség',
    explanation:
      'Az orvos figyelmesen meghallgatja a betegek panaszait és minden apró jelet észrevesz, miközben kedvesen és pontosan dolgozik.',
  },
  {
    id: 'epitomunkas',
    professionTitle: 'Csapattagként dolgozó építőmunkás',
    abilityTitle: 'Együttműködés',
    explanation:
      'Egy építkezésen sok szakember dolgozik egyszerre, ezért a jó együttműködés és a figyelmesség teszi biztonságossá a közös munkát.',
  },
];

export type DecisionSceneId =
  | 'orvos_gyermek'
  | 'epitomunkas_veszely'
  | 'tanito_segit'
  | 'kertesz_hervadas'
  | 'szakacs_ujraproba';

export interface DecisionOption {
  letter: 'A' | 'B' | 'C';
  text: string;
}

export interface DecisionSituationItem {
  id: DecisionSceneId;
  situation: string;
  options: [DecisionOption, DecisionOption, DecisionOption];
  correctLetter: 'A' | 'B' | 'C';
  highlightedAbility: string;
  positiveExplanation: string;
  retryHint: string;
}

export const DECISION_SITUATIONS: DecisionSituationItem[] = [
  {
    id: 'orvos_gyermek',
    situation:
      'Egy kisgyermek fél az orvosi vizsgálattól. Mit tegyen az orvos?',
    options: [
      { letter: 'A', text: 'Kedvesen elmagyarázza, mi fog történni.' },
      { letter: 'B', text: 'Nem figyel a gyermekre.' },
      { letter: 'C', text: 'Rászól, hogy ne féljen.' },
    ],
    correctLetter: 'A',
    highlightedAbility: 'Empátia és kedves figyelmesség',
    positiveExplanation:
      'Ha az orvos megértő és türelmes, a kisgyermek megnyugszik, és biztonságban érzi magát a vizsgálat közben.',
    retryHint:
      'Gondold át, milyen viselkedés segít megnyugtatni egy megijedt kisgyermeket!',
  },
  {
    id: 'epitomunkas_veszely',
    situation: 'Egy építőmunkás veszélyes helyzetet vesz észre.',
    options: [
      { letter: 'A', text: 'Nem törődik vele.' },
      {
        letter: 'B',
        text: 'Figyelmezteti a többieket, és jelzi a felelős vezetőnek.',
      },
      { letter: 'C', text: 'Tovább dolgozik.' },
    ],
    correctLetter: 'B',
    highlightedAbility: 'Felelősségtudat és együttműködés',
    positiveExplanation:
      'Az azonnali figyelmeztetéssel megóvja a társai biztonságát, és közösen gyorsan el tudják hárítani a veszélyt.',
    retryHint:
      'Mi a legbiztonságosabb lépés, ha mások testi épsége is veszélybe kerülhet?',
  },
  {
    id: 'tanito_segit',
    situation: 'A tanító észreveszi, hogy egy tanuló nem érti a feladatot.',
    options: [
      { letter: 'A', text: 'Segít neki, és másképpen is elmagyarázza.' },
      { letter: 'B', text: 'Nem foglalkozik vele.' },
      { letter: 'C', text: 'Kineveti.' },
    ],
    correctLetter: 'A',
    highlightedAbility: 'Türelem és segítőkészség',
    positiveExplanation:
      'Mindenki más tempóban és módon tanul. Egy új magyarázat vagy közös példa segít abban, hogy sikerélménye legyen a tanulónak.',
    retryHint:
      'Hogyan tudja egy jó tanító bátorítani és támogatni azt, aki elakadt?',
  },
  {
    id: 'kertesz_hervadas',
    situation: 'Egy kertész növényei hervadni kezdenek.',
    options: [
      { letter: 'A', text: 'Otthagyja őket.' },
      {
        letter: 'B',
        text: 'Megvizsgálja, mire van szükségük, és gondoskodik róluk.',
      },
      { letter: 'C', text: 'Kidobja az összes növényt.' },
    ],
    correctLetter: 'B',
    highlightedAbility: 'Figyelmesség és gondoskodás',
    positiveExplanation:
      'A kertész megfigyeli, hogy vízre, fényre vagy tápanyagra van-e szüksége a növényeknek, így megmentheti őket.',
    retryHint:
      'Mit tesz a gondos kertész, ha látja, hogy a növények bajban vannak?',
  },
  {
    id: 'szakacs_ujraproba',
    situation: 'Egy szakács új ételt készít, de valami nem sikerül.',
    options: [
      { letter: 'A', text: 'Feladja.' },
      { letter: 'B', text: 'Mérges lesz a társaira.' },
      { letter: 'C', text: 'Megkeresi a hibát, és újra megpróbálja.' },
    ],
    correctLetter: 'C',
    highlightedAbility: 'Kitartás és problémamegoldás',
    positiveExplanation:
      'A hibákból tanulunk a legtöbbet! Ha megkeressük az okát és bátran újra próbálkozunk, egyre ügyesebbek leszünk.',
    retryHint:
      'Mi segít leginkább akkor, ha egy új recept elsőre nem pont úgy sikerül, ahogy terveztük?',
  },
];

export type SuperpowerId =
  | 'segitokesz'
  | 'alkoto'
  | 'rejtveny'
  | 'csapat'
  | 'turelmes'
  | 'mozgas'
  | 'figyelmes'
  | 'tanulas';

export interface SuperpowerItem {
  id: SuperpowerId;
  label: string;
  shortTitle: string;
  exampleProfessions: string[];
  encouragementNote: string;
}

export const SUPERPOWERS_BANK: SuperpowerItem[] = [
  {
    id: 'segitokesz',
    label: 'Segítőkész vagyok.',
    shortTitle: 'Segítőkészség',
    exampleProfessions: ['Orvos', 'Ápoló', 'Tanító', 'Állatorvos'],
    encouragementNote: 'A másokra való odafigyelés minden közösséget jobbá tesz.',
  },
  {
    id: 'alkoto',
    label: 'Szeretek alkotni.',
    shortTitle: 'Alkotókedv és kreativitás',
    exampleProfessions: ['Festőművész', 'Fazekas', 'Virágkötő', 'Asztalos'],
    encouragementNote: 'Az ötleteiddel szép és hasznos dolgokat hozhatsz létre.',
  },
  {
    id: 'rejtveny',
    label: 'Ügyesen oldok meg rejtvényeket.',
    shortTitle: 'Logikus problémamegoldás',
    exampleProfessions: ['Programozó', 'Mérnök', 'Autószerelő', 'Órás'],
    encouragementNote: 'A kíváncsi gondolkodás segít megtalálni a legjobb megoldásokat.',
  },
  {
    id: 'csapat',
    label: 'Szeretek másokkal együtt dolgozni.',
    shortTitle: 'Csapatmunka és együttműködés',
    exampleProfessions: ['Tűzoltó', 'Építőmunkás', 'Szakács', 'Zenész'],
    encouragementNote: 'Egy jó csapatban egymást támogatva nagy dolgokra vagytok képesek.',
  },
  {
    id: 'turelmes',
    label: 'Türelmes vagyok.',
    shortTitle: 'Türelem és nyugalom',
    exampleProfessions: ['Kertész', 'Tanító', 'Méhész', 'Könyvtáros'],
    encouragementNote: 'A kitartó türelemmel még az apró, gondos feladatok is jól sikerülnek.',
  },
  {
    id: 'mozgas',
    label: 'Szeretek mozogni.',
    shortTitle: 'Aktivitás és ügyesség',
    exampleProfessions: ['Sportedző', 'Postás', 'Tűzoltó', 'Kertész'],
    encouragementNote: 'A lendületed és mozgékonyságod sok mozgalmas munkában nagy előny.',
  },
  {
    id: 'figyelmes',
    label: 'Figyelmes vagyok.',
    shortTitle: 'Éber figyelem',
    exampleProfessions: ['Orvos', 'Órás', 'Látszerész', 'Pék'],
    encouragementNote: 'Észreveszed azokat a fontos részleteket is, amik másoknak fel sem tűnnek.',
  },
  {
    id: 'tanulas',
    label: 'Szívesen tanulok új dolgokat.',
    shortTitle: 'Kíváncsiság és tanulási kedv',
    exampleProfessions: ['Kutató', 'Programozó', 'Újságíró', 'Könyvtáros'],
    encouragementNote: 'A nyitottságod miatt bármilyen új területen gyorsan fejlődhetsz.',
  },
];

export function shuffleList<T>(items: readonly T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
