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
