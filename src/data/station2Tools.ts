export type ToolId =
  | 'sztetoszkop'
  | 'fozoedeny'
  | 'komuveskanal'
  | 'tuzolototomlo'
  | 'ontozokanna'
  | 'tabla'
  | 'ollo_es_fesu'
  | 'festohenger'
  | 'homero'
  | 'vernyomasmero'
  | 'metszoollo'
  | 'gereblye'
  | 'fesu'
  | 'hajvago_ollo'
  | 'hajszarito'
  | 'fakanal'
  | 'serpenyo'
  | 'habvero'
  | 'vedosisak'
  | 'tuzoltokeszulek'
  | 'vizmertek'
  | 'simito'
  | 'ecset'
  | 'festekesvodor'
  | 'furesz'
  | 'gyalu'
  | 'csiszolopapir'
  | 'sodrofa'
  | 'peklapat'
  | 'dagasztogep'
  | 'csavarkulcs'
  | 'varrogep'
  | 'meroszalag'
  | 'gombostuparna';

export interface ToolInfo {
  id: ToolId;
  name: string;
}

export const TOOLS_BY_ID: Record<ToolId, ToolInfo> = {
  sztetoszkop: { id: 'sztetoszkop', name: 'Sztetoszkóp' },
  fozoedeny: { id: 'fozoedeny', name: 'Főzőedény' },
  komuveskanal: { id: 'komuveskanal', name: 'Kőműveskanál' },
  tuzolototomlo: { id: 'tuzolototomlo', name: 'Tűzoltótömlő' },
  ontozokanna: { id: 'ontozokanna', name: 'Öntözőkanna' },
  tabla: { id: 'tabla', name: 'Tábla' },
  ollo_es_fesu: { id: 'ollo_es_fesu', name: 'Olló és fésű' },
  festohenger: { id: 'festohenger', name: 'Festőhenger' },
  homero: { id: 'homero', name: 'Hőmérő' },
  vernyomasmero: { id: 'vernyomasmero', name: 'Vérnyomásmérő' },
  metszoollo: { id: 'metszoollo', name: 'Metszőolló' },
  gereblye: { id: 'gereblye', name: 'Gereblye' },
  fesu: { id: 'fesu', name: 'Fésű' },
  hajvago_ollo: { id: 'hajvago_ollo', name: 'Hajvágó olló' },
  hajszarito: { id: 'hajszarito', name: 'Hajszárító' },
  fakanal: { id: 'fakanal', name: 'Fakanál' },
  serpenyo: { id: 'serpenyo', name: 'Serpenyő' },
  habvero: { id: 'habvero', name: 'Habverő' },
  vedosisak: { id: 'vedosisak', name: 'Védősisak' },
  tuzoltokeszulek: { id: 'tuzoltokeszulek', name: 'Tűzoltókészülék' },
  vizmertek: { id: 'vizmertek', name: 'Vízmérték' },
  simito: { id: 'simito', name: 'Simító' },
  ecset: { id: 'ecset', name: 'Ecset' },
  festekesvodor: { id: 'festekesvodor', name: 'Festékesvödör' },
  furesz: { id: 'furesz', name: 'Fűrész' },
  gyalu: { id: 'gyalu', name: 'Gyalu' },
  csiszolopapir: { id: 'csiszolopapir', name: 'Csiszolópapír' },
  sodrofa: { id: 'sodrofa', name: 'Sodrófa' },
  peklapat: { id: 'peklapat', name: 'Péklapát' },
  dagasztogep: { id: 'dagasztogep', name: 'Dagasztógép' },
  csavarkulcs: { id: 'csavarkulcs', name: 'Csavarkulcs' },
  varrogep: { id: 'varrogep', name: 'Varrógép' },
  meroszalag: { id: 'meroszalag', name: 'Mérőszalag' },
  gombostuparna: { id: 'gombostuparna', name: 'Gombostűpárna' },
};

// Game 1: Szerszámvadászat (8 exact profession-tool pairs)
export interface ToolHuntPair {
  id: string;
  profession: string;
  toolId: ToolId;
  praiseNote: string;
}

