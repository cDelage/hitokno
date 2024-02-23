import { useRef, useState } from "react";
import styled from "styled-components";
import { CSSTransition } from "react-transition-group";

const SheetContainerStyled = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  bottom: 16px;
  width: 40%;
  z-index: 500;
  box-shadow: var(--shadow-md);
  background-color: var(--bg-element);
  border-radius: 8px;
`;

const SheetTransitionClass = styled.div`
  .sheet-enter {
    transform: translateX(100%);
  }

  .sheet-enter-active {
    transform: translateX(0);
    transition: transform 300ms;
  }

  .sheet-exit {
    transform: translateX(0);
  }

  .sheet-exit-active {
    transform: translateX(100%);
    transition: transform 300ms;
  }
`;

function SheetContainer(): JSX.Element {
  const sheetRef = useRef(null);
  const [isShow] = useState(true);

  return (
    <SheetTransitionClass>
      <CSSTransition in={isShow} nodeRef={sheetRef} timeout={200} classNames="sheet">
        <SheetContainerStyled ref={sheetRef} className="sheet"></SheetContainerStyled>
      </CSSTransition>
    </SheetTransitionClass>
  );
}

export default SheetContainer;
