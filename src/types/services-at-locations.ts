import type { Location } from "./location.ts";
import type { Service } from "./service.ts";

export interface ServicesAtLocations {
  locations: Location[];
  services: Service[];
}
