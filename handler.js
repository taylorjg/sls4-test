import { gql, GraphQLClient } from "graphql-request";

const GetTransportModes = gql`
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

export const hello = async (event) => {
  const graphqlClient = new GraphQLClient("https://apiary.tfgm.com");
  const data = await graphqlClient.request(GetTransportModes);

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(data),
  };
};
