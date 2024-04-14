import { useParams, useSearchParams } from "react-router-dom";
import useCartography from "../cartography/useCartography";
import TextEditable from "../../ui/TextEditable";
import { ChangeEvent, useCallback, useMemo } from "react";
import styled from "styled-components";
import SheetToolbar from "./SheetToolbar";
import PluginUpdateSheet from "../lexicalPlugins/PluginUpdateSheet";
import SheetText from "./SheetText";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import PluginSwitchSheet from "../lexicalPlugins/PluginSwitchSheet";
import PluginImage from "../lexicalPlugins/PluginImage/PluginImage";
import PluginDragDropPaste from "../lexicalPlugins/PluginDragDropPaste";
import { TabIndentationPlugin } from "@lexical/react/LexicalTabIndentationPlugin";
import { TablePlugin } from "@lexical/react/LexicalTablePlugin";
import { useTabs } from "../home/useTabs";
import { CartographyMode } from "../../types/Cartography.type";
import { TextEditMode } from "../../types/TextEditMode.type";
import PluginReadEditSheetMode from "../lexicalPlugins/PluginReadEditSheetMode";
import IconButton from "../../ui/IconButton";
import { IoClose } from "react-icons/io5";
import { useReactFlow, useViewport } from "reactflow";

const NodeLabel = styled.div`
  font-size: 44px;
  font-weight: 600;
  display: flex;
  padding: 20px 24px 16px 24px;
`;

const RowStyled = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
`;

const CloseButtonContainer = styled.div`
  position: absolute;
  right: 16px;
  top:16px;
`

function Sheet() {
  const [searchParams, setSearchParams] = useSearchParams();
  const sheetId = searchParams.get("sheetId");
  const { findSheetData, setNodeData,getNodeCenterCoordinate } = useCartography();
  const { getCartographyMode, tabs } = useTabs();
  const { fileId } = useParams();
  const {zoom} = useViewport();
  const { setCenter } = useReactFlow();
  
  const mode = useMemo<CartographyMode>(
    () => (tabs ? getCartographyMode(fileId as string) : "DEFAULT"),
    [fileId, getCartographyMode, tabs]
  );

  const node = sheetId ? findSheetData(sheetId) : undefined;
  
  const closeSheet = useCallback(() => {
    const centerNode = getNodeCenterCoordinate(node?.nodeId as string);
    setCenter(centerNode.x, centerNode.y, { duration: 200, zoom });
    searchParams.delete("sheetId");
    setSearchParams(searchParams);
  },[getNodeCenterCoordinate, setCenter, searchParams, setSearchParams, node?.nodeId, zoom])

  if (!node?.nodeId || !node?.data) return null;
  const { nodeId, data } = node;

  function handleUpdateLabel(e: ChangeEvent<HTMLInputElement>) {
    setNodeData(nodeId, { ...data, label: e.target.value });
  }


  return (
    <RowStyled id="sheet-row">
      <CloseButtonContainer>
        <IconButton onClick={closeSheet}>
          <IoClose size={20} />
        </IconButton>
      </CloseButtonContainer>
      <NodeLabel>
        <TextEditable
          value={data.label}
          onEdit={handleUpdateLabel}
          mode={mode as TextEditMode}
          lockSelection={true}
        />
      </NodeLabel>

      <SheetText>
        {mode === "EDIT" && <SheetToolbar nodeId={nodeId} />}
        <PluginUpdateSheet nodeId={nodeId} data={data} />
        <HistoryPlugin />
        <ListPlugin />
        <PluginSwitchSheet body={data.sheet?.body} />
        <PluginImage />
        <PluginDragDropPaste />
        <TabIndentationPlugin />
        <TablePlugin />
        <PluginReadEditSheetMode mode={mode}/>
      </SheetText>
    </RowStyled>
  );
}

export default Sheet;
