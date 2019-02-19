import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {FileNode, Type} from './entity/file-node';
import {Base64} from 'js-base64';
import {NzTreeNodeOptions} from 'ng-zorro-antd';

const BASE_URL = 'https://gitee.com/api/v5';
const OWNER = 'mdbook';
export const PERSONAL_ACCESS_TOKENS = '30766817b6d14cbc125ec605077d1687';
const DOCUMENTS_REPO = 'documents';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private token;

  constructor(private http: HttpClient) {
  }

  /**
   * 创建仓库
   * @param repo 仓库名
   */
  createRepo(repo: string): Observable<any> {
    return this.http.post(`${BASE_URL}/user/repos`,
      {
        'access_token': this.token,
        'name': repo,
        'has_issues': 'true',
        'has_wiki': 'true',
        'auto_init': 'true'
      },
      {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
        }
      });
  }

  /**
   * 创建文件夹
   * @param repo 仓库
   * @param path 文件夹路径
   */
  creatFolder(path: string): Observable<any> {
    return this.createFile(`${path}/.keep`);
  }

  /**
   * 创建文件
   * @param repo 仓库名
   * @param path 文件路径
   */
  createFile(path: string): Observable<FileNode> {
    return this.http.post(`${BASE_URL}/repos/${OWNER}/${DOCUMENTS_REPO}/contents/${path}`,
      {
        'access_token': this.token,
        'content': Base64.encode(' '),
        'message': `create ${path}`,
      },
      {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
        }
      })
      .pipe(map((res: any) => new FileNode(res.content.name, res.content.path, Type.DOCUMENT, [], res.content.sha, '')));
  }

  /**
   * 获取文件内容
   * @param repo 仓库
   * @param sha 文件的sha值
   */
  fetchFile(sha: string): Observable<string> {
    return this.http.get(`${BASE_URL}/repos/${OWNER}/${DOCUMENTS_REPO}/git/blobs/${sha}?access_token=${this.token}`)
      .pipe(map((res: any) => Base64.decode(res.content)));
  }

  /**
   * 更新文件内容
   * @param repo 仓库
   * @param path 文件路径
   * @param content 文件内容
   * @param sha 文件sha值
   */
  updateFile(path: string, content: string, sha: string): Observable<FileNode> {
    return this.http.put(`${BASE_URL}/repos/${OWNER}/${DOCUMENTS_REPO}/contents/${path}`,
      {
        'access_token': this.token,
        'content': Base64.encode(content),
        'sha': sha,
        'message': `update ${path}`
      },
      {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
        }
      }).pipe(map((res: any) =>
      new FileNode(res.content.name, res.content.path, Type.DOCUMENT, [], res.content.sha, content)));
  }

  fetchNodes(): Observable<NzTreeNodeOptions[]> {
    return this.http
      .get(`${BASE_URL}/repos/${OWNER}/${DOCUMENTS_REPO}/git/gitee/trees/master?access_token=${this.token}&recursive=1`)
      .pipe(map((res: any) => {
        const nodes = new Array<NzTreeNodeOptions>();
        res.tree.filter(value => value.type === 'tree')
          .forEach(value => {
            const node = {
              title: value.path,
              key: value.path,
              sha: value.sha,
              children: []
            };
            nodes.push(node);
          });
        nodes.forEach(node => {
          res.tree.filter(value => value.type === 'blob' && value.path.includes(node.title)
            && value.path.endsWith('.md'))
            .forEach(value => {
              const child = {
                title: value.path.split('/')[1],
                key: value.path,
                sha: value.sha,
                isLeaf: true
              };
              node.children.push(child);
            });
        });
        return nodes;
      }));
  }

  fetchTree(): Observable<FileNode[]> {
    return this.http
      .get(`${BASE_URL}/repos/${OWNER}/${DOCUMENTS_REPO}/git/gitee/trees/master?access_token=${this.token}&recursive=1`)
      .pipe(map((res: any) => {
        const nodes = new Array<FileNode>();
        res.tree.filter(value => value.type === 'tree')
          .forEach(value =>
            nodes.push(new FileNode(value.path, value.path, Type.DIRECTORY, [], value.sha, null)));
        nodes.forEach(node => {
          res.tree.filter(value => value.type === 'blob' && value.path.includes(node.path)
            && value.path.endsWith('.md'))
            .forEach(value => node.children.push(new FileNode(value.path.split('/')[1], value.path, Type.DOCUMENT, [], value.sha, ''))
            );
        });
        return nodes;
      }));
  }

  setToken(token: string) {
    return this.token = token;
  }

  getToken() {
    return this.token;
  }
}
