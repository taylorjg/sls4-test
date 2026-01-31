import type { Line } from "./line.ts";

export interface SearchLocation {
  atcoCode: string;
  name: string;
  lines: Line[];
}
