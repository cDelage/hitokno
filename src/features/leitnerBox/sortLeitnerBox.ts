import { LeitnerBoxType } from "../../types/LeitnerBox.type";

export function sortLeitnerBox(leitnerBox: LeitnerBoxType[]) {
  return leitnerBox.sort((a, b) => {
    return a.level - b.level;
  });
}
