import { create } from "zustand";
import {
  CardTestResult,
  CountResult,
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
  getProgress: () => { currentCard: number; countCards: number };
  startTest: () => void;
  getCurrentCard: () => FlashCardTestProps | undefined;
  updateCurrentCard: (card: FlashCardTestProps) => void;
  getCardsByResult: (result: CardTestResult) => FlashCardTestProps[];
  getCountCardsByResult: () => CountResult;
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
      test.decks
        .map((deck) => {
          const folder = repository.find(
            (folder) =>
              folder.files.find((file) => file._id === deck.fileId) !==
              undefined
          );
          if (folder) {
            return {
              deck: deck,
              file: folder.files.find((file) => file._id === deck.fileId),
            };
          }
        })
        .forEach((fileAndDeck) => {
          if (fileAndDeck && fileAndDeck.file && fileAndDeck.deck) {
            let fileCards = getCardsSelectedForFile(
              fileAndDeck.file,
              fileAndDeck?.deck
            );
            if (test.deckOrderedRandomCardOrder) {
              fileCards = shuffleArray<FlashCardTestProps>(cards);
            }
            cards.push(...fileCards);
          }
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
    if (test) {
      if (test.status === "DRAFT") {
        return {
          countCards: get().tempFlashCards.length,
          currentCard: 0,
        };
      }
      return {
        countCards: test.cards.length,
        currentCard: test.cards.filter((card) => card.isComplete).length,
      };
    }
    return {
      countCards: 0,
      currentCard: 0,
    };
  },
  startTest: () => {
    const test = get().test;
    const tempFlashCards = get().tempFlashCards;
    if (test && test.status === "DRAFT" && tempFlashCards.length != 0) {
      set({
        test: {
          ...test,
          cards: tempFlashCards,
          status: "IN PROGRESS",
        },
        isSyncWithDb: false,
        skipTimeout: true,
      });
    }
  },
  getCurrentCard: () => {
    const test = get().test;
    if (test && test.status === "IN PROGRESS") {
      const card = test.cards.find((card) => !card.isComplete);

      if (!card) {
        set({
          test: { ...test, status: "COMPLETE" },
          isSyncWithDb: false,
          skipTimeout: true,
        });
      }

      return card;
    }

    return undefined;
  },
  updateCurrentCard: (card: FlashCardTestProps) => {
    const test = get().test;
    if (test) {
      set({
        test: {
          ...test,
          cards: test.cards.map((c) => (c.cardId === card.cardId ? card : c)),
        },
        isSyncWithDb: false,
        skipTimeout: true,
      });
    }
  },
  getCardsByResult: (result: CardTestResult) => {
    const test = get().test;

    if (test) {
      return test.cards.filter((card) => card.result === result);
    }

    return [];
  },
  getCountCardsByResult: () => {
    return {
      failed: get().getCardsByResult("FAILED").length,
      hesitated: get().getCardsByResult("HESITATED").length,
      mastered: get().getCardsByResult("MASTERED").length,
    };
  },
}));

export default useTestStore;
