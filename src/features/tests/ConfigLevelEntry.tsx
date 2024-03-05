import styled from "styled-components";
import Star from "../../ui/icons/Star";
import { useCallback, useMemo } from "react";
import Row from "../../ui/Row";
import { FlashCard } from "../../types/Flashcard.type";

const ConfigLevelStarLineStyled = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  padding: 8px 0px 8px 36px;
  &:hover{
    background-color: var(--color-gray-100);
  }
`;

const StarContainer = styled.div`
  height: 20px;
  display: flex;
  gap: 4px;
`;

function ConfigLevelEntry({
  level,
  deck,
  isChecked,
  disabled,
  changeEvent
}: {
  level: number;
  deck: FlashCard[];
  isChecked: boolean;
  disabled: boolean;
  changeEvent : (level : number) => void;
}) {
  const fill = useCallback(
    (target: number) => {
      return target <= level
        ? "var(--color-secondary-600)"
        : "var(--color-gray-500)";
    },
    [level]
  );

  const getCount = useMemo<number>(() => {
    return deck.reduce((acc, cur) => {
      return acc + ((cur.level === level) ? 1 : 0);
    }, 0);
  }, [deck, level]);

  return (
    <ConfigLevelStarLineStyled>
      <input type="checkbox" checked={isChecked} onChange={() => changeEvent(level)} disabled={disabled}/>
      <Row $gap={4}>
        <StarContainer>
          <Star fill={fill(0)} />
          <Star fill={fill(1)} />
          <Star fill={fill(2)} />
        </StarContainer>
        <span>:</span> 
        <span>{getCount} Cards</span>
      </Row>
    </ConfigLevelStarLineStyled>
  );
}

export default ConfigLevelEntry;
