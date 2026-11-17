export type MysteryId =
  | 'allatorvos'
  | 'pek'
  | 'pilota'
  | 'regesz'
  | 'mehesz'
  | 'csillagasz'
  | 'konyvtaros'
  | 'mentoapolo'
  | 'kertesz'
  | 'fotos'
  | 'programozo'
  | 'fazekas';

export interface MysteryItem {
  id: MysteryId;
  profession: string;
  clues: [string, string, string];
  distractors: [string, string, string];
  funFact: string;
}

export const MYSTERY_POOL: MysteryItem[] = [
  {
    id: 'allatorvos',
    profession: 'Állatorvos',
    clues: [
      'A munkám során sokféle élőlénnyel találkozom.',
      'Gyakran kutyákat és macskákat vizsgálok.',
      'Beteg állatokat gyógyítok.',
    ],
    distractors: ['Kertész', 'Pék', 'Pilóta'],
    funFact:
      'Érdekesség: Az állatorvosok nemcsak kutyákat és cicákat gyógyítanak, hanem lovakat, teheneket vagy akár állatkerti állatokat is!',
  },
  {
    id: 'pek',
    profession: 'Pék',
    clues: [
      'Sokszor nagyon korán kezdem a munkát.',
      'Liszttel és tésztával dolgozom.',
      'Kenyeret és péksüteményeket sütök.',
    ],
    distractors: ['Fazekas', 'Könyvtáros', 'Fotós'],
    funFact:
      'Érdekesség: A pékek gyakran már hajnalban begyújtanak a kemencébe, hogy reggelre friss, ropogós kenyér várjon minket!',
  },
  {
    id: 'pilota',
    profession: 'Pilóta',
    clues: [
      'A munkámhoz sok tanulás és gyakorlás szükséges.',
      'Munka közben gyakran a felhők fölött járok.',
      'Repülőgépet vezetek.',
    ],
    distractors: ['Mentőápoló', 'Csillagász', 'Programozó'],
    funFact:
      'Érdekesség: A pilóták a pilótafülkében rengeteg műszert figyelnek egyszerre, hogy az utazás mindig biztonságos legyen.',
  },
  {
    id: 'regesz',
    profession: 'Régész',
    clues: [
      'A múlt titkait kutatom.',
      'Régi tárgyakat keresek és vizsgálok.',
      'Ásatásokon is dolgozhatok.',
    ],
    distractors: ['Könyvtáros', 'Fazekas', 'Fotós'],
    funFact:
      'Érdekesség: A régészek gyakran apró ecsettel tisztogatják meg a föld alól előkerült régi edényeket és érméket.',
  },
  {
    id: 'mehesz',
    profession: 'Méhész',
    clues: [
      'A természetben végzem a munkám egy részét.',
      'Védőruhát és füstölőt is használhatok.',
      'Méheket gondozok, és mézet gyűjtök.',
    ],
    distractors: ['Kertész', 'Állatorvos', 'Pék'],
    funFact:
      'Érdekesség: Egyetlen kiskanál méz összegyűjtéséhez több száz virágot látogatnak meg a szorgos méhek!',
  },
  {
    id: 'csillagasz',
    profession: 'Csillagász',
    clues: [
      'Sokat foglalkozom a világűrrel.',
      'Csillagokat és bolygókat tanulmányozok.',
      'Távcsővel is megfigyelhetem az égitesteket.',
    ],
    distractors: ['Pilóta', 'Programozó', 'Régész'],
    funFact:
      'Érdekesség: A csillagászok éjszaka hatalmas csillagvizsgáló távcsövekkel kémlelik a távoli galaxisokat.',
  },
  {
    id: 'konyvtaros',
    profession: 'Könyvtáros',
    clues: [
      'Sok embernek segítek információt találni.',
      'Könyveket rendszerezek és kölcsönzök.',
      'Könyvtárban dolgozom.',
    ],
    distractors: ['Régész', 'Programozó', 'Fazekas'],
    funFact:
      'Érdekesség: A könyvtárosok különleges jelölések segítségével pillanatok alatt megtalálnak bármilyen könyvet a sok ezer kötet között.',
  },
  {
    id: 'mentoapolo',
    profession: 'Mentőápoló',
    clues: [
      'Gyakran gyors döntéseket kell hoznom.',
      'Beteg vagy sérült embereknek segítek.',
      'Mentőautóval is érkezhetek a helyszínre.',
    ],
    distractors: ['Állatorvos', 'Pilóta', 'Fotós'],
    funFact:
      'Érdekesség: A mentőautóban szinte egy kis mozgó rendelő működik, amelyben minden fontos életmentő eszköz megtalálható.',
  },
  {
    id: 'kertesz',
    profession: 'Kertész',
    clues: [
      'A munkámhoz türelem és gondoskodás kell.',
      'Növényekkel foglalkozom.',
      'Virágokat ültetek, öntözök és metszek.',
    ],
    distractors: ['Méhész', 'Fazekas', 'Régész'],
    funFact:
      'Érdekesség: A kertészek azt is tudják, melyik növény szereti a napsütést, és melyik érzi jól magát az árnyékban.',
  },
  {
    id: 'fotos',
    profession: 'Fotós',
    clues: [
      'Fontos számomra a jó megfigyelőképesség.',
      'Képekkel örökítek meg pillanatokat.',
      'Fényképezőgéppel dolgozom.',
    ],
    distractors: ['Csillagász', 'Programozó', 'Könyvtáros'],
    funFact:
      'Érdekesség: A természetfotósok néha órákon át csendben várakoznak, hogy egy ritka madárról elkészítsék a tökéletes képet.',
  },
  {
    id: 'programozo',
    profession: 'Programozó',
    clues: [
      'Sok problémát logikus gondolkodással oldok meg.',
      'Számítógépes programokat készítek.',
      'Kódot írok, és ellenőrzöm a működését.',
    ],
    distractors: ['Csillagász', 'Könyvtáros', 'Pilóta'],
    funFact:
      'Érdekesség: A kedvenc telefonos játékaidat, rajzfilmkészítő programjaidat és ezt a kalandjátékot is programozók készítették!',
  },
  {
    id: 'fazekas',
    profession: 'Fazekas',
    clues: [
      'Egy régi mesterséget űzök.',
      'Gyakran korongon formázom az anyagot.',
      'Agyagból edényeket készítek.',
    ],
    distractors: ['Pék', 'Régész', 'Kertész'],
    funFact:
      'Érdekesség: A fazekaskorong már több ezer éve segíti a mestereket abban, hogy szép kerek vázákat és kancsókat formázzanak.',
  },
];

