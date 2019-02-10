import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {Markdown} from './markdown';

const CLIENT_ID = 'cc512693abedba15c46d70c2db8fa579cf7663f740202d18e649564c95c28bbf';
const REDIRECT_URI = 'https://sandcat.gitee.io/mdbook/';

const BASE_URL = 'https://gitee.com/api/v5';
const OWNER = 'sandcat';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private token: string;
  readonly authorize = `https://gitee.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  constructor(private http: HttpClient) {
  }

  hasRepo(repo: string): Observable<boolean> {
    return this.http
      .get(`${BASE_URL}/repos/${OWNER}/${repo}/git/gitee/trees/master?access_this.token=${this.token}`)
      .pipe(map(() => true), catchError(() => of(false)));
  }

  fetchTrees(repo: string): Observable<Markdown[]> {
    return this.http
      .get(`${BASE_URL}/repos/${OWNER}/${repo}/git/gitee/trees/master?access_this.token=${this.token}`)
      .pipe(map((res: any) => {
        const data = [];
        res.tree.forEach(value => data.push(new Markdown(value.path, '', value.sha)));
        return data;
      }));
  }

  createRepo(repo: string) {
    return this.http.post(`${BASE_URL}/user/repos`,
      {
        'access_this.token': this.token,
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

  createFile(repo: string, path: string) {
    return this.http.post(`${BASE_URL}/repos/${OWNER}/${repo}/contents/${path}`,
      {
        'access_this.token': this.token,
        'content': window.btoa(' '),
        'message': `create ${path}`,
      },
      {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
        }
      })
      .pipe(map((res: any) => {
        return new Markdown(res.content.name, '', res.content.sha);
      }));
  }

  fetchFile(repo: string, sha: string): Observable<string> {
    return this.http.get(`${BASE_URL}/repos/${OWNER}/${repo}/git/blobs/${sha}?access_this.token=${this.token}`)
      .pipe(map((res: any) => window.atob(res.content)));
  }

  updateFile(repo: string, path: string, content: string, sha: string): Observable<Markdown> {
    return this.http.put(`${BASE_URL}/repos/${OWNER}/${repo}/contents/${path}`,
      {
        'access_this.token': this.token,
        'content': window.btoa(content),
        'sha': sha,
        'message': `update ${path}`
      },
      {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
        }
      }).pipe(map((res: any) => new Markdown(res.content.name, content, res.content.sha)),
      catchError(() => of(null)));
  }

  setToken(token: string) {
    this.token = token;
  }

  getToken() {
    return this.token;
  }

  getAuthorize() {
    return this.authorize;
  }
}
