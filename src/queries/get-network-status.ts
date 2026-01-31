import { gql } from "graphql-request";
import { AlertFragment, type Alert, type Service } from "./types.ts";

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
  transportModes: TransportMode[];
}

export interface TransportMode {
  alerts: Alert[];
}
