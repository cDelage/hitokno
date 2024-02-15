import { create } from "zustand";
import { HeaderTab, TabsMode } from "../../types/Tabs.types";
import { persist } from "zustand/middleware";

type useTabsStore = {
  tabs: HeaderTab[];
  openTab: (fileId: string, mode: TabsMode) => void;
  closeTab: (fileId: string) => void;
  toggleTabMode: (fileId: string) => void;
};

const useTabs = create(persist<useTabsStore>(
  (set, get) => ({
  tabs: [] as HeaderTab[],
  openTab: (fileId: string, mode: TabsMode) => {
    if (
      !get()
        .tabs.map((tab) => tab.fileId)
        .includes(fileId)
    ) {
      set((state) => {
        return {
          tabs: [...state.tabs, { fileId, mode }],
        };
      });
    }
    console.log(get().tabs);
  },
  closeTab: (fileId: string) => {
    set((state) => {
      return {
        tabs: state.tabs.filter((tab) => tab.fileId !== fileId),
      };
    });
  },

  /**
   * Switch between edit mode & default mode for a tabs
   * Info not save
   * @param fileId 
   */
  toggleTabMode: (fileId: string) => {
    set((state) => {
      return {
        tabs: state.tabs.map((tab) => {
          const newTab: HeaderTab = { ...tab };
          if (newTab.fileId === fileId) {
            newTab.mode = newTab.mode === "DEFAULT" ? "EDIT" : "DEFAULT";
          }
          return newTab;
        }),
      };
    });
  },
}),{name : 'tab-storage'}));

export { useTabs };
