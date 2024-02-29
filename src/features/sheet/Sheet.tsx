import { useSearchParams } from "react-router-dom";
import useCartography from "../cartography/useCartography";
import TextEditable from "../../ui/TextEditable";
import { ChangeEvent } from "react";
import styled from "styled-components";
import SheetToolbar from "./SheetToolbar";
import PluginUpdateSheet from "../lexicalPlugins/PluginUpdateSheet";
import SheetText from "./SheetText";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import PluginSwitchSheet from "../lexicalPlugins/PluginSwitchSheet";
import PluginImage from "../lexicalPlugins/PluginImage/PluginImage";
import PluginDragDropPaste from "../lexicalPlugins/PluginDragDropPaste";
import {TabIndentationPlugin} from "@lexical/react/LexicalTabIndentationPlugin"

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
`;

function Sheet() {
  const [searchParams] = useSearchParams();
  const sheetId = searchParams.get("sheetId");
  const { findSheetData, setNodeData } = useCartography();

  const node = sheetId ? findSheetData(sheetId) : undefined;

  if (!node?.nodeId || !node?.data) return null;
  const { nodeId, data } = node;

  function handleUpdateLabel(e: ChangeEvent<HTMLInputElement>) {
    setNodeData(nodeId, { ...data, label: e.target.value });
  }

  return (
    <RowStyled id="sheet-row">
      <NodeLabel>
        <TextEditable
          value={data.label}
          onEdit={handleUpdateLabel}
          mode="EDIT"
          lockSelection={true}
        />
      </NodeLabel>

      <SheetText>
        <SheetToolbar nodeId={nodeId} />
        <PluginUpdateSheet nodeId={nodeId} data={data} />
        <HistoryPlugin />
        <ListPlugin />
        <PluginSwitchSheet body={data.sheet?.body} />
        <PluginImage />
        <PluginDragDropPaste />
        <TabIndentationPlugin />
      </SheetText>
    </RowStyled>
  );
}

export default Sheet;
