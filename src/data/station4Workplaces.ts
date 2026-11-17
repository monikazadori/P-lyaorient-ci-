export type MapWorkplaceId =
  | 'iskola'
  | 'korhaz'
  | 'pekseg'
  | 'tuzoltosag'
  | 'posta'
  | 'etterem'
  | 'autoszerelo_muhely'
  | 'viraguzlet';

export interface MapWorkplaceItem {
  id: MapWorkplaceId;
  buildingName: string;
  workerTitle: string;
  workerPrompt: string;
  successMessage: string;
}

export const MAP_WORKPLACES: MapWorkplaceItem[] = [
  {
    id: 'iskola',
    buildingName: 'Iskola',
    workerTitle: 'Tanító',
    workerPrompt: 'Segíts a tanítónak! Hol van a munkahelye?',
    successMessage: 'Nagyszerű! A tanító az iskolában tanítja és segíti a diákokat.',
  },
  {
    id: 'korhaz',
    buildingName: 'Kórház',
    workerTitle: 'Orvos',
    workerPrompt: 'Segíts az orvosnak! Hol van a munkahelye?',
    successMessage: 'Ügyes vagy! Az orvos a kórházban gyógyítja a betegeket.',
  },
  {
    id: 'pekseg',
    buildingName: 'Pékség',
    workerTitle: 'Pék',
    workerPrompt: 'Segíts a péknek! Hol van a munkahelye?',
    successMessage: 'Remek! A pék a pékségben süt friss kenyeret és kiflit.',
  },
  {
    id: 'tuzoltosag',
    buildingName: 'Tűzoltóság',
    workerTitle: 'Tűzoltó',
    workerPrompt: 'Segíts a tűzoltónak! Hol van a munkahelye?',
    successMessage: 'Telitalálat! A tűzoltó a tűzoltóságról indul a bajbajutottak segítségére.',
  },
  {
    id: 'posta',
    buildingName: 'Posta',
    workerTitle: 'Postás',
    workerPrompt: 'Segíts a postásnak! Hol van a munkahelye?',
    successMessage: 'Pontosan! A postás a postán veszi át a leveleket és csomagokat.',
  },
  {
    id: 'etterem',
    buildingName: 'Étterem',
    workerTitle: 'Szakács',
    workerPrompt: 'Segíts a szakácsnak! Hol van a munkahelye?',
    successMessage: 'Szuper! A szakács az étterem konyhájában főzi a finom fogásokat.',
  },
  {
    id: 'autoszerelo_muhely',
    buildingName: 'Autószerelő műhely',
    workerTitle: 'Autószerelő',
    workerPrompt: 'Segíts az autószerelőnek! Hol van a munkahelye?',
    successMessage: 'Helyes! Az autószerelő az autószerelő műhelyben javítja a járműveket.',
  },
  {
    id: 'viraguzlet',
    buildingName: 'Virágüzlet',
    workerTitle: 'Virágkötő',
    workerPrompt: 'Segíts a virágkötőnek! Hol van a munkahelye?',
    successMessage: 'Csodás! A virágkötő a virágüzletben készíti el a szép csokrokat.',
  },
];

// Game 2: Egy nap a munkahelyen (8 workflows, 5 chosen randomly)
export type WorkflowId =
  | 'pek_kenyer'
  | 'fodrasz_hajvagas'
  | 'kertesz_ultetes'
  | 'postas_level'
  | 'szakacs_leves'
  | 'viragkoto_csokor'
  | 'asztalos_polc'
  | 'kerekpar_defekt';

export interface WorkflowStepItem {
  stepKey: string;
  label: string;
}

export interface WorkflowSequenceItem {
  id: WorkflowId;
  profession: string;
  taskTitle: string;
  steps: [WorkflowStepItem, WorkflowStepItem, WorkflowStepItem, WorkflowStepItem];
  whyOrderMatters: string;
}

