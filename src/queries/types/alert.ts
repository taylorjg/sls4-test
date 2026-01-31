import type { Service } from "./common.ts";
import type { Location } from "./location.ts";

export interface Alert {
  id: string;
  advice: string;
  description: string;
  title: string;
  effect: string;
  validityScopes: string;
  impactedServices: Service[];
  impactedServicesAtLocations: ImpactedServicesAtLocations[];
  validityPeriods: ValidityPeriod[];
  link: Link;
}

export interface ImpactedServicesAtLocations {
  locations: Location[];
  services: Service[];
}

export interface ValidityPeriod {
  start: string;
  end: string;
}

export interface Link {
  href: string;
  label: string;
}
