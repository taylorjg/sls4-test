import { gql } from "graphql-request";
import { AlertFragment, type TransportModeWithAlerts } from "./types/index.ts";

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

export interface GetNetworkStatusResponse {
  transportModes: TransportModeWithAlerts[];
}
