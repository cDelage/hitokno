import styled from "styled-components";
import TabCollapse from "../deck/TabCollapse";
import { CSSTransition } from "react-transition-group";
import { useSearchParams } from "react-router-dom";
import { useCallback } from "react";

const LeitnerBoxStyled = styled.div`
  position: absolute;
  bottom: 0;
  left: 16px;
  right: 16px;
  z-index: 1100;
  height: 94%;
  background-color: var(--bg-element);
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  overflow: hidden;
  border: 1px solid var(--color-gray-300);
  display: flex;
  flex-direction: column;
`;

function LeitnerBox() {
  const [searchParams, setSearchParams] = useSearchParams();
  const leitnerBox = searchParams.get("leitnerBox");

  const handleCloseModal = useCallback(() => {
    searchParams.delete("leitnerBox");
    setSearchParams(searchParams);
  }, [setSearchParams, searchParams]);

  return (
    <CSSTransition
      in={leitnerBox !== null}
      timeout={400}
      classNames="deck"
      unmountOnExit
      mountOnEnter
    >
      <LeitnerBoxStyled>
        <TabCollapse onClick={handleCloseModal} />
      </LeitnerBoxStyled>
    </CSSTransition>
  );
}

export default LeitnerBox;
