import styled, { css } from "styled-components";
import { FlashCardProps } from "../../types/Flashcard.type";
import LevelLine from "./LevelLine";
import {
  ChangeEvent,
  MouseEvent,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import { useDivClickOutside } from "../../hooks/useDivClickOutside";
import TextAreaEditable from "../../ui/TextAreaEditable";
import { IoArrowDown } from "react-icons/io5";
import { CSSTransition } from "react-transition-group";

const CardRelativeContainer = styled.div`
  position: relative;
  font-size: 1.2rem;
`;

const CardStyled = styled.div<{ $selected?: boolean }>`
  height: 440px;
  width: 300px;
  border-radius: 8px;
  box-shadow: var(--shadow-md);
  background-color: var(--bg-element);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-sizing: content-box;
  outline: 4px transparent solid;

  ${(props) =>
    !props.$selected &&
    css`
      cursor: pointer;
    `}

  ${(props) =>
    props.$selected &&
    css`
      outline: 4px var(--color-primary-600) solid;
    `}
`;

const CardHeader = styled.div<{ fill: string }>`
  display: flex;
  justify-content: space-between;
  height: 40px;
  padding: 0px 8px;
  align-items: center;
  background-color: ${(props) => props.fill};
  font-weight: 500;
  font-size: 1.2rem;
`;

const Question = styled.div`
  flex-grow: 1;
  box-shadow: var(--shadow-md);
`;

const Answer = styled.div`
  flex-grow: 1;
  position: relative;
`;

const HideAnswer = styled.div`
  position: absolute;
  top: 16px;
  bottom: 16px;
  left: 16px;
  right: 16px;
  background-color: rgba(12, 6, 15, 0.75);
  backdrop-filter: blur(4px);
  border-radius: 4px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

const SpaceContainer = styled.div`
  border: 1px solid white;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  padding: 2px 8px;
`;

function FlashCard({
  card,
  onClick,
  children,
  eventSelectedClickOutside,
  onUpdate,
  onSelectedSpaceEvent,
  spaceEvent
}: {
  card: FlashCardProps;
  onClick?: () => void;
  children?: ReactNode;
  eventSelectedClickOutside?: () => void;
  onUpdate?: (card: FlashCardProps) => void;
  onSelectedSpaceEvent?: () => void;
  spaceEvent?: () => void;
}) {
  const { deckLabel, selected, level, state } = card;

  const cardRef = useDivClickOutside(() => {
    if (selected) {
      eventSelectedClickOutside?.();
    }
  }, false);

  const editMode = useMemo(
    () => (state === "EDIT" ? "EDIT" : "DEFAULT"),
    [state]
  );

  const fill = useMemo(() => {
    if (level === 0) {
      return "var(--color-positive-200)";
    } else if (level === 1) {
      return "var(--color-secondary-200)";
    } else {
      return "var(--color-negative-200)";
    }
  }, [level]);

  const handleClick = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      onClick?.();
    },
    [onClick]
  );

  const handleEditQuestion = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      onUpdate?.({
        ...card,
        body: e.target.value,
      });
    },
    [onUpdate, card]
  );

  const handleEditAnswer = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      onUpdate?.({
        ...card,
        answer: e.target.value,
      });
    },
    [onUpdate, card]
  );

  const handleEventSelectedSpace = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === " ") {
        onSelectedSpaceEvent?.();
      }
    },
    [onSelectedSpaceEvent]
  );
  
  const handleEventSpace = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === " ") {
        spaceEvent?.();
      }
    },
    [spaceEvent]
  );

    useEffect(() => {
      document.addEventListener("keydown", handleEventSpace);
      return () => {
        document.removeEventListener("keydown", handleEventSpace);
      }
    })

  useEffect(() => {
    if (selected) {
      document.addEventListener("keydown", handleEventSelectedSpace);
    } else {
      document.removeEventListener("keydown", handleEventSelectedSpace);
    }

    return () => {
      document.removeEventListener("keydown", handleEventSelectedSpace);
    };
  }, [handleEventSelectedSpace, selected]);

  return (
    <CardRelativeContainer>
      <CardStyled ref={cardRef} onClick={handleClick} $selected={selected}>
        <CardHeader fill={fill}>
          {deckLabel} <LevelLine card={card} onUpdate={onUpdate} />
        </CardHeader>
        <Question>
          <TextAreaEditable
            mode={editMode}
            onEdit={handleEditQuestion}
            value={card.body}
            selectOnEdit={true}
            placeholder={card.state === "EDIT" ? "Type a question..." : ""}
          />
        </Question>
        <Answer>
          <TextAreaEditable
            mode={editMode}
            onEdit={handleEditAnswer}
            value={card.answer}
            placeholder={card.state === "EDIT" ? "Type an answer..." : ""}
          />
          <CSSTransition
            in={card.state === "DEFAULT"}
            timeout={200}
            classNames="hideanswer"
            unmountOnExit
            mountOnEnter
          >
            <HideAnswer>
              <IoArrowDown size={24} />
              <SpaceContainer>SPACE</SpaceContainer>
              <IoArrowDown size={24} />
            </HideAnswer>
          </CSSTransition>
        </Answer>
        {selected && children}
      </CardStyled>
    </CardRelativeContainer>
  );
}

export default FlashCard;
