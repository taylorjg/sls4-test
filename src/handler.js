import { GraphQLClient } from "graphql-request";
import { GetTransportModes } from "./queries.js";

const { TFGM_API_URL } = process.env;

export const hello = async (/* event */) => {
  const graphqlClient = new GraphQLClient(TFGM_API_URL);
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
