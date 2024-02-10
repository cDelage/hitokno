import styled, { css } from "styled-components";

type CreationButtonProps = {
  $isContainIcon?: boolean;
};

const CreationButton = styled.button<CreationButtonProps>`
  background-color: transparent;
  color: var(--text-main-blue);
  font-size: 1rem;
  border-radius: 4px;
  border: 2px dashed var(--text-main-blue);
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  user-select: none;
  ${(props) =>
    props.$isContainIcon
      ? css`
          padding: 4px 8px 4px 4px;
        `
      : css`
          padding: 4px 8px;
        `}
  &:hover {
    background-color: var(--bg-button-secondary-hover);
  }
`;

export default CreationButton;
