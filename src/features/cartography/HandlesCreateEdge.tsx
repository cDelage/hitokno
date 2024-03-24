import { useUpdateNodeInternals } from "reactflow";
import { HandlesSourcesList, HandlesTargetList } from "./CartographyConstants";
import HandleSource from "./HandleSource";
import useCartography from "./useCartography";
import { useEffect } from "react";
import HandleTarget from "./HandleTarget";

function HandlesCreateEdge({
  nodeId,
}: {
  nodeId: string;
  isHoverNode: boolean;
}) {

  const updateNodeInternals = useUpdateNodeInternals();
  const {edgeCreationProps: {isCreateEdge}} = useCartography();

  useEffect(() => {
    updateNodeInternals(nodeId)
  },[isCreateEdge, updateNodeInternals, nodeId])

  return (
    <>
      {HandlesSourcesList.map(({handleId, position}) => (
        <HandleSource
          key={handleId}
          handleId={handleId}
          position={position}
          nodeId={nodeId}
        />
      ))}
      {isCreateEdge && HandlesTargetList.map(({handleId, position}) => (
        <HandleTarget
          key={handleId}
          handleId={handleId}
          nodeId={nodeId}
          position={position}
        />
      ))}
    </>
  );
}

export default HandlesCreateEdge;
