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

const newFolder = {
  folderName: "new folder",
  files: [],
};

const newFile = {
  fileName: "new file",
  nodes: [],
  edges: [],
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
    return { ...file, fileName: file._id === fileId ? filename : file.fileName };
  });

  await db.repository.updateOne(
    { "files._id": fileId },
    { $set: { files: updatedFiles } }
  );

  return folder;
}
