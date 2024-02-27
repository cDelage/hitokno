import styled, { css } from "styled-components";

const FakeSelector = styled.div<{ fontFamily? : string}>`
  background-color: var(--bg-element);
  box-shadow: var(--shadow-md);
  padding: 4px;
  border-radius: 4px;
  display: flex;
  gap: 4px;
  align-items: center;
  justify-content: space-between;
  width: 100px;

  ${(props) => props.fontFamily && css`
    font-family: ${props.fontFamily};
  `}
`;

export default FakeSelector;