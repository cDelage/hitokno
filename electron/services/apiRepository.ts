import { db } from "../database";
import {
  CompleteFolder,
  FileHitokno,
  FileDetail,
  FileRename,
  Folder,
  MoveFile,
  RenameFolderParams,
} from "../../src/types/Repository.types";
import { generateUUID } from "./generateUUID";
import { DataNode, SheetDetail } from "../../src/types/Cartography.type";
import { Edge, Node } from "reactflow";
import { FlashCard } from "../../src/types/Flashcard.type";

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

export async function createFile(
  folderId: string
): Promise<FileHitokno | null> {
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
  )) as FileHitokno;

  if (!result) {
    throw new Error("fail to create new file");
  }
  return null;
}

export async function importFileFromRepository(
  folderId: string,
  fileParams: {
    fileName: string;
    nodes: Node<DataNode>[];
    edges: Edge[];
    deck: FlashCard[];
  }
) {
  const result = (await db.repository.updateOne(
    { _id: folderId },
    {
      $push: {
        files: {
          _id: generateUUID(),
          ...fileParams,
        },
      },
    },
    { returnUpdatedDocs: true }
  )) as FileHitokno;

  if (!result) {
    throw new Error("fail to create new file");
  }
  return result;
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
  const files = folder?.files as FileHitokno[];
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

  const updatedFiles = folder.files.filter((file) => file._id !== _id);

  return await db.repository.updateOne(
    { "files._id": _id },
    { $set: { files: updatedFiles } }
  );
}

export async function updateCartography({
  _id,
  nodes,
  edges,
  fileName,
  isSaved
}: FileHitokno) {
  const folder = (await db.repository.findOne({
    "files._id": _id,
  })) as CompleteFolder;

  const files = folder.files.map((file) => {
    if (file._id === _id && fileName === file.fileName) {
      return {
        ...file,
        nodes,
        edges,
        isSaved
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

export async function updateFilepath({ _id, filePath, isSaved }: FileHitokno) {
  const folder = (await db.repository.findOne({
    "files._id": _id,
  })) as CompleteFolder;

  const files = folder.files.map((file) => {
    if (file._id === _id) {
      return {
        ...file,
        filePath,
        isSaved
      };
    } else {
      return { ...file };
    }
  });

  const result = await db.repository.updateOne(
    { "files._id": _id },
    { $set: { files: files } }
  );

  if (!result) throw new Error("Fail to update filepath");

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
    (acc: SheetDetail, cur: FileHitokno) => {
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

export async function updateDeck({ _id, deck }: FileHitokno) {
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

export async function moveFile({ fileId, folderId }: MoveFile) {
  if (folderId !== "" && fileId !== "") {
    const folderSource = (await db.repository.findOne({
      "files._id": fileId,
    })) as CompleteFolder;

    const folderTarget = (await db.repository.findOne({
      _id: folderId,
    })) as CompleteFolder;

    const file = folderSource.files.find(
      (file) => file._id === fileId
    ) as FileHitokno;

    folderSource.files = folderSource.files.filter((f) => f._id !== fileId);

    folderTarget.files.push(file);
    if (folderTarget._id !== folderSource._id) {
      await db.repository.updateOne({ _id: folderId }, folderTarget);
      await db.repository.updateOne({ _id: folderSource._id }, folderSource);
    }
  }

  return;
}
