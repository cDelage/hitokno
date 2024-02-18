export type CartographyMode = "DEFAULT" | "EDIT";

export type Shape = "rect" | "circle";


export type Shadow =
  | "none"
  | "var(--shadow-shape-md)"
  | "var(--shadow-shape-menu-md)"
  | "var(--shadow-shape-lg)"
  | "var(--shadow-shape-menu-lg)";

export type ShadowMenu = {
  shadow: Shadow;
  shadowMenu: Shadow;
};

export type Theme = {
  id: string;
  fill: string;
  color: string;
  stroke: string;
};

export type ShapeProps = {
  fill: string;
  shadow: Shadow;
};

export type DataNode = {
  label: string;
  mode: string;
  shape: Shape;
  shadow: Shadow;
  showNodeToolbar?: boolean;
  theme: Theme;
};

export type Fill = {
  fill: string;
};
