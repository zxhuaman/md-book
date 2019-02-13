import { Injectable } from '@angular/core';

const CLIENT_ID = '41fc85380e264e0e7cb5c413b4d624d537491b735f152bbc50506d3565cabd02';
const REDIRECT_URI = 'http://localhost:4200';

const BASE_URL = 'https://gitee.com/api/v5';
const OWNER = 'sandcat';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }
}
