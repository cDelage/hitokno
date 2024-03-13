import { BrowserWindow, dialog } from "electron";
import { SaveParams } from "../../src/types/Save.type";
import {
  findFile,
  importFileFromRepository,
  updateFilepath,
} from "./apiRepository";
import fs from "fs";

export async function saveFile({ fileId, saveMode: saveType }: SaveParams) {
  const fileToSave = await findFile(fileId);
  if (fileToSave) {
    const { file } = fileToSave;
    const newFile = {
      fileName: file.fileName,
      nodes: file.nodes,
      edges: file.edges,
      deck: file.deck,
    };
    if (saveType === "SAVE" && file.filePath) {
      fs.writeFileSync(file.filePath, JSON.stringify(newFile));
    } else {
      const { canceled, filePath } = await dialog.showSaveDialog({
        title: "Register hitokno file",
        defaultPath: `${file.fileName}.json5`,
        buttonLabel: "save",
        filters: [{ name: "JSON Files", extensions: ["json5"] }],
      });

      if (!canceled && filePath) {
        await updateFilepath({ ...file, filePath });
        fs.writeFileSync(filePath, JSON.stringify(newFile));
      }
    }
  }
}

export async function importFile(win: BrowserWindow, folderId: string) {
  const { canceled, filePaths } = await dialog.showOpenDialog(win, {
    title: "Select a file",
    properties: ["openFile"],
    filters: [{ name: "JSON File", extensions: ["json5"] }],
  });

  if (!canceled && filePaths[0]) {
    const file = await fs.readFileSync(filePaths[0]);
    const parsedFile = JSON.parse(file.toString("utf-8"));
    const { fileName, nodes, edges, deck } = parsedFile;

    if (fileName && nodes && edges && deck) {
      const newFile = {
        fileName,
        nodes,
        edges,
        deck,
      };
      const result = await importFileFromRepository(folderId, newFile);
      return result;
    } else {
      throw new Error("Fail to import the file, probably not the good format")
    }
  }
}
