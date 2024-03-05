import styled from "styled-components";
import DeckIcon from "../../ui/icons/DeckIcon";
import Row, { Column } from "../../ui/Row";
import Button from "../../ui/Button";
import { IoAdd, IoPlay } from "react-icons/io5";
import useDeckStore from "./useDeckStore";
import { MouseEvent, useCallback } from "react";
import useCreateTest from "../tests/useCreateTest";
import { useParams } from "react-router-dom";

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
  const { createTest } = useCreateTest();
  const { fileId } = useParams();

  const handleCreateNewFlashCard = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation();
      const id = createFlashcard();
      selectCard(id);
    },
    [createFlashcard, selectCard]
  );

  const handleCreateTest = useCallback(() => {
    if (fileId) {
      createTest([
        {
          fileId,
          level0: true,
          level1: true,
          level2: true,
        },
      ]);
    }
  }, [createTest, fileId]);

  return (
    <DeckHeaderStyled>
      <DeckIconContainer>
        <DeckIcon />
      </DeckIconContainer>
      <Column $gap={8} $style={{justifyContent: "space-between"}}>
        <Title>Deck - {fileName}</Title>
        <Row $gap={16}  $style={{alignItems: "center"}}>
          <CountFlashcards>{count} flashcards</CountFlashcards>
          <Row  $gap={8} $style={{alignItems: "center"}}>
            <Button
              type="primary"
              $icon={true}
              onClick={handleCreateNewFlashCard}
            >
              <IoAdd size={16} /> New flash-card
            </Button>
            <Button type="primary" $icon={true} onClick={handleCreateTest}>
              <IoPlay size={16} /> Play test
            </Button>
          </Row>
        </Row>
      </Column>
    </DeckHeaderStyled>
  );
}

export default DeckHeader;
