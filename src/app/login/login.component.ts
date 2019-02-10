import {Component, OnInit} from '@angular/core';
import {DataService} from '../data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginUrl: string;

  constructor(private data: DataService) {
  }

  ngOnInit(): void {
    this.loginUrl = this.data.getAuthorize();
  }
}
