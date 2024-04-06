import { BaseEdge, Position, getBezierPath, getSmoothStepPath, getStraightPath } from "reactflow";
import useCartography from "./useCartography";
import { useMemo } from "react";
import { findDash, findWeight } from "./CartographyConstants";
import MarkersCustom from "./MarkersCustom";

function ConnectionEdgeCustom({
  fromX,
  fromY,
  toX,
  toY,
  fromPosition,
  toPosition,
}: {
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  fromPosition: Position;
  toPosition: Position;
}) {
  const {
    edgeCreationProps: { sourcePosition, targetPosition }, menuDataEdge
  } = useCartography();

  const {
    fill,
    arrowEnd,
    arrowStart,
    edgeCategory,
    weight,
    dash,
  } = menuDataEdge;

  const dashStyle = useMemo(() => {
    return findDash(dash);
  }, [dash]);

  const weightStyle = useMemo(() => {
    return findWeight(weight);
  }, [weight]);

  const edgeParams = {
    sourceX: fromX,
    sourceY: fromY,
    targetX: toX,
    targetY: toY,
    borderRadius: 8,
    centerX: 0,
    centerY: 0,
    sourcePosition: sourcePosition ? sourcePosition : fromPosition,
    targetPosition: targetPosition ? targetPosition : toPosition,
  };

  const [edgePath] =
  edgeCategory === "bezier"
    ? getBezierPath(edgeParams)
    : edgeCategory === "smooth-step"
    ? getSmoothStepPath(edgeParams)
    : edgeCategory === "straight"
    ? getStraightPath(edgeParams)
    : getSmoothStepPath(edgeParams);

  return (
    <>
    <MarkersCustom fill={fill} />
      <BaseEdge
        path={edgePath}
        id={"EDGE_CREATION"}
        markerStart={arrowStart !== "none" ? `url(#${arrowStart}-${fill})` : ""}
        markerEnd={arrowEnd !== "none" ? `url(#${arrowEnd}-${fill})` : ""}
        style={{
          strokeWidth: weightStyle.strokeSize,
          stroke: fill,
          strokeDasharray: dashStyle.dashStyle,
        }}
      />
    </>
  );
}

export default ConnectionEdgeCustom;
