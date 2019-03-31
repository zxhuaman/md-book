import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import * as Editor from 'tui-editor';
import {NzDropdownContextComponent, NzDropdownService, NzMessageService, NzModalService, NzTreeComponent} from 'ng-zorro-antd';
import {FileNode, Type} from '../../model/entity/file-node';
import {DataService} from '../../model/data.service';
import {download, getWordCount, assembleHtml} from '../../util';

export enum Operation {
  CREATE_FOLDER = 'create_folder',
  CREATE_FILE = 'create_file',
  DOWNLOAD_HTML = 'download_html',
  DOWNLOAD_MARKDOWN = 'download_markdown',
  DELETE_FILE = 'delete_file',
  DELETE_FOLDER = 'delete_folder',
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
  @ViewChild('trigger') customTrigger: TemplateRef<void>;
  selectedFile: FileNode;
  private dropdown: NzDropdownContextComponent;
  curNode: FileNode;
  isFolderModalVisible: boolean;
  isFileModalVisible: boolean;
  nodeMap: Map<string, FileNode>;
  wordCount = 0;

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
      previewStyle: 'tab',
      height: `${window.innerHeight - 64}px`,
      language: 'zh',
    });

    this.editor.addHook('change', () => {
      this.selectedFile.content = this.editor.getMarkdown();
      this.nodeMap.get(this.selectedFile.path).content = this.selectedFile.content;
      this.wordCount = getWordCount(this.selectedFile.content);
    });

    this.data.tree().subscribe(res => {
      res.tree.forEach(value => {
        if (value.type === 'tree') {
          this.nodeMap.set(value.path,
            new FileNode(null, value.path, value.path, Type.DIRECTORY, [], value.sha, ''));
        } else if (value.path.endsWith('.md')) {
          const pathArray = value.path.split('/');
          this.nodeMap.set(value.path,
            new FileNode(pathArray[0], pathArray[1], value.path, Type.DOCUMENT, [], value.sha, ''));
        }
      });
    });
  }

  save(node: FileNode, notify: boolean = true) {
    node = this.nodeMap.get(node.path);
    this.data.updateFile(node.path, node.content, node.sha)
      .subscribe(
        value => {
          this.nodeMap.set(value.path, value);
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
        this.nzModalService.confirm({
          nzTitle: '<i>确定删除文件吗?</i>',
          nzOkType: 'danger',
          nzOnOk: () => this.deleteFile(this.curNode)
        });
        break;
      case Operation.DELETE_FOLDER:
        this.nzModalService.confirm({
          nzTitle: '确定删除这个文件夹吗?',
          nzOkType: 'danger',
          nzOnOk: () => this.deleteFolder(this.curNode),
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
    if (this.selectedFile) {
      this.save(this.selectedFile, false);
    }
    this.selectedFile = this.nodeMap.get(file.path);
    this.data.fetchFile(this.selectedFile.sha).subscribe(content => {
      this.editor.setMarkdown(content);
      this.selectedFile.content = content;
      this.wordCount = getWordCount(this.selectedFile.content);
    });

    this.isCollapsed = false;
  }

  createFolder(folderName: string) {
    this.isFolderModalVisible = false;
    this.data.creatFolder(folderName).subscribe(node => this.nodeMap.set(node.path, node));
  }

  createFile(fileName: string) {
    this.isFileModalVisible = false;
    this.data.createFile(this.curNode.path + '/' + fileName)
      .subscribe(node => this.nodeMap.set(node.path, node));
  }

  deleteFile(file: FileNode) {
    this.data.deleteFile(file).subscribe(() => this.nodeMap.delete(file.path));
  }

  deleteFolder(folder: FileNode) {
    this.data.deleteFolder(folder).subscribe(() => this.nodeMap.delete(folder.path));
  }

  downMarkdown(file: FileNode) {
    this.data.fetchFile(file.sha).subscribe(content => {
      download(content, 'text/plain', file.name);
    });
  }

  downHtml(file: FileNode) {
    const bodyContent = this.editor.preview.convertor.toHTMLWithCodeHightlight(file.content);
    const fileName = file.name.split('.md')[0];
    download(assembleHtml(fileName, bodyContent), 'text/plain', fileName + '.html');
  }

  getFolders(map: Map<string, FileNode>): Array<FileNode> {
    return Array.from(map.values()).filter(node => node.type === Type.DIRECTORY);
  }

  getFilesByParent(parent: FileNode): Array<FileNode> {
    return Array.from(this.nodeMap.values()).filter(node => node.parent === parent.path);
  }
}
