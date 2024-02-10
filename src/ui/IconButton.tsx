import styled from "styled-components";

const IconButton = styled.button`
  background-color: transparent;
  border: none;
  padding: 0px 4px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: var(--bg-element-hover);
    box-shadow: var(--shadow-md)
  }
`;

export default IconButton;
