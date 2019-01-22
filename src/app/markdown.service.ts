import {Injectable} from '@angular/core';
import hljs from 'highlight.js';
import {HIGHLIGHT_STYLES} from './highlight.styles';

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

  switchHighLightStyle(styleName: string): void {
    let link = document.getElementById('highlight-style');
    if (!link) {
      link = document.createElement('link');
      link.id = 'highlight-style';
      // @ts-ignore
      link.rel = 'stylesheet';
      // @ts-ignore
      link.type = 'text/css';
      document.getElementsByTagName('head')[0].append(link);
    }
    // @ts-ignore
    link.href = `https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.13.1/styles/${styleName}.min.css`;
  }

  getHighLightStyles(): string[] {
    return HIGHLIGHT_STYLES;
  }
}
