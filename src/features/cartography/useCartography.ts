import {
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  NodeSelectionChange,
  Position,
  XYPosition,
  applyEdgeChanges,
  applyNodeChanges,
} from "reactflow";
import { create } from "zustand";
import {
  DefaultShape,
  GROUP_CREATION,
  NODE_CREATION,
  NodeToSave,
} from "./CartographyConstants";
import {
  CreatedHandle,
  DataNode,
  EdgeCreationProps,
  MainToolbarMode,
  NodeAlignement,
  NodeMode,
  PaneOnDragMode,
  ShapeDescription,
  updateEdgePayload as UpdateEdgePayload,
} from "../../types/Cartography.type";
import { v4 as uuidv4 } from "uuid";
import { FileHitokno } from "../../types/Repository.types";
import moveElement from "../../utils/moveElement";

const applyNodeMode = (node: Node<DataNode>, mode: NodeMode) => {
  return {
    ...node,
    data: {
      ...node.data,
      mode: mode,
    },
  };
};

const isInsideGroup = (
  node: Node<DataNode>,
  group: Node<DataNode>,
  exit: boolean
) => {
  const {
    position: { x: nodeX, y: nodeY },
    width: nodeWidth,
    height: nodeHeight,
  } = node;
  const {
    position: { x: groupX, y: groupY },
    width: groupWidth,
    height: groupHeight,
  } = group;

  if (exit) {
    return (
      nodeX >= groupX &&
      nodeY >= groupY &&
      nodeX + (nodeWidth as number) <= groupX + (groupWidth as number) &&
      nodeY + (nodeHeight as number) <= groupY + (groupHeight as number)
    );
  }

  const nodeMaxX = nodeX + (nodeWidth as number) + groupX;
  const nodeMaxY = nodeY + (nodeHeight as number) + groupY;
  const groupMaxX = groupX + (groupWidth as number);
  const groupMaxY = groupY + (groupHeight as number);

  return !(
    nodeMaxX <= groupX ||
    nodeMaxY <= groupY ||
    nodeX + groupX >= groupMaxX ||
    nodeY + groupY >= groupMaxY
  );
};

const selectedNodeOnChange = (change: NodeChange) =>
  change.type === "select" && change.selected === true;
const unSelectedNodeOnChange = (change: NodeChange) =>
  change.type === "select" && change.selected === false;

const getGroupPositionGap = (
  field: "x" | "y",
  groupAround: Node<DataNode> | undefined,
  isGrouped: boolean,
  exitGroup: boolean,
  node: Node<DataNode>,
  isOutOfTheBox: boolean
) => {
  if (groupAround && !isGrouped) {
    return node.position[field] - groupAround.position[field];
  } else if ((exitGroup || isOutOfTheBox) && groupAround) {
    return groupAround.position[field] + node.position[field];
  } else {
    return node.position[field];
  }
};

