import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import styled from "styled-components";

const IndeticalWidthStyled = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  transform: translateX(-50%);
  z-index: 300;
`;

const Line = styled.div`
  flex-grow: 1;
  width: 2px;
  background-color: var(--color-primary-700);
  box-shadow: var(--shadow-md);
`;

function IdenticalHeightSignifiant() {
  return (
    <IndeticalWidthStyled>
      <BiChevronUp size={24} color="var(--color-primary-700)"/>
      <Line />
      <BiChevronDown size={24} color="var(--color-primary-700)"/>
    </IndeticalWidthStyled>
  );
}

export default IdenticalHeightSignifiant;
