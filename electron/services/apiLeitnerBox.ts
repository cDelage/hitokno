import { LeitnerBoxes } from "../../src/features/leitnerBox/LeitnerConstants";
import { FlashCardLeitnerBox } from "../../src/types/Flashcard.type";
import { LeitnerBoxType } from "../../src/types/LeitnerBox.type";
import { db } from "../database";
import { setLeitnerRankToCard } from "./apiRepository";

export async function initLeitnerBox() {
  const leitnerboxEntry = (await db.leitnerbox.findOne({})) as LeitnerBoxType;
  if (!leitnerboxEntry) {
    db.leitnerbox.insert(LeitnerBoxes);
  }
}

export async function getLeitnerBox(): Promise<LeitnerBoxType[]> {
  return (await db.leitnerbox.find({})) as LeitnerBoxType[];
}

export async function pushCardToLeitnerBox(card: FlashCardLeitnerBox) {
  const leitnerBox = (await db.leitnerbox.findOne({
    level: 1,
  })) as LeitnerBoxType;
  leitnerBox.cardList.push(card);
  const result = await db.leitnerbox.updateOne({ level: 1 }, leitnerBox);
  await setLeitnerRankToCard({
    fileId: card.fileId,
    cardId: card.cardId,
    rank: "TO TEST",
    isIntoLeitnerBox: true
  });

  return result;
}