type UseCartographyStore = {
  nodes: Node<DataNode>[];
  edges: Edge[];
  mainToolbarActiveMenu: MainToolbarMode;
  panOnDragMode: PaneOnDragMode;
  shapeCreationDesc: ShapeDescription;
  isSyncWithDB: boolean;
  edgeCreationProps: EdgeCreationProps;
  handlesActive: string[];
  movedNode: string | undefined;
  identicalWidthNodes: string[];
  identicalHeightNodes: string[];
  isInitViewport: boolean;
  isSaved: boolean;
  updateEdgePayload: UpdateEdgePayload | undefined;
  setIsSaved: (isSaved: boolean) => void;
  addHandlesActive: (handles: string[]) => void;
  removeHandlesActive: (handles: string[]) => void;
  setEdgeCreationProps: (edgeCreationProps: EdgeCreationProps) => void;
  setIsSyncWithDB: (isSync: boolean) => void;
  getNodesForSave: () => Node[];
  setShapeCreationDesc: (shapeDesc: ShapeDescription) => void;
  setPanOnDragMode: (panOnDragMode: PaneOnDragMode) => void;
  setMainToolbarActiveMenu: (mode: MainToolbarMode) => void;
  setNodes: (nds: Node[]) => void;
  setEdges: (edg: Edge[]) => void;
  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  setShowNodeToolbar: (nodeId: string | undefined) => void;
  getNodeSize: (nodeId: string) => { width: number; height: number };
  getNodeData: (nodeId: string) => DataNode;
  setNodeData: (nodeId: string, data: DataNode) => void;
  setCreateNodeMode: () => void;
  setCreateGroupMode: () => void;
  clearCreateNodeMode: () => void;
  clearCreateGroupMode: () => void;
  getCreationNode: () => Node<DataNode>[];
  handleCreateNode: (
    xPos: number,
    yPos: number,
    width: number,
    height: number
  ) => void;
  handleCreateGroup: (
    xPos: number,
    yPos: number,
    width: number,
    height: number
  ) => void;
  updateNode: (node: Node<DataNode>) => void;
  findNodeById: (nodeId: string) => Node;
  setSelectionMode: (selectable: boolean) => void;
  initCartography: (file: FileHitokno) => void;
  toggleEditMode: (nodeId: string) => void;
  createNewEdge: () => void;
  deleteEdge: (
    edgeId: string,
    sourceHandleId: string,
    targetHandleId: string
  ) => void;
  deleteNode: (nodeId: string) => void;
  getNodeCenterCoordinate: (nodeId: string) => XYPosition;
  findSheetData: (
    sheetId: string
  ) => { nodeId: string; data: DataNode } | undefined;
  addNewNode: (node: Node<DataNode>) => void;
  handleDuplicateNode: () => void;
  findTopAlignedNode: (id: string, pointToAlign: number) => boolean;
  findLeftAlignedNode: (id: string, pointToAlign: number) => boolean;
  findRightAlignedNode: (id: string, pointToAlign: number) => boolean;
  findBottomAlignedNode: (id: string, pointToAlign: number) => boolean;
  findCenterXAlignedNode: (id: string, pointToAlign: number) => boolean;
  findCenterYAlignedNode: (id: string, pointToAlign: number) => boolean;
  handleDragStop: () => void;
  addHelperLines: (id: string) => void;
  addSameSizeHelperLines: (
    id: string,
    dimension: { width: number; height: number }
  ) => void;
  handleDeleteSelected: () => void;
  selectNode: (id: string) => void;
  addNodeToSelection: (id: string) => void;
  //To delete
  setGroupAround: (
    node: Node<DataNode>,
    minX: number,
    minY: number,
    maxX: number,
    maxY: number
  ) => void;
  setNodesInside: (
    id: string,
    minX: number,
    minY: number,
    maxX: number,
    maxY: number
  ) => void;
  handleNodeDrag: (node: Node<DataNode>) => void;
  setNodeInGroup: (nodeId: string, groupId: string) => void;
  getSelectedNodes: () => Node<DataNode>[];
  setModeUpdateHandle: (updateEdgePayload: UpdateEdgePayload) => void;
  endModeUpdateHandle: () => void;
  setUpdateEdgePayload: (updateEdgePayload: UpdateEdgePayload) => void;
};

