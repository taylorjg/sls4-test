import { gql } from "graphql-request";
import type { Service } from "./types.ts";

const AlertFragment = gql`
  fragment AlertFragment on Alert {
    advice
    description
    title
    impactedServices {
      name
    }
    impactedServicesAtLocations {
      locations {
        atcoCode
      }
      services {
        name
      }
    }
    id
    effect
    validityScopes
    validityPeriods {
      start
      end
    }
    link {
      href
      label
    }
  }
`;

export const GetNetworkStatus = gql`
  query GetNetworkStatus {
    transportModes(modes: [TRAM]) {
      alerts {
        ...AlertFragment
      }
    }
  }

  ${AlertFragment}
`;

export interface Alert {
  advice: string;
  description: string;
  title: string;
  impactedServices: Service[];
  impactedServicesAtLocations: ImpactedServicesAtLocations[];
  id: string;
  effect: string;
  validityScopes: string;
  validityPeriods: ValidityPeriod[];
  link: Link;
}

export interface ImpactedServicesAtLocations {
  locations: Location[];
  services: Service[];
}

export interface Location {
  atcoCode: string;
}

export interface ValidityPeriod {
  start: string;
  end: string;
}

export interface Link {
  href: string;
  label: string;
}

export interface GetNetworkStatusResponse {
  transportModes: TransportMode[];
}

export interface TransportMode {
  alerts: Alert[];
}
