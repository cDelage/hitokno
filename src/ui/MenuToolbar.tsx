import styled, { css } from "styled-components";
import { ChildrenProps } from "../types/ChildrenProps.type";
import { createPortal } from "react-dom";
import { PositionAbsolute, PositionObject } from "../types/Position.type";
import Row, { Column } from "./Row";
import { BorderProps } from "../types/Border.type";
import {
  MouseEvent,
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import { useDivClickOutside } from "../hooks/useDivClickOutside";

const MenuToolbarStyled = styled.menu<PositionObject & { $isDisplayBlock?: boolean }>`
  background-color: var(--bg-element);
  border-radius: 4px;
  z-index: 100;
  padding: 0px 0px;
  box-shadow: var(--shadow-md);
  ${(props) =>
    !props.$isDisplayBlock &&
    css`
      position: absolute;
    `}

  ${(props) => {
    return { ...props.$position };
  }}
`;

const ActionStyled = styled.div<
  BorderProps & ActionProps & { $theme?: string; $justifyCenter?: boolean }
>`
  cursor: pointer;
  flex-grow: 1;
  display: flex;
  align-items: center;
  user-select: none;
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
    ${(props) =>
    props.$theme === "danger" &&
    css`
      background-color: var(--bg-button-danger);
      color: var(--text-button-danger);
      &:hover {
        background-color: var(--bg-button-danger-hover);
      }
    `}
  
  ${(props) =>
    props.$justifyCenter &&
    css`
      justify-content: center;
    `}
`;

const SubMenuStyled = styled.menu<SubMenuStyledProps & { $displayBottom?: boolean; $alignRight?: boolean }>`
  background-color: var(--bg-element);
  border-radius: 4px;
  position: absolute;
  z-index: 100;
  padding: 0px 0px;
  box-shadow: var(--shadow-md);
  overflow: hidden;

  ${(props) =>
    props.$displayBottom
      ? css`
          bottom: -4px;
          ${props.$alignRight
            ? css`
                transform: translate(-100%, 100%);
              `
            : css`
                transform: translateY(100%);
              `}
        `
      : css`
          top: -12px;
          ${props.$alignRight
            ? css`
                transform: translate(-100%, -100%);
              `
            : css`
                transform: translateY(-100%);
              `}
        `}
  left: ${(props) => (props.$offsetLeft ? props.$offsetLeft : 0)}px;
`;

const SubMenuContainer = styled.div`
  position: relative;
`;

type SubMenuStyledProps = {
  $offsetLeft: number | undefined;
};

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
  $isDisplayBlock,
  underRelative,
}: ChildrenProps &
  PositionObject & {
    $isDisplayBlock?: boolean;
    underRelative?: boolean;
  }): JSX.Element {
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

  function handleClick(e: MouseEvent) {
    e.stopPropagation();
  }

  //If display block, no portal to body
  if ($isDisplayBlock) {
    return (
      <MenuToolbarContext.Provider
        value={{
          activeSubMenu: activeSubMenu,
          position: $position,
          handleToggleSubMenu,
          offsetLeft,
        }}
      >
        <MenuToolbarStyled
          $position={$position}
          onClick={handleClick}
          $isDisplayBlock={$isDisplayBlock}
        >
          <SubMenuContainer>{children}</SubMenuContainer>
        </MenuToolbarStyled>
      </MenuToolbarContext.Provider>
    );
  }

  //When underRelative, not create portal to body but absolute
  if (underRelative) {
    return (
      <MenuToolbarContext.Provider
        value={{
          activeSubMenu: activeSubMenu,
          position: $position,
          handleToggleSubMenu,
          offsetLeft,
        }}
      >
        <MenuToolbarStyled
          $position={$position}
          onClick={handleClick}
          $isDisplayBlock={$isDisplayBlock}
        >
          <SubMenuContainer>{children}</SubMenuContainer>
        </MenuToolbarStyled>
      </MenuToolbarContext.Provider>
    );
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
      <MenuToolbarStyled
        $position={$position}
        onClick={handleClick}
        $isDisplayBlock={$isDisplayBlock}
      >
        <SubMenuContainer>{children}</SubMenuContainer>
      </MenuToolbarStyled>
    </MenuToolbarContext.Provider>,
    document.body
  );
}

function ActionLine({ children }: ChildrenProps): JSX.Element {
  return (
    <Row $style={{ alignItems: "stretch", flexGrow: 1, overflow: "hidden" }}>
      {children}
    </Row>
  );
}

function ActionColumn({ children }: ChildrenProps): JSX.Element {
  return (
    <Column $style={{ alignItems: "stretch", overflow: "hidden" }}>
      {children}
    </Column>
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
  toggle,
  $isAlignRight,
  $justifyCenter,
}: ChildrenProps &
  BorderProps &
  ActionProps & {
    $theme?: string;
    toggle?: string;
    $isAlignRight?: boolean;
    $justifyCenter?: boolean;
  }): JSX.Element {
  const { handleToggleSubMenu } = useMenuToolbarContext();
  const actionRef = useRef<HTMLDivElement>(null);

  const handleClick = useCallback(
    (e: MouseEvent) => {
      onClick?.(e);
      if (toggle) {
        const offsetWidth = $isAlignRight
          ? actionRef.current
            ? actionRef.current.offsetWidth
            : 0
          : 0;
        const offsetLeft = actionRef.current ? actionRef.current.offsetLeft : 0;
        handleToggleSubMenu(toggle, offsetLeft + offsetWidth);
      }
    },
    [onClick, handleToggleSubMenu, toggle, $isAlignRight]
  );
  return (
    <ActionStyled
      ref={actionRef}
      border={border}
      $active={$active}
      onClick={handleClick}
      $padding={$padding}
      $theme={$theme}
      $justifyCenter={$justifyCenter}
    >
      <Row $gap={2} $style={{ alignItems: "center" }}>
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
  $displayBottom,
  $alignRight,
}: ChildrenProps &
  SubMenuProps & {
    $displayBottom?: boolean;
    $alignRight?: boolean;
  }): JSX.Element | null {
  const { activeSubMenu, offsetLeft, handleToggleSubMenu } =
    useMenuToolbarContext();

  const toggleSubmenu = useCallback(() => {
    handleToggleSubMenu(name, undefined);
  }, [handleToggleSubMenu, name]);

  const subMenuRef = useDivClickOutside(toggleSubmenu, false);

  if (name !== activeSubMenu) return null;
  return (
    <SubMenuStyled
      ref={subMenuRef}
      $offsetLeft={offsetLeft}
      $displayBottom={$displayBottom}
      $alignRight={$alignRight}
    >
      {children}
    </SubMenuStyled>
  );
}

MenuToolbar.Action = Action;
MenuToolbar.SubMenu = SubMenu;
MenuToolbar.ActionLine = ActionLine;
MenuToolbar.ActionColumn = ActionColumn;

export default MenuToolbar;
