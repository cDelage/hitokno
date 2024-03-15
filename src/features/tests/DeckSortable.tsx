import styled, { css } from "styled-components";
import { FileShort } from "../../types/Repository.types";
import { DragEvent, useCallback, useState } from "react";
import { MdDragIndicator } from "react-icons/md";

const DeckEntryContainer = styled.div<{ $isDragged: boolean }>`
  display: flex;
  box-sizing: border-box;
  border-bottom: 1px solid var(--color-gray-300);
  user-select: none;
  overflow: hidden;
  align-items: center;
  box-sizing: border-box;
  padding: 8px;
  gap: 8px;
  border-radius: 8px;
  background-color: var(--bg-element);

  cursor: pointer;
  &:hover {
    background-color: var(--color-gray-100);
  }

  ${(props) =>
    props.$isDragged &&
    css`
      background-color: var(--color-primary-200);
    `}
`;

function DeckSortable({
  file,
  index,
  id,
  dragStart,
  dragEnter,
  dragEnd,
}: {
  file: FileShort;
  index: number;
  id: string;
  dragStart: (id: string) => void;
  dragEnter: (e: DragEvent<HTMLDivElement>, index: number) => void;
  dragEnd: (e: DragEvent<HTMLDivElement>, index: number) => void;
}) {
  const [isDragged, setIsDragged] = useState(false);

  const handleDragStart = useCallback(() => {
    setIsDragged(true);
    dragStart(id);
  }, [setIsDragged, dragStart, id]);

  return (
    <DeckEntryContainer
      className="list-item"
      draggable
      onDragStart={handleDragStart}
      onDragEnter={(e: DragEvent<HTMLDivElement>) => dragEnter(e, index)}
      onDragEndCapture={(e: DragEvent<HTMLDivElement>) => dragEnd(e, index)}
      onDragEnd={() => setIsDragged(false)}
      $isDragged={isDragged}
    >
      <MdDragIndicator size={20} />
      {file.fileName}
    </DeckEntryContainer>
  );
}

export default DeckSortable;
