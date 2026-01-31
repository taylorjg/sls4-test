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

interface TransportMode {
  services: Service[];
}

export interface GetTransportModesResponse {
  transportModes: TransportMode[];
}
