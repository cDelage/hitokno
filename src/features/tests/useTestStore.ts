import { create } from "zustand";
import { TestType } from "../../types/Test.type";

type TestStore = {
  test: TestType | undefined;
  isSyncWithDb: boolean;
  setTest: (test: TestType | undefined) => void;
  updateTest: (test: TestType) => void;
  setIsSyncWithDb: (isSync: boolean) => void;
};

const useTestStore = create<TestStore>((set) => ({
  test: undefined,
  isSyncWithDb: true,
  setTest: (test: TestType | undefined) => {
    set({
      test,
    });
  },
  updateTest : (test: TestType) => {
    set({
      test,
      isSyncWithDb: false,
    })
  },
  setIsSyncWithDb : (isSyncWithDb: boolean) => {
    set({
      isSyncWithDb
    })
  }
}));

export default useTestStore;
