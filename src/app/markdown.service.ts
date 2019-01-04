import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MarkdownService {
  private md;

  constructor() {
    // @ts-ignore
    this.md = window.markdownit();
    // @ts-ignore
    window.markdownitAbbr(this.md);
    // @ts-ignore
    window.markdownitContainer(this.md);
    // @ts-ignore
    window.markdownitDeflist(this.md);
    // @ts-ignore
    window.markdownitEmoji(this.md);
    // @ts-ignore
    window.markdownitFootnote(this.md);
    // @ts-ignore
    window.markdownitIns(this.md);
    // @ts-ignore
    window.markdownitMark(this.md);
    // @ts-ignore
    window.markdownitSub(this.md);
    // @ts-ignore
    window.markdownitSup(this.md);
    // @ts-ignore
    window.markdownitTaskLists(this.md);
  }

  render(text: string): string {
    return this.md.render(text);
  }
}
