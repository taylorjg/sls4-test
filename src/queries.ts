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

export const SearchLocations = gql`
  query SearchLocations($searchKey: String = "") {
    searchLocations(
      params: {
        modes: [TRAM]
        limit: 200
        searchKey: $searchKey
      }
    ) {
      atcoCode
      name
      ... on MassTransportLocation {
        lines {
          ... on TramLine {
            services {
              id
              name
            }
          }
        }
      }
    }
  }
`;

export interface SearchLocation {
  atcoCode: string;
  name: string;
  lines: Line[];
}

export interface Line {
  services: Service[];
}

export interface SearchLocationsResponse {
  searchLocations: SearchLocation[];
}
