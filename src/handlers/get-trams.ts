import type { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda";
import { GraphQLClient } from "graphql-request";
import { GetTrams, transformGetTrams, RawGetTramsResponse } from "@app/queries/index.ts";
import { networkMap } from "@app/network-map/network-map.ts";
import packageJson from "../../package.json" with { type: "json" };

const { TFGM_API_URL } = process.env;

const checkLineIdsParam = (lineIdsParam: string | undefined) => {
  if (!lineIdsParam) return null;

  const lineIds = lineIdsParam?.split(",").map((s) => s.trim());
  const lines = lineIds
    .map((lineId) => networkMap.get(lineId))
    .filter((line) => line !== undefined);

  if (lines.length > 0 && lines.length === lineIds.length) {
    return lines;
  }

  // TODO: return 400 Bad Request
  return lines;
};

const checkTowardsParam = (towardsParam: string | undefined) => {
  if (!towardsParam) return null;

  switch (towardsParam) {
    case "starts": return towardsParam;
    case "ends": return towardsParam;

    // TODO: return 400 Bad Request
    default: return null;
  }
};

export const handler = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> => {
  console.log(`Version: ${packageJson.version}`);
  console.log("Fetching trams from TfGM API");

  const atcoCode = event.queryStringParameters?.atcoCode;
  const lineIdsParam = event.queryStringParameters?.lineIds;
  const towardsParam = event.queryStringParameters?.towards;

  try {
    const lines = checkLineIdsParam(lineIdsParam);
    const towards = checkTowardsParam(towardsParam);
    const filter = lines && towards ? { lines, towards } : null;

    const graphqlClient = new GraphQLClient(TFGM_API_URL!);
    const rawData = await graphqlClient.request<RawGetTramsResponse>(GetTrams, { atcoCode });
    const data = transformGetTrams(rawData, filter);

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
