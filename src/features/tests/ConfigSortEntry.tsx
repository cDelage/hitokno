import styled from "styled-components";
import { FileShort } from "../../types/Repository.types";
import { DragEvent } from "react";
import { MdDragIndicator } from "react-icons/md";


const DeckEntryContainer = styled.div`
  display: flex;
  box-sizing: border-box;
  border-bottom: 1px solid var(--color-gray-300);
  user-select: none;
  overflow: hidden;
  align-items: center;
  padding: 8px;
  gap: 8px;
  background-color: var(--bg-element);

  cursor: pointer;
  &:hover {
    background-color: var(--color-gray-100);
  }

`;

function ConfigSortEntry({
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
  return (
    <DeckEntryContainer
      className="list-item"
      draggable
      onDragStart={() => dragStart(index)}
      onDragOver={(e: DragEvent<HTMLDivElement>) => dragOver(e, index)}
      onDrop={(e: DragEvent<HTMLDivElement>) => drop(e, index)}
    >
      <MdDragIndicator size={20}/>
      {file.fileName}
    </DeckEntryContainer>
  );
}

export default ConfigSortEntry;
