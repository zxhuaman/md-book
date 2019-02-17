import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {FileNode, Type} from './entity/file-node';
import {Base64} from 'js-base64';
import {NzTreeModule, NzTreeNodeOptions} from 'ng-zorro-antd';

const CLIENT_ID = '41fc85380e264e0e7cb5c413b4d624d537491b735f152bbc50506d3565cabd02';
const REDIRECT_URI = 'http://localhost:4200';

const BASE_URL = 'https://gitee.com/api/v5';
const OWNER = 'sandcat';
const AUTHORIZE = `https://gitee.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private token/* = '214468c52069389ca670254e4719e749'*/;

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
  creatFolder(repo: string, path: string): Observable<any> {
    return this.createFile(repo, `${path}/.keep`);
  }

  /**
   * 创建文件
   * @param repo 仓库名
   * @param path 文件路径
   */
  createFile(repo: string, path: string): Observable<FileNode> {
    return this.http.post(`${BASE_URL}/repos/${OWNER}/${repo}/contents/${path}`,
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
      .pipe(map((res: any) => {
        const node = new FileNode();
        node.path = path;
        node.name = res.content.name;
        node.sha = res.content.sha;
        return node;
      }));
  }

  /**
   * 获取文件内容
   * @param repo 仓库
   * @param sha 文件的sha值
   */
  fetchFile(repo: string, sha: string): Observable<string> {
    return this.http.get(`${BASE_URL}/repos/${OWNER}/${repo}/git/blobs/${sha}?access_token=${this.token}`)
      .pipe(map((res: any) => Base64.decode(res.content)));
  }

  /**
   * 更新文件内容
   * @param repo 仓库
   * @param path 文件路径
   * @param content 文件内容
   * @param sha 文件sha值
   */
  updateFile(repo: string, path: string, content: string, sha: string): Observable<FileNode> {
    return this.http.put(`${BASE_URL}/repos/${OWNER}/${repo}/contents/${path}`,
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
      }).pipe(map((res: any) => {
      const node = new FileNode();
      node.name = res.content.name;
      node.content = content;
      node.sha = res.content.sha;
      node.type = Type.DIRECTORY;
      return node;
    }));
  }

  fetchNodes(repo: string): Observable<NzTreeNodeOptions[]> {
    return this.http
      .get(`${BASE_URL}/repos/${OWNER}/${repo}/git/gitee/trees/master?access_token=${this.token}&recursive=1`)
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

  getToken() {
    return this.token;
  }
}
