import { ShapeProps } from "../../../types/Cartography.type";
import Path from "./Path";
import ShapeContainer from "./ShapeContainer";

function UserShape({ fill, $shadow, border }: ShapeProps) {
  return (
    <ShapeContainer
      width="100%"
      height="100%"
      viewBox="0 0 126 126"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <Path
        d="M63 63C80.1204 63 94.125 48.9934 94.125 31.875C94.125 14.7566 80.1204 0.75 63 0.75C45.8796 0.75 31.875 14.7566 31.875 31.875C31.875 48.9934 45.8796 63 63 63ZM63 78.5625C42.3803 78.5625 0.75 89.0678 0.75 109.688V125.25H125.25V109.688C125.25 89.0678 83.6197 78.5625 63 78.5625Z"
        fill={fill}
        stroke={border}
        $shadow={$shadow}
      />
    </ShapeContainer>
  );
}

export default UserShape;
