import { ShapeProps } from "../../../types/Cartography.type";
import Cylinder from "./Cylinder";
import Diamond from "./Diamond";
import Ellipse from "./Ellipse";
import FileShape from "./FileShape";
import Rect from "./Rect";
import RectRadius from "./RectRadius";
import Triangle from "./Triangle";
import UserShape from "./UserShape";

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
  if (shape === "rect-rounded")
    return <RectRadius fill={fill} $shadow={$shadow} border={border} />;
  if (shape === "file")
    return <FileShape fill={fill} $shadow={$shadow} border={border} />;
  if (shape === "diamond")
    return <Diamond fill={fill} $shadow={$shadow} border={border} />;
  if (shape === "user")
    return <UserShape fill={fill} $shadow={$shadow} border={border} />;
  return undefined;
}

export default ShapeDispatch;
