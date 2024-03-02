export type TabState = "default" | "active";

export type TabsMode = "DEFAULT" | "EDIT";

export type TabsType = "FILE" | "TEST";

export type HeaderTab = {
    tabId: string;
    mode: TabsMode;
    type: TabsType;
}