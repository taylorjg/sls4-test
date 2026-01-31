import type { Timing } from "./timing.ts";
import type { Trip } from "./trip.ts";

export interface Departure {
  trip: Trip;
  timings: Timing[];
}
