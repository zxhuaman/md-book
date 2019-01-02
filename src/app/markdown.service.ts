import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MarkdownService {

  // @ts-ignore
  private md = window.markdownit();

  constructor() {
    // @ts-ignore
    this.md
      .use(window.markdownitSup())
      .use();
  }

}
