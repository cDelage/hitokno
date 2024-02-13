import styled from "styled-components";

type RowProps = {
  flexDirection: "ROW" | "COLUMN";
  gap: number;
  alignItems: string;
};

const Row = styled.div<RowProps>`
  display: flex;
  flex-direction: ${(props) => props.flexDirection};
  gap: ${(props) => props.gap};
`;

export default Row;
