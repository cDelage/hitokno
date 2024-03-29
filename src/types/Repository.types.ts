export type FileDetail = {
  file: File;
  folderName: string;
};

export type FileRename = {
  fileId: string;
  filename: string;
};

export type FileShort = Omit<File, "nodes" | "edges">;

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
  files: File[];
  createdAt: Date;
  updatedAt: Date;
};

export type Repository = Folder[];

export type File = {
  _id: string;
  fileName: string;
  nodes: [];
  edges: [];
};

export type RenameFolderParams = {
  folderId: string;
  name: string;
};
