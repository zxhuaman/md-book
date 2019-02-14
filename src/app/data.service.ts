import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {FileNode, Type} from './entity/file-node';
import {Base64} from 'js-base64';

const CLIENT_ID = '41fc85380e264e0e7cb5c413b4d624d537491b735f152bbc50506d3565cabd02';
const REDIRECT_URI = 'http://localhost:4200';

const BASE_URL = 'https://gitee.com/api/v5';
const OWNER = 'sandcat';
const AUTHORIZE = `https://gitee.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private token = '214468c52069389ca670254e4719e749';

  constructor(private http: HttpClient) {
  }

  createRepo(repo: string) {
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

  creatFolder(repo: string, path: string) {
    return this.createFile(repo, `${path}/.keep`);
  }

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

  fetchFile(repo: string, sha: string): Observable<string> {
    return this.http.get(`${BASE_URL}/repos/${OWNER}/${repo}/git/blobs/${sha}?access_token=${this.token}`)
      .pipe(map((res: any) => Base64.decode(res.content)));
  }

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


  fetchFileNode(repo: string): Observable<FileNode[]> {
    return this.http
      .get(`${BASE_URL}/repos/${OWNER}/${repo}/git/gitee/trees/master?access_token=${this.token}&recursive=1`)
      .pipe(map((res: any) => {
        const nodes = new Array<FileNode>();
        res.tree.filter(value => value.type === 'tree')
          .forEach(value => {
            const node = new FileNode();
            node.path = value.path;
            node.name = value.path;
            node.sha = value.sha;
            node.type = Type.DIRECTORY;
            nodes.push(node);
          });
        nodes.forEach(node => {
          res.tree.filter(value => value.type === 'blob' && value.path.includes(node.name)
            && value.path.endsWith('.md'))
            .forEach(value => {
              const file = new FileNode();
              file.path = value.path;
              file.name = value.path.split('/')[1];
              file.sha = value.sha;
              file.type = Type.DOCUMENT;
              node.children.push(file);
            });
        });
        return nodes;
      }));
  }

  getToken() {
    return this.token;
  }
}
