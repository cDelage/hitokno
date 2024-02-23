import { Handle } from "reactflow";
import styled from "styled-components";

const HandleStyled = styled(Handle)`
  width: 10px;
  height: 10px;
  background-color: #159be9;
  &:hover {
    background-color: white;
    border-color: #159be9;
  }
`;

export default HandleStyled;