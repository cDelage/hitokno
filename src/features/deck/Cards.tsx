import styled from "styled-components";
import FlashCard from "./FlashCard";
import useDeckStore from "./useDeckStore";
import FlashcardToolbar from "./FlashcardToolbar";
import { useCallback, useRef, useEffect, useState } from "react";
import { FlashCardProps } from "../../types/Flashcard.type";
import { Grid } from "react-window";

const CardsStyled = styled.div`
  flex: 1;
  min-height: 0;
  overflow: hidden;
`;

const CellContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 60px 8px 32px 8px;
  overflow: visible;
`;

const CellWrapper = styled.div`
  overflow: visible;
`;

interface CustomCellProps {
  deck: FlashCardProps[];
  columnCount: number;
  selectCard: (cardId: string) => void;
  updateCard: (card: FlashCardProps) => void;
  handleClickOutside: (card: FlashCardProps) => void;
  handleSelectedSpaceEvent: (card: FlashCardProps) => void;
}

function Cards() {
  const { deck, selectCard, updateCard } = useDeckStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

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
      if (card.state == "DEFAULT") {
        updateCard({
          ...card,
          state: "ANSWER-DISPLAYED",
        });
      } else if (card.state === "ANSWER-DISPLAYED") {
        updateCard({
          ...card,
          state: "DEFAULT",
        });
      }
    },
    [updateCard]
  );

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const CARD_WIDTH = 300;
  const CARD_HEIGHT = 440;
  const HORIZONTAL_GAP = 16;
  const VERTICAL_GAP = 64;
  const TOOLBAR_HEIGHT = 60; // Extra space for toolbar above card
  const COLUMN_WIDTH = CARD_WIDTH + HORIZONTAL_GAP;
  const ROW_HEIGHT = CARD_HEIGHT + VERTICAL_GAP + TOOLBAR_HEIGHT;

  const columnCount = Math.max(1, Math.floor(dimensions.width / COLUMN_WIDTH));
  const rowCount = Math.ceil(deck.length / columnCount);

  const Cell = useCallback(
    ({
      columnIndex,
      rowIndex,
      style,
      deck,
      columnCount,
      selectCard,
      updateCard,
      handleClickOutside,
      handleSelectedSpaceEvent,
    }: {
      columnIndex: number;
      rowIndex: number;
      style: React.CSSProperties;
    } & CustomCellProps) => {
      const index = rowIndex * columnCount + columnIndex;
      if (index >= deck.length) return null;

      const card = deck[index];
      return (
        <CellWrapper style={style}>
          <CellContent>
            <FlashCard
              card={card}
              onClick={() => selectCard(card.cardId)}
              eventSelectedClickOutside={() => handleClickOutside(card)}
              onUpdate={updateCard}
              onSelectedSpaceEvent={() => handleSelectedSpaceEvent(card)}
            >
              <FlashcardToolbar card={card} />
            </FlashCard>
          </CellContent>
        </CellWrapper>
      );
    },
    []
  );

  if (dimensions.width === 0 || dimensions.height === 0) {
    return <CardsStyled ref={containerRef} />;
  }

  return (
    <CardsStyled ref={containerRef}>
      <Grid<CustomCellProps>
        cellComponent={Cell}
        cellProps={{
          deck,
          columnCount,
          selectCard,
          updateCard,
          handleClickOutside,
          handleSelectedSpaceEvent,
        }}
        columnCount={columnCount}
        columnWidth={COLUMN_WIDTH}
        rowCount={rowCount}
        rowHeight={ROW_HEIGHT}
        overscanCount={2}
      />
    </CardsStyled>
  );
}

export default Cards;
