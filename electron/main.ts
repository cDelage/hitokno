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
} from "./services/apiRepository";
import {
  File,
  FileRename,
  Folder,
  RenameFolderParams,
} from "../src/types/Repository.types";

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
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(process.env.DIST, "index.html"));
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
    async (event: IpcMainInvokeEvent, folderId: string): Promise<File | null> =>
      await createFile(folderId)
  );

  ipcMain.handle(
    "remove-folder",
    async (event: IpcMainInvokeEvent, folderId: string) => {
      await removeFolder(folderId);
    }
  );

  ipcMain.handle(
    "rename-folder",
    async (event: IpcMainInvokeEvent, params: RenameFolderParams) =>
      await renameFolder(params)
  );

  ipcMain.handle(
    "find-file",
    async (event: IpcMainInvokeEvent, fileId: string) => await findFile(fileId)
  );

  ipcMain.handle(
    "rename-file",
    async (event: IpcMainInvokeEvent, params: FileRename) =>
      await renameFile(params)
  );

  ipcMain.handle(
    "update-cartography",
    async (event: IpcMainInvokeEvent, file: File) =>
      await updateCartography(file)
  );
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
