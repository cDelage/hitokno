import { FlashCardProps } from "./Flashcard.type";

export type TestStatus = "DRAFT" | "IN PROGRESS" | "COMPLETE";

export type CardTestResult = "MASTERED" | "HESITATED" | "FAILED" | undefined;

export type FlashCardTestProps = FlashCardProps & {
  result: CardTestResult;
  isComplete: boolean;
};

export type TestType = {
  _id: string;
  testName: string;
  decks: string[];
  status: TestStatus;
  cards: FlashCardTestProps[];
};

export type CreateTestProps = {
  decks : string[]
}