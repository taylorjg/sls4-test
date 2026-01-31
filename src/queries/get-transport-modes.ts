import { gql } from "graphql-request";
import type { TransportModeWithServices } from "./types/index.ts";

export const GetTransportModes = gql`
  query GetTransportModes {
    transportModes(modes: [TRAM]) {
      services {
        id
        name
        operators {
          id
          name
          nationalCode
          regionalCode
        }
      }
    }
  }
`;

export interface GetTransportModesResponse {
  transportModes: TransportModeWithServices[];
}