export const TOOL_HUNT_PAIRS: ToolHuntPair[] = [
  {
    id: 'orvos',
    profession: 'Orvos',
    toolId: 'sztetoszkóp' as unknown as ToolId, // normalized below
    praiseNote: 'Az orvos a sztetoszkóppal hallgatja meg a szívverést és a légzést.',
  },
  {
    id: 'szakacs',
    profession: 'Szakács',
    toolId: 'fozoedeny',
    praiseNote: 'A szakács a főzőedényben készíti el a finom leveseket és ételeket.',
  },
  {
    id: 'epitomunkas',
    profession: 'Építőmunkás',
    toolId: 'komuveskanal',
    praiseNote: 'Az építőmunkás a kőműveskanállal teszi a habarcsot a téglák közé.',
  },
  {
    id: 'tuzolto',
    profession: 'Tűzoltó',
    toolId: 'tuzolototomlo',
    praiseNote: 'A tűzoltó a tűzoltótömlő segítségével oltja el a tüzet.',
  },
  {
    id: 'kertesz',
    profession: 'Kertész',
    toolId: 'ontozokanna',
    praiseNote: 'A kertész az öntözőkannából ad friss vizet a növényeknek.',
  },
  {
    id: 'tanito',
    profession: 'Tanító',
    toolId: 'tabla',
    praiseNote: 'A tanító a táblára írva és rajzolva segíti a tanulást az osztályban.',
  },
  {
    id: 'fodrasz',
    profession: 'Fodrász',
    toolId: 'ollo_es_fesu',
    praiseNote: 'A fodrász az olló és a fésű segítségével vág szép frizurát.',
  },
  {
    id: 'festo_mazolo',
    profession: 'Festő-mázoló',
    toolId: 'festohenger',
    praiseNote: 'A festő-mázoló a festőhengerrel festi egyenletesre a szoba falát.',
  },
];

// Fix exact ToolId for Orvos pair cleanly
TOOL_HUNT_PAIRS[0].toolId = 'sztetoszkop';

// Game 2: Keresd a kakukktojást! (10 predefined sets, 5 selected randomly)
export interface OddOneOutQuestion {
  id: string;
  profession: string;
  tools: [ToolId, ToolId, ToolId, ToolId];
  oddToolId: ToolId;
  explanation: string;
}

export const ODD_ONE_OUT_POOL: OddOneOutQuestion[] = [
  {
    id: 'odd-orvos',
    profession: 'Orvos',
    tools: ['sztetoszkop', 'homero', 'vernyomasmero', 'festohenger'],
    oddToolId: 'festohenger',
    explanation:
      'Helyes! A festőhenger a festő-mázoló eszköze. A sztetoszkóp, a hőmérő és a vérnyomásmérő viszont az orvos munkáját segíti.',
  },
  {
    id: 'odd-kertesz',
    profession: 'Kertész',
    tools: ['metszoollo', 'gereblye', 'ontozokanna', 'sztetoszkop'],
    oddToolId: 'sztetoszkop',
    explanation:
      'Nagyszerű! A sztetoszkópot az orvos használja. A metszőolló, a gereblye és az öntözőkanna a kertész fontos szerszámai.',
  },
  {
    id: 'odd-fodrasz',
    profession: 'Fodrász',
    tools: ['fesu', 'hajvago_ollo', 'hajszarito', 'komuveskanal'],
    oddToolId: 'komuveskanal',
    explanation:
      'Ügyes vagy! A kőműveskanál az építkezésre való. A fodrász a fésűvel, a hajvágó ollóval és a hajszárítóval dolgozik.',
  },
  {
    id: 'odd-szakacs',
    profession: 'Szakács',
    tools: ['fakanal', 'serpenyo', 'habvero', 'gereblye'],
    oddToolId: 'gereblye',
    explanation:
      'Telitalálat! A gereblye a kertbe való eszköz. A fakanál, a serpenyő és a habverő a szakács konyhai szerszámai.',
  },
  {
    id: 'odd-tuzolto',
    profession: 'Tűzoltó',
    tools: ['tuzolototomlo', 'vedosisak', 'tuzoltokeszulek', 'hajszarito'],
    oddToolId: 'hajszarito',
    explanation:
      'Pontosan! A hajszárító a fodrász eszköze. A tűzoltó a tűzoltótömlővel, a védősisakkal és a tűzoltókészülékkel dolgozik.',
  },
  {
    id: 'odd-komuves',
    profession: 'Kőműves',
    tools: ['komuveskanal', 'vizmertek', 'simito', 'fesu'],
    oddToolId: 'fesu',
    explanation:
      'Remek! A fésűt a fodrász használja. A kőműveskanál, a vízmérték és a simító a kőműves szerszámai a falazáshoz.',
  },
  {
    id: 'odd-festo',
    profession: 'Festő-mázoló',
    tools: ['festohenger', 'ecset', 'festekesvodor', 'homero'],
    oddToolId: 'homero',
    explanation:
      'Szuper észrevétel! A hőmérő az orvos eszköze. A festőhenger, az ecset és a festékesvödör a festő-mázoló felszerelése.',
  },
  {
    id: 'odd-asztalos',
    profession: 'Asztalos',
    tools: ['furesz', 'gyalu', 'csiszolopapir', 'habvero'],
    oddToolId: 'habvero',
    explanation:
      'Így van! A habverő a konyhába való. Az asztalos a fűrész, a gyalu és a csiszolópapír segítségével munkálja meg a fát.',
  },
  {
    id: 'odd-pek',
    profession: 'Pék',
    tools: ['dagasztogep', 'sodrofa', 'peklapat', 'csavarkulcs'],
    oddToolId: 'csavarkulcs',
    explanation:
      'Ügyes megfejtés! A csavarkulcs a szerelők szerszáma. A pék a dagasztógéppel, a sodrófával és a péklapáttal süt finom kenyeret.',
  },
  {
    id: 'odd-varrono',
    profession: 'Varrónő',
    tools: ['varrogep', 'meroszalag', 'gombostuparna', 'vedosisak'],
    oddToolId: 'vedosisak',
    explanation:
      'Pontos válasz! A védősisak nem varróeszköz. A varrógép, a mérőszalag és a gombostűpárna a varrónő munkáját segíti.',
  },
];

