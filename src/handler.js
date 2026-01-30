import { GraphQLClient } from "graphql-request";
import { GetTransportModes } from "./queries.js";

const { TFGM_API_URL } = process.env;

export const getTransportModes = async () => {
  console.log("Fetching transport modes from TfGM API");

  try {
    const graphqlClient = new GraphQLClient(TFGM_API_URL);
    const data = await graphqlClient.request(GetTransportModes);

    console.log("Successfully fetched transport modes");

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error("GraphQL request failed:", {
      message: error.message,
      stack: error.stack,
    });

    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch transport modes" }),
    };
  }
};
