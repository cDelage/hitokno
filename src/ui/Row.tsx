import styled, { css } from "styled-components";

type RowProps = {
  flexDirection: "row" | "column";
  gap: number;
  alignItems?: string;
};

const Row = styled.div<RowProps>`
  display: flex;
  flex-direction: ${(props) => props.flexDirection};
  gap: ${(props) => props.gap}px;

  ${(props) =>
    props.alignItems &&
    css`
      align-items: ${props.alignItems};
    `}
`;

export default Row;
