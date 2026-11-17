export type OldCraftId = 'kovacs' | 'fazekas' | 'molnar' | 'takacs' | 'kadar';

export interface OldCraftItem {
  id: OldCraftId;
  name: string;
  imagePath: string;
  imageAlt: string;
  explanation: string;
  productName: string;
  productArticleName: string;
  pairExplanation: string;
}

export interface CraftQuizQuestion {
  id: string;
  question: string;
  options: [string, string, string];
  correctAnswer: string;
  explanation: string;
}

export const OLD_CRAFTS: OldCraftItem[] = [
  {
    id: 'kovacs',
    name: 'Kovács',
    imagePath: '/src/assets/images/craft_kovacs_1794940259438.jpg',
    imageAlt: 'Mesterember a tűzhely mellett, kalapáccsal és üllővel dolgozik',
    explanation:
      'Helyes! A kovács tüzes kemencében izzítja a vasat, majd kalapáccsal az üllőn formálja belőle például a lópatkót és a szerszámokat.',
    productName: 'patkó',
    productArticleName: 'Patkó',
    pairExplanation: 'A kovács vasból kovácsolja a patkót a lovak patájára.',
  },
  {
    id: 'fazekas',
    name: 'Fazekas',
    imagePath: '/src/assets/images/craft_fazekas_1794940260130.jpg',
    imageAlt: 'Mesterember korongon formáz edényt a polcokon sorakozó tálak között',
    explanation:
      'Nagyszerű! A fazekas nedves agyagból, fazekaskorong segítségével formál kancsókat, tálakat és edényeket, amelyeket kemencében kiéget.',
    productName: 'agyagedény',
    productArticleName: 'Agyagedény',
    pairExplanation: 'A fazekas agyagból formázza és égeti ki az agyagedényt.',
  },
  {
    id: 'molnar',
    name: 'Molnár',
    imagePath: '/src/assets/images/craft_molnar_1794940260822.jpg',
    imageAlt: 'Mesterember vízimalomban gabonaszemeket önt a nagy malomkövek közé',
    explanation:
      'Ügyes vagy! A molnár a vízimalomban vagy szélmalomban a két hatalmas malomkő között finom lisztté őrli az aranyló gabonát.',
    productName: 'liszt',
    productArticleName: 'Liszt',
    pairExplanation: 'A molnár gabonából őrli a kenyeret adó finom lisztet.',
  },
  {
    id: 'takacs',
    name: 'Takács',
    imagePath: '/src/assets/images/craft_takacs_1794940261143.jpg',
    imageAlt: 'Mesterember nagy fa szövőszéknél színes fonalakkal dolgozik',
    explanation:
      'Pontosan így van! A takács szövőszéken, színes fonalak keresztezésével készíti a tartós és szép mintás szöveteket.',
    productName: 'szövet',
    productArticleName: 'Szövet',
    pairExplanation: 'A takács fonalakból szövi a ruhákhoz és terítőkhöz való szövetet.',
  },
  {
    id: 'kadar',
    name: 'Kádár',
    imagePath: '/src/assets/images/craft_kadar_1794940261565.jpg',
    imageAlt: 'Mesterember fa dongákból és fémabroncsból készít edényt fakalapáccsal',
    explanation:
      'Telitalálat! A kádár hajlított falécekből, azaz dongákból és erős fémabroncsokból állítja össze a szoros fahordókat.',
    productName: 'fahordó',
    productArticleName: 'Fahordó',
    pairExplanation: 'A kádár fa dongákból és abroncsokból építi a fahordót.',
  },
];

export const QUIZ_QUESTIONS_POOL: CraftQuizQuestion[] = [
  {
    id: 'q1',
    question: 'Melyik mester dolgozik agyaggal?',
    options: ['Fazekas', 'Kovács', 'Molnár'],
    correctAnswer: 'Fazekas',
    explanation: 'A fazekas nedves agyagból formázza a szebbnél szebb edényeket.',
  },
  {
    id: 'q2',
    question: 'Mit készít a kádár?',
    options: ['Fahordót', 'Lópatkót', 'Szövetet'],
    correctAnswer: 'Fahordót',
    explanation: 'A kádár hajlított falécekből és abroncsokból készíti a fahordókat.',
  },
  {
    id: 'q3',
    question: 'Miből őröl lisztet a molnár?',
    options: ['Gabonából', 'Fából', 'Agyagból'],
    correctAnswer: 'Gabonából',
    explanation: 'A molnár búzából és más gabonafélékből őröl lisztet a malomban.',
  },
  {
    id: 'q4',
    question: 'Milyen anyaggal dolgozik leggyakrabban a kovács?',
    options: ['Fémmel', 'Fonallal', 'Papírral'],
    correctAnswer: 'Fémmel',
    explanation: 'A kovács tűzben izzítja a vasat és más fémeket, majd kalapáccsal formálja őket.',
  },
  {
    id: 'q5',
    question: 'Mit készít a takács?',
    options: ['Szövetet', 'Agyagkorsót', 'Fahordót'],
    correctAnswer: 'Szövetet',
    explanation: 'A takács fonalakból szövi a ruhákhoz és terítőkhöz használt szövetet.',
  },
  {
    id: 'q6',
    question: 'Melyik eszközön formázza az edényt a fazekas?',
    options: ['Fazekaskorongon', 'Üllőn', 'Szövőszéken'],
    correctAnswer: 'Fazekaskorongon',
    explanation: 'A pörgő fazekaskorong segítségével alakul ki a kerek edény formája.',
  },
  {
    id: 'q7',
    question: 'Mire veri rá a kovács az izzó vasat a műhelyben?',
    options: ['Üllőre', 'Malomkőre', 'Szövőszékre'],
    correctAnswer: 'Üllőre',
    explanation: 'A nehéz vasüllőn kalapálja formára a kovács a felhevített fémet.',
  },
  {
    id: 'q8',
    question: 'Mi hajtja meg a patakparti vízimalom kerekét?',
    options: ['Folyó víz', 'Tűzhely melege', 'Agyag súlya'],
    correctAnswer: 'Folyó víz',
    explanation: 'A patak vagy folyó vize forgatja a malomkereket, amely meghajtja a malomköveket.',
  },
  {
    id: 'q9',
    question: 'Melyik mester használja a szövőszéket?',
    options: ['Takács', 'Kádár', 'Kovács'],
    correctAnswer: 'Takács',
    explanation: 'A takács a fa szövőszéken fűzi át a szálakat egymáson.',
  },
  {
    id: 'q10',
    question: 'Mi tartja össze szorosan a kádár által készített fahordó dongáit?',
    options: ['Fémabroncs', 'Lisztpép', 'Selyemszalag'],
    correctAnswer: 'Fémabroncs',
    explanation: 'Az erős vasabroncsok szorítják össze a fahordó léceit, hogy ne szivárogjon.',
  },
  {
    id: 'q11',
    question: 'Melyik mester készíti a lovak patájára való patkót?',
    options: ['Kovács', 'Fazekas', 'Takács'],
    correctAnswer: 'Kovács',
    explanation: 'A kovács készíti és illeszti fel a lópatkót, hogy védje a lovak patáját.',
  },
  {
    id: 'q12',
    question: 'Miért égeti ki a fazekas a megformázott agyagedényeket?',
    options: ['Hogy kemény és tartós legyen', 'Hogy puha maradjon', 'Hogy szövetté váljon'],
    correctAnswer: 'Hogy kemény és tartós legyen',
    explanation: 'A kemencében történő kiégetés teszi erőssé és vízállóvá az agyagedényt.',
  },
];

export function shuffleArray<T>(items: readonly T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
