import { gql } from "graphql-request";
import type { Service, SearchLocation } from "../types/index.ts";

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

// Raw response from GraphQL (nested structure)
interface RawLine {
  services: Service[];
}

interface RawSearchLocation {
  atcoCode: string;
  name: string;
  lines?: RawLine[];
}

export interface RawSearchLocationsResponse {
  searchLocations: RawSearchLocation[];
}

// Transformed response type
export type SearchLocationsResponse = SearchLocation[];

// Transform function to flatten the response
export const transformSearchLocations = (raw: RawSearchLocationsResponse): SearchLocationsResponse => {
  return raw.searchLocations.map((location) => ({
    atcoCode: location.atcoCode,
    name: location.name,
    services: location.lines?.flatMap((line) => line.services) ?? [],
  }));
};
