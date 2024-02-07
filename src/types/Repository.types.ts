import { Edge } from "reactflow";

export type Diagram = {
  diagramName: string;
  nodes: Node[];
  edges: Edge[];
};

export type Folder = {
  _id: string;
  folderName: string;
  files: File[];
  createdAt: Date;
  updatedAt: Date;
};

export type File = {
  _id: string;
  fileName: string;
  nodes: [];
  edges: []
}