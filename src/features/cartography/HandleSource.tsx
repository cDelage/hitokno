import { HandleProps } from "../../types/Cartography.type";
import useCartography from "./useCartography";
import { useCallback, useEffect } from "react";
import { Handle } from "reactflow";


function HandleSource({
  handleId,
  position,
  nodeId,
}: HandleProps & { nodeId: string;}) {
  const {
    edgeCreationProps: { isCreateEdge, sourceNodeId, sourceHandleId },
    setEdgeCreationProps,
    createNewEdge,
  } = useCartography();

  const isDisplay =
    !isCreateEdge ||
    (isCreateEdge && sourceNodeId === nodeId && sourceHandleId === handleId);
  const handleClick = useCallback(() => {
    setEdgeCreationProps({
      isCreateEdge: true,
      sourceNodeId: nodeId,
      sourceHandleId: handleId,
      sourcePosition: position,
    });
  }, [setEdgeCreationProps, nodeId, handleId, position]);

  useEffect(() => {
    function handleMouseUp() {
      createNewEdge();
      document.removeEventListener("mouseup", handleMouseUp);
    }

    if (isCreateEdge) {
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isCreateEdge, createNewEdge]);

  if (!isDisplay) return null;
  return (
      <Handle
        id={handleId}
        onMouseDown={handleClick}
        type="source"
        className="handle_edge"
        position={position}
        onClick={() => {}}
      />
  );
}

export default HandleSource;
