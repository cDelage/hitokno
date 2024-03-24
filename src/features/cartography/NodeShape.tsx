import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { Handle, Node, NodeProps, useUpdateNodeInternals } from "reactflow";
import styled from "styled-components";
import useCartography from "./useCartography";
import ShapeDispatch from "./shapes/ShapeDispatch";
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
import { DataNode, ShapeDescription } from "../../types/Cartography.type";
import HelperLines from "./HelperLines";
import IdenticalWidthSignifiant from "./IdenticalWidthSignifiant";
import IdenticalHeightSignifiant from "./IdenticalHeightSignifiant";
import HandlesUpdateEdge from "./HandlesUpdateEdge";

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
`;

const NodeShape = memo(function ({
  id,
  selected,
  data: { mode, editorState, handles, label, sheet, shapeDescription },
  data,
  xPos,
  yPos,
}: NodeProps<DataNode>): JSX.Element {
  const { shape, shadow, theme, border } = shapeDescription as ShapeDescription;
  const {
    getNodeSize,
    toggleEditMode,
    mainToolbarActiveMenu,
    handlesActive,
    movedNode,
    identicalWidthNodes,
    identicalHeightNodes,
    getSelectedNodes,
  } = useCartography();
  const [isHover, setIsHover] = useState(false);
  const updateNodeInternals = useUpdateNodeInternals();
  const [size, setSize] = useState(() => getNodeSize(id));

  const handleSetHover = useCallback(
    (isHover: boolean) => {
      if (mainToolbarActiveMenu === "CREATION-EDGE" || mainToolbarActiveMenu === "CREATION-EDGE-UPDATE") {
        setIsHover(isHover);
      } else {
        if (isHover) {
          setIsHover(false);
        }
      }
    },
    [setIsHover, mainToolbarActiveMenu]
  );

  const selectedNodes = useMemo<Node<DataNode>[]>(() => {
    if (selected) {
      return getSelectedNodes();
    } else {
      return [];
    }
  }, [getSelectedNodes, selected]);

  const handleDoubleClick = useCallback(() => {
    if (mode !== "EDIT" && selected) {
      toggleEditMode(id);
    }
  }, [toggleEditMode, mode, selected, id]);

  const handleUpdateSize = useCallback(() => {
    setSize(getNodeSize(id));
  }, [setSize, getNodeSize, id]);

  useEffect(() => {
    updateNodeInternals(id);
  }, [handles, updateNodeInternals, id]);

  return (
    <NodeShapeStyled
      onMouseEnter={() => handleSetHover(true)}
      onMouseLeave={() => handleSetHover(false)}
    >
      {sheet?.sheetId && (
        <SheetSignifiantButton
          nodeSheetId={sheet.sheetId}
          nodeId={id}
          selected={selected && selectedNodes.length === 1}
        />
      )}
      {identicalWidthNodes.includes(id) && <IdenticalWidthSignifiant />}
      {identicalHeightNodes.includes(id) && <IdenticalHeightSignifiant />}
      {movedNode === id && (
        <HelperLines
          id={id}
          position={{
            xPos,
            yPos,
          }}
          size={size}
        />
      )}
      <Label label={label} />
      <ShapeDispatch
        shape={shape}
        fill={theme.fill}
        $shadow={shadow}
        border={border ? theme.stroke : undefined}
      />
      <TopContainer onDoubleClick={handleDoubleClick}>
        {mainToolbarActiveMenu === "CREATION-EDGE" && isHover && (
          <HandlesCreateEdge isHoverNode={isHover} nodeId={id} />
        )}
        {
          mainToolbarActiveMenu === "CREATION-EDGE-UPDATE" && isHover && (
            <HandlesUpdateEdge id={id}/>
          )
        }
        {(!mainToolbarActiveMenu?.startsWith("CREATION") && selected) && (
          <Resizer
            selected={selected}
            id={id}
            onResizeEvent={handleUpdateSize}
          />
        )}

        <NodeText
          mode={mode}
          editorState={editorState}
          theme={theme}
          key={`nodetext-${id}`}
        >
          <PluginReadEditMode mode={mode} />
          <PluginUpdateNodeText id={id} />
          {mainToolbarActiveMenu !== "CREATION-EDGE" &&
            selectedNodes.length === 1 &&
            selected && (
              <NodeToolbar
                id={id}
                mode={mode}
                data={data}
                xPos={xPos}
                yPos={yPos}
                width={size.width}
              />
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
            className="handle_edge"
          />
        ))}
      </TopContainer>
    </NodeShapeStyled>
  );
});

export default NodeShape;
