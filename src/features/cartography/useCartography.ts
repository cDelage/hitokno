import { Edge, Node, NodeChange, applyNodeChanges } from "reactflow";
import { create } from "zustand";
import {
  DefaultShape,
  NODE_CREATION,
  NodeToSave,
} from "./CartographyConstants";
import {
  DataNode,
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

type UseCartographyStore = {
  nodes: Node<DataNode>[];
  edges: Edge[];
  mainToolbarActiveMenu: MainToolbarMode;
  panOnDragMode: PaneOnDragMode;
  shapeCreationDesc: ShapeDescription;
  isSyncWithDB: boolean;
  setIsSyncWithDB: (isSync: boolean) => void;
  getNodesForSave: () => Node[];
  setShapeCreationDesc: (shapeDesc: ShapeDescription) => void;
  setPanOnDragMode: (panOnDragMode: PaneOnDragMode) => void;
  setMainToolbarActiveMenu: (mode: MainToolbarMode) => void;
  setNodes: (nds: Node[]) => void;
  setEdges: (edg: Edge[]) => void;
  onNodesChange: (changes: NodeChange[]) => void;
  setShowNodeToolbar: (nodeId: string | undefined) => void;
  getNodeWidth: (nodeId: string) => number;
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
};

const useCartography = create<UseCartographyStore>((set, get) => ({
  nodes: [],
  edges: [],
  mainToolbarActiveMenu: undefined,
  panOnDragMode: undefined,
  shapeCreationDesc: DefaultShape,
  isSyncWithDB: true,
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
  getNodeWidth: (nodeId: string): number => {
    return get().nodes.find((node) => node.id === nodeId)?.style
      ?.width as number;
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
              shapeDescription: state.shapeCreationDesc,
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
}));

export default useCartography;
