export interface Operator {
  id: string;
  name: string;
  nationalCode?: string;
  regionalCode?: string;
}

export interface Service {
  id: string;
  name: string;
  operators?: Operator[];
}

export interface Line {
  id: string;
  mode: string;
  services: Service[];
}
