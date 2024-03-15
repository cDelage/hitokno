import { Edge, Node } from "reactflow";
import { DataNode } from "./Cartography.type";
import { FlashCard } from "./Flashcard.type";

export type FileDetail = {
  file: FileHitokno;
  folderName: string;
};

export type FileRename = {
  fileId: string;
  filename: string;
};

export type FileShort = Omit<FileHitokno, "nodes" | "edges">;

export type Folder = {
  _id: string;
  folderName: string;
  files: FileShort[];
  createdAt: Date;
  updatedAt: Date;
};

export type CompleteFolder = {
  _id: string;
  folderName: string;
  files: FileHitokno[];
  createdAt: Date;
  updatedAt: Date;
};

export type Repository = Folder[];

export type FileHitokno = {
  _id: string;
  fileName: string;
  nodes: Node<DataNode>[];
  edges: Edge[];
  deck: FlashCard[];
  filePath?: string;
  isSaved?: boolean;
};

export type RenameFolderParams = {
  folderId: string;
  name: string;
};

export type MoveFile = {
  fileId: string;
  folderId: string;
}