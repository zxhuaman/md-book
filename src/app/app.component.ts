import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Tool} from './tool';
import {insert, insertText, isFullScreen, toggleFullScreen} from './utils';
import {EDIT_TOOLS, FULLSCREEN_EXIT_TOOL, FULLSCREEN_TOOL, NO_PREVIEW_TOOL, Operation, PREVIEW_TOOL} from './edit.operation';
import {MarkdownService} from './markdown.service';
import {trigger, state, style, transition, animate} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('openClose', [
      state('open', style({
          flex: 1
        }
      )),
      state('closed', style({
        flex: 0,
        padding: 0
      })),
      transition('open => closed', [animate('0.3s')]),
      transition('closed => open', [animate('0.3s')])
    ])
  ]
})

export class AppComponent {
  renderHtml = '';
  tools: Array<Tool> = EDIT_TOOLS;
  fullscreenTool: Tool = FULLSCREEN_TOOL;
  previewTool: Tool = PREVIEW_TOOL;
  isOpen = true;

  constructor(private service: MarkdownService) {
  }

  render(text: string) {
    this.renderHtml = this.service.render(text);
  }

  onInput(ev: any) {
    if (ev.inputType !== 'insertCompositionText') {
      this.render(ev.target.value);
    }
  }

  onCompositionend(text: string) {
    this.render(text);
  }

  onClickTool(editor: HTMLTextAreaElement, tool: Tool): void {
    switch (tool.operation) {
      case Operation.PREVIOUS:
        break;
      case Operation.NEXT:
        break;
      case Operation.DELETE:
        editor.value = '';
        editor.focus();
        this.render(editor.value);
        break;
      case Operation.FULLSCREEN:
      case Operation.FULLSCREEN_EXIT:
        toggleFullScreen();
        this.fullscreenTool = isFullScreen() ? FULLSCREEN_TOOL : FULLSCREEN_EXIT_TOOL;
        break;
      case Operation.NO_PREVIEW:
      case Operation.PREVIEW:
        this.previewTool = this.isOpen ? NO_PREVIEW_TOOL : PREVIEW_TOOL;
        this.isOpen = !this.isOpen;
        break;
      default:
        insertText(editor, tool.prefix, tool.text, tool.suffix);
        this.render(editor.value);
        break;
    }
  }

  onEnter(editor: HTMLTextAreaElement) {
    const textLines = editor.value.substr(0, editor.selectionStart).split('\n');
    const currentLineNumber = textLines.length;
    if (currentLineNumber > 1) {
      const previousLine = editor.value.split('\n')[currentLineNumber - 2];
      let insertion: string;
      if (previousLine.startsWith('- ')) {
        if (previousLine.length > '- '.length) {
          insertion = '- ';
        }
      } else if (/^([0-9]{1,10}\.)/.test(previousLine)) {
        insertion = Number(previousLine.substr(0, previousLine.indexOf('.'))) + 1 + '. ';
      }
      if (insertion) {
        const start = editor.selectionStart;
        insert(editor, start, insertion);
        editor.selectionStart = start + insertion.length;
        editor.selectionEnd = editor.selectionStart;
      }
    }
  }
}
