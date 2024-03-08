import { useCallback } from "react";
import FlashCard from "../deck/FlashCard";
import useTestStore from "./useTestStore";

function CurrentCard() {
  const { getCurrentCard, updateCurrentCard } = useTestStore();
  const currentCard = getCurrentCard();

  const handleShowAnswer = useCallback(() => {
    if (currentCard && currentCard.state !== "ANSWER-DISPLAYED") {
      updateCurrentCard({
        ...currentCard,
        state: "ANSWER-DISPLAYED",
      });
    }
  }, [updateCurrentCard, currentCard]);

  if (!currentCard) return null;

  return <FlashCard key={currentCard.cardId} card={currentCard} spaceEvent={handleShowAnswer} onClick={handleShowAnswer} />;
}

export default CurrentCard;
