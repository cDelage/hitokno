import { create } from "zustand";
import { HeaderTab, TabsMode } from "../../types/Tabs.types";
import { persist } from "zustand/middleware";
import { CartographyMode } from "../../types/Cartography.type";

type TabsStore = {
  tabs: HeaderTab[];
  openTab: (fileId: string, mode: TabsMode) => void;
  closeTab: (fileId: string) => void;
  toggleCartographyMode: (fileId: string) => void;
  getCartographyMode : (fileId: string) => CartographyMode;
};

const useTabs = create(persist<TabsStore>(
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
  toggleCartographyMode: (fileId: string) => {
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
  getCartographyMode(fileId: string){
    const tabMode : TabsMode | undefined = get().tabs.find(tab => tab.fileId === fileId)?.mode
    return tabMode ? tabMode : "DEFAULT"
  }
}),{name : 'tab-storage'}));

export { useTabs };
