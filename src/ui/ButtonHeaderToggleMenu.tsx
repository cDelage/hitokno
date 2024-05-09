import { ReactNode, useCallback, useState } from "react";
import { ButtonHeader } from "./ButtonHeader";
import { BiChevronDown } from "react-icons/bi";
import styled, { css } from "styled-components";

const ButtonHeaderToggleMenuStyled = styled.div`
  position: relative;
`;

const ButtonHeaderBody = styled.div<{ $showRight?: boolean }>`
  position: absolute;
  ${(props) =>
    props.$showRight
      ? css`
          bottom: 0px;
          right: 0px;
        `
      : css`
          bottom: 0px;
          left: 0px;
        `}
  transform: translateY(100%);
  box-sizing: border-box;
  border-radius: 4px;
  background-color: var(--bg-element);
  box-shadow: var(--shadow-md);
  overflow: hidden;
`;

function ButtonHeaderToggleMenu({
  children,
  tabs,
  showRight,
}: {
  children: ReactNode;
  tabs: ReactNode;
  showRight?: boolean;
}) {
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const toggleShowSettings = useCallback(() => {
    setShowMenu((isShow) => !isShow);
  }, [setShowMenu]);

  return (
    <ButtonHeaderToggleMenuStyled>
      <ButtonHeader onClick={toggleShowSettings}>
        {children}
        <BiChevronDown size={12} />
      </ButtonHeader>
      {showMenu && (
        <ButtonHeaderBody $showRight={showRight}>{tabs}</ButtonHeaderBody>
      )}
    </ButtonHeaderToggleMenuStyled>
  );
}

export default ButtonHeaderToggleMenu;
