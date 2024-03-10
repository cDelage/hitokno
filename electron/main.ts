import { app, BrowserWindow, ipcMain, IpcMainInvokeEvent } from "electron";
import path from "node:path";
import {
  createFile,
  createFolder,
  findRepository,
  findFile,
  removeFolder,
  renameFolder,
  renameFile,
  updateCartography,
  updateDeck,
  RemoveFile,
  moveFile,
} from "./services/apiRepository";
import {
  File,
  FileRename,
  Folder,
  MoveFile,
  RenameFolderParams,
} from "../src/types/Repository.types";
import { CreateTestProps, TestType } from "../src/types/Test.type";
import {
  createTest,
  deleteTest,
  findTestByCriteria,
  findTestById,
  findTests,
  updateTest,
} from "./services/apiTest";
import { SearchCriterias } from "../src/types/SearchCriteria.type";
import { createFileRoute, createURLRoute } from "electron-router-dom";

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.js
// │
process.env.DIST = path.join(__dirname, "../dist");
process.env.VITE_PUBLIC = app.isPackaged
  ? process.env.DIST
  : path.join(process.env.DIST, "../public");

let win: BrowserWindow | null;
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];

function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, "icon.ico"),
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
    },
  });

  // Test active push message to Renderer-process.
  win.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", new Date().toLocaleString());
  });

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(createURLRoute(
      VITE_DEV_SERVER_URL,
      'main'
    ))
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(...createFileRoute(path.join(process.env.DIST, 'index.html'), 'main'))
  }

  ipcMain.on("maximize", () => {
    win?.maximize();
  });

  ipcMain.handle("is-maximized", () => {
    return win?.isMaximized();
  });

  ipcMain.on("minimize", () => {
    win?.minimize();
  });

  ipcMain.on("unmaximize", () => {
    win?.unmaximize();
  });

  ipcMain.on("close", () => {
    win?.close();
  });

  ipcMain.handle(
    "create-folder",
    async (): Promise<Folder | null> => await createFolder()
  );

  ipcMain.handle(
    "find-repository",
    async (): Promise<Folder[] | null> => await findRepository()
  );

  ipcMain.handle(
    "create-file",
    async (_event: IpcMainInvokeEvent, folderId: string): Promise<File | null> =>
      await createFile(folderId)
  );

  ipcMain.handle(
    "remove-folder",
    async (_event: IpcMainInvokeEvent, folderId: string) =>
      await removeFolder(folderId)
  );

  ipcMain.handle(
    "rename-folder",
    async (_event: IpcMainInvokeEvent, params: RenameFolderParams) =>
      await renameFolder(params)
  );

  ipcMain.handle(
    "find-file",
    async (_event: IpcMainInvokeEvent, fileId: string) => await findFile(fileId)
  );

  ipcMain.handle(
    "rename-file",
    async (_event: IpcMainInvokeEvent, params: FileRename) =>
      await renameFile(params)
  );

  ipcMain.handle(
    "remove-file",
    async (_event: IpcMainInvokeEvent, params: {_id : string}) =>
      await RemoveFile(params)
  );

  ipcMain.handle(
    "update-cartography",
    async (_event: IpcMainInvokeEvent, file: File) =>
      await updateCartography(file)
  );

  ipcMain.handle(
    "update-deck",
    async (_event: IpcMainInvokeEvent, file: File) => await updateDeck(file)
  );

  ipcMain.handle(
    "create-test",
    async (_event: IpcMainInvokeEvent, params: CreateTestProps) =>
      await createTest(params)
  );

  ipcMain.handle("find-tests", async () => await findTests());

  ipcMain.handle(
    "find-test-by-id",
    async (_event: IpcMainInvokeEvent, { _id }: { _id: string }) =>
      await findTestById({ _id })
  );

  ipcMain.handle(
    "update-test",
    async (_event: IpcMainInvokeEvent, { test }: { test: TestType }) =>
      await updateTest({ test })
  );

  ipcMain.handle(
    "delete-test",
    async (_event: IpcMainInvokeEvent, { _id }: { _id: string }) =>
      await deleteTest({ _id })
  );

  ipcMain.handle(
    "find-tests-by-criterias",
    async (_event: IpcMainInvokeEvent, criterias: SearchCriterias) =>
      await findTestByCriteria(criterias)
  );

  ipcMain.handle(
    "move-file",
    async (_event: IpcMainInvokeEvent, params: MoveFile) => 
      await moveFile(params)
  )
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.whenReady().then(createWindow);
