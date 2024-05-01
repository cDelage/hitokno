import styled, { css } from "styled-components";
import { LeitnerRank } from "../../types/LeitnerBox.type";

const LeitnerLabelStyled = styled.div<{ $rank: LeitnerRank }>`
  padding: 2px 4px;
  border-radius: 8px;
  min-width: 50px;
  font-size: 0.8rem;
  display: flex;
  justify-content: center;
  box-shadow: var(--shadow-shape-menu-md);

  ${(props) =>
    props.$rank === "TO TEST" &&
    css`
      background-color: var(--color-gray-200);
      color: var(--color-gray-600);
    `}
  ${(props) =>
    props.$rank === "BRONZE" &&
    css`
      background: linear-gradient(45deg, #b45309, #f59e0b);
      color: #fffbeb;
    `}
      ${(props) =>
    props.$rank === "SILVER" &&
    css`
      background: linear-gradient(45deg, #94a3b8, #e2e8f0);
      color: var(--color-gray-900);
    `}
    ${(props) =>
    props.$rank === "GOLD" &&
    css`
      background: linear-gradient(45deg, #facc15, #fef08a);
      color: #854d0e;
    `}
`;

function LeitnerLabel({ rank }: { rank: LeitnerRank }) {
  return <LeitnerLabelStyled $rank={rank}>{rank}</LeitnerLabelStyled>;
}

export default LeitnerLabel;
