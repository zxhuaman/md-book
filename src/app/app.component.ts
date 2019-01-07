import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Tool} from './tool';
import {insertText} from './utils';
import {EDIT_TOOLS} from './edit.operation';
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
    insertText(this.textarea, tool.prefix, tool.text, tool.suffix);
    this.render(this.textarea.value);
  }
}
