import { Position, getSmoothStepPath } from "reactflow";
import useCartography from "./useCartography";

const connectionLineStyle = {
  strokeWidth: 1,
  stroke: "black",
  zIndex: 0,
};

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
      <path style={connectionLineStyle} fill="none" d={edgePath} />
      <circle
        cx={toX}
        cy={toY}
        fill="black"
        r={3}
        stroke="black"
        strokeWidth={1.5}
      />
    </g>
  );
}

export default ConnectionEdgeCustom;
