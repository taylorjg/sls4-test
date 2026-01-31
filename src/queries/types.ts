import { gql } from "graphql-request";

export interface Operator {
  id: string;
  name: string;
  nationalCode: string;
  regionalCode: string;
}

export interface Line {
  id: string;
  mode: string;
  services: Service[];
}

export interface Service {
  id: string;
  name: string;
  operators?: Operator[];
}

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

export interface Location {
  name: string;
  mode: string;
  atcoCode: string;
  type: string;
}

export const AlertFragment = gql`
  fragment AlertFragment on Alert {
    advice
    description
    title
    impactedServices {
      name
    }
    impactedServicesAtLocations {
      locations {
        name
        mode
        atcoCode
        type
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
