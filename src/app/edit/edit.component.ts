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
  openedFile: FileNode;
  private dropdown: NzDropdownContextComponent;
  modalVisible = false;
  nodes: NzTreeNodeOptions[] = [];
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

    this.data.fetchNodes(this.repo).subscribe(nodes => {
      this.nodes = nodes;
      console.log(this.nodes);
    });
  }

  save(node: NzTreeNode) {
    this.data.updateFile(this.repo, node.origin.key, this.editor.getMarkdown(), node.origin.sha)
      .subscribe(() => this.message.create('success', '保存成功'),
        () => this.message.create('error', '保存失败'));
  }

  openFolder(data: NzTreeNode | NzFormatEmitEvent): void {
    if (data instanceof NzTreeNode) {
      data.isExpanded = !data.isExpanded;
    } else {
      data.node.isExpanded = !data.node.isExpanded;
    }
  }

  activeNode(data: NzFormatEmitEvent): void {
    if (this.activedNode) {
      this.treeCom.nzTreeService.setSelectedNodeList(this.activedNode);
    }
    data.node.isSelected = true;
    this.activedNode = data.node;
    this.treeCom.nzTreeService.setSelectedNodeList(this.activedNode);

    if (this.activedNode.isLeaf) {
      this.data.fetchFile(this.repo, this.activedNode.origin.sha).subscribe(content => {
        this.editor.setMarkdown(content);
      });
    }
  }

  contextMenu($event: MouseEvent, template: TemplateRef<void>): void {
    this.dropdown = this.nzDropdownService.create($event, template);
  }

  selectDropdown(type: string): void {
    this.dropdown.close();
    switch (type) {
      case this.createFile:

        break;
      case this.delete:
        break;
      case this.downMarkdown:
        break;
      case this.downHtml:
        break;
      default:
        break;
    }
  }

  handleCancel() {
    this.modalVisible = false;
  }

  handleOk() {
    this.modalVisible = false;
  }
}
