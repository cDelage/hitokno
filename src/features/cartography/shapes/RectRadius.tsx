import styled from "styled-components";
import ShapeContainer from "./ShapeContainer";
import { ShapeProps } from "../../../types/Cartography.type";

const RectStyled = styled.rect<ShapeProps>`
  filter: drop-shadow(${(props) => props.$shadow});
`

function RectRadius({ fill, $shadow, border }: ShapeProps): JSX.Element {
  return (
    <ShapeContainer
      width="100%"
      height="100%"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <RectStyled width="100%" height="100%" rx={16} ry={16} fill={fill} $shadow={$shadow} stroke={border} strokeWidth={2}/>
    </ShapeContainer>
  );
}

export default RectRadius;
