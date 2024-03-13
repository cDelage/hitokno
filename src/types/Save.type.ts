export type SaveMode = "SAVE" | "SAVE-AS";

export type SaveParams = {
    fileId: string;
    saveMode: SaveMode
}