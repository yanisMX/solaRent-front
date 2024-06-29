export interface City {
  code_name: string;
  coordinates: string;
  departement_code: string;
  name: string;
  state_code: string;
  total_count: string; // or number if you prefer to parse it
}

export interface Department {
  code: string;
  name: string;
  sun_rate?: string;
  solar_panel_count?: number;
}

export const franceBounds: [number, number][] = [
  [41.333, -5.225],
  [51.124, 9.662],
];
