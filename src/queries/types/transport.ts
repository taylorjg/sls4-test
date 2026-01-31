import type { Operator, Service } from "./common.ts";
import type { Alert } from "./alert.ts";

export interface TransportModeWithServices {
  services: Service[];
}

export interface TransportModeWithAlerts {
  alerts: Alert[];
}

export interface Departure {
  platformStand: string;
  trip: Trip;
  timings: Timing[];
}

export interface Trip {
  __typename: string;
  id: string;
  mode: string;
  operator: Operator;
  carriages?: number;
  destinationDisplay?: string;
}

export interface Timing {
  scheduledDepartureTime: string;
  expectedDepartureTime: string;
  lastUpdated: string;
  status: string;
  wait: number;
}
