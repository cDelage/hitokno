import styled from "styled-components";
import { FileShort } from "../../types/Repository.types";
import Row from "../../ui/Row";
import { IoChevronForwardOutline } from "react-icons/io5";
import { ChangeEvent, MouseEvent, useCallback, useMemo, useState } from "react";
import SettingsDeckEntryLevel from "./SettingsDeckEntryLevel";
import useTestStore from "./useTestStore";

const DeckEntryContainer = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  border-bottom: 1px solid var(--color-gray-300);
  user-select: none;
  overflow: hidden;
  background-color: var(--bg-element);
`;

const DeckEntryStyled = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 12px;
  cursor: pointer;
  &:hover {
    background-color: var(--color-gray-100);
  }
`;

const CardsCount = styled.div`
  color: var(--text-main-medium);
`;

function SettingsDeckEntry({ file, disabled }: { file: FileShort, disabled: boolean }) {
  const [isExpand, setIsExpand] = useState(false);
  const { getDeckTestConfig, updateTest, test } = useTestStore();
  const deckTestConfig = getDeckTestConfig(file._id);

  

  const isChecked = useMemo(
    () => deckTestConfig !== undefined,
    [deckTestConfig]
  );

  const handleCheckbox = useCallback(
    (e: ChangeEvent) => {
      e.stopPropagation();
      if (deckTestConfig === undefined && test) {
        updateTest({
          ...test,
          decks: [
            ...test.decks,
            {
              fileId: file._id,
              fileName: file.fileName,
              level0: true,
              level1: true,
              level2: true,
            },
          ],
        });
      } else if (deckTestConfig !== undefined && test) {
        updateTest({
          ...test,
          decks: test.decks.filter((deck) => deck.fileId !== file._id),
        });
      }
    },
    [updateTest, test, file._id, file.fileName, deckTestConfig]
  );

  const chevronStyle = useMemo(() => {
    return {
      transform: isExpand ? "rotate(90deg)" : "rotate(0deg)",
      transition: "transform .2s ease-out",
    };
  }, [isExpand]);

  const getIsSublineChecked = useCallback(
    (level: number): boolean => {
      if (!deckTestConfig) return false;
      if (level === 0) return deckTestConfig.level0;
      if (level === 1) return deckTestConfig.level1;
      if (level === 2) return deckTestConfig.level2;
      return false;
    },
    [deckTestConfig]
  );

  const handleChangeSubline = useCallback((level: number) => {
    if (test) {
      updateTest({
        ...test,
        decks: test.decks.map((deck) => {
          if (deck.fileId !== file._id) {
            return deck;
          } else {
            return {
              ...deck,
              level0: level === 0 ? !deck.level0 : deck.level0,
              level1: level === 1 ? !deck.level1 : deck.level1,
              level2: level === 2 ? !deck.level2 : deck.level2,
            };
          }
        }),
      });
    }
  }, [file._id, test, updateTest]);

  const handleStopPropagation = useCallback(
    (e: MouseEvent<HTMLInputElement>) => {
      e.stopPropagation();
    },
    []
  );

  return (
    <DeckEntryContainer>
      <DeckEntryStyled
        onClick={() => {
          setIsExpand((x) => !x);
        }}
      >
        <Row $gap={8} $style={{alignItems: "center"}}>
          <input
            type="checkbox"
            checked={isChecked}
            onClick={handleStopPropagation}
            onChange={handleCheckbox}
            disabled={disabled}
          />
          <IoChevronForwardOutline style={chevronStyle} size={16} />
          {file.fileName}
        </Row>
        <CardsCount>{file.deck.length} Cards</CardsCount>
      </DeckEntryStyled>
      {isExpand && (
        <>
          <SettingsDeckEntryLevel
            deck={file.deck}
            level={0}
            isChecked={getIsSublineChecked(0)}
            disabled={disabled || !isChecked}
            changeEvent={handleChangeSubline}
            />
          <SettingsDeckEntryLevel
            deck={file.deck}
            level={1}
            isChecked={getIsSublineChecked(1)}
            disabled={disabled || !isChecked}
            changeEvent={handleChangeSubline}
            />
          <SettingsDeckEntryLevel
            deck={file.deck}
            level={2}
            isChecked={getIsSublineChecked(2)}
            disabled={disabled || !isChecked}
            changeEvent={handleChangeSubline}
          />
        </>
      )}
    </DeckEntryContainer>
  );
}

export default SettingsDeckEntry;
