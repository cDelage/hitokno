import { Edge, Node, NodeChange, applyNodeChanges } from "reactflow";
import { create } from "zustand";
import {
  DefaultShape,
  NODE_CREATION,
  NODE_DEFAULT,
  NODE_DEFAULT_2,
} from "./CartographyConstants";
import {
  DataNode,
  MainToolbarMode,
  PaneOnDragMode,
  ShapeDescription,
} from "../../types/Cartography.type";

type UseCartographyStore = {
  nodes: Node<DataNode>[];
  edges: Edge[];
  mainToolbarActiveMenu: MainToolbarMode;
  panOnDragMode: PaneOnDragMode;
  shapeCreationDesc: ShapeDescription;
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
  updateNode: (node: Node<DataNode>) => void;
  findNodeById: (nodeId: string) => Node;
};

const useCartography = create<UseCartographyStore>((set, get) => ({
  nodes: [NODE_DEFAULT, NODE_DEFAULT_2],
  edges: [],
  mainToolbarActiveMenu: undefined,
  panOnDragMode: undefined,
  shapeCreationDesc: DefaultShape,
  setShapeCreationDesc(shapeDesc: ShapeDescription) {
    set({
      shapeCreationDesc: shapeDesc,
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
    set((state) => {
      return {
        nodes: applyNodeChanges<DataNode>(changes, state.nodes),
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
}));

export default useCartography;
