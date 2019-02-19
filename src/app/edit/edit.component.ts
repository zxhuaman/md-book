import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import * as Editor from 'tui-editor';
import {FileNode} from '../entity/file-node';
import {DataService} from '../data.service';
import {NzDropdownContextComponent, NzDropdownService, NzMenuItemDirective, NzMessageService, NzTreeComponent} from 'ng-zorro-antd';
import {log} from 'util';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  @ViewChild('treeCom') treeCom: NzTreeComponent;
  private editor;
  isCollapsed = false;
  triggerTemplate = null;
  @ViewChild('trigger') customTrigger: TemplateRef<void>;
  selectedFile: FileNode;
  private dropdown: NzDropdownContextComponent;
  modalVisible = false;
  nodes: FileNode[] = [];

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

    this.editor.addHook('change', () => {
      this.selectedFile.content = this.editor.getMarkdown();
    });

    this.data.fetchTree().subscribe(nodes => this.nodes = nodes);
  }

  save(node: FileNode, notify: boolean = true) {
    node = this.getNode(node.path);
    this.data.updateFile(node.path, node.content, node.sha)
      .subscribe(value => {
          log('after save ' + value.sha);
          this.setNode(value);
          if (notify) {
            this.message.create('success', '保存成功');
          }
        },
        () => {
          if (notify) {
            this.message.create('error', '保存失败');
          }
        });
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
    if (this.selectedFile && this.selectedFile.path === file.path) {
      return;
    }

    if (this.selectedFile) {
      this.save(this.selectedFile, false);
    }
    this.selectedFile = this.getNode(file.path);
    this.data.fetchFile(this.selectedFile.sha).subscribe(content => this.editor.setMarkdown(content));
  }

  getNode(path): FileNode {
    const nodes = this.nodes.filter(node => path.includes(node.path));
    for (let i = 0; i < nodes.length; i++) {
      const children = nodes[i].children;
      for (let j = 0; j < children.length; j++) {
        if (children[j].path === path) {
          return children[j];
        }
      }
    }
    return null;
  }

  setNode(file: FileNode) {
    const nodes = this.nodes.filter(node => file.path.includes(node.path));
    for (let i = 0; i < nodes.length; i++) {
      const children = nodes[i].children;
      for (let j = 0; j < children.length; j++) {
        if (children[j].path === file.path) {
          children[j] = file;
        }
      }
    }
  }
}
