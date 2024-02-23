import { HandleProps } from "../../types/Cartography.type";
import HandleStyled from "./HandleStyled";
import useCartography from "./useCartography";
import { useCallback, useEffect } from "react";

function HandleSource({
  handleId,
  position,
  isHoverNode,
  nodeId,
}: HandleProps & { nodeId: string; isHoverNode: boolean }) {
  const {
    edgeCreationProps: { isCreateEdge, sourceNodeId, sourceHandleId },
    setEdgeCreationProps,
    createNewEdge,
  } = useCartography();

  const isDisplay =
    (isHoverNode && !isCreateEdge) ||
    (isCreateEdge && sourceNodeId === nodeId && sourceHandleId === handleId);
  const handleClick = useCallback(() => {
    setEdgeCreationProps({
      isCreateEdge: true,
      sourceNodeId: nodeId,
      sourceHandleId: handleId,
      sourcePosition: position
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
    <HandleStyled
      id={handleId}
      onMouseDown={handleClick}
      type="source"
      position={position}
      onClick={() => {}}
    />
  );
}

export default HandleSource;
