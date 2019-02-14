import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import * as Editor from 'tui-editor';
import {FileNode} from '../entity/file-node';
import {DataService} from '../data.service';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  readonly repo: string = 'mdbook-repo';
  private editor;
  isCollapsed = false;
  triggerTemplate = null;
  @ViewChild('trigger') customTrigger: TemplateRef<void>;
  fileNodes: FileNode[];
  openedFile: FileNode;

  constructor(private data: DataService, private message: NzMessageService) {
  }

  ngOnInit() {
    // @ts-ignore
    this.editor = new Editor({
      el: document.querySelector('#edit'),
      initialEditType: 'markdown',
      previewStyle: 'vertical',
      height: `${window.innerHeight - 48}px`,
      width: `${window.innerWidth - 100}px`
    });

    this.data.fetchFileNode(this.repo).subscribe(nodes => this.fileNodes = nodes);
  }

  changeTrigger(): void {
    this.triggerTemplate = this.customTrigger;
  }

  openMarkdown(file: FileNode) {
    this.openedFile = file;
    this.data.fetchFile(this.repo, file.sha).subscribe(content => {
      this.editor.setMarkdown(content);
    });
  }

  save(file: FileNode) {
    // const content = window.btoa(unescape(encodeURIComponent(this.editor.getMarkdown())));
    this.data.updateFile(this.repo, file.path, this.editor.getMarkdown(), file.sha)
      .subscribe(value => this.message.create('success', '保存成功'),
        error => this.message.create('error', '保存失败'));
  }
}
