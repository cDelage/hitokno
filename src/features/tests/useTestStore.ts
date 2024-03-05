import { create } from "zustand";
import {
  DeckTestConfig,
  FlashCardTestProps,
  TestType,
} from "../../types/Test.type";
import { FileShort, Folder } from "../../types/Repository.types";
import shuffleArray from "../../utils/ShuffleArray";

type TestStore = {
  test: TestType | undefined;
  isSyncWithDb: boolean;
  skipTimeout: boolean;
  tempFlashCards: FlashCardTestProps[];
  setTest: (test: TestType | undefined) => void;
  updateTest: (test: TestType, skipTimeout?: boolean) => void;
  setIsSyncWithDb: (isSync: boolean) => void;
  getDeckTestConfig: (fileId: string) => DeckTestConfig | undefined;
  setSkipTimeout: (skipTimeout: boolean) => void;
  getCardListFromRepository: (repository: Folder[]) => FlashCardTestProps[];
  setTempFlashCards: (tempFlashCards: FlashCardTestProps[]) => void;
  getProgress: () => {currentCard: number, countCards: number};
};

const filterLevelCardsSelection = (level: number, deck: DeckTestConfig) => {
  return level === 0
    ? deck.level0
    : level === 1
    ? deck.level1
    : level === 2
    ? deck.level2
    : false;
};

function getCardsSelectedForFile(
  file: FileShort,
  deck: DeckTestConfig
): FlashCardTestProps[] {
  const result: FlashCardTestProps[] = [];
  result.push(
    ...file.deck
      .filter((card) => filterLevelCardsSelection(card.level, deck))
      .map((card) => {
        return {
          ...card,
          deckLabel: file.fileName,
          selected: false,
          state: "DEFAULT",
          result: undefined,
          isComplete: false,
        } as FlashCardTestProps;
      })
  );

  return result;
}

const useTestStore = create<TestStore>((set, get) => ({
  test: undefined,
  isSyncWithDb: true,
  skipTimeout: false,
  tempFlashCards: [],
  setTest: (test: TestType | undefined) => {
    set({
      test,
    });
  },
  updateTest: (test: TestType, skipTimeout?: boolean) => {
    set((state) => {
      return {
        test,
        isSyncWithDb: false,
        skipTimeout: skipTimeout ? skipTimeout : state.skipTimeout,
      };
    });
  },
  setIsSyncWithDb: (isSyncWithDb: boolean) => {
    set({
      isSyncWithDb,
    });
  },
  getDeckTestConfig: (fileId: string) => {
    return get().test?.decks.find((deck) => deck.fileId === fileId);
  },
  setSkipTimeout: (skipTimeout: boolean) => {
    set({ skipTimeout });
  },
  getCardListFromRepository: (repository: Folder[]) => {
    let cards: FlashCardTestProps[] = [];
    const test = get().test;
    if (test) {
      const deckUsed = test.decks.map((deck) => deck.fileId);
      repository.forEach((folder) => {
        folder.files.forEach((file) => {
          if (deckUsed.includes(file._id)) {
            const deckConfig = test.decks.find(
              (deck) => deck.fileId === file._id
            ) as DeckTestConfig;
            let fileCards = getCardsSelectedForFile(file, deckConfig);
            if (test.deckOrderedRandomCardOrder) {
              fileCards = shuffleArray<FlashCardTestProps>(cards);
            }
            cards.push(...fileCards);
          }
        });
      });
      if (test.sortMode === "RANDOM-CARDS") {
        cards = shuffleArray<FlashCardTestProps>(cards);
      }
    }

    return cards;
  },
  setTempFlashCards: (tempFlashCards) => {
    set({
      tempFlashCards,
    });
  },
  getProgress: () => {
    const test = get().test;
    if(test){
      if(test.status === "DRAFT"){
        return {
          countCards: get().tempFlashCards.length,
          currentCard: 0
        }
      }
      return {
        countCards: test.cards.length,
        currentCard: test.cards.filter(card => card.isComplete).length + 1
      }
    }
    return {
      countCards: 0,
      currentCard: 0
    }
  }
}));

export default useTestStore;
