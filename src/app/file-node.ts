export class FileNode {
  filename: string;
  children: FileNode[];
  type: string;
}

export enum FileType {
  FILE = 'file',
  FOLDER = 'folder'
}
