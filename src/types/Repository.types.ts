
export type Folder = {
  _id: string;
  folderName: string;
  files: File[];
  createdAt: Date;
  updatedAt: Date;
};

export type Repository = Folder[]

export type File = {
  _id: string;
  fileName: string;
  nodes: [];
  edges: []
}

export type RenameFolderParams = {
  folderId: string;
  name: string;
};