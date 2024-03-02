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
  color: var(--text-layout);
  font-size: 1rem;
  cursor: pointer;
  user-select: none;

  &:hover {
    background-color: var(--bg-white);
  }

  ${(props) =>
    props.$active &&
    css`
      background-color: var(--bg-white);
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
