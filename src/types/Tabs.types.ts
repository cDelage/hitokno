export type TabState = "default" | "active";

export type TabsMode = "DEFAULT" | "EDIT"

export type HeaderTab = {
    fileId: string;
    mode: TabsMode;
}