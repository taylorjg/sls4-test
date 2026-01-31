import { gql } from "graphql-request";
import type { Service } from "./types.ts";

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

export interface TransportMode {
  services: Service[];
}

export interface TransportModesResponse {
  transportModes: TransportMode[];
}
