import { contextBridge, ipcRenderer } from "electron";
import {
  File,
  FileRename,
  Folder,
  RenameFolderParams,
} from "../src/types/Repository.types";
import { CreateTestProps, TestType } from "../src/types/Test.type";
import { SearchCriterias } from "../src/types/SearchCriteria.type";

const windowManagement = {
  maximize: () => ipcRenderer.send("maximize"),
  isMaximized: async () => await ipcRenderer.invoke("is-maximized"),
  unmaximize: () => ipcRenderer.send("unmaximize"),
  minimize: () => ipcRenderer.send("minimize"),
  close: () => ipcRenderer.send("close"),
};

const repository = {
  createFolder: async (): Promise<Folder> =>
    await ipcRenderer.invoke("create-folder"),
  findRepository: async (): Promise<Folder[]> =>
    await ipcRenderer.invoke("find-repository"),
  createFile: async (folderId: string): Promise<File | null> =>
    await ipcRenderer.invoke("create-file", folderId),
  removeFolder: async (folderId: string) =>
    await ipcRenderer.invoke("remove-folder", folderId),
  renameFolder: async (params: RenameFolderParams) =>
    await ipcRenderer.invoke("rename-folder", params),
  findFile: async (fileId: string): Promise<File> =>
    await ipcRenderer.invoke("find-file", fileId),
  renameFile: async (params: FileRename) =>
    await ipcRenderer.invoke("rename-file", params),
  updateCartography: async (file: File) =>
    await ipcRenderer.invoke("update-cartography", file),
  updateDeck: async (file: File) =>
    await ipcRenderer.invoke("update-deck", file),
  removeFile: async (params: { _id: string }) =>
    await ipcRenderer.invoke("remove-file", params),
};

const tests = {
  createTest: async (params: CreateTestProps) =>
    await ipcRenderer.invoke("create-test", params),
  findTests: async () => await ipcRenderer.invoke("find-tests"),
  findTestById: async ({ _id }: { _id: string }) =>
    await ipcRenderer.invoke("find-test-by-id", { _id }),
  updateTest: async ({ test }: { test: TestType }) =>
    await ipcRenderer.invoke("update-test", { test }),
  deleteTest: async ({ _id }: { _id: string }) =>
    await ipcRenderer.invoke("delete-test", { _id }),
  findTestByCriterias: async (criterias: SearchCriterias) =>
    await ipcRenderer.invoke("find-tests-by-criterias", criterias),
};

// --------- Expose some API to the Renderer process ---------
contextBridge.exposeInMainWorld("ipcRenderer", withPrototype(ipcRenderer));
contextBridge.exposeInMainWorld("windowManagement", windowManagement);
contextBridge.exposeInMainWorld("repository", repository);
contextBridge.exposeInMainWorld("tests", tests);

// `exposeInMainWorld` can't detect attributes and methods of `prototype`, manually patching it.
function withPrototype(obj: Record<string, any>) {
  const protos = Object.getPrototypeOf(obj);

  for (const [key, value] of Object.entries(protos)) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) continue;

    if (typeof value === "function") {
      // Some native APIs, like `NodeJS.EventEmitter['on']`, don't work in the Renderer process. Wrapping them into a function.
      obj[key] = function (...args: any) {
        return value.call(obj, ...args);
      };
    } else {
      obj[key] = value;
    }
  }
  return obj;
}

// --------- Preload scripts loading ---------
function domReady(
  condition: DocumentReadyState[] = ["complete", "interactive"]
) {
  return new Promise((resolve) => {
    if (condition.includes(document.readyState)) {
      resolve(true);
    } else {
      document.addEventListener("readystatechange", () => {
        if (condition.includes(document.readyState)) {
          resolve(true);
        }
      });
    }
  });
}

const safeDOM = {
  append(parent: HTMLElement, child: HTMLElement) {
    if (!Array.from(parent.children).find((e) => e === child)) {
      parent.appendChild(child);
    }
  },
  remove(parent: HTMLElement, child: HTMLElement) {
    if (Array.from(parent.children).find((e) => e === child)) {
      parent.removeChild(child);
    }
  },
};

/**
 * https://tobiasahlin.com/spinkit
 * https://connoratherton.com/loaders
 * https://projects.lukehaas.me/css-loaders
 * https://matejkustec.github.io/SpinThatShit
 */
function useLoading() {
  const className = `loaders-css__square-spin`;
  const styleContent = `
@keyframes square-spin {
  25% { transform: perspective(100px) rotateX(180deg) rotateY(0); }
  50% { transform: perspective(100px) rotateX(180deg) rotateY(180deg); }
  75% { transform: perspective(100px) rotateX(0) rotateY(180deg); }
  100% { transform: perspective(100px) rotateX(0) rotateY(0); }
}
.${className} > div {
  animation-fill-mode: both;
  width: 50px;
  height: 50px;
  background: #fff;
  animation: square-spin 3s 0s cubic-bezier(0.09, 0.57, 0.49, 0.9) infinite;
}
.app-loading-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #282c34;
  z-index: 9;
}
    `;
  const oStyle = document.createElement("style");
  const oDiv = document.createElement("div");

  oStyle.id = "app-loading-style";
  oStyle.innerHTML = styleContent;
  oDiv.className = "app-loading-wrap";
  oDiv.innerHTML = `<div class="${className}"><div></div></div>`;

  return {
    appendLoading() {
      safeDOM.append(document.head, oStyle);
      safeDOM.append(document.body, oDiv);
    },
    removeLoading() {
      safeDOM.remove(document.head, oStyle);
      safeDOM.remove(document.body, oDiv);
    },
  };
}

// ----------------------------------------------------------------------

const { appendLoading, removeLoading } = useLoading();
domReady().then(appendLoading);

window.onmessage = (ev) => {
  ev.data.payload === "removeLoading" && removeLoading();
};

setTimeout(removeLoading, 4999);
