import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Tool} from './tool';
import {insertText, isFullScreen, toggleFullScreen} from './utils';
import {EDIT_TOOLS, FULLSCREEN_EXIT_TOOL, FULLSCREEN_TOOL, NO_PREVIEW_TOOL, Operation, PREVIEW_TOOL} from './edit.operation';
import {MarkdownService} from './markdown.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  renderHtml = '';
  textarea: HTMLTextAreaElement;
  tools: Array<Tool> = EDIT_TOOLS;
  fullscreenTool: Tool = FULLSCREEN_TOOL;
  previewTool: Tool = PREVIEW_TOOL;

  constructor(private service: MarkdownService,) {
  }


  ngOnInit(): void {
    // @ts-ignore
    this.textarea = document.getElementsByClassName('edit')[0];
  }

  render(text: string) {
    this.renderHtml = this.service.render(text);
    console.log(text, this.renderHtml);
  }

  onInput(ev: any) {
    if (ev.inputType !== 'insertCompositionText') {
      this.render(ev.target.value);
    }
  }

  onCompositionend(ev: any) {
    this.render(ev.target.value);
  }

  onClickTool(tool: Tool): void {
    switch (tool.operation) {
      case Operation.PREVIOUS:
        break;
      case Operation.NEXT:
        break;
      case Operation.DELETE:
        this.textarea.value = '';
        this.textarea.focus();
        this.render(this.textarea.value);
        break;
      case Operation.FULLSCREEN:
      case Operation.FULLSCREEN_EXIT:
        toggleFullScreen();
        this.fullscreenTool = isFullScreen() ? FULLSCREEN_TOOL : FULLSCREEN_EXIT_TOOL;
        break;
      case Operation.NO_PREVIEW:
        this.previewTool = PREVIEW_TOOL;
        break;
      case Operation.PREVIEW:
        this.previewTool = NO_PREVIEW_TOOL;
        break;
      default:
        insertText(this.textarea, tool.prefix, tool.text, tool.suffix);
        this.render(this.textarea.value);
        break;
    }
  }
}
