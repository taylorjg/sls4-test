import type { Service } from "./service.ts";

export interface SearchLocation {
  atcoCode: string;
  name: string;
  services: Service[];
}
