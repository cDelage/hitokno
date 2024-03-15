import { DragEvent, useCallback, useState } from "react";
import { Column } from "../../ui/Row";
import NodeControlEntry from "./NodeControlEntry";
import useCartography from "./useCartography";
import moveElement from "../../utils/MoveElement";
import { Node } from "reactflow";
import { DataNode } from "../../types/Cartography.type";
import { CSSProp } from "styled-components";

const EntriesContainerStyle: CSSProp = {
  backgroundColor: "var(--color-gray-200)",
  padding: "4px",
  gap: "4px",
  height: "100%",
  overflowY: "auto",
};

function NodeSortList() {
  const [currentDragged, setCurrentDragged] = useState<string | undefined>(
    undefined
  );
  const { nodes, setNodes, setIsSyncWithDB } = useCartography();
  const [renameNodeId, setRenameNodeId] = useState<string | undefined>(
    undefined
  );

  const nodesReverse = nodes.slice().reverse();

  const handleDragStart = useCallback(
    (id: string) => {
      setCurrentDragged(id);
    },
    [setCurrentDragged]
  );

  const handleDragEnter = useCallback(
    (e: DragEvent<HTMLDivElement>, index: number) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";
      const indexTarget = nodesReverse.findIndex(
        (node) => node.id === currentDragged
      );
      if (currentDragged !== undefined) {
        const newNodes = moveElement<Node<DataNode>>(
          nodesReverse,
          indexTarget,
          index
        );
        setNodes(newNodes.slice().reverse());
        setIsSyncWithDB(false);
      }
    },
    [currentDragged, setNodes, setIsSyncWithDB, nodesReverse]
  );

  const handleDrop = useCallback(() => {
    setCurrentDragged(undefined);
  }, []);

  return (
    <Column $style={EntriesContainerStyle}>
      {nodesReverse.map((node, index) => (
        <NodeControlEntry
          key={`node-control-${node.id}`}
          node={node}
          renameNodeId={renameNodeId}
          onRename={() => setRenameNodeId(node.id)}
          dragStart={() => handleDragStart(node.id)}
          dragEnter={(e: DragEvent<HTMLDivElement>) =>
            handleDragEnter(e, index)
          }
          dragEnd={() => handleDrop()}
          draggedId={currentDragged}
          closeRenameMode={() => setRenameNodeId(undefined)}
        />
      ))}
    </Column>
  );
}

export default NodeSortList;
