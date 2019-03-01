import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {FileNode, Type} from './entity/file-node';
import {Base64} from 'js-base64';

const BASE_URL = 'https://gitee.com/api/v5';
const OWNER = 'mdbook';
// export const PERSONAL_ACCESS_TOKENS = '30766817b6d14cbc125ec605077d1687';
const DOCUMENTS_REPO = 'documents';

export const client_secret = '700d432b6b9bc3a73d9259413e3cf4e6da74162e67c3fb764587cd0059a131a9';
export const client_id = 'b6ea926cc73d8647bb9b0ecdb35c06f4e6be691cd82c094dcf180d1e025202b2';
export const redirect_uri = 'https://sandcat.gitee.io/mdbook';
export const response_type = 'code';
export const action = 'https://gitee.com/oauth/authorize';
export const token_action = 'http://zxhuaman.gz01.bdysite.com/token';
export const gitee_code_action = `https://gitee.com/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code`;

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private token;
  private tokenSubject: Subject<string>;

  constructor(private http: HttpClient) {
    this.tokenSubject = new Subject();
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
  creatFolder(path: string): Observable<FileNode> {
    return this.createFile(`${path}/.keep`).pipe(map(node => {
      node.name = path;
      node.path = path;
      node.sha = '';
      return node;
    }));
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
      .pipe(map((res: any) =>
        new FileNode(res.content.path.split('/')[0], res.content.name, res.content.path,
          Type.DOCUMENT, [], res.content.sha, '')));
  }

  tree(): Observable<any> {
    return this.http.get(`${BASE_URL}/repos/${OWNER}/${DOCUMENTS_REPO}/git/gitee/trees/master?access_token=${this.token}&recursive=1`);
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
      new FileNode(res.content.path.split('/')[0], res.content.name,
        res.content.path, Type.DOCUMENT, [], res.content.sha, content)));
  }

  deleteFile(file: FileNode): Observable<boolean> {
    return this.http.delete(`${BASE_URL}/repos/${OWNER}/${DOCUMENTS_REPO}/contents/${file.path}`, {
      params: {
        'access_token': this.token,
        'sha': file.sha,
        'message': `delete ${file.name}`
      }
    }).pipe(map(() => true));
  }

  setToken(token: string) {
    this.tokenSubject.next(token);
    this.token = token;
  }

  login(code: string, mail?: string, password?: string): void {
    let body = null;
    let params = null;
    let headers = null;
    if (code) {
      params = {
        'grant_type': 'authorization_code',
        'code': code,
        'client_id': client_id,
        'redirect_uri': redirect_uri,
        'client_secret': client_secret
      };
    } else {
      body = {
        'grant_type': 'password',
        'username': mail,
        'password': password,
        'client_id': client_id,
        'client_secret': client_secret,
        'scope': 'projects user_info issues notes'
      };
      headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
      };
    }

    this.http.post(token_action, body, {headers: headers, params: params}).subscribe((res: any) => {
      this.setToken(res.access_token);
    }, error => console.log(error));
  }

  getToken() {
    return this.tokenSubject;
  }
}
