export type FlashCardState = "DEFAULT" | "ANSWER-DISPLAYED" | "EDIT";


export type FlashCard = {
  cardId: string;
  level: number;
  body: string;
  answer: string;
  leitnerRank?: "TO TEST" | "BRONZE" | "SILVER" | "GOLD";
  leitnerLevel?: number;
  leitnerNextDate?: Date;
};

export type FlashCardProps = FlashCard & {
  deckLabel: string;
  state: FlashCardState;
  selected: boolean;
};

