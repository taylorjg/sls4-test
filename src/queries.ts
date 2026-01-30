import { gql } from "graphql-request";

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

export interface Operator {
  id: string;
  name: string;
  nationalCode: string;
  regionalCode: string;
}

export interface Service {
  id: string;
  name: string;
  operators: Operator[];
}

export interface TransportMode {
  services: Service[];
}

export interface TransportModesResponse {
  transportModes: TransportMode[];
}
