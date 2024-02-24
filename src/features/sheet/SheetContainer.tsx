import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import styled from "styled-components";

const SheetContainerStyled = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  bottom: 16px;
  width: 40%;
  z-index: 500;
  box-shadow: var(--shadow-sheet);
  background-color: var(--bg-element);
  border-radius: 8px;
`;

function SheetContainer(): JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams();
  const sheetId = searchParams.get("sheetId");

  const closeSheet = useCallback(() => {
    searchParams.delete("sheetId");
    setSearchParams(searchParams);
  }, [searchParams, setSearchParams]);
  return (
    <CSSTransition
      in={sheetId !== null}
      timeout={400}
      classNames="sheet"
      unmountOnExit
      mountOnEnter
    >
      <SheetContainerStyled>
        <button onClick={closeSheet}>Close</button>
      </SheetContainerStyled>
    </CSSTransition>
  );
}

export default SheetContainer;
