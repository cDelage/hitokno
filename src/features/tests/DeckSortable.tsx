import styled, { css } from "styled-components";
import { FileShort } from "../../types/Repository.types";
import { DragEvent, useCallback, useState } from "react";
import { MdDragIndicator } from "react-icons/md";


const DeckEntryContainer = styled.div<{$isDragged: boolean}>`
  display: flex;
  box-sizing: border-box;
  border-bottom: 1px solid var(--color-gray-300);
  user-select: none;
  overflow: hidden;
  align-items: center;
  box-sizing: border-box;
  padding: 8px;
  gap: 8px;
  background-color: var(--bg-element);

  cursor: pointer;
  &:hover {
    background-color: var(--color-gray-100);
  }

  ${(props) => props.$isDragged && css`
    background-color: var(--color-primary-200);
  `}

`;

function DeckSortable({
  file,
  index,
  dragStart,
  dragOver,
  drop
}: {
  file: FileShort;
  index: number;
  dragStart: (index: number) => void;
  dragOver: (e: DragEvent<HTMLDivElement>, index: number) => void;
  drop: (e: DragEvent<HTMLDivElement>, index: number) => void;
}) {
  const [isDragged, setIsDragged] = useState(false);

  const handleDragStart = useCallback(() => {
    setIsDragged(true)
    dragStart(index)
  },[setIsDragged, dragStart, index]);

  return (
    <DeckEntryContainer
      className="list-item"
      draggable
      onDragStart={handleDragStart}
      onDragOver={(e: DragEvent<HTMLDivElement>) => dragOver(e, index)}
      onDrop={(e: DragEvent<HTMLDivElement>) => drop(e, index)}
      onDragEnd={() => setIsDragged(false)}
      $isDragged={isDragged}
    >
      <MdDragIndicator size={20}/>
      {file.fileName}
    </DeckEntryContainer>
  );
}

export default DeckSortable;
