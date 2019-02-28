import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import * as Editor from 'tui-editor';
import {FileNode, Type} from '../entity/file-node';
import {DataService} from '../data.service';
import {NzDropdownContextComponent, NzDropdownService, NzMessageService, NzModalService, NzTreeComponent} from 'ng-zorro-antd';
import download from '../util';
import {Arr} from 'tern';

export enum Operation {
  CREATE_FOLDER = 'create_folder',
  CREATE_FILE = 'create_file',
  DOWNLOAD_HTML = 'download_html',
  DOWNLOAD_MARKDOWN = 'download_markdown',
  DELETE_FILE = 'delete_file'
}

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
  nodes: FileNode[] = [];
  curNode: FileNode;
  isFolderModalVisible: boolean;
  isFileModalVisible: boolean;
  nodeMap: Map<string, FileNode>;
  folders: FileNode[];
  files: FileNode[];

  constructor(private data: DataService,
              private message: NzMessageService,
              private nzDropdownService: NzDropdownService,
              private nzModalService: NzModalService) {
    this.nodeMap = new Map();
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
      this.selectedFile = this.selectedFile;
    });

    this.data.fetchTree().subscribe(nodes => this.nodes = nodes);
    this.data.tree().subscribe(res => {
      res.tree.forEach(value => {
        if (value.type === 'tree') {
          this.nodeMap.set(value.path, new FileNode(null, value.path, value.path, Type.DIRECTORY, [], value.sha, ''));
        } else if (value.path.endsWith('.md')) {
          const pathArray = value.path.split('/');
          this.nodeMap.set(value.path, new FileNode(pathArray[0], pathArray[1], value.path, Type.DOCUMENT, [], value.sha, ''));
        }
      });
      // this.folders = Array.from(this.nodeMap.values()).filter(value => value.type === Type.DIRECTORY);
      this.files = Array.from(this.nodeMap.values()).filter(value => value.type === Type.DOCUMENT);
    });
  }

  save(node: FileNode, notify: boolean = true) {
    node.sha = this.getNode(node.path).sha;
    this.data.updateFile(node.path, node.content, node.sha)
      .subscribe(
        value => {
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

  contextMenu($event: MouseEvent, template: TemplateRef<void>, node: FileNode): void {
    this.dropdown = this.nzDropdownService.create($event, template);
    this.curNode = node;
  }

  close(type: string) {
    this.dropdown.close();
    switch (type) {
      case Operation.CREATE_FOLDER:
        this.isFolderModalVisible = true;
        break;
      case Operation.CREATE_FILE:
        this.isFileModalVisible = true;
        break;
      case Operation.DELETE_FILE:
        this.nzModalService.create({
          nzTitle: '<i>确定删除文件吗?</i>',
          nzContent: '<b>Some descriptions</b>',
          nzOnOk: () => this.deleteFile(this.curNode)
        });
        break;
      case Operation.DOWNLOAD_HTML:
        this.downHtml(this.curNode);
        break;
      case Operation.DOWNLOAD_MARKDOWN:
        this.downMarkdown(this.curNode);
        break;
      default:
        break;
    }
  }

  selectFile(file: FileNode) {
    if (this.selectedFile && this.selectedFile.path === file.path) {
      return;
    }

    if (this.selectedFile) {
      this.save(this.selectedFile, false);
    }
    this.selectedFile = this.getNode(file.path);
    this.data.fetchFile(this.selectedFile.sha).subscribe(content => {
      this.editor.setMarkdown(content);
      this.selectedFile.content = content;
    });
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

  createFolder(folderName: string) {
    this.isFolderModalVisible = false;
    this.data.creatFolder(folderName).subscribe(() =>
      this.data.fetchTree().subscribe(nodes => this.nodes = nodes));
  }

  createFile(fileName: string) {
    this.isFileModalVisible = false;
    this.data.createFile(this.curNode.path + '/' + fileName).subscribe(file => {
      this.nodeMap.set(file.path, file);
    });
  }

  deleteFile(file: FileNode) {
    this.data.deleteFile(file).subscribe(res => {
    });
  }

  downMarkdown(file: FileNode) {
    this.data.fetchFile(file.sha).subscribe(content => {
      download(content, 'text/plain', file.name);
    });
  }

  downHtml(file: FileNode) {
    // todo
  }

  getFolders(map: Map<string, FileNode>): Array<FileNode> {
    return Array.from(map.values()).filter(node => node.type === Type.DIRECTORY);
  }

  getFilesByParent(parent: FileNode): Array<FileNode> {
    return Array.from(this.nodeMap.values()).filter(node => node.parent === parent.path);
  }
}
