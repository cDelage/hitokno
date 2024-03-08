import styled, { CSSProp, css } from "styled-components";
import { Column } from "../../ui/Row";
import Button from "../../ui/Button";
import useTestStore from "./useTestStore";
import { useCallback, useEffect } from "react";
import { CardTestResult } from "../../types/Test.type";
import {
  IoArrowForwardCircle,
} from "react-icons/io5";

const ActionStyle: CSSProp = {
  gap: "16px",
  flexGrow: 1,
  justifyContent: "center",
};

const Option = styled.div<{ disabled: boolean; selected: boolean }>`
  padding: 20px;
  border-radius: 8px;
  box-shadow: var(--shadow-md);
  box-sizing: border-box;

  ${(props) =>
    props.disabled
      ? css`
          background-color: var(--bg-button-disabled);
          color: var(--text-button-disabled);
          cursor: not-allowed;
        `
      : props.selected
      ? css`
          background-color: var(--color-primary-600);
          color: var(--color-white);
          cursor: pointer;
        `
      : css`
          background-color: var(--color-primary-50);
          color: var(--text-main-dark);
          cursor: pointer;

          &:hover {
            background-color: var(--color-primary-200);
          }
        `}
`;

function InProgressAction() {
  const { getCurrentCard, updateCurrentCard } = useTestStore();
  const card = getCurrentCard();

  const setResult = useCallback(
    (result: CardTestResult) => {
      if (
        result &&
        card &&
        card.result !== result &&
        card.state === "ANSWER-DISPLAYED"
      ) {
        updateCurrentCard({
          ...card,
          result,
        });
      }
    },
    [card, updateCurrentCard]
  );

  const handleGoNextCard = useCallback(() => {
    if (card && card.result) {
      updateCurrentCard({
        ...card,
        isComplete: true,
      });
    }
  }, [updateCurrentCard, card]);

  const handleKey = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "R" || event.key === "r") {
        setResult("MASTERED");
      }
      if (event.key === "F" || event.key === "f") {
        setResult("HESITATED");
      }
      if (event.key === "V" || event.key === "v") {
        setResult("FAILED");
      }
      if (event.key === "Enter") {
        handleGoNextCard();
      }
    },
    [setResult, handleGoNextCard]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKey);

    return () => {
      document.removeEventListener("keydown", handleKey);
    };
  }, [handleKey]);

  if (!card) return null;

  const { state, result } = card;

  const disabledOptions = state !== "ANSWER-DISPLAYED";
  const disableButton = result === undefined;

  return (
    <>
      <Column $style={ActionStyle}>
        <Option
          disabled={disabledOptions}
          selected={result === "MASTERED"}
          onClick={() => setResult("MASTERED")}
        >
          Mastered (R)
        </Option>
        <Option
          disabled={disabledOptions}
          selected={result === "HESITATED"}
          onClick={() => setResult("HESITATED")}
        >
          Hesitated (F)
        </Option>
        <Option
          disabled={disabledOptions}
          selected={result === "FAILED"}
          onClick={() => setResult("FAILED")}
        >
          Failed (V)
        </Option>
      </Column>
      <Button
        type="primary"
        disabled={disableButton}
        onClick={handleGoNextCard}
      >
        <IoArrowForwardCircle size={24} /> Next card (enter)
      </Button>
    </>
  );
}

export default InProgressAction;
