import { create } from "zustand";
import { DeckTestConfig, TestType } from "../../types/Test.type";

type TestStore = {
  test: TestType | undefined;
  isSyncWithDb: boolean;
  skipTimeout: boolean;
  setTest: (test: TestType | undefined) => void;
  updateTest: (test: TestType, skipTimeout?: boolean) => void;
  setIsSyncWithDb: (isSync: boolean) => void;
  getDeckTestConfig: (fileId: string) => DeckTestConfig | undefined;
  setSkipTimeout: (skipTimeout: boolean) => void;
};

const useTestStore = create<TestStore>((set, get) => ({
  test: undefined,
  isSyncWithDb: true,
  skipTimeout: false,
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
}));

export default useTestStore;
