import { useCallback } from "react";
import { EdgeCreationProps, HandleProps } from "../../types/Cartography.type";
import useCartography from "./useCartography";
import { Handle } from "reactflow";


function HandleTarget({
  handleId,
  position,
  nodeId,
}: HandleProps & { nodeId: string;}) {
  const { setEdgeCreationProps } = useCartography();

  const handleMouseEnter = useCallback(() => {
    setEdgeCreationProps({
      targetHandleId: handleId,
      targetNodeId: nodeId,
      targetPosition: position,
    } as EdgeCreationProps);
  }, [setEdgeCreationProps, handleId, nodeId, position]);

  const handleMouseLeave = useCallback(() => {
    setEdgeCreationProps({
      targetHandleId: undefined,
      targetNodeId: undefined,
      targetPosition: undefined,
    } as EdgeCreationProps);
  }, [setEdgeCreationProps]);

  return (
    <Handle
      id={handleId}
      type="target"
      position={position}
      className="handle_edge"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    />
  );
}

export default HandleTarget;
