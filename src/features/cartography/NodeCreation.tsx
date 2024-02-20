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
  const {
    findNodeById,
    updateNode,
    handleCreateNode,
    shapeCreationDesc: { border, shadow, shape, theme },
  } = useCartography();
  const { screenToFlowPosition } = useReactFlow();
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    function MouseMoveReplaceInitialPosition(event: MouseEvent) {
      const node = findNodeById("node-creation");
      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      updateNode({ ...node, position });
    }

    function MouseMoveResizeNodeCreation(event: MouseEvent) {
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
      const transform = `translate(${scaleX ? xPos + width : xPos}px, ${
        scaleY ? yPos + height : yPos
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

    function MouseDownStartCreateNode() {
      setIsClicked(true);
    }

    function MouseUpCreateNewNode(event : MouseEvent){
      document.removeEventListener("mousemove", MouseMoveResizeNodeCreation);
      const cursorPosition = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const width = cursorPosition.x - xPos;
      const height = cursorPosition.y - yPos;
      const scaleX: boolean = width < 0;
      const scaleY: boolean = height < 0;

      const newX = scaleX ? xPos + width : xPos;
      const newY = scaleY ? yPos + height : yPos;

      handleCreateNode(newX, newY, width, height)
    }

    if (isClicked) {
      document.removeEventListener("mousemove", MouseMoveReplaceInitialPosition);
      document.addEventListener("mousemove", MouseMoveResizeNodeCreation);
      document.addEventListener("mouseup", MouseUpCreateNewNode)
    } else {
      document.removeEventListener("mousemove", MouseMoveResizeNodeCreation);
      document.addEventListener("mousemove", MouseMoveReplaceInitialPosition);
    }
    
    document.addEventListener("mousedown", MouseDownStartCreateNode);
    
    return () => {
      document.removeEventListener("mouseup", MouseUpCreateNewNode)
      document.removeEventListener("mousemove", MouseMoveReplaceInitialPosition);
      document.removeEventListener("mousemove", MouseMoveResizeNodeCreation);
      document.removeEventListener("mousedown", MouseDownStartCreateNode);
    };
  }, [findNodeById, updateNode, screenToFlowPosition, isClicked, xPos, yPos, handleCreateNode]);

  return (
    <NodeCreationStyled id="node-creation-container">
      <ShapeDispatch
        shape={shape}
        fill={theme.fill}
        $shadow={shadow}
        border={border ? theme.stroke : "none"}
      />
    </NodeCreationStyled>
  );
}

export default NodeCreation;
