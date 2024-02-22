import { CSSProperties, useEffect } from "react";
import { NodeProps, NodeResizer, useReactFlow, useViewport } from "reactflow";
import styled from "styled-components";
import { PX_UNIT_GAP } from "./CartographyConstants";
import { PositionAbsolute } from "../../types/Position.type";
import useNodeToolbar from "./useNodeToolbar";
import useCartography from "./useCartography";
import ShapeDispatch from "./shapes/ShapeDispatch";
import { DataNode } from "../../types/Cartography.type";
import NodeToolbar from "./NodeToolbar";
import NodeText from "./NodeText";
import PluginReadEditMode from "./lexicalPlugins/PluginReadEditMode";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import PluginUpdateNodeText from "./lexicalPlugins/PluginUpdateNodeText";

const NodeShapeStyled = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  display: flex;
`;

const TopContainer = styled.div`
  z-index: 1;
  flex-grow: 1;
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

function NodeShape({
  id,
  selected,
  data: {
    showNodeToolbar,
    mode,
    editorState,
    shapeDescription: { shape, shadow, theme, border },
  },
  xPos,
  yPos,
}: NodeProps<DataNode>): JSX.Element {
  const { flowToScreenPosition } = useReactFlow();
  const { setSelectedNode } = useNodeToolbar();
  const { nodes, getNodeWidth, toggleEditMode } = useCartography();
  const { zoom, x, y } = useViewport();

  function handleDoubleClick() {
    if (mode !== "EDIT" && selected) {
      toggleEditMode(id);
    }
  }

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
      <ShapeDispatch
        shape={shape}
        fill={theme.fill}
        $shadow={shadow}
        border={border ? theme.stroke : undefined}
      />
      <TopContainer onDoubleClick={handleDoubleClick}>
        <NodeResizer
          minWidth={PX_UNIT_GAP * 2}
          minHeight={PX_UNIT_GAP * 2}
          handleStyle={ResizerHandleStyle}
          lineStyle={ResizerBorderStyle}
          isVisible={selected}
        />
        <NodeText mode={mode} editorState={editorState} theme={theme}>
          <PluginReadEditMode mode={mode} />
          <PluginUpdateNodeText id={id}/>
          <NodeToolbar id={id} mode={mode} />
          <HistoryPlugin />
        </NodeText>
      </TopContainer>
    </NodeShapeStyled>
  );
}

export default NodeShape;
