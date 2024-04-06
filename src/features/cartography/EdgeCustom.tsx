import { CSSProperties, useEffect, useMemo } from "react";
import {
  BaseEdge,
  Position,
  getBezierPath,
  getSmoothStepPath,
  getStraightPath,
  useKeyPress,
} from "reactflow";
import useCartography from "./useCartography";
import EdgeToolbar from "./EdgeToolbar";
import {
  DataEdge,
} from "../../types/Cartography.type";
import MarkersCustom from "./MarkersCustom";
import {
  findDash,
  findWeight,
} from "./CartographyConstants";
import EdgeLabel from "./EdgeLabel";

function EdgeCustom({
  sourceX,
  sourceY,
  targetX,
  targetY,
  id,
  sourcePosition,
  targetPosition,
  selected,
  sourceHandleId,
  targetHandleId,
  data,
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
  data: DataEdge;
}) {
  const { handlesActive, addHandlesActive, removeHandlesActive, deleteEdge } =
    useCartography();
  const {
    fill,
    arrowEnd,
    arrowStart,
    edgeCategory,
    weight,
    dash,
    label,
    shapeDescription,
  } = data;
  const height = shapeDescription?.height ?? 0;
  const deleteEdgeAction = useKeyPress("Delete");

  const dashStyle = useMemo(() => {
    return findDash(dash);
  }, [dash]);

  const weightStyle = useMemo(() => {
    return findWeight(weight);
  }, [weight]);

  const edgeParams = {
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    borderRadius: 8,
  };

  const [edgePath, labelX, labelY] =
    edgeCategory === "bezier"
      ? getBezierPath(edgeParams)
      : edgeCategory === "smooth-step"
      ? getSmoothStepPath(edgeParams)
      : edgeCategory === "straight"
      ? getStraightPath(edgeParams)
      : getSmoothStepPath(edgeParams);

  useEffect(() => {
    if (deleteEdgeAction && selected) {
      deleteEdge(id, sourceHandleId, targetHandleId);
    }
  }, [
    deleteEdgeAction,
    deleteEdge,
    selected,
    id,
    sourceHandleId,
    targetHandleId,
  ]);

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
      <MarkersCustom fill={fill} />
      <BaseEdge
        path={edgePath}
        id={id}
        markerStart={arrowStart !== "none" ? `url(#${arrowStart}-${fill})` : ""}
        markerEnd={arrowEnd !== "none" ? `url(#${arrowEnd}-${fill})` : ""}
        style={{
          strokeWidth: weightStyle.strokeSize,
          stroke: fill,
          strokeDasharray: dashStyle.dashStyle,
        }}
      />
      {selected && (
        <EdgeToolbar
          labelX={labelX}
          labelY={labelY}
          data={data}
          id={id}
          height={label ? height : 0}
        />
      )}
      {label !== undefined && (
        <EdgeLabel
          id={id}
          data={data}
          labelX={labelX}
          labelY={labelY}
          selected={selected}
        />
      )}
    </>
  );
}

export default EdgeCustom;
