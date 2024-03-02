import { create } from "zustand";
import { FlashCardProps, FlashCard } from "../../types/Flashcard.type";
import { v4 as uuidv4 } from "uuid";

type DeckStore = {
  deck: FlashCardProps[];
  fileName: string;
  isSyncWithDb: boolean;
  loadDeck: (deck: FlashCard[], fileName: string) => void;
  setFlashCardsProps: (
    cards: FlashCard[],
    fileName: string
  ) => FlashCardProps[];
  createFlashcard: () => string;
  getDeckToSave: () => FlashCard[];
  setIsSyncWithDb: (isSync: boolean) => void;
  selectCard: (cardId: string | undefined) => void;
  deleteCard: (cardId: string) => void;
  updateCard: (card: FlashCardProps) => void;
};

const useDeckStore = create<DeckStore>((set, get) => ({
  deck: [],
  fileName: "",
  isSyncWithDb: true,
  loadDeck: (deck: FlashCard[], fileName: string) => {
    set({
      deck: get().setFlashCardsProps(deck, fileName),
      fileName,
    });
  },
  setFlashCardsProps: (cards: FlashCard[], fileName: string) => {
    return cards.map((card) => {
      return {
        ...card,
        state: "DEFAULT",
        deckLabel: fileName,
      } as FlashCardProps;
    });
  },
  createFlashcard: () => {
    const id = uuidv4();
    set((state) => {
      return {
        isSyncWithDb: false,
        deck: [
          ...state.deck,
          {
            cardId: id,
            level: 0,
            body: "",
            answer: "",
            state: "EDIT",
            deckLabel: get().fileName,
            selected: false,
          },
        ],
      };
    });
    return id;
  },
  getDeckToSave: (): FlashCard[] => {
    return get().deck.map(({ cardId, answer, body, level }) => {
      return {
        cardId,
        answer,
        body,
        level,
      } as FlashCard;
    });
  },
  setIsSyncWithDb: (isSyncWithDb: boolean) => {
    set({
      isSyncWithDb,
    });
  },
  selectCard: (cardId: string | undefined) => {
    set((state) => {
      return {
        deck: state.deck.map((card) => {
          if(card.cardId === cardId){
            return {
              ...card,
              selected: true
            }
          }else {
            return {
              ...card,
              selected: false,
              state: "DEFAULT"
            }
          }
        }),
      };
    });
  },
  deleteCard: (cardId: string) => {
    set((state) => {
      return {
        deck: state.deck.filter((card) => card.cardId !== cardId),
        isSyncWithDb: false,
      };
    });
  },
  updateCard: (card: FlashCardProps) => {
    set((state) => {
      return {
        isSyncWithDb: false,
        deck: state.deck.map((x) => {
          if (x.cardId !== card.cardId) {
            return x;
          } else {
            return card;
          }
        }),
      };
    });
  },
}));

export default useDeckStore;
