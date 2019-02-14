import {Component, OnInit} from '@angular/core';
import {DataService} from './data.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private data: DataService, private router: Router) {
  }

  ngOnInit(): void {
    this.router.navigate([this.data.getToken() ? 'edit' : 'login']);
  }
}
