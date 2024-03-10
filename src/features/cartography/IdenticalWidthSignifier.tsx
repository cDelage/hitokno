import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import styled from "styled-components";

const IndeticalWidthStyled = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  display: flex;
  box-shadow: var(--shadow-md);
  z-index: 300;
`;

const Line = styled.div`
  flex-grow: 1;
  height: 2px;
  background-color: var(--color-secondary-500);
`;

function IdenticalWidthSignifier() {
  return (
    <IndeticalWidthStyled>
      <BiChevronLeft />
      <Line />
      <BiChevronRight />
    </IndeticalWidthStyled>
  );
}

export default IdenticalWidthSignifier;
