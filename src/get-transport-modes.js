import { GraphQLClient } from "graphql-request";
import { GetTransportModes } from "./queries.js";
import packageJson from "../package.json" with { type: "json" };

const { TFGM_API_URL } = process.env;

export const handler = async () => {
  console.log(`Version: ${packageJson.version}`);
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
