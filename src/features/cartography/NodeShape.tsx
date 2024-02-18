import { CSSProperties, useEffect } from "react";
import { NodeResizer, useReactFlow, useViewport } from "reactflow";
import styled from "styled-components";
import { DataNode } from "../../types/Cartography.type";
import { PX_UNIT_GAP } from "./CartographyConstants";
import { PositionAbsolute } from "../../types/Position.type";
import useNodeToolbar from "./useNodeToolbar";
import useCartography from "./useCartography";
import ShapeDispatch from "./shapes/ShapeDispatch";

const NodeShapeStyled = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  position: relative;
`;

const TopContainer = styled.div`
  z-index: 1;
`;

const ResizerHandleStyle: CSSProperties = {
  borderRadius: "2px",
  border: "#0284C7 1px solid",
  backgroundColor: "white",
  boxSizing: "border-box",
  width: "8px",
  height: "8px",
  transform: "translate(-50%,-50%) scale(1)",
};

const ResizerBorderStyle: CSSProperties = {
  border: "none",
  backgroundColor: "#0284C7",
  boxSizing: "border-box",
};

type NodeShapeProps = {
  id: string;
  selected: boolean;
  data: DataNode;
  xPos: number;
  yPos: number;
};

function NodeShape({
  id,
  selected,
  data: { shape, shadow, showNodeToolbar, theme },
  xPos,
  yPos,
}: NodeShapeProps): JSX.Element {
  const { flowToScreenPosition } = useReactFlow();
  const { setSelectedNode } = useNodeToolbar();
  const { nodes, getNodeWidth } = useCartography();
  const { zoom, x, y } = useViewport();

  useEffect(() => {
    if (showNodeToolbar && selected) {
      const width = getNodeWidth(id) as number;
      const pos = flowToScreenPosition({
        x: xPos,
        y: yPos,
      });
      const toolbarPosition: PositionAbsolute = {
        top: pos.y,
        left: pos.x + (width * zoom) / 2,
      };
      setSelectedNode(id, toolbarPosition);
    }
  }, [
    showNodeToolbar,
    flowToScreenPosition,
    setSelectedNode,
    xPos,
    yPos,
    nodes,
    selected,
    id,
    getNodeWidth,
    zoom,
    x,
    y,
  ]);

  return (
    <NodeShapeStyled>
      <ShapeDispatch shape={shape} fill={theme.fill} $shadow={shadow} />
      <TopContainer>
        <NodeResizer
          minWidth={PX_UNIT_GAP * 2}
          minHeight={PX_UNIT_GAP * 2}
          handleStyle={ResizerHandleStyle}
          lineStyle={ResizerBorderStyle}
          isVisible={selected}
        />
      </TopContainer>
    </NodeShapeStyled>
  );
}

export default NodeShape;
