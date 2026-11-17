import { StationDefinition } from '../types/game';

export const STATIONS: StationDefinition[] = [
  {
    id: 1,
    slug: 'idouatas',
    orderLabel: '01.',
    title: 'Időutazás – Régi mesterségek',
    buildingName: 'Múltidéző Műhely',
    districtLabel: 'Óvárosi tér',
    shortDescription: 'Fedezd fel, hogyan dolgoztak régen a mesteremberek!',
    instruction:
      'Utazz vissza az időben, és ismerd meg a régi magyar mesterségeket! Figyeld meg a képeket és a leírásokat, majd válaszd ki a helyes megoldást.',
    theme: {
      surfaceTint: 'bg-amber-50/80',
      borderTint: 'border-amber-200',
      accentBg: 'bg-amber-600',
      accentText: 'text-amber-800',
      ringColor: 'focus-visible:ring-amber-500',
    },
  },
  {
    id: 2,
    slug: 'szerszamok',
    orderLabel: '02.',
    title: 'Kinek a szerszáma?',
    buildingName: 'Szerszámos Házikó',
    districtLabel: 'Mesterek utcája',
    shortDescription: 'Párosítsd a szerszámokat a megfelelő szakemberrel!',
    instruction:
      'Minden szakmának megvannak a saját különleges eszközei. Nézd meg alaposan a szerszámokat, és találd meg, melyik mester használja őket a munkájához!',
    theme: {
      surfaceTint: 'bg-sky-50/80',
      borderTint: 'border-sky-200',
      accentBg: 'bg-sky-600',
      accentText: 'text-sky-800',
      ringColor: 'focus-visible:ring-sky-500',
    },
  },
  {
    id: 3,
    slug: 'detektivek',
    orderLabel: '03.',
    title: 'Foglalkozásdetektívek',
    buildingName: 'Detektív Torony',
    districtLabel: 'Kilátó negyed',
    shortDescription: 'Nyomozz a leírások alapján, és találd ki a foglalkozást!',
    instruction:
      'Válj igazi nyomozóvá! Olvasd el figyelmesen a három nyomot, gondolkodj el rajtuk, és fejtsd meg, melyik foglalkozásra gondoltunk!',
    theme: {
      surfaceTint: 'bg-emerald-50/80',
      borderTint: 'border-emerald-200',
      accentBg: 'bg-emerald-600',
      accentText: 'text-emerald-800',
      ringColor: 'focus-visible:ring-emerald-500',
    },
  },
  {
    id: 4,
    slug: 'munkahelyek',
    orderLabel: '04.',
    title: 'Ki hol dolgozik?',
    buildingName: 'Városi Munkahelyek Háza',
    districtLabel: 'Főposta tér',
    shortDescription: 'Segíts minden szakembernek megtalálni a munkahelyét!',
    instruction:
      'Egyes szakemberek kórházban, mások műhelyben vagy éppen a szabadban dolgoznak. Párosítsd össze a foglalkozásokat a hozzájuk illő munkahellyel!',
    theme: {
      surfaceTint: 'bg-rose-50/80',
      borderTint: 'border-rose-200',
      accentBg: 'bg-rose-600',
      accentText: 'text-rose-800',
      ringColor: 'focus-visible:ring-rose-500',
    },
  },
  {
    id: 5,
    slug: 'titkos-nevek',
    orderLabel: '05.',
    title: 'Titkos szakmanevek',
    buildingName: 'Rejtélyes Postahivatal',
    districtLabel: 'Betűpark',
    shortDescription: 'Fejtsd meg a betűrejtvényeket és az elrejtett neveket!',
    instruction:
      'Összekeveredtek a betűk és titkos üzenetek érkeztek a postára! Tedd sorrendbe a betűket vagy egészítsd ki a szavakat, hogy kiderüljön a szakma neve.',
    theme: {
      surfaceTint: 'bg-indigo-50/80',
      borderTint: 'border-indigo-200',
      accentBg: 'bg-indigo-600',
      accentText: 'text-indigo-800',
      ringColor: 'focus-visible:ring-indigo-500',
    },
  },
  {
    id: 6,
    slug: 'igaz-hamis',
    orderLabel: '06.',
    title: 'Igaz vagy hamis?',
    buildingName: 'Igazmondó Harangtorony',
    districtLabel: 'Piactér',
    shortDescription: 'Döntsd el a meglepő állításokról, mi igaz és mi hamis!',
    instruction:
      'Sok érdekes és néha tréfás mondat kering a városban a különféle munkákról. Olvasd el az állítást, és döntsd el, hogy igaz vagy hamis!',
    theme: {
      surfaceTint: 'bg-teal-50/80',
      borderTint: 'border-teal-200',
      accentBg: 'bg-teal-600',
      accentText: 'text-teal-800',
      ringColor: 'focus-visible:ring-teal-500',
    },
  },
  {
    id: 7,
    slug: 'kepessegek',
    orderLabel: '07.',
    title: 'Milyen képesség kell hozzá?',
    buildingName: 'Képességek Akadémiája',
    districtLabel: 'Tudás liget',
    shortDescription: 'Tudd meg, milyen erősségek segítik a szakembereket!',
    instruction:
      'Minden munkához másfajta ügyesség, figyelem, bátorság vagy türelem szükséges. Válaszd ki, melyik képesség segíti leginkább az adott szakmát!',
    theme: {
      surfaceTint: 'bg-orange-50/80',
      borderTint: 'border-orange-200',
      accentBg: 'bg-orange-600',
      accentText: 'text-orange-800',
      ringColor: 'focus-visible:ring-orange-500',
    },
  },
  {
    id: 8,
    slug: 'ha-nagy-leszek',
    orderLabel: '08.',
    title: 'Ha nagy leszek…',
    buildingName: 'Álmodozók Kilátója',
    districtLabel: 'Csillagdomb',
    shortDescription: 'Fedezd fel, milyen izgalmas hivatások illenek hozzád!',
    instruction:
      'Gondold végig, mit szeretsz csinálni, miben vagy ügyes, és milyen feladatok okoznak örömet! A válaszaid megmutatják, milyen területek várnak rád.',
    theme: {
      surfaceTint: 'bg-violet-50/80',
      borderTint: 'border-violet-200',
      accentBg: 'bg-violet-600',
      accentText: 'text-violet-800',
      ringColor: 'focus-visible:ring-violet-500',
    },
  },
];

export const POSITIVE_FEEDBACK_MESSAGES: string[] = [
  'Nagyszerű munka! Igazi mester vagy!',
  'Ügyes vagy, remekül megfigyelted!',
  'Telitalálat! Ezt pontosan eltaláltad!',
  'Fantasztikus! Újabb tudással gazdagodtál!',
  'Szuper megoldás! Csak így tovább!',
];

export function getStationById(id: number): StationDefinition | undefined {
  return STATIONS.find((station) => station.id === id);
}
