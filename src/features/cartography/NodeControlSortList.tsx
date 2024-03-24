import {
  DragEvent,
  Fragment,
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Column } from "../../ui/Row";
import NodeControlEntry from "./NodeControlEntry";
import useCartography from "./useCartography";
import { Node } from "reactflow";
import { DataNode, NodeSortListItem } from "../../types/Cartography.type";
import { CSSProp } from "styled-components";
import NodeControlGroupEntry from "./NodeControlGroupEntry";

const EntriesContainerStyle: CSSProp = {
  backgroundColor: "var(--color-gray-200)",
  padding: "4px",
  gap: "4px",
  height: "100%",
  overflowY: "auto",
};

const applyHierarchy = (
  node: NodeSortListItem,
  list: NodeSortListItem[]
): NodeSortListItem => {
  const newNode = { ...node };
  list.forEach((x) => {
    if (x.node.parentNode === newNode.node.id) {
      x.childs = list
        .filter((y) => y.node.parentNode === x.node.id)
        .map((y) => applyHierarchy(y, list));
      newNode.childs.push(x);
    }
  });
  return newNode;
};

function sortNodesForList(nodes: Node<DataNode>[]) {
  const reverse = nodes.slice().reverse();

  const unClassedList = reverse.map((node) => {
    return {
      node,
      childs: [],
    } as NodeSortListItem;
  });

  return unClassedList
    .filter((x) => x.node.parentNode === undefined)
    .map((x) => applyHierarchy(x, unClassedList));
}

function findAllParent(
  id: string,
  list: NodeSortListItem[],
  parents: NodeSortListItem[]
): NodeSortListItem[] {
  let result: NodeSortListItem[] = [];
  list.forEach((x) => {
    if (x.node.id === id) {
      result = parents;
    } else {
      const childResult = findAllParent(id, x.childs, [...parents, x]);
      if (childResult) {
        result = childResult;
      }
    }
  });
  return result;
}

function findNodeSortInList(
  id: string,
  list: NodeSortListItem[]
): NodeSortListItem | undefined {
  let result: NodeSortListItem | undefined = undefined;
  list.forEach((x) => {
    if (x.node.id === id) {
      result = x;
    } else {
      const childResult = findNodeSortInList(id, x.childs);
      if (childResult) {
        result = childResult;
      }
    }
  });
  return result;
}

function spliceNode(id: string, list: NodeSortListItem[]) {
  let indexToSplice: undefined | number = undefined;
  const newList = list.slice();
  list.forEach((x, index) => {
    if (x.node.id === id) {
      indexToSplice = index;
    } else {
      x.childs = spliceNode(id, x.childs);
    }
  });
  if (indexToSplice !== undefined) {
    newList.splice(indexToSplice, 1);
    return newList;
  }
  return newList;
}

function insertNode(
  insertId: string,
  list: NodeSortListItem[],
  item: NodeSortListItem
) {
  let indexToSplice: undefined | number = undefined;
  const newList = list.slice();
  list.forEach((x, index) => {
    if (x.node.id === insertId) {
      indexToSplice = index;
    } else {
      x.childs = insertNode(insertId, x.childs, item);
    }
  });
  if (indexToSplice !== undefined) {
    newList.splice(indexToSplice, 0, item);
    return newList;
  }
  return newList;
}

function reverseList(list: NodeSortListItem[]) {
  const newList = list.slice().reverse();
  const resultList: Node<DataNode>[] = [];
  newList.forEach((entry) => {
    resultList.push(entry.node);

    reverseList(entry.childs).forEach((x) => resultList.push(x));
  });

  return resultList;
}

type SortingContextType = {
  currentDragged: string | undefined;
  currentDraggedGroup: string | undefined;
  currentRenamed: string | undefined;
  handleSetCurrentRenamed: (nodeId: string) => void;
  handleDragStart: (nodeId: string, groupId: string | undefined) => void;
  handleDragEnter: (
    e: DragEvent<HTMLDivElement>,
    nodeId: string,
    groupId: string | undefined
  ) => void;
  handleCloseRename: () => void;
  handleDoubleClickRename: (id: string) => void;
};

