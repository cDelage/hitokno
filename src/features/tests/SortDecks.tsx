import { DragEvent, useCallback, useEffect, useState } from "react";
import { FileShort } from "../../types/Repository.types";
import DeckSortable from "./DeckSortable";
import { Column } from "../../ui/Row";
import moveElement from "../../utils/MoveElement";
import { DeckTestConfig } from "../../types/Test.type";
import useTestStore from "./useTestStore";

function SortDecks({
  selectedFiles,
  disabled,
}: {
  selectedFiles: FileShort[];
  disabled: boolean;
}) {
  const [currentDragged, setCurrentDragged] = useState<string | undefined>(
    undefined
  );
  const { test, updateTest } = useTestStore();
  const [selectedFilesCopy, setSelectedFilesCopy] = useState(selectedFiles);

  const handleDragStart = useCallback(
    (id: string) => {
      if (!disabled) {
        // Changer le curseur au besoin
        setCurrentDragged(id);
      }
    },
    [disabled]
  );

  const handleDragEnter = useCallback(
    (e: DragEvent<HTMLDivElement>, index: number) => {
      e.preventDefault();
      if (!disabled) {
        e.dataTransfer.dropEffect = "move";
        const indexTarget = selectedFiles.findIndex(
          (selected) => selected._id === currentDragged
        );
        if (currentDragged !== undefined && test) {
          const newSelected = moveElement<FileShort>(
            selectedFiles,
            indexTarget,
            index
          );
          setSelectedFilesCopy(newSelected);
        }
      }
    },
    [currentDragged, test, disabled, selectedFiles]
  );

  const handleDrop = useCallback(() => {
    setCurrentDragged(undefined);
    if (test) {
      const decks: DeckTestConfig[] = selectedFilesCopy.map(
        (file) =>
          test.decks.find((deck) => deck.fileId === file._id) as DeckTestConfig
      );
      updateTest({
        ...test,
        decks,
      }, true);
    }
  }, [test, selectedFilesCopy, updateTest]);

  useEffect(() => {
    setSelectedFilesCopy(selectedFiles)
  },[selectedFiles])

  return (
    <>
      <Column $gap={4}>
        {selectedFilesCopy.map((file, index) => (
          <DeckSortable
            file={file}
            id={file._id}
            index={index}
            key={file._id}
            dragStart={handleDragStart}
            dragEnter={handleDragEnter}
            dragEnd={handleDrop}
          />
        ))}
      </Column>
    </>
  );
}

export default SortDecks;
