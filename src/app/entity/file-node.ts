export class FileNode {
  public name: string;
  public path: string;
  public type: Type;
  public children: FileNode[] = [];
  public sha: string;
  public content: string;
}


export enum Type {
  DIRECTORY, DOCUMENT
}
