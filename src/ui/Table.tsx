import styled from "styled-components";

export const TableContainer = styled.div`
  border-radius: 4px;
  box-shadow: var(--shadow-md);
  width: 100%;
  border: var(--color-gray-300) 1px solid;
  overflow: hidden;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const THead = styled.thead`
  background-color: var(--color-gray-50);
  color: var(--text-main-medium);
  border-bottom: var(--color-gray-300) 1px solid;
`;

export const Th = styled.th`
  text-align: left;
  padding: 8px;
`;

export const Td = styled.td`
  text-align: left;
  padding: 8px;
`;

export const ThShort = styled.th`
  text-align: left;
  padding: 8px;
  width: 10%;
`;

export const Tr = styled.tr`
  cursor: pointer;
  &:hover{
    background-color: var(--color-primary-100);
  }
`