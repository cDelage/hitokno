import styled from "styled-components";

const FakeSelector = styled.div`
  background-color: var(--bg-element);
  box-shadow: var(--shadow-md);
  padding: 4px;
  border-radius: 4px;
  display: flex;
  gap: 4px;
  align-items: center;
  justify-content: space-between;
  width: 80px;
  user-select: none;
`;

export default FakeSelector;