import "./setup.ts";
import { describe, it } from "node:test";
import assert from "node:assert";
import type { APIGatewayProxyEventV2, APIGatewayProxyStructuredResultV2 } from "aws-lambda";

// Set env var before importing handler
process.env.TFGM_API_URL = "https://apiary.tfgm.com";

const { handler } = await import("@app/handlers/search-locations.ts");

const createEvent = (searchKey?: string) =>
  ({
    queryStringParameters: searchKey ? { searchKey } : undefined,
  }) as unknown as APIGatewayProxyEventV2;

describe("searchLocations integration test", () => {
  it("should return 200 status code", async () => {
    const event = createEvent("Piccadilly");
    const result = (await handler(event)) as APIGatewayProxyStructuredResultV2;

    assert.strictEqual(result.statusCode, 200);
  });

  it("should return an array of locations", async () => {
    const event = createEvent("Piccadilly");
    const result = (await handler(event)) as APIGatewayProxyStructuredResultV2;

    const body = JSON.parse(result.body as string);
    assert.ok(Array.isArray(body), "Response body should be an array");
  });

  it("should return locations with correct shape", async () => {
    const event = createEvent("Piccadilly");
    const result = (await handler(event)) as APIGatewayProxyStructuredResultV2;

    const body = JSON.parse(result.body as string);
    assert.ok(body.length > 0, "Should return at least one location");

    const location = body[0];
    assert.ok("atcoCode" in location, "Location should have atcoCode");
    assert.ok("name" in location, "Location should have name");
    assert.ok("services" in location, "Location should have services");
    assert.ok(Array.isArray(location.services), "services should be an array");
  });

  it("should return services with correct shape", async () => {
    const event = createEvent("Piccadilly");
    const result = (await handler(event)) as APIGatewayProxyStructuredResultV2;

    const body = JSON.parse(result.body as string);
    const locationWithServices = body.find(
      (loc: { services: unknown[] }) => loc.services.length > 0
    );

    if (locationWithServices) {
      const service = locationWithServices.services[0];
      assert.ok("id" in service, "Service should have id");
      assert.ok("name" in service, "Service should have name");
    }
  });

  it("should return empty array for non-matching search", async () => {
    const event = createEvent("ZZZZNONEXISTENT");
    const result = (await handler(event)) as APIGatewayProxyStructuredResultV2;

    const body = JSON.parse(result.body as string);
    assert.ok(Array.isArray(body), "Response body should be an array");
    assert.strictEqual(body.length, 0, "Should return empty array for non-matching search");
  });
});
