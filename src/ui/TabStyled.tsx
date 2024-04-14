import styled, { css } from "styled-components";

type TabStyledProps = {
  $active: boolean;
  onClick: (e: MouseEvent) => void;
};

export const TabStyled = styled.div<TabStyledProps>`
  display: flex;
  gap: 8px;
  padding: 4px 4px 4px 8px;
  height: 100%;
  align-items: center;
  background: none;
  border: none;
  box-sizing: border-box;
  max-width: 200px;
  
  font-size: 1rem;
  cursor: pointer;
  user-select: none;
  color: var(--text-main-medium);

  &:hover {
    background-color: var(--bg-white);
    color: var(--text-layout);
  }

  ${(props) =>
    props.$active &&
    css`
      background-color: var(--bg-white);
      color: var(--text-layout);
      border-left: 1px solid var(--color-gray-200);
      border-right: 1px solid var(--color-gray-200);
    `}
`;

type CloseButtonProps = {
  $isDisplay: boolean;
  onClick: (e: MouseEvent) => void;
};

export const CloseButton = styled.button<CloseButtonProps>`
  display: flex;
  align-items: center;
  padding: 0;
  background-color: transparent;
  border: none;
  opacity: ${(props) => (props.$isDisplay ? 1 : 0)};
  color: var(--text-main-medium);
  cursor: pointer;
  &:hover {
    color: var(--text-main-dark);
  }
`;

export const TextContainer = styled.span`
width: auto;
overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;
`