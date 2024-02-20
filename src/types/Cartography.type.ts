export type CartographyMode = "DEFAULT" | "EDIT";

export type MainToolbarMode = "DEFAULT" | "CREATION-NODE" | "CREATION-EDGE" | "CREATION-GROUP" | "SELECT" | undefined;

export type PaneOnDragOption = 0 | 1 | 2 | 3 | 4 | 5

/**
 * Control the scroll with panOnDrag
 */
export type PaneOnDragMode = undefined | PaneOnDragOption[]

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

export type ShadowProps = {
  shadow?: string;
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