export const SortingContext = createContext<undefined | SortingContextType>(
  undefined
);

function NodeControlSortList() {
  const [currentDragged, setCurrentDragged] = useState<string | undefined>(
    undefined
  );
  const [currentDraggedGroup, setCurrentDraggedGroup] = useState<
    string | undefined
  >(undefined);
  const [currentRenamed, setCurrentRenamed] = useState<string | undefined>(
    undefined
  );

  const { nodes, setNodes, setIsSyncWithDB } = useCartography();
  const sortList = sortNodesForList(nodes);

  const handleDragStart = useCallback(
    (nodeId: string, groupId: string | undefined) => {
      setCurrentDragged(nodeId);
      setCurrentDraggedGroup(groupId);
    },
    []
  );
  const handleDragEnter = useCallback(
    (
      e: DragEvent<HTMLDivElement>,
      nodeId: string,
      groupId: string | undefined
    ) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";

      const allParents = findAllParent(nodeId, sortList, []).map(
        (x) => x.node.id
      );

      if (
        currentDragged &&
        currentDragged !== nodeId &&
        !allParents.includes(currentDragged)
      ) {
        //1 - récupérer le currentDrag NodeSortListItem
        const currentDraggedItem = findNodeSortInList(currentDragged, sortList);

        if (currentDraggedItem) {
          currentDraggedItem.node.parentNode = groupId;
          //2 - supprimer le currentDrag dans sa position
          const listWithoutCurrentDrag = spliceNode(currentDragged, sortList);

          //3 - insérer le currentDrag à sa nouvelle position
          const newList = insertNode(
            nodeId,
            listWithoutCurrentDrag,
            currentDraggedItem
          );

          //4 - déplier la liste
          const resultList = reverseList(newList);

          //5 - mettre à jour l'ordre des nodes
          setNodes(resultList);
          setIsSyncWithDB(false);
        }
      }
    },
    [currentDragged, sortList, setNodes, setIsSyncWithDB]
  );
  const handleDragEnd = useCallback(() => {
    setCurrentDragged(undefined);
    setCurrentDraggedGroup(undefined);
  }, [setCurrentDragged, setCurrentDraggedGroup]);

  const handleSetCurrentRenamed = useCallback((nodeId: string) => {
    setCurrentRenamed((r) => (r !== nodeId ? nodeId : undefined));
  }, []);

  const handleCloseRename = useCallback(() => {
    setCurrentRenamed(undefined);
  }, []);

  const handleDoubleClickRename = useCallback(
    (id: string) => {
      if (currentRenamed !== id) {
        setCurrentRenamed(id);
      }
    },
    [currentRenamed]
  );

  useEffect(() => {
    if (currentDragged) {
      document.addEventListener("dragend", handleDragEnd);
      document.addEventListener("mouseup", handleDragEnd);
    } else {
      document.removeEventListener("dragend", handleDragEnd);
      document.removeEventListener("mouseup", handleDragEnd);
    }
    
    return () => {
      document.removeEventListener("dragend", handleDragEnd);
      document.removeEventListener("mouseup", handleDragEnd);
    };
  }, [currentDragged, handleDragEnd]);

  return (
    <SortingContext.Provider
      value={{
        currentDragged,
        currentDraggedGroup,
        currentRenamed,
        handleDragEnter,
        handleDragStart,
        handleSetCurrentRenamed,
        handleCloseRename,
        handleDoubleClickRename,
      }}
    >
      <Column $style={EntriesContainerStyle}>
        {sortList.map((sortEntry) => (
          <Fragment key={`node-control-${sortEntry.node.id}`}>
            {sortEntry.node.type === "groupNode" ? (
              <NodeControlGroupEntry nodeSort={sortEntry} />
            ) : (
              <NodeControlEntry node={sortEntry.node} />
            )}
          </Fragment>
        ))}
      </Column>
    </SortingContext.Provider>
  );
}

export default NodeControlSortList;
