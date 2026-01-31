import type { Service } from "./service.ts";
import type { ServicesAtLocations } from "./services-at-locations.ts";
import type { ValidityPeriod } from "./validity-period.ts";

export interface Alert {
  advice: string;
  description: string;
  title: string;
  effect: string;
  validityScopes: string;
  impactedServices: Service[];
  impactedServicesAtLocations: ServicesAtLocations[];
  validityPeriods: ValidityPeriod[];
}
