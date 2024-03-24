import { MarkerType, Position, getSmoothStepPath } from "reactflow";
import useCartography from "./useCartography";
import { CSSProperties } from "styled-components";

const edgeStyle : CSSProperties = { strokeWidth: 3, stroke: "black" };

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
    edgeCreationProps: { sourcePosition, targetPosition },
  } = useCartography();

  const [edgePath] = getSmoothStepPath({
    sourceX: fromX,
    sourceY: fromY,
    targetX: toX,
    targetY: toY,
    offset: 0,
    sourcePosition: sourcePosition ? sourcePosition : fromPosition,
    targetPosition: targetPosition ? targetPosition : toPosition,
    centerX: 0,
    centerY: 0,
  });

  return (
    <g>
      <path
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={MarkerType.ArrowClosed}
        style={edgeStyle}
      />
    </g>
  );
}

export default ConnectionEdgeCustom;