export const WORKFLOW_SEQUENCES_POOL: WorkflowSequenceItem[] = [
  {
    id: 'pek_kenyer',
    profession: 'Pék',
    taskTitle: 'Kenyérsütés',
    steps: [
      { stepKey: 'pek_1', label: 'Hozzávalók előkészítése.' },
      { stepKey: 'pek_2', label: 'Tészta dagasztása.' },
      { stepKey: 'pek_3', label: 'Tészta kelesztése.' },
      { stepKey: 'pek_4', label: 'Kenyér megsütése.' },
    ],
    whyOrderMatters:
      'A kenyér csak akkor lesz könnyű és finom, ha a dagasztás után megkel a tészta, és csak ezután kerül a forró sütőbe.',
  },
  {
    id: 'fodrasz_hajvagas',
    profession: 'Fodrász',
    taskTitle: 'Hajvágás',
    steps: [
      { stepKey: 'fodrasz_1', label: 'A vendég kívánságának megbeszélése.' },
      { stepKey: 'fodrasz_2', label: 'A haj előkészítése.' },
      { stepKey: 'fodrasz_3', label: 'Hajvágás.' },
      { stepKey: 'fodrasz_4', label: 'A frizura ellenőrzése.' },
    ],
    whyOrderMatters:
      'Először mindig meg kell tudni, milyen frizurát szeretne a vendég, majd az előkészített haj levágása után ellenőrizni kell az eredményt.',
  },
  {
    id: 'kertesz_ultetes',
    profession: 'Kertész',
    taskTitle: 'Virágültetés',
    steps: [
      { stepKey: 'kertesz_1', label: 'Ültetési hely előkészítése.' },
      { stepKey: 'kertesz_2', label: 'Ültetőgödör készítése.' },
      { stepKey: 'kertesz_3', label: 'Virág elültetése.' },
      { stepKey: 'kertesz_4', label: 'Virág megöntözése.' },
    ],
    whyOrderMatters:
      'A növény csak a jól előkészített talajban és ültetőgödörben tud meggyökeresedni, majd az öntözés adja meg neki a szükséges vizet.',
  },
  {
    id: 'postas_level',
    profession: 'Postás',
    taskTitle: 'Levelek kézbesítése',
    steps: [
      { stepKey: 'postas_1', label: 'Levelek átvétele.' },
      { stepKey: 'postas_2', label: 'Levelek rendezése.' },
      { stepKey: 'postas_3', label: 'Kézbesítési útvonal megtervezése.' },
      { stepKey: 'postas_4', label: 'Levelek kézbesítése.' },
    ],
    whyOrderMatters:
      'Ha a postás utcák szerint rendezi a leveleket és megtervezi az útvonalát, gyorsan és pontosan jut el minden házhoz.',
  },
  {
    id: 'szakacs_leves',
    profession: 'Szakács',
    taskTitle: 'Levesfőzés',
    steps: [
      { stepKey: 'szakacs_1', label: 'Hozzávalók előkészítése.' },
      { stepKey: 'szakacs_2', label: 'Zöldségek megtisztítása és feldarabolása.' },
      { stepKey: 'szakacs_3', label: 'Leves megfőzése.' },
      { stepKey: 'szakacs_4', label: 'Elkészült étel tálalása.' },
    ],
    whyOrderMatters:
      'A zöldségeket meg kell tisztítani és fel kell vágni, mielőtt megfőzzük a levest, a tálalás pedig mindig az utolsó lépés.',
  },
  {
    id: 'viragkoto_csokor',
    profession: 'Virágkötő',
    taskTitle: 'Csokorkészítés',
    steps: [
      { stepKey: 'virag_1', label: 'Virágok kiválasztása.' },
      { stepKey: 'virag_2', label: 'Virágok előkészítése.' },
      { stepKey: 'virag_3', label: 'Csokor összeállítása.' },
      { stepKey: 'virag_4', label: 'Csokor becsomagolása.' },
    ],
    whyOrderMatters:
      'Először összeválogatjuk és megtisztítjuk a szárakat, majd megkötjük a csokrot, végül díszpapírba csomagoljuk.',
  },
  {
    id: 'asztalos_polc',
    profession: 'Asztalos',
    taskTitle: 'Egyszerű fapolc készítése',
    steps: [
      { stepKey: 'asztalos_1', label: 'Méretek megtervezése.' },
      { stepKey: 'asztalos_2', label: 'Faanyag méretre vágása.' },
      { stepKey: 'asztalos_3', label: 'Felületek csiszolása.' },
      { stepKey: 'asztalos_4', label: 'Polc összeállítása.' },
    ],
    whyOrderMatters:
      'Ha előre pontosan megtervezzük a méreteket és simára csiszoljuk a levágott deszkákat, a polc stabil és szép lesz.',
  },
  {
    id: 'kerekpar_defekt',
    profession: 'Kerékpárszerelő',
    taskTitle: 'Defektjavítás',
    steps: [
      { stepKey: 'kerekpar_1', label: 'Hiba megkeresése.' },
      { stepKey: 'kerekpar_2', label: 'Kerék vagy gumi szükséges szétszerelése.' },
      { stepKey: 'kerekpar_3', label: 'Sérült belső javítása vagy cseréje.' },
      { stepKey: 'kerekpar_4', label: 'Kerék összeszerelése és ellenőrzése.' },
    ],
    whyOrderMatters:
      'Csak a hiba megtalálása és a gumi leszedése után lehet megjavítani a belsőt, végül pedig ellenőrizni kell, hogy tartja-e a levegőt.',
  },
];

