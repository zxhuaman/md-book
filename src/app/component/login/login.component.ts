import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DataService, gitee_code_action} from '../../model/data.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  readonly giteeCodeAction = gitee_code_action;

  constructor(private data: DataService,
              private fb: FormBuilder,
              private router: Router) {
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]],
      remember: [false]
    });
  }

  submitForm($event: Event) {
    for (const i in this.loginForm.controls) {
      this.loginForm.controls[i].markAsDirty();
      this.loginForm.controls[i].updateValueAndValidity();
    }
    if (this.loginForm.get('userName').value &&
      this.loginForm.get('password').value) {
      this.data.login(null, this.loginForm.get('userName').value, this.loginForm.get('password').value);
    }
    $event.preventDefault();
  }
}
