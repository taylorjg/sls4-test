import { gql } from "graphql-request";
import { AlertFragment } from "../fragments/index.ts";

export const GetTrams = gql`
  query GetTrams($atcoCode: String!) {
    locationByAtco(atcoCodes: [$atcoCode]) {
      ... on MassTransportLocation {
        departures(limit: 20) {
          trip {
            ... on TramTrip {
              carriages
              destinationDisplay
            }
          }
          timings {
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
