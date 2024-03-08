import { CSSProperties } from "react";
import { Position, getSmoothStepPath } from "reactflow";

const edgeStyle = { strokeWidth: 3, stroke: "black" };

function EdgeCustomLight({
  sourceX,
  sourceY,
  targetX,
  targetY,
  id,
  markerEnd,
  sourcePosition,
  targetPosition,
}: {
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
  selected: boolean;
  id: string;
  markerEnd: string | undefined;
  sourcePosition: Position;
  targetPosition: Position;
  source: string;
  sourceHandleId: string;
  target: string;
  targetHandleId: string;
  style: CSSProperties;
}) {


  const [edgePath] = getSmoothStepPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    borderRadius: 3,
  });

  return (
    <>
      <path
        id={id}
        className="react-flow__edge-path"
        d={edgePath}
        style={{ strokeWidth: 25, opacity: 0 }}
      />

      <path
        id={id}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
        style={edgeStyle}
      />
    </>
  );
}

export default EdgeCustomLight;
