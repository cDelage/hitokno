import { Node } from "reactflow";
import { DataNode } from "../../types/Cartography.type";
import styled, { css } from "styled-components";
import { MdDragIndicator } from "react-icons/md";
import Row from "../../ui/Row";
import { BiDetail, BiPen } from "react-icons/bi";
import { ButtonHeader } from "../../ui/ButtonHeader";
import { useSearchParams } from "react-router-dom";
import { ChangeEvent, DragEvent, MouseEvent, useCallback } from "react";
import TextEditable from "../../ui/TextEditable";
import useCartography from "./useCartography";
import useControlNodeSortContext from "./useControlNodeSortContext";

const NodeControlEntryStyled = styled.div<{$selected?: boolean; $dragged?: boolean;}>`
  padding: 8px;
  cursor: pointer;
  overflow: hidden;
  user-select: none;
  display: flex;
  background-color: white;
  border-radius: 8px;
  box-shadow: var(--shadow-md);
  min-height: 28px;
  align-items: center;
  justify-content: space-between;

  gap: 4px;
  &:hover {
    background-color: var(--bg-element-hover);
  }

  ${(props) =>
    props.$selected &&
    !props.$dragged &&
    css`
      outline: 2px solid var(--color-primary-600);
    `}
  ${(props) =>
    props.$dragged &&
    css`
      background-color: var(--color-primary-200);
    `}
`;

function NodeControlEntry({
  node,
  groupId
}: {
  node: Node<DataNode>;
  groupId?: string | undefined;
}) {
  const [, setSearchParams] = useSearchParams();
  const { data, selected, id } = node;
  const { label, sheet } = data;
  const { setNodeData, selectNode, addNodeToSelection } = useCartography();
  const {currentDragged, currentRenamed, handleSetCurrentRenamed, handleDragStart, handleDragEnter, handleCloseRename, handleDoubleClickRename} = useControlNodeSortContext();

  const handleOpenSheet = useCallback(() => {
    if (sheet) {
      setSearchParams({ sheetId: sheet.sheetId });
    }
  }, [setSearchParams, sheet]);

  const handleRename = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setNodeData(id, {
        ...node.data,
        label: e.target.value,
      });
    },
    [setNodeData, id, node.data]
  );

  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (e.shiftKey) {
        addNodeToSelection(id);
      } else {
        selectNode(id);
      }
    },
    [addNodeToSelection, selectNode, id]
  );

  return (
    <NodeControlEntryStyled
      $selected={selected}
      draggable
      $dragged={currentDragged === id}
      onClick={handleClick}
      onDoubleClick={() => handleDoubleClickRename(id)}
      onDragStart={() => handleDragStart(id, groupId)}
      onDragEnter={(e: DragEvent<HTMLDivElement>) => handleDragEnter(e, id, groupId)}
    >
      <Row $gap={4} $style={{ flexGrow: 1, overflow: "hidden" }}>
        <MdDragIndicator size={20} />
        <TextEditable
          mode={currentRenamed === id ? "EDIT" : "DEFAULT"}
          onEdit={handleRename}
          value={label}
          onClickOutside={handleCloseRename}
        ></TextEditable>
      </Row>
      <Row>
        {sheet && (
          <ButtonHeader onClick={handleOpenSheet}>
            <BiDetail size={`20px`} />
          </ButtonHeader>
        )}
        <ButtonHeader
          $active={currentRenamed === id}
          onClick={() => handleSetCurrentRenamed(id)}
        >
          <BiPen />
        </ButtonHeader>
      </Row>
    </NodeControlEntryStyled>
  );
}

export default NodeControlEntry;
