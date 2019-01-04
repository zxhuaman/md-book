import {Component, OnInit} from '@angular/core';
import {Tool} from './tool';
import {insertText} from './utils';
import {EDIT_TOOLS} from './edit.operation';
import {MarkdownService} from './markdown.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
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

  onChange(text: string) {
    this.renderHtml = this.service.render(text);
  }

  onClickTool(tool: Tool): void {
    insertText(this.textarea, tool.prefix, tool.text, tool.suffix);
    this.onChange(this.textarea.value);
  }
}
