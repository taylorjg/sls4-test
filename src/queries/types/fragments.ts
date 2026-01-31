import { gql } from "graphql-request";

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
