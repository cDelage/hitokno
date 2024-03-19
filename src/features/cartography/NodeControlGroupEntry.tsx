import { NodeSortListItem } from "../../types/Cartography.type";
import styled, { CSSProp, css } from "styled-components";
import { MdDragIndicator } from "react-icons/md";
import Row, { Column } from "../../ui/Row";
import { BiDetail, BiPen } from "react-icons/bi";
import { ButtonHeader } from "../../ui/ButtonHeader";
import { useSearchParams } from "react-router-dom";
import {
  ChangeEvent,
  DragEvent,
  Fragment,
  MouseEvent,
  useCallback,
  useState,
} from "react";
import TextEditable from "../../ui/TextEditable";
import useCartography from "./useCartography";
import { IoChevronForwardOutline } from "react-icons/io5";
import NodeControlEntry from "./NodeControlEntry";
import useControlNodeSortContext from "./useControlNodeSortContext";

const NodeControlEntryStyled = styled.div<{
  $selected?: boolean;
  $dragged?: boolean;
}>`
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

const ChildrenContainerStyle: CSSProp = {
  gap: 4,
  paddingLeft: "16px",
  borderLeft: "1px solid var(--color-gray-400)",
};

function NodeControlGroupEntry({
  nodeSort,
  parentGroupId,
}: {
  nodeSort: NodeSortListItem;
  parentGroupId?: string | undefined;
}) {
  const [, setSearchParams] = useSearchParams();
  const { node, childs } = nodeSort;
  const { data, selected, id } = node;
  const { label, sheet } = data;
  const { setNodeData, selectNode, addNodeToSelection } = useCartography();
  const [isOpen, setIsOpen] = useState(false);
  const {
    currentDragged,
    currentRenamed,
    handleSetCurrentRenamed,
    handleDragStart,
    handleDragEnter,
    handleCloseRename,
    handleDoubleClickRename,
  } = useControlNodeSortContext();
  const chevronStyle = {
    transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
    transition: "transform .2s ease-out",
  };

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
      if (e.ctrlKey && e.shiftKey) {
        addNodeToSelection(id);
      } else if (e.ctrlKey) {
        selectNode(id);
      } else {
        setIsOpen((s) => !s);
      }
    },
    [addNodeToSelection, selectNode, id, setIsOpen]
  );

  return (
    <>
      <NodeControlEntryStyled
        $selected={selected}
        draggable
        $dragged={currentDragged === id}
        onDoubleClick={() => handleDoubleClickRename(id)}
        onDragStart={() => handleDragStart(id, parentGroupId)}
        onDragEnter={(e: DragEvent<HTMLDivElement>) =>
          handleDragEnter(e, id, parentGroupId)
        }
        onClick={handleClick}
      >
        <Row
          $gap={4}
          $style={{ flexGrow: 1, overflow: "hidden", alignItems: "center" }}
        >
          <MdDragIndicator size={20} />
          <IoChevronForwardOutline style={chevronStyle} />
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
            onClick={() => handleSetCurrentRenamed(id)}
            $active={currentRenamed === id}
          >
            <BiPen />
          </ButtonHeader>
        </Row>
      </NodeControlEntryStyled>
      {isOpen && (
        <Column $style={ChildrenContainerStyle}>
          {childs.map((child) => (
            <Fragment key={`child-group-node-${child.node.id}`}>
              {child.node.type !== "groupNode" && (
                <NodeControlEntry
                  key={child.node.id}
                  node={child.node}
                  groupId={id}
                />
              )}
              {child.node.type === "groupNode" && (
                <NodeControlGroupEntry
                  key={child.node.id}
                  nodeSort={child}
                  parentGroupId={id}
                />
              )}
            </Fragment>
          ))}
        </Column>
      )}
    </>
  );
}

export default NodeControlGroupEntry;
