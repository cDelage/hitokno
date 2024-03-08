import styled from "styled-components";

export const ProgressBar = styled.progress`
  appearance: none;
  width: 100%;
  position: relative;
  z-index: 50;
  
  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    width: 0;
    transition: width 200ms linear;
    border-radius: 8px;
  }

  &::before {
    left: 0;
    background-color: var(--color-gray-300);
  }

  &::after {
    right: 0;
    background-color: var(--color-primary-500);
  }

  &::-webkit-progress-bar {
    background-color: var(--color-gray-300);
    border-radius: 8px;
    overflow: hidden;
    box-shadow: var(--shadow-md);
  }

  &::-webkit-progress-value {
    background-color: var(--color-primary-500);
    border-radius: 8px;
    transition: width 200ms linear;
  }

  &::-moz-progress-bar {
    background-color: var(--color-primary-500);
  }
`;