const useCartography = create<UseCartographyStore>((set, get) => ({
  nodes: [],
  edges: [],
  mainToolbarActiveMenu: undefined,
  panOnDragMode: undefined,
  shapeCreationDesc: DefaultShape,
  isSyncWithDB: true,
  edgeCreationProps: {} as EdgeCreationProps,
  handlesActive: [],
  identicalWidthNodes: [],
  identicalHeightNodes: [],
  movedNode: undefined,
  isInitViewport: false,
  isSaved: true,
  updateEdgePayload: undefined,
  addHandlesActive: (handles: string[]) => {
    set((state) => {
      return {
        handlesActive: [...state.handlesActive, ...handles],
      };
    });
  },
  removeHandlesActive: (handles: string[]) => {
    set((state) => {
      return {
        handlesActive: state.handlesActive.filter(
          (handle) => !handles.includes(handle)
        ),
      };
    });
  },
  createNewEdge: () => {
    const {
      isCreateEdge,
      sourceHandleId,
      sourceNodeId,
      sourcePosition,
      targetHandleId,
      targetNodeId,
      targetPosition,
    } = get().edgeCreationProps;

    if (
      isCreateEdge &&
      sourcePosition &&
      targetPosition &&
      sourceHandleId &&
      targetHandleId &&
      sourceNodeId &&
      targetNodeId
    ) {
      const newSourceHandle: CreatedHandle = {
        handleId: uuidv4(),
        position: sourcePosition ? sourcePosition : Position.Top,
        type: "source",
      };

      const newTargetHandle: CreatedHandle = {
        handleId: uuidv4(),
        position: targetPosition ? targetPosition : Position.Top,
        type: "target",
      };

      const newEdge: Edge = {
        id: uuidv4(),
        source: sourceNodeId,
        target: targetNodeId,
        type: "custom",
        sourceHandle: newSourceHandle.handleId,
        targetHandle: newTargetHandle.handleId,
      };

      set((state) => {
        return {
          isSyncWithDB: false,
          nodes: state.nodes.map((node) => {
            if (node.id === sourceNodeId) {
              return {
                ...node,
                data: {
                  ...node.data,
                  handles: [...node.data.handles, newSourceHandle],
                },
              };
            }
            if (node.id === targetNodeId) {
              return {
                ...node,
                data: {
                  ...node.data,
                  handles: [...node.data.handles, newTargetHandle],
                },
              };
            }
            return node;
          }),
          edges: [...state.edges, newEdge],
        };
      });
    }

    get().setMainToolbarActiveMenu(undefined);
  },
  deleteEdge: (
    edgeId: string,
    sourceHandleId: string,
    targetHandleId: string
  ) => {
    set((state) => {
      return {
        edges: state.edges.filter((edge) => edge.id !== edgeId),
        isSyncWithDB: false,
        nodes: state.nodes.map((node) => {
          return {
            ...node,
            data: {
              ...node.data,
              handles: node.data.handles.filter(
                (handle) =>
                  handle.handleId !== sourceHandleId &&
                  handle.handleId !== targetHandleId
              ),
            },
          };
        }),
      };
    });
  },
  deleteNode: (nodeId: string) => {
    const node = get().nodes.find((node) => node.id === nodeId);
    if (node) {
      const handles = node.data.handles.map((handle) => handle.handleId);
      const edges = get().edges.filter((edge) => {
        if (edge.sourceHandle && edge.targetHandle) {
          return (
            handles.includes(edge.sourceHandle) ||
            handles.includes(edge.targetHandle)
          );
        }
        return false;
      });

      edges.forEach((edge) => {
        if (edge.sourceHandle && edge.targetHandle) {
          get().deleteEdge(edge.id, edge.sourceHandle, edge.targetHandle);
        }
      });

      set((state) => {
        return {
          nodes: state.nodes.filter((nde) => nde.id !== nodeId),
          isSyncWithDB: false,
        };
      });
    }
  },
  setEdgeCreationProps: (edgeCreationProps: EdgeCreationProps) => {
    set((state) => {
      return {
        edgeCreationProps: { ...state.edgeCreationProps, ...edgeCreationProps },
      };
    });
  },
  setIsSyncWithDB: (isSyncWithDB: boolean) => {
    set({
      isSyncWithDB,
    });
  },
  setShapeCreationDesc(shapeDesc: ShapeDescription) {
    set({
      shapeCreationDesc: shapeDesc,
    });
  },
  getNodesForSave: () => {
    return get()
      .nodes.filter((node) => NodeToSave.includes(node.type as string))
      .map((node) => {
        return {
          ...node,
          selected: false,
          draggable: true,
          data: {
            ...node.data,
            mode: "DEFAULT",
          },
        };
      });
  },
  setNodes: (nds: Node<DataNode>[]) => {
    set({
      nodes: nds,
    });
  },
  setEdges: (edg: Edge[]) => {
    set({
      edges: edg,
    });
  },
  initCartography: ({ nodes, edges, isSaved }: FileHitokno) => {
    set({
      nodes,
      edges,
      isSaved,
    });
  },
  setMainToolbarActiveMenu: (mainToolbarMode: MainToolbarMode) => {
    set((state) => {
      return {
        mainToolbarActiveMenu:
          mainToolbarMode === state.mainToolbarActiveMenu
            ? undefined
            : mainToolbarMode,
      };
    });
  },
  onNodesChange: (changes: NodeChange[]) => {
    const beforeSelected = get().nodes.find((node) => node.selected);
    if (changes.filter(selectedNodeOnChange).length === 1) {
      const nodeSelected = changes.find(
        selectedNodeOnChange
      ) as NodeSelectionChange;
      if (nodeSelected.id !== beforeSelected?.id) {
        get().setShowNodeToolbar(nodeSelected.id);
      }
    } else if (changes.find(unSelectedNodeOnChange)) {
      get().setShowNodeToolbar(undefined);
    }

    set((state) => {
      return {
        nodes: applyNodeChanges<DataNode>(changes, state.nodes),
      };
    });

    const afterSelected = get().nodes.find((node) => node.selected);

    if (beforeSelected && beforeSelected.id !== afterSelected?.id) {
      set((state) => {
        return {
          nodes: state.nodes.map((node) => applyNodeMode(node, "DEFAULT")),
        };
      });
    } else if (beforeSelected) {
      set({
        isSyncWithDB: false,
      });
    }
  },
  onEdgesChange: (changes: EdgeChange[]) => {
    set((state) => {
      return {
        edges: applyEdgeChanges(changes, state.edges),
      };
    });
  },
  setPanOnDragMode: (panOnDragMode: PaneOnDragMode) => {
    set({
      panOnDragMode,
    });
  },
  setShowNodeToolbar: (nodeId: string | undefined) => {
    set((state) => {
      return {
        nodes: state.nodes.map((node) => {
          const newNode = { ...node };
          if (newNode.id === nodeId) {
            newNode.data.showNodeToolbar = true;
          } else {
            newNode.data.showNodeToolbar = false;
          }
          return newNode;
        }),
      };
    });
  },
  getNodeSize: (nodeId: string) => {
    return {
      width: get().nodes.find((node) => node.id === nodeId)?.style
        ?.width as number,
      height: get().nodes.find((node) => node.id === nodeId)?.style
        ?.height as number,
    };
  },
  findNodeById: (nodeId: string) => {
    return get().nodes.find((node) => node.id === nodeId) as Node;
  },
  updateNode: (node: Node<DataNode>) => {
    set((state) => {
      return {
        nodes: [...state.nodes.filter((x) => x.id !== node.id), node],
      };
    });
  },

  getNodeData: (nodeId: string): DataNode => {
    return get().nodes.find((node) => node.id === nodeId)?.data as DataNode;
  },
  setNodeData: (nodeId: string, data: DataNode) => {
    set((state) => {
      return {
        nodes: state.nodes.map((node) => {
          const newNode = { ...node };
          if (newNode.id === nodeId) newNode.data = data;
          return newNode;
        }),
        isSyncWithDB: false,
      };
    });
  },
  setCreateNodeMode: () => {
    set((state) => {
      return {
        nodes: [
          ...state.nodes.filter(
            (node) => node.type !== "creation" && node.type !== "creation-group"
          ),
          NODE_CREATION,
        ],
      };
    });
  },
  setCreateGroupMode: () => {
    set((state) => {
      return {
        nodes: [
          ...state.nodes.filter(
            (node) => node.type !== "creation" && node.type !== "creation-group"
          ),
          GROUP_CREATION,
        ],
      };
    });
  },
  clearCreateNodeMode: () => {
    set((state) => {
      return {
        nodes: state.nodes.filter(
          (node) => node.type !== "creation" && node.type !== "creation-group"
        ),
      };
    });
  },
  clearCreateGroupMode: () => {
    set((state) => {
      return {
        nodes: state.nodes.filter((node) => node.type !== "creation-group"),
      };
    });
  },
  getCreationNode: () => {
    return get().nodes.filter((node) => node.type?.startsWith("creation"));
  },
  handleCreateNode: (x, y, width, height) => {
    const countShape = get().nodes.filter(
      (node) =>
        node.data?.shapeDescription?.shape === get().shapeCreationDesc.shape
    ).length;

    set((state) => {
      return {
        mainToolbarActiveMenu: undefined,
        nodes: [
          ...state.nodes.filter((node) => !node.type?.startsWith("creation")),
          {
            id: uuidv4(),
            type: "shape",
            data: {
              mode: "DEFAULT",
              handles: [] as CreatedHandle[],
              shapeDescription: state.shapeCreationDesc,
              label: `${state.shapeCreationDesc.shape.toUpperCase()} ${countShape}`,
            },
            style: {
              width,
              height,
            },
            position: {
              x,
              y,
            },
          },
        ],
      };
    });
  },
  handleCreateGroup: (x, y, width, height) => {
    const countShape = get().nodes.filter(
      (node) => node.type === "groupNode"
    ).length;

    set((state) => {
      return {
        mainToolbarActiveMenu: undefined,
        nodes: [
          ...state.nodes.filter((node) => !node.type?.startsWith("creation")),
          {
            id: uuidv4(),
            type: "groupNode",
            data: {
              mode: "DEFAULT",
              handles: [] as CreatedHandle[],
              shapeDescription: state.shapeCreationDesc,
              label: `GROUP ${countShape}`,
            },
            style: {
              width,
              height,
            },
            position: {
              x,
              y,
            },
          },
        ],
      };
    });
  },
  setSelectionMode: (selectable: boolean) => {
    set((state) => {
      return {
        nodes: state.nodes.map((node) => {
          return {
            ...node,
            selectable,
            selected: false,
          };
        }),
      };
    });
  },
  toggleEditMode: (nodeId: string) => {
    set((state) => {
      return {
        nodes: state.nodes.map((node) => {
          if (node.id === nodeId) {
            const newMode = node.data.mode === "EDIT" ? "DEFAULT" : "EDIT";
            return applyNodeMode(node, newMode);
          } else {
            return applyNodeMode(node, "DEFAULT");
          }
        }),
      };
    });
  },
  getNodeCenterCoordinate: (nodeId: string) => {
    const node = get().findNodeById(nodeId);
    const centerX = node.position.x + (node.style?.width as number) / 2;
    const centerY = node.position.y + (node.style?.height as number) / 2;
    return {
      x: centerX,
      y: centerY,
    };
  },
  findSheetData: (sheetId: string) => {
    const node = get().nodes.find(
      (node) => node.data.sheet?.sheetId === sheetId
    );
    if (!node?.id) return undefined;
    return {
      nodeId: node.id,
      data: node.data as DataNode,
    };
  },
  addNewNode: (node: Node<DataNode>) => {
    set((state) => {
      return {
        nodes: [...state.nodes, node],
        isSyncWithDB: false,
      };
    });
  },
  handleDuplicateNode: () => {
    const selectedNodes = get().nodes.filter((node) => node.selected);
    selectedNodes.forEach((node) => {
      const { width, height } = get().getNodeSize(node.id);
      const newNode: Node<DataNode> = {
        id: uuidv4(),
        position: {
          x: node.position.x,
          y: node.position.y + height + 20,
        },
        style: {
          width: width,
          height: height,
        },
        data: {
          mode: "DEFAULT",
          handles: [],
          label: node.data.label + " copy",
          shapeDescription: node.data.shapeDescription,
          editorState: node.data.editorState,
        },
        type: node.type,
      };

      get().addNewNode(newNode);
    });
  },
  findAlignedNodes: (
    id: string,
    position: NodeAlignement,
    pointToAlign: number
  ) => {
    const nodes = get().nodes;
    if (position === "top") {
      return (
        nodes.filter(
          (node) => node.id !== id && node.position.y === pointToAlign
        ).length > 0
      );
    }
    if (position === "left") {
      return (
        nodes.filter(
          (node) => node.id !== id && node.position.x === pointToAlign
        ).length > 0
      );
    }
    return false;
  },
  findTopAlignedNode: (id, pointToAlign) => {
    return (
      get().nodes.filter(
        (node) => node.id !== id && node.position.y === pointToAlign
      ).length > 0
    );
  },
  findRightAlignedNode: (id, pointToAlign) => {
    return (
      get().nodes.filter(
        (node) =>
          node.id !== id &&
          node.position.x + (node.style ? (node.style.width as number) : 0) ===
            pointToAlign
      ).length > 0
    );
  },
  findLeftAlignedNode: (id, pointToAlign) => {
    return (
      get().nodes.filter(
        (node) => node.id !== id && node.position.x === pointToAlign
      ).length > 0
    );
  },
  findBottomAlignedNode: (id, pointToAlign) => {
    return (
      get().nodes.filter(
        (node) =>
          node.id !== id &&
          node.position.y + (node.style ? (node.style.height as number) : 0) ===
            pointToAlign
      ).length > 0
    );
  },
  findCenterXAlignedNode: (id, pointToAlign) => {
    return (
      get().nodes.filter(
        (node) =>
          node.id !== id &&
          node.position.x +
            (node.style ? (node.style.width as number) / 2 : 0) ===
            pointToAlign
      ).length > 0
    );
  },
  findCenterYAlignedNode: (id, pointToAlign) => {
    return (
      get().nodes.filter(
        (node) =>
          node.id !== id &&
          node.position.y +
            (node.style ? (node.style.height as number) / 2 : 0) ===
            pointToAlign
      ).length > 0
    );
  },
  handleDragStop: () => {
    set((state) => {
      return {
        movedNode: undefined,
        identicalHeightNodes: [],
        identicalWidthNodes: [],
        nodes: state.nodes.map((node) => {
          return {
            ...node,
            data: {
              ...node.data,
              isGrouped: node.parentNode ? true : false,
              parentIdStored: node.parentNode,
            },
          };
        }),
      };
    });
  },
  addHelperLines: (id: string) => {
    set({
      movedNode: id,
    });
  },
  addSameSizeHelperLines: (
    id: string,
    dimension: { width: number; height: number }
  ) => {
    const identicalWidth = get()
      .nodes.filter(
        (node) => node.id !== id && node.style?.width === dimension.width
      )
      .map((node) => node.id);

    if (identicalWidth.length) {
      identicalWidth.push(id);
    }
    const identicalHeight = get()
      .nodes.filter(
        (node) => node.id !== id && node.style?.height === dimension.height
      )
      .map((node) => node.id);
    if (identicalHeight.length) {
      identicalHeight.push(id);
    }
    set({
      identicalWidthNodes: identicalWidth,
      identicalHeightNodes: identicalHeight,
    });
  },
  setIsSaved: (isSaved: boolean) => {
    set({ isSaved });
  },
  handleDeleteSelected: () => {
    const modeEdit = get()
      .nodes.map((x) => x.data.mode)
      .includes("EDIT");

    if (!modeEdit) {
      const groupsDeleted = get()
        .nodes.filter((node) => node.selected && node.type === "groupNode")
        .map((node) => node.id);
      set((state) => {
        return {
          isSyncWithDB: false,
          nodes: state.nodes
            .filter((node) => !node.selected || node.data.sheet)
            .map((node) => {
              return {
                ...node,
                parentNode:
                  node.parentNode && groupsDeleted.includes(node.parentNode)
                    ? undefined
                    : node.parentNode,
              };
            }),
        };
      });
    }
  },
  selectNode: (id: string) => {
    set((state) => {
      return {
        nodes: state.nodes.map((node) => {
          return {
            ...node,
            selected: node.id === id,
          };
        }),
      };
    });
  },
  addNodeToSelection: (id: string) => {
    set((state) => {
      return {
        nodes: state.nodes.map((node) => {
          return {
            ...node,
            selected: node.selected
              ? node.id === id
                ? false
                : true
              : node.id === id,
          };
        }),
      };
    });
  },
  setGroupAround: (
    node: Node<DataNode>,
    minX: number,
    minY: number,
    maxX: number,
    maxY: number
  ) => {
    const {
      data: { isGrouped, parentIdStored },
      parentNode,
    } = node;

    const storedGroup = isGrouped
      ? get().nodes.find((group) => group.id === parentIdStored)
      : undefined;

    const groupAround = get()
      .nodes.filter((n) => n.type === "groupNode" && n.id !== node.id)
      .find((group) => {
        const {
          position: { x, y },
          width,
          height,
        } = group;
        const groupMaxX = x + (width || 0);
        const groupMaxY = y + (height || 0);

        return (
          minX + (isGrouped ? x : 0) >= x &&
          minY + (isGrouped ? y : 0) >= y &&
          maxX + (isGrouped ? x : 0) <= groupMaxX &&
          maxY + (isGrouped ? y : 0) <= groupMaxY
        );
      });

    if (groupAround) {
      get().setNodeInGroup(node.id, groupAround.id);
    }

    const definitiveGroup = storedGroup ? storedGroup : groupAround;
    const isOutOfTheBox =
      parentNode === undefined &&
      isGrouped !== undefined &&
      isGrouped &&
      (!groupAround || groupAround.id === parentIdStored);

    const exitGroup: boolean =
      isGrouped && storedGroup
        ? !isInsideGroup(node, storedGroup, parentNode === undefined)
        : false;

    set((state) => {
      return {
        nodes: state.nodes.map((n) => {
          if (n.id === node.id) {
            return {
              ...n,
              parentNode:
                definitiveGroup && !exitGroup ? definitiveGroup.id : undefined,
              position: {
                x: getGroupPositionGap(
                  "x",
                  definitiveGroup,
                  n.data.isGrouped ? n.data.isGrouped : false,
                  exitGroup,
                  node,
                  isOutOfTheBox
                ),
                y: getGroupPositionGap(
                  "y",
                  definitiveGroup,
                  n.data.isGrouped ? n.data.isGrouped : false,
                  exitGroup,
                  node,
                  isOutOfTheBox
                ),
              },
            };
          } else {
            return n;
          }
        }),
      };
    });
  },

  setNodesInside: (
    _id: string,
    minX: number,
    minY: number,
    maxX: number,
    maxY: number
  ) => {
    get()
      .nodes.filter((node) => node.type !== "groupNode")
      .filter((node) => {
        const nodeMaxX = node.position.x + ((node.style?.width as number) || 0);
        const nodeMaxY =
          node.position.y + ((node.style?.height as number) || 0);

        return (
          minX < node.position.x &&
          minY < node.position.y &&
          maxX > nodeMaxX &&
          maxY > nodeMaxY
        );
      })
      .map((x) => x.id);
  },
  handleNodeDrag: (node: Node<DataNode>) => {
    const { x, y } = node.position;
    const { width, height } = node;
    get().setGroupAround(
      node,
      x,
      y,
      x + (width as number),
      y + (height as number)
    );
  },
  setNodeInGroup: (nodeId: string, groupId: string) => {
    set((state) => {
      const nodes = state.nodes;
      const nodeIndex = nodes.findIndex((x) => x.id === nodeId);
      const targetGrouplist = nodes.filter(
        (x) => x.id === groupId || x.parentNode === groupId
      );
      const targetIndex =
        nodes.findIndex(
          (x) => x.id === targetGrouplist[targetGrouplist.length - 1].id
        ) + 1;
      const newList = moveElement(nodes, nodeIndex, targetIndex);
      return {
        nodes: newList,
      };
    });
  },
  getSelectedNodes: () => {
    return get().nodes.filter((node) => node.selected);
  },
  setModeUpdateHandle: (updateEdgePayload: UpdateEdgePayload) => {
    const nodeId =
      updateEdgePayload.type === "target"
        ? updateEdgePayload.edge.source
        : updateEdgePayload.edge.target;
    const handleId =
      updateEdgePayload.type === "target"
        ? updateEdgePayload.edge.sourceHandle
        : updateEdgePayload.edge.targetHandle;

    const handle = get()
      .nodes.find((node) => node.id === nodeId)
      ?.data.handles.find((handle) => handle.handleId === handleId);

    set({
      updateEdgePayload,
      mainToolbarActiveMenu: "CREATION-EDGE-UPDATE",
      edgeCreationProps: {
        sourcePosition: handle?.position,
      },
    });
  },
  endModeUpdateHandle: () => {
    const payload = get().updateEdgePayload;
    if (payload?.targetNodeId && payload.targetPosition) {
      const handleId =
        payload.type === "source"
          ? payload.edge.sourceHandle
          : payload.edge.targetHandle;

      const newHandle: CreatedHandle = {
        handleId: handleId as string,
        position: payload.targetPosition,
        type: payload.type,
      };

      set((state) => {
        return {
          nodes: state.nodes.map((node) => {
            const handles = node.data.handles.filter(
              (handle) => handle.handleId !== handleId
            );

            if (node.id === payload.targetNodeId) {
              handles.push(newHandle);
            }

            return {
              ...node,
              data: {
                ...node.data,
                handles,
              },
            };
          }),
          edges: state.edges.map((e) => {
            return {
              ...e,
              target:
                e.id === payload.edge.id && payload.type === "target"
                  ? (payload.targetNodeId as string)
                  : e.target,
              source:
                e.id === payload.edge.id && payload.type === "source"
                  ? (payload.targetNodeId as string)
                  : e.source,
            };
          }),
        };
      });
    }
    set({
      updateEdgePayload: undefined,
      mainToolbarActiveMenu: "DEFAULT",
      edgeCreationProps: undefined,
    });
  },
  setUpdateEdgePayload: (updateEdgePayload: UpdateEdgePayload) => {
    set((state) => {
      return {
        updateEdgePayload,
        edgeCreationProps: {
          ...state.edgeCreationProps,
          targetPosition: updateEdgePayload.targetPosition,
        },
      };
    });
  },
}));

export default useCartography;
