export interface Project {
  code_name: string;
  coordinates: string;
  departement_code: string;
  name: string;
  state_code: string;
  total_count: string; // or number if you prefer to parse it
}

export interface Departement {
  code: string;
  name: string;
  sun_rate: string;
}