// Game 2: Ki mondhatta? (10 sentences, 5 chosen randomly)
export interface SpeechBubbleItem {
  id: string;
  quote: string;
  correctProfession: string;
  distractors: [string, string, string];
  explanation: string;
}

export const SPEECH_BUBBLE_POOL: SpeechBubbleItem[] = [
  {
    id: 'speech-1',
    quote: '„Először megvizsgálom a fogadat, aztán megbeszéljük a kezelést.”',
    correctProfession: 'Fogorvos',
    distractors: ['Könyvtáros', 'Építész', 'Színész'],
    explanation:
      'Helyes! A fogorvos vigyáz a fogaink egészségére, és megvizsgálja, ha fáj valamelyik.',
  },
  {
    id: 'speech-2',
    quote: '„Ma egy gyönyörű menyasszonyi csokrot készítettem.”',
    correctProfession: 'Virágkötő',
    distractors: ['Informatikus', 'Kerékpárszerelő', 'Fogorvos'],
    explanation:
      'Nagyszerű! A virágkötő művészi érzékkel válogatja össze és köti csokorba a friss virágokat.',
  },
  {
    id: 'speech-3',
    quote: '„Ezt a régi festményt óvatosan helyreállítom.”',
    correctProfession: 'Restaurátor',
    distractors: ['Gyümölcstermesztő', 'Színész', 'Fogorvos'],
    explanation:
      'Ügyes vagy! A restaurátor megrongálódott régi képeket, szobrokat és műtárgyakat varázsol újra széppé.',
  },
  {
    id: 'speech-4',
    quote: '„Megtervezem, hol legyenek az új ház szobái.”',
    correctProfession: 'Építész',
    distractors: ['Kerékpárszerelő', 'Virágkötő', 'Múzeumi tárlatvezető'],
    explanation:
      'Pontosan! Az építész rajzolja meg az új épületek, iskolák és lakóházak terveit.',
  },
  {
    id: 'speech-5',
    quote: '„Ma három új könyvet ajánlottam az olvasóknak.”',
    correctProfession: 'Könyvtáros',
    distractors: ['Informatikus', 'Építész', 'Restaurátor'],
    explanation:
      'Így van! A könyvtáros nagyon jól ismeri a könyveket, és szívesen segít olvasnivalót választani.',
  },
  {
    id: 'speech-6',
    quote: '„Ellenőriznem kell, miért nem indul el a számítógép.”',
    correctProfession: 'Informatikus',
    distractors: ['Színész', 'Gyümölcstermesztő', 'Virágkötő'],
    explanation:
      'Telitalálat! Az informatikus ért a számítógépekhez, hálózatokhoz és szoftverekhez.',
  },
  {
    id: 'speech-7',
    quote: '„Ma sok friss almát szedünk le a fákról.”',
    correctProfession: 'Gyümölcstermesztő',
    distractors: ['Fogorvos', 'Múzeumi tárlatvezető', 'Restaurátor'],
    explanation:
      'Remek! A gyümölcstermesztő gondozza a gyümölcsfákat, és szüreteli le az érett termést.',
  },
  {
    id: 'speech-8',
    quote: '„A színpadon egy király szerepét játszom.”',
    correctProfession: 'Színész',
    distractors: ['Építész', 'Könyvtáros', 'Kerékpárszerelő'],
    explanation:
      'Helyes! A színész színházban vagy filmekben bújik különféle izgalmas szereplők bőrébe.',
  },
  {
    id: 'speech-9',
    quote: '„Megjavítom a kerékpár elromlott fékjét.”',
    correctProfession: 'Kerékpárszerelő',
    distractors: ['Virágkötő', 'Informatikus', 'Restaurátor'],
    explanation:
      'Nagyszerű! A kerékpárszerelő megjavítja a fékeket, a láncot és a kerekeket, hogy biztonságosan biciklizhess.',
  },
  {
    id: 'speech-10',
    quote: '„A múzeumban bemutatom a látogatóknak a régi tárgyakat.”',
    correctProfession: 'Múzeumi tárlatvezető',
    distractors: ['Gyümölcstermesztő', 'Fogorvos', 'Színész'],
    explanation:
      'Ügyes vagy! A múzeumi tárlatvezető érdekes történeteket mesél a kiállított kincsekről.',
  },
];

