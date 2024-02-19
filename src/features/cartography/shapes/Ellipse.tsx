import styled from "styled-components";
import ShapeContainer from "./ShapeContainer";
import { ShapeProps } from "../../../types/Cartography.type";

const EllipseStyled = styled.ellipse<ShapeProps>`
  filter: drop-shadow(${(props) => props.$shadow});
`;

function Ellipse({ fill, $shadow, border }: ShapeProps): JSX.Element {
  return (
    <ShapeContainer
      width="100%"
      height="100%"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <EllipseStyled
        cx="50%"
        cy="50%"
        rx="50%"
        ry="50%"
        fill={fill}
        $shadow={$shadow}
        stroke={border}
        strokeWidth={2}
      />
    </ShapeContainer>
  );
}

export default Ellipse;
