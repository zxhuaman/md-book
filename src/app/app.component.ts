import {Component, OnInit} from '@angular/core';
import {Tool} from './tool';
import {insertText} from './utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  readonly tools = [
    new Tool('粗体', 'bold'),
    new Tool('斜体', 'italic'),
    new Tool('标题', 'header'),
    new Tool('下划线', 'underline'),
    new Tool('中划线', 'strikethrough'),
    new Tool('标记', 'mark'),
    new Tool('上标', 'superscript'),
    new Tool('下标', 'subscript'),
    new Tool('左对齐', 'align_left'),
    new Tool('右对齐', 'align_right'),
    new Tool('居中', 'align_right'),
    new Tool('引用', 'quote'),
    new Tool('有序列表', 'ordered_list'),
    new Tool('无序列表', 'unordered_list'),
    new Tool('链接', 'link'),
    new Tool('图片', 'image'),
    new Tool('代码块', 'code'),
    new Tool('表格', 'table'),
    new Tool('上一步', 'previous'),
    new Tool('下一步', 'next'),
    new Tool('删除', 'delete'),
    new Tool('全屏', 'fullscreen'),
    new Tool('预览', 'preview'),
  ];
  // @ts-ignore
  private md = window.markdownit();
  renderHtml = '';
  textarea: HTMLTextAreaElement;

  ngOnInit(): void {
    // @ts-ignore
    this.textarea = document.getElementsByClassName('edit')[0];
  }

  /*onInput(ev: any): void {
    this.renderHtml = this.md.render(ev.target.value);
  }*/

  onChange(text: string) {
    this.renderHtml = this.md.render(text);
  }

  onClickTool(tool: Tool): void {
    let text: string;
    switch (tool.operation) {
      case 'bold':
        text = '**粗体**';
        break;
      default:
        break;
    }

    if (text) {
      insertText(this.textarea, '**', '粗体', '**');
    }
  }
}
