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

  add(node: FileNode) {
    if (node.type === Type.DIRECTORY) {
      this.children.push(node);
    } else {
      const parent = node.path.split('/')[0];
      this.children.forEach(value => {
        if (value.path === parent) {
          value.children.push(node);
        }
      });
    }
  }

  remove(node: FileNode) {
    if (node.type === Type.DIRECTORY) {
      this.children.splice(this.children.indexOf(node), 1);
    } else {
      const parent = node.path.split('/')[0];
      this.children.forEach(value => {
        if (value.path === parent) {
          value.children.splice(value.children.indexOf(node), 1);
        }
      });
    }
  }
}


export enum Type {
  DIRECTORY, DOCUMENT
}
