import { Border } from "../../types/Border.type";
import { Shadow, ShadowMenu, Shape, Theme } from "../../types/Cartography.type";
import NodeCreation from "./NodeCreation";
import NodeShape from "./NodeShape";

export const PX_UNIT_GAP = 8;

export const NodeCustomsComponents = {
  shape: NodeShape,
  creation : NodeCreation
};

export const ShadowsMenu: ShadowMenu[] = [
  {
    shadow: "none",
    shadowMenu: "none",
  },
  {
    shadow: "var(--shadow-shape-md)",
    shadowMenu: "var(--shadow-shape-menu-md)",
  },
  {
    shadow: "var(--shadow-shape-lg)",
    shadowMenu: "var(--shadow-shape-menu-lg)",
  },
];

export const ShapeMenu: Shape[] = ["rect", "rect-radius", "ellipse", "triangle","cylinder"];

export const NODE_SIZE_DEFAULT = {
  width: PX_UNIT_GAP * 16,
  height: PX_UNIT_GAP * 8,
};

export const NODE_DEFAULT = {
  id: "1",
  type: "shape",
  position: { x: 0, y: 0 },
  selected: false,
  data: {
    label: "LABEL",
    mode: "DEFAULT",
    shape: "rect" as Shape,
    border: false,
    shadow: "var(--shadow-shape-md)" as Shadow,
    theme: {
      id: "yellow-light",
      fill: "#FEF08A",
      color: "#1C1917",
      stroke: "#FACC15",
    },
    showNodeToolbar: false,
  },
  selectable: true,
  draggable: true,
  style: {
    ...NODE_SIZE_DEFAULT,
  },
};

export const NODE_DEFAULT_2 = {
  id: "2",
  type: "shape",
  position: { x: 200, y: 150 },
  selected: false,
  data: {
    label: "LABEL",
    mode: "DEFAULT",
    shape: "ellipse" as Shape,
    border: true,
    shadow: "var(--shadow-shape-lg)" as Shadow,
    theme: {
      id: "purple-dark",
      fill: "#4F46E5",
      color: "#FFFFFF",
      stroke: "#3730A3",
    },
    showNodeToolbar: false,
  },
  selectable: true,
  draggable: true,
  style: {
    ...NODE_SIZE_DEFAULT,
  },
};

export const NODE_CREATION = {
  id: "node-creation",
  type: "creation",
  position: { x: 0, y: 0 },
  selected: false,
  data: {
    label: "LABEL",
    mode: "DEFAULT",
    shape: "rect" as Shape,
    border: false,
    shadow: "var(--shadow-shape-md)" as Shadow,
    theme: {
      id: "yellow-light",
      fill: "#FEF08A",
      color: "#1C1917",
      stroke: "#FACC15",
    },
    showNodeToolbar: false,
  },
  selectable: false,
  draggable: false,
  style: {
    width: PX_UNIT_GAP,
    height: PX_UNIT_GAP,
  },
};

export const MenuBorderRight: Border = {
  borderRight: "1px solid var(--color-gray-200)",
};

export const ThemesDark: Theme[] = [
  {
    id: "black-dark",
    fill: "#000000",
    color: "#FFFFFF",
    stroke: "#57534E",
  },
  {
    id: "gray-dark",
    fill: "#57534E",
    color: "#FFFFFF",
    stroke: "#292524",
  },
  {
    id: "blue-dark",
    fill: "#0284C7",
    color: "#FFFFFF",
    stroke: "#075985",
  },
  {
    id: "purple-dark",
    fill: "#4F46E5",
    color: "#FFFFFF",
    stroke: "#3730A3",
  },
  {
    id: "violet-dark",
    fill: "#7C3AED",
    color: "#FFFFFF",
    stroke: "#5B21B6",
  },
  {
    id: "green-dark",
    fill: "#16A34A",
    color: "#1C1917",
    stroke: "#166534",
  },
  {
    id: "yellow-dark",
    fill: "#CA8A04",
    color: "#1C1917",
    stroke: "#854D0E",
  },
  {
    id: "orange-dark",
    fill: "#EA580C",
    color: "#1C1917",
    stroke: "#9A3412",
  },
  {
    id: "rose-dark",
    fill: "#E11D48",
    color: "#FFFFFF",
    stroke: "#9F1239",
  },
  {
    id: "red-dark",
    fill: "#DC2626",
    color: "#FFFFFF",
    stroke: "#991B1B",
  },
];

export const ThemeLight: Theme[] = [
  {
    id: "white-light",
    fill: "#FFFFFF",
    color: "#1C1917",
    stroke: "#D6D3D1",
  },
  {
    id: "gray-light",
    fill: "#E7E5E4",
    color: "#1C1917",
    stroke: "#A8A29E",
  },
  {
    id: "bleu-light",
    fill: "#BAE6FD",
    color: "#1C1917",
    stroke: "#38BDF8",
  },
  {
    id: "purple-light",
    fill: "#C7D2FE",
    color: "#1C1917",
    stroke: "#818CF8",
  },

  {
    id: "violet-light",
    fill: "#DDD6FE",
    color: "#1C1917",
    stroke: "#A78BFA",
  },
  {
    id: "green-light",
    fill: "#BBF7D0",
    color: "#1C1917",
    stroke: "#4ADE80",
  },
  {
    id: "yellow-light",
    fill: "#FEF08A",
    color: "#1C1917",
    stroke: "#FACC15",
  },
  {
    id: "orange-light",
    fill: "#FED7AA",
    color: "#1C1917",
    stroke: "#FB923C",
  },
  {
    id: "rose-light",
    fill: "#FECDD3",
    color: "#1C1917",
    stroke: "#FB7185",
  },
  {
    id: "red-light",
    fill: "#FECACA",
    color: "#1C1917",
    stroke: "#F87171",
  },
];
