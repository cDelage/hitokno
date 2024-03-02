import styled from "styled-components";
import FlashCard from "./FlashCard";
import useDeckStore from "./useDeckStore";
import FlashcardToolbar from "./FlashcardToolbar";
import { useCallback } from "react";
import { FlashCardProps } from "../../types/Flashcard.type";

const CardsStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-column-gap: 16px;
  grid-row-gap: 64px;
  overflow-y: auto;
  padding: 64px 32px;
`;

function Cards() {
  const { deck, selectCard, updateCard } = useDeckStore();
  const handleClickOutside = useCallback(
    (card: FlashCardProps) => {
      updateCard({
        ...card,
        state: "DEFAULT",
      });
      selectCard(undefined);
    },
    [updateCard, selectCard]
  );

  const handleSelectedSpaceEvent = useCallback(
    (card: FlashCardProps) => {
      if(card.state == "DEFAULT"){
        updateCard({
          ...card,
          state: "ANSWER-DISPLAYED",
        });
      }else if(card.state === "ANSWER-DISPLAYED"){
        updateCard({
          ...card,
          state: "DEFAULT",
        })
      }
    },
    [updateCard]
  );

  return (
    <CardsStyled>
      {deck.map((card) => (
        <FlashCard
          key={card.cardId}
          card={card}
          onClick={() => selectCard(card.cardId)}
          eventSelectedClickOutside={() => handleClickOutside(card)}
          onUpdate={updateCard}
          onSelectedSpaceEvent={() => handleSelectedSpaceEvent(card)}
        >
          <FlashcardToolbar card={card} />
        </FlashCard>
      ))}
    </CardsStyled>
  );
}

export default Cards;
