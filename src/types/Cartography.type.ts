export type CartographyMode = "DEFAULT" | "EDIT";

export type Shape = "rect" | "circle";

export type Shadow =
  | "none"
  | "var(--shadow-shape-md)"
  | "var(--shadow-shape-lg)";

export type Theme = {
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
};

export type Fill = {
  fill : string
}