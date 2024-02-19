import styled, { css } from "styled-components";
import { ChildrenProps } from "../types/ChildrenProps.type";
import { createContext, useContext, useState } from "react";

type HoverTransformProps = {
  $hoverTransform?: string;
  $isHover? : boolean;
};

const ToolbarActionStyled = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  position: relative;
  padding: 8px;
  &:hover {
    background-color: var(--bg-element-hover);
  }
`;

const ActionButtonStyled = styled.button<HoverTransformProps>`
  position: absolute;
  bottom: 8px;
  right: 8px;
  border: none;
  border-radius: 20px;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  background-color: var(--bg-toolbar-action-icon);
  transition: 100ms ease-in;
  cursor: pointer;
  ${(props) => props.$isHover && css`
    transform: ${props.$hoverTransform};
  `}

`;

type ToolbarActionContextProps = {
  isHover: boolean;
};

const ToolbarActionContext = createContext<ToolbarActionContextProps>({
  isHover: false,
});

function ToolbarAction({ children }: ChildrenProps) {
  const [isHover, setIsHover] = useState<boolean>(false);

  return (
    <ToolbarActionContext.Provider value={{ isHover }}>
      <ToolbarActionStyled
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        {children}
      </ToolbarActionStyled>
    </ToolbarActionContext.Provider>
  );
}

function ActionButton({
  children,
  $hoverTransform,
}: ChildrenProps & HoverTransformProps) {
  const {isHover} = useContext(ToolbarActionContext)
  return <ActionButtonStyled $hoverTransform={$hoverTransform} $isHover={isHover}>
    {children}
  </ActionButtonStyled>;
}

ToolbarAction.ActionButton = ActionButton;

export default ToolbarAction;
