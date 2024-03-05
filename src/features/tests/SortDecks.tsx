import { DragEvent, useCallback, useState } from "react";
import { FileShort } from "../../types/Repository.types";
import DeckSortable from "./DeckSortable";
import { Column } from "../../ui/Row";
import moveElement from "../../utils/MoveElement";
import { DeckTestConfig } from "../../types/Test.type";
import useTestStore from "./useTestStore";

function SortDecks({ selectedFiles }: { selectedFiles: FileShort[] }) {
  const [currentDragged, setCurrentDragged] = useState<number | undefined>(
    undefined
  );
  const { test, updateTest } = useTestStore();

  const handleDragStart = useCallback(
    (index: number) => {
      // Changer le curseur au besoin
      setCurrentDragged(index);
    },
    []
  );

  const handleDragOver = useCallback(
    (e: DragEvent<HTMLDivElement>, index: number) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";
      if (currentDragged !== undefined && test) {
        const newDecks = moveElement<DeckTestConfig>(
          test.decks,
          currentDragged,
          index
        );
        updateTest({
          ...test,
          decks: newDecks,
        }, true);
        setCurrentDragged(index);
      }
    },
    [currentDragged, test, updateTest]
  );

  const handleDrop = useCallback(() => {
    setCurrentDragged(undefined);
  }, []);

  return (
    <>
      <Column>
        {selectedFiles.map((file, index) => (
          <DeckSortable
            file={file}
            index={index}
            key={file._id}
            dragStart={handleDragStart}
            dragOver={handleDragOver}
            drop={handleDrop}
          />
        ))}
      </Column>
    </>
  );
}

export default SortDecks;
