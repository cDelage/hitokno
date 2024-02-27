import { useCallback, useEffect, useState } from "react";
import {
  Handle,
  NodeProps,
  useReactFlow,
  useUpdateNodeInternals,
  useViewport,
} from "reactflow";
import styled from "styled-components";
import { PositionAbsolute } from "../../types/Position.type";
import useNodeToolbar from "./useNodeToolbar";
import useCartography from "./useCartography";
import ShapeDispatch from "./shapes/ShapeDispatch";
import { DataNode } from "../../types/Cartography.type";
import NodeToolbar from "./NodeToolbar";
import NodeText from "./NodeText";
import PluginReadEditMode from "../lexicalPlugins/PluginReadEditMode";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import PluginUpdateNodeText from "../lexicalPlugins/PluginUpdateNodeText";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import HandlesCreateEdge from "./HandlesCreateEdge";
import Label from "./Label";
import Resizer from "./Resizer";
import SheetSignifiantButton from "./SheetSignifiantButton";

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

const StyledCreatedHandle = styled(Handle)<{ $active: boolean }>`
  visibility: ${(props) => (props.$active ? "visible" : "hidden")};
  width: 12px;
  height: 12px;
  background-color: white;
  border: #0284c7 1px solid;
  box-shadow: var(--shadow-md);
`;

function NodeShape({
  id,
  selected,
  data: {
    showNodeToolbar,
    mode,
    editorState,
    handles,
    label,
    sheet,
    shapeDescription: { shape, shadow, theme, border },
  },
  xPos,
  yPos,
}: NodeProps<DataNode>): JSX.Element {
  const { flowToScreenPosition } = useReactFlow();
  const { setSelectedNode } = useNodeToolbar();
  const {
    nodes,
    getNodeSize,
    toggleEditMode,
    mainToolbarActiveMenu,
    handlesActive,
  } = useCartography();
  const { zoom, x, y } = useViewport();
  const [isHover, setIsHover] = useState(false);
  const updateNodeInternals = useUpdateNodeInternals();

  const handleDoubleClick = useCallback(() => {
    if (mode !== "EDIT" && selected) {
      toggleEditMode(id);
    }
  }, [toggleEditMode, mode, selected, id]);

  useEffect(() => {
    if (showNodeToolbar && selected) {
      const width = getNodeSize(id).width as number;
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
    getNodeSize,
    zoom,
    x,
    y,
  ]);

  useEffect(() => {
    updateNodeInternals(id);
  }, [handles, updateNodeInternals, id]);

  return (
    <NodeShapeStyled
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {sheet?.sheetId && (
        <SheetSignifiantButton nodeSheetId={sheet.sheetId} nodeId={id} />
      )}
      <Label label={label} />
      <ShapeDispatch
        shape={shape}
        fill={theme.fill}
        $shadow={shadow}
        border={border ? theme.stroke : undefined}
      />
      <TopContainer onDoubleClick={handleDoubleClick}>
        {mainToolbarActiveMenu === "CREATION-EDGE" && (
          <HandlesCreateEdge isHoverNode={isHover} nodeId={id} />
        )}
        {mainToolbarActiveMenu !== "CREATION-EDGE" && (
          <Resizer selected={selected} />
        )}

        <NodeText mode={mode} editorState={editorState} theme={theme}>
          <PluginReadEditMode mode={mode} />
          <PluginUpdateNodeText id={id} />
          {mainToolbarActiveMenu !== "CREATION-EDGE" && (
            <NodeToolbar id={id} mode={mode} />
          )}
          <HistoryPlugin />
          <ListPlugin />
        </NodeText>
        {handles.map(({ position, type, handleId }) => (
          <StyledCreatedHandle
            key={handleId}
            id={handleId}
            position={position}
            type={type}
            $active={handlesActive.includes(handleId)}
            isConnectableStart={false}
            isConnectableEnd={false}
          />
        ))}
      </TopContainer>
    </NodeShapeStyled>
  );
}

export default NodeShape;
