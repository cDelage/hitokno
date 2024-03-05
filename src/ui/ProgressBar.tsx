import styled from "styled-components";

export const ProgressBar = styled.progress`
  appearance: none;
  width: 100%;

  &::-webkit-progress-bar {
    background-color: var(--color-gray-300);
    border-radius: 8px;
    overflow: hidden;
    box-shadow: var(--shadow-md);
}

&::-webkit-progress-value {
    background-color: var(--color-primary-500);
    border-radius: 8px;
  }

  &::-moz-progress-bar {
    background-color: var(--color-primary-500);
  }
`;
