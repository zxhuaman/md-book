import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Tool} from './tool';
import {insertText, isFullScreen, toggleFullScreen} from './utils';
import {EDIT_TOOLS, Operation} from './edit.operation';
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

  constructor(private service: MarkdownService) {
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
        toggleFullScreen();
        if (isFullScreen()) {
          tool.text = '全屏';
          tool.title = '全屏';
        } else {
          tool.text = '退出全屏';
          tool.title = '退出全屏';
        }
        break;
      case Operation.PREVIEW:
        break;
      default:
        insertText(this.textarea, tool.prefix, tool.text, tool.suffix);
        this.render(this.textarea.value);
        break;
    }
  }
}
