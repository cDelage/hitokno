import { Edge, Node, NodeChange, applyNodeChanges } from "reactflow";
import { create } from "zustand";
import { NODE_DEFAULT, NODE_DEFAULT_2 } from "./CartographyConstants";
import { DataNode } from "../../types/Cartography.type";

type UseCartographyStore = {
  nodes: Node<DataNode>[];
  edges: Edge[];
  setNodes: (nds: Node[]) => void;
  setEdges: (edg: Edge[]) => void;
  onNodesChange: (changes: NodeChange[]) => void;
  setShowNodeToolbar: (nodeId: string | undefined) => void;
  getNodeWidth: (nodeId: string) => number;
  getNodeData: (nodeId: string) => DataNode;
  setNodeData: (nodeId: string, data: DataNode) => void;
};

const useCartography = create<UseCartographyStore>((set, get) => ({
  nodes: [NODE_DEFAULT, NODE_DEFAULT_2],
  edges: [],
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
  onNodesChange: (changes: NodeChange[]) => {
    set((state) => {
      return {
        nodes: applyNodeChanges<DataNode>(changes, state.nodes),
      };
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
}));

export default useCartography;
