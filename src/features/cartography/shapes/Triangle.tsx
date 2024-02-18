import styled from "styled-components";
import { ShapeProps } from "../../../types/Cartography.type";
import ShapeContainer from "./ShapeContainer";

const TriangleStyled = styled.polygon<ShapeProps>`
  filter: drop-shadow(${(props) => props.$shadow});
`

function Triangle({ fill, $shadow, border }: ShapeProps): JSX.Element {
  return (
    <ShapeContainer
      width="100%"
      height="100%"
      preserveAspectRatio="none"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <TriangleStyled points="50 0, 100 100, 0 100" fill={fill} $shadow={$shadow} stroke={border} strokeWidth={1}/>
    </ShapeContainer>
  );
}


export default Triangle;
