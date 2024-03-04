import { FlashCardProps } from "./Flashcard.type";

export type TestStatus = "DRAFT" | "IN PROGRESS" | "COMPLETE";

export type CardTestResult = "MASTERED" | "HESITATED" | "FAILED" | undefined;

export type SortMode = "RANDOM-CARDS" | "RANDOM-DECKS" | "ORDERED"

export type FlashCardTestProps = FlashCardProps & {
  result: CardTestResult;
  isComplete: boolean;
};

export type DeckTestConfig = {
  fileId: string;
  level0: boolean;
  level1: boolean;
  level2: boolean;
}

export type TestType = {
  _id: string;
  testName: string;
  decks: DeckTestConfig[];
  status: TestStatus;
  cards: FlashCardTestProps[];
  sortMode : SortMode;
};

export type CreateTestProps = {
  decks : DeckTestConfig[]
}