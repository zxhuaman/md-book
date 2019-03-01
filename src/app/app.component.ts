import {Component, OnInit} from '@angular/core';
import {DataService} from './model/data.service';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private data: DataService, private router: Router, private http: HttpClient) {
  }

  ngOnInit(): void {
    /*this.data.getToken().subscribe(token => {
      this.router.navigate([token ? 'edit' : 'login']);
    });
    const code = location.href.split('=')[1];
    if (code) {
      this.data.login(code);
    }*/

    this.router.navigate(['edit']);
  }
}
