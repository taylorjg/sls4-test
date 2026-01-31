import type { APIGatewayProxyResultV2 } from "aws-lambda";
import { GraphQLClient } from "graphql-request";
import { GetTransportModes, type GetTransportModesResponse } from "@app/queries/index.ts";
import packageJson from "../package.json" with { type: "json" };

const { TFGM_API_URL } = process.env;

export const handler = async (): Promise<APIGatewayProxyResultV2> => {
  console.log(`Version: ${packageJson.version}`);
  console.log("Fetching transport modes from TfGM API");

  try {
    const graphqlClient = new GraphQLClient(TFGM_API_URL!);
    const data = await graphqlClient.request<GetTransportModesResponse>(GetTransportModes);

    console.log("Successfully fetched transport modes");

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    const err = error as Error;
    console.error("GraphQL request failed:", {
      message: err.message,
      stack: err.stack,
    });

    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch transport modes" }),
    };
  }
};
