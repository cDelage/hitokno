import styled from "styled-components";
import { FlashCardProps } from "../../types/Flashcard.type";
import Star from "../../ui/icons/Star";
import { useCallback, useMemo, useState } from "react";

const LevelLineStyled = styled.div`
  height: 60%;
  display: flex;
  align-items: center;
`;

function LevelLine({
  card,
  onUpdate,
}: {
  card: FlashCardProps;
  onUpdate?: (card: FlashCardProps) => void;
}) {
  const [hoverState, setHoverState] = useState<number | undefined>(undefined);
  const isEditMode = useMemo(() => card.state === "EDIT", [card]);

  const getColor = useCallback(
    (level: number): string => {
      if (card.state !== "EDIT") {
        return card.level >= level
          ? "var(--color-secondary-600)"
          : "var(--color-gray-500)";
      } else {
        if (hoverState == undefined) {
          return card.level >= level
            ? "var(--color-secondary-600)"
            : "var(--color-gray-500)";
        } else {
          return level > hoverState
            ? "var(--color-gray-500)"
            : "var(--color-secondary-600)";
        }
      }
    },
    [card, hoverState]
  );

  const handleSetLevel = useCallback(
    (level: number) => {
      if (isEditMode) {
        onUpdate?.({
          ...card,
          level,
        } as FlashCardProps);
      }
    },
    [isEditMode, onUpdate, card]
  );

  return (
    <LevelLineStyled>
      <Star
        fill={getColor(0)}
        onMouseEnter={() => setHoverState(0)}
        onMouseLeave={() => setHoverState(undefined)}
        cursorPointer={isEditMode}
        onClick={() => handleSetLevel(0)}
      />
      <Star
        fill={getColor(1)}
        onMouseEnter={() => setHoverState(1)}
        onMouseLeave={() => setHoverState(undefined)}
        cursorPointer={isEditMode}
        onClick={() => handleSetLevel(1)}
      />
      <Star
        fill={getColor(2)}
        onMouseEnter={() => setHoverState(2)}
        onMouseLeave={() => setHoverState(undefined)}
        cursorPointer={isEditMode}
        onClick={() => handleSetLevel(2)}
      />
    </LevelLineStyled>
  );
}

export default LevelLine;
