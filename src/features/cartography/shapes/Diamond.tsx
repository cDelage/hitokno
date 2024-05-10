import { ShapeProps } from "../../../types/Cartography.type";
import Path from "./Path";
import ShapeContainer from "./ShapeContainer";

function Diamond({ fill, $shadow, border }: ShapeProps) {
  return (
    <ShapeContainer
      width="100%"
      height="100%"
      fill="none"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path d="M0 50L50 0L100 50L50 100L0 50Z" fill={fill} $shadow={$shadow} stroke={border}/>
    </ShapeContainer>
  );
}

export default Diamond;


