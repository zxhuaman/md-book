export class FileNode {
  public name: string;
  public path: string;
  public type: Type;
  public children: FileNode[] = [];
  public sha: string;
  public content: string;


  constructor(name: string, path: string, type: Type, children: FileNode[], sha: string, content: string) {
    this.name = name;
    this.path = path;
    this.type = type;
    this.children = children;
    this.sha = sha;
    this.content = content;
  }
}


export enum Type {
  DIRECTORY, DOCUMENT
}
