import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import * as Editor from 'tui-editor';
import {FileNode} from '../entity/file-node';
import {DataService} from '../data.service';
import {
  NzDropdownContextComponent,
  NzDropdownService,
  NzFormatEmitEvent,
  NzMenuItemDirective,
  NzMessageService, NzTreeComponent, NzTreeNode,
  NzTreeNodeOptions
} from 'ng-zorro-antd';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  @ViewChild('treeCom') treeCom: NzTreeComponent;
  readonly repo: string = 'mdbook-repo';
  readonly createFile = 'create_file';
  readonly delete = 'delete';
  readonly downMarkdown = 'down_markdown';
  readonly downHtml = 'down_html';
  private editor;
  isCollapsed = false;
  triggerTemplate = null;
  @ViewChild('trigger') customTrigger: TemplateRef<void>;
  selectedFile: FileNode;
  private dropdown: NzDropdownContextComponent;
  modalVisible = false;
  nodes: FileNode[] = [];
  activedNode: NzTreeNode;

  constructor(private data: DataService,
              private message: NzMessageService,
              private nzDropdownService: NzDropdownService) {
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

    this.data.fetchTree().subscribe(nodes => this.nodes = nodes);
  }

  save(node: FileNode) {
    this.data.updateFile(node.path, this.editor.getMarkdown(), node.sha)
      .subscribe(() => this.message.create('success', '保存成功'),
        () => this.message.create('error', '保存失败'));
  }

  contextMenu($event: MouseEvent, template: TemplateRef<void>): void {
    this.dropdown = this.nzDropdownService.create($event, template);
  }

  handleCancel() {
    this.modalVisible = false;
  }

  handleOk(name) {
    this.modalVisible = false;
  }

  close($event: NzMenuItemDirective) {
    this.dropdown.close();
  }

  selectFile(file: FileNode) {
    this.selectedFile = file;
    this.data.fetchFile(file.sha).subscribe(content => this.editor.setMarkdown(content));
  }
}
