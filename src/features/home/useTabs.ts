import { create } from "zustand";

type useTabsStore = {
  tabs: string[];
  openTab: (fileId: string) => void;
  closeTab: (fileId: string) => void;
};

const useTabs = create<useTabsStore>((set, get) => ({
  tabs: [] as string[],
  openTab: (fileId: string) => {
    if (!get().tabs.includes(fileId)) {
      set((state) => {
        return {
          tabs: [...state.tabs, fileId],
        };
      });
    }
    console.log(get().tabs)
  },
  closeTab: (fileId: string) => {
    set((state) => {
      return {
        tabs: [...state.tabs.filter((tab) => tab !== fileId)],
      };
    });
  },
}));

export { useTabs };
