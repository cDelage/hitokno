import styled, { css } from "styled-components";
import { ChildrenProps } from "../types/ChildrenProps.type";
import { createPortal } from "react-dom";
import { PositionAbsolute, PositionObject } from "../types/Position.type";
import Row from "./Row";
import { BorderProps } from "../types/Border.type";
import { MouseEvent, createContext, useCallback, useContext, useRef, useState } from "react";

const MenuToolbarStyled = styled.menu<PositionObject>`
  background-color: var(--bg-element);
  border-radius: 4px;
  position: absolute;
  z-index: 100;
  padding: 0px 0px;
  box-shadow: var(--shadow-md);

  ${(props) => {
    return { ...props.$position};
  }}
`;

const ActionStyled = styled.div<BorderProps & ActionProps & {$theme? : string}>`
  cursor: pointer;
  flex-grow: 1;
  display: flex;
  align-items: center;
  ${(props) => {
    return props.border;
  }}

  ${(props) =>
    props.$active
      ? css`
          background-color: var(--bg-menu-active);
        `
      : css`
          &:hover {
            background-color: var(--bg-element-hover);
          }
        `}
  ${(props) =>
    props.$padding
      ? css`
          padding: ${props.$padding};
        `
      : css`
          padding: 8px;
        `}
    ${(props) => props.$theme === "danger" && css`
      background-color: var(--bg-button-danger);
      color: var(--text-button-danger);
      &:hover{
        background-color: var(--bg-button-danger-hover);
      }
    `}
`;

const SubMenuContainer = styled.div`
  position: relative;
`;

type SubMenuStyledProps = {
  $offsetLeft: number | undefined;
};

const SubMenuStyled = styled.menu<SubMenuStyledProps>`
  background-color: var(--bg-element);
  border-radius: 4px;
  position: absolute;
  z-index: 100;
  padding: 0px 0px;
  box-shadow: var(--shadow-md);
  top: -12px;
  left: ${(props) => (props.$offsetLeft ? props.$offsetLeft : 0)}px;
  transform: translateY(-100%);
  overflow: hidden;
`;

type MenuToolbarContextProps = {
  activeSubMenu: string | undefined;
  position: PositionAbsolute;
  handleToggleSubMenu: (
    name: string | undefined,
    offsetLeftSubmenu: number | undefined
  ) => void;
  offsetLeft: number | undefined;
};

const MenuToolbarContext = createContext<MenuToolbarContextProps>({
  activeSubMenu: undefined,
  position: {},
  handleToggleSubMenu: () => {},
  offsetLeft: undefined,
});

function useMenuToolbarContext(): MenuToolbarContextProps {
  const context = useContext(MenuToolbarContext);
  if (!context)
    throw new Error("MenuToolbar context was used outside of his scope");
  return context;
}

function MenuToolbar({
  children,
  $position,
}: ChildrenProps & PositionObject): JSX.Element {
  const [activeSubMenu, setActiveSubMenu] = useState<string | undefined>(
    undefined
  );

  const [offsetLeft, setOffsetLeft] = useState<number | undefined>(undefined);

  function handleToggleSubMenu(
    name: string | undefined,
    offsetLeftSubmenu: number | undefined
  ) {
    setOffsetLeft(offsetLeftSubmenu);
    setActiveSubMenu((cur) => {
      if (cur === name) return undefined;
      return name;
    });
  }

  function handleClick(e : MouseEvent){
    e.stopPropagation();
  }

  return createPortal(
    <MenuToolbarContext.Provider
      value={{
        activeSubMenu: activeSubMenu,
        position: $position,
        handleToggleSubMenu,
        offsetLeft,
      }}
    >
      <MenuToolbarStyled $position={$position} onClick={handleClick}>
        <SubMenuContainer>{children}</SubMenuContainer>
      </MenuToolbarStyled>
    </MenuToolbarContext.Provider>,
    document.body
  );
}

function ActionLine({ children }: ChildrenProps): JSX.Element {
  return (
    <Row $flexDirection="row" $alignItems="stretch" $gap={0} $flexGrow={1}>
      {children}
    </Row>
  );
}

function ActionColumn({ children }: ChildrenProps): JSX.Element {
  return (
    <Row $flexDirection="column" $alignItems="stretch" $gap={0}>
      {children}
    </Row>
  );
}

type ActionProps = {
  $active?: boolean;
  onClick?: (e: MouseEvent) => void;
  $padding?: string;
};

function Action({
  children,
  border,
  $active,
  onClick,
  $padding,
  $theme,
  toggle
}: ChildrenProps & BorderProps & ActionProps & { $theme?: string, toggle?: string}): JSX.Element {
  const {handleToggleSubMenu} = useMenuToolbarContext()
  const actionRef = useRef<HTMLDivElement>(null)
  const handleClick = useCallback((e : MouseEvent) => {
    onClick?.(e);
    if(toggle){
      handleToggleSubMenu(toggle, actionRef.current?.offsetLeft)
    }
  },[onClick, handleToggleSubMenu, toggle])
  return (
    <ActionStyled
      ref={actionRef}
      border={border}
      $active={$active}
      onClick={handleClick}
      $padding={$padding}
      $theme={$theme}
    >
      <Row $flexDirection="row" $gap={2} $alignItems="center">
        {children}
      </Row>
    </ActionStyled>
  );
}

type SubMenuProps = {
  name?: string;
};

function SubMenu({
  children,
  name,
}: ChildrenProps & SubMenuProps): JSX.Element | null {
  const { activeSubMenu, offsetLeft } = useMenuToolbarContext();
  if (name !== activeSubMenu) return null;
  return <SubMenuStyled $offsetLeft={offsetLeft}>{children}</SubMenuStyled>;
}

MenuToolbar.Action = Action;
MenuToolbar.SubMenu = SubMenu;
MenuToolbar.ActionLine = ActionLine;
MenuToolbar.ActionColumn = ActionColumn;

export default MenuToolbar;
