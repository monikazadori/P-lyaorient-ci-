export type StationId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export interface StationAccentTheme {
  surfaceTint: string;
  borderTint: string;
  accentBg: string;
  accentText: string;
  ringColor: string;
}

export interface StationDefinition {
  id: StationId;
  slug: string;
  orderLabel: string;
  title: string;
  buildingName: string;
  districtLabel: string;
  shortDescription: string;
  instruction: string;
  theme: StationAccentTheme;
}

export interface StarProgressState {
  completedStationIds: StationId[];
}
