import styled from "styled-components";
import { ShapeProps } from "../../../types/Cartography.type";
import ShapeContainer from "./ShapeContainer";

const PathStyled = styled.path<ShapeProps>`
  filter: drop-shadow(${(props) => props.$shadow});
`;

function Cylinder({ fill, $shadow, border }: ShapeProps): JSX.Element {
  return (
    <ShapeContainer
      height="100%"
      width="100%"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="83 0 346 512"
    >
      <g>
        <g>
          <g>
            <PathStyled
              d="M85.333,77.888v391.445C85.333,510.805,238.549,512,256,512s170.667-1.195,170.667-42.667V77.888
				c-28.48,19.093-85.44,28.779-170.667,28.779S113.835,96.981,85.333,77.888z"
              $shadow={$shadow}
              fill={fill}
              stroke={border}
              strokeWidth={4}
            />
            <PathStyled
              d="M256,85.333c105.28,0,170.667-16.363,170.667-42.667c0-1.621-0.405-3.115-1.067-4.48
				C415.872,5.141,301.653,0.661,265.493,0.085C262.336,0.064,259.243,0,256,0s-6.336,0.064-9.515,0.085
				C210.325,0.661,96.107,5.12,86.379,38.187c-0.64,1.365-1.045,2.859-1.045,4.48C85.333,68.971,150.72,85.333,256,85.333z"
              $shadow={$shadow}
              fill={fill}
              stroke={border}
              strokeWidth={4}
            />
          </g>
        </g>
      </g>
    </ShapeContainer>
  );
}

export default Cylinder;
