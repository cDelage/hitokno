import { Edge, Node, Position } from "reactflow";
import { PositionAbsolute } from "./Position.type";

export type CartographyMode = "DEFAULT" | "EDIT";

export type SheetToolbarMode = "CREATE" | "OPEN" | "CLOSE";

export type MainToolbarMode =
  | "DEFAULT"
  | "CREATION-NODE"
  | "CREATION-EDGE"
  | "CREATION-GROUP"
  | "CREATION-EDGE-UPDATE"
  | "SELECT"
  | "UPDATE-SHAPE"
  | "UPDATE-COLOR"
  | "UPDATE-BORDER"
  | "UPDATE-SHADOW"
  | undefined;

export type NodeProps = {
  id: string;
  selected: boolean;
  data: DataNode;
  xPos: number;
  yPos: number;
};

export type PaneOnDragOption = 0 | 1 | 2 | 3 | 4 | 5;

/**
 * Control the scroll with panOnDrag
 */
export type PaneOnDragMode = undefined | PaneOnDragOption[];

export type Shape =
  | "rect"
  | "rect-rounded"
  | "ellipse"
  | "triangle"
  | "cylinder";

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

export type ThemeHighlight = {
  id: string;
  fill: string;
  color: string;
};

export type ThemeText = {
  id: string;
  color: string;
}


export type ShapeProps = {
  shape?: Shape | undefined;
  fill: string;
  $shadow: Shadow;
  border?: string;
};

export type ShapeDescription = {
  shape: Shape;
  shadow: Shadow;
  border: boolean;
  theme: Theme;
};

export type NodeMode = "DEFAULT" | "EDIT";

export type DataNode = {
  mode: NodeMode;
  editorState?: string;
  showNodeToolbar?: boolean;
  shapeDescription?: ShapeDescription;
  handles: CreatedHandle[];
  sheet?: Sheet
  src?: string;
  label: string;
  isGrouped?: boolean;
  parentIdStored?: string | undefined;
};

export type NodeSortListItem = {
  node : Node<DataNode>;
  childs : NodeSortListItem [];
}

export type Sheet = {
  sheetId: string;
  body?: string;
}

export type SheetDetail = {
  nodeId: string;
  sheet: Sheet;
}

export type Fill = {
  fill: string;
};

export type FontMenu = {
  fontName: string;
  fontCss: string;
};

export type HandleSourceCreateEdge = {
  nodeId: string;
  handleId: string;
};


export type HandleProps = {
  handleId: string;
  position: Position;
}

export type CreatedHandle = HandleProps & {
  type : "source" | "target",
}

export type EdgeCreationProps = {
  isCreateEdge?: boolean;
  sourceNodeId? : string;
  sourceHandleId? : string;
  sourcePosition? : Position;
  targetNodeId? : string;
  targetHandleId? : string;
  targetPosition? : Position;
}

export type NodeAlignement = "left" | "right" | "top" | "bottom";


export type HelperLine = {
  id: NodeAlignement;
  position : PositionAbsolute;
  width: number;
  height: number
}

export type updateEdgePayload = {
  edge: Edge;
  type: "source" | "target";
  targetNodeId? : string;
  targetPosition? : Position;
}