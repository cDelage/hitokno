import { create } from "zustand";
import { PositionAbsolute } from "../../types/Position.type";

type NodeToolbarStore = {
  positionToolbar: PositionAbsolute;
  selectedNodeId: string;
  setSelectedNode: (id: string, pos: PositionAbsolute) => void;
  clearPositionToolbar: () => void;
};

const useNodeToolbar = create<NodeToolbarStore>((set) => ({
  positionToolbar: {} as PositionAbsolute,
  selectedNodeId: "",
  setSelectedNode: (id: string, pos: PositionAbsolute) => {
    set({
      positionToolbar: pos,
      selectedNodeId: id,
    });
  },
  clearPositionToolbar: () => {
    set({
      positionToolbar: {} as PositionAbsolute,
      selectedNodeId: "",
    });
  },
}));

export default useNodeToolbar;
