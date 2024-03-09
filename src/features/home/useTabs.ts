import { create } from "zustand";
import { HeaderTab, TabsMode, TabsType } from "../../types/Tabs.types";
import { persist } from "zustand/middleware";
import { CartographyMode } from "../../types/Cartography.type";

type TabsStore = {
  tabs: HeaderTab[];
  openTab: (tabId: string, mode: TabsMode, type: TabsType) => void;
  closeTab: (tabId: string) => void;
  toggleCartographyMode: (tabId: string) => void;
  getCartographyMode: (tabId: string) => CartographyMode;
  setTabs: (tabs : HeaderTab[]) => void;
};

const useTabs = create(
  persist<TabsStore>(
    (set, get) => ({
      tabs: [] as HeaderTab[],
      openTab: (tabId: string, mode: TabsMode, type: TabsType) => {
        if (
          !get()
            .tabs.map((tab) => tab.tabId)
            .includes(tabId)
        ) {
          //If not exist, create new tab
          set((state) => {
            return {
              tabs: [...state.tabs, { tabId, mode, type }],
            };
          });
        } else {
          //If already update, then update the mode
          set((state) => {
            return {
              tabs: state.tabs.map((tab) => {
                if (tab.tabId === tabId) {
                  return {
                    ...tab,
                    mode,
                  };
                } else {
                  return tab;
                }
              }),
            };
          });
        }
      },
      closeTab: (tabId: string) => {
        set((state) => {
          return {
            tabs: state.tabs.filter((tab) => tab.tabId !== tabId),
          };
        });
      },

      /**
       * Switch between edit mode & default mode for a tabs
       * Info not save
       * @param tabId
       */
      toggleCartographyMode: (tabId: string) => {
        set((state) => {
          return {
            tabs: state.tabs.map((tab) => {
              const newTab: HeaderTab = { ...tab };
              if (newTab.tabId === tabId) {
                newTab.mode = newTab.mode === "DEFAULT" ? "EDIT" : "DEFAULT";
              }
              return newTab;
            }),
          };
        });
      },
      getCartographyMode(tabId: string) {
        const tabMode: TabsMode | undefined = get().tabs.find(
          (tab) => tab.tabId === tabId
        )?.mode;
        return tabMode ? tabMode : "DEFAULT";
      },
      setTabs : (tabs) => {
          set({tabs})
      },
    }),
    { name: "tab-storage" }
  )
);

export { useTabs };
