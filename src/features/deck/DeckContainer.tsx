import styled from "styled-components";
import TabCollapse from "./TabCollapse";
import { CSSTransition } from "react-transition-group";
import { useSearchParams } from "react-router-dom";
import DeckHeader from "./DeckHeader";
import useFindFile from "../home/useFindFile";
import { useEffect, useState } from "react";
import useDeckStore from "./useDeckStore";
import { useUpdateDeck } from "./useUpdateDeck";
import Cards from "./Cards";

const DeckContainerStyled = styled.div`
  position: absolute;
  bottom: 0;
  left: 16px;
  right: 16px;
  z-index: 1100;
  height: 95%;
  background-color: var(--bg-element);
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  overflow: hidden;
  border: 1px solid var(--color-gray-300);
  display: flex;
  flex-direction: column;
`;

function DeckContainer() {
  const [searchParams] = useSearchParams();
  const open = searchParams.get("deckOpen");
  const { fileDetail, isLoadingFile } = useFindFile();
  const { loadDeck, deck, isSyncWithDb, getDeckToSave, setIsSyncWithDb } =
    useDeckStore();
  const { updateDeck } = useUpdateDeck();
  const [isTimedOut, setIsTimedOut] = useState(false);

  useEffect(() => {
    if (fileDetail) {
      loadDeck(fileDetail.file.deck, fileDetail.file.fileName);
    }
  }, [fileDetail, loadDeck]);

  //Synchronize deck with database
  useEffect(() => {
    if (
      fileDetail?.file._id &&
      !isSyncWithDb &&
      deck.length !== 0 &&
      !isTimedOut
    ) {
      updateDeck({
        ...fileDetail.file,
        deck: getDeckToSave(),
      });
      setIsSyncWithDb(true);
      setIsTimedOut(true);
      setTimeout(() => {
        setIsTimedOut(false);
      }, 3000);
    }
  }, [
    deck,
    isSyncWithDb,
    fileDetail,
    isTimedOut,
    updateDeck,
    getDeckToSave,
    setIsSyncWithDb,
  ]);

  return (
    <CSSTransition
      in={open !== null}
      timeout={400}
      classNames="deck"
      unmountOnExit
      mountOnEnter
    >
      <DeckContainerStyled>
        <TabCollapse />
        {!isLoadingFile && <DeckHeader />}
        <Cards />
      </DeckContainerStyled>
    </CSSTransition>
  );
}

export default DeckContainer;
