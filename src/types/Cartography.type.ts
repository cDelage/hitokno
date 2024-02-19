export type CartographyMode = "DEFAULT" | "EDIT";

export type Shape = "rect" | "rect-radius" | "ellipse" | "triangle" | "cylinder";

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
  shape?: Shape | undefined;
  fill: string;
  $shadow: Shadow;
  border?: string;
};

export type DataNode = {
  label: string;
  mode: string;
  shape: Shape;
  shadow: Shadow;
  border: boolean;
  showNodeToolbar?: boolean;
  theme: Theme;
};

export type Fill = {
  fill: string;
};
