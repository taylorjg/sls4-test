import type { Line } from "./common.ts";
import type { Alert } from "./alert.ts";
import type { Departure } from "./transport.ts";

export interface Location {
  name: string;
  mode: string;
  atcoCode: string;
  type: string;
}

export interface SearchLocation {
  atcoCode: string;
  name: string;
  lines: Line[];
}

export interface TramLocation extends Location {
  lines?: Line[];
  departures?: Departure[];
  stopAlerts?: Alert[];
}
