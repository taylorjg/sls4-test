import type { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda";
import { GraphQLClient } from "graphql-request";
import { GetTrams, type GetTramsResponse } from "@app/queries/index.ts";
import packageJson from "../../package.json" with { type: "json" };

const { TFGM_API_URL } = process.env;

export const handler = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> => {
  console.log(`Version: ${packageJson.version}`);
  console.log("Fetching trams from TfGM API");

  const atcoCode = event.queryStringParameters?.atcoCode;

  try {
    const graphqlClient = new GraphQLClient(TFGM_API_URL!);
    const data = await graphqlClient.request<GetTramsResponse>(GetTrams, {
      atcoCode,
    });

    console.log("Successfully fetched trams");

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
      body: JSON.stringify({ error: "Failed to fetch trams" }),
    };
  }
};
