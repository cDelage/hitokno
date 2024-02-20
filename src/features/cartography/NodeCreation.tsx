import styled from "styled-components";
import ShapeDispatch from "./shapes/ShapeDispatch";
import { useEffect, useState } from "react";
import useCartography from "./useCartography";
import { useReactFlow } from "reactflow";

const NodeCreationStyled = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  position: relative;
`;

function NodeCreation() {
  const { findNodeById, updateNode } = useCartography();
  const { screenToFlowPosition } = useReactFlow();
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    function handleMouseMove(event: MouseEvent) {
      const node = findNodeById("node-creation");
      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      updateNode({ ...node, position });
    }


    function handleMouseDown() {
      setIsClicked(true);
    }

    if (isClicked) {
      document.removeEventListener("mousemove", handleMouseMove);
    } else {
      document.addEventListener("mousemove", handleMouseMove);
    }

    document.addEventListener("mousedown", handleMouseDown);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, [findNodeById, updateNode, screenToFlowPosition, isClicked]);

  return (
    <NodeCreationStyled>
      <ShapeDispatch shape={"ellipse"} fill={"#22a3ee"} $shadow={"none"} />
    </NodeCreationStyled>
  );
}

export default NodeCreation;
