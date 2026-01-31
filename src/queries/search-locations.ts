import { gql } from "graphql-request";
import type { Service } from "./types.ts";

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

export interface Line {
  services: Service[];
}

export interface SearchLocation {
  atcoCode: string;
  name: string;
  lines: Line[];
}

export interface SearchLocationsResponse {
  searchLocations: SearchLocation[];
}
