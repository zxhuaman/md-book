import {Component, OnInit} from '@angular/core';
import {Tool} from './tool';
import {insertText} from './utils';
import {EDIT_TOOLS} from './edit.operation';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  // @ts-ignore
  private md = window.markdownit();
  renderHtml = '';
  textarea: HTMLTextAreaElement;
  tools: Array<Tool> = EDIT_TOOLS;

  ngOnInit(): void {
    // @ts-ignore
    this.textarea = document.getElementsByClassName('edit')[0];
  }

  onChange(text: string) {
    this.renderHtml = this.md.render(text);
  }

  onClickTool(tool: Tool): void {
    insertText(this.textarea, tool.prefix, tool.text, tool.suffix);
  }
}
