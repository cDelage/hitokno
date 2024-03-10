import { useCallback, useEffect } from "react";
import { DataNode } from "../../types/Cartography.type";
import useCartography from "./useCartography";
import { Node } from "reactflow";
import { v4 as uuidv4 } from "uuid";

function HandleDuplicateNode({
  data,
  size: { width, height },
  xPos,
  yPos,
  selected,
  type,
}: {
  data: DataNode;
  size: { width: number; height: number };
  selected: boolean;
  xPos: number;
  yPos: number;
  type: string;
}) {
  const { addNewNode } = useCartography();

  const handleDuplicateNode = useCallback(
    (e: KeyboardEvent) => {
      const isCtrlPressed = e.ctrlKey || e.metaKey;
      if (
        (isCtrlPressed && e.key === "d") ||
        (e.key === "D" && selected)
      ) {
        const newNode: Node<DataNode> = {
          id: uuidv4(),
          position: {
            x: xPos,
            y: yPos + height + 20,
          },
          style: {
            width: width,
            height: height,
          },
          data,
          type,
        };

        addNewNode(newNode);
      }
    },
    [addNewNode, data, height, selected, width, xPos, yPos, type]
  );

  useEffect(() => {
    if(selected){
        document.addEventListener("keydown", handleDuplicateNode);
    }else {
        document.removeEventListener("keydown",handleDuplicateNode)
    }

    return () => {
      document.removeEventListener("keydown", handleDuplicateNode);
    };
  },[handleDuplicateNode, selected]);

  return null;
}

export default HandleDuplicateNode;
