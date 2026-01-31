import { describe, it } from "node:test";
import assert from "node:assert";
import type { GetTransportModesResponse } from "@app/queries/index.ts";
import "./setup.ts";

// Set env var BEFORE importing the handler
process.env.TFGM_API_URL = "https://apiary.tfgm.com";

const { handler } = await import("@app/get-transport-modes.ts");

interface LambdaResponse {
  statusCode: number;
  body: string;
}

describe("getTransportModes integration tests", () => {
  it("should return 200 status code", async () => {
    const response = (await handler()) as LambdaResponse;

    assert.strictEqual(response.statusCode, 200);
  });

  it("should return valid JSON body", async () => {
    const response = (await handler()) as LambdaResponse;
    const body = JSON.parse(response.body) as GetTransportModesResponse;

    assert.ok(body.transportModes, "Response should contain transportModes");
  });

  it("should return transport modes as an array", async () => {
    const response = (await handler()) as LambdaResponse;
    const body = JSON.parse(response.body) as GetTransportModesResponse;

    assert.ok(
      Array.isArray(body.transportModes),
      "transportModes should be an array"
    );
  });

  it("should return transport modes with services", async () => {
    const response = (await handler()) as LambdaResponse;
    const body = JSON.parse(response.body) as GetTransportModesResponse;
    const transportModes = body.transportModes;

    if (transportModes.length > 0) {
      const mode = transportModes[0];
      assert.ok(
        Array.isArray(mode.services),
        "Each transport mode should have a services array"
      );
    }
  });

  it("should return services with expected structure", async () => {
    const response = (await handler()) as LambdaResponse;
    const body = JSON.parse(response.body) as GetTransportModesResponse;
    const transportModes = body.transportModes;

    if (transportModes.length > 0 && transportModes[0].services.length > 0) {
      const service = transportModes[0].services[0];
      assert.ok(service.id, "Service should have an id");
      assert.ok(service.name, "Service should have a name");
      assert.ok(Array.isArray(service.operators), "Service should have operators array");
    }
  });
});
