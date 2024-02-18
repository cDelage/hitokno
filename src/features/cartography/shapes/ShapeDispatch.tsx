import { ShapeProps } from "../../../types/Cartography.type";
import Cylinder from "./Cylinder";
import Ellipse from "./Ellipse";
import Rect from "./Rect";
import RectRadius from "./RectRadius";
import Triangle from "./Triangle";

function ShapeDispatch({
  shape,
  fill,
  $shadow,
  border,
}: ShapeProps): JSX.Element | undefined {
  if (shape === "rect")
    return <Rect fill={fill} $shadow={$shadow} border={border} />;
  if (shape === "ellipse")
    return <Ellipse fill={fill} $shadow={$shadow} border={border} />;
  if (shape === "triangle")
    return <Triangle fill={fill} $shadow={$shadow} border={border} />;
  if (shape === "cylinder")
    return <Cylinder fill={fill} $shadow={$shadow} border={border} />;
  if (shape === "rect-radius")
    return <RectRadius fill={fill} $shadow={$shadow} border={border} />;
  return undefined;
}

export default ShapeDispatch;
