
import { contaminantsData } from './data';
import { Contaminant } from "./types/types";

export function getRfD(contaminantName: string): number | undefined {
  const found = (contaminantsData as Contaminant[])
    .find(c => c.name.toLowerCase() === contaminantName.toLowerCase());
  return found?.rfd;
}

export function listContaminants(): string[] {
  return (contaminantsData as Contaminant[]).map(c => c.name);
}