// Game 3: Szakmai kihívások (10 everyday situations, 5 selected randomly)
export type SituationId =
  | 'szek'
  | 'vizcsap'
  | 'hajvagas'
  | 'szaraz_virag'
  | 'festes'
  | 'orvosi_vizsgalat'
  | 'kenyersutes'
  | 'teglafal'
  | 'ruha_varras'
  | 'levelek';

export interface SituationChallenge {
  id: SituationId;
  situationText: string;
  correctProfession: string;
  professionOptions: string[];
  professionExplanation: string;
  correctToolId: ToolId;
  toolOptions: ToolId[];
  toolExplanation: string;
}

export const SITUATION_CHALLENGES_POOL: SituationChallenge[] = [
  {
    id: 'szek',
    situationText: 'Eltört egy faszék lába.',
    correctProfession: 'Asztalos',
    professionOptions: ['Asztalos', 'Szakács', 'Orvos', 'Postás'],
    professionExplanation:
      'Az asztalos a fa megmunkálásának és a fabútorok javításának mestere.',
    correctToolId: 'furesz',
    toolOptions: ['furesz', 'sztetoszkop', 'ontozokanna', 'habvero'],
    toolExplanation:
      'Az asztalos a fűrésszel méretre tudja vágni az új falécet a szék lábához.',
  },
  {
    id: 'vizcsap',
    situationText: 'Csöpög a vízcsap.',
    correctProfession: 'Vízvezeték-szerelő',
    professionOptions: ['Vízvezeték-szerelő', 'Fodrász', 'Tanító', 'Pék'],
    professionExplanation:
      'A vízvezeték-szerelő ért a csövekhez és a csöpögő csapok megjavításához.',
    correctToolId: 'csavarkulcs',
    toolOptions: ['csavarkulcs', 'ecset', 'varrogep', 'fakanal'],
    toolExplanation:
      'A csavarkulccsal szorosra tudja húzni a csap alkatrészeit, hogy megszűnjön a csöpögés.',
  },
  {
    id: 'hajvagas',
    situationText: 'Valaki szeretné levágatni a haját.',
    correctProfession: 'Fodrász',
    professionOptions: ['Fodrász', 'Kőműves', 'Tűzoltó', 'Kertész'],
    professionExplanation:
      'A fodrász gondoskodik a haj ápolásáról, vágásáról és formázásáról.',
    correctToolId: 'hajvago_ollo',
    toolOptions: ['hajvago_ollo', 'komuveskanal', 'gereblye', 'dagasztogep'],
    toolExplanation:
      'A hajvágó ollóval pontosan és szépen tudja formára vágni a hajat.',
  },
  {
    id: 'szaraz_virag',
    situationText: 'A kertben szárazak a virágok.',
    correctProfession: 'Kertész',
    professionOptions: ['Kertész', 'Asztalos', 'Orvos', 'Festő-mázoló'],
    professionExplanation:
      'A kertész tudja, mennyi vízre és gondoskodásra van szüksége a növényeknek.',
    correctToolId: 'ontozokanna',
    toolOptions: ['ontozokanna', 'festohenger', 'gyalu', 'vernyomasmero'],
    toolExplanation:
      'Az öntözőkannából kíméletesen meg tudja locsolni a szomjas virágokat.',
  },
  {
    id: 'festes',
    situationText: 'A szoba falát újra kell festeni.',
    correctProfession: 'Festő-mázoló',
    professionOptions: ['Festő-mázoló', 'Pék', 'Vízvezeték-szerelő', 'Szabó vagy varrónő'],
    professionExplanation:
      'A festő-mázoló készíti elő a falakat, és szépen, egyenletesen kifesti a szobát.',
    correctToolId: 'festohenger',
    toolOptions: ['festohenger', 'sztetoszkop', 'furesz', 'serpenyo'],
    toolExplanation:
      'A festőhengerrel gyorsan és egyenletesen viheti fel a festéket a nagy falfelületre.',
  },
  {
    id: 'orvosi_vizsgalat',
    situationText: 'Egy beteg ember orvosi vizsgálatra megy.',
    correctProfession: 'Orvos',
    professionOptions: ['Orvos', 'Kertész', 'Asztalos', 'Kőműves'],
    professionExplanation:
      'Az orvos megvizsgálja a beteget, és segít kideríteni, hogyan gyógyulhat meg.',
    correctToolId: 'sztetoszkop',
    toolOptions: ['sztetoszkop', 'csavarkulcs', 'ontozokanna', 'peklapat'],
    toolExplanation:
      'A sztetoszkóppal hallgatja meg az orvos a beteg szívhangját és légzését.',
  },
  {
    id: 'kenyersutes',
    situationText: 'Kenyeret szeretnénk sütni a pékségben.',
    correctProfession: 'Pék',
    professionOptions: ['Pék', 'Fodrász', 'Tűzoltó', 'Vízvezeték-szerelő'],
    professionExplanation:
      'A pék készíti el hajnalban a friss kenyereket, kifliket és péksüteményeket.',
    correctToolId: 'dagasztogep',
    toolOptions: ['dagasztogep', 'tuzolototomlo', 'hajvago_ollo', 'vizmertek'],
    toolExplanation:
      'A dagasztógép alaposan összedolgozza a lisztet, a vizet és az élesztőt kenyértésztává.',
  },
  {
    id: 'teglafal',
    situationText: 'Egy ház falát téglából építik.',
    correctProfession: 'Kőműves',
    professionOptions: ['Kőműves', 'Szakács', 'Fodrász', 'Orvos'],
    professionExplanation:
      'A kőműves építi fel pontosan és biztonságosan a házak téglafalait.',
    correctToolId: 'komuveskanal',
    toolOptions: ['komuveskanal', 'habvero', 'varrogep', 'homero'],
    toolExplanation:
      'A kőműveskanállal simítja el a habarcsot, amely összeragasztja a téglákat.',
  },
  {
    id: 'ruha_varras',
    situationText: 'Új ruhát szeretnénk varratni.',
    correctProfession: 'Szabó vagy varrónő',
    professionOptions: ['Szabó vagy varrónő', 'Kertész', 'Kőműves', 'Tűzoltó'],
    professionExplanation:
      'A szabó és a varrónő pontos méretvétel után varr szép és kényelmes ruhákat.',
    correctToolId: 'varrogep',
    toolOptions: ['varrogep', 'gereblye', 'festohenger', 'csavarkulcs'],
    toolExplanation:
      'A varrógéppel gyorsan és tartósan tudja összevarrni a kiszabott szövetdarabokat.',
  },
  {
    id: 'levelek',
    situationText: 'A kertben le kell gereblyézni a lehullott leveleket.',
    correctProfession: 'Kertész',
    professionOptions: ['Kertész', 'Pék', 'Orvos', 'Festő-mázoló'],
    professionExplanation:
      'A kertész tartja rendben a kertet, az ösvényeket és a pázsitot minden évszakban.',
    correctToolId: 'gereblye',
    toolOptions: ['gereblye', 'fakanal', 'sztetoszkop', 'ecset'],
    toolExplanation:
      'A gereblyével könnyen össze tudja gyűjteni a lehullott faleveleket a fűről.',
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
