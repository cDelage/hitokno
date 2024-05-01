import { LeitnerRank } from "./LeitnerBox.type";

export type FlashCardState = "DEFAULT" | "ANSWER-DISPLAYED" | "EDIT";

export type FlashCard = {
  cardId: string;
  level: number;
  body: string;
  answer: string;
  leitnerRank?: LeitnerRank;
  isIntoLeitnerBox?: boolean | undefined;
};

export type FlashCardProps = FlashCard & {
  deckLabel: string;
  state: FlashCardState;
  selected: boolean;
};

export type FlashCardLeitnerBox = FlashCard & {
  leitnerNextDate?: Date;
  fileId: string;
  deckLabel: string;
};
