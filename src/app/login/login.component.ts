import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DataService, PERSONAL_ACCESS_TOKENS} from '../data.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  submitForm(): void {
    for (const i in this.loginForm.controls) {
      this.loginForm.controls[i].markAsDirty();
      this.loginForm.controls[i].updateValueAndValidity();
    }
    if (this.loginForm.get('userName').value === 'test@mdbook.com' &&
      this.loginForm.get('password').value === '123456') {
      this.data.setToken(PERSONAL_ACCESS_TOKENS);
      this.router.navigate(['edit']);
    }
  }

  constructor(private data: DataService, private fb: FormBuilder, private router: Router) {
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userName: ['test@mdbook.com', [Validators.required]],
      password: ['123456', [Validators.required]],
      remember: [false]
    });
  }
}
