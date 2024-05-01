import styled from "styled-components";
import { Column } from "../../ui/Row";
import { useLeitnerBox } from "./useLeitnerBox";
import LeitnerLabel from "./LeitnerLabel";
import { getLeitnerRankForLevel } from "./getLeitnerRankForLevel";

const LevelBox = styled.div`
  display: flex;
  padding: 8px;
  background-color: white;
  border-radius: 8px;
  box-shadow: var(--shadow-md);
  width: 250px;
  max-width: 250px;
  cursor: pointer;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  &:hover {
    background-color: var(--bg-element-hover);
  }
`;

const BoxTitle = styled.div`
  font-size: 1.5rem;
`;

function LevelBoxesList() {
  const { leitnerBox } = useLeitnerBox();

  if (!leitnerBox) return null;

  return (
    <Column $gap={4}>
      {leitnerBox.map((box) => (
        <LevelBox key={box.level}>
          <Column $gap={4}>
            <BoxTitle>
              {box.level === 6 ? "Mastered" : `Box ${box.level}`}
            </BoxTitle>
            <div>{box.cardList.length} cards</div>
          </Column>
          <LeitnerLabel rank={getLeitnerRankForLevel(box.level)} />
        </LevelBox>
      ))}
    </Column>
  );
}

export default LevelBoxesList;
