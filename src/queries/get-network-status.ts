import { gql } from "graphql-request";
import { AlertFragment } from "./fragments/index.ts";
import type { TransportModeWithAlerts } from "../types/index.ts";

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
