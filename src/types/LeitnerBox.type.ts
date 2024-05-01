import { FlashCardLeitnerBox } from "./Flashcard.type";
export type LeitnerRank = "TO TEST" | "BRONZE" | "SILVER" | "GOLD";

export type LeitnerBoxLevels = 1 | 2 | 3 | 4 | 5 | 6;

export type LeitnerBoxType = {
    _id?: string;
    level: LeitnerBoxLevels;
    cardList : FlashCardLeitnerBox[];
}

export type LeitnerLevelsRank = {
    level: LeitnerBoxLevels;
    rank : LeitnerRank;
}