import type { Alert } from "./alert.ts";
import type { Departure } from "./departure.ts";

export interface TramLocation {
  departures?: Departure[];
  stopAlerts?: Alert[];
}
