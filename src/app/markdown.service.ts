import {Injectable} from '@angular/core';
import hljs from 'highlight.js';

@Injectable({
  providedIn: 'root'
})
export class MarkdownService {
  private md;
  // @ts-ignore
  readonly MARKDOWN_CONFIG = {
    html: false,
    xhtmlOut: false,
    breaks: false,
    langPrefix: 'language-',
    linkify: false,
    typographer: false,
    quotes: '“”‘’',
    highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return '<pre class="hljs"><code>' +
            hljs.highlight(lang, str, true).value +
            '</code></pre>';
        } catch (__) {
        }
      }
      return '<pre class="hljs"><code>' + str + '</code></pre>';
    }
  };

  constructor() {
    // @ts-ignore
    this.md = window.markdownit(this.MARKDOWN_CONFIG);
    // @ts-ignore
    window.markdownitAbbr(this.md);
    // @ts-ignore
    window.markdownitContainer(this.md, 'hljs-left');
    // @ts-ignore
    window.markdownitContainer(this.md, 'hljs-center');
    // @ts-ignore
    window.markdownitContainer(this.md, 'hljs-right');
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
