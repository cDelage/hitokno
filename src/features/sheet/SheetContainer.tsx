import { useSearchParams } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import styled from "styled-components";
import Sheet from "./Sheet";

const SheetContainerStyled = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  bottom: 16px;
  display: flex;
  flex-direction: column;
  width: 800px;
  z-index: 500;
  box-shadow: var(--shadow-sheet);
  background-color: var(--bg-element);
`;

function SheetContainer(): JSX.Element {
  const [searchParams] = useSearchParams();
  const sheetId = searchParams.get("sheetId");
  return (
    <CSSTransition
      in={sheetId !== null}
      timeout={200}
      classNames="sheet"
      unmountOnExit
      mountOnEnter
    >
      <SheetContainerStyled id="sheet-container">
        <Sheet />
      </SheetContainerStyled>
    </CSSTransition>
  );
}

export default SheetContainer;
