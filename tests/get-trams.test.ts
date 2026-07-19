import "./setup.ts";
import { describe, it } from "node:test";
import assert from "node:assert";
import type { APIGatewayProxyEventV2, APIGatewayProxyStructuredResultV2 } from "aws-lambda";

// Set env var before importing handler
process.env.TFGM_API_URL = "https://apiary.tfgm.com";

const { handler } = await import("@app/handlers/get-trams.ts");

// Piccadilly Gardens atcoCode
const PICCADILLY_GARDENS_ATCO = "9400ZZMAPGD";

const createEvent = (atcoCode: string) =>
  ({
    queryStringParameters: { atcoCode },
  }) as unknown as APIGatewayProxyEventV2;

describe("getTrams integration test", () => {
  it("should return 200 status code", async () => {
    const event = createEvent(PICCADILLY_GARDENS_ATCO);
    const result = (await handler(event)) as APIGatewayProxyStructuredResultV2;

    console.log(result);

    assert.strictEqual(result.statusCode, 200);
  });

  it("should return an array of trams", async () => {
    const event = createEvent(PICCADILLY_GARDENS_ATCO);
    const result = (await handler(event)) as APIGatewayProxyStructuredResultV2;

    const body = JSON.parse(result.body as string);
    assert.ok(Array.isArray(body), "Response body should be an array");
  });

  it("should return trams with correct shape", async () => {
    const event = createEvent(PICCADILLY_GARDENS_ATCO);
    const result = (await handler(event)) as APIGatewayProxyStructuredResultV2;

    const body = JSON.parse(result.body as string);

    // Only check shape if there are trams (there might not be any late at night)
    if (body.length > 0) {
      const tram = body[0];
      assert.ok("carriages" in tram, "Tram should have carriages");
      assert.ok("destinationDisplay" in tram, "Tram should have destinationDisplay");
      assert.ok("status" in tram, "Tram should have status");
      assert.ok("due" in tram, "Tram should have due");
    }
  });

  it("should return trams with correct types", async () => {
    const event = createEvent(PICCADILLY_GARDENS_ATCO);
    const result = (await handler(event)) as APIGatewayProxyStructuredResultV2;

    const body = JSON.parse(result.body as string);

    if (body.length > 0) {
      const tram = body[0];
      assert.strictEqual(typeof tram.carriages, "string", "carriages should be a string");
      assert.strictEqual(
        typeof tram.destinationDisplay,
        "string",
        "destinationDisplay should be a string",
      );
      assert.strictEqual(typeof tram.status, "string", "status should be a string");
      assert.strictEqual(typeof tram.due, "number", "due should be a number");
    }
  });

  it("should return an error for invalid atcoCode", async () => {
    const event = createEvent("INVALID_ATCO_CODE");
    const result = (await handler(event)) as APIGatewayProxyStructuredResultV2;

    assert.strictEqual(result.statusCode, 500);
    assert.strictEqual(result.body, '{"error":"Failed to fetch trams"}');
  });
});
