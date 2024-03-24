import { CSSProperties, useEffect } from "react";
import { Position, getSmoothStepPath, useKeyPress } from "reactflow";
import useCartography from "./useCartography";

const edgeStyle : CSSProperties = { strokeWidth: 3, stroke: "black" };

function EdgeCustom({
  sourceX,
  sourceY,
  targetX,
  targetY,
  id,
  markerEnd,
  sourcePosition,
  targetPosition,
  selected,
  sourceHandleId,
  targetHandleId,
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
  const { handlesActive, addHandlesActive, removeHandlesActive, deleteEdge } =
    useCartography();

  const deleteEdgeAction = useKeyPress("Delete");

  const [edgePath] = getSmoothStepPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    borderRadius: 3,
  });

  useEffect(() => {
    if (deleteEdgeAction && selected) {
      deleteEdge(id, sourceHandleId, targetHandleId);
    }
  }, [deleteEdgeAction, deleteEdge, selected, id, sourceHandleId, targetHandleId]);

  useEffect(() => {
    if (selected && !handlesActive.includes(sourceHandleId)) {
      addHandlesActive([sourceHandleId, targetHandleId]);
    }

    if (!selected && handlesActive.includes(sourceHandleId)) {
      removeHandlesActive([sourceHandleId, targetHandleId]);
    }
  }, [
    selected,
    addHandlesActive,
    handlesActive,
    removeHandlesActive,
    sourceHandleId,
    targetHandleId,
  ]);

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

export default EdgeCustom;
