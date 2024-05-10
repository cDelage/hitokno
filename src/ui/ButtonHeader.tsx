import styled, { css } from "styled-components";

export const ButtonHeader = styled.button<{
  $padding?: string;
  $active?: boolean;
  $theme?: "primary";
}>`
  background-color: transparent;
  border: none;
  display: flex;
  gap: 4px;
  padding: ${(props) => (props.$padding ? props.$padding : "4px")};
  font-size: 1rem;
  border-radius: 4px;
  box-shadow: var(--shadow-md);
  cursor: pointer;
  align-items: center;
  height: 100%;

  ${(props) =>
    props.$active
      ? css`
          background-color: var(--color-primary-200);
          &:hover {
            background-color: var(--color-primary-300);
          }
        `
      : css`
          &:hover {
            background-color: var(--color-gray-200);
          }
        `}

  ${(props) =>
    props.$theme === "primary" &&
    css`
      background-color: var(--color-primary-600);
      color: white;
    `}
`;

export const ButtonHeaderText = styled.span`
  white-space: nowrap;
  overflow: hidden; 
  text-overflow: ellipsis; 
`;
