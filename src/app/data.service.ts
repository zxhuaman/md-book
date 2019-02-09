import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';

const TOKEN = '5536aa61fd4a920ae8a639188314b332';
const BASE_URL = 'https://gitee.com/api/v5';
const OWNER = 'sandcat';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {
  }

  hasRepo(repo: string) {
    this.http
      .get(`${BASE_URL}/repos/${OWNER}/${repo}/git/gitee/trees/master?access_token=${TOKEN}`)
      .subscribe(res => console.log(res), error => console.log(error));
  }

  fetchTrees(repo: string) {
    return this.http
      .get(`${BASE_URL}/repos/${OWNER}/${repo}/git/gitee/trees/master?access_token=${TOKEN}`);
  }

  createRepo(repo: string) {
    return this.http.post(`${BASE_URL}/user/repos`,
      {
        'access_token': TOKEN,
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
        'access_token': TOKEN,
        'content': '5paw5bu65paH5Lu2',
        'message': `create ${path}`,
      },
      {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
        }
      });
  }
}
