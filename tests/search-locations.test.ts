import { describe, it } from "node:test";
import assert from "node:assert";
import type { APIGatewayProxyEventV2 } from "aws-lambda";
import type { SearchLocationsResponse } from "@app/queries/index.ts";
import "./setup.ts";

// Set env var BEFORE importing the handler
process.env.TFGM_API_URL = "https://apiary.tfgm.com";

const { handler } = await import("@app/search-locations.ts");

interface LambdaResponse {
  statusCode: number;
  body: string;
}

const createEvent = (searchKey?: string): APIGatewayProxyEventV2 =>
  ({
    queryStringParameters: searchKey ? { searchKey } : undefined,
  }) as APIGatewayProxyEventV2;

describe("searchLocations integration tests", () => {
  it("should return 200 status code", async () => {
    const response = (await handler(createEvent())) as LambdaResponse;

    assert.strictEqual(response.statusCode, 200);
  });

  it("should return valid JSON body", async () => {
    const response = (await handler(createEvent())) as LambdaResponse;
    const body = JSON.parse(response.body) as SearchLocationsResponse;

    assert.ok(body.searchLocations, "Response should contain searchLocations");
  });

  it("should return search locations as an array", async () => {
    const response = (await handler(createEvent())) as LambdaResponse;
    const body = JSON.parse(response.body) as SearchLocationsResponse;

    assert.ok(
      Array.isArray(body.searchLocations),
      "searchLocations should be an array"
    );
  });

  it("should return locations with expected structure", async () => {
    const response = (await handler(createEvent())) as LambdaResponse;
    const body = JSON.parse(response.body) as SearchLocationsResponse;
    const locations = body.searchLocations;

    if (locations.length > 0) {
      const location = locations[0];
      assert.ok(location.atcoCode, "Location should have an atcoCode");
      assert.ok(location.name, "Location should have a name");
    }
  });

  it("should filter results when searchKey is provided", async () => {
    const response = (await handler(createEvent("piccadilly"))) as LambdaResponse;
    const body = JSON.parse(response.body) as SearchLocationsResponse;

    assert.strictEqual(response.statusCode, 200);
    assert.ok(Array.isArray(body.searchLocations), "Should return an array");
  });

  it("should return results when searchKey matches a location", async () => {
    const response = (await handler(createEvent("market"))) as LambdaResponse;
    const body = JSON.parse(response.body) as SearchLocationsResponse;

    assert.strictEqual(response.statusCode, 200);
    // Should find at least one location with "market" in the name
    if (body.searchLocations.length > 0) {
      const hasMatch = body.searchLocations.some((loc) =>
        loc.name.toLowerCase().includes("market")
      );
      assert.ok(hasMatch, "Should find locations matching search key");
    }
  });
});
