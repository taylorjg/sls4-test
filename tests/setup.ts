import { mock } from "node:test";

// Suppress console output during tests
export const silenceConsole = () => {
  mock.method(console, "log", () => {});
  mock.method(console, "error", () => {});
  mock.method(console, "warn", () => {});
  mock.method(console, "info", () => {});
};

// Call immediately to silence from the start
silenceConsole();
