import { gql } from "graphql-request";
import {
  AlertFragment,
  type TramLocation,
  type TransportModeWithAlerts,
} from "./types/index.ts";

export const GetTrams = gql`
  query GetTrams($atcoCode: String!) {
    locationByAtco(atcoCodes: [$atcoCode]) {
      name
      mode
      atcoCode
      type
      ... on MassTransportLocation {
        lines {
          ... on TramLine {
            id
            mode
            services {
              name
            }
          }
        }
        departures(limit: 20) {
          platformStand
          trip {
            __typename
            id
            mode
            operator {
              name
            }
            ... on TramTrip {
              carriages
              destinationDisplay
            }
          }
          timings {
            scheduledDepartureTime
            expectedDepartureTime
            lastUpdated
            status
            wait
          }
        }
        stopAlerts: alerts {
          ...AlertFragment
        }
      }
    }
    lineAlerts: transportModes(modes: [TRAM]) {
      alerts(
      filters: {
        validityScopes: NOW
        effects: [NO_SERVICE, OTHER]
        alertScope: [Service, ServicesAtLocation]
      }) {
        ...AlertFragment
      }
    }
  }

  ${AlertFragment}
`;

export interface GetTramsResponse {
  locationByAtco: TramLocation[];
  lineAlerts: TransportModeWithAlerts[];
}
