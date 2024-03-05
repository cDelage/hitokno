import styled, { CSSProp } from "styled-components";

type RowProps = {
  $flexDirection?: "row" | "column";
  $gap?: number;
  $style?: CSSProp;
  $hover?: CSSProp;
};

const Row = styled.div<RowProps>`
  display: flex;
  flex-direction: ${(props) =>
    props.$flexDirection ? props.$flexDirection : "row"};
  gap: ${(props) => (props.$gap ? props.$gap : 0)}px;
  min-width: 0;

  ${(props) => props.$style}

  &:hover {
    ${(props) => props.$hover}
  }
`;

export const Column = styled.div<RowProps>`
  display: flex;
  flex-direction: column;
  gap: ${(props) => (props.$gap ? props.$gap : 0)}px;
  min-width: 0;

  ${(props) => props.$style}

  &:hover {
    ${(props) => props.$hover}
  }
`;

export default Row;
