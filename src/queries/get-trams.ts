import { gql } from "graphql-request";

export const GetTrams = gql`
  query GetTrams($atcoCode: String!) {
    locationByAtco(atcoCodes: [$atcoCode]) {
      ... on MassTransportLocation {
        departures(limit: 20) {
          trip {
            ... on TramTrip {
              carriages
              destinationDisplay
            }
          }
          timings {
            status
            wait
          }
        }
      }
    }
  }
`;

interface RawDeparture {
  trip: {
    carriages: string;
    destinationDisplay: string;
  };
  timings: {
    status: string;
    wait: number;
  };
}

interface RawLocation {
  departures: RawDeparture[];
}

export interface RawGetTramsResponse {
  locationByAtco: RawLocation[];
}

export interface Tram {
  carriages: string;
  destinationDisplay: string;
  status: string;
  due: number;
}

export type GetTramsResponse = Tram[];

// Transform to domain response
export const transformGetTrams = (raw: RawGetTramsResponse): GetTramsResponse => {
  const location = raw.locationByAtco?.[0];
  if (!location?.departures) return [];

  return location.departures
    .filter((departure) => departure.trip && departure.timings)
    .map((departure) => ({
      carriages: departure.trip!.carriages ?? 0,
      destinationDisplay: departure.trip!.destinationDisplay ?? "",
      status: departure.timings!.status ?? "",
      due: departure.timings!.wait ?? 0,
    }));
};
