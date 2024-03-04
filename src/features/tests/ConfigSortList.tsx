import { DragEvent, useCallback, useState } from "react";
import { FileShort } from "../../types/Repository.types";
import ConfigSortEntry from "./ConfigSortEntry";
import Row from "../../ui/Row";
import moveElement from "../../utils/MoveElement";
import { DeckTestConfig } from "../../types/Test.type";
import useTestStore from "./useTestStore";

function ConfigSortList({ selectedFiles }: { selectedFiles: FileShort[] }) {
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
        });
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
      <Row $flexDirection="column" $gap={0}>
        {selectedFiles.map((file, index) => (
          <ConfigSortEntry
            file={file}
            index={index}
            key={file._id}
            dragStart={handleDragStart}
            dragOver={handleDragOver}
            drop={handleDrop}
          />
        ))}
      </Row>
    </>
  );
}

export default ConfigSortList;
