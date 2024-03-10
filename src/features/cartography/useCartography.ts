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
  NODE_CREATION,
  NodeToSave,
} from "./CartographyConstants";
import {
  CreatedHandle,
  DataNode,
  EdgeCreationProps,
  MainToolbarMode,
  NodeMode,
  PaneOnDragMode,
  ShapeDescription,
} from "../../types/Cartography.type";
import { v4 as uuidv4 } from "uuid";
import { File } from "../../types/Repository.types";

const applyNodeMode = (node: Node<DataNode>, mode: NodeMode) => {
  return {
    ...node,
    data: {
      ...node.data,
      mode: mode,
    },
  };
};

const selectedNodeOnChange = (change: NodeChange) =>
  change.type === "select" && change.selected === true;
const unSelectedNodeOnChange = (change: NodeChange) =>
  change.type === "select" && change.selected === false;

type UseCartographyStore = {
  nodes: Node<DataNode>[];
  edges: Edge[];
  mainToolbarActiveMenu: MainToolbarMode;
  panOnDragMode: PaneOnDragMode;
  shapeCreationDesc: ShapeDescription;
  isSyncWithDB: boolean;
  edgeCreationProps: EdgeCreationProps;
  handlesActive: string[];
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
  clearCreateNodeMode: () => void;
  handleCreateNode: (
    xPos: number,
    yPos: number,
    width: number,
    height: number
  ) => void;
  updateNode: (node: Node<DataNode>) => void;
  findNodeById: (nodeId: string) => Node;
  setSelectionMode: (selectable: boolean) => void;
  initCartography: (file: File) => void;
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
  initCartography: ({ nodes, edges }: File) => {
    set({
      nodes,
      edges,
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
          ...state.nodes.filter((node) => node.type !== "creation"),
          NODE_CREATION,
        ],
      };
    });
  },
  clearCreateNodeMode: () => {
    set((state) => {
      return {
        nodes: state.nodes.filter((node) => node.type !== "creation"),
      };
    });
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
          ...state.nodes,
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
        isSyncWithDB: false
      };
    });
  },
}));

export default useCartography;
