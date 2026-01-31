import { gql } from "graphql-request";
import { AlertFragment, Operator, Location, type Alert } from "./types.ts";

export const GetTrams = gql`
  query GetTrams($atcoCode: String!) {
    locationByAtco(atcoCodes: [$atcoCode]) {
      name
      mode
      atcoCode
      type
      locality
      ... on MassTransportLocation {
        shortName
        longName
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
  locationByAtco: Location[];
  lineAlerts: Alert[];
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
}

export interface Timing {
  scheduledDepartureTime: string;
  expectedDepartureTime: string;
  lastUpdated: string;
  status: string;
  wait: number;
}
