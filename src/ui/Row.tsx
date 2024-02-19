import styled, { css } from "styled-components";

type RowProps = {
  $flexDirection: "row" | "column";
  $gap: number;
  $alignItems?: string;
  $justifyContent?: string;
  $flexGrow?: number;
};

const Row = styled.div<RowProps>`
  display: flex;
  flex-direction: ${(props) => props.$flexDirection};
  gap: ${(props) => props.$gap}px;
  min-width: 0;
  ${(props) =>
    props.$alignItems &&
    css`
      align-items: ${props.$alignItems};
    `}

  ${(props) =>
    props.$justifyContent &&
    css`
      justify-content: ${props.$justifyContent};
    `}
  
  ${(props) =>
    props.$flexGrow &&
    css`
      flex-grow: ${props.$flexGrow};
    `}
`;

export default Row;
