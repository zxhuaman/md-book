import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {DataService} from './data.service';
import {getSearchParam} from './utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private router: Router, private data: DataService) {
  }

  ngOnInit() {
    console.log(location.href, location.search);
    const token = getSearchParam(location.search, 'code');
    this.data.setToken('214468c52069389ca670254e4719e749');
    this.router.navigate(this.data.getToken() ? ['/editor'] : ['/login']);
  }

}
