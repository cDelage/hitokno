import styled, { CSSProp } from "styled-components";
import { CardTestResult } from "../../types/Test.type";
import { ReactElement, useMemo, useState } from "react";
import { IoChevronForwardOutline } from "react-icons/io5";
import Row from "../../ui/Row";
import useTestStore from "./useTestStore";
import FlashCard from "../deck/FlashCard";

const TestResultLineHeader = styled.div`
  height: 48px;
  min-height: 48px;
  background-color: var(--bg-element);
  display: flex;
  align-items: center;
  border-radius: 4px;
  box-shadow: var(--shadow-md);
  padding: 0px 16px;
  cursor: pointer;
  font-weight: 500;
  user-select: none;
`;

const CardsStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-column-gap: 16px;
  grid-row-gap: 16px;
`;

const RowStyled: CSSProp = {
  alignItems: "center",
};

const CountCards: CSSProp = {
  fontWeight: 400,
  color: "var(--text-main-medium)"
};

function TestResultLine({
  result,
  icon,
  count,
}: {
  result: CardTestResult;
  icon: ReactElement;
  count: number;
}) {
  const [isExpand, setIsExpand] = useState(true);
  const { getCardsByResult } = useTestStore();
  const cards = useMemo(
    () => getCardsByResult(result),
    [getCardsByResult, result]
  );

  const chevronStyle = {
    transform: isExpand ? "rotate(90deg)" : "rotate(0deg)",
    transition: "transform .2s ease-out",
  };

  return (
    <>
      <TestResultLineHeader onClick={() => setIsExpand((s) => !s)}>
        <Row $gap={16} $style={RowStyled}>
          <IoChevronForwardOutline style={chevronStyle} />
          <Row $gap={4} $style={RowStyled}>
            {icon}
            {result}
          </Row>
          <Row $style={CountCards}>{count} cards</Row>
        </Row>
      </TestResultLineHeader>
      {cards.length > 0 && isExpand && (
        <CardsStyled>
          {cards.map((card) => (
            <FlashCard card={card} />
          ))}
        </CardsStyled>
      )}
    </>
  );
}

export default TestResultLine;
