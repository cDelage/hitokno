import styled from "styled-components";
import ShapeContainer from "./ShapeContainer";
import { ShapeProps } from "../../../types/Cartography.type";

const RectStyled = styled.rect<ShapeProps>`
  filter: drop-shadow(${(props) => props.shadow});
`

function Rect({ fill, shadow }: ShapeProps): JSX.Element {
  return (
    <ShapeContainer
      width="100%"
      height="100%"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <RectStyled width="100%" height="100%" fill={fill} shadow={shadow}/>
    </ShapeContainer>
  );
}

export default Rect;
