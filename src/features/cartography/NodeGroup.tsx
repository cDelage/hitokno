import styled from "styled-components";
import Resizer from "./Resizer";
import { DataNode, Theme } from "../../types/Cartography.type";
import LabelNodeGroup from "./LabelNodeGroup";
import GroupToolbar from "./GroupToolbar";
import useCartography from "./useCartography";
import SheetSignifiantButton from "./SheetSignifiantButton";
import IdenticalWidthSignifiant from "./IdenticalWidthSignifiant";
import IdenticalHeightSignifiant from "./IdenticalHeightSignifiant";
import HelperLines from "./HelperLines";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import HandlesCreateEdge from "./HandlesCreateEdge";
import { Handle, Node, useUpdateNodeInternals } from "reactflow";
import HandlesUpdateEdge from "./HandlesUpdateEdge";

const NodeGroupStyled = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
`;

const StyledCreatedHandle = styled(Handle)<{ $active: boolean }>`
  visibility: ${(props) => (props.$active ? "visible" : "hidden")};
  width: 12px;
  height: 12px;
  background-color: white;
  border: #0284c7 1px solid;
  box-shadow: var(--shadow-md);
`;

const NodeGroupBackground = styled.div<{ theme: Theme }>`
  height: 100%;
  width: 100%;
  position: relative;
  box-shadow: var(--shadow-md);
  box-sizing: border-box;
  border: ${(props) => props.theme.stroke} 1px solid;
  background-color: ${(props) => props.theme.fill};
  opacity: 0.5;
  border-radius: 8px;
`;

const NodeGroup = memo(function NodeGroup({
  id,
  selected,
  data,
  xPos,
  yPos,
}: {
  id: string;
  selected: boolean;
  data: DataNode;
  xPos: number;
  yPos: number;
}) {
  const [isHover, setIsHover] = useState(false);
  const { shapeDescription, sheet, handles } = data;
  const {
    getSelectedNodes,
    identicalWidthNodes,
    identicalHeightNodes,
    movedNode,
    getNodeSize,
    mainToolbarActiveMenu,
    handlesActive,
  } = useCartography();
  const [size, setSize] = useState(() => getNodeSize(id));

  const updateNodeInternals = useUpdateNodeInternals();

  const selectedNodes = useMemo<Node<DataNode>[]>(() => {
    if (selected) {
      return getSelectedNodes();
    } else {
      return [];
    }
  }, [getSelectedNodes, selected]);

  const handleUpdateSize = useCallback(() => {
    setSize(getNodeSize(id));
  }, [setSize, getNodeSize, id]);

  useEffect(() => {
    updateNodeInternals(id);
  }, [handles, updateNodeInternals, id]);
  return (
    <NodeGroupStyled
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <NodeGroupBackground
        theme={shapeDescription?.theme}
      ></NodeGroupBackground>
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
      <LabelNodeGroup data={data} id={id} />
      {mainToolbarActiveMenu === "CREATION-EDGE" && isHover && (
        <HandlesCreateEdge isHoverNode={isHover} nodeId={id} />
      )}
      {mainToolbarActiveMenu === "CREATION-EDGE-UPDATE" && isHover && (
        <HandlesUpdateEdge id={id} />
      )}
      {!mainToolbarActiveMenu?.startsWith("CREATION") && selected && (
        <Resizer selected={selected} id={id} onResizeEvent={handleUpdateSize} />
      )}
      {selected && selectedNodes.length === 1 && (
        <GroupToolbar
          data={data}
          nodeId={id}
          xPos={xPos}
          yPos={yPos}
          width={size.width}
        />
      )}
      {sheet && (
        <SheetSignifiantButton
          nodeId={id}
          nodeSheetId={sheet.sheetId}
          selected={selected && selectedNodes.length === 1}
        />
      )}
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
    </NodeGroupStyled>
  );
});

export default NodeGroup;
