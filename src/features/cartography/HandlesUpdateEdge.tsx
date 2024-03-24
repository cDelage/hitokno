import { Handle, Position } from "reactflow";
import { HandlesUpdateList } from "./CartographyConstants";
import useCartography from "./useCartography";
import { useCallback, useMemo } from "react";

function HandlesUpdateEdge({id}: {id: string}) {
  const { updateEdgePayload, setUpdateEdgePayload } = useCartography();

  const type = useMemo(() => {
    return updateEdgePayload?.type === "source" ? "target" : "source";
  }, [updateEdgePayload?.type]);

  const handleMouseEnter = useCallback((position : Position) => {
    if(updateEdgePayload){
      setUpdateEdgePayload({
            ...updateEdgePayload,
            targetNodeId: id,
            targetPosition: position
        })
    }
  },[setUpdateEdgePayload, id, updateEdgePayload]);

  const handleMouseLeave =  useCallback(() => {
    if(updateEdgePayload){
        setUpdateEdgePayload({
            ...updateEdgePayload,
            targetNodeId: undefined,
            targetPosition: undefined
        })
    }
  },[setUpdateEdgePayload, updateEdgePayload])

  return (
    <>
      {HandlesUpdateList.map((handle) => (
        <Handle
          key={handle.handleId}
          position={handle.position}
          id={handle.handleId}
          className="handle_edge"
          type={type}
          onMouseEnter={() => handleMouseEnter(handle.position)}
          onMouseLeave={handleMouseLeave}
        />
      ))}
    </>
  );
}

export default HandlesUpdateEdge;
