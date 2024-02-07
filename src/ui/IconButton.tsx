import { MouseEvent } from "react";
import styled from "styled-components";

const IconButtonStyled = styled.button`
  background-color: transparent;
  border: none;
  padding: 4px 4px;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: var(--bg-element-hover);
  }
`;

type IconButtonProps = {
  children: React.ReactNode;
  handleClick?: (e : MouseEvent<HTMLButtonElement>) => void;
};

function IconButton({ children, handleClick }: IconButtonProps): JSX.Element {

  return <IconButtonStyled onClick={handleClick}>{children}</IconButtonStyled>;
}

export default IconButton;
