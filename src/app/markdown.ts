export class Markdown {
  name: string;
  content: string;
  sha: string;


  constructor(name: string, content: string = '', sha: string = '') {
    this.name = name;
    this.content = content;
    this.sha = sha;
  }
}
