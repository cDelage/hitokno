import { FlashCardProps } from "./Flashcard.type";
import { TagTheme } from "./TagTheme.type";

export type TestStatus = "DRAFT" | "IN PROGRESS" | "COMPLETE";

export type TestStatusTheme = {
  status: TestStatus;
  theme: TagTheme;
};

export type CardTestResult = "MASTERED" | "HESITATED" | "FAILED" | undefined;

export type CountResult = {
  mastered: number;
  hesitated: number;
  failed: number;
};

export type SortMode = "RANDOM-CARDS" | "RANDOM-DECKS" | "ORDERED";

export type FlashCardTestProps = FlashCardProps & {
  result: CardTestResult;
  isComplete: boolean;
};

export type DeckTestConfig = {
  fileId: string;
  fileName: string;
  level0: boolean;
  level1: boolean;
  level2: boolean;
};

export type TestType = {
  _id: string;
  testName: string;
  decks: DeckTestConfig[];
  status: TestStatus;
  cards: FlashCardTestProps[];
  sortMode: SortMode;
  updatedAt?: Date;
  deckOrderedRandomCardOrder: boolean;
};

export type CreateTestProps = {
  decks: DeckTestConfig[];
};

export type SearchByCriteriaResult = {
  total: number;
  tests: TestType[]
}