// Game 3: Segítségre van szükség! (10 citizen problems, 6 chosen randomly)
export type CitizenProblemId =
  | 'level_feladas'
  | 'szemuveg_javitas'
  | 'uj_frizura'
  | 'auto_fek'
  | 'viragcsokor'
  | 'mesekonyv'
  | 'kenyer_vasarlas'
  | 'vizcsap_hiba'
  | 'kerekpar_fek'
  | 'kutya_vizsgalat';

export interface CitizenProblemItem {
  id: CitizenProblemId;
  speech: string;
  correctProfession: string;
  professionDistractors: [string, string, string];
  professionExplanation: string;
  correctServiceOrPlace: string;
  serviceOrPlaceDistractors: [string, string, string];
  serviceExplanation: string;
}

export const CITIZEN_PROBLEMS_POOL: CitizenProblemItem[] = [
  {
    id: 'level_feladas',
    speech: '„Szeretnék feladni egy levelet.”',
    correctProfession: 'Postai ügyintéző',
    professionDistractors: ['Könyvtáros', 'Látszerész', 'Autószerelő'],
    professionExplanation:
      'A postai ügyintéző leméri a levelet, bélyeget tesz rá, és elindítja a címzetthez.',
    correctServiceOrPlace: 'Posta',
    serviceOrPlaceDistractors: ['Könyvtár', 'Pékség', 'Virágüzlet'],
    serviceExplanation:
      'A postán adhatjuk fel a leveleket és a csomagokat belföldre és külföldre is.',
  },
  {
    id: 'szemuveg_javitas',
    speech: '„Eltört a szemüvegem kerete.”',
    correctProfession: 'Látszerész',
    professionDistractors: ['Vízvezeték-szerelő', 'Fodrász', 'Pékségi eladó'],
    professionExplanation:
      'A látszerész a szemüvegek készítésének és javításának szakértője.',
    correctServiceOrPlace: 'Optikai szaküzlet',
    serviceOrPlaceDistractors: ['Autószerelő műhely', 'Posta', 'Állatorvosi rendelő'],
    serviceExplanation:
      'Az optikai szaküzletben meg tudják javítani vagy ki tudják cserélni a szemüveg keretét.',
  },
  {
    id: 'uj_frizura',
    speech: '„Új frizurát szeretnék.”',
    correctProfession: 'Fodrász',
    professionDistractors: ['Virágkötő', 'Kerékpárszerelő', 'Állatorvos'],
    professionExplanation:
      'A fodrász vágja, formázza és ápolja a vendégek haját.',
    correctServiceOrPlace: 'Fodrászszalon',
    serviceOrPlaceDistractors: ['Optikai szaküzlet', 'Könyvtár', 'Pékség'],
    serviceExplanation:
      'A fodrászszalonban minden szükséges eszköz megtalálható a szép frizurákhoz.',
  },
  {
    id: 'auto_fek',
    speech: '„Meg kell javítani az autóm fékjét.”',
    correctProfession: 'Autószerelő',
    professionDistractors: ['Látszerész', 'Postai ügyintéző', 'Könyvtáros'],
    professionExplanation:
      'Az autószerelő ellenőrzi és megjavítja az autók fékjét és motorját.',
    correctServiceOrPlace: 'Autószerelő műhely',
    serviceOrPlaceDistractors: ['Kerékpárszerviz', 'Virágüzlet', 'Posta'],
    serviceExplanation:
      'Az autószerelő műhelyben van autóemelő és minden szerszám az autó javításához.',
  },
  {
    id: 'viragcsokor',
    speech: '„Születésnapra virágcsokrot szeretnék.”',
    correctProfession: 'Virágkötő',
    professionDistractors: ['Pékségi eladó', 'Vízvezeték-szerelő', 'Autószerelő'],
    professionExplanation:
      'A virágkötő válogatja össze a friss virágokat, és díszes csokrot köt belőlük.',
    correctServiceOrPlace: 'Virágüzlet',
    serviceOrPlaceDistractors: ['Fodrászszalon', 'Könyvtár', 'Optikai szaküzlet'],
    serviceExplanation:
      'A virágüzletben sokféle friss virág és díszítőszalag várja a vásárlókat.',
  },
  {
    id: 'mesekonyv',
    speech: '„Szeretnék kölcsönözni egy mesekönyvet.”',
    correctProfession: 'Könyvtáros',
    professionDistractors: ['Postai ügyintéző', 'Kerékpárszerelő', 'Fodrász'],
    professionExplanation:
      'A könyvtáros segít megtalálni a megfelelő mesekönyvet, és feljegyzi a kölcsönzést.',
    correctServiceOrPlace: 'Könyvtár',
    serviceOrPlaceDistractors: ['Pékség', 'Posta', 'Virágüzlet'],
    serviceExplanation:
      'A könyvtárból sok izgalmas mesekönyvet és ismeretterjesztő könyvet kölcsönözhetünk.',
  },
  {
    id: 'kenyer_vasarlas',
    speech: '„Kenyeret szeretnék vásárolni.”',
    correctProfession: 'Pékségi eladó',
    professionDistractors: ['Állatorvos', 'Látszerész', 'Vízvezeték-szerelő'],
    professionExplanation:
      'A pékségi eladó segít kiválasztani és becsomagolni a friss kenyereket.',
    correctServiceOrPlace: 'Pékség',
    serviceOrPlaceDistractors: ['Állatorvosi rendelő', 'Fodrászszalon', 'Könyvtár'],
    serviceExplanation:
      'A pékségben kaphatók a frissen sült kenyerek, kiflik és zsömlék.',
  },
  {
    id: 'vizcsap_hiba',
    speech: '„Elromlott a lakás vízcsapja.”',
    correctProfession: 'Vízvezeték-szerelő',
    professionDistractors: ['Virágkötő', 'Könyvtáros', 'Pékségi eladó'],
    professionExplanation:
      'A vízvezeték-szerelő ért a vízcsövekhez, csapokhoz és lefolyókhoz.',
    correctServiceOrPlace: 'Helyszíni javítás',
    serviceOrPlaceDistractors: ['Virágüzlet', 'Optikai szaküzlet', 'Könyvtár'],
    serviceExplanation:
      'A lakásba beépített csapot nem lehet elvinni a műhelybe, ezért helyszíni javításra van szükség.',
  },
  {
    id: 'kerekpar_fek',
    speech: '„Meg kell javítani a kerékpárom fékjét.”',
    correctProfession: 'Kerékpárszerelő',
    professionDistractors: ['Postai ügyintéző', 'Fodrász', 'Látszerész'],
    professionExplanation:
      'A kerékpárszerelő beállítja a féket, hogy újra biztonságosan lehessen megállni a biciklivel.',
    correctServiceOrPlace: 'Kerékpárszerviz',
    serviceOrPlaceDistractors: ['Autószerelő műhely', 'Posta', 'Pékség'],
    serviceExplanation:
      'A kerékpárszervizben kifejezetten biciklik javításával és karbantartásával foglalkoznak.',
  },
  {
    id: 'kutya_vizsgalat',
    speech: '„A kutyámat szeretném megvizsgáltatni.”',
    correctProfession: 'Állatorvos',
    professionDistractors: ['Autószerelő', 'Virágkötő', 'Kerékpárszerelő'],
    professionExplanation:
      'Az állatorvos vizsgálja meg és gyógyítja meg a kutyákat, macskákat és más állatokat.',
    correctServiceOrPlace: 'Állatorvosi rendelő',
    serviceOrPlaceDistractors: ['Fodrászszalon', 'Optikai szaküzlet', 'Posta'],
    serviceExplanation:
      'Az állatorvosi rendelőben minden vizsgálati eszköz rendelkezésre áll a kisállatok számára.',
  },
];

export function shuffleCollection<T>(items: readonly T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
