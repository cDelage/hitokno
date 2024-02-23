import { useCallback } from "react";
import { EdgeCreationProps, HandleProps } from "../../types/Cartography.type";
import HandleStyled from "./HandleStyled";
import useCartography from "./useCartography";

function HandleTarget({
  handleId,
  position,
  isHoverNode,
  nodeId
}: HandleProps & { nodeId: string; isHoverNode: boolean }) {
    const {setEdgeCreationProps} = useCartography();

    const handleMouseEnter = useCallback(() => {
      setEdgeCreationProps({
        targetHandleId :  handleId,
        targetNodeId : nodeId,
        targetPosition: position
      } as EdgeCreationProps)
    },[setEdgeCreationProps, handleId, nodeId, position]);

    const handleMouseLeave = useCallback(() => {
      setEdgeCreationProps({
        targetHandleId :  undefined,
        targetNodeId : undefined,
        targetPosition: undefined
      } as EdgeCreationProps)
    },[setEdgeCreationProps])

    if(!isHoverNode) return null;
    return <HandleStyled id={handleId} type="target" position={position} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}/>;
}

export default HandleTarget;
