import { useSearchParams } from "react-router-dom";
import useCartography from "../cartography/useCartography";
import TextEditable from "../../ui/TextEditable";
import { ChangeEvent } from "react";
import styled from "styled-components";
import SheetToolbar from "./SheetToolbar";
import Row from "../../ui/Row";
import PluginUpdateSheet from "./PluginUpdateSheet";
import SheetText from "./SheetText";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";

const NodeLabel = styled.div`
  font-size: 2rem;
  font-weight: 500;
  display: flex;
  padding: 20px 16px 0px 16px;
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
    <Row $flexDirection="column" $gap={20} $flexGrow={1}>
      <NodeLabel>
        <TextEditable
          value={data.label}
          onEdit={handleUpdateLabel}
          mode="EDIT"
          lockSelection={true}
        />
      </NodeLabel>

      <SheetText body={data.sheet?.body}>
        <SheetToolbar nodeId={nodeId} />
        <PluginUpdateSheet nodeId={nodeId} data={data} />
        <HistoryPlugin />
        <ListPlugin />
      </SheetText>
    </Row>
  );
}

export default Sheet;
