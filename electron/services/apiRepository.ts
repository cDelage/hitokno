import { db } from "../database";
import {
  CompleteFolder,
  File,
  FileDetail,
  FileRename,
  Folder,
  RenameFolderParams,
} from "../../src/types/Repository.types";
import { generateUUID } from "./generateUUID";
import { SheetDetail } from "../../src/types/Cartography.type";

const newFolder = {
  folderName: "new folder",
  files: [],
};

const newFile = {
  fileName: "new file",
  nodes: [],
  edges: [],
  deck: [],
};

export async function createFolder(): Promise<Folder | null> {
  const result = await db.repository.insert(newFolder);
  return result;
}

export async function findRepository(): Promise<Folder[] | null> {
  const result = (await db.repository.find({})) as Folder[];
  return result;
}

export async function createFile(folderId: string): Promise<File | null> {
  const result = (await db.repository.updateOne(
    { _id: folderId },
    {
      $push: {
        files: {
          _id: generateUUID(),
          ...newFile,
        },
      },
    },
    { returnUpdatedDocs: true }
  )) as File;

  if (!result) {
    throw new Error("fail to create new file");
  }
  return null;
}

export async function removeFolder(folderId: string): Promise<string> {
  try {
    db.repository.remove({ _id: folderId }, { multi: false });
    return "success";
  } catch (e) {
    throw new Error("Fail to remove document");
  }
}

export async function renameFolder({
  folderId,
  name,
}: RenameFolderParams): Promise<Folder | null> {
  try {
    const result = (await db.repository.update(
      { _id: folderId },
      { $set: { folderName: name } },
      { returnUpdatedDocs: true }
    )) as Folder;
    return result;
  } catch (e) {
    throw new Error("Fail to remove document");
  }
}

export async function findFile(
  fileId: string
): Promise<FileDetail | undefined> {
  const folder = await db.repository.findOne(
    {
      "files._id": fileId,
    },
    { files: 1, folderName: 1 }
  );
  const files = folder?.files as File[];
  const file = files.find((e) => e._id === fileId);
  return file && folder
    ? ({ file, folderName: folder?.folderName } as FileDetail)
    : undefined;
}

export async function renameFile({ fileId, filename }: FileRename) {
  const folder = (await db.repository.findOne({
    "files._id": fileId,
  })) as CompleteFolder;

  const updatedFiles = folder.files.map((file) => {
    return {
      ...file,
      fileName: file._id === fileId ? filename : file.fileName,
    };
  });

  await db.repository.updateOne(
    { "files._id": fileId },
    { $set: { files: updatedFiles } }
  );

  return folder;
}

export async function RemoveFile({ _id }: { _id: string }) {
  const folder = (await db.repository.findOne({
    "files._id": _id,
  })) as CompleteFolder;

  const updatedFiles = folder.files.filter(file => file._id !== _id);

  return await db.repository.updateOne(
    { "files._id": _id },
    { $set: { files: updatedFiles } }
  );
}

export async function updateCartography({ _id, nodes, edges }: File) {
  const folder = (await db.repository.findOne({
    "files._id": _id,
  })) as CompleteFolder;

  const files = folder.files.map((file) => {
    if (file._id === _id) {
      return {
        ...file,
        nodes,
        edges,
      };
    } else {
      return { ...file };
    }
  });

  const result = await db.repository.updateOne(
    { "files._id": _id },
    { $set: { files: files } }
  );

  if (!result) throw new Error("Fail to update cartography");

  return result;
}

export async function findSheet(sheetId: string) {
  if (sheetId === "") return undefined;
  const folder = (await db.repository.findOne(
    {
      "files.nodes.data.sheet.sheetId": sheetId,
    },
    { files: 1 }
  )) as CompleteFolder;

  folder.files.find((file) => {
    file.nodes.find((node) => node.data.sheet?.sheetId === sheetId);
  });

  const sheet = folder.files.reduce(
    (acc: SheetDetail, cur: File) => {
      cur.nodes.forEach((node) => {
        if (node.data.sheet?.sheetId === sheetId) {
          acc.nodeId = node.id;
          acc.sheet = node.data.sheet;
        }
      });

      return acc;
    },
    {
      nodeId: "",
      sheet: {
        sheetId: "",
      },
    }
  );
  return sheet;
}

export async function updateDeck({ _id, deck }: File) {
  const folder = (await db.repository.findOne({
    "files._id": _id,
  })) as CompleteFolder;

  const files = folder.files.map((file) => {
    if (file._id === _id) {
      return {
        ...file,
        deck,
      };
    } else {
      return { ...file };
    }
  });

  const result = await db.repository.updateOne(
    { "files._id": _id },
    { $set: { files: files } }
  );

  if (!result) throw new Error("Fail to update cartography");

  return result;
}
