import styled from "styled-components";
import ShapeDispatch from "./shapes/ShapeDispatch";
import { useEffect, useState } from "react";
import useCartography from "./useCartography";
import { NodeProps, useReactFlow } from "reactflow";
import { DataNode } from "../../types/Cartography.type";

const NodeCreationStyled = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
`;

function NodeCreation({ xPos, yPos }: NodeProps<DataNode>) {
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

    function handleResizeCreationNode(event: MouseEvent) {
      const node = findNodeById("node-creation");
      const cursorPosition = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const width = cursorPosition.x - xPos;
      const height = cursorPosition.y - yPos;
      const scaleX: boolean = width < 0;
      const scaleY: boolean = height < 0;
      //When the cursor is under X or Y axis, then move the translate
      const transform = `translate(${scaleX ? xPos - width : xPos}px, ${
        scaleY ? yPos - height : yPos
      }px)`;

      updateNode({
        ...node,
        style: {
          width: Math.abs(width),
          height: Math.abs(height),
          transform,
        },
      });
    }

    function handleMouseDown() {
      setIsClicked(true);
    }

    if (isClicked) {
      document.removeEventListener("mousemove", handleMouseMove);
      document.addEventListener("mousemove", handleResizeCreationNode);
    } else {
      document.removeEventListener("mousemove", handleResizeCreationNode);
      document.addEventListener("mousemove", handleMouseMove);
    }

    document.addEventListener("mousedown", handleMouseDown);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mousemove", handleResizeCreationNode);
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, [findNodeById, updateNode, screenToFlowPosition, isClicked, xPos, yPos]);

  return (
    <NodeCreationStyled id="node-creation-container">
      <ShapeDispatch shape={"ellipse"} fill={"#22a3ee"} $shadow={"none"} />
    </NodeCreationStyled>
  );
}

export default NodeCreation;
