import { LeitnerBoxLevels, LeitnerRank } from "../../types/LeitnerBox.type";
import { leitnerLevelsRank } from "./LeitnerConstants";

export function getLeitnerRankForLevel(level: LeitnerBoxLevels): LeitnerRank {
  const levelRank = leitnerLevelsRank.find(
    (levelRank) => levelRank.level === level
  );
  return levelRank ? levelRank.rank : "TO TEST";
}
