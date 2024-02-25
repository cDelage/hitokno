import { useSearchParams } from "react-router-dom";
import useCartography from "../cartography/useCartography";
import TextEditable from "../../ui/TextEditable";
import { ChangeEvent } from "react";
import styled from "styled-components";

const NodeLabel = styled.div`
  font-size: 2rem;
  font-weight: 500;
  display: flex;
  padding: 20px 32px 8px 32px;
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
    <div>
      <NodeLabel>
        <TextEditable
          value={data.label}
          onEdit={handleUpdateLabel}
          mode="EDIT"
        />
      </NodeLabel>

      {/**



    <LexicalComposer
      initialConfig={{ ...initialNodeConfig, theme: {}, editorState }}
    >
      <RichTextPlugin
        contentEditable={
          <ContentEditableStyled
            id="content-editable"
            className={
              mode === "EDIT" ? "nodrag htk-theme-node" : "htk-theme-node"
            }
            color={theme.color}
            $selectedColor={theme.stroke}
            $active={mode === "EDIT"}
          />
        }
        placeholder={<></>}
        ErrorBoundary={LexicalErrorBoundary}
      />
    </LexicalComposer>*/}
    </div>
  );
}

export default Sheet;
