import styled from "styled-components";
import DeckIcon from "../../ui/icons/DeckIcon";
import Row from "../../ui/Row";
import Button from "../../ui/Button";
import { IoAdd, IoPlay } from "react-icons/io5";
import useDeckStore from "./useDeckStore";
import { MouseEvent, useCallback } from "react";

const DeckHeaderStyled = styled.div`
  display: flex;
  gap: 20px;
  padding: 20px 32px;
`;

const DeckIconContainer = styled.div`
  height: 80px;
`;

const Title = styled.h1`
  font-size: 2.2rem;
  font-weight: 600;
`;

const CountFlashcards = styled.div`
  font-size: 1.2rem;
`;

function DeckHeader() {
  const { deck, fileName, createFlashcard, selectCard } = useDeckStore();
  const count = deck.length;

  const handleCreateNewFlashCard = useCallback((e : MouseEvent) => {
    e.stopPropagation();
    const id = createFlashcard();
    console.log(id)
    selectCard(id);
  }, [createFlashcard, selectCard]);

  return (
    <DeckHeaderStyled>
      <DeckIconContainer>
        <DeckIcon />
      </DeckIconContainer>
      <Row $flexDirection="column" $gap={8} $justifyContent="space-between">
        <Title>Deck - {fileName}</Title>
        <Row $flexDirection="row" $gap={16} $alignItems="center">
          <CountFlashcards>{count} flashcards</CountFlashcards>
          <Row $flexDirection="row" $gap={8} $alignItems="center">
            <Button
              type="primary"
              $icon={true}
              onClick={handleCreateNewFlashCard}
            >
              <IoAdd size={16} /> New flash-card
            </Button>
            <Button type="primary" $icon={true}>
              <IoPlay size={16} /> Play test
            </Button>
          </Row>
        </Row>
      </Row>
    </DeckHeaderStyled>
  );
}

export default DeckHeader;
