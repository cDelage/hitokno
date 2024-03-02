import styled from "styled-components";

const TestBodyStyled = styled.div`
  flex-grow: 1;
  background-color: var(--bg-element);
  border-radius: 8px;
  height: 100%;
  box-shadow: var(--shadow-md);
  padding: 16px;
  box-sizing: border-box;
`;

function TestBody() {
  return <TestBodyStyled></TestBodyStyled>;
}

export default TestBody;
