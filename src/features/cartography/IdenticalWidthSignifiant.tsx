import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import styled from "styled-components";

const IndeticalWidthStyled = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  transform: translateY(-50%);
  z-index: 300;
`;

const Line = styled.div`
  flex-grow: 1;
  height: 2px;
  background-color: var(--color-primary-700);
  box-shadow: var(--shadow-md);
`;

function IdenticalWidthSignifiant() {
  return (
    <IndeticalWidthStyled>
      <BiChevronLeft size={24} color="var(--color-primary-700)" />
      <Line />
      <BiChevronRight size={24} color="var(--color-primary-700)" />
    </IndeticalWidthStyled>
  );
}

export default IdenticalWidthSignifiant;