// Game 3: Rejtélyes munkahelyek (8 illustrated workplaces, 5 chosen randomly)
export type WorkplaceId =
  | 'pekseg'
  | 'gyogyszertar'
  | 'autoszerelo_muhely'
  | 'fodraszszalon'
  | 'allatorvosi_rendelo'
  | 'viraguzlet'
  | 'konyvtar'
  | 'fazekasmuhely';

export interface WorkplaceMystery {
  id: WorkplaceId;
  workplaceName: string;
  workplaceDistractors: [string, string, string];
  professionName: string;
  professionDistractors: [string, string, string];
  hintObjectsText: string;
  explanation: string;
}

export const WORKPLACE_MYSTERY_POOL: WorkplaceMystery[] = [
  {
    id: 'pekseg',
    workplaceName: 'Pékség',
    workplaceDistractors: ['Gyógyszertár', 'Könyvtár', 'Fodrászszalon'],
    professionName: 'Pék',
    professionDistractors: ['Gyógyszerész', 'Könyvtáros', 'Autószerelő'],
    hintObjectsText: 'Látható tárgyak: kemence, friss kenyerek, dagasztóasztal.',
    explanation: 'A pékségben a pék süti meg a friss kenyereket és zsemléket.',
  },
  {
    id: 'gyogyszertar',
    workplaceName: 'Gyógyszertár',
    workplaceDistractors: ['Pékség', 'Virágüzlet', 'Autószerelő műhely'],
    professionName: 'Gyógyszerész',
    professionDistractors: ['Pék', 'Virágkötő', 'Fazekas'],
    hintObjectsText: 'Látható tárgyak: gyógyszeres dobozok, polcok, gyógyszertári pult.',
    explanation: 'A gyógyszertárban a gyógyszerész készíti elő és adja ki a gyógyszereket.',
  },
  {
    id: 'autoszerelo_muhely',
    workplaceName: 'Autószerelő műhely',
    workplaceDistractors: ['Fazekasműhely', 'Állatorvosi rendelő', 'Pékség'],
    professionName: 'Autószerelő',
    professionDistractors: ['Fazekas', 'Állatorvos', 'Fodrász'],
    hintObjectsText: 'Látható tárgyak: autóemelő, szerszámok, pótkerék.',
    explanation: 'Az autószerelő műhelyben az autószerelő vizsgálja át és javítja meg az autókat.',
  },
  {
    id: 'fodraszszalon',
    workplaceName: 'Fodrászszalon',
    workplaceDistractors: ['Könyvtár', 'Gyógyszertár', 'Virágüzlet'],
    professionName: 'Fodrász',
    professionDistractors: ['Könyvtáros', 'Gyógyszerész', 'Pék'],
    hintObjectsText: 'Látható tárgyak: nagy tükör, fodrászszék, hajszárító.',
    explanation: 'A fodrászszalonban a fodrász vágja, szárítja és formázza a vendégek haját.',
  },
  {
    id: 'allatorvosi_rendelo',
    workplaceName: 'Állatorvosi rendelő',
    workplaceDistractors: ['Fodrászszalon', 'Autószerelő műhely', 'Könyvtár'],
    professionName: 'Állatorvos',
    professionDistractors: ['Fodrász', 'Autószerelő', 'Virágkötő'],
    hintObjectsText: 'Látható tárgyak: vizsgálóasztal, állathordozó, sztetoszkóp.',
    explanation: 'Az állatorvosi rendelőben az állatorvos gyógyítja a kisállatokat.',
  },
  {
    id: 'viraguzlet',
    workplaceName: 'Virágüzlet',
    workplaceDistractors: ['Pékség', 'Fazekasműhely', 'Gyógyszertár'],
    professionName: 'Virágkötő',
    professionDistractors: ['Pék', 'Fazekas', 'Állatorvos'],
    hintObjectsText: 'Látható tárgyak: virágcsokrok, vázák, színes szalagok.',
    explanation: 'A virágüzletben a virágkötő készíti el a szebbnél szebb csokrokat.',
  },
  {
    id: 'konyvtar',
    workplaceName: 'Könyvtár',
    workplaceDistractors: ['Virágüzlet', 'Állatorvosi rendelő', 'Fodrászszalon'],
    professionName: 'Könyvtáros',
    professionDistractors: ['Virágkötő', 'Állatorvos', 'Gyógyszerész'],
    hintObjectsText: 'Látható tárgyak: könyvespolcok, olvasóasztal, kölcsönzőpult.',
    explanation: 'A könyvtárban a könyvtáros segít a könyvek között eligazodni és kölcsönözni.',
  },
  {
    id: 'fazekasmuhely',
    workplaceName: 'Fazekasműhely',
    workplaceDistractors: ['Autószerelő műhely', 'Pékség', 'Virágüzlet'],
    professionName: 'Fazekas',
    professionDistractors: ['Autószerelő', 'Pék', 'Könyvtáros'],
    hintObjectsText: 'Látható tárgyak: fazekaskorong, agyagedények, égetőkemence.',
    explanation: 'A fazekasműhelyben a fazekas formázza agyagból és égeti ki az edényeket.',
  },
];

export function shuffleItems<T>(items: readonly T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
